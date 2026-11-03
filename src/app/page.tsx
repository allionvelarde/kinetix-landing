'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Sticky Scrollytelling & Mobile-Responsive Process Component
function ProcessScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height - window.innerHeight;
      
      const scrollProgress = Math.min(
        Math.max(-rect.top / containerHeight, 0),
        1
      );

      const step = Math.min(Math.floor(scrollProgress * 4), 3);
      setActiveStep(step);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    {
      number: "01",
      title: "Workflow Audit",
      description: "We map your daily tasks and identify friction bottlenecks slowing down your business.",
      phase: "Phase 1",
      detail: "Deep-dive operational assessment"
    },
    {
      number: "02",
      title: "Architecture Blueprint",
      description: "We design a custom automation workflow diagram tailored to your existing software.",
      phase: "Phase 2",
      detail: "Custom API & webhook mapping"
    },
    {
      number: "03",
      title: "Build & Testing",
      description: "We construct the system, integrate APIs, test error-handling, and secure pipelines.",
      phase: "Phase 3",
      detail: "Staging environment validation"
    },
    {
      number: "04",
      title: "Handoff & Support",
      description: "We launch the live system, provide training guides, and monitor ongoing maintenance.",
      phase: "Phase 4",
      detail: "Production deployment & handoff"
    }
  ];

  return (
    <section 
      ref={containerRef} 
      id="process" 
      className="relative md:h-[300vh] bg-gradient-to-b from-slate-50 via-blue-50/50 to-slate-100 border-b border-slate-200/60 py-20 md:py-0"
    >
      {/* Desktop Sticky Viewport / Mobile Normal Flow */}
      <div className="md:sticky md:top-0 md:h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 overflow-hidden">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3.5 py-1 mb-3 text-xs font-semibold rounded-full border border-slate-200 bg-white text-slate-700 uppercase tracking-wider shadow-sm">
            Execution Roadmap
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-950 tracking-tight mb-3">
            Our 4-Step Engineering Process
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            How we transition your business from manual bottlenecks to automated architecture.
          </p>
        </div>

        {/* Cards Grid: Stacked vertical sa mobile (flexcol), 4-columns grid sa desktop (md:grid-cols-4) */}
        <div className="flex flex-col md:grid md:grid-cols-4 gap-6 relative z-10">
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            const isPassed = activeStep > index;

            return (
              <div
                key={index}
                className={`relative p-6 md:p-8 rounded-3xl border transition-all duration-500 ease-out flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white border-blue-500 shadow-2xl shadow-blue-950/30 md:scale-105 md:-translate-y-2 ring-2 ring-blue-500/40'
                    : 'bg-white text-slate-900 border-slate-300 shadow-sm md:bg-white/50 md:opacity-70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`text-2xl md:text-3xl font-black px-3.5 py-1 rounded-2xl border transition-colors duration-500 ${
                        isActive
                          ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/40'
                          : 'bg-blue-50 text-blue-950 border-blue-200'
                      }`}
                    >
                      {step.number}
                    </span>
                    <span
                      className={`w-3 h-3 rounded-full transition-all duration-500 ${
                        isActive ? 'bg-blue-400 animate-ping' : 'bg-blue-600'
                      }`}
                    ></span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed ${isActive ? 'text-slate-200' : 'text-slate-600'}`}>
                    {step.description}
                  </p>
                </div>

                <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-semibold ${
                  isActive ? 'border-blue-900/60 text-blue-300' : 'border-slate-100 text-slate-500'
                }`}>
                  <span>{step.phase}</span>
                  <span>{isActive ? 'Active Phase' : step.detail}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Bar (Desktop only) */}
        <div className="hidden md:block mt-12 max-w-md mx-auto w-full bg-slate-200/80 backdrop-blur-sm h-1.5 rounded-full overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-blue-600 to-blue-950 h-full transition-all duration-300 ease-out"
            style={{ width: `${((activeStep + 1) / 4) * 100}%` }}
          ></div>
        </div>

      </div>
    </section>
  );
}

// Interactive Accordion FAQ Component
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Will this disrupt our current software setup?",
      answer: "No. Our automation systems connect directly on top of your existing software infrastructure via secure Webhooks and official APIs. There is zero downtime or need for system migration."
    },
    {
      question: "How long does a custom automation build take?",
      answer: "Most custom production-ready workflows are fully designed, tested, and deployed within 5 to 10 business days following our initial architecture blueprint."
    },
    {
      question: "What happens if a workflow experiences an error?",
      answer: "We build automated fallback triggers, error notifications, and log tracking into every system. Plus, our monthly maintenance retainer includes ongoing health monitoring and system updates."
    },
    {
      question: "Can we scale or modify the workflows as our business grows?",
      answer: "Absolutely. All Kinetix automation pipelines are built on cloud-native modular systems, making it effortless to add new triggers, integrations, or data destinations anytime."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-slate-50 border-b border-slate-200/60 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 mb-4 text-xs font-semibold rounded-full border border-slate-200 bg-white text-slate-700 uppercase tracking-wider shadow-sm">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            Everything you need to know about partnering with Kinetix.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-blue-900/50 shadow-xl shadow-blue-950/5 ring-1 ring-blue-900/10'
                    : 'bg-white/85 hover:bg-white border-slate-200 shadow-sm hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 md:p-7 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-blue-950' : 'text-slate-900'}`}>
                    {faq.question}
                  </span>
                  
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-blue-950 text-white rotate-45'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100 px-6 pb-7 md:px-7' : 'max-h-0 opacity-0 px-6 pb-0'
                  }`}
                >
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default function Home() {
  const [teamSize, setTeamSize] = useState<number>(3);
  const [hoursSpent, setHoursSpent] = useState<number>(4);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const monthlySavings = teamSize * hoursSpent * 100 * 22;

  // Handle form submission to Make.com Webhook
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      submittedAt: new Date().toISOString(),
    };

    try {
      // Ilagay dito ang iyong Make.com Webhook URL
      const webhookUrl = 'ILAGAY_MO_DITO_YUNG_MAKE_WEBHOOK_URL_MO';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Audit Request Sent Successfully! We will contact you shortly.");
        setIsModalOpen(false);
      } else {
        alert("May error sa pag-send. Pakisubukan muli.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Network error. Pakitingnan ang iyong koneksyon.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-900 selection:text-white relative">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="Kinetix Logo"
              width={40}
              height={40}
              className="rounded-xl object-cover shadow-sm border border-slate-100"
            />
            <span className="font-extrabold text-xl tracking-tight text-blue-900 lowercase">kinetix</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <a href="#solutions" className="hover:text-blue-900 transition-colors">Solutions</a>
            <a href="#comparison" className="hover:text-blue-900 transition-colors">Why Automation</a>
            <a href="#process" className="hover:text-blue-900 transition-colors">How It Works</a>
            <a href="#calculator" className="hover:text-blue-900 transition-colors">ROI Calculator</a>
            <a href="#faq" className="hover:text-blue-900 transition-colors">FAQ</a>
          </nav>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-950 hover:bg-blue-900 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all shadow-md shadow-blue-950/10"
          >
            Book Audit
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-white border-b border-slate-200/60 text-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none"></div>

        <div
          className="absolute inset-0 bg-grid-pattern pointer-events-none transition-all duration-75 ease-out"
          style={{
            WebkitMaskImage: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, rgba(0,0,0,0.4) 50%, transparent 100%)`,
            maskImage: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, rgba(0,0,0,0.4) 50%, transparent 100%)`,
          }}
        ></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Enterprise AI Architecture & Automation
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-6">
            Eliminate Operational Bottlenecks with <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-blue-800 to-blue-600">
              Smart AI Systems.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
            We design custom end-to-end automation pipelines for scaling businesses. Replace hours of tedious manual tasks with instant, automated data execution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-blue-950 hover:bg-blue-900 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-md shadow-blue-950/20"
            >
              Get Free Workflow Audit
            </button>
            <a
              href="#solutions"
              className="w-full sm:w-auto bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold px-8 py-4 rounded-xl transition-all shadow-sm"
            >
              Explore Solutions
            </a>
          </div>
        </div>
      </section>

      {/* Clean Minimalist Logo Marquee */}
      <section className="py-14 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Integrated with Enterprise Infrastructure</p>
          </div>
          
          <div className="relative w-full overflow-hidden">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-white to-transparent"></div>
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-white to-transparent"></div>

            <div className="animate-marquee flex items-center gap-16 md:gap-24 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <div className="flex items-center gap-3 shrink-0">
                <svg className="w-8 h-8 fill-slate-900" viewBox="0 0 24 24">
                  <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0905 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.259 23a6.0557 6.0557 0 0 0 5.772-4.2057 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7468-6.0732z"/>
                </svg>
                <span className="font-extrabold text-2xl tracking-tight text-slate-900">OpenAI</span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <svg className="w-8 h-8 fill-emerald-600" viewBox="0 0 24 24">
                  <path d="M21.362 9.354H12V.326a.326.326 0 00-.555-.23L.638 10.9a.326.326 0 00.23.555H12v9.028a.326.326 0 00.555.23l10.807-10.803a.326.326 0 00-.23-.556z"/>
                </svg>
                <span className="font-extrabold text-2xl tracking-tight text-slate-900">supabase</span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <svg className="w-8 h-8 fill-purple-600" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <span className="font-extrabold text-2xl tracking-tight text-slate-900">make</span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="font-serif font-black text-3xl tracking-tighter text-slate-900">ANTHROPIC</span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <svg className="w-8 h-8 fill-blue-600" viewBox="0 0 24 24">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
                </svg>
                <span className="font-bold text-2xl tracking-tight text-slate-900">Google Workspace</span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <svg className="w-8 h-8 stroke-blue-700" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="font-extrabold text-2xl tracking-tight text-slate-900">webhooks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions / Services Section */}
      <section id="solutions" className="py-24 bg-slate-50 border-b border-slate-200/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3.5 py-1 mb-4 text-xs font-semibold rounded-full border border-slate-200 bg-white text-slate-700 uppercase tracking-wider shadow-sm">
              Our Capabilities
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
              Enterprise Tech & AI Architecture
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              We build the digital infrastructure your business needs—from full-stack web applications to hands-off AI workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 group relative p-8 md:p-10 rounded-3xl bg-white border border-slate-300 shadow-sm hover:border-blue-900 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-100/50 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-950 to-blue-900 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-blue-950/20 group-hover:scale-105 transition-transform">
                    🌐
                  </div>
                  <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-900 border border-blue-200 rounded-full">
                    Core Infrastructure
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-950 mb-3 tracking-tight">
                  Custom Web Apps & Client Portals
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
                  High-performance, secure web applications engineered with Next.js, Tailwind CSS, and Supabase. Whether you need a customer dashboard, an internal operational management portal, or an e-commerce engine, we construct your complete digital hub.
                </p>
                
                <div className="grid sm:grid-cols-3 gap-3 mb-6 text-xs font-semibold text-slate-700">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                    <span className="text-blue-600 font-bold">✓</span> Admin & Client Dashboards
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                    <span className="text-blue-600 font-bold">✓</span> Real-Time Database
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                    <span className="text-blue-600 font-bold">✓</span> Fully Scalable Cloud
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-900">Custom Built Systems</span>
                <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>

            <div className="group relative p-8 rounded-3xl bg-white border border-slate-300 shadow-sm hover:border-blue-900 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-50 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-950 to-blue-900 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-blue-950/20 group-hover:scale-105 transition-transform">
                    🧠
                  </div>
                  <span className="text-xs font-bold px-3 py-1 bg-purple-50 text-purple-900 border border-purple-200 rounded-full">
                    Workflow Intelligence
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-950 mb-3 tracking-tight">
                  Smart AI Workflow Engines
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Eliminate repetitive manual tasks. We design custom AI logic using OpenAI and Make.com to process incoming leads, analyze complex invoices, handle support queries, and route data automatically.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-900">10x Speed</span>
                <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>

            <div className="group relative p-8 rounded-3xl bg-white border border-slate-300 shadow-sm hover:border-blue-900 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-50 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-950 to-blue-900 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-blue-950/20 group-hover:scale-105 transition-transform">
                    🔗
                  </div>
                  <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-full">
                    Connectivity
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-950 mb-3 tracking-tight">
                  API & Ecosystem Pipelines
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Connect your existing software stack without friction. We bridge Google Workspace, Meta Messenger, CRMs, payment gateways, and custom databases via secure Webhooks and official APIs.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-900">Zero Data Silos</span>
                <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>

            <div className="md:col-span-2 group relative p-8 md:p-10 rounded-3xl bg-white border border-slate-300 shadow-sm hover:border-blue-900 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-amber-50 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-950 to-blue-900 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-blue-950/20 group-hover:scale-105 transition-transform">
                    ⚙️
                  </div>
                  <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-full">
                    End-to-End Delivery
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-950 mb-3 tracking-tight">
                  Bespoke Enterprise Systems & More
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
                  Need a completely tailored technical solution? From custom AI agent tools and automated CRM suites to full operational migrations—we design, build, deploy, and maintain bespoke software systems engineered specifically around your business model.
                </p>

                <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700 mb-6">
                  <span className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200">Custom AI Agents</span>
                  <span className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200">Order Management</span>
                  <span className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200">Automated Dashboards</span>
                  <span className="px-3.5 py-2 rounded-xl bg-blue-950 text-white font-bold">And More...</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-900">Tailored Solutions</span>
                <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Kinetix / Comparison Section */}
      <section id="comparison" className="py-24 bg-slate-50 border-b border-slate-200/60 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-[32px] border border-slate-200/80 shadow-xl shadow-slate-950/5 p-8 md:p-16 relative overflow-hidden">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-3.5 py-1 mb-4 text-xs font-semibold rounded-full border border-slate-200 bg-slate-50 text-slate-700 uppercase tracking-wider">
                Why Kinetix
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
                Why Businesses Switch to Kinetix
              </h2>
              <p className="text-slate-600 text-base md:text-lg">
                Comparing traditional manual business operations versus automated architecture.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-50/80 rounded-2xl p-8 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Traditional Manual Process</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Prone to delays and heavy human overhead</h3>
                  <ul className="space-y-4 text-sm text-slate-600">
                    <li className="flex items-start gap-3">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>Response times take 2 to 12 hours, leading to cold leads.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>5% to 15% human error frequency in data entry and copy-pasting.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>High recurring payroll and staffing overhead for routine tasks.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white rounded-2xl p-8 shadow-lg flex flex-col justify-between relative overflow-hidden">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-300">Kinetix Automated System</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-6">Instant, error-free automated execution</h3>
                  <ul className="space-y-4 text-sm text-slate-200">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 font-bold">✓</span>
                      <span>Under 5-second response time, operating 24/7 seamlessly.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 font-bold">✓</span>
                      <span>0% error rate through strict programmatic rule execution.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 font-bold">✓</span>
                      <span>Up to 80% reduction in manual labor overhead and costs.</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-blue-900/40 flex items-center justify-between text-xs text-blue-300">
                  <span>Powered by Advanced AI & APIs</span>
                  <span className="font-semibold text-white">Fully Scalable ➔</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Scrollytelling Process Section */}
      <ProcessScrollytelling />

      {/* ROI Calculator */}
      <section id="calculator" className="py-24 bg-white border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-2">Estimate Your Monthly Savings</h2>
              <p className="text-slate-600 text-sm">Calculate how much payroll budget you reclaim through automation.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Team Members Handling Manual Admin</label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full accent-blue-900 cursor-pointer"
                  />
                  <div className="flex justify-between text-sm font-semibold text-slate-700 mt-1">
                    <span>1 Person</span>
                    <span className="text-blue-900 font-bold">{teamSize} {teamSize === 1 ? 'Person' : 'People'}</span>
                    <span>20 People</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Hours Spent on Manual Work per Day</label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={hoursSpent}
                    onChange={(e) => setHoursSpent(Number(e.target.value))}
                    className="w-full accent-blue-900 cursor-pointer"
                  />
                  <div className="flex justify-between text-sm font-semibold text-slate-700 mt-1">
                    <span>1 Hour</span>
                    <span className="text-blue-900 font-bold">{hoursSpent} {hoursSpent === 1 ? 'Hour' : 'Hours'}</span>
                    <span>8 Hours</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-8 rounded-2xl text-center shadow-xl border border-blue-900/30">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300">Estimated Monthly Savings</span>
                <div className="text-4xl md:text-5xl font-extrabold text-blue-400 my-4">₱ {monthlySavings.toLocaleString()}</div>
                <p className="text-xs text-slate-300 mb-6">Based on standard administrative wage benchmarks.</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition-all text-sm shadow-md shadow-blue-600/30"
                >
                  Automate This System
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <footer className="py-12 bg-white text-slate-500 text-sm border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-blue-900 lowercase">kinetix</span>
            <span>© 2026. All rights reserved.</span>
          </div>
          <p className="text-xs text-slate-500">Enterprise AI & Workflow Automation Systems</p>
        </div>
      </footer>

      {/* Modal / Booking Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-lg"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-slate-950 mb-2">Book a Free Workflow Audit</h3>
            <p className="text-sm text-slate-600 mb-6">Leave your details and our agency will analyze your business processes.</p>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="John Doe" 
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Business Email</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="john@company.com" 
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900" 
                />
              </div>
              <button type="submit" className="w-full bg-blue-950 hover:bg-blue-900 text-white font-semibold py-3 rounded-xl text-sm transition-all shadow-md">
                Submit Audit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}