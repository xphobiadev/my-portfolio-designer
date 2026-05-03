export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-heading font-bold uppercase mb-8 text-white tracking-widest">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'Total Projects', count: 124 },
                    { label: 'Published', count: 118 },
                    { label: 'Drafts', count: 6 },
                    { label: 'Media Assets', count: 420 }
                ].map(stat => (
                    <div key={stat.label} className="glass p-6 rounded-2xl border border-white/5 bg-obsidian-900/50">
                        <p className="text-4xl font-heading text-gold-400 mb-2 font-bold">{stat.count}</p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="glass p-8 rounded-3xl border border-white/5 bg-obsidian-900/30">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-heading text-white uppercase tracking-wide">Recent Projects</h2>
                    <button className="text-xs uppercase tracking-widest text-gold-400 hover:text-white transition-colors">+ New Project</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                        <thead>
                            <tr className="border-b border-white/10 text-[10px] uppercase tracking-[0.2em] text-gray-500">
                                <th className="pb-4 font-normal">Project Title</th>
                                <th className="pb-4 font-normal">Category</th>
                                <th className="pb-4 font-normal">Status</th>
                                <th className="pb-4 font-normal text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {['Noir Essence', 'Casa Nights', 'Echo Sphere', 'Atlas Experience'].map((proj, i) => (
                                <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer group">
                                    <td className="py-4 text-sm font-medium text-white group-hover:text-gold-400 transition-colors uppercase tracking-wide">{proj}</td>
                                    <td className="py-4 text-xs text-gray-400 tracking-wider">Category</td>
                                    <td className="py-4"><span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 text-[9px] uppercase tracking-widest rounded-full">Published</span></td>
                                    <td className="py-4 text-right">
                                        <button className="text-xs text-gray-500 hover:text-white uppercase tracking-widest transition-colors">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
