import React from 'react';
import { Container, MasonryGrid, CinematicImage } from '@portfolio/shared-ui';
import { Photo } from '../data/photography';

interface MasonryGalleryProps {
    photos: Photo[];
    onPhotoClick?: (photo: Photo) => void;
}

export const MasonryGallery: React.FC<MasonryGalleryProps> = ({ photos, onPhotoClick }) => {
    return (
        <section className="pb-32">
            <Container>
                <MasonryGrid
                    columns={{ default: 1, sm: 2, md: 3 }}
                    gap={4}
                >
                    {photos.map((photo) => (
                        <div
                            key={photo.id}
                            className="group cursor-pointer relative"
                            onClick={() => onPhotoClick?.(photo)}
                        >
                            <CinematicImage
                                src={photo.url}
                                alt={photo.alt}
                                aspectRatio={photo.aspectRatio}
                                className="rounded transition-all duration-700 group-hover:scale-[1.02] grayscale hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded flex items-center justify-center">
                                <span className="text-[10px] font-mono text-white tracking-[0.2em] uppercase border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all">
                                    View Detail
                                </span>
                            </div>
                        </div>
                    ))}
                </MasonryGrid>
            </Container>
        </section>
    );
};
