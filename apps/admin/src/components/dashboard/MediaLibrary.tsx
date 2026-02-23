import React, { useState } from 'react';
import { GlassCard } from '@portfolio/shared-ui';
import { Upload, ImageIcon, Trash2, Link as LinkIcon, Search, MoreVertical } from 'lucide-react';

interface MediaAsset {
    id: string;
    url: string;
    name: string;
    size: string;
    type: string;
}

const mockAssets: MediaAsset[] = [
    { id: '1', name: 'skyscaper_main.jpg', size: '2.4 MB', type: 'image/jpeg', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab' },
    { id: '2', name: 'neon_street.png', size: '1.1 MB', type: 'image/png', url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785' },
    { id: '3', name: 'system_architecture.svg', size: '45 KB', type: 'image/svg+xml', url: 'https://images.unsplash.com/photo-1449156001931-828ba3272183' },
];

export const MediaLibrary: React.FC = () => {
    const [assets, setAssets] = useState<MediaAsset[]>(mockAssets);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (file: File) => {
        setIsUploading(true);
        try {
            // 1. Get Presigned URL from API
            const response = await fetch(`/api/media/upload-url?fileName=${encodeURIComponent(file.name)}&fileType=${encodeURIComponent(file.type)}`, {
                headers: {
                    // Authorization: `Bearer ${token}` -> To be added with real auth context
                }
            });

            if (!response.ok) throw new Error('Failed to get upload URL');
            const { uploadUrl, key } = await response.json();

            // 2. Upload to S3
            const uploadResponse = await fetch(uploadUrl, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                }
            });

            if (!uploadResponse.ok) throw new Error('S3 upload failed');

            // 3. Update State
            const newAsset: MediaAsset = {
                id: Date.now().toString(),
                name: file.name,
                size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                type: file.type,
                url: `https://abhijeet-portfolio-media.s3.amazonaws.com/uploads/${key}`
            };
            setAssets(prev => [newAsset, ...prev]);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload asset. See console for details.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-display font-bold text-white">Media Library</h2>
                    <p className="text-xs font-mono text-foreground/40 uppercase tracking-widest mt-1">S3 Managed Assets // Zone Alpha</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" size={14} />
                        <input
                            type="text"
                            placeholder="Search assets..."
                            className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs font-mono text-white focus:outline-none focus:border-accent-gold/40 transition-all w-64"
                        />
                    </div>
                </div>
            </div>

            <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const files = Array.from(e.dataTransfer.files);
                    if (files.length > 0) {
                        handleUpload(files[0]);
                    }
                }}
                className={`
          relative h-48 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 group cursor-pointer
          ${isDragging
                        ? 'border-accent-gold bg-accent-gold/5 scale-[1.01]'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'}
          ${isUploading ? 'opacity-50 pointer-events-none' : ''}
        `}
            >
                <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {isUploading ? (
                        <div className="animate-spin h-6 w-6 border-2 border-accent-gold border-t-transparent rounded-full" />
                    ) : (
                        <Upload className="text-accent-gold" size={24} />
                    )}
                </div>
                <div className="text-center">
                    <p className="text-sm font-display font-bold text-white">
                        {isUploading ? 'Uploading to S3...' : 'Drop images here or click to browse'}
                    </p>
                    <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.2em] mt-1">Supports PNG, JPG, WEBP, SVG (Max 10MB)</p>
                </div>
            </div>

            {/* Assets Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {assets.map((asset) => (
                    <GlassCard key={asset.id} className="p-0 overflow-hidden group" hoverEffect={true}>
                        <div className="aspect-square relative overflow-hidden">
                            <img src={asset.url} alt={asset.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <button title="Copy Link" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"><LinkIcon size={16} /></button>
                                <button title="Delete" className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-500 transition-all"><Trash2 size={16} /></button>
                            </div>
                        </div>
                        <div className="p-4 border-t border-white/5 bg-white/[0.02]">
                            <div className="flex items-center justify-between gap-4">
                                <div className="truncate">
                                    <p className="text-[10px] font-display font-bold text-white truncate">{asset.name}</p>
                                    <p className="text-[8px] font-mono text-foreground/40 uppercase tracking-widest mt-0.5">{asset.size} / {asset.type.split('/')[1]}</p>
                                </div>
                                <button className="text-foreground/30 hover:text-white"><MoreVertical size={14} /></button>
                            </div>
                        </div>
                    </GlassCard>
                ))}

                {/* Empty States / Loading Placeholders */}
                {[1, 2].map(i => (
                    <div key={i} className="aspect-square rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col items-center justify-center gap-3">
                        <ImageIcon className="text-white/5" size={32} />
                        <div className="h-2 w-20 bg-white/5 rounded-full" />
                    </div>
                ))}
            </div>
        </div>
    );
};
