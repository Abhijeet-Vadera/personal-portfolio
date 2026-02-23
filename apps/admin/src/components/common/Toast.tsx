import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import type { ToastItem } from '../../hooks/useToast';

interface ToastProps {
    toast: ToastItem;
    onRemove: (id: string) => void;
}

const variantConfig = {
    success: {
        icon: CheckCircle2,
        borderColor: 'border-accent-gold/40',
        iconColor: 'text-accent-gold',
        bgColor: 'bg-accent-gold/10',
        barColor: 'bg-accent-gold',
    },
    error: {
        icon: XCircle,
        borderColor: 'border-red-500/40',
        iconColor: 'text-red-400',
        bgColor: 'bg-red-500/10',
        barColor: 'bg-red-500',
    },
    info: {
        icon: Info,
        borderColor: 'border-blue-400/40',
        iconColor: 'text-blue-400',
        bgColor: 'bg-blue-400/10',
        barColor: 'bg-blue-400',
    },
};

const ToastSingle: React.FC<ToastProps> = ({ toast, onRemove }) => {
    const [visible, setVisible] = useState(false);
    const config = variantConfig[toast.variant];
    const Icon = config.icon;

    useEffect(() => {
        // Mount animation
        const t = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(t);
    }, []);

    const handleRemove = () => {
        setVisible(false);
        setTimeout(() => onRemove(toast.id), 300);
    };

    return (
        <div
            className={`
                relative flex items-start gap-3 w-80 p-4 rounded-xl
                border backdrop-blur-xl overflow-hidden
                transition-all duration-300 ease-out cursor-default
                ${config.borderColor} ${config.bgColor}
                bg-[#0a0a0a]/80
                ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
            `}
        >
            {/* Progress bar */}
            <div className={`absolute bottom-0 left-0 h-[2px] ${config.barColor} animate-toast-bar`} />

            <div className={`mt-0.5 shrink-0 ${config.iconColor}`}>
                <Icon size={16} />
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-xs font-mono font-bold text-white tracking-wide">{toast.title}</p>
                {toast.message && (
                    <p className="text-[10px] font-mono text-foreground/50 mt-0.5 leading-relaxed">{toast.message}</p>
                )}
            </div>

            <button
                onClick={handleRemove}
                className="shrink-0 text-foreground/30 hover:text-white transition-colors mt-0.5"
            >
                <X size={12} />
            </button>
        </div>
    );
};

interface ToastContainerProps {
    toasts: ToastItem[];
    onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
    return (
        <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
            {toasts.map(t => (
                <div key={t.id} className="pointer-events-auto">
                    <ToastSingle toast={t} onRemove={onRemove} />
                </div>
            ))}
        </div>
    );
};
