import { FaBook, FaDiscord, FaExternalLinkAlt, FaGamepad, FaGithub, FaGlobe, FaNpm, FaPlay, FaArrowRight } from 'react-icons/fa';
import { ProjectWorkspace, badgeStyles } from '@/config/workspaces';

interface WorkspaceCardProps {
    workspace: ProjectWorkspace;
}

// Icon mapping for URL types
const urlIcons = {
    main: <FaGlobe size={16} />,
    docs: <FaBook size={16} />,
    github: <FaGithub size={16} />,
    demo: <FaPlay size={16} />,
    playground: <FaGamepad size={16} />,
    npm: <FaNpm size={16} />,
    discord: <FaDiscord size={16} />,
};

// Label mapping for URL types
const urlLabels = {
    main: 'Visit',
    docs: 'Docs',
    github: 'Code',
    demo: 'Demo',
    playground: 'Try',
    npm: 'Package',
    discord: 'Chat',
};

export default function WorkspaceCard({ workspace }: WorkspaceCardProps) {
    const { title, description, icon, tags, urls, trending } = workspace;

    // Get available URLs - prioritize main, docs, github, demo
    const availableUrls = Object.entries(urls).filter(([_, url]) => url) as [keyof typeof urls, string][];
    const primaryUrl = urls.main || urls.demo || urls.docs || availableUrls[0]?.[1];

    return (
        <article className="group relative h-full flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-xl
                     border border-zinc-800 hover:border-blue-500/50
                     shadow-xl hover:shadow-2xl hover:shadow-blue-500/20
                     transition-all duration-700 ease-out
                     hover:scale-[1.02] hover:-translate-y-1">

            {/* Animated gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-fuchsia-500/0 to-pink-500/0
                          group-hover:from-violet-500/10 group-hover:via-fuchsia-500/8 group-hover:to-pink-500/10
                          transition-all duration-700 ease-out"></div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </div>

            {/* Badge - Top Right Corner with glow */}
            {trending.badge && (
                <div className="absolute top-5 right-5 z-20">
                    <div className={`relative px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm ${badgeStyles[trending.badge]}`}>
                        <div className="absolute inset-0 rounded-full blur-md opacity-50 animate-pulse"></div>
                        <span className="relative z-10">{trending.badge}</span>
                    </div>
                </div>
            )}

            {/* Content Container */}
            <div className="relative z-10 flex flex-col h-full p-8">
                {/* Icon with gradient background */}
                {icon && (
                    <div className="relative mb-6 w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20
                                  border border-fuchsia-500/30 group-hover:scale-110 group-hover:rotate-3
                                  transition-all duration-500 shadow-lg shadow-fuchsia-500/10">
                        <div className="text-5xl">{icon}</div>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                    </div>
                )}

                {/* Title with gradient on hover */}
                <h3 className="text-2xl font-black text-white mb-3 leading-tight
                             group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:via-fuchsia-400 group-hover:to-pink-400
                             group-hover:bg-clip-text group-hover:text-transparent
                             transition-all duration-500">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-2 flex-grow">
                    {description}
                </p>

                {/* Tags - More stylish pills */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10
                                         text-fuchsia-300 rounded-full border border-fuchsia-500/30 backdrop-blur-sm
                                         hover:from-violet-500/20 hover:to-fuchsia-500/20 hover:border-fuchsia-400/50
                                         transition-all duration-300 cursor-default"
                            >
                                {tag}
                            </span>
                        ))}
                        {tags.length > 3 && (
                            <span className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-gray-500/10 to-gray-600/10
                                           text-gray-400 rounded-full border border-gray-500/30">
                                +{tags.length - 3}
                            </span>
                        )}
                    </div>
                )}

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6"></div>

                {/* Action Buttons - More prominent */}
                <div className="space-y-3">
                    {/* Primary Action - Main URL */}
                    {primaryUrl && (
                        <a
                            href={primaryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between w-full px-5 py-3.5
                                     bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600
                                     hover:from-violet-500 hover:via-fuchsia-500 hover:to-pink-500
                                     rounded-xl text-sm font-bold text-white
                                     shadow-lg shadow-fuchsia-500/25 hover:shadow-xl hover:shadow-fuchsia-500/40
                                     transform hover:scale-105 transition-all duration-300 group/btn"
                        >
                            <span className="flex items-center gap-2">
                                <FaGlobe size={16} />
                                Explore {title}
                            </span>
                            <FaArrowRight className="transform group-hover/btn:translate-x-1 transition-transform duration-300" size={14} />
                        </a>
                    )}

                    {/* Secondary Actions - Compact grid */}
                    {availableUrls.length > 1 && (
                        <div className="grid grid-cols-3 gap-2">
                            {availableUrls.slice(0, 3).filter(([type]) => type !== 'main').map(([type, url]) => (
                                <a
                                    key={type}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center justify-center gap-1.5 p-3
                                             bg-zinc-800/50 hover:bg-zinc-700/50
                                             border border-zinc-700/50 hover:border-fuchsia-500/50
                                             rounded-xl text-xs font-medium
                                             text-gray-400 hover:text-fuchsia-300
                                             transition-all duration-300 group/btn"
                                    title={urlLabels[type]}
                                >
                                    <span className="transform group-hover/btn:scale-110 transition-transform duration-200">
                                        {urlIcons[type]}
                                    </span>
                                    <span className="text-[10px]">{urlLabels[type]}</span>
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                {/* Trending Reason - Bottom */}
                {trending.reason && (
                    <div className="flex items-center gap-2 mt-6 pt-6 border-t border-zinc-800">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/10 border border-yellow-500/30">
                            <span className="text-yellow-400 text-xs">⭐</span>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{trending.reason}</span>
                    </div>
                )}
            </div>

            {/* Corner accent */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <style>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </article>
    );
}
