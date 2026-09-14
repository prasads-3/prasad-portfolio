import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PERSONAL_DETAILS as initialPersonalDetails, 
  SKILLS as initialSkills, 
  PROJECTS as initialProjects, 
  CERTIFICATIONS as initialCertifications,
  INTERNSHIPS as initialInternships,
  EDUCATION as initialEducation
} from '../constants/data';

interface PortfolioContextType {
  personalDetails: typeof initialPersonalDetails;
  skills: typeof initialSkills;
  projects: typeof initialProjects;
  certifications: typeof initialCertifications;
  internships: typeof initialInternships;
  education: typeof initialEducation;
  theme: string;
  setPersonalDetails: React.Dispatch<React.SetStateAction<typeof initialPersonalDetails>>;
  setSkills: React.Dispatch<React.SetStateAction<typeof initialSkills>>;
  setProjects: React.Dispatch<React.SetStateAction<typeof initialProjects>>;
  setCertifications: React.Dispatch<React.SetStateAction<typeof initialCertifications>>;
  setInternships: React.Dispatch<React.SetStateAction<typeof initialInternships>>;
  setEducation: React.Dispatch<React.SetStateAction<typeof initialEducation>>;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personalDetails, setPersonalDetails] = useState(initialPersonalDetails);
  const [skills, setSkills] = useState(initialSkills);
  const [projects, setProjects] = useState(initialProjects);
  const [certifications, setCertifications] = useState(initialCertifications);
  const [internships, setInternships] = useState(initialInternships);
  const [education, setEducation] = useState(initialEducation);
  const [theme, setTheme] = useState('midnight');
  const [isEditMode, setIsEditMode] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('portfolio_data_devops_v9') || localStorage.getItem('portfolio_data_devops_v7');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.personalDetails) setPersonalDetails(parsed.personalDetails);
        if (parsed.skills) setSkills(parsed.skills);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.certifications) {
          // Verify if the certification image is from unsplash; if so, replace with latest authentic certificate
          const hasOldUnsplash = Array.isArray(parsed.certifications) && 
            parsed.certifications.some((c: any) => c.image && c.image.includes('unsplash.com'));
          if (hasOldUnsplash || !parsed.certifications.length) {
            setCertifications(initialCertifications);
          } else {
            setCertifications(parsed.certifications);
          }
        }
        if (parsed.internships) setInternships(parsed.internships);
        if (parsed.education) setEducation(parsed.education);
        if (parsed.theme) setTheme(parsed.theme);
      } catch (e) {
        console.error("Failed to load saved portfolio data", e);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    const dataToSave = {
      personalDetails,
      skills,
      projects,
      certifications,
      internships,
      education,
      theme
    };
    localStorage.setItem('portfolio_data_devops_v9', JSON.stringify(dataToSave));
  }, [personalDetails, skills, projects, certifications, internships, education, theme]);

  return (
    <PortfolioContext.Provider value={{
      personalDetails,
      skills,
      projects,
      certifications,
      internships,
      education,
      theme,
      setPersonalDetails,
      setSkills,
      setProjects,
      setCertifications,
      setInternships,
      setEducation,
      setTheme,
      isEditMode,
      setIsEditMode
    }}>
      <div className={`theme-${theme}`}>
        {children}
      </div>
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
