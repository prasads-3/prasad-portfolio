import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Activity, Cpu, ShieldCheck } from 'lucide-react';

const LOG_ENTRIES = [
  {
    timestamp: '2025.06.11',
    event: 'CENTRAL_RAILWAY_S&T_INIT',
    description: 'Initiated Signal & Telecommunication Training at Central Railway Division. Gained practical experience in Optical Fiber Cable (OFC) architectures, VoIP configurations, and railway data infrastructure.',
    status: 'COMPLETED',
    icon: <Cpu size={14} />
  },
  {
    timestamp: '2025.06.25',
    event: 'TELECOM_MAINTENANCE_DEPLOYED',
    description: 'Studied core network topologies and routing principles in the railway network. Assisted the Kurla Division team with day-to-day data communication diagnostics.',
    status: 'VERIFIED',
    icon: <Activity size={14} />
  },
  {
    timestamp: '2025.08.01',
    event: 'BG_SHIRKE_IT_INFRA_INIT',
    description: 'Started Network Engineering Internship in B.G. Shirke IT Department. Focused on enterprise network design, switch configuration, and server administration.',
    status: 'SUCCESS',
    icon: <ShieldCheck size={14} />
  },
  {
    timestamp: '2025.12.31',
    event: 'MONITORING_&_SECURITY_STABLE',
    description: 'Developed and customized real-time Zabbix alert monitoring dashboards. Architected virtual multi-vendor lab environments in EVE-NG to simulate Palo Alto NGFW security boundaries.',
    status: 'OPTIMIZED',
    icon: <Terminal size={14} />
  }
];

export const ExperienceLog: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-primary">System Lifecycle Log</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Operating <span className="text-white/40">Environments.</span>
          </h2>
        </motion.div>

        <div className="terminal-box shadow-2xl">
          <div className="terminal-header flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-4">system_experience_log.sh</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-mono text-emerald-500 animate-pulse">● FEED_ONLINE</span>
              <span className="text-[9px] font-mono text-white/20">v2.4.0-production</span>
            </div>
          </div>
          
          <div className="p-8 space-y-8 font-mono">
            {LOG_ENTRIES.map((entry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-8 border-l border-white/10 group"
              >
                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-primary transition-colors" />
                
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                  <span className="text-[10px] text-white/30">[{entry.timestamp}]</span>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">{entry.icon}</span>
                    <span className="text-xs font-bold text-white/95 uppercase tracking-wider">{entry.event}</span>
                  </div>
                  <span className={cn(
                    "text-[9px] font-bold px-2 py-0.5 rounded border font-mono",
                    entry.status === 'SUCCESS' ? "border-emerald-500/50 text-emerald-500 bg-emerald-500/5" : 
                    entry.status === 'OPTIMIZED' ? "border-primary/50 text-primary bg-primary/5" : "border-white/10 text-white/40"
                  )}>
                    {entry.status}
                  </span>
                </div>
                
                <p className="text-xs text-white/50 leading-relaxed max-w-2xl text-justify">
                  {entry.description}
                </p>
                
                {idx !== LOG_ENTRIES.length - 1 && (
                  <div className="mt-8 h-px w-full bg-gradient-to-r from-white/5 to-transparent" />
                )}
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="pt-4 flex items-center gap-2 text-[10px] text-primary/60 animate-pulse"
            >
              <span>_</span>
              <span>LISTENING_FOR_MIGRATION_INTERRUPT...</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper for conditional classes if not imported
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');
