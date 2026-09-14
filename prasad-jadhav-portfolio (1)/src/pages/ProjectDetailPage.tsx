import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Layers, 
  Server, 
  Shield, 
  Activity, 
  CheckCircle2, 
  Terminal, 
  Cpu, 
  RefreshCw,
  GitBranch,
  Box,
  Eye,
  Cloud,
  Mail,
  Sliders,
  Lock,
  Globe,
  Network,
  Code2,
  Package
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { soundService } from '../services/soundService';
import { TwoTierFlaskDetails } from '../components/project-details/TwoTierFlaskDetails';

interface ProjectDetailPageProps {
  projectId: string;
  onBack: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ projectId, onBack }) => {
  const { projects } = usePortfolio();
  const project = projects.find(p => p.id === projectId) || projects[0];

  const isEasyShop = project.id === 'easyshop-3tier-devsecops';
  const isBoutique = project.id === 'online-boutique-microservices';
  const isTwoTier = project.id === 'two-tier-flask-app';

  // Default active tab based on project
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const wanderlustScreenshots = {
    appHomepage: "https://raw.githubusercontent.com/prasads-3/Wanderlust-Mega-Project/main/screenshots/application/13-wanderlust-homepage.png",
    architecture: "https://github.com/user-attachments/assets/197519d4-05bd-4c22-854b-4ad1dcad6b1b",
    jenkins: "https://raw.githubusercontent.com/prasads-3/Wanderlust-Mega-Project/main/screenshots/cicd/01-jenkins-stage-view.png",
    sonarqube: "https://raw.githubusercontent.com/prasads-3/Wanderlust-Mega-Project/main/screenshots/cicd/03-sonarqube-quality-gate.png",
    sonarDashboard: "https://raw.githubusercontent.com/prasads-3/Wanderlust-Mega-Project/main/screenshots/cicd/02-sonarqube-dashboard.png",
    dockerhub: "https://raw.githubusercontent.com/prasads-3/Wanderlust-Mega-Project/main/screenshots/cicd/04-dockerhub-frontend-tags.png",
    argocd: "https://raw.githubusercontent.com/prasads-3/Wanderlust-Mega-Project/main/screenshots/gitops/05-argocd-dashboard.png",
    kubernetes: "https://raw.githubusercontent.com/prasads-3/Wanderlust-Mega-Project/main/screenshots/kubernetes/06-kubectl-pods.png",
    prometheusTargets: "https://raw.githubusercontent.com/prasads-3/Wanderlust-Mega-Project/main/screenshots/monitoring/07-prometheus-targets.png",
    prometheusAlerts: "https://raw.githubusercontent.com/prasads-3/Wanderlust-Mega-Project/main/screenshots/monitoring/08-prometheus-alerts.png",
    grafanaOverview: "https://raw.githubusercontent.com/prasads-3/Wanderlust-Mega-Project/main/screenshots/monitoring/09-grafana-overview-dashboard.png",
    grafanaCluster: "https://raw.githubusercontent.com/prasads-3/Wanderlust-Mega-Project/main/screenshots/monitoring/10-grafana-kubernetes-cluster.png",
    grafanaNetworking: "https://raw.githubusercontent.com/prasads-3/Wanderlust-Mega-Project/main/screenshots/monitoring/11-grafana-kubernetes-networking-cluster.png",
    alertmanager: "https://raw.githubusercontent.com/prasads-3/Wanderlust-Mega-Project/main/screenshots/monitoring/12-grafana-alertmanager-overview.png"
  };

  const easyShopScreenshots = {
    appLive: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/01-easyshop-live.png",
    appLive2: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/02-easyshop-live.png",
    jenkins: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/03-jenkins-pipeline.png",
    sonarqube: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/04-sonarqube-dashboard.png",
    sonarQuality: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/05-sonarqube-dashboard.png",
    ecrRepo: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/06-ecr-repository.png",
    ecrImages: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/07-ecr-images.png",
    eksCluster: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/08-eks-cluster.png",
    eksCompute: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/09-eks-compute.png",
    awsAlb: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/10-aws-alb.png",
    k8sIngress: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/11-kubernetes-ingress.png",
    hpaStatus: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/12-hpa-status%20.png",
    hpaDetails: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/13-hpa-details.png",
    iamAlb: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/14-iam-load-balancer-role.png",
    iamCluster: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/15-iam-eks-cluster-role..png",
    iamNode: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/16-iam-eks-node-role.png",
    trivy: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/17-trivy-security-scan.png",
    dockerBuild: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/18-docker-build.png",
    gmail: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/19-gmail-notification.png",
    k8sWorkloads: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/20-kubernetes-workloads.png",
    k8sServices: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/21-kubernetes-services.png"
  };

  const boutiqueScreenshots = {
    frontendHome: "https://raw.githubusercontent.com/prasads-3/microservices-demo/main/docs/img/online-boutique-frontend-1.png",
    frontendCheckout: "https://raw.githubusercontent.com/prasads-3/microservices-demo/main/docs/img/online-boutique-frontend-2.png",
    architecture: "https://raw.githubusercontent.com/prasads-3/microservices-demo/main/docs/img/architecture-diagram.png",
    memorystore: "https://raw.githubusercontent.com/prasads-3/microservices-demo/main/docs/img/memorystore.png",
    collectorModel: "https://raw.githubusercontent.com/prasads-3/microservices-demo/main/kustomize/components/google-cloud-operations/collector-model.png"
  };

  const twoTierScreenshots = {
    appPreview: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1600&auto=format&fit=crop",
    architecture: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1600&auto=format&fit=crop"
  };

  const screenshots = isTwoTier
    ? twoTierScreenshots
    : (isBoutique 
      ? boutiqueScreenshots 
      : (isEasyShop ? easyShopScreenshots : (project.screenshots || wanderlustScreenshots)));

  const featuredImage = isTwoTier
    ? twoTierScreenshots.appPreview
    : (isBoutique
      ? boutiqueScreenshots.frontendHome
      : (isEasyShop 
        ? easyShopScreenshots.appLive 
        : (screenshots.appHomepage || project.image)));

  const easyShopTabs = [
    { id: 'overview', label: 'AWS & Architecture', icon: Cloud },
    { id: 'cicd', label: 'Jenkins & DevSecOps', icon: Terminal },
    { id: 'ecr_eks', label: 'Amazon ECR & EKS', icon: Server },
    { id: 'alb_ingress', label: 'ALB & Ingress', icon: Globe },
    { id: 'hpa_iam', label: 'HPA & IAM Security', icon: Shield },
  ];

  const wanderlustTabs = [
    { id: 'overview', label: 'Solution Architecture', icon: Layers },
    { id: 'cicd', label: 'Jenkins & DevSecOps', icon: Terminal },
    { id: 'gitops', label: 'ArgoCD & GitOps', icon: GitBranch },
    { id: 'kubernetes', label: 'Kubernetes Workloads', icon: Box },
    { id: 'monitoring', label: 'Observability & Alerts', icon: Activity },
  ];

  const boutiqueTabs = [
    { id: 'overview', label: '11 Microservices & gRPC', icon: Network },
    { id: 'services', label: 'Polyglot Services Matrix', icon: Server },
    { id: 'kubernetes', label: 'Kubernetes Workloads', icon: Box },
    { id: 'helm_kustomize', label: 'Helm & Kustomize Overlays', icon: Layers },
    { id: 'mesh_tracing', label: 'Istio Mesh & Tracing', icon: Activity },
  ];

  const twoTierTabs = [
    { id: 'overview', label: '2-Tier Architecture', icon: Layers },
    { id: 'dockerfile', label: 'Multi-Stage Dockerfile', icon: Box },
    { id: 'compose', label: 'Docker Compose & Networks', icon: Network },
    { id: 'kubernetes', label: 'Kubernetes Manifests & PV', icon: Server },
    { id: 'cicd_security', label: 'CI/CD & Hardening', icon: Shield },
  ];

  const currentTabs = isTwoTier 
    ? twoTierTabs 
    : (isBoutique ? boutiqueTabs : (isEasyShop ? easyShopTabs : wanderlustTabs));

  return (
    <div className="min-h-screen bg-neutral-950 text-white relative z-20 pb-32">
      {/* Top Floating Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-neutral-950/85 border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => {
              soundService.click();
              onBack();
            }}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-sm font-semibold transition-all group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-white/50">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>CASE STUDY // {isTwoTier ? '2-TIER FLASK & MYSQL ARCHITECTURE' : (isBoutique ? '11-TIER MICROSERVICES & GRPC' : (isEasyShop ? 'AWS EKS & DEVSECOPS' : 'GITOPS & DEVOPS'))}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundService.click()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-primary/20"
            >
              <Github size={15} />
              <span>GitHub Repo</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </nav>

      {/* Main Page Container */}
      <div className="max-w-6xl mx-auto px-6 pt-12">
        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-mono uppercase tracking-widest border border-primary/30">
              {isTwoTier ? 'Container Micro-Architecture' : (isBoutique ? 'Kubernetes Microservices' : (isEasyShop ? 'AWS Cloud Native' : 'DevSecOps Architecture'))}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs font-mono uppercase tracking-widest border border-white/10">
              {isTwoTier ? 'Docker Compose & K8s' : (isBoutique ? 'gRPC & Service Mesh' : (isEasyShop ? 'Amazon EKS & ECR' : 'Kubernetes GitOps'))}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase tracking-widest border border-emerald-500/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {isTwoTier ? 'Decoupled Python & MySQL' : (isBoutique ? '11 Polyglot Services' : (isEasyShop ? 'Live on AWS ALB (eu-west-1)' : 'Production Simulation'))}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            {project.title}
          </h1>

          <p className="text-white/70 text-lg md:text-xl max-w-4xl leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
            {project.tech.map(tech => (
              <span 
                key={tech} 
                className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono font-medium text-white/80 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Featured Live App Demo Screenshot - Original Colors */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16"
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl group">
            <div className="bg-neutral-900 px-6 py-3.5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 font-mono text-xs text-white/60">
                  {isTwoTier
                    ? 'flask-app.local:5000 // two-tier containerized architecture with mysql'
                    : (isBoutique
                      ? 'online-boutique.k8s.local // cloud-first 11-microservices gRPC platform'
                      : (isEasyShop 
                        ? 'k8s-easyshop-easyshop-8d5e6882e1-807577481.eu-west-1.elb.amazonaws.com // live aws application load balancer'
                        : 'wanderlust-travel-blog.k8s.local // live frontend application'))}
                </span>
              </div>
              <button
                onClick={() => setSelectedImage(featuredImage)}
                className="text-xs text-white/60 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Eye size={14} />
                <span>Expand Fullscreen</span>
              </button>
            </div>

            <div 
              className="relative aspect-[16/9] overflow-hidden bg-black/40 cursor-pointer" 
              onClick={() => setSelectedImage(featuredImage)}
            >
              <img
                src={featuredImage}
                alt={isTwoTier ? "Two-Tier Flask Application UI" : (isBoutique ? "Online Boutique Storefront Web UI" : (isEasyShop ? "EasyShop Live Application on AWS ALB" : "Wanderlust Travel Blog Web Application"))}
                className="w-full h-full object-cover object-top hover:scale-[1.01] transition-transform duration-500 opacity-100"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 bg-neutral-900/95 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Box size={18} className="text-primary" />
                  {isTwoTier
                    ? "Two-Tier Flask & MySQL Architecture UI"
                    : (isBoutique
                      ? "Online Boutique Cloud-First Storefront UI"
                      : (isEasyShop ? "EasyShop Live E-Commerce Web UI" : "Wanderlust Travel Blog Application UI"))}
                </h4>
                <p className="text-xs text-white/60 mt-1">
                  {isTwoTier
                    ? "Containerized Python 3.9 Flask frontend interfacing over a private Docker bridge network with a persistent MySQL 8.0 database."
                    : (isBoutique
                      ? "Production 11-tier microservices demo: frontend web in Go communicating via gRPC with 10 backend polyglot microservices and Redis cart storage."
                      : (isEasyShop 
                        ? "Live 3-tier application running on Amazon EKS, routed via AWS Application Load Balancer (ALB) and Kubernetes Ingress with Horizontal Pod Autoscaling."
                        : "Full-stack application deployed on Kubernetes cluster with multi-pod replica scaling, persistent volumes for images, and Ingress routing."))}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {isTwoTier && (
                  <button
                    onClick={() => setSelectedImage(twoTierScreenshots.architecture)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white text-xs font-mono transition-all shrink-0 border border-white/10"
                  >
                    <Eye size={13} />
                    <span>View Architecture Diagram</span>
                  </button>
                )}
                {isBoutique && (
                  <button
                    onClick={() => setSelectedImage(boutiqueScreenshots.frontendCheckout)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white text-xs font-mono transition-all shrink-0 border border-white/10"
                  >
                    <Eye size={13} />
                    <span>View Checkout Screen</span>
                  </button>
                )}
                {isEasyShop && (
                  <button
                    onClick={() => setSelectedImage(easyShopScreenshots.appLive2)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white text-xs font-mono transition-all shrink-0 border border-white/10"
                  >
                    <Eye size={13} />
                    <span>View UI State 2</span>
                  </button>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black text-xs font-bold uppercase tracking-wider transition-all shrink-0"
                >
                  <span>View Codebase</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Deep-Dive Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
            {currentTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundService.click();
                    setActiveTab(tab.id);
                  }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* EASYSHOP TABS IMPLEMENTATION                                  */}
        {/* ------------------------------------------------------------- */}
        {isEasyShop && (
          <>
            {/* Tab 1: AWS & Architecture */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="grid md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-7 space-y-6">
                    <h3 className="text-2xl font-bold tracking-tight">End-to-End DevSecOps on AWS EKS</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      The EasyShop platform delivers a robust, enterprise-grade cloud deployment: source code commits trigger Jenkins pipelines that validate code quality via SonarQube, execute vulnerability scans via Trivy, build container images, push them to private Amazon ECR, and orchestrate zero-downtime rollouts on Amazon EKS exposed through AWS Application Load Balancers.
                    </p>

                    <div className="space-y-4">
                      {[
                        { title: "Source Control Integration", desc: "Developers push code updates to the GitHub repository with automated webhook integration." },
                        { title: "Jenkins CI/CD Automation", desc: "Automated pipeline checks out source, executes tests, and manages image builds and deployments." },
                        { title: "SonarQube & Trivy Security Gate", desc: "Performs static code quality analysis and scans container filesystems & OS packages for CVEs." },
                        { title: "Amazon Elastic Container Registry (ECR)", desc: "Stores immutable, version-tagged Docker container images in a private AWS registry." },
                        { title: "Amazon Elastic Kubernetes Service (EKS)", desc: "Runs containerized workloads with Kubernetes Deployments, Services, and Namespaces." },
                        { title: "AWS Application Load Balancer & Ingress", desc: "Directs internet traffic through Kubernetes Ingress to healthy application pods." },
                        { title: "Horizontal Pod Autoscaler (HPA)", desc: "Dynamically scales pod replicas up or down based on observed CPU and memory load." }
                      ].map((step, i) => (
                        <div key={i} className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/5">
                          <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                            0{i + 1}
                          </div>
                          <div>
                            <h5 className="text-sm font-bold text-white">{step.title}</h5>
                            <p className="text-xs text-white/50 mt-0.5">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-5 space-y-6">
                    {/* Architecture Flow Diagram Box */}
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 p-5">
                      <div className="flex items-center justify-between mb-3 text-xs font-mono text-white/50">
                        <span>AWS_EKS // ARCHITECTURE_FLOW</span>
                        <span className="text-emerald-400">AWS eu-west-1</span>
                      </div>
                      
                      <div className="p-4 rounded-xl bg-black/60 font-mono text-xs text-white/70 border border-white/5 space-y-2 leading-relaxed">
                        <div className="text-primary font-bold">DEVELOPER ➔ GITHUB REPO</div>
                        <div className="text-white/40">  │</div>
                        <div className="text-amber-400 font-bold">  ▼ JENKINS CI/CD ENGINE</div>
                        <div className="text-white/50">  ├─ SonarQube Quality Analysis</div>
                        <div className="text-white/50">  ├─ Trivy Security & Secret Scan</div>
                        <div className="text-white/50">  └─ Docker Multi-Stage Build</div>
                        <div className="text-white/40">  │</div>
                        <div className="text-sky-400 font-bold">  ▼ AMAZON ECR (Private Registry)</div>
                        <div className="text-white/40">  │</div>
                        <div className="text-emerald-400 font-bold">  ▼ AMAZON EKS (Kubernetes Cluster)</div>
                        <div className="text-white/50">  ├─ Deployment (3+ Replicas)</div>
                        <div className="text-white/50">  ├─ Service (ClusterIP / NodePort)</div>
                        <div className="text-white/50">  ├─ Ingress + AWS ALB Controller</div>
                        <div className="text-white/50">  └─ Horizontal Pod Autoscaler (HPA)</div>
                        <div className="text-white/40">  │</div>
                        <div className="text-primary font-bold">  ▼ AWS APPLICATION LOAD BALANCER</div>
                        <div className="text-emerald-400 text-[11px]">  ➔ LIVE EASYSHOP WEB APPLICATION</div>
                      </div>

                      <p className="text-[11px] text-white/40 text-center mt-3 font-mono">
                        Cloud-native AWS delivery stack with automated shift-left security
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-white/5 to-transparent border border-primary/20">
                      <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                        <Shield size={16} /> Key Production Capabilities
                      </h4>
                      <ul className="space-y-2.5 text-xs text-white/70">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          <span>100% automated CI/CD pipeline triggering on Git commits</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          <span>Strict SonarQube quality gate & Trivy CVE vulnerability scan</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          <span>Private container image storage in Amazon ECR</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          <span>Layer-7 load balancing via AWS Application Load Balancer</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          <span>Automatic scale-out under traffic spikes via Kubernetes HPA</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          <span>Least-privilege AWS IAM roles for EKS and ALB controller</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 2: Jenkins, SonarQube & Trivy CI/CD */}
            {activeTab === 'cicd' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Jenkins Pipeline Stage View */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal size={16} className="text-primary" />
                        <span className="text-xs font-mono font-bold text-white">03-jenkins-pipeline.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(easyShopScreenshots.jenkins)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(easyShopScreenshots.jenkins)}>
                      <img src={easyShopScreenshots.jenkins} alt="Jenkins CI/CD Pipeline" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">Jenkins Pipeline Execution</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        End-to-end automated Jenkins pipeline with stages: Git Checkout, SonarQube Quality Analysis, Trivy Filesystem Scan, Docker Build, Amazon ECR Publish, Kubernetes EKS Deployment, and Email Alerting.
                      </p>
                    </div>
                  </div>

                  {/* SonarQube Dashboard */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield size={16} className="text-emerald-400" />
                        <span className="text-xs font-mono font-bold text-white">04-sonarqube-dashboard.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(easyShopScreenshots.sonarqube)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(easyShopScreenshots.sonarqube)}>
                      <img src={easyShopScreenshots.sonarqube} alt="SonarQube Dashboard" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">SonarQube Code Quality Analysis</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Evaluates code reliability, security vulnerabilities, code smells, and technical debt. Enforces quality gates that must pass before artifacts can proceed to containerization.
                      </p>
                    </div>
                  </div>

                  {/* Trivy Security Scan */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield size={16} className="text-amber-400" />
                        <span className="text-xs font-mono font-bold text-white">17-trivy-security-scan.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(easyShopScreenshots.trivy)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(easyShopScreenshots.trivy)}>
                      <img src={easyShopScreenshots.trivy} alt="Trivy Security Scan" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">Trivy Vulnerability & Secret Scanning</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Comprehensive security audit checking the application filesystem, OS packages, and Docker image layers for known CVEs, misconfigurations, and hardcoded secrets.
                      </p>
                    </div>
                  </div>

                  {/* Docker Build & Gmail Notification */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-rose-400" />
                        <span className="text-xs font-mono font-bold text-white">19-gmail-notification.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(easyShopScreenshots.gmail)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(easyShopScreenshots.gmail)}>
                      <img src={easyShopScreenshots.gmail} alt="Gmail CI/CD Notification" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">Automated CI/CD Email Alerts</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Jenkins email extension sends instant status notifications to the engineering team upon pipeline completion, including build numbers, commit IDs, and deployment status.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 3: Amazon ECR & EKS Cluster */}
            {activeTab === 'ecr_eks' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Amazon ECR Repository */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Server size={16} className="text-primary" />
                        <span className="text-xs font-mono font-bold text-white">06-ecr-repository.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(easyShopScreenshots.ecrRepo)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(easyShopScreenshots.ecrRepo)}>
                      <img src={easyShopScreenshots.ecrRepo} alt="Amazon ECR Repository" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">Amazon ECR Private Repository</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        High-performance, secure private container registry hosting EasyShop image artifacts with tag immutability and scan-on-push policies enabled.
                      </p>
                    </div>
                  </div>

                  {/* ECR Container Images */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Box size={16} className="text-sky-400" />
                        <span className="text-xs font-mono font-bold text-white">07-ecr-images.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(easyShopScreenshots.ecrImages)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(easyShopScreenshots.ecrImages)}>
                      <img src={easyShopScreenshots.ecrImages} alt="Amazon ECR Images" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">Versioned Image Artifacts</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Container tags generated per Jenkins build with automated vulnerability scanning metrics visible directly inside AWS Management Console.
                      </p>
                    </div>
                  </div>

                  {/* Amazon EKS Cluster */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cloud size={16} className="text-emerald-400" />
                        <span className="text-xs font-mono font-bold text-white">08-eks-cluster.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(easyShopScreenshots.eksCluster)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(easyShopScreenshots.eksCluster)}>
                      <img src={easyShopScreenshots.eksCluster} alt="Amazon EKS Cluster" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">Production Amazon EKS Cluster</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Enterprise Kubernetes control plane configured in AWS region eu-west-1 (Ireland) with high-availability multi-AZ endpoint configuration.
                      </p>
                    </div>
                  </div>

                  {/* EKS Compute Resources */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu size={16} className="text-purple-400" />
                        <span className="text-xs font-mono font-bold text-white">09-eks-compute.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(easyShopScreenshots.eksCompute)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(easyShopScreenshots.eksCompute)}>
                      <img src={easyShopScreenshots.eksCompute} alt="Amazon EKS Compute" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">Managed EC2 Worker Node Groups</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        AWS managed node groups running Linux AMIs with automated instance lifecycle management, dynamic cluster autoscaling, and pod scheduling.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 4: AWS Application Load Balancer & Kubernetes Ingress */}
            {activeTab === 'alb_ingress' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* AWS ALB */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe size={16} className="text-primary" />
                        <span className="text-xs font-mono font-bold text-white">10-aws-alb.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(easyShopScreenshots.awsAlb)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(easyShopScreenshots.awsAlb)}>
                      <img src={easyShopScreenshots.awsAlb} alt="AWS Application Load Balancer" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">AWS Application Load Balancer (ALB)</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Internet-facing ALB provisioned automatically by the AWS Load Balancer Controller, distributing public client requests across healthy container targets.
                      </p>
                    </div>
                  </div>

                  {/* Kubernetes Ingress */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GitBranch size={16} className="text-emerald-400" />
                        <span className="text-xs font-mono font-bold text-white">11-kubernetes-ingress.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(easyShopScreenshots.k8sIngress)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(easyShopScreenshots.k8sIngress)}>
                      <img src={easyShopScreenshots.k8sIngress} alt="Kubernetes Ingress" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">Kubernetes Ingress Manifest</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Ingress configuration mapping external HTTP paths to internal Kubernetes services with health check annotations and target-type IP routing.
                      </p>
                    </div>
                  </div>

                  {/* Kubernetes Services */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl md:col-span-2">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Box size={16} className="text-sky-400" />
                        <span className="text-xs font-mono font-bold text-white">21-kubernetes-services.png // service routing</span>
                      </div>
                      <button onClick={() => setSelectedImage(easyShopScreenshots.k8sServices)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand Fullscreen
                      </button>
                    </div>
                    <div className="aspect-[21/9] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(easyShopScreenshots.k8sServices)}>
                      <img src={easyShopScreenshots.k8sServices} alt="Kubernetes Services" className="w-full h-full object-cover object-top hover:scale-[1.01] transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">Service Endpoints & Workload Networking</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Stable internal networking layer managing service IP discovery, port forwarding, and readiness probe health checking across EasyShop pods.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 5: Horizontal Pod Autoscaler & IAM Roles */}
            {activeTab === 'hpa_iam' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* HPA Status */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity size={16} className="text-emerald-400" />
                        <span className="text-xs font-mono font-bold text-white">12-hpa-status.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(easyShopScreenshots.hpaStatus)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(easyShopScreenshots.hpaStatus)}>
                      <img src={easyShopScreenshots.hpaStatus} alt="Horizontal Pod Autoscaler Status" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">Horizontal Pod Autoscaler (HPA)</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Monitors real-time CPU utilization via metrics-server and dynamically increases or decreases replica count to maintain target thresholds during traffic peaks.
                      </p>
                    </div>
                  </div>

                  {/* HPA Details */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sliders size={16} className="text-primary" />
                        <span className="text-xs font-mono font-bold text-white">13-hpa-details.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(easyShopScreenshots.hpaDetails)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(easyShopScreenshots.hpaDetails)}>
                      <img src={easyShopScreenshots.hpaDetails} alt="HPA Details" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">Autoscaling Configuration Details</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Configured min/max replica boundaries (1 to 10 pods), scale-up velocity rules, and stabilization cooldown windows to eliminate thrashing.
                      </p>
                    </div>
                  </div>

                  {/* AWS IAM ALB Role */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock size={16} className="text-amber-400" />
                        <span className="text-xs font-mono font-bold text-white">14-iam-load-balancer-role.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(easyShopScreenshots.iamAlb)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(easyShopScreenshots.iamAlb)}>
                      <img src={easyShopScreenshots.iamAlb} alt="AWS IAM Load Balancer Role" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">Load Balancer Controller IAM Role</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Granular IAM policy allowing AWS Load Balancer Controller to manage target groups and ALBs using IRSA (IAM Roles for Service Accounts).
                      </p>
                    </div>
                  </div>

                  {/* EKS Cluster & Node IAM Roles */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock size={16} className="text-sky-400" />
                        <span className="text-xs font-mono font-bold text-white">15-iam-eks-cluster-role.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(easyShopScreenshots.iamCluster)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(easyShopScreenshots.iamCluster)}>
                      <img src={easyShopScreenshots.iamCluster} alt="Amazon EKS Cluster IAM Role" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">EKS Least-Privilege IAM Roles</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Dedicated IAM roles for the Amazon EKS master control plane and worker nodes, enforcing strict principle of least privilege across AWS resources.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* ------------------------------------------------------------- */}
        {/* ONLINE BOUTIQUE MICROSERVICES TABS IMPLEMENTATION              */}
        {/* ------------------------------------------------------------- */}
        {isBoutique && (
          <>
            {/* Tab 1: 11 Microservices & gRPC Architecture */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="grid md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-7 space-y-6">
                    <h3 className="text-2xl font-bold tracking-tight">11-Tier Microservices Architecture & gRPC Mesh</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Online Boutique is a cloud-first, enterprise-grade e-commerce microservices platform. Engineered with 11 polyglot services written across Go, C#, Node.js, Python, and Java, it leverages low-latency, binary Protocol Buffers over gRPC for East-West service-to-service communication and an in-memory Redis cluster for distributed shopping cart state.
                    </p>

                    <div className="space-y-4">
                      {[
                        { title: "Polyglot Microservices", desc: "11 isolated services written in Go, C# .NET, Node.js, Python, and Java, containerized for independence and decoupled rollouts." },
                        { title: "High-Performance gRPC Communication", desc: "Binary serialization with Protocol Buffers over HTTP/2, reducing network overhead and serialization latency between services." },
                        { title: "Distributed Cart Persistence with Redis", desc: "Cart service securely persists user shopping sessions in Redis cache with sub-millisecond retrieval times." },
                        { title: "Distributed Saga Orchestration", desc: "Checkout service acts as the saga orchestrator, coordinating cart retrieval, currency conversion, shipping quotation, payment authorization, and email notification." },
                        { title: "Synthetic Traffic Generation", desc: "Integrated Locust load generator continuously simulates realistic user shopping flows to validate cluster resilience and auto-scaling." },
                        { title: "Observability & Service Mesh", desc: "Equipped with OpenTelemetry distributed trace headers, Prometheus metrics exposition, and Istio mutual TLS service mesh." }
                      ].map((step, i) => (
                        <div key={i} className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/5">
                          <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                            0{i + 1}
                          </div>
                          <div>
                            <h5 className="text-sm font-bold text-white">{step.title}</h5>
                            <p className="text-xs text-white/50 mt-0.5">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-5 space-y-6">
                    {/* Architecture Flow Diagram Card */}
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 p-5">
                      <div className="flex items-center justify-between mb-3 text-xs font-mono text-white/50">
                        <span>ARCHITECTURE // DIAGRAM</span>
                        <button 
                          onClick={() => setSelectedImage(boutiqueScreenshots.architecture)}
                          className="text-primary hover:text-white flex items-center gap-1 text-xs"
                        >
                          <Eye size={12} /> Expand
                        </button>
                      </div>

                      <div 
                        onClick={() => setSelectedImage(boutiqueScreenshots.architecture)}
                        className="rounded-xl overflow-hidden bg-black/60 border border-white/10 cursor-pointer group"
                      >
                        <img 
                          src={boutiqueScreenshots.architecture} 
                          alt="Online Boutique Architecture Diagram" 
                          className="w-full object-contain hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="p-4 mt-3 rounded-xl bg-black/60 font-mono text-xs text-white/70 border border-white/5 space-y-1.5 leading-relaxed">
                        <div className="text-primary font-bold">INTERNET ➔ FRONTEND (Go HTTP Server)</div>
                        <div className="text-white/40">  │ (gRPC / Protobuf calls)</div>
                        <div className="text-emerald-400 font-bold">  ├─ cartservice (C#) ➔ redis-cart (Redis:6379)</div>
                        <div className="text-sky-400 font-bold">  ├─ productcatalogservice (Go)</div>
                        <div className="text-amber-400 font-bold">  ├─ currencyservice (Node.js - High QPS)</div>
                        <div className="text-purple-400 font-bold">  ├─ recommendationservice (Python)</div>
                        <div className="text-rose-400 font-bold">  ├─ adservice (Java)</div>
                        <div className="text-primary font-bold">  └─ checkoutservice (Go Saga Orchestrator)</div>
                        <div className="text-white/40">       ├─ paymentservice (Node.js)</div>
                        <div className="text-white/40">       ├─ shippingservice (Go)</div>
                        <div className="text-white/40">       └─ emailservice (Python)</div>
                      </div>

                      <p className="text-[11px] text-white/40 text-center mt-3 font-mono">
                        Click image to examine high-resolution gRPC architecture
                      </p>
                    </div>

                    {/* Key Technical Highlights */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-white/5 to-transparent border border-primary/20">
                      <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                        <Shield size={16} /> Production Microservice Capabilities
                      </h4>
                      <ul className="space-y-2.5 text-xs text-white/70">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          <span>11 decoupled services communicating over HTTP/2 gRPC</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          <span>Strict contract definitions using Protocol Buffers (.proto)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          <span>Sub-millisecond cart caching via Redis in-memory store</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          <span>Skaffold & Kustomize for automated multi-environment deployments</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          <span>Istio service mesh ready with mutual TLS and traffic shaping</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Additional Screenshots Grid */}
                <div className="pt-8 border-t border-white/10">
                  <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <Eye size={18} className="text-primary" />
                    <span>Visual Evidence & Storefront Flow</span>
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                      <div className="p-4 border-b border-white/10 flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-white">online-boutique-frontend-1.png</span>
                        <button onClick={() => setSelectedImage(boutiqueScreenshots.frontendHome)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                          <Eye size={14} /> Expand
                        </button>
                      </div>
                      <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(boutiqueScreenshots.frontendHome)}>
                        <img src={boutiqueScreenshots.frontendHome} alt="Storefront Homepage" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                      </div>
                      <div className="p-5">
                        <h5 className="text-sm font-bold text-white mb-1">E-Commerce Storefront Catalog</h5>
                        <p className="text-xs text-white/50">User browsing interface served by the Go HTTP frontend, dynamically querying product catalog and contextual ads.</p>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                      <div className="p-4 border-b border-white/10 flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-white">online-boutique-frontend-2.png</span>
                        <button onClick={() => setSelectedImage(boutiqueScreenshots.frontendCheckout)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                          <Eye size={14} /> Expand
                        </button>
                      </div>
                      <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(boutiqueScreenshots.frontendCheckout)}>
                        <img src={boutiqueScreenshots.frontendCheckout} alt="Order Checkout Screen" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                      </div>
                      <div className="p-5">
                        <h5 className="text-sm font-bold text-white mb-1">Multi-Service Order Confirmation</h5>
                        <p className="text-xs text-white/50">Successful distributed checkout saga execution completing payment, shipping quote, order ID creation, and email notification.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 2: Polyglot Services Matrix */}
            {activeTab === 'services' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2">Polyglot Microservices Directory</h3>
                  <p className="text-white/60 text-sm max-w-3xl leading-relaxed">
                    Online Boutique is composed of 11 distinct microservices implemented in 5 diverse programming languages. Each service encapsulates its own domain, business logic, runtime dependencies, and API contract defined with Protocol Buffers in the <code className="text-primary font-mono text-xs">/protos</code> directory.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: "frontend", lang: "Go", port: "HTTP 80/8080", desc: "Exposes HTTP web server to serve the customer frontend. Generates session IDs automatically and coordinates user requests.", color: "border-sky-500/30 bg-sky-500/5 text-sky-400" },
                    { name: "cartservice", lang: "C# (.NET 8)", port: "gRPC 7070", desc: "Manages items in user shopping carts, serializing and persisting cart items directly in Redis for fast access.", color: "border-purple-500/30 bg-purple-500/5 text-purple-400" },
                    { name: "productcatalogservice", lang: "Go", port: "gRPC 3550", desc: "Provides product listings from a JSON catalog file and handles live keyword-based product search queries.", color: "border-sky-500/30 bg-sky-500/5 text-sky-400" },
                    { name: "currencyservice", lang: "Node.js", port: "gRPC 7000", desc: "Calculates real-time currency conversions using exchange rates from the European Central Bank. Highest QPS service.", color: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400" },
                    { name: "paymentservice", lang: "Node.js", port: "gRPC 50051", desc: "Processes credit card information, validates card details, authorizes payments, and returns unique transaction IDs.", color: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400" },
                    { name: "shippingservice", lang: "Go", port: "gRPC 50051", desc: "Calculates shipping cost estimates based on cart weight and item count, and mocks package delivery tracking.", color: "border-sky-500/30 bg-sky-500/5 text-sky-400" },
                    { name: "emailservice", lang: "Python", port: "gRPC 8080", desc: "Generates and sends transactional order confirmation emails with summary tables upon successful checkout.", color: "border-amber-500/30 bg-amber-500/5 text-amber-400" },
                    { name: "checkoutservice", lang: "Go", port: "gRPC 5050", desc: "Distributed saga coordinator: retrieves cart, prepares order, coordinates payment, shipping, and email dispatches.", color: "border-sky-500/30 bg-sky-500/5 text-sky-400" },
                    { name: "recommendationservice", lang: "Python", port: "gRPC 8080", desc: "Contextual recommendation engine suggesting 4 related catalog items based on products added to the user's cart.", color: "border-amber-500/30 bg-amber-500/5 text-amber-400" },
                    { name: "adservice", lang: "Java", port: "gRPC 9555", desc: "Parses contextual keywords from the browsing user's current session and serves relevant marketing text advertisements.", color: "border-rose-500/30 bg-rose-500/5 text-rose-400" },
                    { name: "loadgenerator", lang: "Python / Locust", port: "Headless", desc: "Continuously runs synthetic shopping traffic (browse, add to cart, checkout) to generate real production load on Kubernetes.", color: "border-orange-500/30 bg-orange-500/5 text-orange-400" },
                    { name: "redis-cart", lang: "Redis Alpine", port: "TCP 6379", desc: "In-memory distributed key-value cache providing sub-millisecond read/write latency for active cart storage.", color: "border-red-500/30 bg-red-500/5 text-red-400" }
                  ].map((svc, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-neutral-900 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <h4 className="text-base font-mono font-bold text-white">{svc.name}</h4>
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${svc.color}`}>
                            {svc.lang}
                          </span>
                        </div>
                        <p className="text-xs text-white/60 leading-relaxed mb-4">
                          {svc.desc}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                        <span>PORT / PROTOCOL</span>
                        <span className="text-white/80 font-bold">{svc.port}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab 3: Kubernetes Workloads & Manifests */}
            {activeTab === 'kubernetes' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2">Kubernetes Workloads & Deployment Status</h3>
                  <p className="text-white/60 text-sm max-w-3xl leading-relaxed">
                    All 11 microservices plus the Redis cache run as standalone Kubernetes Deployments with corresponding ClusterIP Services, strict liveness/readiness probes using gRPC health checking, non-root security contexts, and resource quotas.
                  </p>
                </div>

                {/* Kubernetes Pods Terminal View */}
                <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-2xl">
                  <div className="p-4 border-b border-white/10 bg-neutral-950 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Terminal size={16} className="text-emerald-400" />
                      <span className="text-xs font-mono font-bold text-white">kubectl get pods -n default</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      12/12 Pods Running (100% Healthy)
                    </span>
                  </div>

                  <div className="p-6 bg-black/80 font-mono text-xs overflow-x-auto text-white/80 space-y-2">
                    <div className="text-white/40 border-b border-white/10 pb-2 flex justify-between">
                      <span>NAME</span>
                      <span className="hidden sm:inline">READY</span>
                      <span>STATUS</span>
                      <span className="hidden md:inline">RESTARTS</span>
                      <span className="hidden md:inline">AGE</span>
                    </div>
                    {[
                      { name: "adservice-76bdd69666-ckc5j", ready: "1/1", status: "Running", restarts: "0", age: "2m58s" },
                      { name: "cartservice-66d497c6b7-dp5jr", ready: "1/1", status: "Running", restarts: "0", age: "2m59s" },
                      { name: "checkoutservice-666c784bd6-4jd22", ready: "1/1", status: "Running", restarts: "0", age: "3m1s" },
                      { name: "currencyservice-5d5d496984-4jmd7", ready: "1/1", status: "Running", restarts: "0", age: "2m59s" },
                      { name: "emailservice-667457d9d6-75jcq", ready: "1/1", status: "Running", restarts: "0", age: "3m2s" },
                      { name: "frontend-6b8d69b9fb-wjqdg", ready: "1/1", status: "Running", restarts: "0", age: "3m1s" },
                      { name: "loadgenerator-665b5cd444-gwqdq", ready: "1/1", status: "Running", restarts: "0", age: "3m0s" },
                      { name: "paymentservice-68596d6dd6-bf6bv", ready: "1/1", status: "Running", restarts: "0", age: "3m0s" },
                      { name: "productcatalogservice-557d474574-888kr", ready: "1/1", status: "Running", restarts: "0", age: "3m0s" },
                      { name: "recommendationservice-69c56b74d4-7z8r5", ready: "1/1", status: "Running", restarts: "0", age: "3m1s" },
                      { name: "redis-cart-5f59546cdd-5jnqf", ready: "1/1", status: "Running", restarts: "0", age: "2m58s" },
                      { name: "shippingservice-6ccc89f8fd-v686r", ready: "1/1", status: "Running", restarts: "0", age: "2m58s" },
                    ].map((pod, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1 hover:bg-white/5 px-2 rounded transition-colors">
                        <span className="text-sky-300 font-semibold truncate mr-4">{pod.name}</span>
                        <span className="hidden sm:inline text-white/60">{pod.ready}</span>
                        <span className="text-emerald-400 font-bold">{pod.status}</span>
                        <span className="hidden md:inline text-white/50">{pod.restarts}</span>
                        <span className="hidden md:inline text-white/40">{pod.age}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-neutral-950 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-white/60">
                    <span className="font-mono">kubectl get service frontend-external</span>
                    <span className="text-primary font-mono font-bold">EXTERNAL-IP // Accessible on Port 80</span>
                  </div>
                </div>

                {/* Key Manifest Highlights */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10">
                    <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                      <Shield size={16} className="text-emerald-400" />
                      <span>Security Contexts</span>
                    </h4>
                    <p className="text-xs text-white/50 leading-relaxed">
                      All container workloads specify <code className="text-emerald-400 font-mono">readOnlyRootFilesystem: true</code>, run as non-root users (<code className="text-emerald-400 font-mono">runAsNonRoot: true</code>), and drop all Linux kernel capabilities (<code className="text-emerald-400 font-mono">capabilities: drop: ["ALL"]</code>).
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10">
                    <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                      <Activity size={16} className="text-sky-400" />
                      <span>gRPC Health Checking</span>
                    </h4>
                    <p className="text-xs text-white/50 leading-relaxed">
                      Every gRPC service implements the standard Kubernetes <code className="text-sky-400 font-mono">grpc.health.v1.Health</code> service with automated liveness and readiness probes to ensure zero dropped requests during pod rollouts.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10">
                    <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                      <Sliders size={16} className="text-amber-400" />
                      <span>Resource Limits & QoS</span>
                    </h4>
                    <p className="text-xs text-white/50 leading-relaxed">
                      Configured fine-grained CPU and memory <code className="text-amber-400 font-mono">requests</code> and <code className="text-amber-400 font-mono">limits</code> preventing noisy neighbor starvation and enabling predictable HPA scaling metrics.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 4: Helm Charts & Kustomize Overlays */}
            {activeTab === 'helm_kustomize' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2">Helm Packaging & Kustomize Overlays</h3>
                  <p className="text-white/60 text-sm max-w-3xl leading-relaxed">
                    Online Boutique supports modular deployment variants using both Helm charts and Kustomize components. Whether deploying to local Minikube, GKE, EKS, or integrating external Memorystore/Spanner databases, declarative overlays parameterize the stack without duplicating manifests.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div className="space-y-6">
                    <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                      <div className="p-4 border-b border-white/10 flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-white">docs/img/memorystore.png</span>
                        <button onClick={() => setSelectedImage(boutiqueScreenshots.memorystore)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                          <Eye size={14} /> Expand
                        </button>
                      </div>
                      <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(boutiqueScreenshots.memorystore)}>
                        <img src={boutiqueScreenshots.memorystore} alt="Google Cloud Memorystore Architecture" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                      </div>
                      <div className="p-6">
                        <h4 className="text-base font-bold text-white mb-2">External Managed Redis Overlays</h4>
                        <p className="text-xs text-white/50 leading-relaxed">
                          Using Kustomize components, the in-cluster Redis container can be replaced with Google Cloud Memorystore or AWS ElastiCache for enterprise high availability, cross-AZ failover, and automatic backups.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10">
                      <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                        <Package size={18} className="text-primary" />
                        <span>Helm Chart Management (`helm-chart/`)</span>
                      </h4>
                      <p className="text-xs text-white/60 leading-relaxed mb-4">
                        The entire 11-microservice topology is packaged into a unified Helm chart. Engineers can configure replica counts, service types (ClusterIP, NodePort, LoadBalancer), ingress annotations, and enable optional feature flags via simple <code className="text-primary font-mono">values.yaml</code> overrides.
                      </p>
                      <div className="p-4 rounded-xl bg-black/60 font-mono text-xs text-white/70 border border-white/5 space-y-1">
                        <div className="text-primary"># Deploy with Helm</div>
                        <div>helm install online-boutique ./helm-chart \</div>
                        <div className="text-emerald-400">  --set frontend.externalService=true \</div>
                        <div className="text-emerald-400">  --set cartservice.redis.external=true</div>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10">
                      <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                        <Layers size={18} className="text-sky-400" />
                        <span>Kustomize Environment Overlays (`kustomize/`)</span>
                      </h4>
                      <p className="text-xs text-white/60 leading-relaxed mb-4">
                        Declarative overlays allow stacking specialized components without touching base YAMLs:
                      </p>
                      <ul className="space-y-2 text-xs text-white/70">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-sky-400 shrink-0" />
                          <span><strong>Istio Overlay</strong>: injects sidecar proxies & virtual services</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-sky-400 shrink-0" />
                          <span><strong>Google Cloud Operations</strong>: telemetry collectors & distributed traces</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-sky-400 shrink-0" />
                          <span><strong>Spanner Overlay</strong>: replaces catalog with Google Cloud Spanner</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 5: Istio Service Mesh & Tracing */}
            {activeTab === 'mesh_tracing' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2">Istio Service Mesh & Distributed Tracing</h3>
                  <p className="text-white/60 text-sm max-w-3xl leading-relaxed">
                    Production microservices require robust networking control, end-to-end encryption, and deep call observability. Online Boutique integrates Istio service mesh and OpenTelemetry distributed trace propagation across all 11 polyglot gRPC services.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-white">collector-model.png</span>
                      <button onClick={() => setSelectedImage(boutiqueScreenshots.collectorModel)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(boutiqueScreenshots.collectorModel)}>
                      <img src={boutiqueScreenshots.collectorModel} alt="Cloud Operations Telemetry Collector Model" className="w-full h-full object-contain hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">OpenTelemetry Collector Model</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Architecture illustrating application container metrics and trace spans collected via sidecars, aggregated through the OpenTelemetry daemonset, and exported to Cloud Trace and Prometheus.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10">
                      <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                        <Network size={18} className="text-primary" />
                        <span>Istio Mutual TLS & Zero Trust</span>
                      </h4>
                      <p className="text-xs text-white/60 leading-relaxed mb-4">
                        With Envoy sidecars auto-injected into pod replicas, Istio enforces STRICT mutual TLS (mTLS) encryption for all in-transit East-West network packets between microservices, securing payment and cart transactions.
                      </p>
                      <div className="p-4 rounded-xl bg-black/60 font-mono text-xs text-white/70 border border-white/5 space-y-1">
                        <div className="text-emerald-400">apiVersion: security.istio.io/v1beta1</div>
                        <div>kind: PeerAuthentication</div>
                        <div>spec:</div>
                        <div className="text-primary">  mtls:</div>
                        <div className="text-primary">    mode: STRICT</div>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10">
                      <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                        <Activity size={18} className="text-amber-400" />
                        <span>Synthetic Traffic & Load Generation</span>
                      </h4>
                      <p className="text-xs text-white/60 leading-relaxed">
                        The built-in <code className="text-amber-400 font-mono">loadgenerator</code> microservice runs Python Locust workers that constantly execute realistic shopping workflows (visiting home, selecting currencies, browsing categories, adding items to carts, and checking out). This generates real-time telemetry, validates Horizontal Pod Autoscaling triggers, and confirms resilience under traffic spikes.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TWO-TIER FLASK TABS IMPLEMENTATION                            */}
        {/* ------------------------------------------------------------- */}
        {isTwoTier && (
          <TwoTierFlaskDetails 
            activeTab={activeTab} 
            onSelectImage={setSelectedImage} 
            soundService={soundService} 
          />
        )}

        {/* ------------------------------------------------------------- */}
        {/* WANDERLUST TABS IMPLEMENTATION                                */}
        {/* ------------------------------------------------------------- */}
        {!isEasyShop && !isBoutique && !isTwoTier && (
          <>
            {/* Tab 1: Solution Architecture */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="grid md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-7 space-y-6">
                    <h3 className="text-2xl font-bold tracking-tight">End-to-End GitOps & DevSecOps Flow</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      The Wanderlust project is built around the GitOps paradigm: every commit to Git triggers a fully automated chain of quality and security checks, generates immutable Docker containers, and updates declarative Kubernetes manifests.
                    </p>

                    <div className="space-y-4">
                      {[
                        { title: "Source Control Management", desc: "Developer pushes application code to GitHub repository with commit tracking." },
                        { title: "Automated Jenkins Pipeline", desc: "Checks out code, executes unit tests, builds artifacts, and runs security scanners." },
                        { title: "Shift-Left Security Gate", desc: "Trivy scans the codebase and dependencies; SonarQube analyzes code smells and vulnerabilities." },
                        { title: "Container Registry Delivery", desc: "Docker multi-stage builds create lightweight images published directly to Docker Hub." },
                        { title: "Declarative GitOps Sync", desc: "ArgoCD detects updated image tags in the GitOps repo and auto-reconciles Kubernetes pods." },
                        { title: "Real-Time Observability", desc: "Prometheus scrapes node & container metrics, visualized on Grafana, with Alertmanager rules." }
                      ].map((step, i) => (
                        <div key={i} className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/5">
                          <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                            0{i + 1}
                          </div>
                          <div>
                            <h5 className="text-sm font-bold text-white">{step.title}</h5>
                            <p className="text-xs text-white/50 mt-0.5">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-5 space-y-6">
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 p-4">
                      <div className="flex items-center justify-between mb-3 text-xs font-mono text-white/50">
                        <span>ARCH_OVERVIEW // DIAGRAM</span>
                        <button 
                          onClick={() => setSelectedImage(wanderlustScreenshots.architecture)}
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          <Eye size={12} /> View High-Res
                        </button>
                      </div>
                      <div 
                        className="aspect-square rounded-xl overflow-hidden bg-black/60 cursor-pointer border border-white/5"
                        onClick={() => setSelectedImage(wanderlustScreenshots.architecture)}
                      >
                        <img
                          src={wanderlustScreenshots.architecture}
                          alt="Solution Architecture Diagram"
                          className="w-full h-full object-contain p-2 hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <p className="text-[11px] text-white/40 text-center mt-3 font-mono">
                        End-to-End Architecture: Developer → Jenkins → SonarQube → Trivy → Docker Hub → ArgoCD → Kubernetes
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-white/5 to-transparent border border-primary/20">
                      <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                        <Shield size={16} /> Key Engineering Impact
                      </h4>
                      <ul className="space-y-2 text-xs text-white/70">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={13} className="text-emerald-400" />
                          Zero manual deployments directly to Kubernetes clusters
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={13} className="text-emerald-400" />
                          100% automated vulnerability scanning on every build
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={13} className="text-emerald-400" />
                          Instant rollback capability through Git commit reverting
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={13} className="text-emerald-400" />
                          Continuous drift detection and self-healing with ArgoCD
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 2: CI/CD & DevSecOps */}
            {activeTab === 'cicd' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Jenkins Stage View */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal size={16} className="text-primary" />
                        <span className="text-xs font-mono font-bold text-white">01-jenkins-stage-view.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(wanderlustScreenshots.jenkins)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(wanderlustScreenshots.jenkins)}>
                      <img src={wanderlustScreenshots.jenkins} alt="Jenkins Pipeline Stage View" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">Jenkins Pipeline Execution</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Automated pipeline orchestration covering source checkout, static testing, Trivy filesystem scan, SonarQube quality checks, Docker image compilation, image pushing, and GitOps manifest updates.
                      </p>
                    </div>
                  </div>

                  {/* SonarQube Quality Gate */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield size={16} className="text-emerald-400" />
                        <span className="text-xs font-mono font-bold text-white">03-sonarqube-quality-gate.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(wanderlustScreenshots.sonarqube)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(wanderlustScreenshots.sonarqube)}>
                      <img src={wanderlustScreenshots.sonarqube} alt="SonarQube Quality Gate Passed" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">SonarQube Quality Gate: PASSED</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Enforces strict code quality thresholds. The build is automatically halted if bugs, security hotspots, code smells, or duplicate code violations exceed production criteria.
                      </p>
                    </div>
                  </div>

                  {/* Docker Hub Registry */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Box size={16} className="text-sky-400" />
                        <span className="text-xs font-mono font-bold text-white">04-dockerhub-frontend-tags.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(wanderlustScreenshots.dockerhub)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(wanderlustScreenshots.dockerhub)}>
                      <img src={wanderlustScreenshots.dockerhub} alt="Docker Hub Image Tags" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">Docker Image Registry</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Immutable container images tagged with unique semantic versions and commit hashes, published to Docker Hub for deployment consumption by Kubernetes.
                      </p>
                    </div>
                  </div>

                  {/* SonarQube Deep Dashboard */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield size={16} className="text-primary" />
                        <span className="text-xs font-mono font-bold text-white">02-sonarqube-dashboard.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(wanderlustScreenshots.sonarDashboard)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(wanderlustScreenshots.sonarDashboard)}>
                      <img src={wanderlustScreenshots.sonarDashboard} alt="SonarQube Metrics Dashboard" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">Vulnerability & Quality Metrics</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Detailed dashboard displaying test coverage, 0 critical security vulnerabilities, code complexity, and maintainability grades before containerization.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 3: GitOps with ArgoCD */}
            {activeTab === 'gitops' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-2xl">
                  <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GitBranch size={16} className="text-emerald-400" />
                      <span className="text-xs font-mono font-bold text-white">05-argocd-dashboard.png // cluster synchronized</span>
                    </div>
                    <button onClick={() => setSelectedImage(wanderlustScreenshots.argocd)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                      <Eye size={14} /> Expand Fullscreen
                    </button>
                  </div>
                  <div className="aspect-[16/9] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(wanderlustScreenshots.argocd)}>
                    <img src={wanderlustScreenshots.argocd} alt="ArgoCD Application Dashboard" className="w-full h-full object-cover object-top hover:scale-[1.01] transition-transform" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-8 grid md:grid-cols-3 gap-6 bg-neutral-900/80">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">Continuous Sync</span>
                      <h4 className="text-base font-bold text-white">Automated Reconciliation</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        ArgoCD continuously watches the GitOps repo. When Jenkins commits a new image tag, ArgoCD automatically updates the Kubernetes cluster.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">Zero Drift</span>
                      <h4 className="text-base font-bold text-white">Self-Healing Infrastructure</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Any manual tampering or drift from the defined manifests inside the cluster is detected and automatically corrected back to the desired Git state.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">Reliability</span>
                      <h4 className="text-base font-bold text-white">1-Click Instant Rollback</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Rollback to any prior release is as simple as reverting a Git commit or triggering rollback directly from the ArgoCD dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 4: Kubernetes Deployment */}
            {activeTab === 'kubernetes' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-2xl">
                  <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Box size={16} className="text-sky-400" />
                      <span className="text-xs font-mono font-bold text-white">06-kubectl-pods.png // kubectl get pods -n wanderlust</span>
                    </div>
                    <button onClick={() => setSelectedImage(wanderlustScreenshots.kubernetes)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                      <Eye size={14} /> Expand Fullscreen
                    </button>
                  </div>
                  <div className="aspect-[16/9] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(wanderlustScreenshots.kubernetes)}>
                    <img src={wanderlustScreenshots.kubernetes} alt="Kubernetes Running Pods" className="w-full h-full object-cover object-top hover:scale-[1.01] transition-transform" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-8">
                    <h4 className="text-lg font-bold text-white mb-3">Multi-Tier Microservice Cluster Topology</h4>
                    <p className="text-xs text-white/50 leading-relaxed mb-6">
                      All workloads are scheduled across dedicated Kubernetes namespaces with resource limits, liveness/readiness probes, ClusterIP services, and Persistent Volume Claims for databases.
                    </p>

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { name: "Frontend Pods", role: "React + Vite UI", status: "Running (1/1)", color: "text-sky-400" },
                        { name: "Backend Pods", role: "Spring Boot API", status: "Running (1/1)", color: "text-emerald-400" },
                        { name: "MongoDB Pods", role: "Persistent Document DB", status: "Running (1/1)", color: "text-amber-400" },
                        { name: "Redis Pods", role: "In-Memory Session Cache", status: "Running (1/1)", color: "text-rose-400" },
                      ].map((pod, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                          <p className={`text-xs font-mono font-bold ${pod.color}`}>{pod.name}</p>
                          <p className="text-[11px] text-white/70 mt-1">{pod.role}</p>
                          <div className="flex items-center gap-1.5 mt-3 text-[10px] font-mono text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            {pod.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 5: Observability & Monitoring */}
            {activeTab === 'monitoring' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Prometheus Targets */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity size={16} className="text-amber-400" />
                        <span className="text-xs font-mono font-bold text-white">07-prometheus-targets.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(wanderlustScreenshots.prometheusTargets)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(wanderlustScreenshots.prometheusTargets)}>
                      <img src={wanderlustScreenshots.prometheusTargets} alt="Prometheus Targets" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">Prometheus Metric Scraping</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Continuous scraping from Kubernetes API server, kube-state-metrics, Node Exporter, and application endpoints to record latency, CPU, and memory footprints.
                      </p>
                    </div>
                  </div>

                  {/* Grafana Cluster Dashboard */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu size={16} className="text-primary" />
                        <span className="text-xs font-mono font-bold text-white">10-grafana-kubernetes-cluster.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(wanderlustScreenshots.grafanaCluster)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(wanderlustScreenshots.grafanaCluster)}>
                      <img src={wanderlustScreenshots.grafanaCluster} alt="Grafana Kubernetes Cluster" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">Grafana Cluster Visualizations</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Real-time visual monitoring dashboards displaying CPU saturation, memory spikes, pod restarts, and bandwidth bottlenecks across nodes.
                      </p>
                    </div>
                  </div>

                  {/* Prometheus Alerts */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity size={16} className="text-rose-400" />
                        <span className="text-xs font-mono font-bold text-white">08-prometheus-alerts.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(wanderlustScreenshots.prometheusAlerts)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(wanderlustScreenshots.prometheusAlerts)}>
                      <img src={wanderlustScreenshots.prometheusAlerts} alt="Prometheus Custom Alert Rules" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">Custom Prometheus Alert Rules</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        PrometheusRule custom resources monitoring backend pod failure, memory leaks, and high HTTP error rates (WanderlustBackendDown).
                      </p>
                    </div>
                  </div>

                  {/* Alertmanager Overview */}
                  <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity size={16} className="text-amber-400" />
                        <span className="text-xs font-mono font-bold text-white">12-grafana-alertmanager-overview.png</span>
                      </div>
                      <button onClick={() => setSelectedImage(wanderlustScreenshots.alertmanager)} className="text-xs text-white/50 hover:text-white flex items-center gap-1">
                        <Eye size={14} /> Expand
                      </button>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedImage(wanderlustScreenshots.alertmanager)}>
                      <img src={wanderlustScreenshots.alertmanager} alt="Alertmanager Dashboard" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-bold text-white mb-2">Alertmanager Dispatcher</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Deduplicates and routes alerts to notification channels with grouping and inhibition rules, ensuring on-call engineers are alerted instantly.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* Bottom CTA / Return section */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={() => {
              soundService.click();
              onBack();
            }}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold transition-all group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Portfolio</span>
          </button>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundService.click()}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xl shadow-primary/25"
          >
            <Github size={16} />
            <span>Explore {isTwoTier ? 'Two-Tier App' : (isBoutique ? 'Online Boutique' : (isEasyShop ? 'EasyShop' : 'Wanderlust'))} on GitHub</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Fullscreen Image Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md cursor-zoom-out select-none"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[92vh] flex flex-col items-center">
            <img
              src={selectedImage}
              alt="Expanded Project Screenshot"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-white/20 shadow-2xl opacity-100"
              referrerPolicy="no-referrer"
            />
            <p className="text-xs font-mono text-white/70 mt-3">Click anywhere to close full view</p>
          </div>
        </div>
      )}
    </div>
  );
};
