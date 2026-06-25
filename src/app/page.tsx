import HeroSection from '@/components/home/HeroSection';
import LatestNews from '@/components/home/LatestNews';
import HotTopics from '@/components/home/HotTopics';
import RecentArticles from '@/components/home/RecentArticles';
import AboutPreview from '@/components/home/AboutPreview';
import ContactCTA from '@/components/home/ContactCTA';

export default function Home() {
  return (
    <>
      <HeroSection />
      <LatestNews />
      <div className="gradient-divider" />
      <HotTopics />
      <div className="gradient-divider" />
      <RecentArticles />
      <AboutPreview />
      <ContactCTA />
    </>
  );
}
