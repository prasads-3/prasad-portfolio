import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, Calendar, MapPin } from 'lucide-react';

export const Internship: React.FC = () => {
  const { internships } = usePortfolio();

  return (
    <section id="internship" className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Award size={20} />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Professional Experience</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">
            Internship <span className="text-white/40">Chronicles.</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl">
            My field experience at Central Railway CSMT and B.G. Shirke, working hands-on with telecom infrastructure, Linux monitoring CLI, and systems administration.
          </p>
        </motion.div>

        <div className="space-y-12">
          {internships.map((item, idx) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group relative grid md:grid-cols-[220px_1fr] gap-8 pb-12 border-b border-white/5 last:border-0"
            >
              <div className="text-white/40 font-mono text-sm pt-1 flex flex-col gap-2">
                <span className="text-white/80 font-semibold flex items-center gap-2">
                  <Calendar size={14} className="text-primary" />
                  {item.duration}
                </span>
                <span className="text-xs text-white/30 uppercase tracking-widest flex items-center gap-1.5">
                  <MapPin size={12} />
                  {item.location}
                </span>
              </div>
              
              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors tracking-tight">
                    {item.role}
                  </h3>
                  <p className="text-white/70 font-medium text-sm mt-1">{item.company}</p>
                </div>

                <ul className="space-y-4">
                  {item.learnings.map((learning, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 + i * 0.1 }}
                      className="text-white/50 text-sm leading-relaxed max-w-2xl flex gap-3 align-top"
                    >
                      <span className="text-primary mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>{learning}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
