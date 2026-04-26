export default function VideoPromo() {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="heading-2 text-txt-primary mb-4">
                        See it in action
                    </h2>
                    <p className="body-lg text-txt-secondary max-w-xl mx-auto">
                        Watch how CoolDesk organizes your projects — tabs, apps, notes and links in one place.
                    </p>
                </div>

                {/* Video */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 bg-zinc-900">
                        <video
                            className="w-full"
                            controls
                            playsInline
                            preload="metadata"
                        >
                            <source src="/demo.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
        </section>
    );
}
