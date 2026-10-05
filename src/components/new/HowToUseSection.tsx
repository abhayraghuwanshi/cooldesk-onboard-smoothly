import { useSectionView } from '@/lib/analytics';
import { Play } from 'lucide-react';
import { useState } from 'react';
import { VIDEOS, thumb } from '@/config/videos';

/**
 * Homepage "How to use" (#how-to-use — the navbar/footer link and the target
 * of the old /how-to-use route): the walkthrough videos as a playlist.
 */

/** Embed that starts at `index` and carries on through the rest of the list. */
function embedUrl(index: number) {
    const rest = VIDEOS.slice(index + 1).map((v) => v.id).join(',');
    return `https://www.youtube-nocookie.com/embed/${VIDEOS[index].id}?autoplay=1&rel=0${rest ? `&playlist=${rest}` : ''}`;
}

function Playlist() {
    const [current, setCurrent] = useState(0);
    const [playing, setPlaying] = useState(false);
    const video = VIDEOS[current];

    const choose = (i: number) => {
        setCurrent(i);
        setPlaying(true);
    };

    return (
        <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-4">
            {/* Player */}
            <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0c] overflow-hidden shadow-2xl">
                <div className="relative aspect-video">
                    {playing ? (
                        <iframe
                            key={current}
                            className="absolute inset-0 w-full h-full"
                            src={embedUrl(current)}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <button
                            type="button"
                            onClick={() => setPlaying(true)}
                            aria-label={`Play video: ${video.title}`}
                            className="group absolute inset-0 w-full h-full"
                        >
                            <img src={thumb(video.id)} alt="" loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                            <span className="absolute inset-0 flex items-center justify-center">
                                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/25 shadow-[0_10px_40px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300">
                                    <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
                                </span>
                            </span>
                            <span className="absolute left-5 right-5 bottom-5 text-left">
                                <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-300/90 mb-1">Video {current + 1} of {VIDEOS.length}</span>
                                <span className="block font-display text-lg md:text-xl font-bold text-white">{video.title}</span>
                            </span>
                        </button>
                    )}
                </div>
            </div>

            {/* List */}
            <ol className="flex flex-col gap-2" aria-label="Walkthrough videos">
                {VIDEOS.map((v, i) => {
                    const active = i === current;
                    return (
                        <li key={v.id}>
                            <button
                                type="button"
                                onClick={() => choose(i)}
                                aria-current={active ? 'true' : undefined}
                                className={`group w-full flex items-center gap-3 rounded-xl border p-2.5 text-left transition-colors ${active ? 'border-sky-400/30 bg-sky-400/[0.07]' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20'}`}
                            >
                                <span className="relative shrink-0 w-28 aspect-video rounded-lg overflow-hidden bg-black">
                                    <img src={thumb(v.id)} alt="" loading="lazy" className="w-full h-full object-cover" />
                                    <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                                        {active && playing ? (
                                            <span className="flex items-end gap-[3px] h-4" aria-label="Now playing">
                                                <span className="w-[3px] h-2 bg-white rounded-sm animate-pulse" />
                                                <span className="w-[3px] h-4 bg-white rounded-sm animate-pulse [animation-delay:150ms]" />
                                                <span className="w-[3px] h-3 bg-white rounded-sm animate-pulse [animation-delay:300ms]" />
                                            </span>
                                        ) : (
                                            <Play className="w-4 h-4 text-white/90" fill="currentColor" />
                                        )}
                                    </span>
                                </span>
                                <span className="min-w-0">
                                    <span className={`block text-[11px] font-semibold uppercase tracking-[0.12em] ${active ? 'text-sky-300' : 'text-white/35'}`}>{String(i + 1).padStart(2, '0')} · {v.mins}</span>
                                    <span className="block text-sm font-semibold text-white leading-snug mt-0.5">{v.title}</span>
                                    <span className="block text-xs text-white/45 leading-snug mt-0.5 line-clamp-1">{v.desc}</span>
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}

export default function HowToUseSection() {
    const sectionRef = useSectionView<HTMLElement>('how_to_use');

    return (
        <section ref={sectionRef} className="relative text-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-2">How to use</p>
                        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Prefer watching?</h2>
                        <p className="mt-3 text-white/55 text-base md:text-lg">Four short videos. Pick one and the rest play after it.</p>
                    </div>
                </div>

                <Playlist />
            </div>
        </section>
    );
}
