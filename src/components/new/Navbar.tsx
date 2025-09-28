export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-30 bg-black/60 backdrop-blur-xl border-b border-white/20 shadow-2xl shadow-black/20">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-bold text-blue-400">CoolDesk</div>

                {/* Links */}
                <div className="hidden md:flex space-x-8 text-sm font-medium">
                    <a href="/#home" className="hover:text-blue-400 transition-colors">Home</a>
                    <a href="/#features" className="hover:text-blue-400 transition-colors">Features</a>
                    <a href="/#faq" className="hover:text-blue-400 transition-colors">FAQ</a>
                    <a href="/#testimonials" className="hover:text-blue-400 transition-colors">Testimonials</a>
                    <a href="/#permissions" className="hover:text-blue-400 transition-colors">Permissions</a>
                    <a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a>
                </div>

                {/* CTA */}
                <a
                    href="/#get-started"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
                >
                    Get Started
                </a>
            </div>
        </nav>
    );
}