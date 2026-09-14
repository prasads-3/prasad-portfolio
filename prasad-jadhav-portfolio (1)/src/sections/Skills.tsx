import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { SKILLS_CATEGORIES } from '../constants/data';
import { GitBranch, Cloud, ShieldCheck, Activity, Terminal, Cpu } from 'lucide-react';
import { soundService } from '../services/soundService';

export const Skills: React.FC = () => {
  const { skills } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>("CI/CD & Automation");

  const categoryIcons: Record<string, React.ReactNode> = {
    "CI/CD & Automation": <GitBranch size={18} />,
    "Cloud & Infrastructure": <Cloud size={18} />,
    "Security & DevSecOps": <ShieldCheck size={18} />,
    "Monitoring & Observability": <Activity size={18} />,
    "Programming & OS": <Terminal size={18} />
  };

  const handleCategoryTab = (cat: string) => {
    soundService.pop();
    setActiveCategory(cat);
  };

  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Cpu size={20} />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Capabilities Matrix</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">
            Technical <span className="text-white/40">Expertise.</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            A granular mapping of DevOps practices, Kubernetes orchestration, CI/CD pipelines, cloud infrastructure, and DevSecOps security scanning.
          </p>
        </motion.div>

        <div className="bento-grid gap-6">
          {/* Main Competencies Bar Cards - Left Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bento-item col-span-4 lg:col-span-2 row-span-2 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-primary rounded-full animate-pulse" />
                DevOps & Cloud Metrics
              </h3>
              <div className="space-y-6">
                {skills.slice(0, 5).map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold tracking-wider uppercase text-white/50 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono text-primary font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats footer row inside bento */}
            <div className="pt-8 border-t border-white/5 grid grid-cols-2 gap-4 mt-8">
              <div>
                <p className="text-2xl font-mono font-bold text-primary">13 Pods</p>
                <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold mt-1">K8s Boutique Live</p>
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-emerald-500">In-Sync</p>
                <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold mt-1">ArgoCD & GitOps</p>
              </div>
            </div>
          </motion.div>

          {/* Categorized Skills Navigation Tab & Grid Detail - Right Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bento-item col-span-4 lg:col-span-2"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <div className="w-1.5 h-6 bg-secondary rounded-full" />
              DevOps Competency Domains
            </h3>

            {/* Category tabs list */}
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.keys(SKILLS_CATEGORIES).map((catName) => (
                <button
                  key={catName}
                  onClick={() => handleCategoryTab(catName)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                    activeCategory === catName
                      ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(0,122,255,0.1)]'
                      : 'bg-white/5 border-white/5 text-white/45 hover:text-white hover:border-white/10'
                  }`}
                >
                  {categoryIcons[catName]}
                  {catName}
                </button>
              ))}
            </div>

            {/* Category Skills Grid List */}
            <div className="min-h-[140px] bg-white/[0.02] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-wrap gap-2.5"
                >
                  {(SKILLS_CATEGORIES as any)[activeCategory]?.map((s: string) => (
                    <span
                      key={s}
                      className="px-4 py-2 bg-neutral-900 border border-white/5 text-[11px] font-sans font-bold uppercase tracking-wider text-white/70 hover:text-primary hover:border-primary/20 transition-all rounded-xl shadow-sm"
                    >
                      {s}
                    </span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Infrastructure uptime & lab capabilities bento rows */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bento-item col-span-4 sm:col-span-2 lg:col-span-1"
          >
            <h4 className="text-3xl font-black font-mono text-primary mb-1">K8s & Helm</h4>
            <p className="text-white/35 text-[9px] font-bold uppercase tracking-widest leading-relaxed">Microservice Orchestration</p>
            <div className="mt-4 flex gap-1">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`h-4 w-1 rounded-full ${i < 7 ? 'bg-primary' : 'bg-primary/20'}`} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bento-item col-span-4 sm:col-span-2 lg:col-span-1"
          >
            <h4 className="text-3xl font-black font-mono text-emerald-500 mb-1">ArgoCD & Trivy</h4>
            <p className="text-white/35 text-[9px] font-bold uppercase tracking-widest leading-relaxed">GitOps & DevSecOps Scanning</p>
            <div className="mt-4 flex gap-1">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 w-1 bg-emerald-500/50 rounded-full" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
