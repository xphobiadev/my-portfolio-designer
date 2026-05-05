import Link from 'next/link';
import { getProjects, getCategoriesList } from '@/lib/data';
import { deleteProject, toggleFeatured } from '../actions';
import ProjectForm from './ProjectForm';
import type { Project } from '@/lib/types';
import { Star, Trash2, Edit3, FolderOpen, Plus } from 'lucide-react';

export default async function AdminProjects(props: { searchParams?: Promise<{ category?: string }> }) {
    const allProjects = await getProjects();
    const dbCategories = await getCategoriesList();
    const params = props.searchParams ? await props.searchParams : {};
    const currentCategoryLabel = params.category || '';

    const projects = currentCategoryLabel
        ? allProjects.filter((p: Project) => p.category === currentCategoryLabel)
        : allProjects;

    return (
        <div className="space-y-8 max-w-6xl">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400/20 to-gold-400/5 border border-gold-400/20 flex items-center justify-center">
                            <FolderOpen className="w-4 h-4 text-gold-400" />
                        </div>
                        <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
                            {currentCategoryLabel || 'All Projects'}
                        </h1>
                    </div>
                    <p className="text-xs text-gray-500 tracking-wide ml-11">
                        {projects.length} {projects.length === 1 ? 'project' : 'projects'} {currentCategoryLabel ? `in ${currentCategoryLabel}` : 'total'}
                    </p>
                </div>
                {currentCategoryLabel && (
                    <Link href="/admin/projects" className="text-[10px] text-gray-400 uppercase tracking-[0.15em] hover:text-gold-400 transition-colors border border-white/[0.06] px-4 py-2.5 rounded-xl w-fit hover:border-gold-400/20">
                        ← Show All
                    </Link>
                )}
            </div>

            {/* Create Form */}
            <div className="admin-card p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Plus className="w-4 h-4 text-gold-400" />
                    <h3 className="text-xs text-gold-400 uppercase tracking-[0.15em] font-bold">Create New Project</h3>
                </div>
                <ProjectForm mode="create" categories={dbCategories} />
            </div>

            {/* Projects Table */}
            <div className="admin-card overflow-hidden">
                <div className="p-6 border-b border-white/[0.04]">
                    <h2 className="text-sm font-heading font-bold text-white uppercase tracking-wide">Project List</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead>
                            <tr className="border-b border-white/[0.04]">
                                <th className="px-6 py-4 text-[8px] uppercase tracking-[0.2em] text-gray-600 font-bold">Project</th>
                                <th className="px-6 py-4 text-[8px] uppercase tracking-[0.2em] text-gray-600 font-bold">Category</th>
                                <th className="px-6 py-4 text-[8px] uppercase tracking-[0.2em] text-gray-600 font-bold">Slug</th>
                                <th className="px-6 py-4 text-[8px] uppercase tracking-[0.2em] text-gray-600 font-bold">Featured</th>
                                <th className="px-6 py-4 text-[8px] uppercase tracking-[0.2em] text-gray-600 font-bold">Media</th>
                                <th className="px-6 py-4 text-[8px] uppercase tracking-[0.2em] text-gray-600 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((proj: Project) => (
                                <tr key={proj.id} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors duration-300 group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {proj.cover_image ? (
                                                <div className="w-10 h-10 rounded-xl overflow-hidden bg-obsidian-800 flex-shrink-0 border border-white/[0.04]">
                                                    <img src={proj.cover_image} alt="" className="w-full h-full object-cover" />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center flex-shrink-0 border border-white/[0.04]">
                                                    <FolderOpen className="w-4 h-4 text-gray-700" />
                                                </div>
                                            )}
                                            <div>
                                                <span className="text-xs font-medium text-white group-hover:text-gold-400 transition-colors duration-300 tracking-wide block">
                                                    {proj.title}
                                                </span>
                                                {proj.subtitle && (
                                                    <span className="text-[9px] text-gray-600 block mt-0.5">{proj.subtitle}</span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] text-gray-500 tracking-wider px-2 py-1 bg-white/[0.03] rounded-md border border-white/[0.04]">
                                            {proj.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[10px] text-gray-600 font-mono">{proj.slug}</td>
                                    <td className="px-6 py-4">
                                        <form action={toggleFeatured}>
                                            <input type="hidden" name="id" value={proj.id} />
                                            <input type="hidden" name="is_featured" value={String(proj.is_featured)} />
                                            <button type="submit" title={proj.is_featured ? 'Remove from featured' : 'Add to featured'}>
                                                <Star className={`w-4 h-4 transition-colors duration-300 ${proj.is_featured ? 'text-gold-400 fill-gold-400' : 'text-gray-700 hover:text-gold-400'}`} />
                                            </button>
                                        </form>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-1.5">
                                            {proj.cover_image && <span className="w-2 h-2 rounded-full bg-emerald-400/80" title="Image" />}
                                            {proj.video_url && <span className="w-2 h-2 rounded-full bg-blue-400/80" title="Video" />}
                                            {proj.audio_url && <span className="w-2 h-2 rounded-full bg-purple-400/80" title="Audio" />}
                                            {!proj.cover_image && !proj.video_url && !proj.audio_url && (
                                                <span className="text-[9px] text-gray-700">None</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end items-center gap-3">
                                            <Link
                                                href={`/admin/projects/${proj.id}`}
                                                className="flex items-center gap-1.5 text-[10px] text-gray-600 hover:text-gold-400 uppercase tracking-widest transition-colors duration-300"
                                            >
                                                <Edit3 className="w-3 h-3" /> Edit
                                            </Link>
                                            <form action={deleteProject}>
                                                <input type="hidden" name="id" value={proj.id} />
                                                <button
                                                    type="submit"
                                                    className="flex items-center gap-1.5 text-[10px] text-gray-700 hover:text-red-400 uppercase tracking-widest transition-colors duration-300"
                                                >
                                                    <Trash2 className="w-3 h-3" /> Delete
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {projects.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-16 text-center">
                                        <FolderOpen className="w-8 h-8 text-gray-800 mx-auto mb-3" />
                                        <p className="text-gray-600 text-xs uppercase tracking-widest">No projects found</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
