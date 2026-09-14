export const PERSONAL_DETAILS = {
  name: "Prasad Jadhav",
  role: "DevOps Engineer & Cloud Specialist",
  roles: [
    "DevOps Engineer",
    "Cloud Engineer",
    "Junior DevOps Engineer",
    "DevSecOps & Kubernetes Specialist",
    "CI/CD & Infrastructure Automation"
  ],
  intro: "DevOps and Cloud fresher with hands-on internship experience in network monitoring, infrastructure automation, and secure network design. Comfortable working across Linux, AWS, Docker, and Kubernetes, and have built several personal DevSecOps and Kubernetes projects to learn CI/CD tools like Jenkins, ArgoCD, Trivy, and Terraform in more depth. Interested in roles where I can grow into secure CI/CD pipelines, monitoring, and deployment work.",
  email: "pj344504@gmail.com",
  phone: "9082554518",
  linkedin: "https://www.linkedin.com/in/prasad-jadhav-19a35b413",
  github: "https://github.com/prasads-3",
  profileImage: "./profile.png",
  profileImageFallback: "https://lh3.googleusercontent.com/d/1_GogG-4pbaS8-t5yEqvRtvnl44zOBeQn",
  resumeUrl: "/resume.pdf",
  languages: ["English", "Hindi", "Marathi"],
  location: "Navi Mumbai / Mumbai, Maharashtra, India"
};

export const PROJECTS = [
  {
    id: "wanderlust-mega-project",
    title: "Wanderlust Mega Project – Production DevSecOps & GitOps Infrastructure",
    subtitle: "Jenkins | SonarQube | Trivy | Docker | Kubernetes | ArgoCD | Prometheus | Grafana | Alertmanager",
    description: "A production-grade DevSecOps and GitOps platform for the Wanderlust travel blog application. Features a 13-stage automated Jenkins CI/CD pipeline, SonarQube quality gates, Trivy security scanning, multi-stage Docker builds pushed to Docker Hub, GitOps continuous delivery via ArgoCD, Kubernetes cluster orchestration, and complete observability using Prometheus, Grafana, and Alertmanager.",
    image: "https://raw.githubusercontent.com/prasads-3/Wanderlust-Mega-Project/main/screenshots/application/13-wanderlust-homepage.png",
    tech: ["DevSecOps", "GitOps", "Jenkins", "Kubernetes", "ArgoCD", "Docker", "SonarQube", "Trivy", "Prometheus", "Grafana", "Alertmanager"],
    bullets: [
      "Automated CI/CD pipeline with Jenkins pulling source code, testing, building Docker images, and updating GitOps manifests",
      "Integrated SonarQube static code quality analysis and Trivy filesystem & container vulnerability scanning",
      "Implemented GitOps deployment using ArgoCD continuously syncing desired Kubernetes state from Git repository",
      "Orchestrated multi-tier containerized deployment: React frontend, Spring Boot backend, MongoDB, and Redis",
      "Full observability stack with Prometheus metrics collection, Grafana visualization dashboards, and Alertmanager alert rules"
    ],
    github: "https://github.com/prasads-3/Wanderlust-Mega-Project",
    live: "https://github.com/prasads-3/Wanderlust-Mega-Project",
    caseStudyUrl: "#/project/wanderlust-mega-project",
    screenshots: {
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
    }
  },
  {
    id: "easyshop-3tier-devsecops",
    title: "EasyShop – Production DevSecOps & AWS EKS Deployment",
    subtitle: "AWS EKS | Amazon ECR | Jenkins CI/CD | SonarQube | Trivy | Kubernetes Ingress | AWS ALB | HPA | IAM",
    description: "A production-grade DevSecOps and cloud-native deployment platform for the EasyShop e-commerce application on Amazon EKS. Features Jenkins CI/CD automation, SonarQube code quality gates, Trivy vulnerability & secret scanning, Docker multi-stage container builds pushed to private Amazon ECR, Kubernetes Ingress routing with AWS Application Load Balancer (ALB), Horizontal Pod Autoscaler (HPA) for dynamic traffic spikes, least-privilege AWS IAM roles, and automated Gmail CI/CD notifications.",
    image: "https://raw.githubusercontent.com/prasads-3/easyshop-3tier-devsecops/main/screenshots/01-easyshop-live.png",
    tech: ["AWS EKS", "Amazon ECR", "Jenkins", "Kubernetes", "AWS ALB", "SonarQube", "Trivy", "Docker", "HPA", "AWS IAM", "DevSecOps"],
    bullets: [
      "Automated application build, code quality analysis, vulnerability scanning, and deployment using Jenkins CI/CD pipeline",
      "Integrated SonarQube quality gates and Trivy container security scanners to enforce shift-left security standards",
      "Containerized microservices with Docker and published versioned images to private Amazon ECR repository",
      "Deployed resilient workloads to Amazon EKS cluster with Kubernetes Deployments, Services, and Namespaces",
      "Configured Kubernetes Ingress controller integrated with AWS Application Load Balancer (ALB) for high-availability traffic routing",
      "Implemented Horizontal Pod Autoscaler (HPA) to automatically scale application pods based on real-time CPU & memory metrics",
      "Enforced granular AWS IAM security policies for EKS Cluster, Worker Nodes, and AWS Load Balancer Controller",
      "Integrated automated CI/CD email notifications through Gmail for build status and deployment reporting"
    ],
    github: "https://github.com/prasads-3/easyshop-3tier-devsecops",
    live: "http://k8s-easyshop-easyshop-8d5e6882e1-807577481.eu-west-1.elb.amazonaws.com",
    caseStudyUrl: "#/project/easyshop-3tier-devsecops",
    screenshots: {
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
    }
  },
  {
    id: "online-boutique-microservices",
    title: "Online Boutique – Cloud-First 11-Tier Microservices Platform",
    subtitle: "Kubernetes | gRPC | Go | C# .NET | Node.js | Python | Java | Redis | Helm | Kustomize | Istio",
    description: "A production-grade, cloud-first 11-tier microservices e-commerce platform deployed on Kubernetes with high-performance gRPC service-to-service communication. Composed of 11 polyglot microservices written across Go, C#, Node.js, Python, and Java, backing distributed shopping cart state in Redis, end-to-end checkout sagas, declarative Helm charts, Kustomize environment overlays, synthetic traffic load generation using Locust, and Istio service mesh observability.",
    image: "https://raw.githubusercontent.com/prasads-3/microservices-demo/main/docs/img/online-boutique-frontend-1.png",
    tech: ["Kubernetes", "gRPC", "Microservices", "Go", "C# .NET", "Node.js", "Python", "Java", "Redis", "Helm", "Kustomize", "Istio"],
    bullets: [
      "Orchestrated 11 polyglot microservices (Go, C#, Node.js, Python, Java) communicating via high-performance gRPC and Protocol Buffers",
      "Configured Redis in-memory datastore for distributed shopping cart session management with high read/write throughput",
      "Managed declarative Kubernetes deployment manifests, namespaces, health checks (liveness/readiness probes), and resource quotas",
      "Packaged and parameterized microservice deployments utilizing Helm charts and Kustomize environment overlays",
      "Integrated Locust-based synthetic load generator to simulate realistic consumer browsing, cart additions, and checkouts",
      "Implemented service-to-service communication observability, Istio service mesh manifests, and distributed tracing"
    ],
    github: "https://github.com/prasads-3/microservices-demo",
    live: "https://github.com/prasads-3/microservices-demo",
    caseStudyUrl: "#/project/online-boutique-microservices",
    screenshots: {
      frontendHome: "https://raw.githubusercontent.com/prasads-3/microservices-demo/main/docs/img/online-boutique-frontend-1.png",
      frontendCheckout: "https://raw.githubusercontent.com/prasads-3/microservices-demo/main/docs/img/online-boutique-frontend-2.png",
      architecture: "https://raw.githubusercontent.com/prasads-3/microservices-demo/main/docs/img/architecture-diagram.png",
      memorystore: "https://raw.githubusercontent.com/prasads-3/microservices-demo/main/docs/img/memorystore.png",
      collectorModel: "https://raw.githubusercontent.com/prasads-3/microservices-demo/main/kustomize/components/google-cloud-operations/collector-model.png"
    }
  },
  {
    id: "two-tier-flask-app",
    title: "Two-Tier Flask Application – Containerized Cloud Architecture",
    subtitle: "Python Flask | MySQL | Docker Compose | Kubernetes | Persistent Volumes | Custom Bridge Network | CI/CD",
    description: "A production-grade, containerized two-tier web platform separating the Python Flask presentation/application layer from the relational MySQL database persistence tier. Features custom isolated Docker bridge networks, zero-data-loss named volume mounts, declarative Docker Compose multi-container environments, and enterprise Kubernetes orchestration with Deployments, ClusterIP database services, PersistentVolumeClaims, and external NodePort/LoadBalancer routing.",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1600&auto=format&fit=crop",
    tech: ["Python", "Flask", "MySQL", "Docker", "Docker Compose", "Kubernetes", "Linux", "CI/CD", "DevOps"],
    bullets: [
      "Containerized a 2-tier architecture decoupling the Python Flask web frontend from the relational MySQL database backend",
      "Authored lightweight, optimized multi-stage Dockerfiles utilizing Alpine base images, caching layers and reducing image size by 65%",
      "Engineered multi-container orchestration with Docker Compose, integrating service dependencies, healthchecks, and environment variables",
      "Configured isolated Docker bridge networks enabling secure DNS-based East-West container communication",
      "Guaranteed zero data loss across container lifecycle restarts with persistent volume bindings and Kubernetes PersistentVolumeClaims (PVC)",
      "Designed and deployed declarative Kubernetes manifests: Deployments, ClusterIP database internal services, NodePort web services, and ConfigMaps",
      "Automated CI/CD container build verification, vulnerability scanning with Trivy, and image publishing to Docker Hub"
    ],
    github: "https://github.com/prasads-3/two-tier-flask-app",
    live: "https://github.com/prasads-3/two-tier-flask-app",
    caseStudyUrl: "#/project/two-tier-flask-app",
    screenshots: {
      appPreview: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1600&auto=format&fit=crop",
      architecture: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1600&auto=format&fit=crop"
    }
  }
];

export const INTERNSHIPS = [
  {
    company: "Central Railway, CSMT Mumbai",
    role: "Network Infrastructure & OFC Support Intern",
    location: "Mumbai Division",
    duration: "Jun 2025 - Jul 2025",
    learnings: [
      "Reviewed railway OFC infrastructure and flagged vulnerabilities; suggested upgrades that improved reliability by about 15%.",
      "Documented telecom infrastructure procedures and troubleshooting steps for the team.",
      "Got hands-on with Linux CLI for network monitoring and supported change management work."
    ],
    certificate: {
      type: "central-railway",
      title: "CENTRAL RAILWAY",
      subtitle: "In-plant Training of Engineering Student",
      refNo: "BB/N/Misc/Corr.",
      date: "26.06.2025",
      recipient: "Mr. Prasad Harischandra Jadhav",
      details: "B.E Engineering student of MGM College of Engineering and Technology, Kamothe, Navi Mumbai-09",
      tenure: "11.06.2025 to 25.06.2025",
      body: "This is to certify that Mr. Prasad Harischandra Jadhav has undergone Inplant Training in S&T Branch of Mumbai Division for a period from 11.06.2025 to 25.06.2025 in the following fields:",
      bullets: [
        "OFC System",
        "Passenger Information System",
        "VOIP, Telephone Exchange",
        "Data Communication & Networking",
        "Working of Internet"
      ],
      signatory: "S.S. Barde",
      designation: "ADSTE (Tele/BY) / ADSTE (T) BY"
    }
  },
  {
    company: "B.G. Shirke Construction Technology Pvt. Ltd.",
    role: "Network & Systems Engineering Intern",
    location: "Mumbai",
    duration: "Aug 2025 - Dec 2025",
    learnings: [
      "Monitored server and network performance and availability using Zabbix, configuring alerts and dashboards for real-time visibility.",
      "Performed routing & switching tasks including VLAN configuration and Linux administration across IT infrastructure.",
      "Simulated security policies and network topologies using EVE-NG virtualized environments.",
      "Assisted in troubleshooting infrastructure connectivity issues across enterprise systems."
    ],
    certificate: {
      type: "bg-shirke",
      title: "B.G. SHIRKE CONSTRUCTION TECHNOLOGY PVT. LTD.",
      subtitle: "INTERNSHIP CERTIFICATE",
      refNo: "BGS/HR-IT/INT/2026/1042",
      date: "December 31, 2025",
      recipient: "Mr. Prasad Harischandra Jadhav",
      tenure: "August 01, 2025 to December 31, 2025",
      body: "This is to certify that Mr. Prasad Harischandra Jadhav has successfully completed his internship as a Network Engineering Intern within the Information Technology (IT) Department at B.G. Shirke Construction Technology Pvt. Ltd.",
      bullets: [
        "Infrastructure Administration: Routine troubleshooting of routing, switching, and Linux server connectivity.",
        "Infrastructure Monitoring: Implementing and managing Zabbix monitoring solutions to track health and minimize downtime.",
        "Network Simulation & Testing: Utilizing EVE-NG lab environments to architect virtual topologies prior to deployment.",
        "Systems Security: Demonstrating foundational understanding of secure infrastructure policies and firewall architectures."
      ],
      conduct: "During his internship, his conduct and performance were satisfactory. We wish him well in his future endeavors.",
      signatory: "S.B. Shirke",
      designation: "Head - IT Department"
    }
  }
];

export const EDUCATION = [
  {
    degree: "Bachelor of Engineering in Electronics & Telecommunication",
    institute: "MGM College of Engineering, Navi Mumbai",
    university: "Mumbai University",
    status: "In Progress (2022 - 2026)",
    year: "2022 – 2026"
  },
  {
    degree: "Diploma in Electronics & Telecommunication",
    institute: "NJBSPM, Panvel",
    university: "MSBTE",
    percentage: "64%",
    year: "2022"
  },
  {
    degree: "HSC (Higher Secondary Certificate)",
    institute: "AFAC Junior College",
    university: "HSC Board",
    percentage: "49.50%",
    year: "2020"
  },
  {
    degree: "SSC (Secondary School Certificate)",
    institute: "Mohite Patil Vidyalaya",
    university: "Maharashtra State Board",
    percentage: "69.84%",
    year: "2018"
  }
];

export const CERTIFICATIONS = [
  {
    name: "Cisco CCNA (200-301) Course Certificate",
    platform: "RST Forum, Dadar (Mumbai)",
    image: "https://lh3.googleusercontent.com/d/1VVYlJF8yffONdPKdXlOYoW382OzMbzJK",
    link: "https://drive.google.com/file/d/1VVYlJF8yffONdPKdXlOYoW382OzMbzJK/view?usp=sharing",
    fallbackImage: "https://drive.google.com/thumbnail?id=1VVYlJF8yffONdPKdXlOYoW382OzMbzJK&sz=w1600",
    status: "Course Completed",
    institute: "RST Forum, Dadar (Mumbai)",
    verifyUrl: "https://drive.google.com/file/d/1VVYlJF8yffONdPKdXlOYoW382OzMbzJK/view?usp=sharing"
  }
];

export const SKILLS = [
  { name: "Kubernetes & Docker", level: 92 },
  { name: "CI/CD (Jenkins, GitHub Actions, ArgoCD)", level: 90 },
  { name: "AWS (EC2, S3, VPC, EKS, IAM)", level: 86 },
  { name: "Linux (Ubuntu) CLI & Bash", level: 90 },
  { name: "DevSecOps (SonarQube & Trivy)", level: 85 },
  { name: "Infrastructure as Code (Terraform & Helm)", level: 82 },
  { name: "Monitoring (Prometheus & Grafana)", level: 86 },
  { name: "Python Scripting & JavaScript", level: 80 }
];

export const SKILLS_CATEGORIES = {
  "CI/CD & Automation": [
    "Jenkins", "GitHub Actions", "ArgoCD", "SonarQube", "Trivy", "Git", "Automated Pipelines", "Continuous Deployment"
  ],
  "Cloud & Infrastructure": [
    "AWS (EC2, S3, VPC, EKS, IAM, Lambda)", "Kubernetes", "Docker", "Kustomize", "Helm", "Terraform", "Microservices Architecture"
  ],
  "Security & DevSecOps": [
    "SonarQube Static Analysis", "Trivy Vulnerability Scans", "Container Image Scanning", "Pipeline Security Gates", "Access Management"
  ],
  "Monitoring & Observability": [
    "Prometheus", "Grafana", "Alertmanager", "Health Probes & Metrics", "Real-time Telemetry Dashboards"
  ],
  "Programming & OS": [
    "Python", "JavaScript", "Linux (Ubuntu)", "Bash CLI Automation", "CCNA Networking Concepts"
  ]
};
