import React, { useState, useEffect, useCallback } from 'react';
import { GlassCard } from '@portfolio/shared-ui';
import { Save, AlertCircle, CheckCircle2, RotateCcw, Loader2 } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { useToast } from '../../hooks/useToast';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { ToastContainer } from '../common/Toast';

interface JSONContentEditorProps {
    title: string;
    contentKey: string;           // e.g. "timeline.json" or "photography.json"
    fallbackContent?: unknown;    // shown if S3 fetch fails / not yet saved
}

export const JSONContentEditor: React.FC<JSONContentEditorProps> = ({
    title,
    contentKey,
    fallbackContent,
}) => {
    const api = useApi();
    const { toasts, toast, removeToast } = useToast();

    const [content, setContent] = useState('');
    const [original, setOriginal] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [isDirty, setIsDirty] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const loadContent = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await api.getContent(contentKey);
            const json = JSON.stringify(data, null, 2);
            setContent(json);
            setOriginal(json);
            setIsDirty(false);
        } catch {
            setContent('{}');
            setOriginal('{}');
            toast.error('Load Failed', `Could not fetch ${contentKey} from server. You can upload a manual JSON file.`);
        } finally {
            setIsLoading(false);
        }
    }, [contentKey, api]);

    useEffect(() => {
        loadContent();
    }, [loadContent]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setContent(value);
        setIsDirty(value !== original);
        try {
            JSON.parse(value);
            setIsValid(true);
            setError(null);
        } catch (err: unknown) {
            setIsValid(false);
            setError(err instanceof Error ? err.message : 'Invalid JSON');
        }
    };

    const handleReset = () => {
        setContent(original);
        setIsValid(true);
        setIsDirty(false);
        setError(null);
    };

    const handleDeploy = async () => {
        setShowConfirm(false);
        setIsSaving(true);
        try {
            const parsed = JSON.parse(content);
            await api.saveContent(contentKey, parsed);
            setOriginal(content);
            setIsDirty(false);
            toast.success('Deployed', `${contentKey} pushed to edge — changes are live.`);
        } catch (err: unknown) {
            toast.error('Deploy Failed', err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target?.result;
            if (typeof result === 'string') {
                setContent(result);
                setIsDirty(true);
                try {
                    JSON.parse(result);
                    setIsValid(true);
                    setError(null);
                    toast.success('File Loaded', 'JSON loaded into editor. Click Deploy to save.');
                } catch (err: unknown) {
                    setIsValid(false);
                    setError(err instanceof Error ? err.message : 'Invalid JSON in uploaded file');
                }
            }
        };
        reader.readAsText(file);
        e.target.value = ''; // reset input
    };

    return (
        <>
            <ToastContainer toasts={toasts} onRemove={removeToast} />

            <ConfirmDialog
                isOpen={showConfirm}
                variant="success"
                title="Deploy Changes"
                message={`This will overwrite the live content at "${contentKey}" on S3 and immediately affect all visitors. Continue?`}
                confirmLabel="Deploy Now"
                isLoading={isSaving}
                onConfirm={handleDeploy}
                onCancel={() => setShowConfirm(false)}
            />

            <input
                type="file"
                id="jsonUploadInput"
                accept=".json,application/json"
                className="hidden"
                onChange={handleFileUpload}
            />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-white">{title}</h2>
                        <p className="text-xs font-mono text-foreground/40 uppercase tracking-widest mt-1">
                            {isLoading ? 'Fetching from S3...' : `Schema Validation Enabled · ${contentKey}`}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => document.getElementById('jsonUploadInput')?.click()}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-foreground/40 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest"
                        >
                            Upload JSON
                        </button>
                        <button
                            onClick={handleReset}
                            disabled={!isDirty || isLoading || isSaving}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-foreground/40 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all uppercase tracking-widest"
                        >
                            <RotateCcw size={14} />
                            Reset
                        </button>
                        <button
                            onClick={() => setShowConfirm(true)}
                            disabled={!isValid || !isDirty || isLoading || isSaving}
                            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-accent-gold text-black text-[10px] font-mono font-bold hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all uppercase tracking-widest"
                        >
                            {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                            Deploy Changes
                        </button>
                    </div>
                </div>

                <GlassCard className="p-0 overflow-hidden border-white/5" hoverEffect={false}>
                    {/* Editor toolbar */}
                    <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.02]">
                        <div className="flex gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500/40" />
                            <div className="h-3 w-3 rounded-full bg-yellow-500/40" />
                            <div className="h-3 w-3 rounded-full bg-green-500/40" />
                        </div>
                        <div className="flex items-center gap-3">
                            {isLoading ? (
                                <div className="flex items-center gap-2 text-[10px] font-mono text-foreground/40">
                                    <Loader2 size={12} className="animate-spin" />
                                    LOADING
                                </div>
                            ) : isValid ? (
                                <div className="flex items-center gap-2 text-[10px] font-mono text-green-500/80">
                                    <CheckCircle2 size={12} />
                                    JSON VALID
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-[10px] font-mono text-red-500/80">
                                    <AlertCircle size={12} />
                                    SYNTAX ERROR
                                </div>
                            )}
                            {isDirty && !isLoading && (
                                <div className="h-1.5 w-1.5 rounded-full bg-accent-gold animate-pulse" />
                            )}
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="w-full h-[600px] bg-black/60 p-8 flex flex-col gap-3">
                            {[...Array(12)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-4 rounded bg-white/5 animate-pulse"
                                    style={{ width: `${40 + Math.random() * 50}%`, opacity: 1 - i * 0.06 }}
                                />
                            ))}
                        </div>
                    ) : (
                        <textarea
                            value={content}
                            onChange={handleTextChange}
                            className="w-full h-[600px] bg-black/60 p-8 text-white font-mono text-sm focus:outline-none resize-none leading-relaxed custom-scrollbar"
                            spellCheck={false}
                        />
                    )}
                </GlassCard>

                {error && !isLoading && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono">
                        <AlertCircle size={16} className="mt-0.5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </>
    );
};
