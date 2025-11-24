import Navbar from "@/components/new/Navbar";
import "@/styles/globals.css";
import { useForm, ValidationError } from '@formspree/react';
import { useState } from "react";

const inquiries = [
    { value: "bug", label: "🐞 Report a Bug", placeholder: "Describe the bug you encountered..." },
    { value: "feedback", label: "💬 Share Feedback", placeholder: "Your ideas or thoughts..." },
    { value: "feature", label: "✨ Request a Feature", placeholder: "Describe the feature you want..." },
];

export default function Contact() {
    const [selected, setSelected] = useState(inquiries[0]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [state, handleSubmit] = useForm("xzzqddvo");

    if (state.succeeded) {
        return (
            <main className="min-h-screen bg-gray-950 text-white flex flex-col">
                <Navbar />
                <section className="flex-1 flex items-center justify-center py-24 px-6">
                    <div className="text-center">
                        <div className="text-6xl mb-6">✅</div>
                        <h2 className="text-3xl font-bold mb-4">Message Sent Successfully!</h2>
                        <p className="text-gray-300 text-lg mb-8">
                            Thank you for reaching out. We'll get back to you as soon as possible.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 hover:bg-blue-700 transition-colors py-3 px-8 rounded-lg font-semibold"
                        >
                            Send Another Message
                        </button>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-950 text-white flex flex-col">
            {/* Hero */}
            <Navbar />
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/50 to-purple-950/50"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,blue-900/30,transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,purple-900/20,transparent_50%)]"></div>

                {/* Animated grid pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,white_10%,transparent_70%)]"></div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

                {/* Content */}
                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <div className="mb-8">
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8 backdrop-blur-sm">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                            We're here to help
                        </span>
                    </div>

                    <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight">
                        <span className="block mb-2 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                            Let's
                        </span>
                        <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                            Connect
                        </span>
                    </h1>

                    <p className="text-gray-300 text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto leading-relaxed mb-12 text-balance">
                        Every message matters. Choose your topic and reach out — we'll get back to you faster than you expect.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-300">Usually responds within 24h</span>
                        </div>
                        <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <span className="text-gray-300">Direct email available</span>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </section>

            {/* Contact Form */}
            <section className="flex-1 flex items-center justify-center py-32 px-6">
                <div className="w-full max-w-4xl">
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-12">
                        <div className="mb-10">
                            <label htmlFor="inquiry" className="block text-lg font-medium mb-3 text-gray-200">
                                What would you like to discuss?
                            </label>
                            <select
                                id="inquiry"
                                value={selected.value}
                                onChange={(e) =>
                                    setSelected(inquiries.find((i) => i.value === e.target.value) || inquiries[0])
                                }
                                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-white placeholder-gray-400"
                            >
                                {inquiries.map((i) => (
                                    <option key={i.value} value={i.value} className="bg-gray-800">
                                        {i.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <input type="hidden" name="inquiry_type" value={selected.label} />
                            <input type="hidden" name="inquiry_value" value={selected.value} />

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-200">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your name"
                                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-white placeholder-gray-400"
                                        required
                                    />
                                    <ValidationError
                                        prefix="Name"
                                        field="name"
                                        errors={state.errors}
                                        className="text-red-400 text-sm mt-2"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-200">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-white placeholder-gray-400"
                                        required
                                    />
                                    <ValidationError
                                        prefix="Email"
                                        field="email"
                                        errors={state.errors}
                                        className="text-red-400 text-sm mt-2"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-200">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder={selected.placeholder}
                                    rows={6}
                                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-white placeholder-gray-400 resize-none"
                                    required
                                />
                                <ValidationError
                                    prefix="Message"
                                    field="message"
                                    errors={state.errors}
                                    className="text-red-400 text-sm mt-2"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                                <p className="text-gray-400 text-sm text-center sm:text-left">
                                    Prefer email? <a href="mailto:raghuwanshi.abhay405@gmail.com" className="text-blue-400 hover:text-blue-300 underline transition-colors">raghuwanshi.abhay405@gmail.com</a>
                                </p>
                                <button
                                    type="submit"
                                    disabled={state.submitting}
                                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    {state.submitting ? "Sending..." : "Send Message"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
