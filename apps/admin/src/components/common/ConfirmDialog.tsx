import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, Info, X, Loader2 } from 'lucide-react';

export type ConfirmVariant = 'danger' | 'success' | 'info';

export interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: ConfirmVariant;
    isLoading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const variantConfig = {
    danger: {
        icon: AlertTriangle,
        iconBg: 'bg-red-500/10',
        iconColor: 'text-red-400',
        borderColor: 'border-red-500/20',
        confirmClass: 'bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/30',
        glowClass: 'shadow-[0_0_60px_rgba(239,68,68,0.08)]',
    },
    success: {
        icon: CheckCircle2,
        iconBg: 'bg-accent-gold/10',
        iconColor: 'text-accent-gold',
        borderColor: 'border-accent-gold/20',
        confirmClass: 'bg-accent-gold text-black hover:bg-white font-bold',
        glowClass: 'shadow-[0_0_60px_rgba(236,191,60,0.08)]',
    },
    info: {
        icon: Info,
        iconBg: 'bg-blue-500/10',
        iconColor: 'text-blue-400',
        borderColor: 'border-blue-500/20',
        confirmClass: 'bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 border border-blue-500/30',
        glowClass: 'shadow-[0_0_60px_rgba(59,130,246,0.08)]',
    },
};

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isOpen,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    variant = 'info',
    isLoading = false,
    onConfirm,
    onCancel,
}) => {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    const config = variantConfig[variant];
    const Icon = config.icon;

    useEffect(() => {
        if (isOpen) {
            setMounted(true);
            setTimeout(() => setVisible(true), 10);
        } else {
            setVisible(false);
            setTimeout(() => setMounted(false), 300);
        }
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen && !isLoading) onCancel();
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [isOpen, isLoading, onCancel]);

    if (!mounted) return null;

    return (
        <div
            className={`fixed inset-0 z-[9998] flex items-center justify-center p-6 transition-all duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
            onClick={(e) => { if (e.target === e.currentTarget && !isLoading) onCancel(); }}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Dialog */}
            <div
                className={`
                    relative w-full max-w-md rounded-2xl border bg-[#0c0c0c]
                    transition-all duration-300
                    ${config.borderColor} ${config.glowClass}
                    ${visible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
                `}
            >
                {/* Top accent line */}
                <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent`} />

                <div className="p-8">
                    {/* Close button */}
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className="absolute top-4 right-4 p-1.5 rounded-lg text-foreground/30 hover:text-white hover:bg-white/5 transition-all disabled:opacity-30"
                    >
                        <X size={14} />
                    </button>

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl ${config.iconBg} flex items-center justify-center mb-6`}>
                        <Icon size={24} className={config.iconColor} />
                    </div>

                    {/* Content */}
                    <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.3em] mb-2">
                        Confirmation Required
                    </p>
                    <h3 className="text-xl font-display font-bold text-white mb-3">{title}</h3>
                    <p className="text-sm text-foreground/60 font-mono leading-relaxed">{message}</p>

                    {/* Actions */}
                    <div className="flex gap-3 mt-8">
                        <button
                            onClick={onCancel}
                            disabled={isLoading}
                            className="flex-1 py-2.5 rounded-xl border border-white/10 text-[11px] font-mono text-foreground/50 hover:text-white hover:bg-white/5 transition-all disabled:opacity-30 uppercase tracking-widest"
                        >
                            {cancelLabel}
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className={`flex-1 py-2.5 rounded-xl text-[11px] font-mono uppercase tracking-widest transition-all disabled:opacity-50 flex items-center justify-center gap-2 ${config.confirmClass}`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={12} className="animate-spin" />
                                    Processing...
                                </>
                            ) : confirmLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
