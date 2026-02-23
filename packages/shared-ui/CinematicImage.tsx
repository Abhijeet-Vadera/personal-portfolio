import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from './utils';

interface CinematicImageProps {
    src: string;
    alt: string;
    className?: string;
    aspectRatio?: 'square' | 'video' | 'portrait' | 'wide' | 'auto';
    objectFit?: 'cover' | 'contain';
    priority?: boolean;
}

const aspectRatios = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[21/9]',
    auto: 'aspect-auto',
};

export const CinematicImage: React.FC<CinematicImageProps> = ({
    src,
    alt,
    className,
    aspectRatio = 'auto',
    objectFit = 'cover',
    priority = false,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={cn(
            "relative overflow-hidden bg-white/5",
            aspectRatios[aspectRatio as keyof typeof aspectRatios],
            className
        )}>
            {/* Placeholder / Blur-up effect */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] transition-opacity duration-1000",
                isLoaded ? "opacity-0" : "opacity-100"
            )} />

            <motion.img
                src={src}
                alt={alt}
                loading={priority ? 'eager' : 'lazy'}
                onLoad={() => setIsLoaded(true)}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                className={cn(
                    "h-full w-full transition-transform duration-700",
                    objectFit === 'cover' ? "object-cover" : "object-contain",
                    isLoaded ? "opacity-100" : "opacity-0"
                )}
            />

            {/* Subtle overlay for better text contrast if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>
    );
};
