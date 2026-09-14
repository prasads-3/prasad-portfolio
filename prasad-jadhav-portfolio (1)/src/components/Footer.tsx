import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { personalDetails } = usePortfolio();

  return (
    <footer className="py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start gap-4">
          <a href="#home" className="text-2xl font-bold tracking-tighter">PJ<span className="text-primary">.</span></a>
          <p className="text-white/20 text-sm max-w-xs text-center md:text-left">
            Designing and building the next generation of network infrastructure.
          </p>
        </div>
        
        <div className="flex gap-12">
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/20">Navigation</p>
            <a href="#home" className="text-sm text-white/40 hover:text-white transition-colors">Home</a>
            <a href="#skills" className="text-sm text-white/40 hover:text-white transition-colors">Skills</a>
            <a href="#resume" className="text-sm text-white/40 hover:text-white transition-colors">Resume</a>
            <a href="#projects" className="text-sm text-white/40 hover:text-white transition-colors">Projects</a>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/20">Social</p>
            <div className="flex gap-4">
              <motion.a
                href={personalDetails.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 8, color: '#ffffff' }}
                whileTap={{ scale: 0.9 }}
                className="text-white/40 transition-colors"
                title="GitHub"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href={personalDetails.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -8, color: '#ffffff' }}
                whileTap={{ scale: 0.9 }}
                className="text-white/40 transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/10 text-[11px] font-medium uppercase tracking-widest">
          © {new Date().getFullYear()} {personalDetails.name}
        </p>
        <p className="text-white/10 text-[11px] font-medium uppercase tracking-widest">
          Built with Precision
        </p>
      </div>
    </footer>
  );
};
