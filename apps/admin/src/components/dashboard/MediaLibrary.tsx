import React, { useState, useEffect, useRef } from 'react';
import { GlassCard } from '@portfolio/shared-ui';
import { Upload, ImageIcon, Trash2, Link as LinkIcon, Search, MoreVertical, Loader2, RefreshCw } from 'lucide-react';
import { useApi, type MediaAsset } from '../../hooks/useApi';
import { useToast } from '../../hooks/useToast';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { ToastContainer } from '../common/Toast';

export const MediaLibrary: React.FC = () => {
    const api = useApi();
    const { toasts, toast, removeToast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [assets, setAssets] = useState<MediaAsset[]>([]);
    const [filteredAssets, setFilteredAssets] = useState<MediaAsset[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // Confirm delete state
    const [confirmDelete, setConfirmDelete] = useState<MediaAsset | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const loadAssets = async () => {
        setIsLoading(true);
        try {
            const data = await api.listMedia();
            setAssets(data);
            setFilteredAssets(data);
        } catch (err: unknown) {
            toast.error('Load Failed', err instanceof Error ? err.message : 'Could not load media assets');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadAssets();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Filter by search
    useEffect(() => {
        const q = searchQuery.toLowerCase();
        setFilteredAssets(q ? assets.filter(a => a.name.toLowerCase().includes(q)) : assets);
    }, [searchQuery, assets]);

    const handleUploadFile = async (file: File) => {
        if (file.size > 10 * 1024 * 1024) {
            toast.error('File Too Large', 'Maximum file size is 10 MB');
            return;
        }
        setIsUploading(true);
        try {
            const newAsset = await api.uploadMedia(file);
            setAssets(prev => [newAsset, ...prev]);
            toast.success('Upload Complete', `${file.name} is now live in the media library.`);
        } catch (err: unknown) {
            toast.error('Upload Failed', err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDropZoneClick = () => {
        if (!isUploading) fileInputRef.current?.click();
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleUploadFile(file);
        e.target.value = '';
    };

    const handleCopyLink = (asset: MediaAsset) => {
        navigator.clipboard.writeText(asset.url)
            .then(() => toast.success('Link Copied', asset.url))
            .catch(() => toast.error('Copy Failed', 'Could not access clipboard'));
    };

    const handleDeleteConfirm = async () => {
        if (!confirmDelete) return;
        setIsDeleting(true);
        try {
            await api.deleteMedia(confirmDelete.key);
            setAssets(prev => prev.filter(a => a.id !== confirmDelete.id));
            toast.success('Deleted', `${confirmDelete.name} removed from media library.`);
            setConfirmDelete(null);
        } catch (err: unknown) {
            toast.error('Delete Failed', err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <ToastContainer toasts={toasts} onRemove={removeToast} />

            <ConfirmDialog
                isOpen={!!confirmDelete}
                variant="danger"
                title="Delete Asset"
                message={`Permanently remove "${confirmDelete?.name}" from S3? This cannot be undone and will break any page referencing this file.`}
                confirmLabel="Delete Forever"
                isLoading={isDeleting}
                onConfirm={handleDeleteConfirm}
                onCancel={() => !isDeleting && setConfirmDelete(null)}
            />

            <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
                className="hidden"
                onChange={handleFileInputChange}
            />

            <input
                id="cvInput"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    if (file.size > 10 * 1024 * 1024) {
                        toast.error('File Too Large', 'Maximum file size is 10 MB');
                        return;
                    }

                    setIsUploading(true);
                    try {
                        // Create a new File object to force the name to be 'resume.pdf'
                        const renamedFile = new File([file], 'resume.pdf', { type: 'application/pdf' });
                        const newAsset = await api.uploadMedia(renamedFile);

                        // Check if resume.pdf already exists in state and replace it, otherwise unshift
                        setAssets(prev => {
                            const exists = prev.some(a => a.name === 'resume.pdf');
                            if (exists) {
                                return prev.map(a => a.name === 'resume.pdf' ? newAsset : a);
                            }
                            return [newAsset, ...prev];
                        });
                        toast.success('CV Uploaded', `resume.pdf has been updated live.`);
                    } catch (err: unknown) {
                        toast.error('Upload Failed', err instanceof Error ? err.message : 'Unknown error');
                    } finally {
                        setIsUploading(false);
                        e.target.value = '';
                    }
                }}
            />

            <div className="space-y-10">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-white">Media Library</h2>
                        <p className="text-xs font-mono text-foreground/40 uppercase tracking-widest mt-1">
                            S3 Managed Assets // Zone Alpha
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={loadAssets}
                            disabled={isLoading}
                            className="p-2 rounded-lg bg-white/5 border border-white/10 text-foreground/40 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30"
                            title="Refresh"
                        >
                            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
                        </button>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" size={14} />
                            <input
                                type="text"
                                placeholder="Search assets..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs font-mono text-white focus:outline-none focus:border-accent-gold/40 transition-all w-64"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Drop Zone for Images */}
                    <div
                        onClick={handleDropZoneClick}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                            e.preventDefault();
                            setIsDragging(false);
                            const file = Array.from(e.dataTransfer.files)[0];
                            if (file && file.type.startsWith('image/')) handleUploadFile(file);
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
                            {isUploading
                                ? <Loader2 className="text-accent-gold animate-spin" size={24} />
                                : <Upload className="text-accent-gold" size={24} />}
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-display font-bold text-white">
                                {isUploading ? 'Uploading to S3...' : 'Upload Image Assets'}
                            </p>
                            <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.2em] mt-1">
                                Supports PNG, JPG, WEBP, SVG, GIF (Max 10MB)
                            </p>
                        </div>
                    </div>

                    {/* Drop Zone for CV/Resume */}
                    <div
                        onClick={() => !isUploading && document.getElementById('cvInput')?.click()}
                        onDragOver={(e) => { e.preventDefault(); }}
                        onDragLeave={() => { }}
                        onDrop={(e) => {
                            e.preventDefault();
                            const file = Array.from(e.dataTransfer.files)[0];
                            if (file && file.type === 'application/pdf') {
                                // Trigger the input's onChange handler manually or replicate logic
                                const dataTransfer = new DataTransfer();
                                dataTransfer.items.add(file);
                                const input = document.getElementById('cvInput') as HTMLInputElement;
                                if (input) {
                                    input.files = dataTransfer.files;
                                    input.dispatchEvent(new Event('change', { bubbles: true }));
                                }
                            }
                        }}
                        className={`
                                relative h-48 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 group cursor-pointer border-white/10 bg-white/5 hover:border-accent-gold/40 hover:bg-accent-gold/[0.05]
                                ${isUploading ? 'opacity-50 pointer-events-none' : ''}
                            `}
                    >
                        <div className="h-12 w-12 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            {isUploading
                                ? <Loader2 className="text-accent-gold animate-spin" size={24} />
                                : <Upload className="text-accent-gold" size={24} />}
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-display font-bold text-accent-gold">
                                {isUploading ? 'Deploying CV to S3...' : 'Upload Master CV (PDF)'}
                            </p>
                            <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.2em] mt-1">
                                Will deploy as "resume.pdf" and overwrite existing.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="aspect-square rounded-2xl bg-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : filteredAssets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <ImageIcon className="text-white/10" size={48} />
                        <p className="text-xs font-mono text-foreground/30 uppercase tracking-widest">
                            {searchQuery ? 'No results match your search' : 'No assets uploaded yet'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {filteredAssets.map((asset) => (
                            <GlassCard key={asset.id} className="p-0 overflow-hidden group" hoverEffect={true}>
                                <div className="aspect-square relative overflow-hidden bg-white/5">
                                    <img
                                        src={asset.url}
                                        alt={asset.name}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                    {/* Hover actions */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button
                                            title="Copy CloudFront URL"
                                            onClick={() => handleCopyLink(asset)}
                                            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-110"
                                        >
                                            <LinkIcon size={15} />
                                        </button>
                                        <button
                                            title="Delete Asset"
                                            onClick={() => setConfirmDelete(asset)}
                                            className="p-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/50 text-red-400 transition-all hover:scale-110"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-3 border-t border-white/5 bg-white/[0.02]">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="truncate">
                                            <p className="text-[10px] font-display font-bold text-white truncate">{asset.name}</p>
                                            <p className="text-[8px] font-mono text-foreground/40 uppercase tracking-widest mt-0.5">
                                                {asset.size} / {asset.type.split('/')[1]}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setConfirmDelete(asset)}
                                            className="shrink-0 text-foreground/20 hover:text-red-400 transition-colors"
                                        >
                                            <MoreVertical size={13} />
                                        </button>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
