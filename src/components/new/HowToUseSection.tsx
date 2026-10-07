import { trackEvent, useSectionView } from '@/lib/analytics';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { VIDEOS, thumb } from '@/config/videos';

/**
 * Homepage "Watch and learn" (#how-to-use — the navbar/footer link and the
 * target of the old /how-to-use route): the walkthrough videos as a row of
 * cards that scrolls sideways. A card plays in place when clicked; "View all"
 * opens them all as one playlist on YouTube.
 */

const embedUrl = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
const ALL_ON_YOUTUBE = `https://www.youtube.com/watch_videos?video_ids=${VIDEOS.map((v) => v.id).join(',')}`;

function VideoCard({ v, playing, onPlay }: { v: (typeof VIDEOS)[number]; playing: boolean; onPlay: () => void }) {
    return (
        <li className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c]">
                {playing ? (
                    <iframe
                        className="absolute inset-0 h-full w-full"
                        src={embedUrl(v.id)}
                        title={v.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <button type="button" onClick={onPlay} aria-label={`Play video: ${v.title}`} className="group absolute inset-0 h-full w-full">
                        <img
                            src={thumb(v.id)}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <span className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/5" />
                        <span className="absolute inset-0 flex items-center justify-center">
                            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                                <Play className="ml-0.5 h-5 w-5 text-white" fill="currentColor" />
                            </span>
                        </span>
                    </button>
                )}
            </div>
            <p className="mt-4 text-sm text-white/45">{v.mins}</p>
            <h3 className="mt-1 text-lg font-medium leading-snug text-white">{v.title}</h3>
        </li>
    );
}

export default function HowToUseSection() {
    const sectionRef = useSectionView<HTMLElement>('how_to_use');
    const rowRef = useRef<HTMLUListElement>(null);
    const [playing, setPlaying] = useState<string | null>(null);
    const [edges, setEdges] = useState({ start: true, end: false });

    // Show each arrow only when there's more to scroll that way.
    useEffect(() => {
        const row = rowRef.current;
        if (!row) return;
        const update = () =>
            setEdges({
                start: row.scrollLeft <= 4,
                end: row.scrollLeft + row.clientWidth >= row.scrollWidth - 4,
            });
        update();
        row.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            row.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);

    const scrollBy = (dir: 1 | -1) => {
        const row = rowRef.current;
        const card = row?.firstElementChild as HTMLElement | null;
        if (!row || !card) return;
        row.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: 'smooth' });
    };

    const play = (id: string, title: string) => {
        setPlaying(id);
        trackEvent('video_play', { section: 'how_to_use', video_id: id, video_title: title });
    };

    // Centred on the thumbnails (the row minus the caption under them).
    const arrow =
        'absolute top-[calc((100%-4.5rem)/2)] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur-md hover:bg-black/90 md:flex';

    return (
        <section ref={sectionRef} className="relative text-white">
            <div className="container mx-auto px-6">
                <div className="mb-8 flex items-end justify-between gap-6">
                    <div>
                        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Watch and learn</h2>
                        <p className="mt-2 text-white/55 text-base md:text-lg">
                            Get started with CoolDesk, explore its features, and see how it fits your day.
                        </p>
                    </div>
                    <a
                        href={ALL_ON_YOUTUBE}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('video_view_all', { section: 'how_to_use' })}
                        className="shrink-0 text-sm font-medium text-white/60 transition-colors hover:text-white"
                    >
                        View all
                    </a>
                </div>

                <div className="relative">
                    <ul
                        ref={rowRef}
                        aria-label="Walkthrough videos"
                        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {VIDEOS.map((v) => (
                            <VideoCard key={v.id} v={v} playing={playing === v.id} onPlay={() => play(v.id, v.title)} />
                        ))}
                    </ul>

                    {!edges.start && (
                        <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous videos" className={`${arrow} -left-5`}>
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                    )}
                    {!edges.end && (
                        <button type="button" onClick={() => scrollBy(1)} aria-label="More videos" className={`${arrow} -right-5`}>
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
