import React, { useEffect, useRef } from 'react';
import { Container, CinematicImage } from '@portfolio/shared-ui';
import { gsap } from '@portfolio/config-animations';

export const PhotographyHero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal animations
            gsap.from(titleRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                delay: 0.5
            });

            gsap.from(subtitleRef.current, {
                y: 40,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                delay: 0.8
            });

            // Parallax effect on scroll
            gsap.to(".hero-parallax", {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-[90vh] overflow-hidden flex items-center justify-center">
            {/* Background Parallax Image */}
            <div className="absolute inset-0 z-0 hero-parallax">
                <CinematicImage
                    src="https://images.unsplash.com/photo-1493339024117-640fdec99990?auto=format&fit=crop&q=80&w=1974"
                    alt="Atmospheric metropolitan background"
                    className="h-full w-full grayscale opacity-40 blur-sm"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
            </div>

            <Container className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-foreground/50 text-[10px] font-mono tracking-[0.3em] uppercase mb-8">
                    Visual Narratives / Captured Silence
                </div>
                <h1 ref={titleRef} className="text-7xl md:text-9xl font-display font-bold text-white tracking-tighter leading-none mb-6">
                    Light. <span className="text-foreground/20 italic">Shadow.</span> <br />
                    Frames.
                </h1>
                <p ref={subtitleRef} className="text-xl md:text-2xl text-foreground/60 font-sans max-w-2xl mx-auto leading-relaxed">
                    Exploring the delicate balance between the physical world and the transient moments we often overlook.
                </p>
            </Container>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-[10px] font-mono tracking-[0.4em] text-foreground/30">
                <span className="animate-bounce">↓ SCROLL TO WITNESS</span>
            </div>
        </section>
    );
};
