import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ChevronRight, Terminal, AlertTriangle } from 'lucide-react';
import { cn } from '@portfolio/shared-ui';
import { useAuth } from '../../hooks/useAuthHook';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-accent-gold/10 via-background to-background">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-6 group hover:border-accent-gold/50 transition-colors">
                        <Terminal className="text-accent-gold group-hover:scale-110 transition-transform" size={32} />
                    </div>
                    <h1 className="text-4xl font-display font-bold text-white tracking-tighter">
                        Central Command
                    </h1>
                    <p className="text-foreground/40 font-mono text-xs uppercase tracking-[0.3em] mt-3">
                        Secure Authentication Protocol
                    </p>
                </div>

                <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono"
                            >
                                <AlertTriangle size={16} />
                                {error}
                            </motion.div>
                        )}
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-foreground/50 ml-1">
                                Identity / Email
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-accent-gold transition-colors" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/40 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white font-sans focus:outline-none focus:border-accent-gold/30 focus:ring-1 focus:ring-accent-gold/20 transition-all"
                                    placeholder="name@abhijeet.dev"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-foreground/50 ml-1">
                                Access Token / Password
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-accent-gold transition-colors" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/40 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white font-sans focus:outline-none focus:border-accent-gold/30 focus:ring-1 focus:ring-accent-gold/20 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={cn(
                                "group relative w-full bg-white text-black font-display font-bold py-4 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all",
                                isLoading && "opacity-70 cursor-not-allowed"
                            )}
                        >
                            <div className="relative z-10 flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <div className="h-5 w-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>AUTHENTICATE</span>
                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                            <div className="absolute inset-0 bg-accent-gold translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <a href="#" className="text-[10px] font-mono text-foreground/30 hover:text-white transition-colors tracking-widest uppercase">
                            Forgot Access Credentials?
                        </a>
                    </div>
                </div>

                <p className="text-center mt-10 text-[10px] font-mono text-foreground/20 tracking-[0.5em] uppercase">
                    AV-PLATFORM-OS v2.4.0 // SECURE NODE
                </p>
            </motion.div>
        </div>
    );
};
