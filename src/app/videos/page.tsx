export default function Videos() {
    return (
        <div className="pt-32 pb-24 container mx-auto px-6 md:px-12">
            <h1 className="text-5xl md:text-7xl font-heading font-bold uppercase mb-12 drop-shadow-sm tracking-tight text-white">Videos</h1>
            <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
                {['All', 'Motion Graphics', 'Event', 'Commercial', 'Short Films'].map(cat => (
                    <button key={cat} className="text-[10px] uppercase tracking-[0.2em] px-6 py-3 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all whitespace-nowrap">{cat}</button>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="group flex flex-col gap-6 cursor-pointer">
                        <div className="aspect-video rounded-3xl overflow-hidden glass bg-obsidian-900 flex items-center justify-center relative border border-white/5 group-hover:border-gold-400/30 transition-all duration-500">
                            <span className="text-gray-600 font-sans tracking-[0.2em] uppercase text-xs">Video Thumbnail {i}</span>
                            <div className="absolute w-20 h-20 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-gold-400 group-hover:text-obsidian-900 transition-all pl-1">&#9658;</div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-heading text-white uppercase tracking-wide group-hover:text-gold-400 transition-colors">Cinematic Reel 2024</h3>
                            <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase mt-2">Commercial</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
