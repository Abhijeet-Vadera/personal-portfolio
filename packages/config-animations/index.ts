import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export const transitions = {
    spring: {
        type: "spring",
        damping: 20,
        stiffness: 100,
    },
    smooth: {
        type: "tween",
        ease: [0.16, 1, 0.3, 1],
        duration: 0.8,
    },
};

export const scrollConfig = {
    lerp: 0.1,
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
};

export const staggerItems = {
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export { gsap, ScrollTrigger };
