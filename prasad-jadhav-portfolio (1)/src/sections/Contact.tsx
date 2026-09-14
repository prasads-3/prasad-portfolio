import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight, Github, Linkedin, Phone, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { sendContactMessage } from '../services/visitorNotificationService';

export const Contact: React.FC = () => {
  const { personalDetails } = usePortfolio();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMsg('Please fill out all fields.');
      return;
    }

    setStatus('sending');
    const result = await sendContactMessage(formData.name, formData.email, formData.message);
    if (result.success) {
      setStatus('success');
      setStatusMsg('Message sent directly to Prasad\'s inbox (pj344504@gmail.com)!');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
      setStatusMsg(result.message);
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter">Let's connect.</h2>
            <p className="text-white/40 text-lg mb-10 leading-relaxed">
              Open to Junior DevOps, Cloud, and CI/CD engineering roles. Let's discuss how I can contribute to your infrastructure and deployment automation.
            </p>

            <div className="space-y-6">
              <a href={`mailto:${personalDetails.email}`} className="flex items-center gap-6 group">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-white/20 text-[11px] font-bold uppercase tracking-widest">Email</p>
                  <p className="text-base font-medium group-hover:text-primary transition-colors">{personalDetails.email}</p>
                </div>
              </a>

              <a href={`tel:${personalDetails.phone}`} className="flex items-center gap-6 group">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-white/20 text-[11px] font-bold uppercase tracking-widest">Phone</p>
                  <p className="text-base font-medium group-hover:text-primary transition-colors">+91 {personalDetails.phone}</p>
                </div>
              </a>

              <a 
                href={personalDetails.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-6 group"
              >
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-white/40 group-hover:bg-[#0A66C2] group-hover:text-white transition-all shrink-0">
                  <Linkedin size={20} />
                </div>
                <div>
                  <p className="text-white/20 text-[11px] font-bold uppercase tracking-widest">LinkedIn Profile</p>
                  <p className="text-base font-medium group-hover:text-primary transition-colors">prasad-jadhav-19a35b413</p>
                </div>
              </a>

              <a 
                href={personalDetails.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-6 group"
              >
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all shrink-0">
                  <Github size={20} />
                </div>
                <div>
                  <p className="text-white/20 text-[11px] font-bold uppercase tracking-widest">GitHub Repository</p>
                  <p className="text-base font-medium group-hover:text-primary transition-colors">github.com/prasads-3</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={status === 'sending'}
                  required
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-white transition-colors text-lg disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={status === 'sending'}
                  required
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-white transition-colors text-lg disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={status === 'sending'}
                  required
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-white transition-colors text-lg resize-none disabled:opacity-50"
                />
              </div>

              {status === 'success' && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2.5">
                  <CheckCircle2 size={18} className="shrink-0" />
                  <span>{statusMsg}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center gap-2.5">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{statusMsg}</span>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ x: status === 'sending' ? 0 : 6 }}
                className="flex items-center gap-4 text-lg md:text-xl font-bold group disabled:opacity-60 cursor-pointer"
              >
                <span>{status === 'sending' ? 'Delivering Message...' : 'Send Message'}</span>
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  {status === 'sending' ? <Loader2 size={20} className="animate-spin" /> : <ArrowRight size={20} />}
                </div>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
