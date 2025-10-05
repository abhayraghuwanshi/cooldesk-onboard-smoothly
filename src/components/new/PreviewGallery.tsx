
import { useEffect, useState } from "react";

// Bento grid layout configuration
// size: 'large' (2x2), 'wide' (2x1), 'tall' (1x2), 'standard' (1x1)
type BentoSize = 'large' | 'wide' | 'tall' | 'standard';

type BentoPreviewItem =
    | { type: "image"; src: string; alt: string; size: BentoSize }
    | { type: "video"; src: string; alt: string; poster?: string; size: BentoSize };

const previews: BentoPreviewItem[] = [
    { type: "image", src: "/f1-1.png", alt: "Almighty Search - Find anything instantly", size: "large" },
    { type: "image", src: "/f1-2.png", alt: "Smart Workspaces", size: "standard" },
    { type: "image", src: "/f1-3.png", alt: "Daily Notes", size: "standard" },
    { type: "image", src: "/f1-4.png", alt: "Tab Management", size: "wide" },
    { type: "image", src: "/f1-5.png", alt: "Pin Important Items", size: "tall" },
    { type: "image", src: "/f1-6.png", alt: "Voice Navigation", size: "standard" },
    { type: "image", src: "/f1-7.png", alt: "Privacy Controls", size: "standard" },
    { type: "image", src: "/f1-9.png", alt: "Beautiful Interface", size: "wide" },
];

export default function PreviewGallery() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const open = (index: number) => setOpenIndex(index);
    const close = () => setOpenIndex(null);
    const goNext = () => setOpenIndex((prev) => (prev !== null && prev < previews.length - 1 ? prev + 1 : prev));
    const goPrev = () => setOpenIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));

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
                    CoolDesk Previews
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">Explore the powerful features and elegant interface of CoolDesk</p>
            </div>

            <div className="bento-grid">
                {previews.map((item, i) => (
                    <div
                        key={i}
                        className={`bento-item bento-${item.size}`}
                        style={{ animationDelay: `${i * 0.05}s` }}
                    >
                        <button
                            onClick={() => open(i)}
                            className="group text-left focus:outline-none w-full h-full block"
                            aria-label={`Open preview ${i + 1}`}
                        >
                            <div className="relative glass-card rounded-2xl overflow-hidden ring-2 ring-white/10 hover:ring-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 w-full h-full">
                                {item.type === "image" ? (
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
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
                                        autoPlay
                                    />
                                )}
                                {/* Hover overlay with gradient */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Caption */}
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <div className="text-sm text-white font-semibold drop-shadow-lg">{item.alt}</div>
                                    <div className="text-xs text-white/80 mt-1">Click to view full size</div>
                                </div>
                            </div>
                        </button>
                    </div>
                ))}
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
