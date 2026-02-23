import React, { useState } from 'react';
import { GlassCard } from '@portfolio/shared-ui';
import { Save, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';

interface JSONContentEditorProps {
    title: string;
    initialContent: any;
    onSave: (content: any) => void;
}

export const JSONContentEditor: React.FC<JSONContentEditorProps> = ({ title, initialContent, onSave }) => {
    const [content, setContent] = useState(JSON.stringify(initialContent, null, 2));
    const [isValid, setIsValid] = useState(true);
    const [isDirty, setIsDirty] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setContent(value);
        setIsDirty(true);
        try {
            JSON.parse(value);
            setIsValid(true);
            setError(null);
        } catch (err: any) {
            setIsValid(false);
            setError(err.message);
        }
    };

    const handleReset = () => {
        setContent(JSON.stringify(initialContent, null, 2));
        setIsValid(true);
        setIsDirty(false);
        setError(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-display font-bold text-white">{title}</h2>
                    <p className="text-xs font-mono text-foreground/40 uppercase tracking-widest mt-1">Schema Validation Enabled</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleReset}
                        disabled={!isDirty}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-foreground/40 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <RotateCcw size={14} />
                        RESET
                    </button>
                    <button
                        onClick={() => onSave(JSON.parse(content))}
                        disabled={!isValid || !isDirty}
                        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-accent-gold text-black text-[10px] font-mono font-bold hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <Save size={14} />
                        DEPLOY CHANGES
                    </button>
                </div>
            </div>

            <GlassCard className="p-0 overflow-hidden border-white/5" hoverEffect={false}>
                <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500/20" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
                        <div className="h-3 w-3 rounded-full bg-green-500/20" />
                    </div>
                    <div className="flex items-center gap-3">
                        {isValid ? (
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
                    </div>
                </div>
                <textarea
                    value={content}
                    onChange={handleTextChange}
                    className="w-full h-[600px] bg-black/60 p-8 text-white font-mono text-sm focus:outline-none resize-none leading-relaxed custom-scrollbar"
                    spellCheck={false}
                />
            </GlassCard>

            {error && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};
