import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { ExperienceLog } from './sections/ExperienceLog';
import { Skills } from './sections/Skills';
import { Resume } from './sections/Resume';
import { ThemeSection } from './sections/ThemeSection';
import { Projects } from './sections/Projects';
import { Internship } from './sections/Internship';
import { Certifications } from './sections/Certifications';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';
import { Background } from './components/Background';
import { Loader } from './components/Loader';
import { PortfolioProvider } from './context/PortfolioContext';
import { RobotBot } from './components/RobotBot';
import { soundService } from './services/soundService';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { notifyVisitorArrival } from './services/visitorNotificationService';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<string | null>(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#/project/')) {
      return window.location.hash.replace('#/project/', '');
    }
    return null;
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Automatically send an email alert to owner when website is opened
    notifyVisitorArrival();

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
      soundService.startup();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash.startsWith('#/project/')) {
        const id = window.location.hash.replace('#/project/', '');
        setActiveProject(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setActiveProject(null);
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectProject = (projectId: string) => {
    setActiveProject(projectId);
    window.location.hash = `#/project/${projectId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPortfolio = () => {
    setActiveProject(null);
    window.location.hash = '#projects';
    setTimeout(() => {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <PortfolioProvider>
      <div className="relative min-h-screen bg-gradient-main">
        <AnimatePresence>
          {loading && <Loader />}
        </AnimatePresence>

        {!loading && (
          <>
            <div className="noise-overlay" />
            <Background />

            {/* If a project is selected, render full dedicated Project Page */}
            {activeProject ? (
              <ProjectDetailPage
                projectId={activeProject}
                onBack={handleBackToPortfolio}
              />
            ) : (
              <>
                <Navbar />
                <main className="relative z-10">
                  <Hero />
                  <ExperienceLog />
                  <Skills />
                  <ThemeSection />
                  <Resume />
                  <Projects onSelectProject={handleSelectProject} />
                  <Internship />
                  <Certifications />
                  <Contact />
                </main>
              </>
            )}

            <Footer />
            <RobotBot />
          </>
        )}
      </div>
    </PortfolioProvider>
  );
}
