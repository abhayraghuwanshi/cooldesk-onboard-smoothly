export default function Footer() {
    return (
        <footer className="bg-black/40 text-gray-400 py-10 mt-20 relative z-10 border-t border-white/10">
            <div className="container mx-auto px-6 text-center">
                <p>© {new Date().getFullYear()} CoolDesk. All rights reserved.</p>
                <div className="mt-6 flex justify-center space-x-8 text-sm">
                    <a href="/privacy-details" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="/contact" className="hover:text-white transition-colors">Contact Us</a>
                </div>
            </div>
        </footer>
    );
}
