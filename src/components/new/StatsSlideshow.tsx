import { useEffect, useState } from "react";

interface Stat {
    icon: JSX.Element;
    title: string;
    value: string;
    subtitle: string;
    color: string;
}

function StatsSlideshow() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    const stats: Stat[] = [
        {
            icon: <HeartIcon className="w-6 h-6" />,
            title: "Active Support",
            value: "24/7",
            subtitle: "Always here to help",
            color: "from-red-400 to-pink-400",
        },
        {
            icon: <RedditIcon className="w-6 h-6" />,
            title: "Community",
            value: "Reddit",
            subtitle: "Sharing updates & insights",
            color: "from-orange-400 to-red-400",
        },
        {
            icon: <GitHubIcon className="w-6 h-6" />,
            title: "Github Discussion",
            value: "Live Chat",
            subtitle: "Join the community",
            color: "from-purple-400 to-blue-400",
        },
        {
            icon: <TrendingIcon className="w-6 h-6" />,
            title: "Regular Updates",
            value: "Weekly",
            subtitle: "New features & improvements",
            color: "from-green-400 to-emerald-400",
        },
    ];

    useEffect(() => {
        if (!isAutoPlay) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % stats.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlay, stats.length]);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlay(false);
        setTimeout(() => setIsAutoPlay(true), 6000);
    };

    const currentStat = stats[currentIndex];

    return (
        <div className="relative w-full h-full min-h-[280px] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white/[0.05] to-white/[0.02] overflow-hidden group">
            {/* Background animated gradient */}
            <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${currentStat.color}`}
            />

            {/* Content */}
            <div className="relative z-10 text-center w-full">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${currentStat.color} p-0.5 flex items-center justify-center`}
                    >
                        <div className="w-full h-full rounded-full bg-black/40 flex items-center justify-center text-white">
                            {currentStat.icon}
                        </div>
                    </div>
                </div>

                {/* Title */}
                <p className="label mb-2">{currentStat.title}</p>

                {/* Value */}
                <p className={`text-5xl font-black mb-2 bg-gradient-to-r ${currentStat.color} bg-clip-text text-transparent`}>
                    {currentStat.value}
                </p>

                {/* Subtitle */}
                <p className="body-sm text-txt-secondary">{currentStat.subtitle}</p>
            </div>

            {/* Dots / Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {stats.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                            ? "w-8 bg-white"
                            : "w-2 bg-white/30 hover:bg-white/50"
                            }`}
                        aria-label={`Go to stat ${index + 1}`}
                    />
                ))}
            </div>

            {/* Fade transition effect */}
            <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .stat-content {
          animation: fadeInScale 0.5s ease-out;
        }
      `}</style>
        </div>
    );
}

function StarIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="currentColor"
            viewBox="0 0 24 24"
        >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    );
}

function DownloadIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
        </svg>
    );
}

function HeartIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="currentColor"
            viewBox="0 0 24 24"
        >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    );
}

function TrendingIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
        </svg>
    );
}

function RedditIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="currentColor"
            viewBox="0 0 24 24"
        >
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.385 4.859-7.181 4.859-3.796 0-7.182-2.165-7.182-4.859a3.5 3.5 0 0 1 .093-.634 1.738 1.738 0 0 1-1.6-1.769 1.75 1.75 0 1 1 2.773-.918A5.452 5.452 0 0 1 7.5 7.5c0-.977.125-1.922.357-2.85.05-.286.22-.523.465-.523.39 0 .704.315.704.705a.704.704 0 0 1-.704.705c.942 2.607 3.26 4.417 5.981 4.417 2.721 0 5.04-1.81 5.98-4.417a.704.704 0 0 1 .704-.705.704.704 0 0 1 0 1.408c.245 0 .415.237.465.523.232.928.357 1.873.357 2.85 0 .518-.054 1.025-.158 1.514.634.379 1.058.982 1.058 1.686 0 1.193-.96 2.153-2.153 2.153-.503 0-.975-.156-1.368-.449a2.816 2.816 0 0 1-.704 1.352 5.454 5.454 0 0 0 3.46 1.227c3.798 0 6.882-2.163 6.882-4.859 0-.175-.012-.348-.04-.52 1.012-.387 1.71-1.3 1.71-2.406 0-1.393-1.13-2.524-2.523-2.524-.987 0-1.839.563-2.283 1.39a5.5 5.5 0 0 0-4.577-2.237z" />
        </svg>
    );
}

function DiscordIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="currentColor"
            viewBox="0 0 24 24"
        >
            <path d="M20.317 4.3671a19.8062 19.8062 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3748-.444.8635-.607 1.2509.5733-.0574 1.1365-.1402 1.6897-.2505a.077.077 0 0 1 .0776.0129c.2265.1784.4505.3639.6717.5491a.07.07 0 0 1 .0057.0910c-4.5181 6.7159-9.5384 6.7159-13.9957 0a.066.066 0 0 1 .0057-.0909c.2265-.1856.4499-.3622.6718-.5491a.079.079 0 0 1 .0786-.0126c.5772.1133 1.1613.2294 1.6930.2505a.073.073 0 0 0 .0783-.0367c.164-.4084.391-.8955.605-1.2491a.07.07 0 0 0-.0785-.0371C5.4917 3.9529 1.9831 5.7812.391 8.0967a.0658.0658 0 0 0-.0156.0735c1.411 5.4618 5.283 10.1993 10.979 10.1993 5.6956 0 9.6682-4.7373 10.979-10.1993a.066.066 0 0 0-.0143-.0734M8.3998 15.4729c-.9411 0-1.7165-.8626-1.7165-1.9187 0-1.0561.7754-1.9187 1.7165-1.9187.9411 0 1.7165.8626 1.7165 1.9187 0 1.0561-.7754 1.9187-1.7165 1.9187m6.7023 0c-.9411 0-1.7165-.8626-1.7165-1.9187 0-1.0561.7754-1.9187 1.7165-1.9187.9411 0 1.7165.8626 1.7165 1.9187 0 1.0561-.7753 1.9187-1.7165 1.9187Z" />
        </svg>
    );
}

function GitHubIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="currentColor"
            viewBox="0 0 24 24"
        >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    );
}

export default StatsSlideshow;
