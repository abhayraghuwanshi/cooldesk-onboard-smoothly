type Testimonial = {
    name: string;
    title: string;
    quote: string;
    date: string;
    avatar?: string;
};

const testimonials: Testimonial[] = [
    {
        name: "Martin Goutry",
        title: "Back-end developer at MyDodow",
        quote:
            "CoolDesk is finally addressing a long time problem we had when building UIs. Its ease of use and workflow seems really intuitive. Promising!",
        date: "2025.03.02",
        avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop",
    },
    {
        name: "Agnes Remi",
        title: "Back-end developer at MyDodow",
        quote:
            "It's ease of use and workflow seems really intuitive. Promising!",
        date: "2025.03.02",
        avatar:
            "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=256&auto=format&fit=crop",
    },
    {
        name: "Theo Champion",
        title: "Back-end developer at MyDodow",
        quote:
            "CoolDesk is finally addressing a long time problem we had when building UIs.",
        date: "2025.03.02",
        avatar:
            "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=256&auto=format&fit=crop",
    },
    {
        name: "Roman Atwoods",
        title: "Frontend Developer",
        quote:
            "The automatic workspaces are a game changer for focus.",
        date: "2025.03.02",
        avatar:
            "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=256&auto=format&fit=crop",
    },
];

function Card({ t, className = "" }: { t: Testimonial; className?: string }) {
    return (
        <div
            className={`rounded-2xl bg-gray-900/80 border border-white/10 shadow-xl shadow-black/20 backdrop-blur-sm p-5 w-[320px] max-w-full ${className}`}
        >
            <div className="flex items-center gap-3 mb-3">
                <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10"
                />
                <div>
                    <div className="text-white font-medium leading-tight">{t.name}</div>
                    <div className="text-xs text-gray-400 leading-tight">{t.title}</div>
                </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">“{t.quote}”</p>
            <div className="mt-4 text-xs text-gray-500">CoolDesk user, {t.date}</div>
        </div>
    );
}

export default function UsersTestimonials() {
    return (
        <div className="relative">
            {/* Heading */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold">What user saying about cooldesk</h2>
                <p className="mt-3 text-gray-300">
                    Discover early users' feedback on <span className="text-blue-400">cooldesk</span>
                </p>
            </div>

            {/* Stacked layout */}
            <div className="relative flex justify-center">
                {/* Background decorative bubbles */}
                <div className="absolute -z-10 top-8 left-1/3 w-72 h-72 bg-purple-600/10 blur-3xl rounded-full" />
                <div className="absolute -z-10 bottom-0 right-1/4 w-80 h-80 bg-blue-600/10 blur-3xl rounded-full" />

                <div className="hidden md:block relative h-[360px] w-[880px]">
                    <Card t={testimonials[2]} className="absolute left-0 bottom-8 rotate-[-2deg]" />
                    <Card t={testimonials[0]} className="absolute left-1/2 -translate-x-1/2 top-0 rotate-[1deg]" />
                    <Card t={testimonials[1]} className="absolute right-6 top-20 rotate-[2deg]" />
                    <Card t={testimonials[3]} className="absolute left-1/3 bottom-0 rotate-[-1deg]" />
                </div>

                {/* Mobile grid */}
                <div className="md:hidden grid grid-cols-1 gap-4">
                    {testimonials.slice(0, 3).map((t, i) => (
                        <Card key={i} t={t} />
                    ))}
                </div>
            </div>
        </div>
    );
}
