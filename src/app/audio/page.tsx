export default function Audio() {
    return (
        <div className="pt-32 pb-24 container mx-auto px-6 md:px-12">
            <h1 className="text-5xl md:text-7xl font-heading font-bold uppercase mb-12 drop-shadow-sm tracking-tight text-white">Audio & Music</h1>
            <div className="glass p-8 md:p-12 rounded-3xl border border-white/5 max-w-4xl mx-auto bg-obsidian-900/50">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-2xl font-heading text-white mb-2 uppercase tracking-wide">Echo Sphere</h3>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-gold-400">Soundscape Exploration</p>
                    </div>
                    <button className="w-16 h-16 rounded-full bg-gold-400 text-obsidian-900 flex items-center justify-center font-bold text-xl hover:scale-105 hover:bg-white transition-all">&#9658;</button>
                </div>
                <div className="h-32 bg-obsidian-900 rounded-xl mb-12 flex items-center justify-center border border-white/5 text-gray-700 text-xs tracking-[0.3em] uppercase">Interactive Waveform</div>
                <div className="space-y-2 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-white/5" />
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="flex justify-between items-center py-4 px-6 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
                            <div className="flex items-center gap-6">
                                <span className="text-gold-400 text-xs tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">0{i}</span>
                                <span className="text-gray-300 text-sm font-light uppercase tracking-wider group-hover:text-white transition-colors">Track Name {i}</span>
                            </div>
                            <span className="text-gray-500 text-xs font-mono">03:45</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
