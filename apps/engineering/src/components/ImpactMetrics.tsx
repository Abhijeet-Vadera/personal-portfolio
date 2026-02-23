import React, { useEffect, useRef } from 'react';
import { gsap } from '@portfolio/config-animations';

const metrics = [
    { label: 'Systems Deployed', value: '250+', sub: 'Enterprise scale', icon: '⬡' },
    { label: 'Latency Reduced', value: '45%', sub: 'Avg improvement', icon: '⚡' },
    { label: 'Team Size', value: '15+', sub: 'Direct reports', icon: '◈' },
    { label: 'Revenue Impact', value: '$40M+', sub: 'Yearly uplift', icon: '◎' },
];

export const ImpactMetrics: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.metric-item', {
                y: 24,
                opacity: 0,
                stagger: 0.09,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 95%',
                    once: true,
                },
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={ref} className="ml-[72px]">
            {/* Metric row — 4 columns */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((m, i) => (
                    <div
                        key={i}
                        className="metric-item group relative overflow-hidden border border-white/[0.06] rounded-xl p-6 bg-white/[0.02] hover:border-accent-gold/25 hover:bg-white/[0.04] transition-all duration-500 cursor-default"
                    >
                        {/* Top icon accent */}
                        <div className="text-accent-gold/20 text-xl font-mono mb-4 group-hover:text-accent-gold/40 transition-colors">
                            {m.icon}
                        </div>
                        <p className="text-3xl md:text-4xl font-display font-bold text-white mb-2 group-hover:text-accent-gold transition-colors duration-300">
                            {m.value}
                        </p>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60 mb-0.5">
                            {m.label}
                        </p>
                        <p className="text-[9px] font-mono uppercase tracking-widest text-white/25">
                            {m.sub}
                        </p>
                        {/* Hover glow */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/0 to-transparent group-hover:via-accent-gold/40 transition-all duration-500" />
                    </div>
                ))}
            </div>
        </div>
    );
};
