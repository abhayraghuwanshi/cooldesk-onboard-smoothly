
import { useEffect, useState } from "react";

type PreviewItem =
    | { type: "image"; src: string; alt: string }
    | { type: "video"; src: string; alt: string; poster?: string };

const previews: PreviewItem[] = [
    { type: "image", src: "/f1-1.png", alt: "Almighty Search - Find anything instantly" },
    { type: "image", src: "/f1-2.png", alt: "Smart Workspaces" },
    { type: "image", src: "/f1-3.png", alt: "Daily Notes" },
    { type: "image", src: "/f1-4.png", alt: "Tab Management" },
    { type: "image", src: "/f1-5.png", alt: "Pin Important Items" },
    { type: "image", src: "/f1-6.png", alt: "Voice Navigation" },
    { type: "image", src: "/f1-7.png", alt: "Privacy Controls" },
    { type: "image", src: "/f1-9.png", alt: "Beautiful Interface" },
];

export default function PreviewGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const open = (index: number) => setOpenIndex(index);
    const close = () => setOpenIndex(null);
    const goNext = () => setOpenIndex((prev) => (prev !== null && prev < previews.length - 1 ? prev + 1 : prev));
    const goPrev = () => setOpenIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % previews.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + previews.length) % previews.length);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (openIndex === null) return;

            if (event.key === "Escape") close();
            if (event.key === "ArrowRight") goNext();
            if (event.key === "ArrowLeft") goPrev();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [openIndex]);

    return (
        <div className="relative">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-gray-300 bg-clip-text text-transparent mb-4">
                    See CoolDesk <span className="text-blue-500">In Action</span>
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                    {previews.length} powerful features at your fingertips
                </p>
            </div>

            {/* Stacked Photo Gallery */}
            <div className="relative max-w-4xl mx-auto">
                {/* Stack Container */}
                <div className="relative h-[500px] md:h-[600px] perspective-1000">
                    {previews.map((item, i) => {
                        const offset = (i - currentIndex + previews.length) % previews.length;
                        const isActive = offset === 0;
                        const isVisible = offset <= 2;

                        return (
                            <button
                                key={i}
                                onClick={() => {
                                    if (isActive) {
                                        open(i);
                                    } else if (offset === 1) {
                                        nextSlide();
                                    }
                                }}
                                className={`absolute inset-0 transition-all duration-700 ease-out ${
                                    isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                }`}
                                style={{
                                    transform: `
                                        translateX(${offset * 20}px) 
                                        translateY(${offset * -15}px) 
                                        scale(${1 - offset * 0.05})
                                        rotate(${offset * 2}deg)
                                    `,
                                    zIndex: previews.length - offset,
                                }}
                                aria-label={`View ${item.alt}`}
                            >
                                <div className={`glass-card rounded-2xl overflow-hidden shadow-2xl h-full transition-all duration-500 ${
                                    isActive ? 'ring-4 ring-blue-400/50 hover:ring-blue-400' : 'ring-2 ring-white/10'
                                }`}>
                                    {item.type === "image" ? (
                                        <img
                                            src={item.src}
                                            alt={item.alt}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <video
                                            src={item.src}
                                            poster={item.poster}
                                            className="w-full h-full object-cover"
                                            muted
                                            loop
                                            playsInline
                                        />
                                    )}
                                    
                                    {/* Active card overlay */}
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-center gap-6 mt-8">
                    <button
                        onClick={prevSlide}
                        className="glass-button p-3 rounded-full hover:scale-110 transition-transform"
                        aria-label="Previous preview"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Current Feature Info */}
                    <div className="text-center min-w-[300px]">
                        <div className="text-white font-semibold text-lg mb-1">
                            {previews[currentIndex].alt}
                        </div>
                        <div className="text-gray-400 text-sm">
                            {currentIndex + 1} of {previews.length}
                        </div>
                    </div>

                    <button
                        onClick={nextSlide}
                        className="glass-button p-3 rounded-full hover:scale-110 transition-transform"
                        aria-label="Next preview"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Thumbnail Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                    {previews.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                i === currentIndex 
                                    ? 'w-8 bg-blue-400' 
                                    : 'w-2 bg-white/30 hover:bg-white/50'
                            }`}
                            aria-label={`Go to preview ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Click hint */}
                <div className="text-center mt-6 text-gray-400 text-sm">
                    Click the front image to view full size
                </div>
            </div>

            {openIndex !== null && (
                <div role="dialog" aria-modal="true" className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />

                    {/* Previous Button */}
                    {openIndex > 0 && (
                        <button
                            onClick={goPrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 glass-button p-4 rounded-full hover:scale-110 transition-transform"
                            aria-label="Previous preview"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Next Button */}
                    {openIndex < previews.length - 1 && (
                        <button
                            onClick={goNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 glass-button p-4 rounded-full hover:scale-110 transition-transform"
                            aria-label="Next preview"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    <div className="relative max-w-5xl w-full glass-card rounded-3xl overflow-hidden z-10">
                        <button onClick={close} className="absolute top-3 right-3 px-3 py-1.5 text-sm rounded-md glass-button z-30">Close</button>

                        {/* Counter */}
                        <div className="absolute top-3 left-3 px-3 py-1.5 text-sm rounded-md glass text-white/90 z-30">
                            {openIndex + 1} / {previews.length}
                        </div>

                        <div className="w-full aspect-video bg-black/40">
                            {previews[openIndex].type === "image" ? (
                                <img
                                    src={(previews[openIndex] as Extract<BentoPreviewItem, { type: "image" }>).src}
                                    alt={(previews[openIndex] as Extract<BentoPreviewItem, { type: "image" }>).alt}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <video
                                    src={(previews[openIndex] as Extract<BentoPreviewItem, { type: "video" }>).src}
                                    poster={(previews[openIndex] as Extract<BentoPreviewItem, { type: "video" }>).poster}
                                    className="w-full h-full object-contain bg-black"
                                    controls
                                    autoPlay
                                    muted
                                    playsInline
                                    loop
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
