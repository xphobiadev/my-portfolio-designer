import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) return notFound();

    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-6 md:px-12 mb-12">
                <Link href="/work" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-gold-400 transition-colors mb-12">
                    <ArrowLeft className="w-4 h-4" /> Back to Work
                </Link>
                <span className="text-gold-400 text-sm tracking-[0.3em] uppercase block font-medium mb-3">{project.category}</span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold uppercase mb-6 leading-[0.9] tracking-tight max-w-5xl text-white">{project.title}</h1>
                <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl leading-relaxed">{project.subtitle}</p>
            </div>

            {/* Hero Image */}
            <div className="w-full aspect-[21/9] bg-obsidian-800 border-y border-white/5 mb-16 relative flex items-center justify-center">
                <span className="text-gray-600 font-sans tracking-[0.3em] uppercase text-sm">Cover Media</span>
            </div>

            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-heading mb-6 tracking-wide text-white uppercase drop-shadow-sm">Overview</h2>
                        <p className="text-gray-300 leading-relaxed font-light mb-12 text-lg">{project.description}</p>

                        <div className="space-y-12">
                            {project.problem && (
                                <div className="pl-6 border-l-2 border-gold-400/50">
                                    <h3 className="text-sm tracking-[0.2em] text-gold-400 uppercase mb-3 font-semibold">The Problem</h3>
                                    <p className="text-gray-300 leading-relaxed font-light">{project.problem}</p>
                                </div>
                            )}
                            {project.solution && (
                                <div className="pl-6 border-l-2 border-white/10">
                                    <h3 className="text-sm tracking-[0.2em] text-white uppercase mb-3 font-semibold">The Solution</h3>
                                    <p className="text-gray-300 leading-relaxed font-light">{project.solution}</p>
                                </div>
                            )}
                            {project.result && (
                                <div className="pl-6 border-l-2 border-white/10">
                                    <h3 className="text-sm tracking-[0.2em] text-white uppercase mb-3 font-semibold">The Result</h3>
                                    <p className="text-gray-300 leading-relaxed font-light">{project.result}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-10 glass p-8 rounded-3xl h-fit border-white/5 bg-obsidian-900/50">
                        <div>
                            <h3 className="text-[10px] tracking-[0.3em] text-gray-500 uppercase mb-4 font-semibold">Role & Services</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag: string) => (
                                    <span key={tag} className="text-xs px-4 py-2 border border-white/10 rounded-full text-gray-300 font-light hover:border-gold-400 hover:text-gold-400 transition-colors cursor-default">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-[10px] tracking-[0.3em] text-gray-500 uppercase mb-4 font-semibold">Tools Pipeline</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tools.map((tool: string) => (
                                    <span key={tool} className="text-xs px-4 py-2 border border-white/10 rounded-full text-gray-300 font-light hover:border-gold-400 hover:text-gold-400 transition-colors cursor-default">{tool}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dynamic Gallery based on multimedia type */}
                <div className="mb-24 space-y-24">
                    {project.gallery.length > 0 && (
                        <div>
                            <h2 className="text-3xl font-heading mb-10 tracking-wide text-white uppercase">Gallery</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {project.gallery.map((img: string, i: number) => (
                                    <div key={i} className="aspect-[4/3] bg-obsidian-800 rounded-2xl overflow-hidden relative border border-white/5 flex items-center justify-center">
                                        <span className="text-gray-600 text-xs uppercase tracking-widest">Image {i + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {project.video_url && (
                        <div>
                            <h2 className="text-3xl font-heading mb-10 tracking-wide text-white uppercase">Video</h2>
                            <div className="aspect-video bg-obsidian-900 rounded-2xl overflow-hidden glass flex items-center justify-center border border-white/5">
                                <p className="text-gray-500 tracking-[0.3em] uppercase text-sm">Video Player Placeholder</p>
                            </div>
                        </div>
                    )}
                    {project.audio_url && (
                        <div>
                            <h2 className="text-3xl font-heading mb-10 tracking-wide text-white uppercase">Audio</h2>
                            <div className="h-32 bg-obsidian-900 rounded-2xl overflow-hidden glass flex items-center justify-center border border-white/5 p-8">
                                <p className="text-gray-500 tracking-[0.3em] uppercase text-sm">Audio Waveform Placeholder</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
