import Navbar from '@/components/new/Navbar';
import SEO from '@/components/SEO';
import { CHROME_STORE } from '@/config/site';
import { useSearchParams } from 'react-router-dom';

/**
 * Where Chrome sends people when they remove the extension
 * (`chrome.runtime.setUninstallURL` in the extension's background script).
 * It arrives with `?v=<extension version>`.
 *
 * No form and no tracking beyond the site's existing page-view analytics —
 * this is the one moment we get to say something, not to ask for something.
 * noindex: it should never surface in search for people who haven't uninstalled.
 */
const UninstallPage = () => {
    const [params] = useSearchParams();
    const version = params.get('v');

    return (
        <main className="min-h-screen text-white">
            <SEO
                title="Uninstalled — CoolDesk"
                description="CoolDesk has been removed from your browser."
                noindex={true}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
            <Navbar />

            <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center px-6 py-28 text-center">
                <h1 className="text-4xl font-bold tracking-tighter text-neutral-100">
                    Thanks for trying CoolDesk.
                </h1>
                <p className="mt-5 text-lg text-neutral-400">
                    It's been removed from your browser. If something didn't work for you,
                    we'd genuinely like to hear it — it's the fastest way for us to fix it.
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <a
                        href={CHROME_STORE}
                        className="rounded-lg bg-white px-5 py-2.5 font-medium text-neutral-900 transition hover:bg-neutral-200"
                    >
                        Reinstall
                    </a>
                    <a
                        href="/contact"
                        className="rounded-lg border border-white/15 px-5 py-2.5 font-medium text-neutral-200 transition hover:border-white/30 hover:bg-white/5"
                    >
                        Get in touch
                    </a>
                </div>

                {version && (
                    <p className="mt-12 text-xs text-neutral-600">You had version {version}.</p>
                )}
            </div>
        </main>
    );
};

export default UninstallPage;
