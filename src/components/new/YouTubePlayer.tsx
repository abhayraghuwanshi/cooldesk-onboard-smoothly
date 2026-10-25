import { trackEvent } from '@/lib/analytics';
import { useEffect, useRef } from 'react';

/**
 * A YouTube embed that reports how much of the video people actually watch.
 *
 * No IFrame API script: with enablejsapi=1 the player answers a "listening"
 * postMessage with state and time updates, which is all we need.
 *   video_watch_start     first time it plays
 *   video_watch_progress  at 25 / 50 / 75 %
 *   video_watch_complete  ended, or 95 % reached
 *   video_watch_time      seconds actually played, sent when the player goes
 *                         away (another video, leaving the page, closing the tab)
 * Named apart from GA4's built-in video_* events so the two can't double count.
 */

const PROGRESS_MARKS = [25, 50, 75];
const PLAYING = 1;
const ENDED = 0;

const embedUrl = (id: string) => {
    const origin = typeof window === 'undefined' ? '' : `&origin=${encodeURIComponent(window.location.origin)}`;
    return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&enablejsapi=1${origin}`;
};

export default function YouTubePlayer({ id, title, section }: { id: string; title: string; section: string }) {
    const ref = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const iframe = ref.current;
        if (!iframe) return;

        const base = { section, video_id: id, video_title: title, video_provider: 'youtube' };
        let duration = 0;
        let started = false;
        let completed = false;
        let heard = false;
        const marks = new Set<number>();
        // Played time, counted only while the player says it's playing.
        let watchedMs = 0;
        let playingSince: number | null = null;
        let reported = false;

        const stopClock = () => {
            if (playingSince !== null) watchedMs += Date.now() - playingSince;
            playingSince = null;
        };

        const complete = () => {
            if (completed) return;
            completed = true;
            trackEvent('video_watch_complete', { ...base, video_duration: Math.round(duration) });
        };

        const onState = (state: number) => {
            if (state === PLAYING) {
                if (!started) {
                    started = true;
                    trackEvent('video_watch_start', base);
                }
                if (playingSince === null) playingSince = Date.now();
            } else {
                stopClock();
                if (state === ENDED) complete();
            }
        };

        const onTime = (current: number) => {
            if (!duration) return;
            const pct = (current / duration) * 100;
            for (const m of PROGRESS_MARKS) {
                if (pct >= m && !marks.has(m)) {
                    marks.add(m);
                    trackEvent('video_watch_progress', { ...base, video_percent: m });
                }
            }
            if (pct >= 95) complete();
        };

        const onMessage = (e: MessageEvent) => {
            if (e.source !== iframe.contentWindow) return;
            let data: { event?: string; info?: unknown };
            try {
                data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
            } catch {
                return;
            }
            heard = true;
            if (data.event === 'onStateChange' && typeof data.info === 'number') {
                onState(data.info);
                return;
            }
            const info = data.info as { duration?: number; currentTime?: number; playerState?: number } | undefined;
            if (!info || typeof info !== 'object') return;
            if (typeof info.duration === 'number' && info.duration > 0) duration = info.duration;
            if (typeof info.playerState === 'number') onState(info.playerState);
            if (typeof info.currentTime === 'number') onTime(info.currentTime);
        };

        // Ask the player to start sending updates; repeat until it answers,
        // since it may not be ready when the iframe's load event fires.
        let tries = 0;
        const listen = () => {
            if (heard || tries++ > 40) return window.clearInterval(handshake);
            iframe.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id, channel: 'widget' }), '*');
        };
        const handshake = window.setInterval(listen, 250);

        const reportWatchTime = () => {
            stopClock();
            if (reported || watchedMs < 1000) return;
            reported = true;
            trackEvent('video_watch_time', {
                ...base,
                watch_seconds: Math.round(watchedMs / 1000),
                video_duration: Math.round(duration),
                transport_type: 'beacon',
            });
        };

        window.addEventListener('message', onMessage);
        window.addEventListener('pagehide', reportWatchTime);
        return () => {
            window.clearInterval(handshake);
            window.removeEventListener('message', onMessage);
            window.removeEventListener('pagehide', reportWatchTime);
            reportWatchTime();
        };
    }, [id, title, section]);

    return (
        <iframe
            ref={ref}
            className="absolute inset-0 h-full w-full"
            src={embedUrl(id)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    );
}
