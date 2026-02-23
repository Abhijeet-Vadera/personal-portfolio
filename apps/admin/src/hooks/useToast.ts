import { useState, useCallback } from 'react';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastItem {
    id: string;
    variant: ToastVariant;
    title: string;
    message?: string;
}

export const useToast = () => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const addToast = useCallback((variant: ToastVariant, title: string, message?: string) => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        setToasts(prev => [...prev, { id, variant, title, message }]);
        // Auto-remove after 4s
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const toast = {
        success: (title: string, message?: string) => addToast('success', title, message),
        error: (title: string, message?: string) => addToast('error', title, message),
        info: (title: string, message?: string) => addToast('info', title, message),
    };

    return { toasts, toast, removeToast };
};
