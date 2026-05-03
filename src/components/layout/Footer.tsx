export function Footer() {
    return (
        <footer className="w-full py-8 mt-auto border-t border-white/5 text-center">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-sans uppercase tracking-widest gap-4">
                <p>© {new Date().getFullYear()} Mohamed Bouliani. All rights reserved.</p>
                <p className="flex gap-6">
                    <a href="#" className="hover:text-gold-400 transition-colors">Instagram</a>
                    <a href="#" className="hover:text-gold-400 transition-colors">Behance</a>
                    <a href="#" className="hover:text-gold-400 transition-colors">LinkedIn</a>
                </p>
            </div>
        </footer>
    );
}
