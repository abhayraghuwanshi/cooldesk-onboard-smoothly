import LinkSection from "@/components/new/LinkSection";
import Navbar from "@/components/new/Navbar";

export default function Search() {
    return (
        <main className="min-h-screen bg-gray-950 text-white">
            <Navbar />
            <div className="pt-24 pb-12">
                <LinkSection />
            </div>
        </main>
    );
}
