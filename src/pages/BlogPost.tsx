import * as LucideIcons from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import Navbar from '../components/new/Navbar';
import SEO from '../components/SEO';
import { getBlogPostBySlug, getCategoryLabel, getLatestBlogs } from '../config/blogs';

type ReadingMode = 'normal' | 'detail' | 'extra-detail';

export default function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();
    const [searchParams] = useSearchParams();
    const readingMode = (searchParams.get('mode') as ReadingMode) || 'extra-detail';

    const post = slug ? getBlogPostBySlug(slug) : undefined;
    const relatedPosts = getLatestBlogs(3);

    // Function to intelligently trim content based on reading mode
    const getTrimmedContent = (content: string, mode: ReadingMode): string => {
        if (mode === 'extra-detail') return content;

        // Split content by ## headings to get main sections
        const parts = content.split(/(?=\n## )/);

        // For normal mode: show first 30% of content
        // For detail mode: show first 60% of content
        const percentage = mode === 'normal' ? 0.3 : 0.6;
        const targetLength = Math.floor(parts.length * percentage);
        const selectedParts = parts.slice(0, Math.max(2, targetLength)); // At least 2 sections

        let trimmedContent = selectedParts.join('');

        // For normal mode, also trim long code blocks
        if (mode === 'normal') {
            trimmedContent = trimmedContent.replace(/```[\s\S]*?```/g, (match) => {
                const lines = match.split('\n');
                if (lines.length > 12) {
                    // Show first 8 lines and add truncation note
                    const lang = lines[0].replace('```', '');
                    return '```' + lang + '\n' + lines.slice(1, 9).join('\n') + '\n// ... (truncated for quick read)\n```';
                }
                return match;
            });
        }

        return trimmedContent;
    };

    const trimmedContent = post ? getTrimmedContent(post.content, readingMode) : '';

    // Calculate adjusted read time
    const getAdjustedReadTime = (originalReadTime: string, mode: ReadingMode): string => {
        const minutes = parseInt(originalReadTime.match(/\d+/)?.[0] || '0');

        switch (mode) {
            case 'normal':
                return `${Math.ceil(minutes * 0.5)} min read`;
            case 'detail':
                return `${Math.ceil(minutes * 0.75)} min read`;
            case 'extra-detail':
                return originalReadTime;
            default:
                return originalReadTime;
        }
    };

    const getReadingModeLabel = (mode: ReadingMode): string => {
        switch (mode) {
            case 'normal':
                return '⚡ Quick Read';
            case 'detail':
                return '📖 Detailed';
            case 'extra-detail':
                return '🔍 Full Article';
            default:
                return mode;
        }
    };

    if (!post) {
        return (
            <main className="min-h-screen text-white bg-black flex items-center justify-center">
                <Navbar />
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
                    <Link to="/blog" className="text-blue-400 hover:text-blue-300">
                        ← Back to Blog
                    </Link>
                </div>
            </main>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const canonicalUrl = `https://cool-desk.com/blog/${post.slug}`;

    // Schema.org Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description,
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "datePublished": post.date,
        "url": canonicalUrl,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
        },
        "publisher": {
            "@type": "Organization",
            "name": "CoolDesk",
            "logo": {
                "@type": "ImageObject",
                "url": "https://cool-desk.com/favicon.ico"
            }
        }
    };

    return (
        <main className="min-h-screen text-white scroll-smooth bg-black">
            <SEO
                title={post.title}
                description={post.description}
                canonical={canonicalUrl}
            />
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Helmet>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
            <Navbar />

            <article className="relative z-10 py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    {/* Back Button */}
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors group"
                    >
                        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Blog
                    </Link>

                    {/* Article Header */}
                    <div className="mb-12 animate-fade-in">
                        {/* Category Badge */}
                        <span className="inline-flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full text-sm font-medium text-blue-300 border border-blue-500/30 mb-6">
                            {getCategoryLabel(post.category)}
                        </span>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 text-zinc-400">
                            <div className="flex items-center gap-2">
                                <LucideIcons.User className="w-5 h-5 text-blue-400" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <LucideIcons.Calendar className="w-5 h-5 text-purple-400" />
                                <span>{formatDate(post.date)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <LucideIcons.Clock className="w-5 h-5 text-cyan-400" />
                                <span className="text-blue-400 font-semibold">
                                    {getAdjustedReadTime(post.readTime, readingMode)}
                                </span>
                            </div>
                        </div>

                        {/* Reading Mode Selector */}
                        <div className="mt-8">
                            <h4 className="text-xs font-semibold text-zinc-500 mb-3 uppercase tracking-wider">
                                Reading Mode
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {(['normal', 'detail', 'extra-detail'] as ReadingMode[]).map((mode) => (
                                    <Link
                                        key={mode}
                                        to={`/blog/${slug}?mode=${mode}`}
                                        className={`group relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${readingMode === mode
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 cursor-default'
                                            : 'bg-zinc-900/60 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 hover:bg-zinc-800'
                                            }`}
                                        onClick={(e) => readingMode === mode && e.preventDefault()}
                                    >
                                        {readingMode === mode && (
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-md" />
                                        )}
                                        <span className="relative z-10 flex items-center gap-1.5">
                                            {mode === 'normal' && <LucideIcons.Zap className="w-4 h-4" />}
                                            {mode === 'detail' && <LucideIcons.BookOpen className="w-4 h-4" />}
                                            {mode === 'extra-detail' && <LucideIcons.Search className="w-4 h-4" />}
                                            <span>
                                                {mode === 'normal' && 'Quick'}
                                                {mode === 'detail' && 'Detailed'}
                                                {mode === 'extra-detail' && 'Full'}
                                            </span>
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-invert prose-lg max-w-none mb-16 animate-fade-in-delay">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({ children }) => (
                                    <h1 className="text-4xl font-bold text-white mt-12 mb-6 first:mt-0">{children}</h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 className="text-3xl font-bold text-white mt-10 mb-5">{children}</h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h3>
                                ),
                                h4: ({ children }) => (
                                    <h4 className="text-xl font-bold text-white mt-6 mb-3">{children}</h4>
                                ),
                                p: ({ children }) => (
                                    <p className="mb-4 text-zinc-300 leading-relaxed text-lg">{children}</p>
                                ),
                                ul: ({ children }) => (
                                    <ul className="list-disc ml-6 mb-6 space-y-2">{children}</ul>
                                ),
                                ol: ({ children }) => (
                                    <ol className="list-decimal ml-6 mb-6 space-y-2">{children}</ol>
                                ),
                                li: ({ children }) => (
                                    <li className="text-zinc-300 text-lg">{children}</li>
                                ),
                                a: ({ href, children }) => (
                                    <a
                                        href={href}
                                        className="text-blue-400 hover:text-blue-300 underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {children}
                                    </a>
                                ),
                                strong: ({ children }) => (
                                    <strong className="text-white font-bold">{children}</strong>
                                ),
                                code: ({ inline, className, children, ...props }: any) => {
                                    const match = /language-(\w+)/.exec(className || '');
                                    const language = match ? match[1] : '';

                                    return !inline && language ? (
                                        <div className="my-6 rounded-xl overflow-hidden border border-zinc-700">
                                            <div className="bg-zinc-900 px-4 py-2 border-b border-zinc-700 flex items-center justify-between">
                                                <span className="text-xs font-mono text-zinc-400 uppercase">
                                                    {language}
                                                </span>
                                            </div>
                                            <SyntaxHighlighter
                                                style={vscDarkPlus}
                                                language={language}
                                                PreTag="div"
                                                className="!bg-zinc-950 !m-0 text-sm"
                                                customStyle={{
                                                    padding: '1.5rem',
                                                    margin: 0,
                                                    background: '#09090b',
                                                }}
                                                {...props}
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        </div>
                                    ) : (
                                        <code
                                            className="bg-zinc-800 text-blue-300 px-2 py-1 rounded text-sm font-mono"
                                            {...props}
                                        >
                                            {children}
                                        </code>
                                    );
                                },
                                pre: ({ children }) => <>{children}</>,
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-4 border-blue-500 pl-4 my-6 italic text-zinc-400">
                                        {children}
                                    </blockquote>
                                ),
                            }}
                        >
                            {trimmedContent}
                        </ReactMarkdown>

                        {/* Show "View Full Article" button if content is trimmed */}
                        {readingMode !== 'extra-detail' && (
                            <div className="mt-12 p-8 bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-2xl backdrop-blur-sm text-center">
                                <p className="text-zinc-300 mb-4">
                                    Want to dive deeper? The full article contains additional sections with detailed examples and code.
                                </p>
                                <Link
                                    to={`/blog/${slug}?mode=extra-detail`}
                                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-500/30"
                                >
                                    <span>View Full Article</span>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    <div className="mb-16 pb-16 border-b border-zinc-800">
                        <h3 className="text-lg font-bold text-white mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-3">
                            {post.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-zinc-900/60 border border-zinc-700 rounded-full text-sm text-zinc-300 hover:border-blue-500/50 transition-colors"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Related Posts */}
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.filter(p => p.id !== post.id).slice(0, 3).map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    to={`/blog/${relatedPost.slug}`}
                                    className="group bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-zinc-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="mb-4">
                                        <div className="w-10 h-10 bg-blue-500/10 rounded-xl border border-blue-500/20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                            {(() => {
                                                const Icon = (LucideIcons as any)[relatedPost.icon || 'FileText'] || LucideIcons.FileText;
                                                return <Icon className="w-6 h-6 text-blue-400" />;
                                            })()}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                        {relatedPost.title}
                                    </h3>
                                    <p className="text-sm text-zinc-400 line-clamp-2">
                                        {relatedPost.description}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
                .animate-fade-in-delay {
                    opacity: 0;
                    animation: fade-in 0.8s ease-out 0.3s forwards;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </main>
    );
}
