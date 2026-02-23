import React from 'react';
import { motion } from 'framer-motion';
import { cn } from './utils';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
    animateEntry?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
    children,
    className,
    hoverEffect = true,
    animateEntry = true
}) => {
    const baseClasses = cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-500",
        hoverEffect && "hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-gold/20",
        className
    );

    const content = (
        <>
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </>
    );

    if (!animateEntry) {
        return (
            <div className={baseClasses}>
                {content}
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={baseClasses}
        >
            {content}
        </motion.div>
    );
};
