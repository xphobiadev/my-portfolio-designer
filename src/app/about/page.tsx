export default function About() {
    return (
        <div className="pt-32 pb-24 container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-obsidian-800 glass hidden lg:flex items-center justify-center border border-white/5">
                    <span className="text-gray-600 text-xs tracking-[0.3em] uppercase">Portrait Image</span>
                </div>
                <div>
                    <h1 className="text-sm tracking-[0.3em] text-gold-400 uppercase mb-4 font-semibold">About Me</h1>
                    <p className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold uppercase leading-[1.1] mb-8 text-white">
                        I'm Mohamed Bouliani, a multidisciplinary creative based in Casablanca.
                    </p>
                    <div className="space-y-6 text-gray-400 leading-relaxed font-light text-lg mb-16">
                        <p>I transform ideas into visual, audio, and digital experiences that connect brands with people. My aesthetic draws heavily from cinematic techniques—using light, shadow, and pacing to craft profound narratives.</p>
                        <p>My goal is simple: create work that inspires, communicates, and leaves a lasting impact on audiences across all mediums.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
                        {[
                            { year: '2003', label: 'Started Learning' },
                            { year: '2014', label: 'Started Working' },
                            { year: '2018', label: 'Art Director' },
                            { year: '2024', label: 'Freelance Full Time' }
                        ].map((stat) => (
                            <div key={stat.year}>
                                <p className="text-3xl md:text-4xl font-heading text-gold-400 mb-2">{stat.year}</p>
                                <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
