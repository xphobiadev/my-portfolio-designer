"use client";

import Image from "next/image";
import { useState } from "react";

function Placeholder() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-obsidian-800">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center">
                <svg
                    className="w-7 h-7 md:w-8 md:h-8 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
            </div>
            <span className="text-gray-600 text-xs tracking-[0.3em] uppercase">Photo Portrait</span>
        </div>
    );
}

export default function AboutImage({ src }: { src?: string | null }) {
    const [error, setError] = useState(false);
    const hasValidSrc = src && src.startsWith("http") && !error;

    if (!hasValidSrc) return <Placeholder />;

    return (
        <Image
            src={src}
            alt="Portrait of Mohamed Bouliani"
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
            priority
            quality={85}
            onError={() => setError(true)}
        />
    );
}
