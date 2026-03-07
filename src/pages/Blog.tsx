import * as LucideIcons from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/new/Footer';
import Navbar from '../components/new/Navbar';
import SEO from '../components/SEO';
import { BlogCategory, blogPosts, getCategoryLabel } from '../config/blogs';

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all');

    const categories: (BlogCategory | 'all')[] = ['all', 'productivity', 'features', 'tips', 'guides', 'updates'];

    const filteredPosts = blogPosts.filter(post => {
        return selectedCategory === 'all' || post.category === selectedCategory;
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    // Featured Post is the first one
    const featuredPost = filteredPosts[0];
    const otherPosts = filteredPosts.slice(1);

    return (
        <main className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
            <SEO
                title="Blog | Insights & Guides"
                description="Explore the CoolDesk blog for tips on browser productivity, AI tools, and efficient workflow management."
                canonical="https://cool-desk.com/blog"
            />

            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-24 max-w-5xl">
                {/* Header */}
                <header className="mb-20 text-center md:text-left border-b border-white/10 pb-12">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        CoolDesk <span className="text-txt-muted font-light">Blog</span>
                    </h1>
                    <p className="text-xl text-txt-secondary max-w-2xl leading-relaxed">
                        Thoughts on the future of browsing, productivity, and the agentic web.
                    </p>
                </header>

                {/* Category Navigation */}
                <nav className="flex flex-wrap gap-x-8 gap-y-4 mb-16 text-sm font-medium border-b border-white/10 pb-4 overflow-x-auto">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`transition-colors whitespace-nowrap pb-4 -mb-4 border-b-2 ${selectedCategory === category
                                    ? 'text-white border-white'
                                    : 'text-txt-muted border-transparent hover:text-white'
                                }`}
                        >
                            {category === 'all' ? 'Latest' : getCategoryLabel(category)}
                        </button>
                    ))}
                </nav>


                {/* Featured Area */}
                {selectedCategory === 'all' && featuredPost && (
                    <section className="mb-24 group cursor-pointer">
                        <Link to={`/blog/${featuredPost.slug}`} className="block">
                            <div className="grid md:grid-cols-12 gap-8 items-center">
                                <div className="md:col-span-8 space-y-4">
                                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-txt-muted mb-2">
                                        <span className="text-blue-400">{getCategoryLabel(featuredPost.category)}</span>
                                        <span>•</span>
                                        <span>{formatDate(featuredPost.date)}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-bold leading-tight group-hover:underline decoration-2 underline-offset-4 decoration-white/30">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-lg text-txt-secondary leading-relaxed line-clamp-3">
                                        {featuredPost.description}
                                    </p>
                                    <div className="pt-4 flex items-center gap-2 text-sm text-white font-medium">
                                        Read article <LucideIcons.ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                                <div className="md:col-span-4 aspect-[4/3] bg-zinc-900 rounded-lg border border-white/10 flex items-center justify-center overflow-hidden relative">
                                    {/* Abstract Visual Placeholder */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
                                    {(() => {
                                        const Icon = (LucideIcons as any)[featuredPost.icon || 'FileText'] || LucideIcons.FileText;
                                        return <Icon className="w-16 h-16 text-white/20 group-hover:scale-110 transition-transform duration-500" />;
                                    })()}
                                </div>
                            </div>
                        </Link>
                    </section>
                )}

                {/* Main Feed */}
                <div className="max-w-3xl">
                    {otherPosts.length > 0 ? (
                        <div className="space-y-16">
                            {otherPosts.map((post) => (
                                <article key={post.id} className="group relative grid grid-cols-[1fr,auto] gap-8 items-start border-b border-white/5 pb-16 last:border-0">
                                    <Link to={`/blog/${post.slug}`} className="block space-y-3">
                                        <div className="flex items-center gap-2 text-xs font-medium text-txt-muted mb-1">
                                            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                                                {(() => {
                                                    const Icon = (LucideIcons as any)[post.icon || 'FileText'] || LucideIcons.FileText;
                                                    return <Icon className="w-3 h-3 text-white/70" />;
                                                })()}
                                            </div>
                                            <span>{getCategoryLabel(post.category)}</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-txt-secondary leading-relaxed line-clamp-2">
                                            {post.description}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-txt-muted mt-2">
                                            <span>{formatDate(post.date)}</span>
                                            <span>•</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                    </Link>

                                    {/* Simple right-side thumbnail/icon area for visual balance */}
                                    <div className="hidden sm:flex w-24 h-24 bg-zinc-900/50 rounded-lg border border-white/5 items-center justify-center shrink-0">
                                        {(() => {
                                            const Icon = (LucideIcons as any)[post.icon || 'FileText'] || LucideIcons.FileText;
                                            return <Icon className="w-8 h-8 text-white/10" />;
                                        })()}
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center text-txt-muted">
                            No posts found in this category.
                        </div>
                    )}
                </div>

                {/* Newsletter Minimal */}
                <div className="mt-32 border-t border-white/10 pt-16">
                    <div className="max-w-2xl">
                        <h3 className="text-2xl font-bold mb-4">Stay in the loop</h3>
                        <p className="text-txt-secondary mb-6">Get the latest updates on browser productivity and CoolDesk features.</p>
                        <div className="flex gap-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1 bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-white transition-colors placeholder:text-zinc-600"
                            />
                            <button className="px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </main>
    );
}
