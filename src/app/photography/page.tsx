export default function Photography() {
    return (
        <div className="pt-32 pb-24 container mx-auto px-6 md:px-12">
            <h1 className="text-5xl md:text-7xl font-heading font-bold uppercase mb-12 drop-shadow-sm tracking-tight text-white">Photography</h1>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="break-inside-avoid relative rounded-2xl overflow-hidden glass group cursor-zoom-in border border-white/5">
                        <div className="aspect-[3/4] bg-obsidian-800 flex items-center justify-center text-gray-600 transition-transform duration-700 group-hover:scale-105">
                            <span className="uppercase text-[10px] tracking-widest">Photo {i}</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 z-10">
                            <p className="text-gold-400 font-heading text-lg tracking-wide">Casablanca Series</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
