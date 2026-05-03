export default function Mockups() {
    return (
        <div className="pt-32 pb-24 container mx-auto px-6 md:px-12">
            <h1 className="text-5xl md:text-7xl font-heading font-bold uppercase mb-12 drop-shadow-sm tracking-tight text-white">Mockups</h1>
            <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
                {['All', 'Branding', 'Packaging', 'UI/UX', 'Stationery'].map(cat => (
                    <button key={cat} className="text-[10px] uppercase tracking-[0.2em] px-6 py-3 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all whitespace-nowrap">{cat}</button>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="aspect-[4/3] rounded-2xl glass bg-obsidian-800 flex items-center justify-center relative group overflow-hidden border border-white/5">
                        <span className="text-gray-600 font-sans tracking-[0.2em] uppercase text-xs">Mockup {i}</span>
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                            <span className="text-white font-heading tracking-widest text-sm uppercase">View Details</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
