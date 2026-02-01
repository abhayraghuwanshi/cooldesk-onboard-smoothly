import * as LucideIcons from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/new/Footer';
import Navbar from '../components/new/Navbar';
import SEO from '../components/SEO';
import { BlogCategory, blogPosts, getCategoryLabel } from '../config/blogs';

type ReadingMode = 'normal' | 'detail' | 'extra-detail';

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all');
    const [readingMode, setReadingMode] = useState<ReadingMode>('normal');

    const categories: (BlogCategory | 'all')[] = ['all', 'productivity', 'features', 'tips', 'guides', 'updates'];

    // Calculate adjusted read time based on reading mode
    const getAdjustedReadTime = (originalReadTime: string, mode: ReadingMode): string => {
        const minutes = parseInt(originalReadTime.match(/\d+/)?.[0] || '0');

        switch (mode) {
            case 'normal':
                return `${Math.ceil(minutes * 0.5)} min read`; // 50% of content
            case 'detail':
                return `${Math.ceil(minutes * 0.75)} min read`; // 75% of content
            case 'extra-detail':
                return originalReadTime; // 100% of content
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

    const getReadingModeDescription = (mode: ReadingMode): string => {
        switch (mode) {
            case 'normal':
                return 'Key takeaways and essential information';
            case 'detail':
                return 'Comprehensive coverage with examples';
            case 'extra-detail':
                return 'Complete technical deep-dive';
            default:
                return '';
        }
    };

    const filteredPosts = blogPosts.filter(post => {
        return selectedCategory === 'all' || post.category === selectedCategory;
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <main className="min-h-screen text-white scroll-smooth bg-black">
            <SEO
                title="Blog | Insights & Guides"
                description="Explore the CoolDesk blog for tips on browser productivity, AI tools, and efficient workflow management."
                canonical="https://cool-desk.com/blog"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
            <Navbar />

            <section className="relative z-10 py-24">
                {/* Animated Background Gradients */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-purple-500/10 rounded-full blur-[140px] animate-pulse delay-1000" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    {/* Hero Header */}
                    <div className="text-center mb-16 animate-fade-in">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mb-6 leading-tight">
                            CoolDesk Blog
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light">
                            Tips, guides, and insights for maximizing your productivity
                        </p>
                    </div>

                    {/* Reading Mode Selector */}
                    <div className="mb-12 animate-fade-in-delay">
                        <h3 className="text-center text-sm font-semibold text-zinc-400 mb-4 uppercase tracking-wider">
                            Reading Mode
                        </h3>
                        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                            {(['normal', 'detail', 'extra-detail'] as ReadingMode[]).map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setReadingMode(mode)}
                                    className={`group relative flex-1 min-w-[200px] px-6 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${readingMode === mode
                                            ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-500/40 border-2 border-blue-400'
                                            : 'bg-zinc-900/60 border-2 border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-900 hover:border-zinc-600 backdrop-blur-sm'
                                        }`}
                                >
                                    {readingMode === mode && (
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-xl animate-pulse" />
                                    )}
                                    <div className="relative z-10 text-left">
                                        <div className="text-base font-bold mb-1">
                                            {getReadingModeLabel(mode)}
                                        </div>
                                        <div className={`text-xs ${readingMode === mode ? 'text-blue-100' : 'text-zinc-500'}`}>
                                            {getReadingModeDescription(mode)}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mb-16 animate-fade-in-delay">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`group relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${selectedCategory === category
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-500/40'
                                        : 'bg-zinc-900/60 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-900 hover:border-zinc-600 backdrop-blur-sm'
                                    }`}
                            >
                                {selectedCategory === category && (
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-xl animate-pulse" />
                                )}
                                <span className="relative z-10">
                                    {category === 'all' ? '✨ All Posts' : getCategoryLabel(category)}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Blog Grid */}
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post, index) => (
                                <Link
                                    key={post.id}
                                    to={`/blog/${post.slug}?mode=${readingMode}`}
                                    className="group relative bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-zinc-800 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 backdrop-blur-sm animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Glow Effect on Hover */}
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-cyan-500/10 transition-all duration-500 pointer-events-none" />

                                    {/* Content */}
                                    <div className="relative z-10 text-center md:text-left">
                                        {/* Icon */}
                                        <div className="mb-6 flex justify-center md:justify-start">
                                            <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                                {(() => {
                                                    const Icon = (LucideIcons as any)[post.icon || 'FileText'] || LucideIcons.FileText;
                                                    return <Icon className="w-12 h-12 text-blue-400" />;
                                                })()}
                                            </div>
                                        </div>

                                        {/* Category Badge */}
                                        <span className="inline-flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-full text-xs font-medium text-blue-300 border border-blue-500/30 mb-4">
                                            {getCategoryLabel(post.category)}
                                        </span>

                                        {/* Title */}
                                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                                            {post.title}
                                        </h2>

                                        {/* Description */}
                                        <p className="text-zinc-400 text-sm mb-6 leading-relaxed line-clamp-3">
                                            {post.description}
                                        </p>

                                        {/* Meta Info */}
                                        <div className="flex items-center justify-between text-xs text-zinc-500">
                                            <span>{formatDate(post.date)}</span>
                                            <span className="flex items-center gap-1">
                                                <span className="text-blue-400 font-semibold">
                                                    {getAdjustedReadTime(post.readTime, readingMode)}
                                                </span>
                                            </span>
                                        </div>

                                        {/* Arrow Icon */}
                                        <div className="mt-4 text-blue-400 transform group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
                                            <span className="text-sm font-medium">Read More</span>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* No Results */}
                        {filteredPosts.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-zinc-400 text-lg">No blog posts found in this category.</p>
                            </div>
                        )}
                    </div>

                    {/* Newsletter CTA */}
                    <div className="max-w-4xl mx-auto mt-24">
                        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-3xl p-12 backdrop-blur-sm text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Stay Updated
                            </h2>
                            <p className="text-zinc-300 mb-8">
                                Get the latest productivity tips and CoolDesk updates delivered to your inbox.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-6 py-3 bg-zinc-900 border border-zinc-700 rounded-full text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-500/30">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

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
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
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
                .animate-fade-in-up {
                    opacity: 0;
                    animation: fade-in-up 0.8s ease-out forwards;
                }
                .delay-1000 {
                    animation-delay: 1s;
                }
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </main>
    );
}
