import Link from 'next/link';
import { getProjectById, getCategoriesList } from '@/lib/data';
import ProjectForm from '../ProjectForm';
import { ArrowLeft } from 'lucide-react';

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await getProjectById(id);
    const dbCategories = await getCategoriesList();

    if (!project) {
        return (
            <div className="flex flex-col items-center justify-center py-24">
                <p className="text-gray-500 text-sm uppercase tracking-widest mb-4">Project not found</p>
                <Link href="/admin/projects" className="text-[10px] text-gold-400 uppercase tracking-widest hover:text-white transition-colors">
                    ← Back to Projects
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Link
                    href="/admin/projects"
                    className="flex items-center gap-2 text-[10px] text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
                >
                    <ArrowLeft className="w-3 h-3" /> Back to Projects
                </Link>
                <Link
                    href={`/fr/work/${project.slug}`}
                    target="_blank"
                    className="text-[10px] text-gold-400 uppercase tracking-widest hover:text-white transition-colors border border-gold-400/20 px-4 py-2 rounded-lg"
                >
                    View Live →
                </Link>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
                <ProjectForm mode="edit" project={project} categories={dbCategories} />
            </div>
        </div>
    );
}
