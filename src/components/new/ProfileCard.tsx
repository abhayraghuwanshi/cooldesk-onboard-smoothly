import { ProjectWorkspace, badgeStyles } from '@/config/workspaces';
import { Search } from 'lucide-react';
import { FaBook, FaCheck, FaDiscord, FaExternalLinkAlt, FaGamepad, FaGithub, FaGlobe, FaNpm, FaPlay, FaPlus } from 'react-icons/fa';

interface ProfileCardProps {
    workspace: ProjectWorkspace;
    selectionMode?: boolean;
    isSelected?: boolean;
    onSelect?: () => void;
}

// Icon mapping for URL types
const urlIcons: Record<string, JSX.Element> = {
    main: <FaGlobe size={14} />,
    docs: <FaBook size={14} />,
    github: <FaGithub size={14} />,
    demo: <FaPlay size={14} />,
    playground: <FaGamepad size={14} />,
    npm: <FaNpm size={14} />,
    discord: <FaDiscord size={14} />,
};

// Label mapping for URL types
const urlLabels: Record<string, string> = {
    main: 'Main Website',
    docs: 'Documentation',
    github: 'Source Code',
    demo: 'Live Demo',
    playground: 'Playground',
    npm: 'NPM Package',
    discord: 'Community',
};

export default function ProfileCard({ workspace, selectionMode = false, isSelected = false, onSelect }: ProfileCardProps) {
    const { title, description, icon, tags, urls, trending } = workspace;

    // Get available URLs
    const availableUrls = Object.entries(urls).filter(([_, url]) => url) as [string, string][];

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
                    : 'border border-zinc-800 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] hover:-translate-y-1'
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
                </div>
            )}

            {/* Badge - Top Right Corner */}
            {trending.badge && !selectionMode && (
                <div className="absolute top-5 right-5 z-20">
                    <div className={`relative px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm ${badgeStyles[trending.badge]}`}>
                        <div className="absolute inset-0 rounded-full blur-md opacity-50 animate-pulse"></div>
                        <span className="relative z-10">{trending.badge}</span>
                    </div>
                </div>
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
            <div className={`relative z-10 flex flex-col h-full p-6 sm:p-8 ${selectionMode ? 'pointer-events-none' : ''}`}>

                {/* Header Section */}
                <div className="flex items-start gap-4 mb-6">
                    {/* Icon */}
                    <div className={`relative flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20
                                  border border-fuchsia-500/30 transition-all duration-500 shadow-lg shadow-fuchsia-500/10`}>
                        <div className="text-3xl">{icon}</div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-fuchsia-400 transition-colors">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-1 font-medium bg-zinc-800 text-zinc-300 rounded-full border border-zinc-700">
                            {tag}
                        </span>
                    ))}
                    {tags.length > 3 && (
                        <span className="text-xs px-2.5 py-1 font-medium bg-zinc-800 text-zinc-500 rounded-full border border-zinc-700">
                            +{tags.length - 3}
                        </span>
                    )}
                </div>

                {/* URL List Section */}
                <div className="flex-grow space-y-2 mb-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Included Resources</h4>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                        {availableUrls.map(([type, url]) => (
                            <a
                                key={type}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-800/40 hover:bg-zinc-800 border border-zinc-700/50 hover:border-zinc-600
                                         transition-all duration-200 group/link pointer-events-auto"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="p-1.5 rounded-lg bg-zinc-900 text-gray-400 group-hover/link:text-fuchsia-400 transition-colors">
                                        {urlIcons[type] || <FaGlobe size={14} />}
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-semibold text-gray-300 group-hover/link:text-white transition-colors">
                                            {urlLabels[type] || type}
                                        </span>
                                        <span className="text-[10px] text-gray-500 truncate max-w-[150px]">
                                            {url.replace(/^https?:\/\/(www\.)?/, '')}
                                        </span>
                                    </div>
                                </div>
                                <FaExternalLinkAlt size={10} className="text-zinc-600 group-hover/link:text-zinc-400" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Action Button */}
                {!selectionMode && onSelect && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect();
                        }}
                        className="w-full mt-auto py-3 px-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-500 hover:via-fuchsia-500 hover:to-pink-500
                                 rounded-xl font-bold text-white text-sm shadow-lg shadow-fuchsia-500/20 hover:shadow-fuchsia-500/40
                                 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <Search size={14} />
                        View Structured Profile
                    </button>
                )}
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #3f3f46;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #52525b;
                }
            `}</style>
        </article>
    );
}
