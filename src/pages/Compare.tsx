import Footer from "@/components/new/Footer";
import Navbar from "@/components/new/Navbar";
import SEO from "@/components/SEO";
import { comparisonGroups } from "@/config/comparisonGroups";
import { Link } from "react-router-dom";
import { comparisons } from "./Versus";

const canonical = "https://cool-desk.com/vs";

const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "CoolDesk comparisons",
    itemListElement: comparisonGroups
        .flatMap((g) => g.slugs)
        .map((slug, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: comparisons[slug].title,
            url: `${canonical}/${slug}`,
        })),
};

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://cool-desk.com/" },
        { "@type": "ListItem", position: 2, name: "Compare", item: canonical },
    ],
};

export default function ComparePage() {
    return (
        <main className="min-h-screen text-white scroll-smooth">
            <SEO
                title="CoolDesk Alternatives & Comparisons — Raycast, Arc, Workona and more"
                description="Honest, side-by-side comparisons of CoolDesk with Raycast, Alfred, Flow Launcher, PowerToys Run, Arc, Workona, Toby, OneTab, Session Buddy, Chrome tab groups and Momentum."
                canonical={canonical}
                jsonLd={[itemListJsonLd, breadcrumbJsonLd]}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
            <Navbar />

            <div className="relative z-10 container mx-auto px-6 pt-32 pb-24 max-w-4xl">
                <p className="font-mono text-[11px] tracking-[0.25em] text-white/35 uppercase mb-6">Compare</p>
                <h1 className="text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
                    How CoolDesk compares
                </h1>
                <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl">
                    CoolDesk is a free launcher and project workspace for Windows, macOS and Linux. It sits between
                    launchers and tab managers: one Alt+K search across your tabs, apps, files and notes, grouped by
                    project. Here's how it stacks up — including where the other tool is the better pick.
                </p>

                {comparisonGroups.map((group) => (
                    <section key={group.title} className="mt-16">
                        <h2 className="text-2xl md:text-3xl font-bold">{group.title}</h2>
                        <p className="mt-2 text-sm text-gray-500">{group.blurb}</p>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {group.slugs.map((slug) => {
                                const c = comparisons[slug];
                                return (
                                    <Link
                                        key={slug}
                                        to={`/vs/${slug}`}
                                        className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-blue-400/30 hover:bg-white/[0.05]"
                                    >
                                        <h3 className="text-base font-bold">
                                            CoolDesk vs {c.name}
                                            <span aria-hidden="true" className="ml-2 text-white/30 transition-colors group-hover:text-blue-300">→</span>
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-400 leading-relaxed">{c.description}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </div>

            <Footer />
        </main>
    );
}
