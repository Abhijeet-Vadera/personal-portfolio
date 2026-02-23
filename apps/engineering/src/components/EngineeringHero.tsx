import React, { useEffect, useRef } from 'react';
import { gsap } from '@portfolio/config-animations';
import { MapPin, Zap, Code2 } from 'lucide-react';

export const EngineeringHero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-anim', {
                y: 40,
                opacity: 0,
                stagger: 0.12,
                duration: 1.1,
                ease: 'power4.out',
                delay: 0.15,
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative overflow-hidden py-20 md:py-32 print:py-8">

            {/* Background atmosphere */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent-gold/[0.03] blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-gold/[0.02] blur-[120px] rounded-full pointer-events-none" />

            {/* Subtle dot grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.015]"
                style={{
                    backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
                    backgroundSize: '36px 36px',
                }}
            />

            <div className="layout-container">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16 items-start">

                    {/* Left — Main content */}
                    <div>
                        {/* Status badge */}
                        <div className="hero-anim inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-gold/[0.08] border border-accent-gold/[0.18] text-accent-gold text-[9px] font-mono tracking-[0.25em] uppercase mb-10">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-gold opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-gold" />
                            </span>
                            Available for Senior Roles
                        </div>

                        <h1 className="hero-anim font-display font-bold tracking-tighter leading-[0.95] mb-8">
                            <span
                                className="block text-white"
                                style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
                            >
                                Engineering
                            </span>
                            <span
                                className="block text-accent-gold"
                                style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
                            >
                                Excellence.
                            </span>
                        </h1>

                        <p className="hero-anim text-base text-foreground/45 leading-relaxed max-w-md mb-10">
                            Architecting high-performance distributed systems with a focus on
                            technical scalability, developer experience, and robust cloud infrastructure.
                        </p>

                        {/* Inline skill pills */}
                        <div className="hero-anim flex flex-wrap gap-2">
                            {['Systems Architecture', 'Cloud-Native', 'Engineering Leadership', 'High-Performance APIs'].map(s => (
                                <span
                                    key={s}
                                    className="px-3 py-1 rounded-full border border-white/[0.07] bg-white/[0.03] text-[10px] font-mono text-foreground/40 tracking-wider"
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right — Spec panel */}
                    <div className="hero-anim border border-white/[0.07] rounded-2xl bg-white/[0.02] p-6 space-y-5 print:hidden">
                        <p className="text-[9px] font-mono text-foreground/25 uppercase tracking-[0.3em] mb-2">
                            SPEC / OVERVIEW
                        </p>

                        <SpecRow icon={<MapPin size={11} />} label="Location" value="Remote — India" />
                        <div className="h-px bg-white/[0.05]" />
                        <SpecRow icon={<Zap size={11} />} label="Focus" value="Distributed Systems" />
                        <div className="h-px bg-white/[0.05]" />
                        <SpecRow icon={<Code2 size={11} />} label="Stack" value="TS · Go · Rust · K8s" />
                        <div className="h-px bg-white/[0.05]" />

                        {/* Level bar */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-[9px] font-mono text-foreground/35 uppercase tracking-[0.2em]">Experience</p>
                                <p className="text-[9px] font-mono text-accent-gold tracking-wider">8+ YRS</p>
                            </div>
                            <div className="h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-accent-gold/60 to-accent-gold rounded-full"
                                    style={{ width: '82%' }}
                                />
                            </div>
                        </div>

                        <a
                            href="mailto:hello@abhijeet.dev"
                            className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-accent-gold/10 border border-accent-gold/20 text-accent-gold text-[10px] font-mono tracking-[0.2em] hover:bg-accent-gold/15 transition-colors"
                        >
                            → GET IN TOUCH
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
};

function SpecRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-foreground/30">
                {icon}
                <span className="text-[9px] font-mono uppercase tracking-[0.2em]">{label}</span>
            </div>
            <span className="text-[10px] font-mono text-foreground/55 text-right">{value}</span>
        </div>
    );
}
