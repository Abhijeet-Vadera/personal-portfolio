import React from 'react';
import { Activity, Server, Database, Cloud, AlertTriangle, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { GlassCard } from '@portfolio/shared-ui';

export const SystemMonitoring: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-3xl font-display font-bold text-white mb-2">System Monitoring</h2>
                <p className="text-sm font-mono text-foreground/40 tracking-widest uppercase">
                    Real-time Infrastructure Status
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <GlassCard className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-green-500/10 rounded-xl text-green-400">
                            <Server size={24} />
                        </div>
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mt-2" />
                    </div>
                    <div className="text-xl font-display font-bold text-white mb-1">Operational</div>
                    <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">Engineering Portal</div>
                </GlassCard>

                <GlassCard className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
                            <AlertTriangle size={24} />
                        </div>
                        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse mt-2" />
                    </div>
                    <div className="text-xl font-display font-bold text-white mb-1">Down (Simulated)</div>
                    <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">Photography Portal</div>
                </GlassCard>

                <GlassCard className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                            <ImageIcon size={24} />
                        </div>
                    </div>
                    <div className="text-3xl font-display font-bold text-white mb-1">1,204</div>
                    <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">Total S3 Images</div>
                </GlassCard>

                <GlassCard className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                            <Database size={24} />
                        </div>
                    </div>
                    <div className="text-3xl font-display font-bold text-white mb-1">4.2 GB</div>
                    <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">Total Storage Used</div>
                </GlassCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard className="p-8">
                    <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                        <Activity className="text-accent-gold" size={20} />
                        Downtime Incidents
                    </h3>
                    <div className="space-y-4 font-mono text-sm text-foreground/60">
                        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex gap-4 items-start">
                            <AlertTriangle className="text-red-500 mt-0.5 shrink-0" size={16} />
                            <div>
                                <p className="text-white font-display">Photography Portal Unreachable</p>
                                <p className="text-xs text-red-400 mt-1">Detected at 12:45:33 UTC</p>
                                <p className="text-xs mt-1">Error 502: Bad Gateway from CloudFront edge.</p>
                            </div>
                        </div>
                        <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl flex gap-4 items-start opacity-70">
                            <CheckCircle2 className="text-green-500 mt-0.5 shrink-0" size={16} />
                            <div>
                                <p className="text-white font-display">Engineering Portal Recovered</p>
                                <p className="text-xs text-green-400 mt-1">Resolved at 09:12:00 UTC</p>
                                <p className="text-xs mt-1">Downtime duration: 4m 12s.</p>
                            </div>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-8">
                    <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                        <Cloud className="text-accent-gold" size={20} />
                        Storage Configuration
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-xs font-mono text-foreground/60 mb-2 uppercase tracking-widest">
                                <span>Media Bucket (S3) Capacity</span>
                                <span className="text-white">8.4%</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-accent-gold w-[8.4%]" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest mb-1">Primary Type</p>
                                <p className="text-sm text-white font-display">image/webp</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest mb-1">Largest Asset</p>
                                <p className="text-sm text-white font-display">gallery_hero.jpg (8.2MB)</p>
                            </div>
                        </div>
                        <p className="text-[10px] font-mono text-accent-gold/80 bg-accent-gold/10 p-3 rounded-lg border border-accent-gold/20 leading-relaxed">
                            Bucket configured with CDN caching. Average cache hit ratio is 94.2%.
                        </p>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};
