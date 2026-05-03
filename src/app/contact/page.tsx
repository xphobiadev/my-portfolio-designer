export default function Contact() {
    return (
        <div className="pt-32 pb-24 container mx-auto px-6 md:px-12 flex items-center min-h-[85vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full">
                <div>
                    <h1 className="text-6xl md:text-8xl font-heading font-bold uppercase mb-8 leading-[0.9] text-white">Let's Work<br /><span className="text-gold-400">Together</span></h1>
                    <p className="text-xl text-gray-400 leading-relaxed font-light mb-16 max-w-md">Have a project in mind? Let's create something amazing that pushes boundaries.</p>
                    <div className="space-y-6 text-gray-300 font-light">
                        <p className="text-sm tracking-wider flex items-center gap-4">
                            <span className="w-12 h-px bg-gold-400/50 block" />
                            hello@mohamedbouliani.com
                        </p>
                        <p className="text-sm tracking-wider flex items-center gap-4">
                            <span className="w-12 h-px bg-gold-400/50 block" />
                            +212 6 12 34 56 78
                        </p>
                        <p className="text-sm tracking-wider flex items-center gap-4">
                            <span className="w-12 h-px bg-gold-400/50 block" />
                            Casablanca, Morocco
                        </p>
                    </div>
                </div>
                <form className="glass p-8 md:p-12 rounded-3xl space-y-8 border border-white/5 bg-obsidian-900/50 backdrop-blur-xl">
                    <input type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-white/10 py-4 text-white text-sm tracking-wide focus:outline-none focus:border-gold-400 transition-colors placeholder:text-gray-600 placeholder:uppercase placeholder:tracking-widest placeholder:text-xs" />
                    <input type="email" placeholder="Your Email" className="w-full bg-transparent border-b border-white/10 py-4 text-white text-sm tracking-wide focus:outline-none focus:border-gold-400 transition-colors placeholder:text-gray-600 placeholder:uppercase placeholder:tracking-widest placeholder:text-xs" />
                    <textarea placeholder="Your Message" rows={5} className="w-full bg-transparent border-b border-white/10 py-4 text-white text-sm tracking-wide focus:outline-none focus:border-gold-400 transition-colors resize-none placeholder:text-gray-600 placeholder:uppercase placeholder:tracking-widest placeholder:text-xs" />
                    <button className="w-full bg-gold-400 text-obsidian-900 font-heading tracking-[0.2em] font-bold uppercase py-5 rounded-xl hover:bg-white transition-all transform hover:-translate-y-1 mt-8">Send Message</button>
                </form>
            </div>
        </div>
    );
}
