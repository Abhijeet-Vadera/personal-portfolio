import React from 'react';
import { motion, type Transition } from 'framer-motion';
import { transitions } from '@portfolio/config-animations';
import { cn } from './utils';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
    children,
    className,
    animate = true
}) => {
    return (
        <motion.div
            initial={animate ? { opacity: 0, y: 20 } : undefined}
            whileInView={animate ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={transitions.smooth as any}
            className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}
        >
            {children}
        </motion.div>
    );
};
