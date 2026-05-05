"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { saveHeroVideoUrl, saveHeroImageUrl } from "../actions";
import { Upload, CheckCircle, AlertCircle, Loader2, Video, ImageIcon } from "lucide-react";

type UploadType = "video" | "image";

interface HeroMediaUploadProps {
    type: UploadType;
    currentUrl?: string | null;
    label: string;
    description: string;
    accept: string;
    storagePath: string; // e.g. "settings/hero_video.mp4"
}

export function HeroMediaUpload({
    type,
    currentUrl,
    label,
    description,
    accept,
    storagePath,
}: HeroMediaUploadProps) {
    const [status, setStatus] = useState<"idle" | "uploading" | "saving" | "done" | "error">("idle");
    const [progress, setProgress] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl ?? null);
    const inputRef = useRef<HTMLInputElement>(null);

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setStatus("uploading");
        setProgress(0);
        setErrorMsg("");

        try {
            const supabase = createClient();

            // Use XMLHttpRequest for upload progress tracking
            const arrayBuffer = await file.arrayBuffer();
            const uint8 = new Uint8Array(arrayBuffer);

            // Simulate progress during upload (Supabase JS client doesn't expose XHR progress)
            const progressInterval = setInterval(() => {
                setProgress((p) => Math.min(p + 8, 85));
            }, 300);

            const { data, error } = await supabase.storage
                .from("portfolio_media")
                .upload(storagePath, uint8, {
                    contentType: file.type,
                    upsert: true,
                });

            clearInterval(progressInterval);

            if (error) {
                throw new Error(error.message);
            }

            setProgress(90);
            setStatus("saving");

            // Build the public URL
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
            const publicUrl = `${supabaseUrl}/storage/v1/object/public/portfolio_media/${data.path}`;

            // Save URL to DB via server action
            const fd = new FormData();
            fd.append("url", publicUrl);

            if (type === "video") {
                await saveHeroVideoUrl(fd);
            } else {
                await saveHeroImageUrl(fd);
            }

            setProgress(100);
            setPreviewUrl(publicUrl);
            setStatus("done");

            // Reset file input
            if (inputRef.current) inputRef.current.value = "";
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Upload failed";
            setErrorMsg(msg);
            setStatus("error");
            console.error("HeroMediaUpload error:", err);
        }
    }

    const Icon = type === "video" ? Video : ImageIcon;

    return (
        <div className="admin-card p-6 space-y-5">
            <div className="flex items-center gap-3 mb-4">
                <Icon className="w-4 h-4 text-gold-400" />
                <h3 className="text-xs text-gold-400 uppercase tracking-[0.15em] font-bold">{label}</h3>
            </div>

            <p className="text-[10px] text-gray-500 leading-relaxed max-w-lg">{description}</p>

            {/* Current media preview */}
            {previewUrl && (
                <div className="p-3 rounded-xl border border-white/[0.04] bg-white/[0.01] space-y-2">
                    <p className="text-[8px] text-gray-600 uppercase tracking-[0.2em] font-bold">
                        Current {type === "video" ? "Video" : "Image"}:
                    </p>
                    {type === "video" ? (
                        <video
                            src={previewUrl}
                            muted
                            playsInline
                            controls
                            className="w-full max-w-xs h-24 object-cover rounded-lg border border-white/[0.04]"
                        />
                    ) : (
                        <img
                            src={previewUrl}
                            alt="Current hero"
                            className="w-full max-w-xs h-32 object-cover rounded-lg border border-white/[0.04]"
                        />
                    )}
                    <p className="text-[8px] text-green-500/70 tracking-wide">
                        ✓ {type === "video" ? "Video" : "Image"} saved — visible on homepage
                    </p>
                </div>
            )}

            {!previewUrl && (
                <div className="p-3 rounded-xl border border-amber-400/10 bg-amber-400/[0.03]">
                    <p className="text-[9px] text-amber-400/70 tracking-wide">
                        ⚠ No {type} uploaded yet — hero background will use the cinematic gradient fallback
                    </p>
                </div>
            )}

            {/* Upload area */}
            <div className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] space-y-3">
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    onChange={handleUpload}
                    disabled={status === "uploading" || status === "saving"}
                    className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[9px] file:uppercase file:tracking-widest file:bg-white/10 file:text-white hover:file:bg-white/20 transition-colors w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                />

                {/* Progress bar */}
                {(status === "uploading" || status === "saving") && (
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Loader2 className="w-3 h-3 text-gold-400 animate-spin" />
                                <span className="text-[9px] text-gray-400 uppercase tracking-widest">
                                    {status === "uploading" ? "Uploading directly to storage..." : "Saving..."}
                                </span>
                            </div>
                            <span className="text-[9px] text-gold-400 font-bold">{progress}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-gold-500 to-gold-300 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Success */}
                {status === "done" && (
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-[9px] text-green-400 uppercase tracking-widest">
                            Upload complete — homepage updated
                        </span>
                    </div>
                )}

                {/* Error */}
                {status === "error" && (
                    <div className="flex items-start gap-2">
                        <AlertCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <span className="text-[9px] text-red-400 uppercase tracking-widest block">
                                Upload failed
                            </span>
                            <span className="text-[8px] text-red-400/60 mt-0.5 block">{errorMsg}</span>
                            <span className="text-[8px] text-gray-600 mt-1 block">
                                Check that the &quot;portfolio_media&quot; bucket exists in Supabase Storage and has public read + authenticated write policies.
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Info note */}
            <p className="text-[8px] text-gray-700 leading-relaxed">
                <span className="text-gold-400/50">ℹ</span> Files upload directly from your browser to Supabase Storage — no server size limits apply.
                {type === "video" && " Recommended: MP4 H.264, max 50 MB for best performance."}
                {type === "image" && " Recommended: JPEG/WebP, 1920×1080px or larger."}
            </p>
        </div>
    );
}
