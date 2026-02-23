import React, { useState } from 'react'
import { Container, SmoothScroll } from '@portfolio/shared-ui'
import { PhotographyHero } from './components/PhotographyHero'
import { CategoryStory } from './components/CategoryStory'
import { MasonryGallery } from './components/MasonryGallery'
import { FullscreenViewer } from './components/FullscreenViewer'
import { photographyData, Photo } from './data/photography'
import { Camera, Image as ImageIcon } from 'lucide-react'

function App() {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

    const allPhotos = photographyData.flatMap(cat => cat.photos);

    const handleNext = () => {
        if (!selectedPhoto) return;
        const currentIndex = allPhotos.findIndex(p => p.id === selectedPhoto.id);
        const nextIndex = (currentIndex + 1) % allPhotos.length;
        setSelectedPhoto(allPhotos[nextIndex]);
    };

    const handlePrev = () => {
        if (!selectedPhoto) return;
        const currentIndex = allPhotos.findIndex(p => p.id === selectedPhoto.id);
        const prevIndex = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
        setSelectedPhoto(allPhotos[prevIndex]);
    };

    return (
        <SmoothScroll>
            <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
                {/* Specialized Photography Navbar */}
                <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
                    <Container className="flex h-20 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center">
                                <Camera size={14} className="text-white" />
                            </div>
                            <span className="font-display font-bold tracking-[0.2em] text-white text-xs uppercase underline decoration-white/20 underline-offset-8">
                                AV / Portfolio / Archives
                            </span>
                        </div>

                        <div className="flex gap-8">
                            <button className="text-[10px] font-mono tracking-[0.3em] text-foreground/40 hover:text-white transition-colors uppercase">
                                Exhibitions
                            </button>
                            <button className="text-[10px] font-mono tracking-[0.3em] text-foreground/40 hover:text-white transition-colors uppercase">
                                Journal
                            </button>
                        </div>
                    </Container>
                </nav>

                <main>
                    <PhotographyHero />

                    {/* Narrative Sections */}
                    {photographyData.map((category, index) => (
                        <React.Fragment key={category.id}>
                            <CategoryStory category={category} inverse={index % 2 !== 0} />
                            <MasonryGallery
                                photos={category.photos}
                                onPhotoClick={(photo) => setSelectedPhoto(photo)}
                            />
                        </React.Fragment>
                    ))}

                    {/* Final Narrative CTA */}
                    <section className="py-40 bg-white/[0.02]">
                        <Container className="text-center">
                            <ImageIcon size={48} className="text-white/10 mx-auto mb-10" />
                            <h2 className="text-4xl md:text-6xl font-display font-medium text-white mb-8 tracking-tighter opacity-80">
                                A archive of 30,000+ moments. <br />
                                Only the quietest ones remain.
                            </h2>
                            <button className="px-10 py-4 border border-white/10 rounded-full text-xs font-mono tracking-[0.4em] uppercase text-white/60 hover:bg-white hover:text-black transition-all">
                                View Complete Archive
                            </button>
                        </Container>
                    </section>
                </main>

                <footer className="py-20 border-t border-white/5">
                    <Container className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <p className="text-foreground/20 text-[10px] font-mono uppercase tracking-[0.4em]">
                            &copy; 2026 AV ARCHIVES // ALL RIGHTS RESERVED
                        </p>
                        <div className="flex gap-6 text-[10px] font-mono tracking-[0.3em] text-foreground/40">
                            <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
                            <a href="#" className="hover:text-white transition-colors">TWITTER</a>
                            <a href="#" className="hover:text-white transition-colors">EMAIL</a>
                        </div>
                    </Container>
                </footer>

                {/* Lightbox */}
                <FullscreenViewer
                    photo={selectedPhoto}
                    onClose={() => setSelectedPhoto(null)}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            </div>
        </SmoothScroll>
    )
}

export default App
