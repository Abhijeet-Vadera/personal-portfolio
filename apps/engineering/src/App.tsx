import React from 'react'
import { Timeline } from './components/Timeline'
import { ProjectShowcase } from './components/ProjectShowcase'
import { ImpactMetrics } from './components/ImpactMetrics'
import { EngineeringHero } from './components/EngineeringHero'
import { EngineeringCTA } from './components/EngineeringCTA'
import { PrintStyles } from './components/PrintStyles'
import { Download, Terminal } from 'lucide-react'

function App() {
    const handleDownloadCV = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-accent-gold selection:text-black">
            <PrintStyles />

            {/* — Navigation — */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05] bg-[#050505]/85 backdrop-blur-xl print:hidden">
                <div className="layout-container flex h-14 items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <Terminal className="text-accent-gold" size={14} strokeWidth={1.5} />
                        <span className="font-display font-bold text-white tracking-tighter text-[13px]">
                            AV<span className="text-accent-gold/60 font-light mx-1">/</span>ENG
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        {['Metrics', 'Career', 'Projects'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-[10px] font-mono text-foreground/35 hover:text-accent-gold tracking-[0.2em] uppercase transition-colors duration-200"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                    <button
                        onClick={handleDownloadCV}
                        className="flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.08] px-4 py-1.5 text-[10px] font-mono text-foreground/50 hover:bg-accent-gold/10 hover:text-accent-gold hover:border-accent-gold/30 transition-all group"
                    >
                        <Download size={10} className="group-hover:translate-y-0.5 transition-transform" />
                        CV
                    </button>
                </div>
            </nav>

            <main className="pt-14 print:pt-0">

                {/* — Hero — */}
                <EngineeringHero />

                {/* — Divider line — */}
                <div className="layout-container print:hidden">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
                </div>

                {/* — Impact Metrics — */}
                <section id="metrics" className="py-20 md:py-24 print:py-8">
                    <div className="layout-container">
                        <SectionLabel index="01" label="Impact at Scale" />
                        <ImpactMetrics />
                    </div>
                </section>

                <div className="layout-container print:hidden">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
                </div>

                {/* — Career Timeline — */}
                <section id="career" className="py-20 md:py-24 print:py-0">
                    <div className="layout-container">
                        <SectionLabel index="02" label="Career Progression" />
                        <p className="text-foreground/35 font-mono text-[10px] tracking-[0.25em] uppercase mt-2 mb-14 ml-[72px]">
                            Evolution of technical leadership &amp; architectural focus
                        </p>
                        <Timeline />
                    </div>
                </section>

                <div className="layout-container print:hidden">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
                </div>

                {/* — Selected Projects — */}
                <section id="projects" className="py-20 md:py-24 print:py-0">
                    <div className="layout-container">
                        <SectionLabel index="03" label="Selected Systems" />
                        <p className="text-foreground/35 text-sm leading-relaxed mt-2 mb-14 ml-[72px] max-w-lg">
                            Architectural projects demonstrating scale, security and high-performance engineering.
                        </p>
                        <ProjectShowcase />
                    </div>
                </section>

                {/* — CTA — */}
                <EngineeringCTA />

            </main>

            {/* — Footer — */}
            <footer className="py-10 border-t border-white/[0.05] print:hidden">
                <div className="layout-container flex items-center justify-between">
                    <p className="text-foreground/20 text-[10px] font-mono uppercase tracking-[0.3em]">
                        © 2026 AV-ENGINEERING-OS
                    </p>
                    <p className="text-foreground/15 text-[10px] font-mono uppercase tracking-[0.2em]">
                        All Rights Reserved
                    </p>
                </div>
            </footer>
        </div>
    )
}

/* Small inline helper — section heading with index */
function SectionLabel({ index, label }: { index: string; label: string }) {
    return (
        <div className="flex items-baseline gap-5 mb-1">
            <span className="text-[10px] font-mono text-accent-gold/50 tracking-[0.3em] shrink-0 w-14 text-right">
                {index}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                {label}
            </h2>
        </div>
    );
}

export default App
