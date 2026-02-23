import React, { useEffect, useRef } from 'react';
import { projectData } from '../data/projects';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { gsap } from '@portfolio/config-animations';

export const ProjectShowcase: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.proj-card', {
                y: 32,
                opacity: 0,
                stagger: 0.1,
                duration: 0.85,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 95%',
                    once: true,
                },
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const [featured, ...rest] = projectData;

    return (
        <div ref={containerRef} className="ml-[72px] space-y-4">

            {/* Featured project — full width with more emphasis */}
            {featured && (
                <article
                    className="proj-card group relative border border-white/[0.07] rounded-2xl bg-white/[0.02] overflow-hidden hover:border-accent-gold/25 hover:bg-white/[0.035] transition-all duration-500"
                >
                    {/* Accent corner glow */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-accent-gold/[0.04] blur-[60px] rounded-full pointer-events-none translate-x-12 -translate-y-12" />

                    <div className="p-7 md:p-8">
                        <div className="flex items-start justify-between gap-4 mb-5">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-[9px] font-mono text-accent-gold/50 uppercase tracking-[0.3em]">
                                        Featured
                                    </span>
                                    <span className="px-2.5 py-0.5 bg-accent-gold/10 border border-accent-gold/20 rounded-full text-accent-gold text-[8px] font-mono uppercase tracking-[0.15em]">
                                        {featured.role}
                                    </span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-display font-bold text-white group-hover:text-accent-gold transition-colors duration-300 tracking-tight">
                                    {featured.title}
                                </h3>
                            </div>
                            <div className="flex gap-1.5 flex-shrink-0 mt-1">
                                <button className="p-2 rounded-lg border border-white/[0.07] text-foreground/30 hover:text-white hover:border-white/20 transition-all">
                                    <Github size={13} />
                                </button>
                                <button className="p-2 rounded-lg border border-white/[0.07] text-foreground/30 hover:text-accent-gold hover:border-accent-gold/25 transition-all">
                                    <ArrowUpRight size={13} />
                                </button>
                            </div>
                        </div>

                        <p className="text-foreground/45 text-sm leading-relaxed mb-6 max-w-2xl">
                            {featured.description}
                        </p>

                        {/* Metrics inline */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {featured.metrics.map((metric, i) => {
                                const [val, ...rest] = metric.split(' ');
                                return (
                                    <div key={i} className="flex items-baseline gap-1.5 px-3 py-1.5 rounded-lg border border-accent-gold/[0.12] bg-accent-gold/[0.05]">
                                        <span className="text-sm font-display font-bold text-white">{val}</span>
                                        <span className="text-[8px] font-mono text-accent-gold/45 uppercase tracking-widest">{rest.join(' ')}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5">
                            {featured.tech.map((t) => (
                                <span key={t} className="px-2 py-0.5 bg-background/70 border border-white/[0.05] rounded text-[9px] text-foreground/30 font-mono uppercase tracking-wider hover:text-foreground/55 transition-colors">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </article>
            )}

            {/* Remaining — 2 column grid */}
            {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rest.map((project) => (
                        <article
                            key={project.id}
                            className="proj-card group flex flex-col border border-white/[0.06] rounded-xl bg-white/[0.02] overflow-hidden hover:border-accent-gold/20 hover:bg-white/[0.03] transition-all duration-500"
                        >
                            <div className="p-6 flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <span className="inline-block mb-2 px-2 py-0.5 bg-accent-gold/08 border border-accent-gold/15 rounded-full text-accent-gold text-[8px] font-mono uppercase tracking-[0.15em]">
                                        {project.role}
                                    </span>
                                    <h3 className="text-lg font-display font-bold text-white group-hover:text-accent-gold transition-colors duration-300 tracking-tight">
                                        {project.title}
                                    </h3>
                                </div>
                                <button className="shrink-0 p-1.5 rounded-lg border border-white/[0.07] text-foreground/25 hover:text-accent-gold hover:border-accent-gold/25 transition-all mt-1">
                                    <ExternalLink size={11} />
                                </button>
                            </div>

                            <p className="px-6 pb-5 text-foreground/40 text-sm leading-relaxed flex-grow">
                                {project.description}
                            </p>

                            {/* Compact metric row */}
                            <div className="mx-6 mb-5 grid grid-cols-3 divide-x divide-white/[0.05] border border-white/[0.05] rounded-lg overflow-hidden">
                                {project.metrics.slice(0, 3).map((metric, i) => {
                                    const [val, ...rest] = metric.split(' ');
                                    return (
                                        <div key={i} className="py-3 text-center">
                                            <p className="text-white font-display font-bold text-base leading-none">{val}</p>
                                            <p className="text-accent-gold/40 text-[7px] font-mono uppercase tracking-widest mt-1">{rest.join(' ')}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex flex-wrap gap-1.5 px-6 pb-5">
                                {project.tech.map((t) => (
                                    <span key={t} className="px-2 py-0.5 bg-background/70 border border-white/[0.05] rounded text-[8px] text-foreground/25 font-mono uppercase tracking-wider">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};
