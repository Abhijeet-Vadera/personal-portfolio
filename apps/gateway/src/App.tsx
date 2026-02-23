import React, { useEffect, useRef } from 'react'
import { Container } from '@portfolio/shared-ui'
import { gsap } from '@portfolio/config-animations'
import HeroVisual from './components/HeroVisual'

function App() {
    const mainRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Intro animation - Staggered lines and fade
            gsap.from(".hero-text", {
                y: 80,
                opacity: 0,
                duration: 1.8,
                ease: "power4.out",
                stagger: 0.2,
                delay: 0.2
            })

            gsap.from(".hero-line", {
                scaleX: 0,
                transformOrigin: "left",
                duration: 1.5,
                ease: "power3.inOut",
                delay: 1
            })

            // Section 1 scroll animation with scale effect
            gsap.fromTo(".section-1-content",
                { y: 100, opacity: 0, scale: 0.95 },
                {
                    scrollTrigger: {
                        trigger: ".section-1",
                        start: "top 80%",
                        end: "top 30%",
                        scrub: 1,
                    },
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1
                }
            )

            // Section 2 scroll animation
            gsap.fromTo(".section-2-content",
                { y: 100, opacity: 0, scale: 0.95 },
                {
                    scrollTrigger: {
                        trigger: ".section-2",
                        start: "top 80%",
                        end: "top 30%",
                        scrub: 1,
                    },
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1
                }
            )

            // Pulse animation for portal cards
            gsap.fromTo(".portal-card",
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: ".portal-section",
                        start: "top 80%",
                    },
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 1,
                    ease: "back.out(1.5)"
                }
            )
        }, mainRef)

        return () => ctx.revert()
    }, [])

    return (
        <main ref={mainRef} className="relative bg-[#050505] overflow-hidden min-h-screen selection:bg-accent-gold/30 selection:text-white">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent-gold/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <HeroVisual />

            {/* Hero Section */}
            <section className="h-screen flex items-center justify-center relative px-4 z-10">
                <div className="text-center absolute">
                    <div className="overflow-hidden mb-2">
                        <h1 className="hero-text text-5xl md:text-8xl lg:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-accent-gold/90 to-accent-gold/40 tracking-tighter drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                            ABHIJEET VADERA
                        </h1>
                    </div>
                    <div className="hero-line w-full h-[1px] bg-gradient-to-r from-transparent via-accent-gold/50 to-transparent my-6" />
                    <div className="overflow-hidden">
                        <p className="hero-text text-sm md:text-xl text-foreground/80 font-mono uppercase tracking-[0.4em] md:tracking-[0.8em] font-medium">
                            Architect of Digital Realms
                        </p>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50">
                    <div className="w-[1px] h-12 bg-gradient-to-b from-accent-gold to-transparent" />
                    <span className="text-[9px] font-mono tracking-[0.5em] uppercase text-accent-gold animate-pulse">Scroll</span>
                </div>
            </section>

            {/* Storytelling Section 1 */}
            <section className="section-1 min-h-[80vh] flex items-center justify-center relative px-4 z-10">
                <Container>
                    <div className="section-1-content max-w-4xl mx-auto p-8 md:p-16 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        <span className="text-blue-400 font-mono text-xs tracking-widest uppercase mb-6 block">01 // Logic</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 tracking-tight">
                            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Excellence</span>
                        </h2>
                        <p className="text-lg md:text-2xl text-foreground/60 leading-relaxed font-sans max-w-2xl">
                            Architecting high-performance systems with a relentless focus on cinematic user experiences. From complex distributed backends to fluid frontend interfaces.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Storytelling Section 2 */}
            <section className="section-2 min-h-[80vh] flex items-center justify-center relative px-4 z-10">
                <Container>
                    <div className="section-2-content max-w-4xl mx-auto md:ml-auto md:mr-0 p-8 md:p-16 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-bl from-accent-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        <span className="text-accent-gold font-mono text-xs tracking-widest uppercase mb-6 block md:text-right">02 // Aesthetic</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 tracking-tight md:text-right">
                            Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-orange-400">Narratives</span>
                        </h2>
                        <p className="text-lg md:text-2xl text-foreground/60 leading-relaxed font-sans max-w-2xl md:text-right md:ml-auto">
                            Photography is more than capturing light; it's about freezing a piece of soul in time. Exploring the quiet interplay of geometry, shadows, and existence.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Portal CTA */}
            <section className="portal-section min-h-screen flex items-center justify-center relative px-4 z-10 py-24">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-mono text-foreground/40 uppercase tracking-[0.5em] mb-4">Select Domain</h2>
                        <div className="w-12 h-1 bg-white/10 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
                        {/* Engineering Portal */}
                        <a href="/engineering" className="portal-card relative p-10 md:p-14 rounded-3xl bg-black/40 border border-white/10 overflow-hidden group no-underline backdrop-blur-md">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[60px] translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-400/30 transition-colors duration-500" />

                            <div className="relative z-10">
                                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono uppercase tracking-widest mb-6">Interactive Workspace</span>
                                <h3 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 transition-all duration-300">Engineering</h3>
                                <p className="text-foreground/50 text-base md:text-lg leading-relaxed group-hover:text-foreground/80 transition-colors">Enter the technical architect's domain. Systems design, code structure, and development philosophy.</p>
                                <div className="mt-10 flex items-center gap-4 text-blue-400 font-mono text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                                    Initialize Sequence <span className="text-lg">→</span>
                                </div>
                            </div>
                        </a>

                        {/* Photography Portal */}
                        <a href="/photography" className="portal-card relative p-10 md:p-14 rounded-3xl bg-black/40 border border-white/10 overflow-hidden group no-underline backdrop-blur-md">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/20 blur-[60px] translate-x-1/2 -translate-y-1/2 group-hover:bg-accent-gold/30 transition-colors duration-500" />

                            <div className="relative z-10">
                                <span className="inline-block px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold text-[10px] font-mono uppercase tracking-widest mb-6">Visual Archive</span>
                                <h3 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent-gold/50 transition-all duration-300">Photography</h3>
                                <p className="text-foreground/50 text-base md:text-lg leading-relaxed group-hover:text-foreground/80 transition-colors">Step into the gallery. A curated collection of moments, geometry, and atmospheric storytelling.</p>
                                <div className="mt-10 flex items-center gap-4 text-accent-gold font-mono text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                                    View Gallery <span className="text-lg">→</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </Container>
            </section>

            <footer className="py-12 text-center border-t border-white/[0.02] px-4 relative z-10">
                <p className="text-foreground/30 text-[10px] sm:text-xs font-mono tracking-[0.4em] uppercase">
                    &copy; 2026 Abhijeet Vadera // All Systems Nominal
                </p>
            </footer>
        </main>
    )
}

export default App
