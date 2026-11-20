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
                { name: 'Client', value: name, inline: true },
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
        subject: 'We received your Kinetix Workflow Audit request',
        html: `
          <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #0f172a;">
            <h2>Hi ${name},</h2>
            <p>Thanks for requesting a workflow audit with <strong>Kinetix</strong>. Our engineering team is reviewing your current bottlenecks for <strong>${service}</strong>.</p>
            <p>We will reach out within 24 hours with a custom automation blueprint and next steps.</p>
            <br/>
            <p style="color: #64748b; font-size: 13px;">— The Kinetix Team</p>
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