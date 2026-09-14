import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Award, CheckCircle2, ShieldCheck, ExternalLink, Maximize2, X, Eye } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Certifications: React.FC = () => {
  const { certifications } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);
  const [imgSrc, setImgSrc] = useState<string>(certifications[0]?.image || '');

  const activeCert = certifications[0];
  const driveUrl = activeCert?.link || "https://drive.google.com/file/d/1VVYlJF8yffONdPKdXlOYoW382OzMbzJK/view?usp=sharing";

  return (
    <section id="certifications" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Award size={20} />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Credentials & Training</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">Certifications</h2>
          <p className="text-white/40 text-lg">Official training certificate validating networking, routing, switching & systems expertise.</p>
        </motion.div>

        {certifications.length === 1 ? (
          /* Featured Credential Card for Cisco CCNA */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative bg-neutral-900/80 border border-white/10 hover:border-primary/40 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-md transition-all"
          >
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Certificate Image Frame */}
              <div className="lg:col-span-6 relative">
                <div 
                  onClick={() => setSelectedCert(activeCert)}
                  className="relative cursor-pointer aspect-[1.4/1] rounded-2xl overflow-hidden bg-neutral-950/90 border border-white/15 p-2 shadow-2xl group/img transition-all hover:scale-[1.01]"
                >
                  <img
                    src={imgSrc || activeCert.image}
                    alt={activeCert.name}
                    onError={() => {
                      // Fallback to high-res thumbnail endpoint if usercontent fails
                      if (imgSrc !== "https://drive.google.com/thumbnail?id=1VVYlJF8yffONdPKdXlOYoW382OzMbzJK&sz=w1600") {
                        setImgSrc("https://drive.google.com/thumbnail?id=1VVYlJF8yffONdPKdXlOYoW382OzMbzJK&sz=w1600");
                      }
                    }}
                    className="w-full h-full object-contain rounded-xl bg-white/5 transition-all duration-500 group-hover/img:brightness-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Hover Overlay with Zoom Prompt */}
                  <div className="absolute inset-2 rounded-xl bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                    <div className="px-4 py-2 rounded-full bg-white text-black font-bold text-xs flex items-center gap-2 shadow-xl">
                      <Maximize2 size={14} />
                      <span>Click to View Full Certificate</span>
                    </div>
                  </div>

                  {/* Badge top-left */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-[11px] font-bold text-emerald-400 uppercase tracking-wider backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Verified Certificate
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between px-1">
                  <span className="text-[11px] font-mono text-white/40 flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-emerald-400" />
                    Authentic Course Certificate
                  </span>
                  <button
                    onClick={() => setSelectedCert(activeCert)}
                    className="text-[11px] font-bold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                  >
                    <Eye size={13} />
                    Inspect Details
                  </button>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-primary font-mono text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5">
                      <ShieldCheck size={16} />
                      Cisco Certified Network Associate
                    </span>
                    <a
                      href={driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-all"
                      title="Open Certificate in Google Drive"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors">
                    {activeCert.name}
                  </h3>

                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    Hands-on networking and systems training covering IP routing, switching protocols, VLAN architectures, network security, and infrastructure automation baselines.
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {[
                      "Routing protocols (OSPF), VLANs, Trunking, and NAT implementation",
                      "IP Connectivity, Subnetting (IPv4/IPv6), and network troubleshooting",
                      "Security fundamentals, Access Control Lists (ACLs), and device hardening",
                      "Network automation, programmability concepts, and Linux integration"
                    ].map((bullet, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs text-white/70">
                        <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="font-mono text-xs text-white/40">
                    Training Center: <span className="text-white/80 font-semibold">{activeCert.platform}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedCert(activeCert)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      <Maximize2 size={14} />
                      Preview
                    </button>
                    <a
                      href={driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-primary/25"
                    >
                      <span>Google Drive</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Multi-card Grid (Fallback) */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div 
                  onClick={() => setSelectedCert(cert)}
                  className="block relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-white/5 border border-white/10 cursor-pointer shadow-xl shadow-black/50"
                >
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-6 right-6 w-12 h-12 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 group-hover:bg-white group-hover:text-black">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{cert.name}</h3>
                <p className="text-white/30 text-xs font-bold uppercase tracking-widest">{cert.platform}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Full-Screen Zoom Modal for Certificate */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[92vh] flex flex-col bg-neutral-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-950/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{selectedCert.name}</h4>
                    <p className="text-[11px] font-mono text-white/50">{selectedCert.platform}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={selectedCert.link || driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all shadow-md"
                  >
                    <span>Open in Drive</span>
                    <ExternalLink size={13} />
                  </a>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Modal Image Body */}
              <div className="flex-1 overflow-auto p-4 md:p-6 flex items-center justify-center bg-black/40 min-h-[350px]">
                <img
                  src={imgSrc || selectedCert.image}
                  alt={selectedCert.name}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 border-t border-white/10 bg-neutral-950/80 flex flex-wrap items-center justify-between gap-3 text-xs text-white/50 font-mono">
                <span>Issuer: RST Forum (Dadar, Mumbai)</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 size={14} />
                  Course Completed & Verified
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
