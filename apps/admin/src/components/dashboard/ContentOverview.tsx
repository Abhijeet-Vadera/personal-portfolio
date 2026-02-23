import React from 'react';
import { GlassCard } from '@portfolio/shared-ui';
import { Download, Globe, Camera, MapPin, Activity } from 'lucide-react';

const StatCard: React.FC<{ icon: any, label: string, value: string, subValue: string, trend: string }> = ({ icon: Icon, label, value, subValue, trend }) => (
    <GlassCard className="flex flex-col justify-between p-6" hoverEffect={true}>
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <Icon size={20} className="text-accent-gold/70" />
            </div>
            <p className="text-[10px] font-mono text-green-500/80 uppercase tracking-widest bg-green-500/10 px-2 py-1 rounded-full">{trend}</p>
        </div>
        <div>
            <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.2em] mb-1">{label}</p>
            <h3 className="text-3xl font-display font-bold text-white mb-1">{value}</h3>
            <p className="text-xs font-mono text-foreground/60">{subValue}</p>
        </div>
    </GlassCard>
);

export const ContentOverview: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-3xl font-display font-bold text-white mb-2">Platform Analytics</h2>
                <p className="text-sm font-mono text-foreground/40 tracking-widest uppercase">
                    Audience & Engagement Overview
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={Download}
                    label="CV Downloads (Eng)"
                    value="142"
                    subValue="Downloads this month"
                    trend="↑ 12%"
                />
                <StatCard
                    icon={Globe}
                    label="Top Portfolio"
                    value="Engineering"
                    subValue="68% of total traffic"
                    trend="DOMINANT"
                />
                <StatCard
                    icon={MapPin}
                    label="Global Reach"
                    value="12"
                    subValue="Countries accessing"
                    trend="↑ 2 NEW"
                />
                <StatCard
                    icon={Activity}
                    label="Total Visits"
                    value="4.2K"
                    subValue="Across all portals"
                    trend="↑ 5.4%"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-white">
                <GlassCard className="lg:col-span-2 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Camera className="text-accent-gold" size={24} />
                        <h3 className="text-xl font-display font-bold">Photography Engagement</h3>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest mb-2">Most Opened Photos</p>
                            <div className="flex items-center justify-between py-3 border-b border-white/5">
                                <span className="text-sm font-medium">1. Neon Nights (Tokyo)</span>
                                <span className="text-xs font-mono text-accent-gold">842 Views</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-white/5">
                                <span className="text-sm font-medium">2. Azure Coast (Amalfi)</span>
                                <span className="text-xs font-mono text-accent-gold">610 Views</span>
                            </div>
                        </div>
                        <div className="pt-4">
                            <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest mb-2">Least Opened / Hidden Gems</p>
                            <div className="flex items-center justify-between py-3 border-b border-white/5">
                                <span className="text-sm font-medium text-white/60">Midnight Train (Local)</span>
                                <span className="text-xs font-mono text-white/40">12 Views</span>
                            </div>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-8 flex flex-col justify-center items-center text-center">
                    <div className="h-32 w-32 rounded-full border-4 border-white/10 flex items-center justify-center mb-6 relative">
                        <div className="absolute inset-0 rounded-full border-4 border-accent-gold border-r-transparent animate-spin-slow opacity-50"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-display font-bold">45</span>
                            <span className="text-[8px] font-mono uppercase tracking-widest opacity-40">Cities</span>
                        </div>
                    </div>
                    <h3 className="text-lg font-display font-bold mb-2">Traffic Origins</h3>
                    <p className="text-foreground/40 text-xs font-mono tracking-widest uppercase">
                        Highest traffic from: <br /><strong className="text-white">India, USA, Germany</strong>
                    </p>
                </GlassCard>
            </div>

            <div className="p-4 bg-accent-gold/10 border border-accent-gold/20 rounded-xl">
                <p className="text-xs font-mono text-accent-gold uppercase tracking-widest text-center">
                    Note: Granular tracking requires AWS Pinpoint or Google Analytics integration on the frontend clients. These metrics are currently visual placeholders pending backend telemetry setup.
                </p>
            </div>
        </div>
    );
};
