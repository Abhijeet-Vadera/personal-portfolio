import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export const EngineeringCTA: React.FC = () => {
    return (
        <section className="py-20 md:py-24 print:hidden">
            <div className="layout-container">
                <div className="ml-[72px]">
                    <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden px-8 py-12 md:px-14 md:py-16">
                        {/* Background glow */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-0 left-1/2 w-96 h-48 bg-accent-gold/[0.05] blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2" />
                        </div>

                        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-10">
                            <div>
                                <p className="text-[9px] font-mono text-accent-gold/50 uppercase tracking-[0.3em] mb-4">
                                    OPEN TO OPPORTUNITIES
                                </p>
                                <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight mb-4">
                                    Let's build the future.
                                </h2>
                                <p className="text-foreground/45 text-sm leading-relaxed max-w-md">
                                    Currently open to architectural consulting and senior engineering leadership roles.
                                    Let's talk systems, scale, and strategy.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 md:items-end shrink-0">
                                <a
                                    href="mailto:hello@abhijeet.dev"
                                    className="inline-flex items-center gap-2.5 rounded-xl bg-accent-gold px-7 py-3.5 font-display font-bold text-black text-sm hover:bg-white transition-colors group"
                                >
                                    <Mail size={14} />
                                    Get in touch
                                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                </a>
                                <p className="text-[9px] font-mono text-foreground/25 uppercase tracking-widest text-center md:text-right">
                                    hello@abhijeet.dev
                                </p>
                            </div>
                        </div>

                        {/* Bottom accent line */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
                    </div>
                </div>
            </div>
        </section>
    );
};
