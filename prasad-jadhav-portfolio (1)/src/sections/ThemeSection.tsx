import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { Palette, Sparkles, Shield, Zap } from 'lucide-react';

export const ThemeSection: React.FC = () => {
  const { theme } = usePortfolio();

  const getThemeDescription = () => {
    switch(theme) {
      case 'midnight': return 'A deep, focused environment designed for clarity and precision in network architecture.';
      case 'emerald': return 'A tech-forward aesthetic inspired by terminal interfaces and secure infrastructure.';
      case 'rose': return 'An elegant, high-contrast style that brings a modern creative edge to technical data.';
      case 'amber': return 'A warm, high-visibility theme optimized for monitoring and critical alerts.';
      default: return 'A professional design system built for the next generation of engineers.';
    }
  };

  return (
    <section id="theme" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Palette size={20} />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Design System</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter">
              Crafted for <br />
              <span className="text-white/40">Visual Precision.</span>
            </h2>
            
            <p className="text-xl text-white/60 leading-relaxed mb-12 font-serif italic">
              "{getThemeDescription()}"
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/80">
                  <Shield size={18} className="text-primary" />
                  <span className="text-sm font-bold uppercase tracking-widest">Secure</span>
                </div>
                <p className="text-xs text-white/30 leading-relaxed">
                  Every pixel is placed with security and stability in mind, reflecting my approach to networking.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/80">
                  <Zap size={18} className="text-primary" />
                  <span className="text-sm font-bold uppercase tracking-widest">Fast</span>
                </div>
                <p className="text-xs text-white/30 leading-relaxed">
                  Optimized for performance, ensuring a seamless experience across all devices and platforms.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Abstract Theme Visual */}
            <div className="aspect-square glass rounded-[3rem] overflow-hidden relative flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-50" />
              
              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-48 h-48 bg-primary/10 blur-[80px] rounded-full absolute top-1/4 left-1/4"
              />
              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="w-48 h-48 bg-secondary/10 blur-[80px] rounded-full absolute bottom-1/4 right-1/4"
              />

              <div className="relative z-10 text-center space-y-6">
                <div className="flex justify-center">
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.8 }}
                    className="w-24 h-24 glass rounded-3xl flex items-center justify-center text-primary shadow-2xl"
                  >
                    <Sparkles size={40} />
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold capitalize">{theme} Theme</h3>
                  <p className="text-white/40 text-sm font-mono mt-2 uppercase tracking-widest">Active Configuration</p>
                </div>
                
                <div className="flex justify-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary shadow-lg shadow-primary/20" />
                  <div className="w-8 h-8 rounded-full bg-secondary shadow-lg shadow-secondary/20" />
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10" />
                </div>
              </div>
            </div>
            
            {/* Decorative rings */}
            <div className="absolute -inset-8 border border-white/5 rounded-[4rem] -z-10" />
            <div className="absolute -inset-16 border border-white/[0.02] rounded-[5rem] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
