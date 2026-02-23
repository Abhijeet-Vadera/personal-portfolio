declare module '@studio-freight/lenis' {
    export default class Lenis {
        constructor(options?: any);
        raf(time: number): void;
        destroy(): void;
        on(event: string, callback: (data: any) => void): void;
    }
}

declare module '@portfolio/config-animations' {
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    export const transitions: any;
    export const scrollConfig: any;
    export const staggerItems: any;
    export { gsap, ScrollTrigger };
}
