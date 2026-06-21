import { ProjectWorkspace, badgeStyles } from '@/config/workspaces';
import { FaCheck, FaLayerGroup, FaArrowRight, FaPlus } from 'react-icons/fa';

interface ProfileCardProps {
    workspace: ProjectWorkspace;
    selectionMode?: boolean;
    isSelected?: boolean;
    onSelect?: () => void;
}

export default function ProfileCard({ workspace, selectionMode = false, isSelected = false, onSelect }: ProfileCardProps) {
    const { title, description, icon, tags, urls, trending } = workspace;

    const availableUrls = Object.entries(urls).filter(([_, url]) => url) as [string, string][];

    const handleCardClick = () => {
        if (selectionMode && onSelect) onSelect();
    };

    return (
        <article
            onClick={handleCardClick}
            className={`group relative h-full flex flex-col rounded-2xl bg-zinc-900/60 backdrop-blur-sm p-5
                     transition-all duration-200 ease-out
                     ${selectionMode
                    ? isSelected
                        ? 'border border-green-500 shadow-lg shadow-green-500/20 cursor-pointer'
                        : 'border border-dashed border-zinc-700 hover:border-fuchsia-500/60 cursor-pointer'
                    : 'border border-zinc-800 hover:border-purple-500/40 hover:bg-zinc-900/80 hover:-translate-y-0.5'
                }`}
        >
            {/* Header: icon + title + badge */}
            <div className="flex items-start gap-3 mb-3">
                {selectionMode && (
                    <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all
                                  ${isSelected
                            ? 'bg-green-500 text-white'
                            : 'bg-zinc-800 border border-zinc-600 group-hover:border-fuchsia-500'}`}>
                        {isSelected ? <FaCheck size={11} /> : <FaPlus size={9} className="text-zinc-500 group-hover:text-fuchsia-400" />}
                    </div>
                )}

                {icon && (
                    <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex-shrink-0">
                        <span className="text-2xl leading-none">{icon}</span>
                    </div>
                )}

                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-txt-primary truncate">{title}</h3>
                        {trending.badge && (
                            <span className={`text-[9px] font-semibold uppercase tracking-[0.15em] flex-shrink-0 ${badgeStyles[trending.badge]}`}>
                                {trending.badge}
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-txt-muted mt-0.5">
                        {availableUrls.length} resource{availableUrls.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-txt-secondary leading-snug line-clamp-2 mb-3 flex-grow">
                {description}
            </p>

            {/* Tags */}
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-0.5 text-[11px] font-medium text-txt-secondary bg-zinc-800/80 rounded-md border border-zinc-700/50"
                        >
                            {tag}
                        </span>
                    ))}
                    {tags.length > 3 && (
                        <span className="px-2 py-0.5 text-[11px] font-medium text-txt-muted">
                            +{tags.length - 3}
                        </span>
                    )}
                </div>
            )}

            {/* Action (hidden in selection mode) */}
            {!selectionMode && onSelect && (
                <button
                    onClick={(e) => { e.stopPropagation(); onSelect(); }}
                    className="w-full flex items-center justify-center gap-2 mt-auto px-3 py-2 rounded-lg text-sm font-semibold
                             text-txt-secondary bg-zinc-800/80 border border-zinc-700/60
                             hover:text-white hover:bg-purple-600 hover:border-purple-500
                             transition-colors duration-200 group/btn"
                >
                    <FaLayerGroup size={13} />
                    <span>View profile</span>
                    <FaArrowRight className="opacity-0 -ml-1 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all duration-200" size={11} />
                </button>
            )}
        </article>
    );
}
