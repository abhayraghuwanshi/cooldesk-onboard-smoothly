export default function FounderNote() {
    return (
        <div className="py-16 sm:py-24">
            <div className="mx-auto max-w-4xl px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Why I Built <span className="text-blue-400">CoolDesk</span>
                    </h2>
                    <p className="text-lg text-gray-400">
                        Tired of tab chaos? Me too.
                    </p>
                </div>

                <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-blue-500/10 via-blue-600/5 to-transparent border-l-4 border-blue-400">
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />

                    <div className="relative p-8 md:p-10 space-y-6">
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                            I built CoolDesk because I was tired of tab chaos. Like you, I spent <strong className="text-white">hours every week</strong> hunting for tabs. My browser felt like a maze.
                        </p>

                        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                            I created CoolDesk to be the tool that <strong className="text-white">actually understands how you work</strong>.
                        </p>

                        <div className="pt-4 border-t border-white/10">
                            <p className="text-sm text-gray-500">
                                By using CoolDesk, you agree to our{' '}
                                <a href="/terms" className="text-blue-400 hover:text-blue-300 underline">
                                    Terms of Service
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
