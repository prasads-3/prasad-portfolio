import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, X, Save, RotateCcw, Edit3, Palette, Sparkles, Loader2, 
  ChevronDown, ChevronUp, Plus, Trash2, Briefcase, GraduationCap, Code2, Trophy
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { aiService } from '../services/aiService';
import { soundService } from '../services/soundService';

const THEMES = [
  { id: 'midnight', name: 'Midnight', primary: '#007aff', secondary: '#5e5ce6' },
  { id: 'emerald', name: 'Emerald', primary: '#10b981', secondary: '#059669' },
  { id: 'rose', name: 'Rose', primary: '#f43f5e', secondary: '#e11d48' },
  { id: 'amber', name: 'Amber', primary: '#f59e0b', secondary: '#d97706' },
];

const EditorSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="space-y-4">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          soundService.pop();
        }}
        onMouseEnter={() => soundService.hover()}
        className="w-full flex items-center justify-between p-4 glass rounded-2xl hover:bg-white/5 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="text-primary group-hover:scale-110 transition-transform">{icon}</div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">{title}</h3>
        </div>
        {isOpen ? <ChevronUp size={14} className="text-white/20" /> : <ChevronDown size={14} className="text-white/20" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-4 px-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const LiveEditor: React.FC = () => {
  const { 
    personalDetails, setPersonalDetails, 
    education, setEducation,
    skills, setSkills,
    projects, setProjects,
    theme, setTheme,
    isEditMode, setIsEditMode 
  } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all changes? This will reload the page.")) {
      localStorage.removeItem('portfolio_data');
      window.location.reload();
    }
  };

  const generateAIIntro = async () => {
    setIsGenerating(true);
    try {
      const details = `Name: ${personalDetails.name}, Role: ${personalDetails.role}, Education: ${education.map(e => e.degree).join(', ')}`;
      const newIntro = await aiService.generateCareerObjective(details);
      setPersonalDetails({ ...personalDetails, intro: newIntro });
    } catch (error) {
      alert("Failed to generate AI content. Please check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => soundService.hover()}
        onClick={() => {
          setIsOpen(true);
          soundService.startup();
        }}
        className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-primary/90 transition-all"
      >
        <Settings size={24} />
      </motion.button>

      {/* Editor Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-[#0a0a0a] border-l border-white/10 z-[120] shadow-2xl overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                      <Settings size={24} className="animate-spin-slow" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold tracking-tighter">System Config</h2>
                      <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">v2.4.0-stable</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      soundService.click();
                    }}
                    onMouseEnter={() => soundService.hover()}
                    className="p-3 hover:bg-white/5 rounded-full transition-all border border-white/5"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Edit Mode Toggle */}
                  <div className="terminal-box">
                    <div className="terminal-header">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">runtime_mode</span>
                    </div>
                    <div className="p-6 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-white/90">Visual Debugging</h4>
                        <p className="text-xs text-white/30">Enable on-page editing indicators</p>
                      </div>
                      <button
                        onClick={() => {
                          setIsEditMode(!isEditMode);
                          soundService.pop();
                        }}
                        onMouseEnter={() => soundService.hover()}
                        className={`w-14 h-7 rounded-full transition-all relative p-1 ${isEditMode ? 'bg-primary' : 'bg-white/10'}`}
                      >
                        <motion.div
                          animate={{ x: isEditMode ? 28 : 0 }}
                          className="w-5 h-5 bg-white rounded-full shadow-lg"
                        />
                      </button>
                    </div>
                  </div>

                  {/* Theme Selection */}
                  <EditorSection title="Interface Skin" icon={<Palette size={16} />} defaultOpen>
                    <div className="grid grid-cols-2 gap-4">
                      {THEMES.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setTheme(t.id);
                            soundService.success();
                          }}
                          onMouseEnter={() => soundService.hover()}
                          className={`p-5 rounded-3xl border transition-all text-left relative overflow-hidden group ${
                            theme === t.id 
                              ? 'bg-white/10 border-primary' 
                              : 'bg-white/5 border-white/10 hover:border-white/20'
                          }`}
                        >
                          {theme === t.id && (
                            <motion.div 
                              layoutId="theme-active"
                              className="absolute inset-0 bg-primary/5 -z-10"
                            />
                          )}
                          <div className="flex items-center gap-3 mb-3">
                            <div 
                              className="w-5 h-5 rounded-lg shadow-lg" 
                              style={{ background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})` }}
                            />
                            <span className={`text-sm font-bold ${theme === t.id ? 'text-white' : 'text-white/60'}`}>
                              {t.name}
                            </span>
                          </div>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 transition-all" style={{ backgroundColor: t.primary }} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </EditorSection>

                  {/* Personal Details Form */}
                  <EditorSection title="Core Identity" icon={<Edit3 size={16} />}>
                    <div className="space-y-5">
                      <div className="terminal-box">
                        <div className="terminal-header">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">field: name</span>
                        </div>
                        <input
                          type="text"
                          value={personalDetails.name}
                          onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })}
                          className="w-full bg-transparent px-6 py-4 text-white font-mono outline-none"
                        />
                      </div>
                      
                      <div className="terminal-box">
                        <div className="terminal-header">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">field: primary_role</span>
                        </div>
                        <input
                          type="text"
                          value={personalDetails.role}
                          onChange={(e) => setPersonalDetails({ ...personalDetails, role: e.target.value })}
                          className="w-full bg-transparent px-6 py-4 text-white font-mono outline-none"
                        />
                      </div>

                      <div className="terminal-box">
                        <div className="terminal-header flex justify-between items-center">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">field: bio_manifest</span>
                          <button
                            onClick={() => {
                              generateAIIntro();
                              soundService.startup();
                            }}
                            onMouseEnter={() => soundService.hover()}
                            disabled={isGenerating}
                            className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-primary hover:text-white transition-colors disabled:opacity-50"
                          >
                            {isGenerating ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} />}
                            AI_OPTIMIZE
                          </button>
                        </div>
                        <textarea
                          rows={6}
                          value={personalDetails.intro}
                          onChange={(e) => setPersonalDetails({ ...personalDetails, intro: e.target.value })}
                          className="w-full bg-transparent px-6 py-4 text-white font-mono text-xs leading-relaxed outline-none resize-none"
                        />
                      </div>
                    </div>
                  </EditorSection>

                  {/* Skills Section */}
                  <EditorSection title="Skill Matrix" icon={<Code2 size={16} />}>
                    <div className="space-y-4">
                      {skills.map((skill, idx) => (
                        <div key={idx} className="terminal-box">
                          <div className="terminal-header flex justify-between items-center">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">skill_node: {skill.name || 'NEW'}</span>
                            <button 
                              onClick={() => {
                                const newSkills = [...skills];
                                newSkills.splice(idx, 1);
                                setSkills(newSkills);
                                soundService.click();
                              }}
                              onMouseEnter={() => soundService.hover()}
                              className="text-rose-500 hover:text-rose-400"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                          <div className="p-4 space-y-3">
                            <input
                              type="text"
                              placeholder="Skill Name"
                              value={skill.name}
                              onChange={(e) => {
                                const newSkills = [...skills];
                                newSkills[idx] = { ...newSkills[idx], name: e.target.value };
                                setSkills(newSkills);
                              }}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-primary"
                            />
                            <div className="flex items-center gap-3">
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={skill.level}
                                onChange={(e) => {
                                  const newSkills = [...skills];
                                  newSkills[idx] = { ...newSkills[idx], level: parseInt(e.target.value) };
                                  setSkills(newSkills);
                                }}
                                className="flex-1 accent-primary"
                              />
                              <span className="text-[10px] font-mono text-white/40 w-8">{skill.level}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setSkills([...skills, { name: '', level: 80, icon: 'Code' }]);
                          soundService.pop();
                        }}
                        onMouseEnter={() => soundService.hover()}
                        className="w-full py-3 border border-dashed border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:border-white/20 transition-all"
                      >
                        + ADD_SKILL_NODE
                      </button>
                    </div>
                  </EditorSection>

                  {/* Projects Section */}
                  <EditorSection title="Project Archive" icon={<Briefcase size={16} />}>
                    <div className="space-y-6">
                      {projects.map((project, idx) => (
                        <div key={idx} className="terminal-box">
                          <div className="terminal-header flex justify-between items-center">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">project_id: {idx + 1}</span>
                            <button 
                              onClick={() => {
                                const newProjects = [...projects];
                                newProjects.splice(idx, 1);
                                setProjects(newProjects);
                              }}
                              className="text-rose-500 hover:text-rose-400"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                          <div className="p-4 space-y-4">
                            <input
                              type="text"
                              placeholder="Project Title"
                              value={project.title}
                              onChange={(e) => {
                                const newProjects = [...projects];
                                newProjects[idx] = { ...newProjects[idx], title: e.target.value };
                                setProjects(newProjects);
                              }}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-primary"
                            />
                            <textarea
                              placeholder="Description"
                              rows={3}
                              value={project.description}
                              onChange={(e) => {
                                const newProjects = [...projects];
                                newProjects[idx] = { ...newProjects[idx], description: e.target.value };
                                setProjects(newProjects);
                              }}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-primary resize-none"
                            />
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder="GitHub URL"
                                value={project.github}
                                onChange={(e) => {
                                  const newProjects = [...projects];
                                  newProjects[idx] = { ...newProjects[idx], github: e.target.value };
                                  setProjects(newProjects);
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[10px] text-white outline-none focus:border-primary"
                              />
                              <input
                                type="text"
                                placeholder="Live URL"
                                value={project.live}
                                onChange={(e) => {
                                  const newProjects = [...projects];
                                  newProjects[idx] = { ...newProjects[idx], live: e.target.value };
                                  setProjects(newProjects);
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[10px] text-white outline-none focus:border-primary"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => setProjects([...projects, { title: '', description: '', tech: [], github: '', live: '', image: 'https://picsum.photos/seed/project/800/600' }])}
                        className="w-full py-3 border border-dashed border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:border-white/20 transition-all"
                      >
                        + ARCHIVE_NEW_PROJECT
                      </button>
                    </div>
                  </EditorSection>

                  {/* Education Section */}
                  <EditorSection title="Academic History" icon={<GraduationCap size={16} />}>
                    <div className="space-y-6">
                      {education.map((edu, idx) => (
                        <div key={idx} className="terminal-box">
                          <div className="terminal-header flex justify-between items-center">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">edu_record: {idx + 1}</span>
                            <button 
                              onClick={() => {
                                const newEdu = [...education];
                                newEdu.splice(idx, 1);
                                setEducation(newEdu);
                              }}
                              className="text-rose-500 hover:text-rose-400"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                          <div className="p-4 space-y-4">
                            <input
                              type="text"
                              placeholder="Degree"
                              value={edu.degree}
                              onChange={(e) => {
                                const newEdu = [...education];
                                newEdu[idx] = { ...newEdu[idx], degree: e.target.value };
                                setEducation(newEdu);
                              }}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-primary"
                            />
                            <input
                              type="text"
                              placeholder="Institute"
                              value={edu.institute}
                              onChange={(e) => {
                                const newEdu = [...education];
                                newEdu[idx] = { ...newEdu[idx], institute: e.target.value };
                                setEducation(newEdu);
                              }}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-primary"
                            />
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder="Year"
                                value={edu.year}
                                onChange={(e) => {
                                  const newEdu = [...education];
                                  newEdu[idx] = { ...newEdu[idx], year: e.target.value };
                                  setEducation(newEdu);
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-primary"
                              />
                              <input
                                type="text"
                                placeholder="Percentage/Status"
                                value={edu.percentage || edu.status || ''}
                                onChange={(e) => {
                                  const newEdu = [...education];
                                  if ('status' in edu) {
                                    newEdu[idx] = { ...newEdu[idx], status: e.target.value };
                                  } else {
                                    newEdu[idx] = { ...newEdu[idx], percentage: e.target.value };
                                  }
                                  setEducation(newEdu);
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-primary"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => setEducation([...education, { degree: '', institute: '', university: '', year: '' }])}
                        className="w-full py-3 border border-dashed border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:border-white/20 transition-all"
                      >
                        + LOG_ACADEMIC_ENTRY
                      </button>
                    </div>
                  </EditorSection>

                  <div className="flex items-center justify-center gap-2 py-8">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-bold">
                      Local Storage Sync: Active
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
