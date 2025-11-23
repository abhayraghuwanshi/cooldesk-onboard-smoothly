type Testimonial = {
    name: string;
    title: string;
    quote: string;
    initials: string;
};

const testimonials: Testimonial[] = [
    {
        name: "Sarah M.",
        title: "Product Manager",
        quote: "I used to have 50+ tabs open. Now with CoolDesk's auto-workspaces, everything is organized automatically. Saved me hours every week.",
        initials: "SM"
    },
    {
        name: "Alex K.",
        title: "Software Engineer",
        quote: "The voice navigation is incredible. I can switch tabs while coding without touching my mouse. Game changer for productivity.",
        initials: "AK"
    },
    {
        name: "Jessica T.",
        title: "Content Creator",
        quote: "Finally, a tool that actually understands my workflow. The search finds everything instantly - tabs, notes, bookmarks. No more hunting.",
        initials: "JT"
    },
    {
        name: "Mike R.",
        title: "Designer",
        quote: "Zero setup required. Installed it and it just worked. The automatic organization is like having a personal assistant for my browser.",
        initials: "MR"
    },
    {
        name: "Priya S.",
        title: "Marketing Lead",
        quote: "I was skeptical at first, but CoolDesk actually delivers. My browser feels clean and organized for the first time in years.",
        initials: "PS"
    },
    {
        name: "David L.",
        title: "Freelancer",
        quote: "The daily notes feature is brilliant. I can capture ideas without leaving my browser. Everything stays in context with the source.",
        initials: "DL"
    },
];

function Card({ t, className = "" }: { t: Testimonial; className?: string }) {
    return (
        <div
            className={`rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-6 w-[320px] max-w-full hover:border-blue-400/30 transition-all duration-300 ${className}`}
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {t.initials}
                </div>
                <div>
                    <div className="text-white font-semibold leading-tight">{t.name}</div>
                    <div className="text-xs text-gray-400 leading-tight">{t.title}</div>
                </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">"{t.quote}"</p>
        </div>
    );
}

export default function UsersTestimonials() {
    return (
        <div className="relative py-16">
            {/* Heading */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Loved by <span className="text-blue-400">Productive People</span>
                </h2>
                <p className="text-lg text-gray-400">
                    Real feedback from real users
                </p>
            </div>

            {/* Grid layout - cleaner and more scannable */}
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <Card key={i} t={t} />
                    ))}
                </div>
            </div>
        </div>
    );
}
