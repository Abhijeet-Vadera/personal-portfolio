import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { transitions } from '@portfolio/config-animations';
import { cn } from './utils';
export const Container = ({ children, className, animate = true }) => {
    return (_jsx(motion.div, { initial: animate ? { opacity: 0, y: 20 } : undefined, whileInView: animate ? { opacity: 1, y: 0 } : undefined, viewport: { once: true }, transition: transitions.smooth, className: cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className), children: children }));
};
