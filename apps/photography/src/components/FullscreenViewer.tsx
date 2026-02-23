import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Photo } from '../data/photography';

interface FullscreenViewerProps {
    photo: Photo | null;
    onClose: () => void;
    onPrev?: () => void;
    onNext?: () => void;
}

export const FullscreenViewer: React.FC<FullscreenViewerProps> = ({
    photo,
    onClose,
    onPrev,
    onNext,
}) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!photo) return;
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft' && onPrev) onPrev();
            if (e.key === 'ArrowRight' && onNext) onNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [photo, onClose, onPrev, onNext]);

    if (!photo) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            >
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
                >
                    <X size={32} />
                </button>

                {onPrev && (
                    <button
                        onClick={onPrev}
                        className="absolute left-4 md:left-8 text-white/20 hover:text-white transition-colors z-[110]"
                    >
                        <ChevronLeft size={48} />
                    </button>
                )}

                {onNext && (
                    <button
                        onClick={onNext}
                        className="absolute right-4 md:right-8 text-white/20 hover:text-white transition-colors z-[110]"
                    >
                        <ChevronRight size={48} />
                    </button>
                )}

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="relative max-w-7xl max-h-full aspect-auto flex flex-col items-center gap-6"
                >
                    <img
                        src={photo.url}
                        alt={photo.alt}
                        className="max-h-[80vh] w-auto shadow-2xl rounded"
                    />
                    <div className="text-center">
                        <h3 className="text-white font-display font-bold text-2xl tracking-tight mb-2">
                            {photo.alt}
                        </h3>
                        <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.4em]">
                            Captured / {photo.aspectRatio.toUpperCase()} FRAME
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
