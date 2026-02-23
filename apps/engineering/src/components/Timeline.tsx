import React, { useEffect, useRef } from 'react';
import { gsap } from '@portfolio/config-animations';
import { timelineData } from '../data/timeline';

export const Timeline: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            timelineData.forEach((_, index) => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: `.tl-item-${index}`,
                        start: 'top 88%',
                        once: true,
                    },
                });

                tl.fromTo(
                    `.tl-dot-${index}`,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)' }
                );
                tl.fromTo(
                    `.tl-card-${index}`,
                    { x: -20, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
                    '-=0.1'
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="ml-[72px]">
            {/* Left-rail single-column timeline */}
            <div className="relative pl-10">
                {/* Vertical line */}
                <div
                    className="absolute left-0 top-2 bottom-2 w-px hidden sm:block"
                    style={{
                        background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.25) 10%, rgba(212,175,55,0.25) 90%, transparent)',
                    }}
                />

                <div className="space-y-10">
                    {timelineData.map((event, index) => (
                        <div
                            key={index}
                            className={`tl-item-${index} relative`}
                        >
                            {/* Dot on left rail */}
                            <div className={`tl-dot-${index} absolute -left-10 top-7 hidden sm:flex items-center justify-center`}>
                                <div className="w-2 h-2 rounded-full bg-accent-gold ring-[3px] ring-accent-gold/15 shadow-[0_0_12px_rgba(212,175,55,0.5)]" />
                            </div>

                            {/* Card */}
                            <div className={`tl-card-${index} group border border-white/[0.06] rounded-xl p-6 bg-white/[0.02] hover:border-accent-gold/20 hover:bg-white/[0.035] transition-all duration-400`}>
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div>
                                        <h3 className="text-lg font-display font-bold text-white group-hover:text-accent-gold transition-colors duration-300 tracking-tight">
                                            {event.title}
                                        </h3>
                                        <p className="text-[10px] font-mono text-accent-gold/45 uppercase tracking-[0.2em] mt-1">
                                            {event.company}
                                        </p>
                                    </div>
                                    <span className="shrink-0 px-2.5 py-1 border border-accent-gold/20 bg-accent-gold/[0.06] rounded-full text-accent-gold font-mono text-[9px] tracking-[0.18em] whitespace-nowrap">
                                        {event.year}
                                    </span>
                                </div>

                                <p className="text-foreground/45 text-sm leading-relaxed mb-5">
                                    {event.description}
                                </p>

                                <div className="flex flex-wrap gap-1.5">
                                    {event.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="px-2 py-0.5 bg-background/70 border border-white/[0.05] rounded text-[9px] text-foreground/30 font-mono uppercase tracking-wider hover:text-foreground/55 transition-colors"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
