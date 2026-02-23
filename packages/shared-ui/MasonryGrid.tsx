import React from 'react';
import { cn } from './utils';

interface MasonryGridProps {
    children: React.ReactNode;
    className?: string;
    columns?: {
        default: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
    };
    gap?: number;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
    children,
    className,
    columns = { default: 1, sm: 2, md: 3, lg: 4 },
    gap = 6,
}) => {
    // Using CSS columns for a traditional masonry overlap or grid for structured masonry
    // Here we use a CSS multi-column approach for the high-end overlaps
    return (
        <div
            className={cn(
                className
            )}
            style={{
                columnCount: columns.default,
                columnGap: `${gap * 4}px`,
            }}
        >
            {/* Dynamic responsive columns via style injection or Tailwind classes */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .masonry-grid {
          column-count: ${columns.default};
        }
        @media (min-width: 640px) { .masonry-grid { column-count: ${columns.sm || columns.default}; } }
        @media (min-width: 768px) { .masonry-grid { column-count: ${columns.md || columns.sm || columns.default}; } }
        @media (min-width: 1024px) { .masonry-grid { column-count: ${columns.lg || columns.md || columns.default}; } }
        @media (min-width: 1280px) { .masonry-grid { column-count: ${columns.xl || columns.lg || columns.default}; } }
        @media (min-width: 1536px) { .masonry-grid { column-count: ${columns.xl || columns.lg || columns.default}; } }
        
        .masonry-item {
          break-inside: avoid;
          margin-bottom: ${gap * 4}px;
        }
      `}} />
            <div className="masonry-grid">
                {React.Children.map(children, (child) => (
                    <div className="masonry-item">
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
};
