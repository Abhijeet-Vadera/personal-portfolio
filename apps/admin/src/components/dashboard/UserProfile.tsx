import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { GlassCard } from '@portfolio/shared-ui';
import { User, Mail, Shield, Key } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { ToastContainer } from '../common/Toast';

export const UserProfile: React.FC = () => {
    const { toasts, toast, removeToast } = useToast();
    const [userAttr, setUserAttr] = useState<Record<string, string>>({});
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser();
                setUsername(user.username);
                const { attributes } = user;
                setUserAttr(attributes || {});
            } catch (err) {
                console.error('Failed to load user attributes', err);
            }
        };
        fetchUser();
    }, []);

    const handleChangePassword = async () => {
        toast.info('Feature Coming Soon', 'Password change flow will be implemented shortly.');
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
            <ToastContainer toasts={toasts} onRemove={removeToast} />

            <div>
                <h2 className="text-3xl font-display font-bold text-white mb-2">Master Profile</h2>
                <p className="text-sm font-mono text-foreground/40 tracking-widest uppercase">
                    Admin Node Identity Management
                </p>
            </div>

            <GlassCard className="p-8">
                <div className="flex items-start gap-8">
                    {/* Avatar */}
                    <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-accent-gold/40 to-black/40 flex items-center justify-center border border-accent-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                        <User size={64} className="text-accent-gold" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <p className="text-xs font-mono text-foreground/40 uppercase tracking-widest mb-1 flex items-center gap-2">
                                <Shield size={12} className="text-accent-gold" /> Security Clearance Level
                            </p>
                            <p className="font-display font-bold text-2xl text-white">Omega / Root</p>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-mono text-green-500/80 uppercase">Identity Verified via Cognito</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                            <div>
                                <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest mb-1 flex items-center gap-2">
                                    <User size={10} /> Username / Subject
                                </p>
                                <p className="font-mono text-sm text-foreground">{username || 'Loading...'}</p>
                            </div>

                            <div>
                                <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest mb-1 flex items-center gap-2">
                                    <Mail size={10} /> Notification Routing
                                </p>
                                <p className="font-mono text-sm text-foreground">{userAttr?.email || 'Loading...'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex justify-end">
                    <button
                        onClick={handleChangePassword}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-mono text-sm uppercase tracking-widest transition-all border border-white/10"
                    >
                        <Key size={14} className="text-accent-gold" />
                        Rotate Encryption Keys
                    </button>
                </div>
            </GlassCard>
        </div>
    );
};
