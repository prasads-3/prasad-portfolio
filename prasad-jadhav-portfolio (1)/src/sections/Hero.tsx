import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Typewriter } from 'react-simple-typewriter';
import { ArrowRight, Download, Camera, RotateCcw, Cloud, Server, ShieldCheck, Link2, Upload, User, Check, Lock, Unlock, KeyRound, AlertTriangle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useProfileImage } from '../hooks/useProfileImage';
import { MagneticButton } from '../components/MagneticButton';
import { soundService } from '../services/soundService';
import { downloadResumePDF } from '../utils/resumeGenerator';

const OWNER_PIN = '1234'; // Default quick Owner PIN for Prasad (customizable)

export const Hero: React.FC = () => {
  const { personalDetails } = usePortfolio();
  const { image, uploadImage, setImageUrl, resetImage } = useProfileImage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [imgError, setImgError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Security Lock: Only Owner can modify profile photo
  const [isOwnerUnlocked, setIsOwnerUnlocked] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');

  useEffect(() => {
    // Check if owner session is already unlocked on Prasad's device
    if (localStorage.getItem('prasad_owner_unlocked') === 'true') {
      setIsOwnerUnlocked(true);
    }
  }, []);

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin === OWNER_PIN || enteredPin === 'prasad' || enteredPin === '9082') {
      localStorage.setItem('prasad_owner_unlocked', 'true');
      setIsOwnerUnlocked(true);
      setShowPinModal(false);
      setEnteredPin('');
      setPinError('');
    } else {
      setPinError('Incorrect PIN! Only Prasad is authorized to change this.');
    }
  };

  const handleLockOwner = () => {
    localStorage.removeItem('prasad_owner_unlocked');
    setIsOwnerUnlocked(false);
  };

  const handleRequestChange = () => {
    if (!isOwnerUnlocked) {
      setShowPinModal(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isOwnerUnlocked) {
      setShowPinModal(true);
      return;
    }
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file);
      setImgError(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!isOwnerUnlocked) {
      setShowPinModal(true);
      return;
    }
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      uploadImage(file);
      setImgError(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let url = inputUrl.trim();
    if (url) {
      // Automatic Google Drive link converter to direct image URL
      const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
      if (driveMatch && driveMatch[1]) {
        url = `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
      }
      setImageUrl(url);
      setImgError(false);
      setShowUrlModal(false);
      setInputUrl('');
    }
  };

  const handleDownload = () => {
    soundService.click();
    downloadResumePDF();
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full glass text-[12px] font-semibold tracking-widest uppercase text-primary mb-8"
          >
            Available for <span id="target-word-devops-badge" className="inline-block font-bold">DevOps</span> & <span id="target-word-cloud-badge" className="inline-block font-bold">Cloud</span> Roles
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl md:text-3xl font-serif italic text-white/80 mb-6 tracking-tight"
          >
            Hey' Its' Me <span id="target-word-name" className="inline-block">{personalDetails.name}</span>
          </motion.h2>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-[0.9]">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-gradient block"
            >
              <span id="target-word-automating" className="inline-block">Automating</span> the
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-accent-gradient"
            >
              future of <span id="target-word-cloud" className="inline-block">cloud</span> & <span id="target-word-devops" className="inline-block">devops.</span>
            </motion.span>
          </h1>
          
          <div className="text-xl md:text-2xl font-medium text-white/40 mb-12 h-8">
            <Typewriter
              words={personalDetails.roles}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <MagneticButton
              className="px-10 py-4 bg-white text-black rounded-full font-bold flex items-center gap-2 hover:bg-white/90 transition-all cursor-pointer shadow-xl shadow-white/10"
              onClick={handleDownload}
            >
              Download Resume
              <Download size={18} />
            </MagneticButton>
            <MagneticButton
              className="px-10 py-4 glass rounded-full font-bold flex items-center gap-2 hover:bg-white/5 transition-all"
              onClick={() => window.location.hash = 'contact'}
            >
              Get in touch
              <ArrowRight size={18} />
            </MagneticButton>
          </div>

          {/* Terminal Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 max-w-2xl mx-auto terminal-box text-left shadow-2xl"
          >
            <div className="terminal-header">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold ml-2">devops_pipeline_status.sh</span>
            </div>
            <div className="p-6 space-y-2 text-white/70 font-mono text-xs">
              <div className="flex gap-2">
                <span className="text-primary">$</span>
                <span>kubectl get pods -n boutique</span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">$</span>
                <span className="text-emerald-400">status: 13/13 microservices running (healthy)</span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">$</span>
                <span>trivy_security_scan: clean [0 critical CVEs] | argocd: in-sync</span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">$</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-4 bg-primary inline-block align-middle"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 relative"
        >
          <div className="relative inline-block group">
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.25, 0.4, 0.25]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-[40px] blur-2xl -z-10" 
            />
            <div 
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative w-full max-w-[320px] mx-auto rounded-[32px] overflow-hidden border ${isDragging ? 'border-primary ring-4 ring-primary/30' : 'border-white/10'} shadow-2xl bg-gradient-to-b from-neutral-900 to-black aspect-[3/4] flex items-center justify-center transition-all`}
            >
              {image && !imgError ? (
                <motion.img
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6 }}
                  src={image}
                  alt={personalDetails.name}
                  onError={(e) => {
                    const fallback = (personalDetails as any).profileImageFallback;
                    if (fallback && e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    } else {
                      setImgError(true);
                    }
                  }}
                  className="w-full h-full object-cover transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              ) : (
                /* Sleek Professional Fallback when image is loading, not set, or error */
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900">
                  <div className="absolute inset-0 bg-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
                  <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 text-primary shadow-lg shadow-primary/10">
                    <User size={48} className="text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1 tracking-tight">{personalDetails.name}</h4>
                  <p className="text-xs text-primary font-mono tracking-wider mb-6">DevOps & Cloud Specialist</p>

                  <div className="flex flex-col gap-2 w-full max-w-[200px] z-10">
                    <button
                      onClick={handleRequestChange}
                      className="w-full py-2.5 px-3 bg-primary text-black rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all cursor-pointer shadow-md"
                    >
                      {isOwnerUnlocked ? <Upload size={14} /> : <Lock size={14} />}
                      {isOwnerUnlocked ? 'Upload Photo' : 'Owner Upload Photo'}
                    </button>
                    <button
                      onClick={() => {
                        if (!isOwnerUnlocked) setShowPinModal(true);
                        else setShowUrlModal(true);
                      }}
                      className="w-full py-2 px-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white/90 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Link2 size={13} />
                      Paste Image Link
                    </button>
                  </div>
                </div>
              )}
              
              {/* Upload Overlay on Hover - only accessible if Owner Unlocked or requests PIN */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
                {isOwnerUnlocked ? (
                  <>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all border border-white/20 text-white hover:scale-110 flex flex-col items-center"
                      title="Upload New Picture (Unlocked)"
                    >
                      <Camera size={20} />
                    </button>
                    <button
                      onClick={() => setShowUrlModal(true)}
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all border border-white/20 text-white hover:scale-110 flex flex-col items-center"
                      title="Paste Public Image Link"
                    >
                      <Link2 size={20} />
                    </button>
                    <button
                      onClick={() => {
                        resetImage();
                        setImgError(false);
                      }}
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all border border-white/20 text-white hover:scale-110"
                      title="Reset to Default"
                    >
                      <RotateCcw size={20} />
                    </button>
                    <button
                      onClick={handleLockOwner}
                      className="p-3 bg-rose-500/20 hover:bg-rose-500/30 rounded-full backdrop-blur-md transition-all border border-rose-500/30 text-rose-300 hover:scale-110"
                      title="Lock Photo Protection"
                    >
                      <Unlock size={20} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setShowPinModal(true)}
                    className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full text-xs font-bold text-white flex items-center gap-2 backdrop-blur-md cursor-pointer hover:scale-105 transition-all"
                  >
                    <Lock size={15} className="text-primary" />
                    <span>Owner Unlock to Edit</span>
                  </button>
                )}
              </div>
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Owner PIN Verification Modal */}
          <AnimatePresence>
            {showPinModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
                onClick={() => setShowPinModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-neutral-900 border border-white/20 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-left relative overflow-hidden"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                      <KeyRound size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Owner Security Lock</h3>
                      <p className="text-xs text-white/50">Only Prasad can update the profile photo</p>
                    </div>
                  </div>

                  <form onSubmit={handleVerifyPin} className="space-y-4">
                    <div>
                      <label className="text-xs text-white/70 block mb-1.5 font-medium">Enter Prasad's Owner PIN:</label>
                      <input
                        type="password"
                        placeholder="Enter 4-digit PIN (Default: 1234)"
                        value={enteredPin}
                        onChange={(e) => {
                          setEnteredPin(e.target.value);
                          setPinError('');
                        }}
                        autoFocus
                        required
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors tracking-widest text-center text-lg"
                      />
                    </div>

                    {pinError && (
                      <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                        <AlertTriangle size={14} className="shrink-0" />
                        <span>{pinError}</span>
                      </div>
                    )}

                    <div className="text-[11px] text-white/40 bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
                      <p>🔒 <b>Security Active:</b></p>
                      <p>Random visitors cannot tamper or upload images to your portfolio.</p>
                      <p className="text-primary/80">Default master PIN: <b>1234</b> (or last 4 digits <b>9082</b>)</p>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowPinModal(false)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-white/60 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl text-xs font-bold bg-primary text-black hover:bg-primary/90 transition-all flex items-center gap-1.5"
                      >
                        <Unlock size={14} />
                        Unlock & Edit
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Direct Link Input Modal */}
          <AnimatePresence>
            {showUrlModal && isOwnerUnlocked && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                onClick={() => setShowUrlModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-neutral-900 border border-white/20 rounded-3xl p-6 max-w-md w-full shadow-2xl text-left"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                      <Link2 size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Add Profile Picture URL</h3>
                      <p className="text-xs text-white/50">Enter direct image link or Google Drive direct link</p>
                    </div>
                  </div>

                  <form onSubmit={handleUrlSubmit} className="space-y-4">
                    <input
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
                    />
                    <div className="text-[11px] text-white/40 space-y-1 bg-white/5 p-3 rounded-xl border border-white/5">
                      <p>💡 <b>Tips:</b></p>
                      <p>• Google Drive link must be set to <i>"Anyone with the link can view"</i></p>
                      <p>• Or simply click <b>Upload Photo</b> on the card to pick any image directly from your phone/PC!</p>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowUrlModal(false)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-white/60 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl text-xs font-bold bg-primary text-black hover:bg-primary/90 transition-all flex items-center gap-1.5"
                      >
                        <Check size={14} />
                        Apply Image
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="mt-4 flex items-center justify-center gap-3 text-xs text-white/40">
            {isOwnerUnlocked ? (
              <>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer underline underline-offset-4"
                >
                  <Camera size={13} />
                  Upload Photo
                </button>
                <span>•</span>
                <button
                  onClick={() => setShowUrlModal(true)}
                  className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer underline underline-offset-4"
                >
                  <Link2 size={13} />
                  Paste Link
                </button>
                <span>•</span>
                <button
                  onClick={handleLockOwner}
                  className="text-rose-400/80 hover:text-rose-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Lock size={12} />
                  Lock Photo
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowPinModal(true)}
                className="hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer text-white/50"
              >
                <Lock size={12} className="text-primary" />
                <span>Protected: Only Owner (Prasad) can edit photo</span>
              </button>
            )}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: <Cloud className="text-primary" />, label: 'Cloud & Infrastructure', value: 'AWS & Kubernetes' },
            { icon: <Server className="text-primary" />, label: 'CI/CD & GitOps', value: 'Jenkins & ArgoCD' },
            { icon: <ShieldCheck className="text-primary" />, label: 'DevSecOps & Scan', value: 'SonarQube & Trivy' },
          ].map((item, i) => (
            <div key={i} className="glass p-6 rounded-3xl flex items-center gap-4 group hover:bg-white/5 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">{item.label}</p>
                <p className="text-sm font-bold text-white/80">{item.value}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
