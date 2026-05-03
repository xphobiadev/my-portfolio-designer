import Link from 'next/link';
import { getProjects, categories } from '@/lib/data';

export default async function WorkPage() {
    const projects = await getProjects();
    return (
        <div className="pt-32 pb-24 container mx-auto px-6 md:px-12">
            <div className="mb-12">
                <h1 className="text-5xl md:text-7xl font-heading font-bold uppercase mb-4 drop-shadow-sm tracking-tight text-white">All Projects</h1>
                <p className="text-gray-400 max-w-xl text-lg font-light leading-relaxed">
                    Selected work across design, photography, video, and audio showcasing my multidisciplinary approach.
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-12 border-b border-white/5 pb-8">
                {categories.map((cat) => (
                    <button key={cat} className={`text-xs uppercase tracking-[0.2em] px-5 py-2.5 rounded-full border transition-all duration-300 ${cat === 'All' ? 'border-gold-400 text-gold-400 bg-gold-400/10' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}>
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project: any) => (
                    <Link href={`/work/${project.slug}`} key={project.id} className="group block relative aspect-[4/3] rounded-2xl overflow-hidden glass hover:-translate-y-2 transition-all duration-500 bg-obsidian-800">
                        <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors z-10" />
                        <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-obsidian-900 via-obsidian-900/90 to-transparent z-20">
                            <p className="text-gold-400 text-[10px] tracking-widest uppercase mb-1 drop-shadow-md">{project.category}</p>
                            <h3 className="text-xl font-heading font-medium text-white mb-2 drop-shadow-md group-hover:text-gold-400 transition-colors">{project.title}</h3>
                            <p className="text-xs text-gray-300 drop-shadow-md font-light line-clamp-2">{project.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
