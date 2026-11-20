import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-slate-200 px-6 py-16">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link
          href="/"
          className="inline-block text-sm text-blue-400 hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-white">Refund Policy</h1>
        <p className="text-sm text-slate-400">Last updated: November 2026</p>

        <section className="space-y-3 text-sm leading-relaxed text-slate-300">
          <h2 className="text-lg font-semibold text-white">1. Audits & Pilot Builds</h2>
          <p>
            Initial workflow audits and complimentary or case-study pilot builds
            carries no service fee. Third-party infrastructure costs (such as domains,
            hosting, or external API/SaaS usage) paid directly to third-party
            providers are non-refundable through Kinetix.
          </p>

          <h2 className="text-lg font-semibold text-white">2. Paid Custom Development</h2>
          <p>
            For paid custom automation or web development engagements, refund eligibility
            depends on completed milestones and work already delivered prior to a
            cancellation request, as specified in the project agreement.
          </p>

          <h2 className="text-lg font-semibold text-white">3. Contact</h2>
          <p>
            For billing or refund inquiries, email{" "}
            <span className="text-white">kinetix.automations.ph@gmail.com</span>.
          </p>
        </section>
      </div>
    </main>
  );
}