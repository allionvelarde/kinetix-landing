import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-slate-200 px-6 py-16">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link
          href="/"
          className="inline-block text-sm text-blue-400 hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-white">Terms of Use</h1>
        <p className="text-sm text-slate-400">Last updated: November 2026</p>

        <section className="space-y-3 text-sm leading-relaxed text-slate-300">
          <h2 className="text-lg font-semibold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Kinetix Automations website (
            <span className="text-white">kinetixautomations.online</span>), you agree
            to be bound by these Terms of Use and all applicable laws and regulations.
          </p>

          <h2 className="text-lg font-semibold text-white">2. Scope of Services</h2>
          <p>
            Kinetix provides workflow automation consulting, custom web applications,
            and process automation solutions. Specific deliverables, timelines, and
            commercial or pilot terms are defined in written project agreements or
            audits prior to implementation.
          </p>

          <h2 className="text-lg font-semibold text-white">3. Intellectual Property</h2>
          <p>
            All website branding, layouts, automation architectures, and documentation
            on this site are the property of Kinetix unless otherwise agreed in writing.
          </p>

          <h2 className="text-lg font-semibold text-white">4. Contact</h2>
          <p>
            For questions regarding these terms, reach out to{" "}
            <span className="text-white">kinetix.automations.ph@gmail.com</span>.
          </p>
        </section>
      </div>
    </main>
  );
}