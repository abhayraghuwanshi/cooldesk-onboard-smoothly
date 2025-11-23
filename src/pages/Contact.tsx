import Navbar from "@/components/new/Navbar";
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

    return (
        <main className="min-h-screen bg-gray-950 text-white flex flex-col">
            {/* Hero */}
            <Navbar />
            <section className="bg-gradient-to-r from-blue-900 to-purple-900 py-24 text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">Let's Connect</h1>
                <p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto">
                    We read every message. Choose your topic and reach out, we'll get back to you promptly.
                </p>
            </section>

            {/* Contact Form */}
            <section className="flex-1 flex items-center justify-center py-24 px-6">
                <div className="w-full max-w-3xl bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-10">
                    <div className="mb-8">
                        <label htmlFor="inquiry" className="block text-lg font-semibold mb-2">
                            Select Inquiry Type
                        </label>
                        <select
                            id="inquiry"
                            value={selected.value}
                            onChange={(e) =>
                                setSelected(inquiries.find((i) => i.value === e.target.value) || inquiries[0])
                            }
                            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                        >
                            {inquiries.map((i) => (
                                <option key={i.value} value={i.value}>
                                    {i.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-1">
                                Message
                            </label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={selected.placeholder}
                                rows={5}
                                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-3 rounded-lg font-semibold"
                        >
                            Send Message
                        </button>
                    </form>

                    <p className="mt-6 text-gray-400 text-center text-sm">
                        Prefer email? <a href="mailto:raghuwanshi.abhay405@gmail.com" className="underline hover:text-white">raghuwanshi.abhay405@gmail.com</a>
                    </p>
                </div>
            </section>
        </main>
    );
}
