export interface Photo {
    id: string;
    url: string;
    alt: string;
    aspectRatio: 'square' | 'video' | 'portrait' | 'wide';
}
export interface Category {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    photos: Photo[];
}
export declare const photographyData: Category[];
//# sourceMappingURL=photography.d.ts.map