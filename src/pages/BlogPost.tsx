import * as LucideIcons from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import Footer from '../components/new/Footer';
import Navbar from '../components/new/Navbar';
import SEO from '../components/SEO';
import { getBlogPostBySlug, getCategoryLabel, getLatestBlogs } from '../config/blogs';

export default function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();

    const post = slug ? getBlogPostBySlug(slug) : undefined;
    const relatedPosts = getLatestBlogs(3);

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
        <main className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
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

            <Navbar />

            <article className="container mx-auto px-6 pt-32 pb-24 max-w-3xl">
                {/* Back Link */}
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-txt-muted hover:text-white mb-12 transition-colors group text-sm font-medium"
                >
                    <LucideIcons.ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </Link>

                {/* Article Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-3 text-sm font-medium text-blue-400 mb-6 uppercase tracking-wider">
                        <span>{getCategoryLabel(post.category)}</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-400">{formatDate(post.date)}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-between border-y border-white/10 py-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                                <LucideIcons.User className="w-5 h-5 text-zinc-400" />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-white">{post.author}</div>
                                <div className="text-xs text-zinc-500">CoolDesk Team</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-zinc-400 text-sm">
                            <div className="flex items-center gap-1.5">
                                <LucideIcons.Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                            {/* Optional Share Button could go here */}
                        </div>
                    </div>
                </header>

                {/* Article Content */}
                <div className="mb-16 animate-fade-in-delay">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ children }) => (
                                <h1 className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6 leading-tight">{children}</h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6 leading-tight border-b border-white/10 pb-2">{children}</h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4 leading-snug">{children}</h3>
                            ),
                            h4: ({ children }) => (
                                <h4 className="text-lg md:text-xl font-bold text-white mt-6 mb-3">{children}</h4>
                            ),
                            p: ({ children }) => (
                                <p className="mb-6 text-lg text-zinc-300 leading-8 font-light">{children}</p>
                            ),
                            ul: ({ children }) => (
                                <ul className="list-disc pl-6 mb-8 space-y-3 text-zinc-300 text-lg leading-relaxed marker:text-blue-500">{children}</ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="list-decimal pl-6 mb-8 space-y-3 text-zinc-300 text-lg leading-relaxed marker:text-blue-500">{children}</ol>
                            ),
                            li: ({ children }) => (
                                <li className="pl-2">{children}</li>
                            ),
                            a: ({ href, children }) => (
                                <a
                                    href={href}
                                    className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-500/30 hover:decoration-blue-500 transition-all font-medium"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {children}
                                </a>
                            ),
                            strong: ({ children }) => (
                                <strong className="text-white font-bold">{children}</strong>
                            ),
                            blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-blue-500 pl-6 my-8 italic text-xl text-zinc-400 bg-zinc-900/30 py-4 pr-4 rounded-r-lg">
                                    {children}
                                </blockquote>
                            ),
                            code: ({ inline, className, children, ...props }: any) => {
                                const match = /language-(\w+)/.exec(className || '');
                                const language = match ? match[1] : '';

                                return !inline && language ? (
                                    <div className="my-8 rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-[#09090b]">
                                        <div className="bg-zinc-900/50 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                                            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                                                {language}
                                            </span>
                                        </div>
                                        <SyntaxHighlighter
                                            style={vscDarkPlus}
                                            language={language}
                                            PreTag="div"
                                            className="!bg-zinc-950 !m-0 !p-6 text-sm overflow-x-auto"
                                            customStyle={{
                                                margin: 0,
                                                background: '#09090b',
                                            }}
                                            {...props}
                                        >
                                            {String(children).replace(/\n$/, '')}
                                        </SyntaxHighlighter>
                                    </div>
                                ) : (
                                    <code className="bg-zinc-800 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono border border-white/5" {...props}>
                                        {children}
                                    </code>
                                );
                            },
                            img: ({ src, alt }) => (
                                <figure className="my-10">
                                    <img
                                        src={src}
                                        alt={alt}
                                        className="rounded-xl border border-white/10 shadow-2xl w-full"
                                    />
                                    {alt && <figcaption className="text-center text-sm text-zinc-500 mt-3 italic">{alt}</figcaption>}
                                </figure>
                            ),
                            hr: () => (
                                <hr className="my-12 border-white/10" />
                            )
                        }}
                    >
                        {post.content.replace(/^# .+(\r?\n|$)/, '').trim()}
                    </ReactMarkdown>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="mb-20 pt-8 border-t border-white/10">
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-zinc-900 text-zinc-400 rounded-full text-sm font-medium hover:bg-zinc-800 hover:text-white transition-colors cursor-default"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}


                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="border-t border-white/10 pt-16">
                        <h2 className="text-2xl font-bold text-white mb-8">Read next</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {relatedPosts.filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    to={`/blog/${relatedPost.slug}`}
                                    className="group block space-y-4"
                                >
                                    <div className="aspect-[16/9] bg-zinc-900 rounded-lg border border-white/10 flex items-center justify-center overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 group-hover:opacity-75 transition-opacity"></div>
                                        {(() => {
                                            const Icon = (LucideIcons as any)[relatedPost.icon || 'FileText'] || LucideIcons.FileText;
                                            return <Icon className="w-12 h-12 text-white/20 group-hover:scale-110 transition-transform duration-500" />;
                                        })()}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors leading-tight">
                                            {relatedPost.title}
                                        </h3>
                                        <div className="text-sm text-zinc-500">
                                            {formatDate(relatedPost.date)} • {relatedPost.readTime}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </article>

            <Footer />
        </main>
    );
}
