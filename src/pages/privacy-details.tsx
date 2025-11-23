import Navbar from '@/components/new/Navbar';
import PrivacyPolicyStatic from '@/components/PrivacyPolicyStatic';

const PrivacyDetailsPage = () => {
  return (
    <main className="min-h-screen text-white bg-neutral-900">
      {/* Background Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
      <Navbar />
      <div className="relative z-10">
        <PrivacyPolicyStatic />
      </div>
    </main>
  );
};

export default PrivacyDetailsPage;
