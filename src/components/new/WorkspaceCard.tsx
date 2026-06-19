import { FaCheck, FaGlobe, FaArrowRight, FaPlus, FaDesktop, FaTerminal } from 'react-icons/fa';
import { ProjectWorkspace, badgeStyles, getToolType, toolTypeLabels, ToolType } from '@/config/workspaces';

interface WorkspaceCardProps {
    workspace: ProjectWorkspace;
    selectionMode?: boolean;
    isSelected?: boolean;
    onSelect?: () => void;
}

// Icon per tool type for the small header chip
const toolTypeIcons: Record<ToolType, JSX.Element> = {
    app: <FaDesktop size={10} />,
    webapp: <FaGlobe size={10} />,
    cli: <FaTerminal size={10} />,
};

export default function WorkspaceCard({ workspace, selectionMode = false, isSelected = false, onSelect }: WorkspaceCardProps) {
    const { title, description, icon, urls, trending } = workspace;

    // Get available URLs - prioritize main, demo, docs
    const availableUrls = Object.entries(urls).filter(([_, url]) => url) as [keyof typeof urls, string][];
    const primaryUrl = urls.main || urls.demo || urls.docs || availableUrls[0]?.[1];

    const toolType = getToolType(workspace);

    const handleCardClick = () => {
        if (selectionMode && onSelect) onSelect();
    };

    return (
        <article
            onClick={handleCardClick}
            className={`group relative h-full flex flex-col rounded-2xl p-5 overflow-hidden backdrop-blur-sm
                     transition-all duration-200 ease-out
                     ${selectionMode
                    ? isSelected
                        ? 'bg-green-500/[0.08] border border-green-500/70 shadow-lg shadow-green-500/10 cursor-pointer'
                        : 'bg-white/[0.03] border border-dashed border-white/15 hover:border-fuchsia-500/60 cursor-pointer'
                    : 'bg-gradient-to-b from-white/[0.06] to-white/[0.015] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] hover:border-white/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40'
                }`}
        >
            {/* Soft hover glow */}
            {!selectionMode && (
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-fuchsia-500/[0.08] via-transparent to-transparent" />
            )}

            {/* Header: icon + title + badge */}
            <div className="flex items-start gap-3 mb-3">
                {/* Selection checkbox replaces nothing — sits inline in selection mode */}
                {selectionMode && (
                    <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all
                                  ${isSelected
                            ? 'bg-green-500 text-white'
                            : 'bg-white/[0.06] border border-white/15 group-hover:border-fuchsia-500'}`}>
                        {isSelected ? <FaCheck size={11} /> : <FaPlus size={9} className="text-zinc-400 group-hover:text-fuchsia-400" />}
                    </div>
                )}

                {icon && (
                    <div className="relative w-11 h-11 flex items-center justify-center rounded-xl flex-shrink-0
                                  bg-white/[0.06] ring-1 ring-inset ring-white/10 shadow-sm
                                  transition-transform duration-200 group-hover:scale-[1.04]">
                        <span className="text-2xl leading-none">{icon}</span>
                    </div>
                )}

                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-txt-primary truncate">{title}</h3>
                        {trending.badge && (
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeStyles[trending.badge]}`}>
                                {trending.badge}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-txt-muted min-w-0">
                        <span className="inline-flex items-center gap-1 text-txt-secondary flex-shrink-0">
                            {toolTypeIcons[toolType]}
                            {toolTypeLabels[toolType]}
                        </span>
                        {trending.reason && (
                            <>
                                <span className="text-zinc-600">·</span>
                                <span className="truncate">{trending.reason}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-txt-secondary leading-snug line-clamp-2 flex-grow">
                {description}
            </p>

            {/* Actions — in-flow on mobile, hover-revealed overlay on desktop (no reserved gap) */}
            {!selectionMode ? (
                <div className="flex items-center gap-2 mt-3 opacity-100 translate-y-0
                              sm:mt-0 sm:absolute sm:inset-x-5 sm:bottom-5 sm:opacity-0 sm:translate-y-1
                              sm:group-hover:opacity-100 sm:group-hover:translate-y-0
                              transition-all duration-200">
                    {primaryUrl && (
                        <a
                            href={primaryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold
                                     text-white bg-fuchsia-600 border border-fuchsia-500 shadow-lg shadow-fuchsia-600/25
                                     hover:bg-fuchsia-500
                                     transition-colors duration-200 group/btn"
                        >
                            <FaGlobe size={13} />
                            <span>Visit</span>
                            <FaArrowRight className="opacity-0 -ml-1 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all duration-200" size={11} />
                        </a>
                    )}

                    {onSelect && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onSelect(); }}
                            title="Add to CoolDesk"
                            aria-label={`Add ${title} to CoolDesk`}
                            className="flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0
                                     text-txt-secondary bg-white/[0.06] border border-white/10
                                     hover:text-white hover:bg-fuchsia-600 hover:border-fuchsia-500
                                     transition-colors duration-200"
                        >
                            <FaPlus size={12} />
                        </button>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-2 mt-auto text-xs text-txt-muted">
                    <FaGlobe size={12} />
                    <span>{availableUrls.length} link{availableUrls.length !== 1 ? 's' : ''} included</span>
                </div>
            )}
        </article>
    );
}
