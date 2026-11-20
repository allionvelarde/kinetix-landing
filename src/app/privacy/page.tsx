import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-slate-200 px-6 py-16">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link
          href="/"
          className="inline-block text-sm text-blue-400 hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        <p className="text-sm text-slate-400">Last updated: November 2026</p>

        <section className="space-y-3 text-sm leading-relaxed text-slate-300">
          <h2 className="text-lg font-semibold text-white">1. Information We Collect</h2>
          <p>
            We only collect information you voluntarily submit when requesting an
            audit, booking a call, or contacting Kinetix (such as your name, email
            address, business details, and workflow notes).
          </p>

          <h2 className="text-lg font-semibold text-white">2. How We Use Information</h2>
          <p>
            Submitted information is used solely to respond to inquiries, prepare
            workflow audits, scope automation builds, and communicate regarding
            requested services. We do not sell your personal or business data.
          </p>

          <h2 className="text-lg font-semibold text-white">3. Data Security & Retention</h2>
          <p>
            Reasonable technical and organizational measures are used to protect
            inquiry and project data. You may request access, correction, or deletion
            of your submitted information at any time.
          </p>

          <h2 className="text-lg font-semibold text-white">4. Contact</h2>
          <p>
            For privacy requests, contact{" "}
            <span className="text-white">kinetix.automations.ph@gmail.com</span>.
          </p>
        </section>
      </div>
    </main>
  );
}