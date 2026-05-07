"use client"

import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'
import type { Project, Category } from '@/lib/types'
import { createProject, updateProject } from '../actions'
import type { ActionResult } from '../actions'
import { Upload, Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface ProjectFormProps {
    project?: Project
    mode: 'create' | 'edit'
    categories: Category[]
}

export default function ProjectForm({ project, mode, categories }: ProjectFormProps) {
    const router = useRouter()
    const action = mode === 'create' ? createProject : updateProject
    const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(action, null)
    const [redirecting, setRedirecting] = useState(false)

    useEffect(() => {
        if (state?.success) {
            setRedirecting(true)
            setTimeout(() => {
                router.push('/admin/projects')
                router.refresh()
            }, 1000)
        }
    }, [state, router])

    return (
        <form action={formAction} className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-heading tracking-wide text-white uppercase">
                    {mode === 'create' ? '+ Create New Project' : `Edit: ${project?.title}`}
                </h2>
            </div>

            {mode === 'edit' && <input type="hidden" name="id" value={project?.id} />}

            {/* Basic Info */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 space-y-5">
                <h3 className="text-[10px] text-gold-400 uppercase tracking-[0.2em] font-bold mb-4">Basic Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 block">Project Title *</label>
                        <input
                            name="title"
                            defaultValue={project?.title || ''}
                            placeholder="Enter project title"
                            required
                            className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50 transition-colors placeholder:text-gray-600"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 block">Subtitle</label>
                        <input
                            name="subtitle"
                            defaultValue={project?.subtitle || ''}
                            placeholder="Short subtitle or tagline"
                            className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50 transition-colors placeholder:text-gray-600"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 block">Category *</label>
                        <select
                            name="category"
                            defaultValue={project?.category || (categories[0]?.name || '')}
                            required
                            className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50 transition-colors"
                        >
                            {categories.map((cat: Category) => (
                                <option key={cat.id} value={cat.name} className="bg-black text-white">
                                    {cat.parent_id ? `  └─ ${cat.name}` : cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-end">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                name="is_featured"
                                defaultChecked={project?.is_featured || false}
                                className="w-5 h-5 rounded border-white/20 bg-black/30 text-gold-400 focus:ring-gold-400/50"
                            />
                            <span className="text-xs text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">
                                ⭐ Featured Project (shows on homepage)
                            </span>
                        </label>
                    </div>
                </div>

                <div>
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 block">Description</label>
                    <textarea
                        name="description"
                        defaultValue={project?.description || ''}
                        placeholder="Detailed project description..."
                        rows={4}
                        className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50 transition-colors resize-none placeholder:text-gray-600"
                    />
                </div>
            </div>

            {/* Case Study */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 space-y-5">
                <h3 className="text-[10px] text-gold-400 uppercase tracking-[0.2em] font-bold mb-4">Case Study (Optional)</h3>

                <div>
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 block">The Problem</label>
                    <textarea
                        name="problem"
                        defaultValue={project?.problem || ''}
                        placeholder="What challenge did the client face?"
                        rows={3}
                        className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50 transition-colors resize-none placeholder:text-gray-600"
                    />
                </div>
                <div>
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 block">The Solution</label>
                    <textarea
                        name="solution"
                        defaultValue={project?.solution || ''}
                        placeholder="How did you solve it?"
                        rows={3}
                        className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50 transition-colors resize-none placeholder:text-gray-600"
                    />
                </div>
                <div>
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 block">The Result</label>
                    <textarea
                        name="result"
                        defaultValue={project?.result || ''}
                        placeholder="What was the outcome?"
                        rows={3}
                        className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50 transition-colors resize-none placeholder:text-gray-600"
                    />
                </div>
            </div>

            {/* Tags & Tools */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 space-y-5">
                <h3 className="text-[10px] text-gold-400 uppercase tracking-[0.2em] font-bold mb-4">Tags & Tools</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 block">Tags (comma separated)</label>
                        <input
                            name="tags"
                            defaultValue={project?.tags?.join(', ') || ''}
                            placeholder="Branding, UI/UX, Art Direction"
                            className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50 transition-colors placeholder:text-gray-600"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 block">Tools (comma separated)</label>
                        <input
                            name="tools"
                            defaultValue={project?.tools?.join(', ') || ''}
                            placeholder="Figma, Photoshop, After Effects"
                            className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50 transition-colors placeholder:text-gray-600"
                        />
                    </div>
                </div>
            </div>

            {/* Media Upload */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 space-y-5">
                <h3 className="text-[10px] text-gold-400 uppercase tracking-[0.2em] font-bold mb-4">Media Files</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-4 rounded-lg border border-white/5 bg-black/20">
                        <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-3 block flex items-center gap-2">
                            <Upload className="w-3 h-3" /> Cover Image
                        </label>
                        {project?.cover_image && (
                            <div className="mb-3 rounded-lg overflow-hidden aspect-video bg-obsidian-800">
                                <img src={project.cover_image} alt="Current cover" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <input
                            type="file"
                            name="cover_image"
                            accept="image/*"
                            className="text-xs text-gray-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:uppercase file:tracking-widest file:bg-white/10 file:text-white hover:file:bg-white/20 transition-colors w-full"
                        />
                    </div>
                    <div className="p-4 rounded-lg border border-white/5 bg-black/20">
                        <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-3 block flex items-center gap-2">
                            <Upload className="w-3 h-3" /> Video File
                        </label>
                        {project?.video_url && (
                            <p className="text-[9px] text-green-400 mb-3 truncate">✓ {project.video_url.split('/').pop()}</p>
                        )}
                        <input
                            type="file"
                            name="video_file"
                            accept="video/*"
                            className="text-xs text-gray-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:uppercase file:tracking-widest file:bg-white/10 file:text-white hover:file:bg-white/20 transition-colors w-full"
                        />
                    </div>
                    <div className="p-4 rounded-lg border border-white/5 bg-black/20">
                        <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-3 block flex items-center gap-2">
                            <Upload className="w-3 h-3" /> Audio File
                        </label>
                        {project?.audio_url && (
                            <p className="text-[9px] text-green-400 mb-3 truncate">✓ {project.audio_url.split('/').pop()}</p>
                        )}
                        <input
                            type="file"
                            name="audio_file"
                            accept="audio/*"
                            className="text-xs text-gray-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:uppercase file:tracking-widest file:bg-white/10 file:text-white hover:file:bg-white/20 transition-colors w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Status Message */}
            {state && (
                <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs uppercase tracking-widest ${!state.success
                        ? 'text-red-400 bg-red-500/10 border border-red-500/20'
                        : 'text-green-400 bg-green-500/10 border border-green-500/20'
                    }`}>
                    {state.success ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {state.success
                        ? (mode === 'create' ? 'Project created successfully!' : 'Project updated successfully!')
                        : (state.error || 'An error occurred. Please try again.')
                    }
                </div>
            )}

            {/* Submit */}
            <div className="flex justify-end gap-4 pt-2">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 rounded-lg text-[10px] uppercase tracking-[0.2em] text-gray-400 border border-white/10 hover:border-white/20 hover:text-white transition-all"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isPending || redirecting}
                    className="flex items-center gap-2 bg-gold-400 text-black px-8 py-3 rounded-lg text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isPending ? 'Processing...' : redirecting ? 'Redirecting...' : mode === 'create' ? 'Create Project' : 'Save Changes'}
                </button>
            </div>
        </form>
    )
}
