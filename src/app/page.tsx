import HeroSection from '@/components/home/HeroSection';
import FeaturedWorks from '@/components/home/FeaturedWorks';
import FeaturedPlugins from '@/components/home/FeaturedPlugins';
import RecentArticles from '@/components/home/RecentArticles';
import AboutPreview from '@/components/home/AboutPreview';
import ContactCTA from '@/components/home/ContactCTA';

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="gradient-divider" />
      <FeaturedWorks />
      <div className="gradient-divider" />
      <FeaturedPlugins />
      <div className="gradient-divider" />
      <RecentArticles />
      <div className="gradient-divider" />
      <AboutPreview />
      <ContactCTA />
    </>
  );
}
