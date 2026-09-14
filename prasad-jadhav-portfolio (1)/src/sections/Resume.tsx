import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap, Briefcase, FileText, Printer, Download, Eye, Languages, MapPin, Phone, Mail, User, CheckCircle2, ExternalLink } from 'lucide-react';
import { soundService } from '../services/soundService';
import { downloadResumePDF } from '../utils/resumeGenerator';

export const Resume: React.FC = () => {
  const { education, personalDetails, internships, projects, skills } = usePortfolio();
  const [showAtsPreview, setShowAtsPreview] = useState(false);

  const handlePrintResume = () => {
    soundService.click();
    window.print();
  };

  const handleDownloadPDF = () => {
    soundService.click();
    downloadResumePDF();
  };

  return (
    <>
      {/* On-Screen Interactive Resume Section */}
      <section id="resume" className="py-24 px-6 relative print:hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <FileText size={20} />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Curriculum Vitae</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">
              Professional <span className="text-white/40">Background.</span>
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              A comprehensive mapping of my academic credentials, DevOps project implementations, and professional objectives.
            </p>

            {/* Resume Action Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all shadow-xl shadow-white/10 cursor-pointer text-sm"
              >
                <Download size={18} />
                Download New Resume (PDF)
              </button>
              <button
                onClick={() => {
                  soundService.pop();
                  setShowAtsPreview(!showAtsPreview);
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 glass hover:bg-white/10 text-white font-medium rounded-full transition-all border border-white/10 cursor-pointer text-sm"
              >
                <Eye size={18} className="text-primary" />
                {showAtsPreview ? 'Hide ATS Preview' : 'Preview Clean ATS Resume'}
              </button>
              <button
                onClick={handlePrintResume}
                className="inline-flex items-center gap-2 px-6 py-3.5 glass hover:bg-white/10 text-white/70 hover:text-white font-medium rounded-full transition-all border border-white/10 cursor-pointer text-sm"
              >
                <Printer size={18} />
                Print / Save Page
              </button>
            </div>
          </motion.div>

          {/* Interactive ATS Resume Sheet Preview */}
          <AnimatePresence>
            {showAtsPreview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-16 overflow-hidden"
              >
                <div className="p-1 rounded-3xl bg-gradient-to-r from-primary/30 to-secondary/30">
                  <div className="bg-white text-zinc-900 rounded-[22px] p-8 md:p-12 shadow-2xl font-sans text-xs select-text">
                    <div className="flex justify-between items-center pb-4 border-b border-zinc-200 mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                        Official DevOps Resume View
                      </span>
                      <button
                        onClick={handleDownloadPDF}
                        className="text-xs font-bold text-zinc-700 hover:text-black flex items-center gap-1.5"
                      >
                        <Download size={14} />
                        Save as PDF
                      </button>
                    </div>

                    {/* Resume Header */}
                    <div className="text-center pb-4 border-b-2 border-zinc-800 mb-4">
                      <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 uppercase">PRASAD JADHAV</h1>
                      <p className="text-zinc-700 mt-1 font-medium text-xs">
                        9082554518 | pj344504@gmail.com | github.com/prasads-3 | linkedin.com/in/prasad-jadhav-19a35b413
                      </p>
                    </div>

                    {/* Profile Summary */}
                    <div className="mb-4">
                      <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-1.5">
                        Profile Summary
                      </h2>
                      <p className="text-zinc-700 text-justify leading-relaxed">
                        {personalDetails.intro}
                      </p>
                    </div>

                    {/* Technical Skills */}
                    <div className="mb-4">
                      <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-1.5">
                        Technical Skills
                      </h2>
                      <div className="space-y-1 text-zinc-800">
                        <p><strong>CI/CD & Automation:</strong> Jenkins, GitHub Actions, ArgoCD, SonarQube, Trivy, Git</p>
                        <p><strong>Cloud & Infrastructure:</strong> AWS (EC2, S3, VPC, EKS, IAM, Lambda), Kubernetes, Docker, Kustomize, Helm, Terraform</p>
                        <p><strong>Security & DevSecOps:</strong> SonarQube , Trivy</p>
                        <p><strong>Monitoring & Observability:</strong> Prometheus, Grafana</p>
                        <p><strong>Programming & OS:</strong> Python, Javascripts, Linux (Ubuntu), CCNA networking concepts</p>
                      </div>
                    </div>

                    {/* Education */}
                    <div className="mb-4">
                      <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-1.5">
                        Education
                      </h2>
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-zinc-900">Bachelor of Engineering in Electronics & Telecommunication</span>
                        <span className="text-zinc-600 font-mono text-[11px]">2022 - 2026</span>
                      </div>
                      <p className="text-zinc-600 italic">MGM College of Engineering, Navi Mumbai</p>
                    </div>

                    {/* Internship Experience */}
                    <div className="mb-4">
                      <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-1.5">
                        Internship Experience
                      </h2>
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-zinc-900">Network Infrastructure & OFC Support Intern | Central Railway, CSMT Mumbai</span>
                        <span className="text-zinc-600 font-mono text-[11px]">Jun 2025 - Jul 2025</span>
                      </div>
                      <ul className="list-disc pl-5 mt-1 space-y-0.5 text-zinc-700">
                        <li>Reviewed railway OFC infrastructure and flagged vulnerabilities; suggested upgrades that improved reliability by about 15%</li>
                        <li>Documented telecom infrastructure procedures and troubleshooting steps for the team</li>
                        <li>Got hands-on with Linux CLI for network monitoring and supported change management work</li>
                      </ul>
                    </div>

                    {/* Projects */}
                    <div className="mb-4">
                      <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-1.5">
                        Hands-On Projects
                      </h2>
                      
                      <div className="mb-3">
                        <div className="font-bold text-zinc-900">Wanderlust Mega Project – Production DevSecOps & GitOps Infrastructure</div>
                        <div className="text-zinc-600 italic text-[11px] mb-1">Jenkins | SonarQube | Trivy | Docker | Kubernetes | ArgoCD | Prometheus | Grafana | Alertmanager</div>
                        <ul className="list-disc pl-5 space-y-0.5 text-zinc-700">
                          <li>Automated CI/CD pipeline with Jenkins pulling source code, testing, building Docker images, and updating GitOps manifests</li>
                          <li>Integrated SonarQube static code quality analysis and Trivy filesystem & container vulnerability scanning</li>
                          <li>Implemented GitOps deployment using ArgoCD continuously syncing desired Kubernetes state from Git repository</li>
                          <li>Orchestrated multi-tier containerized deployment: React frontend, Spring Boot backend, MongoDB, and Redis</li>
                          <li>Full observability stack with Prometheus metrics collection, Grafana visualization dashboards, and Alertmanager alert rules</li>
                        </ul>
                      </div>

                      <div className="mb-3">
                        <div className="font-bold text-zinc-900">EasyShop – Production DevSecOps & AWS EKS Deployment</div>
                        <div className="text-zinc-600 italic text-[11px] mb-1">AWS EKS | Amazon ECR | Jenkins | SonarQube | Trivy | Kubernetes Ingress | AWS ALB | HPA | IAM</div>
                        <ul className="list-disc pl-5 space-y-0.5 text-zinc-700">
                          <li>Automated CI/CD workflow with Jenkins covering source checkout, SonarQube quality gates, and Trivy security scanning</li>
                          <li>Containerized microservices with Docker and published versioned images to private Amazon ECR repository</li>
                          <li>Deployed scalable Kubernetes workloads to Amazon EKS with Deployments, Services, and Horizontal Pod Autoscaler (HPA)</li>
                          <li>Exposed application via Kubernetes Ingress integrated with AWS Application Load Balancer (ALB) and enforced IAM security</li>
                        </ul>
                      </div>

                      <div>
                        <div className="font-bold text-zinc-900">Online Boutique – Cloud-First 11-Tier Microservices Platform</div>
                        <div className="text-zinc-600 italic text-[11px] mb-1">Kubernetes | gRPC | Go | C# .NET | Node.js | Python | Java | Redis | Helm | Kustomize | Istio</div>
                        <ul className="list-disc pl-5 space-y-0.5 text-zinc-700">
                          <li>Orchestrated 11 polyglot microservices communicating over high-speed gRPC and Protocol Buffers</li>
                          <li>Configured in-memory Redis datastore for high-throughput distributed shopping cart session management</li>
                          <li>Packaged cloud-native workloads with Helm charts, Kustomize environment overlays, and Istio service mesh</li>
                          <li>Integrated synthetic user traffic generation via Locust to validate cluster resilience and autoscaling</li>
                        </ul>
                      </div>

                      <div>
                        <div className="font-bold text-zinc-900">Two-Tier Flask Application – Containerized Cloud Architecture</div>
                        <div className="text-zinc-600 italic text-[11px] mb-1">Python Flask | MySQL | Docker Compose | Kubernetes | Persistent Volumes | CI/CD</div>
                        <ul className="list-disc pl-5 space-y-0.5 text-zinc-700">
                          <li>Containerized a 2-tier architecture decoupling Python Flask application tier from MySQL relational database tier</li>
                          <li>Constructed lightweight multi-stage Dockerfiles with Alpine Linux, optimizing layer caching and shrinking image size</li>
                          <li>Orchestrated multi-container local stack with Docker Compose, healthchecks, and isolated Docker bridge networks</li>
                          <li>Deployed resilient Kubernetes manifests using Deployments, ClusterIP database services, NodePort web services, and PVCs</li>
                        </ul>
                      </div>
                    </div>

                    {/* Certifications */}
                    <div>
                      <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-1.5">
                        Certifications & Training
                      </h2>
                      <p className="text-zinc-800">
                        ● <strong>Cisco CCNA (200-301)</strong> - In Progress (RST Forum, Dadar)
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left Column: Career objective & Personal details */}
            <div className="space-y-12">
              {/* Career Objective */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-primary">
                    <Briefcase size={24} />
                  </div>
                  <h3 className="text-2xl font-bold">Profile Summary</h3>
                </div>
                <div className="glass p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-50" />
                  <p className="text-base text-white/70 leading-relaxed font-sans text-justify">
                    {personalDetails.intro}
                  </p>
                </div>
              </motion.div>

              {/* Personal Details */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-primary">
                    <User size={24} />
                  </div>
                  <h3 className="text-2xl font-bold">Candidate Details</h3>
                </div>
                
                <div className="glass p-8 rounded-[2rem] border border-white/5 space-y-5">
                  <div className="flex items-center gap-4 pb-4 border-b border-white/5">
                    <MapPin size={18} className="text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-white/30">Location</p>
                      <p className="text-sm font-bold text-white/80">{(personalDetails as any).location || "Mumbai, Maharashtra, India"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pb-4 border-b border-white/5">
                    <Languages size={18} className="text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-white/30">Languages</p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {((personalDetails as any).languages || ["English", "Hindi", "Marathi", "German (A2)"]).map((lang: string) => (
                          <span key={lang} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-white/70">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 w-full overflow-hidden">
                      <Mail size={16} className="text-primary/60 shrink-0" />
                      <span className="text-xs text-white/60 font-mono truncate">{personalDetails.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-primary/60 shrink-0" />
                      <span className="text-xs text-white/60 font-mono">{(personalDetails as any).phone || "9082554518"}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleDownloadPDF}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black hover:bg-neutral-200 transition-all font-bold rounded-full shadow-xl shadow-white/5 cursor-pointer max-w-xs"
                  >
                    Download Resume (PDF)
                    <Download size={18} />
                  </button>
                  <p className="text-xs text-white/30 self-center leading-relaxed max-w-[200px]">
                    *Generates clean 1-page ATS formatted PDF directly in your browser.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Education */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-primary">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-2xl font-bold">Academic Journey</h3>
              </div>

              <div className="space-y-6 relative border-l border-white/5 pl-6 ml-6">
                {education.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative pb-8 last:pb-0 group"
                  >
                    <div className="absolute left-[-31px] top-1.5 w-3 h-3 rounded-full bg-neutral-900 border-2 border-primary group-hover:bg-primary transition-colors shadow-[0_0_10px_rgba(0,122,255,0.4)]" />
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest">{edu.year}</span>
                      {('percentage' in edu && edu.percentage) && (
                        <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-white/50 border border-white/5">
                          Result: {edu.percentage}
                        </span>
                      )}
                      {('status' in edu && edu.status) && (
                        <span className="px-2 py-0.5 rounded bg-primary/10 text-[10px] font-mono text-primary border border-primary/15">
                          {edu.status}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xl font-bold text-white/90 group-hover:text-primary transition-colors tracking-tight">{edu.degree}</h4>
                    <p className="text-sm text-white/55 mt-1 font-medium">{edu.institute}</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1.5 font-mono">{edu.university}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hidden Print-Only Resume A4 Page */}
      <div className="hidden print:block print-resume-section bg-white text-zinc-900 p-8 md:p-12 font-sans select-text leading-tight text-[11px]">
        {/* Print Header */}
        <div className="text-center pb-3 border-b-2 border-zinc-800">
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 uppercase">PRASAD JADHAV</h1>
          <p className="text-zinc-700 mt-1 font-medium">
            9082554518 | pj344504@gmail.com | github.com/prasads-3 | linkedin.com/in/prasad-jadhav-19a35b413
          </p>
        </div>

        {/* Profile Summary */}
        <div className="mt-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-800 border-b border-zinc-300 pb-1 mb-1.5">
            Profile Summary
          </h2>
          <p className="text-zinc-700 leading-relaxed text-justify text-[10px]">
            {personalDetails.intro}
          </p>
        </div>

        {/* Technical Skills */}
        <div className="mt-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-800 border-b border-zinc-300 pb-1 mb-1.5">
            Technical Skills
          </h2>
          <div className="space-y-1 text-[10px] text-zinc-700">
            <p><strong>CI/CD & Automation:</strong> Jenkins, GitHub Actions, ArgoCD, SonarQube, Trivy, Git</p>
            <p><strong>Cloud & Infrastructure:</strong> AWS (EC2, S3, VPC, EKS, IAM, Lambda), Kubernetes, Docker, Kustomize, Helm, Terraform</p>
            <p><strong>Security & DevSecOps:</strong> SonarQube , Trivy</p>
            <p><strong>Monitoring & Observability:</strong> Prometheus, Grafana</p>
            <p><strong>Programming & OS:</strong> Python, Javascripts, Linux (Ubuntu), CCNA networking concepts</p>
          </div>
        </div>

        {/* Education */}
        <div className="mt-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-800 border-b border-zinc-300 pb-1 mb-1.5">
            Education
          </h2>
          <div className="flex justify-between font-bold text-[10px] text-zinc-800">
            <span>Bachelor of Engineering in Electronics & Telecommunication</span>
            <span className="font-mono">2022 - 2026</span>
          </div>
          <p className="text-zinc-600 italic text-[9.5px]">MGM College of Engineering, Navi Mumbai</p>
        </div>

        {/* Internship Experience */}
        <div className="mt-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-800 border-b border-zinc-300 pb-1 mb-1.5">
            Internship Experience
          </h2>
          <div>
            <div className="flex justify-between font-bold text-[10px] text-zinc-800">
              <span>Network Infrastructure & OFC Support Intern | Central Railway, CSMT Mumbai</span>
              <span className="font-mono">Jun 2025 - Jul 2025</span>
            </div>
            <ul className="list-disc pl-5 text-zinc-700 text-[9.5px] space-y-0.5 mt-1">
              <li>Reviewed railway OFC infrastructure and flagged vulnerabilities; suggested upgrades that improved reliability by about 15%</li>
              <li>Documented telecom infrastructure procedures and troubleshooting steps for the team</li>
              <li>Got hands-on with Linux CLI for network monitoring and supported change management work</li>
            </ul>
          </div>
        </div>

        {/* Hands-On Projects */}
        <div className="mt-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-800 border-b border-zinc-300 pb-1 mb-1.5">
            Hands-On Projects
          </h2>
          
          <div className="mb-2">
            <div className="font-bold text-[10px] text-zinc-800">Wanderlust Mega Project – Production DevSecOps & GitOps Infrastructure</div>
            <div className="text-zinc-500 italic text-[9px] mb-0.5">Jenkins | SonarQube | Trivy | Docker | Kubernetes | ArgoCD | Prometheus | Grafana | Alertmanager</div>
            <ul className="list-disc pl-5 text-zinc-700 text-[9.5px] space-y-0.5">
              <li>Automated CI/CD pipeline with Jenkins pulling source code, testing, building Docker images, and updating GitOps manifests</li>
              <li>Integrated SonarQube static code quality analysis and Trivy filesystem & container vulnerability scanning</li>
              <li>Implemented GitOps deployment using ArgoCD continuously syncing desired Kubernetes state from Git repository</li>
              <li>Orchestrated multi-tier containerized deployment: React frontend, Spring Boot backend, MongoDB, and Redis</li>
              <li>Full observability stack with Prometheus metrics collection, Grafana visualization dashboards, and Alertmanager alert rules</li>
            </ul>
          </div>

          <div className="mb-2">
            <div className="font-bold text-[10px] text-zinc-800">EasyShop – Production DevSecOps & AWS EKS Deployment</div>
            <div className="text-zinc-500 italic text-[9px] mb-0.5">AWS EKS | Amazon ECR | Jenkins | SonarQube | Trivy | Kubernetes Ingress | AWS ALB | HPA | IAM</div>
            <ul className="list-disc pl-5 text-zinc-700 text-[9.5px] space-y-0.5">
              <li>Automated CI/CD workflow with Jenkins covering source checkout, SonarQube quality gates, and Trivy security scanning</li>
              <li>Containerized microservices with Docker and published versioned images to private Amazon ECR repository</li>
              <li>Deployed scalable Kubernetes workloads to Amazon EKS with Deployments, Services, and Horizontal Pod Autoscaler (HPA)</li>
              <li>Exposed application via Kubernetes Ingress integrated with AWS Application Load Balancer (ALB) and enforced IAM security</li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-[10px] text-zinc-800">Online Boutique – Cloud-First 11-Tier Microservices Platform</div>
            <div className="text-zinc-500 italic text-[9px] mb-0.5">Kubernetes | gRPC | Go | C# .NET | Node.js | Python | Java | Redis | Helm | Kustomize | Istio</div>
            <ul className="list-disc pl-5 text-zinc-700 text-[9.5px] space-y-0.5">
              <li>Orchestrated 11 polyglot microservices communicating over high-speed gRPC and Protocol Buffers</li>
              <li>Configured in-memory Redis datastore for high-throughput distributed shopping cart session management</li>
              <li>Packaged cloud-native workloads with Helm charts, Kustomize environment overlays, and Istio service mesh</li>
              <li>Integrated synthetic user traffic generation via Locust to validate cluster resilience and autoscaling</li>
            </ul>
          </div>

          <div className="mt-2">
            <div className="font-bold text-[10px] text-zinc-800">Two-Tier Flask Application – Containerized Cloud Architecture</div>
            <div className="text-zinc-500 italic text-[9px] mb-0.5">Python Flask | MySQL | Docker Compose | Kubernetes | Persistent Volumes | CI/CD</div>
            <ul className="list-disc pl-5 text-zinc-700 text-[9.5px] space-y-0.5">
              <li>Containerized a 2-tier architecture decoupling Python Flask application tier from MySQL relational database tier</li>
              <li>Constructed lightweight multi-stage Dockerfiles with Alpine Linux, optimizing layer caching and shrinking image size</li>
              <li>Orchestrated multi-container local stack with Docker Compose, healthchecks, and isolated Docker bridge networks</li>
              <li>Deployed resilient Kubernetes manifests using Deployments, ClusterIP database services, NodePort web services, and PVCs</li>
            </ul>
          </div>
        </div>

        {/* Certifications & Training */}
        <div className="mt-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-800 border-b border-zinc-300 pb-1 mb-1.5">
            Certifications & Training
          </h2>
          <p className="text-zinc-800 text-[10px]">
            ● <strong>Cisco CCNA (200-301)</strong> - In Progress (RST Forum, Dadar)
          </p>
        </div>
      </div>
    </>
  );
};
