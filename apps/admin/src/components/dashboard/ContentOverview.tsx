import React from 'react';
import { GlassCard } from '@portfolio/shared-ui';
import { FileCode, ImageIcon, Eye, Zap } from 'lucide-react';

const StatCard: React.FC<{ icon: any, label: string, value: string, trend: string }> = ({ icon: Icon, label, value, trend }) => (
    <GlassCard className="flex items-center justify-between p-8" hoverEffect={true}>
        <div>
            <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.2em] mb-2">{label}</p>
            <h3 className="text-4xl font-display font-bold text-white mb-2">{value}</h3>
            <p className="text-[10px] font-mono text-green-500/80 uppercase tracking-widest">{trend}</p>
        </div>
        <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Icon size={28} className="text-accent-gold/70" />
        </div>
    </GlassCard>
);

export const ContentOverview: React.FC = () => {
    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard icon={Eye} label="Platform Reach" value="48.2K" trend="↑ 12.4% MONTHLY" />
                <StatCard icon={FileCode} label="Career Snapshots" value="24" trend="↑ SYSTEM SYNCED" />
                <StatCard icon={ImageIcon} label="Visual Assets" value="342" trend="↑ 15 NEW" />
                <StatCard icon={Zap} label="API Performance" value="42ms" trend="↓ OPTIMIZED" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">
                <GlassCard className="lg:col-span-2 p-10 h-96">
                    <h3 className="text-xl font-display font-bold mb-6">Recent Deployments</h3>
                    <div className="space-y-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                                <div className="flex gap-4 items-center">
                                    <div className="h-10 w-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500">
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-display font-medium">Production Build #8271</p>
                                        <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">Automation Engine // SUCCESS</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono text-foreground/30">2H AGO</span>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard className="p-10 flex flex-col justify-center items-center text-center">
                    <div className="h-32 w-32 rounded-full border-4 border-accent-gold/20 border-t-accent-gold animate-spin-slow flex items-center justify-center mb-8">
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-display font-bold">98%</span>
                            <span className="text-[8px] font-mono uppercase tracking-widest opacity-40">Uptime</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-display font-bold mb-2">Cloud Infrastructure</h3>
                    <p className="text-foreground/40 text-xs font-mono tracking-widest uppercase">Nodes Operating Nominally</p>
                </GlassCard>
            </div>
        </div>
    );
};
