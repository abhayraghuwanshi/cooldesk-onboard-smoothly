import { FaBook, FaCheck, FaDiscord, FaGamepad, FaGithub, FaGlobe, FaNpm, FaPlay, FaArrowRight, FaPlus } from 'react-icons/fa';
import { ProjectWorkspace, badgeStyles } from '@/config/workspaces';

interface WorkspaceCardProps {
    workspace: ProjectWorkspace;
    selectionMode?: boolean;
    isSelected?: boolean;
    onSelect?: () => void;
}

// Icon mapping for URL types
const urlIcons: Record<string, JSX.Element> = {
    main: <FaGlobe size={16} />,
    docs: <FaBook size={16} />,
    github: <FaGithub size={16} />,
    demo: <FaPlay size={16} />,
    playground: <FaGamepad size={16} />,
    npm: <FaNpm size={16} />,
    discord: <FaDiscord size={16} />,
};

// Label mapping for URL types
const urlLabels: Record<string, string> = {
    main: 'Visit',
    docs: 'Docs',
    github: 'Code',
    demo: 'Demo',
    playground: 'Try',
    npm: 'Package',
    discord: 'Chat',
};

export default function WorkspaceCard({ workspace, selectionMode = false, isSelected = false, onSelect }: WorkspaceCardProps) {
    const { title, description, icon, tags, urls, trending } = workspace;

    // Get available URLs - prioritize main, docs, github, demo
    const availableUrls = Object.entries(urls).filter(([_, url]) => url) as [keyof typeof urls, string][];
    const primaryUrl = urls.main || urls.demo || urls.docs || availableUrls[0]?.[1];

    // Handle card click in selection mode
    const handleCardClick = () => {
        if (selectionMode && onSelect) {
            onSelect();
        }
    };

    return (
        <article
            onClick={handleCardClick}
            className={`group relative h-full flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-xl
                     shadow-xl transition-all duration-300 ease-out
                     ${selectionMode
                         ? isSelected
                             ? 'border-2 border-green-500 shadow-green-500/30 scale-[1.02] cursor-pointer'
                             : 'border-2 border-dashed border-zinc-600 hover:border-fuchsia-500 cursor-pointer hover:scale-[1.01]'
                         : 'border border-zinc-800 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02] hover:-translate-y-1'
                     }`}
        >
            {/* Selection Mode Overlay */}
            {selectionMode && (
                <div className={`absolute inset-0 z-30 transition-all duration-300 ${isSelected ? 'bg-green-500/10' : 'bg-transparent hover:bg-fuchsia-500/5'}`}>
                    {/* Checkbox indicator - top left */}
                    <div className={`absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                                  ${isSelected
                                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
                                      : 'bg-zinc-800 border-2 border-zinc-600 group-hover:border-fuchsia-500 group-hover:bg-zinc-700'
                                  }`}>
                        {isSelected ? (
                            <FaCheck size={14} />
                        ) : (
                            <FaPlus size={12} className="text-zinc-400 group-hover:text-fuchsia-400" />
                        )}
                    </div>

                    {/* Click to select hint */}
                    {!isSelected && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="px-3 py-1.5 bg-zinc-800/90 backdrop-blur-sm rounded-full text-xs font-medium text-zinc-300 border border-zinc-700">
                                Click to select
                            </span>
                        </div>
                    )}
                </div>
            )}

            {/* Animated gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-fuchsia-500/0 to-pink-500/0
                          group-hover:from-violet-500/10 group-hover:via-fuchsia-500/8 group-hover:to-pink-500/10
                          transition-all duration-700 ease-out"></div>

            {/* Shimmer effect */}
            {!selectionMode && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </div>
            )}

            {/* Badge - Top Right Corner with glow */}
            {trending.badge && !selectionMode && (
                <div className="absolute top-5 right-5 z-20">
                    <div className={`relative px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm ${badgeStyles[trending.badge]}`}>
                        <div className="absolute inset-0 rounded-full blur-md opacity-50 animate-pulse"></div>
                        <span className="relative z-10">{trending.badge}</span>
                    </div>
                </div>
            )}

            {/* Quick Add Button - appears on hover when NOT in selection mode */}
            {!selectionMode && onSelect && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect();
                    }}
                    className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300
                             flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold
                             bg-zinc-800/90 hover:bg-fuchsia-600 border border-zinc-600 hover:border-fuchsia-500
                             text-zinc-300 hover:text-white backdrop-blur-sm
                             transform translate-y-2 group-hover:translate-y-0"
                    title="Add to CoolDesk"
                >
                    <FaPlus size={10} />
                    <span>Select</span>
                </button>
            )}

            {/* Selected badge when in selection mode */}
            {selectionMode && isSelected && (
                <div className="absolute top-5 right-5 z-40">
                    <div className="px-3 py-1.5 rounded-full text-xs font-bold bg-green-500/20 text-green-300 border border-green-500/50 backdrop-blur-sm">
                        Selected
                    </div>
                </div>
            )}

            {/* Content Container */}
            <div className={`relative z-10 flex flex-col h-full p-8 ${selectionMode ? 'pointer-events-none' : ''}`}>
                {/* Icon with gradient background */}
                {icon && (
                    <div className={`relative mb-6 w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20
                                  border border-fuchsia-500/30 transition-all duration-500 shadow-lg shadow-fuchsia-500/10
                                  ${!selectionMode ? 'group-hover:scale-110 group-hover:rotate-3' : ''}
                                  ${selectionMode ? 'ml-10' : ''}`}>
                        <div className="text-5xl">{icon}</div>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                    </div>
                )}

                {/* Title with gradient on hover */}
                <h3 className={`heading-3 text-txt-primary mb-3 leading-tight transition-all duration-500
                             ${!selectionMode ? 'group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:via-fuchsia-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent' : ''}`}>
                    {title}
                </h3>

                {/* Description */}
                <p className="body-sm text-txt-secondary mb-6 leading-relaxed line-clamp-2 flex-grow">
                    {description}
                </p>

                {/* Tags - More stylish pills */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="caption px-3 py-1.5 font-semibold bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10
                                         text-fuchsia-300 rounded-full border border-fuchsia-500/30 backdrop-blur-sm
                                         transition-all duration-300 cursor-default"
                            >
                                {tag}
                            </span>
                        ))}
                        {tags.length > 3 && (
                            <span className="caption px-3 py-1.5 font-semibold bg-gradient-to-r from-zinc-500/10 to-zinc-600/10
                                           text-txt-secondary rounded-full border border-zinc-500/30">
                                +{tags.length - 3}
                            </span>
                        )}
                    </div>
                )}

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mb-6"></div>

                {/* Action Buttons - Only show when NOT in selection mode */}
                {!selectionMode && (
                    <div className="space-y-3 pointer-events-auto">
                        {/* Primary Action - Main URL */}
                        {primaryUrl && (
                            <a
                                href={primaryUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between w-full px-5 py-3.5
                                         bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600
                                         hover:from-violet-500 hover:via-fuchsia-500 hover:to-pink-500
                                         rounded-xl body-sm font-bold text-txt-primary
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
                                                 rounded-xl caption font-medium
                                                 text-txt-secondary hover:text-fuchsia-300
                                                 transition-all duration-300 group/btn"
                                        title={urlLabels[type]}
                                    >
                                        <span className="transform group-hover/btn:scale-110 transition-transform duration-200">
                                            {urlIcons[type]}
                                        </span>
                                        <span className="text-2xs">{urlLabels[type]}</span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* URL count info when in selection mode */}
                {selectionMode && (
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <FaGlobe size={14} />
                        <span>{availableUrls.length} link{availableUrls.length !== 1 ? 's' : ''} included</span>
                    </div>
                )}

                {/* Trending Reason - Bottom */}
                {trending.reason && !selectionMode && (
                    <div className="flex items-center gap-2 mt-6 pt-6 border-t border-zinc-800">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/10 border border-yellow-500/30">
                            <span className="text-yellow-400 caption">⭐</span>
                        </div>
                        <span className="caption text-txt-muted font-medium">{trending.reason}</span>
                    </div>
                )}
            </div>

            {/* Corner accent */}
            {!selectionMode && (
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            )}
        </article>
    );
}
