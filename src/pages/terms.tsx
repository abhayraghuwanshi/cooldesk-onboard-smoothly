import Navbar from '@/components/new/Navbar';

const TermsPage = () => {
  return (
    <main className="min-h-screen text-white bg-neutral-900">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
      <Navbar />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 text-neutral-400 font-sans">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tighter text-neutral-100">Terms of Service</h1>
          <p className="mt-3 text-neutral-500">Last Updated: October 6, 2025</p>
        </header>

        <div className="space-y-10 text-left">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p>Welcome to CoolDesk! These Terms of Service ("Terms") govern your use of the CoolDesk browser extension and any related services (collectively, the "Service"). By installing or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.</p>
            <p className="mt-4 p-4 bg-yellow-900/30 border border-yellow-700 rounded-lg text-yellow-300 text-sm"><strong>Disclaimer:</strong> This is a template and not legal advice. You should consult with a legal professional to ensure these terms meet your specific needs.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. License to Use</h2>
            <p>We grant you a limited, non-exclusive, non-transferable, revocable license to use the Service for your personal, non-commercial purposes, subject to these Terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
              <li>Reverse engineer, decompile, or otherwise attempt to discover the source code of the Service.</li>
              <li>Use the Service for any illegal or unauthorized purpose.</li>
              <li>Violate any laws in your jurisdiction.</li>
              <li>Transmit any worms, viruses, or any code of a destructive nature.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Intellectual Property</h2>
            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of CoolDesk and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Privacy</h2>
            <p>Your privacy is important to us. Our <a href="/privacy-details" className="underline hover:text-white">Privacy Policy</a> explains how we collect, use, and share your information. By using the Service, you agree to the collection and use of information in accordance with our Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Termination</h2>
            <p>We may terminate or suspend your access to the Service at any time, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Service will immediately cease.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
            <p>The Service is provided "as is" without warranties of any kind. In no event shall CoolDesk be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the Service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Us</h2>
            <p>If you have any questions about these Terms, please <a href="/contact" className="underline hover:text-white">contact us</a>.</p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TermsPage;
