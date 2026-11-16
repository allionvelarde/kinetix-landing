'use client';

import React, { useEffect, useState } from 'react';

const AI_STACK_BRANDS = [
  {
    name: 'OpenAI',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0905 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.259 23a6.0557 6.0557 0 0 0 5.772-4.2057 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7468-6.0732z" />
      </svg>
    ),
  },
  {
    name: 'Google Gemini',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C12.3 7.4 16.6 11.7 22 12C16.6 12.3 12.3 16.6 12 22C11.7 16.6 7.4 12.3 2 12C7.4 11.7 11.7 7.4 12 2Z" />
      </svg>
    ),
  },
  {
    name: 'Make.com',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: 'n8n',
    icon: (
      <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="2.2" viewBox="0 0 24 24">
        <circle cx="5" cy="12" r="2.5" />
        <circle cx="19" cy="7" r="2.5" />
        <circle cx="19" cy="17" r="2.5" />
        <path d="M7.5 12h4l5-5M11.5 12l5 5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Google Workspace',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>
    ),
  },
  {
    name: 'Anthropic',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M14.6 4h-2.8L6 20h2.9l1.3-3.7h5.6l1.3 3.7H20L14.6 4zm-3.5 9.8 1.9-5.5 1.9 5.5h-3.8z" />
      </svg>
    ),
  },
  {
    name: 'TensorFlow',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2L3 7.2v9.6l3.5 2V9.2L12 6l5.5 3.2v3.6l-3.5-2v4l3.5 2v4.1L21 16.8V7.2L12 2z" />
      </svg>
    ),
  },
  {
    name: 'Supabase',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M21.362 9.354H12V.326a.326.326 0 00-.555-.23L.638 10.9a.326.326 0 00.23.555H12v9.028a.326.326 0 00.555.23l10.807-10.803a.326.326 0 00-.23-.556z" />
      </svg>
    ),
  },
];

const SOLUTIONS_CARDS = [
  {
    number: '/ 01',
    title: 'AI workflow pipelines.',
    icon: (
      <svg className="w-4 h-4 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      'Connect n8n, Make.com & REST APIs',
      'Eliminate 98% of repetitive tasks',
      'Real-time CRM & database sync',
      'Custom webhook triggers 24/7',
      'Zero-latency execution logs',
    ],
  },
  {
    number: '/ 02',
    title: 'Autonomous agents.',
    icon: (
      <svg className="w-4 h-4 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 4v2M12 18v2M4 12h2M18 12h2" strokeLinecap="round" />
      </svg>
    ),
    items: [
      'Trained on your exact business SOPs',
      'Multi-agent OpenAI & Gemini routing',
      'Instant catalog & pricing recall',
      'Human-in-the-loop approval gates',
      'Continuous accuracy monitoring',
    ],
  },
  {
    number: '/ 03',
    title: 'Smart inquiry routing.',
    icon: (
      <svg className="w-4 h-4 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" strokeLinecap="round" />
      </svg>
    ),
    items: [
      'Auto-resolve 50k+ customer FAQs',
      'Flag high-ticket bulk buyers fast',
      'Instant VIP alerts to your dashboard',
      'Automated lead scoring & tagging',
      'Full conversation audit trail',
    ],
  },
];

const SECURITY_ITEMS = [
  {
    number: '(01)',
    title: 'End-to-End Encryption',
    description: 'All enterprise workflows and data streams are secured using AES-256 and TLS 1.3 protocol encryption.',
  },
  {
    number: '(02)',
    title: 'Zero-Trust Architecture',
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
  },
  {
    number: '(03)',
    title: 'SOC 2 & GDPR Compliance',
    description: 'Fully audited infrastructure designed to meet the highest global data privacy and regulatory standards.',
  },
];

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery & Audit',
    description: 'We map your existing enterprise stack, identify manual bottlenecks, and blueprint your optimal automation architecture.',
  },
  {
    number: '02',
    title: 'Build & Train',
    description: 'Our engineers configure n8n/Make.com pipelines and train custom AI agents strictly on your business SOPs and pricing catalogs.',
  },
  {
    number: '03',
    title: 'Sandbox Testing',
    description: 'Rigorous stress-testing and edge-case simulation in a secure staging environment to guarantee zero-error execution.',
  },
  {
    number: '04',
    title: 'Deploy & Scale',
    description: 'Zero-downtime production launch with real-time telemetry dashboards and ongoing optimization as your workflows scale 24/7.',
  },
];

export default function KinetixLandingPage() {
  const [activeNav, setActiveNav] = useState<'Home' | 'Solutions' | 'Security' | 'Process'>('Home');
  const [activeSecurity, setActiveSecurity] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Custom Web Apps & Client Portals',
    vision: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://hook.us2.make.com/vtffyl9ir78uclry3cdhx1a4ptvdim27', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          concernsAndVision: formData.vision, // Tugma sa Make variable mapping mo
          submittedAt: new Date().toISOString(), // Nagpapadala na ng Date/Time
        }),
      });

      if (response.ok) {
        alert('Audit Request Submitted Successfully!');
        setFormData({
          name: '',
          email: '',
          service: 'Custom Web Apps & Client Portals',
          vision: '',
        });
        setIsModalOpen(false);
      } else {
        alert('May problema sa pag-send. Subukan ulit.');
      }
    } catch (error) {
      console.error('Webhook error:', error);
      alert('Hindi ma-connect sa server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const sections = ['Home', 'Solutions', 'Security', 'Process'] as const;

    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current: (typeof sections)[number] = 'Home';

      for (const name of sections) {
        const el = document.getElementById(name.toLowerCase());
        if (el && el.getBoundingClientRect().top <= line) {
          current = name;
        }
      }
      setActiveNav(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#030714] text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      
      {/* SECTION 1: HERO & NAVBAR */}
      <section
        id="home"
        className="relative w-full overflow-hidden bg-gradient-to-br from-[#0B1F4D] via-[#06112E] to-[#030714]"
      >
        <div
          className="pointer-events-none absolute -top-[15%] -left-[10%] w-[85vw] h-[75vw] max-h-[900px] opacity-85 blur-[90px] -rotate-25"
          style={{
            background:
              'radial-gradient(ellipse at 30% 25%, rgba(96, 165, 250, 0.6) 0%, rgba(37, 99, 235, 0.28) 45%, rgba(4, 10, 28, 0) 75%)',
          }}
        />

        <div
          className="pointer-events-none absolute top-0 left-[15%] w-[45vw] h-[55vw] max-h-[750px] opacity-45 blur-[70px] -rotate-[32deg]"
          style={{
            background:
              'linear-gradient(180deg, rgba(147, 197, 253, 0.5) 0%, rgba(59, 130, 246, 0.08) 70%, transparent 100%)',
          }}
        />

        {/* Navbar */}
        <header className="relative z-20 w-full px-6 sm:px-10 lg:px-16 pt-7 sm:pt-8">
          <div className="flex items-center justify-between gap-4">
            <a href="#home" className="flex items-center gap-2 group shrink-0 py-1">
              <img
                src="/kinetix-logo.svg"
                alt="Kinetix Logo"
                className="w-7 h-7 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span
                style={{ fontFamily: "'Codec Pro', sans-serif" }}
                className="text-[21px] font-bold tracking-[-0.03em] text-white"
              >
                kinetix
              </span>
            </a>

            <nav className="hidden sm:flex fixed top-8 left-1/2 -translate-x-1/2 z-50 items-center p-1.5 rounded-2xl bg-[#0B1F4D]/50 backdrop-blur-xl border border-white/[0.12] shadow-[0_8px_30px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)]">
              {(['Home', 'Solutions', 'Security', 'Process'] as const).map((item) => {
                const isActive = activeNav === item;
                return (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setActiveNav(item)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-white/[0.22] text-white shadow-[0_2px_10px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.3)]'
                        : 'text-slate-200/80 hover:text-white'
                    }`}
                  >
                    {item}
                  </a>
                );
              })}
            </nav>

            <button
              onClick={() => setIsModalOpen(true)}
              className="shrink-0 px-5 py-2.5 rounded-full text-sm font-medium text-white bg-gradient-to-b from-[#60A5FA] to-[#2563EB] hover:from-[#93C5FD] hover:to-[#3B82F6] shadow-[0_0_25px_rgba(59,130,246,0.45),inset_0_1px_1px_rgba(255,255,255,0.5)] transition-all duration-300 cursor-pointer"
            >
              Book Audit
            </button>
          </div>

          <nav className="flex sm:hidden items-center justify-center mt-4">
            <div className="flex items-center p-1 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.12]">
              {(['Home', 'Solutions', 'Security', 'Process'] as const).map((item) => {
                const isActive = activeNav === item;
                return (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setActiveNav(item)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-white/[0.22] text-white shadow'
                        : 'text-slate-200/80 hover:text-white'
                    }`}
                  >
                    {item}
                  </a>
                );
              })}
            </div>
          </nav>
        </header>

        {/* Hero Headline & Concentric CTA */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-16 sm:pt-20 pb-14 sm:pb-16 text-center">
          <h1 className="max-w-5xl pb-2 text-[clamp(2.4rem,5.2vw,4.8rem)] font-bold tracking-[-0.035em] leading-[1.08] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-blue-200/80 drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)] mb-12 [text-wrap:balance]">
            <span className="block">Automate the Future</span>
            <span className="block text-blue-100/90">Scale Every Workflow</span>
          </h1>

          <div className="relative w-full max-w-[620px] h-[230px] sm:h-[270px] flex items-center justify-center">
            <div
              className="pointer-events-none absolute top-2 w-[70%] h-[60%] rounded-full blur-[45px] opacity-90"
              style={{
                background:
                  'radial-gradient(circle at 50% 25%, rgba(191, 219, 254, 0.85) 0%, rgba(59, 130, 246, 0.45) 55%, transparent 80%)',
              }}
            />

            <div className="relative w-full h-full rounded-full p-[24px] sm:p-[30px] bg-gradient-to-b from-[#60A5FA]/25 via-[#1E3A8A]/20 to-[#040B1E]/60 border border-blue-300/20 shadow-[inset_0_2px_20px_rgba(147,197,253,0.25)] flex items-center justify-center">
              <span className="absolute top-[13px] sm:top-[16px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#0B2559] shadow-[0_0_8px_rgba(147,197,253,0.6)]" />

              <div className="w-full h-full rounded-full p-[22px] sm:p-[28px] bg-gradient-to-b from-[#93C5FD]/30 via-[#1D4ED8]/25 to-[#040B1E]/80 border border-blue-200/30 shadow-[inset_0_2px_24px_rgba(191,219,254,0.35),0_0_30px_rgba(37,99,235,0.2)] flex items-center justify-center">
                <div className="w-full h-full rounded-full p-[16px] sm:p-[20px] bg-gradient-to-b from-[#BFDBFE]/45 via-[#2563EB]/40 to-[#06112E]/90 border border-white/40 shadow-[inset_0_3px_20px_rgba(255,255,255,0.5),0_0_40px_rgba(59,130,246,0.45)] flex items-center justify-center">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="group relative w-full h-full rounded-full bg-gradient-to-b from-[#06102B] to-[#030817] hover:from-[#0A1942] hover:to-[#050D24] border border-blue-400/30 shadow-[0_10px_30px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(147,197,253,0.25)] flex items-center justify-center gap-4 px-8 transition-all duration-300 cursor-pointer"
                  >
                    <span className="whitespace-nowrap text-base sm:text-xl font-medium tracking-wide text-white/95 group-hover:text-white">
                      Get started for free
                    </span>
                    <svg
                      viewBox="0 0 28 24"
                      fill="none"
                      className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 text-white/90 transition-transform duration-300 group-hover:translate-x-1.5"
                    >
                      <path
                        d="M3 9.5H15V5L24.5 12L15 19V14.5H3V9.5Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling AI Brands Marquee */}
        <div className="relative z-20 w-full pt-6 pb-9 border-t border-white/[0.06] bg-gradient-to-t from-[#030714] to-transparent">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-200/50 mb-5">
            Powered by & Integrated With
          </p>

          <div
            className="relative w-full overflow-hidden"
            style={{
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
              maskImage:
                'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            }}
          >
            <div className="animate-marquee flex items-center gap-12 sm:gap-16">
              {[...AI_STACK_BRANDS, ...AI_STACK_BRANDS].map((brand, idx) => (
                <div
                  key={`${brand.name}-${idx}`}
                  className="flex items-center gap-3 text-slate-300/65 hover:text-white transition-colors duration-300 shrink-0 select-none"
                >
                  <span className="text-blue-400/80">{brand.icon}</span>
                  <span className="text-base sm:text-lg font-semibold tracking-tight">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SOLUTIONS */}
      <section
        id="solutions"
        className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#030714] border-t border-white/[0.05] overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(96, 165, 250, 0.07) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(96, 165, 250, 0.07) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            WebkitMaskImage:
              'radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 95%)',
            maskImage:
              'radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 95%)',
          }}
        />

        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[500px] rounded-full blur-[120px] opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.45) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-[1200px] mx-auto">
          <div className="max-w-2xl mb-12 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-medium tracking-[-0.025em] leading-[1.15]">
              <span className="text-white">Tailored automation solutions </span>
              <span className="text-slate-400/75">
                to meet the unique needs of your scaling workflows
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/[0.09] bg-[#040814]/90 backdrop-blur-sm divide-y md:divide-y-0 md:divide-x divide-white/[0.09]">
            
            <div className="relative overflow-hidden min-h-[360px] lg:min-h-[430px] p-7 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#060E24] via-[#0F2A6B] to-[#2563EB]">
              <div
                className="pointer-events-none absolute -top-12 -left-12 w-64 h-64 rounded-full blur-[60px] opacity-60"
                style={{
                  background:
                    'radial-gradient(circle, rgba(96, 165, 250, 0.55) 0%, transparent 70%)',
                }}
              />

              <img
                src="/kinetix-logo.svg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none select-none absolute -top-10 -left-10 w-52 h-52 object-contain opacity-90 drop-shadow-[0_0_25px_rgba(147,197,253,0.4)]"
              />

              <div />

              <div className="relative z-10 mt-auto">
                <p className="text-xl sm:text-[22px] font-medium tracking-tight text-white">
                  Our solutions.
                </p>
              </div>
            </div>

            {SOLUTIONS_CARDS.map((card) => (
              <div
                key={card.number}
                className="group relative min-h-[360px] lg:min-h-[430px] p-7 sm:p-8 flex flex-col justify-between bg-[#040814]/90 hover:bg-[#070E22]/95 transition-colors duration-300"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-6 group-hover:border-blue-400/30 group-hover:bg-blue-500/10 transition-colors">
                    {card.icon}
                  </div>

                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[17px] font-medium tracking-tight text-white">
                      {card.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-500 shrink-0">
                      {card.number}
                    </span>
                  </div>
                </div>

                <div className="mt-12">
                  <ul className="space-y-2.5 mb-7">
                    {card.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[13px] leading-snug text-slate-400"
                      >
                        <svg
                          className="w-3.5 h-3.5 text-slate-400/80 shrink-0 mt-0.5"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M3.5 8.5L6.5 11.5L12.5 4.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#process"
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white hover:text-blue-300 transition-colors"
                  >
                    <span>Learn more</span>
                    <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* SECTION 3: SECURITY */}
      <section
        id="security"
        className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#030714] border-t border-white/[0.05] overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '90px 90px',
          }}
        />

        <div
          className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(37, 99, 235, 0.6) 0%, transparent 70%)' }}
        />

        <div className="max-w-[1200px] mx-auto relative z-10">
          
          <div className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white/90">
              Table Content Overview
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-8 flex flex-col">
              {SECURITY_ITEMS.map((item, index) => {
                const isActive = activeSecurity === index;
                return (
                  <div
                    key={item.number}
                    onClick={() => setActiveSecurity(index)}
                    className={`relative cursor-pointer transition-all duration-300 py-7 px-6 sm:px-8 border-y ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-900/80 via-blue-800/40 to-transparent border-blue-400/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]'
                        : 'bg-transparent border-white/[0.08] hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className={`grid items-center ${isActive ? 'grid-cols-1 md:grid-cols-12 gap-4' : 'grid-cols-1'}`}>
                      
                      <div className={`flex items-baseline gap-6 sm:gap-10 ${isActive ? 'md:col-span-7' : 'col-span-full'}`}>
                        <span className="text-base sm:text-lg font-mono text-blue-300/80 shrink-0">
                          {item.number}
                        </span>
                        <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-medium tracking-tight text-white">
                          {item.title}
                        </h3>
                      </div>

                      {isActive && (
                        <div className="md:col-span-5 text-xs sm:text-[13px] text-slate-200/90 leading-relaxed pl-4 md:pl-0 border-l md:border-l-0 border-blue-400/30">
                          {item.description}
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}

              <div className="flex items-center justify-between pt-12 mt-2 text-sm text-slate-400 font-light">
                <span>[Technology]</span>
                <span>[Modern Company]</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="relative w-full max-w-[300px] aspect-[4/5] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-blue-400/30 group">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-transparent z-10 pointer-events-none" />
                <img
                  src="/kinetix_glass_card.png"
                  alt="Kinetix Glass Card"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 right-4 z-20 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[16px] border-b-white opacity-90" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: PROCESS */}
      <section
        id="process"
        className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#040816] border-t border-white/[0.05] overflow-hidden"
      >
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[900px] h-[350px] rounded-full blur-[130px] opacity-45"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.65) 0%, rgba(29,78,216,0.2) 55%, transparent 80%)' }}
        />

        <div className="max-w-[1200px] mx-auto relative z-10">
          
          <div className="max-w-2xl mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.15]">
              How We Deploy Your Custom Workflows
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="relative rounded-none bg-[#060D22]/80 backdrop-blur-xl border border-blue-500/25 p-7 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.5)] group hover:border-blue-400/50 transition-all duration-300"
              >
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-80" />

                <div>
                  <div className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-tight mb-4 group-hover:text-blue-200 transition-colors">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {step.title}
                  </h3>
                </div>

                <div>
                  <p className="text-sm sm:text-[15px] leading-relaxed text-slate-300">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-6 border-t border-white/[0.08] max-w-xl">
            <div className="w-8 h-8 rounded-none bg-white/[0.05] border border-white/[0.1] flex items-center justify-center shrink-0 text-blue-300">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-snug">
              From initial audit to fully autonomous 24/7 execution — structured for speed, security, and enterprise scale.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 5: CTA BANNER WITH FADED GRID & HERO-STYLE CONCENTRIC BUTTON */}
      <section className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#030714] border-t border-white/[0.05] overflow-hidden">
        
        {/* Faded Grid Background Pattern */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(96, 165, 250, 0.07) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(96, 165, 250, 0.07) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            WebkitMaskImage:
              'radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 95%)',
            maskImage:
              'radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 95%)',
          }}
        />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="relative rounded-[32px] bg-[#040816]/90 backdrop-blur-sm border border-white/[0.08] pt-16 pb-24 px-6 text-center overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
            
            {/* Seamless Bottom Gradient conforming to border-radius */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-blue-600/60 via-blue-600/20 to-transparent rounded-b-[32px]"
            />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white mb-4">
                Ready to take your automation to the next level?
              </h2>
              <p className="text-sm sm:text-base text-slate-400 mb-10">
                Get audited and start scaling your workflows with confidence today.
              </p>
              
              {/* Hero-Style Concentric Pill Button for CTA */}
              <div className="relative w-full max-w-[500px] h-[180px] sm:h-[200px] mx-auto flex items-center justify-center">
                <div
                  className="pointer-events-none absolute top-2 w-[70%] h-[60%] rounded-full blur-[35px] opacity-90"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 25%, rgba(191, 219, 254, 0.85) 0%, rgba(59, 130, 246, 0.45) 55%, transparent 80%)',
                  }}
                />

                <div className="relative w-full h-full rounded-full p-[20px] sm:p-[24px] bg-gradient-to-b from-[#60A5FA]/25 via-[#1E3A8A]/20 to-[#040B1E]/60 border border-blue-300/20 shadow-[inset_0_2px_20px_rgba(147,197,253,0.25)] flex items-center justify-center">
                  <span className="absolute top-[11px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#0B2559] shadow-[0_0_8px_rgba(147,197,253,0.6)]" />

                  <div className="w-full h-full rounded-full p-[18px] sm:p-[22px] bg-gradient-to-b from-[#93C5FD]/30 via-[#1D4ED8]/25 to-[#040B1E]/80 border border-blue-200/30 shadow-[inset_0_2px_24px_rgba(191,219,254,0.35),0_0_30px_rgba(37,99,235,0.2)] flex items-center justify-center">
                    <div className="w-full h-full rounded-full p-[14px] sm:p-[16px] bg-gradient-to-b from-[#BFDBFE]/45 via-[#2563EB]/40 to-[#06112E]/90 border border-white/40 shadow-[inset_0_3px_20px_rgba(255,255,255,0.5),0_0_40px_rgba(59,130,246,0.45)] flex items-center justify-center">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="group relative w-full h-full rounded-full bg-gradient-to-b from-[#06102B] to-[#030817] hover:from-[#0A1942] hover:to-[#050D24] border border-blue-400/30 shadow-[0_10px_30px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(147,197,253,0.25)] flex items-center justify-center gap-3 px-6 transition-all duration-300 cursor-pointer"
                      >
                        <span className="whitespace-nowrap text-sm sm:text-lg font-medium tracking-wide text-white/95 group-hover:text-white">
                          Get Audited
                        </span>
                        <svg
                          viewBox="0 0 28 24"
                          fill="none"
                          className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 text-white/90 transition-transform duration-300 group-hover:translate-x-1.5"
                        >
                          <path
                            d="M3 9.5H15V5L24.5 12L15 19V14.5H3V9.5Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="relative bg-[#02050E] pt-16 pb-12 border-t border-white/[0.08] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/[0.08]">
            
            {/* Col 1: Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <img
                  src="/kinetix-logo.svg"
                  alt="Kinetix Logo"
                  className="w-6 h-6 object-contain"
                />
                <span
                  style={{ fontFamily: "'Codec Pro', sans-serif" }}
                  className="text-xl font-bold tracking-[-0.03em] text-white"
                >
                  kinetix
                </span>
              </div>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                Empowering businesses with flexible and scalable AI workflow automation solutions for success.
              </p>
            </div>

            {/* Col 2: Sitemap */}
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-white font-semibold mb-5">
                SITEMAP
              </p>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#solutions" className="hover:text-white transition-colors">Solutions</a></li>
                <li><a href="#security" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#process" className="hover:text-white transition-colors">Process</a></li>
              </ul>
            </div>

            {/* Col 3: Resources */}
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-white font-semibold mb-5">
                RESOURCES
              </p>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
              </ul>
            </div>

            {/* Col 4: Join Us / Socials & Book Now Button */}
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-white font-semibold mb-5">
                JOIN US
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center gap-3 mb-6">
                <a href="#" className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/[0.1] transition-all" aria-label="X">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/[0.1] transition-all" aria-label="Facebook">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/[0.1] transition-all" aria-label="Instagram">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/[0.1] transition-all" aria-label="Mail">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
              </div>

              {/* Book Now Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full max-w-xs py-2.5 rounded-full text-xs font-semibold bg-white text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.25)]"
              >
                Book Now
              </button>
            </div>

          </div>

          {/* Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <p>© 2026 Kinetix. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-slate-400">Privacy</a>
              <a href="#" className="hover:text-slate-400">Terms</a>
            </div>
          </div>

        </div>
      </footer>

      {/* BOOKING / AUDIT MODAL (Dark Theme Match) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#040816] border border-blue-500/30 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(37,99,235,0.2)] text-white animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.12] transition-colors cursor-pointer"
            >
              ✕
            </button>

            {/* Header */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                Book a Free Workflow Audit
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Leave your details and our agency will analyze your business processes.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-[#060D22] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/80 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Business Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@company.com"
                  className="w-full bg-[#060D22] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/80 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Service Needed
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-[#060D22] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/80 transition-all"
                >
                  <option className="bg-[#040816]">Custom Web Apps & Client Portals</option>
                  <option className="bg-[#040816]">Smart AI Workflow Engines</option>
                  <option className="bg-[#040816]">API & Ecosystem Pipelines</option>
                  <option className="bg-[#040816]">Bespoke Enterprise Systems</option>
                  <option className="bg-[#040816]">Custom Service / Specific Workflow Request</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Project Vision & Current Bottlenecks
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.vision}
                  onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                  placeholder="Describe your current manual process, goals, or concerns..."
                  className="w-full bg-[#060D22] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/80 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-b from-[#60A5FA] to-[#2563EB] hover:from-[#93C5FD] hover:to-[#3B82F6] shadow-[0_0_25px_rgba(59,130,246,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-300 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Detailed Audit Request'}
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}