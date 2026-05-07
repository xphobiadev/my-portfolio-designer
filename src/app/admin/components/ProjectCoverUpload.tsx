"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { saveProjectCoverUrl } from "../actions";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import type { Project } from "@/lib/types";

export function ProjectCoverUpload({ project }: { project: Project }) {
    const [status, setStatus] = useState<"idle" | "uploading" | "saving" | "done" | "error">("idle");
    const [progress, setProgress] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string | null>(project.cover_image ?? null);
    const inputRef = useRef<HTMLInputElement>(null);

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setStatus("uploading");
        setProgress(0);
        setErrorMsg("");

        try {
            const supabase = createClient();
            const safeName = file.name.replace(/\s+/g, "_");
            const path = `projects/${project.id}/cover_${Date.now()}_${safeName}`;

            const arrayBuffer = await file.arrayBuffer();
            const uint8 = new Uint8Array(arrayBuffer);

            const progressInterval = setInterval(() => {
                setProgress((p) => Math.min(p + 10, 85));
            }, 250);

            const { data, error } = await supabase.storage
                .from("portfolio_media")
                .upload(path, uint8, {
                    contentType: file.type,
                    upsert: true,
                });

            clearInterval(progressInterval);

            if (error) throw new Error(error.message);

            setProgress(90);
            setStatus("saving");

            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
            const publicUrl = `${supabaseUrl}/storage/v1/object/public/portfolio_media/${data.path}`;

            const fd = new FormData();
            fd.append("id", project.id);
            fd.append("url", publicUrl);
            const result = await saveProjectCoverUrl(null, fd);
            if (!result.success) throw new Error(result.error || "Failed to save cover URL");

            setProgress(100);
            setPreviewUrl(publicUrl);
            setStatus("done");

            if (inputRef.current) inputRef.current.value = "";
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Upload failed";
            setErrorMsg(msg);
            setStatus("error");
        }
    }

    return (
        <div className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] space-y-3">
            <div className="flex items-center gap-2">
                <p className="text-[9px] text-gold-400 uppercase tracking-[0.15em] font-bold truncate">
                    {project.title}
                </p>
            </div>

            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-obsidian-800 border border-white/[0.04]">
                {previewUrl ? (
                    <img src={previewUrl} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[9px] text-gray-700 uppercase tracking-widest">No cover</span>
                    </div>
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleUpload}
                disabled={status === "uploading" || status === "saving"}
                className="text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[8px] file:uppercase file:tracking-widest file:bg-white/10 file:text-white hover:file:bg-white/20 transition-colors w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            />

            {(status === "uploading" || status === "saving") && (
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <Loader2 className="w-3 h-3 text-gold-400 animate-spin" />
                            <span className="text-[8px] text-gray-500 uppercase tracking-widest">
                                {status === "uploading" ? "Uploading..." : "Saving..."}
                            </span>
                        </div>
                        <span className="text-[8px] text-gold-400 font-bold">{progress}%</span>
                    </div>
                    <div className="w-full h-0.5 bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-gold-500 to-gold-300 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {status === "done" && (
                <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span className="text-[8px] text-green-400 uppercase tracking-widest">Updated</span>
                </div>
            )}

            {status === "error" && (
                <div className="flex items-start gap-1.5">
                    <AlertCircle className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-[8px] text-red-400">{errorMsg}</span>
                </div>
            )}
        </div>
    );
}
