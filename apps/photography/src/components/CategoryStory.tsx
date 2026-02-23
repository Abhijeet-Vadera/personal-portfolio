import React, { useEffect, useRef } from 'react';
import { Container, CinematicImage } from '@portfolio/shared-ui';
import { Category } from '../data/photography';
import { gsap } from '@portfolio/config-animations';

interface CategoryStoryProps {
    category: Category;
    inverse?: boolean;
}

export const CategoryStory: React.FC<CategoryStoryProps> = ({ category, inverse = false }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal image with parallax
            gsap.from(imageRef.current, {
                xPercent: inverse ? 20 : -20,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });

            // Reveal text
            gsap.from(textRef.current, {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, [inverse]);

    return (
        <section ref={containerRef} className="py-24 md:py-40 overflow-hidden">
            <Container>
                <div className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${inverse ? 'md:flex-row-reverse' : ''}`}>
                    {/* Image Side */}
                    <div ref={imageRef} className="w-full md:w-1/2">
                        <CinematicImage
                            src={category.coverImage}
                            alt={category.title}
                            aspectRatio="wide"
                            className="rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                    </div>

                    {/* Text Side */}
                    <div ref={textRef} className="w-full md:w-1/2">
                        <span className="text-accent-gold font-mono text-xs tracking-widest uppercase mb-4 block">Collection // {category.id.padStart(2, '0')}</span>
                        <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
                            {category.title}
                        </h2>
                        <p className="text-lg text-foreground/60 leading-relaxed font-sans max-w-lg">
                            {category.description}
                        </p>
                        <div className="mt-10 flex items-center gap-6">
                            <div className="h-px w-12 bg-white/20" />
                            <button className="text-xs font-mono tracking-[0.3em] text-white hover:text-accent-gold transition-colors uppercase">
                                Explore Gallery
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};
