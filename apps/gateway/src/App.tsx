import React, { useEffect, useRef, Suspense, lazy } from 'react'
import { Container } from '@portfolio/shared-ui'
import { gsap } from '@portfolio/config-animations'

import HeroVisual from './components/HeroVisual'

function App() {
    const mainRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Intro animation
            gsap.from(".hero-text", {
                y: 100,
                opacity: 0,
                duration: 2,
                ease: "power4.out",
                stagger: 0.2
            })

            // Section 1 scroll animation
            gsap.to(".section-1-text", {
                scrollTrigger: {
                    trigger: ".section-1",
                    start: "top bottom",
                    end: "top center",
                    scrub: 1,
                },
                y: 0,
                opacity: 1,
                duration: 1
            })

            // Section 2 scroll animation
            gsap.to(".section-2-text", {
                scrollTrigger: {
                    trigger: ".section-2",
                    start: "top bottom",
                    end: "top center",
                    scrub: 1,
                },
                y: 0,
                opacity: 1,
                duration: 1
            })

        }, mainRef)

        return () => ctx.revert()
    }, [])

    return (
        <main ref={mainRef} className="relative bg-background overflow-hidden min-h-screen">
            <HeroVisual />

            {/* Hero Section */}
            <section className="h-screen flex items-center justify-center relative px-4">
                <div className="text-center z-10">
                    <h1 className="hero-text text-6xl md:text-8xl font-display font-bold text-accent-gold tracking-tight">
                        ABHIJEET VADERA
                    </h1>
                    <p className="hero-text mt-6 text-lg md:text-2xl text-foreground font-sans uppercase tracking-[0.5em] opacity-80">
                        Senior Software Architect
                    </p>
                </div>
            </section>

            {/* Storytelling Section 1 */}
            <section className="section-1 h-screen flex items-center justify-center relative px-4">
                <Container>
                    <div className="section-1-text opacity-0 translate-y-20 max-w-2xl mx-auto text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                            Engineering Innovation
                        </h2>
                        <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                            Architecting high-performance systems with a focus on cinematic user experiences and technical excellence.
                            From complex monorepos to serverless scale.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Storytelling Section 2 */}
            <section className="section-2 h-screen flex items-center justify-center relative px-4 bg-white/[0.02]">
                <Container>
                    <div className="section-2-text opacity-0 translate-y-20 max-w-2xl mx-auto text-center md:text-right md:ml-auto md:mr-0">
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-accent-gold mb-6">
                            Visual Narrative
                        </h2>
                        <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                            Capturing moments through a cinematic lens. Photography is not just about the shot,
                            it's about the story and the atmosphere created.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Portal CTA */}
            <section className="h-screen flex items-center justify-center bg-accent-gold/[0.03] px-4">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
                        <a href="/engineering" className="p-8 md:p-12 border border-white/10 rounded-2xl hover:bg-white/5 hover:border-accent-gold/50 transition-all duration-500 group no-underline">
                            <p className="text-accent-gold text-xs md:text-sm uppercase mb-4 tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">Explore Workspace</p>
                            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">Engineering</h3>
                            <p className="text-foreground/60 group-hover:text-foreground/90 transition-colors">Large scale system architecture, performance optimization, and robust engineering principles.</p>
                        </a>
                        <a href="/photography" className="p-8 md:p-12 border border-white/10 rounded-2xl hover:bg-white/5 hover:border-accent-gold/50 transition-all duration-500 group no-underline">
                            <p className="text-accent-gold text-xs md:text-sm uppercase mb-4 tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">Visual Portfolio</p>
                            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">Photography</h3>
                            <p className="text-foreground/60 group-hover:text-foreground/90 transition-colors">A journey through light and shadow. Cinematic visual storytelling across diverse landscapes.</p>
                        </a>
                    </div>
                </Container>
            </section>

            <footer className="py-20 text-center border-t border-white/5 px-4">
                <p className="text-foreground/40 text-sm tracking-[0.3em] uppercase">
                    &copy; 2026 Abhijeet Vadera Portfolio Platform
                </p>
            </footer>
        </main>
    )
}

export default App
