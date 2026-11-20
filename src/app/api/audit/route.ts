import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const resend = new Resend(process.env.RESEND_API_KEY);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export async function POST(req: Request) {
  try {
    const { name, email, service, vision } = await req.json();

    if (!name || !email || !service || !vision) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Save lead permanently to Firestore CRM
    const docRef = await addDoc(collection(db, 'audit_leads'), {
      name,
      email,
      service,
      vision,
      status: 'New Lead',
      createdAt: serverTimestamp(),
    });

    const formattedName = String(name)
      .trim()
      .split(/\s+/)
      .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');

    const refCode = docRef.id.slice(0, 6).toUpperCase();

    // 2. Fire Discord alert + Client confirmation email in parallel
    await Promise.all([
      fetch(process.env.DISCORD_WEBHOOK_URL!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [
            {
              title: '🚀 New Kinetix Workflow Audit Request',
              color: 2450411, // Brand Blue
              fields: [
                { name: 'Client', value: formattedName, inline: true },
                { name: 'Email', value: email, inline: true },
                { name: 'Service', value: service, inline: false },
                { name: 'Bottlenecks & Vision', value: vision, inline: false },
              ],
              footer: { text: `Lead ID: ${docRef.id}` },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      }),
      resend.emails.send({
        from: 'Kinetix <noreply@kinetixautomations.online>',
        to: email,
        replyTo: 'kinetix.automations.ph@gmail.com',
        subject: `[Ref #${refCode}] We received your Kinetix Workflow Audit request`,
        html: `
          <div style="background-color: #f8fafc; padding: 32px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a;">
            <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
              
              <!-- Header Bar -->
              <div style="background-color: #030714; padding: 24px 32px; border-bottom: 2px solid #2563eb;">
                <span style="color: #ffffff; font-size: 18px; font-weight: 700; letter-spacing: -0.02em;">kinetix</span>
                <span style="float: right; color: #93c5fd; font-size: 12px; font-family: monospace; margin-top: 3px;">REF #${refCode}</span>
              </div>

              <!-- Body -->
              <div style="padding: 32px;">
                <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 700; color: #0f172a;">
                  Hi ${formattedName},
                </h2>
                <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #334155;">
                  Thanks for requesting a workflow audit with <strong>Kinetix</strong>. Our engineering team is reviewing your current bottlenecks for <strong>${service}</strong>.
                </p>

                <!-- Request Summary Box -->
                <div style="background-color: #f1f5f9; border-left: 3px solid #2563eb; border-radius: 6px; padding: 16px; margin: 24px 0;">
                  <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b;">
                    Requested Scope
                  </p>
                  <p style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #0f172a;">
                    ${service}
                  </p>
                  <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b;">
                    Submitted Notes
                  </p>
                  <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #475569;">
                    "${vision}"
                  </p>
                </div>

                <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.6; color: #334155;">
                  We will reach out within 24 hours with a custom automation blueprint and next steps. If you have any additional details to share, just reply directly to this email.
                </p>

                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />

                <p style="margin: 0; font-size: 13px; color: #64748b;">
                  — <strong style="color: #0f172a;">The Kinetix Team</strong><br />
                  <a href="https://kinetixautomations.online" style="color: #2563eb; text-decoration: none;">kinetixautomations.online</a>
                </p>
              </div>
            </div>
          </div>
        `,
      }),
    ]);

    return NextResponse.json({ success: true, leadId: docRef.id });
  } catch (error) {
    console.error('Audit submission error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}