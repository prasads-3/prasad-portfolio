import React from 'react';
import { motion } from 'motion/react';
import { Github, ArrowUpRight, ArrowRight, ExternalLink, ShieldCheck, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { soundService } from '../services/soundService';

interface ProjectsProps {
  onSelectProject?: (projectId: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const { projects } = usePortfolio();

  const handleProjectClick = (projectId: string, e: React.MouseEvent) => {
    soundService.click();
    if (onSelectProject) {
      e.preventDefault();
      onSelectProject(projectId);
    }
  };

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Layers size={20} />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Featured Engineering</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">Selected Projects</h2>
          <p className="text-white/40 max-w-2xl text-lg">
            Production-grade DevSecOps architectures, automated GitOps deployments with ArgoCD, Kubernetes orchestration, and multi-tier monitoring stacks.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id || project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => soundService.hover()}
              className="group flex flex-col"
            >
              {/* Project Card Image with Click to Full Page */}
              <div 
                onClick={(e) => handleProjectClick(project.id, e)}
                className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 bg-white/5 border border-white/10 shadow-2xl group-hover:border-primary/40 transition-all duration-500 cursor-pointer"
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top opacity-100 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Project Overlay Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                  <p className="text-xs text-white/70 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={(e) => handleProjectClick(project.id, e)}
                      className="px-5 py-2.5 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-2 shadow-lg shadow-primary/25"
                    >
                      <span>Open Full Page</span>
                      <ArrowRight size={14} />
                    </button>
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundService.click();
                      }}
                      className="px-5 py-2.5 glass rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-1.5"
                    >
                      <Github size={14} />
                      <span>Source</span>
                    </a>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="absolute top-6 left-6 px-3.5 py-1.5 glass rounded-full flex items-center gap-2 backdrop-blur-md">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/80 font-bold">
                    {idx === 0 ? "Production DevSecOps" : idx === 1 ? "AWS EKS Cloud Native" : idx === 2 ? "11 Microservices Mesh" : "2-Tier Container Architecture"}
                  </span>
                </div>

                {/* Right Top Badge */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-3 py-1.5 rounded-full bg-black/60 border border-white/20 text-[10px] font-mono text-white/90 flex items-center gap-1">
                    <span>Explore</span>
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>

              {/* Title & Details */}
              <div className="px-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] font-mono text-primary font-bold">PROJECT // 0{idx + 1}</span>
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-[10px] font-mono text-white/30 uppercase">Click to open full case study</span>
                  </div>

                  <h3 
                    onClick={(e) => handleProjectClick(project.id, e)}
                    className="text-2xl sm:text-3xl font-bold mb-3 group-hover:text-primary transition-colors tracking-tight cursor-pointer leading-tight"
                  >
                    {project.title}
                  </h3>

                  <p className="text-white/40 text-xs sm:text-sm leading-relaxed mb-6">
                    {project.subtitle}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 6).map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-mono uppercase tracking-wider text-white/60 border border-white/5">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 6 && (
                      <span className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-mono text-white/40">
                        +{project.tech.length - 6} more
                      </span>
                    )}
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <button
                      onClick={(e) => handleProjectClick(project.id, e)}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-white transition-colors group/link"
                    >
                      <span>Open Full Page Case Study</span>
                      <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </button>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundService.click()}
                      className="text-white/40 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                      title="Open GitHub Repository in new tab"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
