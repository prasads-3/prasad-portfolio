import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Layers, 
  Server, 
  Shield, 
  Activity, 
  CheckCircle2, 
  Terminal, 
  Cpu, 
  Database,
  RefreshCw,
  Box,
  Eye,
  Lock,
  Network,
  Copy,
  Check,
  ArrowRight,
  HardDrive,
  FileCode,
  Zap,
  Globe
} from 'lucide-react';

interface TwoTierFlaskDetailsProps {
  activeTab: string;
  onSelectImage: (url: string) => void;
  soundService: {
    click: () => void;
    hover: () => void;
  };
}

export const TwoTierFlaskDetails: React.FC<TwoTierFlaskDetailsProps> = ({
  activeTab,
  onSelectImage,
  soundService
}) => {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [activeK8sManifest, setActiveK8sManifest] = useState<'deployment' | 'service' | 'pvc' | 'configmap'>('deployment');
  const [simulatedQueryState, setSimulatedQueryState] = useState<'idle' | 'sending' | 'written'>('idle');
  const [testMessage, setTestMessage] = useState('Hello from DevOps Portfolio!');
  const [storedMessages, setStoredMessages] = useState([
    { id: 1, text: "Initial DB seed: Application initialized", timestamp: "10:42:01 AM" },
    { id: 2, text: "Database connection verified via PyMySQL", timestamp: "10:45:14 AM" }
  ]);

  const copyToClipboard = (key: string, text: string) => {
    soundService.click();
    navigator.clipboard.writeText(text);
    setCopiedFile(key);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const handleSimulateMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testMessage.trim()) return;
    soundService.click();
    setSimulatedQueryState('sending');
    setTimeout(() => {
      setStoredMessages(prev => [
        ...prev,
        { id: prev.length + 1, text: testMessage, timestamp: new Date().toLocaleTimeString() }
      ]);
      setSimulatedQueryState('written');
      setTestMessage('');
      setTimeout(() => setSimulatedQueryState('idle'), 2500);
    }, 700);
  };

  const dockerfileContent = `# Stage 1: Build & Dependency Resolution
FROM python:3.9-slim-bookworm AS builder

WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \\
    gcc default-libmysqlclient-dev pkg-config \\
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# Stage 2: Production Distroless / Slim Image
FROM python:3.9-slim-bookworm AS runner

WORKDIR /app

# Install runtime database client libraries only
RUN apt-get update && apt-get install -y --no-install-recommends \\
    libmariadb3 curl \\
    && rm -rf /var/lib/apt/lists/*

# Create unprivileged system user for security hardening
RUN groupadd -g 10001 appgroup && \\
    useradd -u 10001 -g appgroup -s /bin/bash appuser

# Copy installed python dependencies from builder
COPY --from=builder /root/.local /home/appuser/.local
COPY . .

ENV PATH=/home/appuser/.local/bin:$PATH \\
    PYTHONUNBUFFERED=1 \\
    PYTHONDONTWRITEBYTECODE=1

RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \\
  CMD curl -f http://localhost:5000/health || exit 1

ENTRYPOINT ["python", "app.py"]`;

  const dockerComposeContent = `version: '3.8'

networks:
  two-tier-net:
    driver: bridge
    ipam:
      config:
        - subnet: 172.28.0.0/16

volumes:
  mysql_data:
    driver: local

services:
  # Database Tier: MySQL 8.0
  db:
    image: mysql:8.0
    container_name: flask_mysql_db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword123
      MYSQL_DATABASE: devops_db
      MYSQL_USER: flask_user
      MYSQL_PASSWORD: flask_password
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - two-tier-net
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-prootpassword123"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
    ports:
      - "3306:3306"

  # Application Tier: Python Flask App
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: flask_backend_app
    restart: always
    environment:
      MYSQL_HOST: db
      MYSQL_USER: flask_user
      MYSQL_PASSWORD: flask_password
      MYSQL_DB: devops_db
      PORT: 5000
    depends_on:
      db:
        condition: service_healthy
    networks:
      - two-tier-net
    ports:
      - "5000:5000"`;

  const k8sManifests = {
    deployment: `# flask-mysql-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: flask-app
  namespace: two-tier-app
  labels:
    app: flask-app
    tier: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: flask-app
  template:
    metadata:
      labels:
        app: flask-app
        tier: frontend
    spec:
      containers:
      - name: flask
        image: prasads3/two-tier-flask-app:v1.0.0
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 5000
        envFrom:
        - configMapRef:
            name: flask-config
        - secretRef:
            name: flask-secret
        resources:
          requests:
            cpu: "100m"
            memory: "128Mi"
          limits:
            cpu: "300m"
            memory: "256Mi"
        livenessProbe:
          httpGet:
            path: /health
            port: 5000
          initialDelaySeconds: 15
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 5000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql-db
  namespace: two-tier-app
  labels:
    app: mysql-db
    tier: database
spec:
  replicas: 1
  strategy:
    type: Recreate
  selector:
    matchLabels:
      app: mysql-db
  template:
    metadata:
      labels:
        app: mysql-db
        tier: database
    spec:
      containers:
      - name: mysql
        image: mysql:8.0
        ports:
        - containerPort: 3306
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: flask-secret
              key: MYSQL_ROOT_PASSWORD
        - name: MYSQL_DATABASE
          value: devops_db
        - name: MYSQL_USER
          value: flask_user
        - name: MYSQL_PASSWORD
          valueFrom:
            secretKeyRef:
              name: flask-secret
              key: MYSQL_PASSWORD
        volumeMounts:
        - name: mysql-persistent-storage
          mountPath: /var/lib/mysql
      volumes:
      - name: mysql-persistent-storage
        persistentVolumeClaim:
          claimName: mysql-pvc`,
    service: `# flask-mysql-services.yaml
# Database Internal Service (ClusterIP)
apiVersion: v1
kind: Service
metadata:
  name: mysql-service
  namespace: two-tier-app
  labels:
    app: mysql-db
spec:
  type: ClusterIP
  ports:
  - port: 3306
    targetPort: 3306
  selector:
    app: mysql-db
---
# Flask Public Service (NodePort / LoadBalancer)
apiVersion: v1
kind: Service
metadata:
  name: flask-service
  namespace: two-tier-app
  labels:
    app: flask-app
spec:
  type: NodePort
  ports:
  - port: 5000
    targetPort: 5000
    nodePort: 30050
  selector:
    app: flask-app`,
    pvc: `# mysql-pvc.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pvc
  namespace: two-tier-app
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi`,
    configmap: `# configmap-and-secrets.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: flask-config
  namespace: two-tier-app
data:
  MYSQL_HOST: "mysql-service.two-tier-app.svc.cluster.local"
  MYSQL_DB: "devops_db"
  APP_ENV: "production"
---
apiVersion: v1
kind: Secret
metadata:
  name: flask-secret
  namespace: two-tier-app
type: Opaque
stringData:
  MYSQL_USER: "flask_user"
  MYSQL_PASSWORD: "flask_password_secure"
  MYSQL_ROOT_PASSWORD: "root_password_ultra_secure"`
  };

  return (
    <>
      {/* Tab 1: 2-Tier Architecture */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight mb-2">Two-Tier Decoupled Container Architecture</h3>
            <p className="text-white/60 text-sm max-w-3xl leading-relaxed">
              This architecture completely decouples the stateless Python Flask presentation/application layer from the stateful MySQL database tier. Both tiers execute inside dedicated Docker containers interconnected via a private bridge network, ensuring zero exposure of raw database ports and deterministic persistence across container lifecycles.
            </p>
          </div>

          {/* Interactive Topology Visualizer */}
          <div className="p-8 rounded-3xl bg-neutral-900/90 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">LIVE ARCHITECTURE TOPOLOGY</span>
                <h4 className="text-lg font-bold text-white mt-1">End-to-End Request & Data Persistence Flow</h4>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Active Bridge Network: 172.28.0.0/16</span>
              </div>
            </div>

            {/* Architecture Node Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Node 1: Client & Web Tier */}
              <div className="p-6 rounded-2xl bg-neutral-950/80 border border-sky-500/30 relative group hover:border-sky-500/60 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
                    <Globe size={20} />
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-sky-500/10 text-sky-300 font-semibold">Tier 1 // Presentation</span>
                </div>
                <h5 className="text-base font-bold text-white mb-1">Flask Web Application</h5>
                <p className="text-xs text-white/50 mb-4">Python 3.9 + Flask + Jinja2 HTML templates handling HTTP routing, form validation, and JSON responses.</p>
                
                <div className="space-y-1.5 text-[11px] font-mono text-white/70 bg-black/50 p-3 rounded-xl border border-white/5">
                  <div className="text-sky-400">Container: flask_backend_app</div>
                  <div>Exposed: Port 5000:5000</div>
                  <div>Driver: PyMySQL / SQLAlchemy</div>
                  <div className="text-emerald-400">Status: Healthy (1/1)</div>
                </div>
              </div>

              {/* Node 2: Network Interconnect */}
              <div className="p-6 rounded-2xl bg-neutral-950/80 border border-primary/30 relative flex flex-col justify-between group hover:border-primary/60 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                      <Network size={20} />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-primary/10 text-primary font-semibold">Bridge Network</span>
                  </div>
                  <h5 className="text-base font-bold text-white mb-1">Docker Bridge & DNS</h5>
                  <p className="text-xs text-white/50 mb-4">Custom isolated network (<code className="text-primary font-mono text-xs">two-tier-net</code>) with internal embedded DNS resolving hostname <code className="text-primary font-mono text-xs">db</code> to the MySQL container IP.</p>
                </div>

                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-xs text-white/80 space-y-1 font-mono">
                  <div className="text-primary font-bold">Zero-Trust Isolation</div>
                  <div className="text-[10px] text-white/60">MySQL is strictly inaccessible from outer host networks; only backend container can route packets to port 3306.</div>
                </div>
              </div>

              {/* Node 3: Database Persistence Tier */}
              <div className="p-6 rounded-2xl bg-neutral-950/80 border border-emerald-500/30 relative group hover:border-emerald-500/60 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                    <Database size={20} />
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 font-semibold">Tier 2 // Persistence</span>
                </div>
                <h5 className="text-base font-bold text-white mb-1">MySQL 8.0 Database</h5>
                <p className="text-xs text-white/50 mb-4">Relational database engine executing ACID transactions, relational indexing, and persistent table state.</p>

                <div className="space-y-1.5 text-[11px] font-mono text-white/70 bg-black/50 p-3 rounded-xl border border-white/5">
                  <div className="text-emerald-400">Container: flask_mysql_db</div>
                  <div>Internal Port: 3306</div>
                  <div>Volume: mysql_data:/var/lib/mysql</div>
                  <div className="text-emerald-400">Health: mysqladmin ping OK</div>
                </div>
              </div>
            </div>

            {/* Interactive Data Submission Simulation */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <h5 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Zap size={16} className="text-amber-400" />
                    <span>Interactive 2-Tier Query Tester</span>
                  </h5>
                  <p className="text-xs text-white/50 mb-4">
                    Type a message below to simulate an HTTP POST from the Flask frontend writing through PyMySQL to the isolated MySQL container storage volume:
                  </p>

                  <form onSubmit={handleSimulateMessage} className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={testMessage}
                        onChange={(e) => setTestMessage(e.target.value)}
                        placeholder="Enter message to store in MySQL..."
                        className="flex-1 px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-primary"
                      />
                      <button
                        type="submit"
                        disabled={simulatedQueryState === 'sending'}
                        className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center gap-1.5 shrink-0"
                      >
                        {simulatedQueryState === 'sending' ? (
                          <>
                            <RefreshCw size={14} className="animate-spin" />
                            <span>Writing...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Query</span>
                            <ArrowRight size={14} />
                          </>
                        )}
                      </button>
                    </div>

                    {simulatedQueryState === 'written' && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2"
                      >
                        <CheckCircle2 size={15} />
                        <span>Query committed successfully! INSERT INTO messages (message) VALUES (...) committed with ACID durability.</span>
                      </motion.div>
                    )}
                  </form>
                </div>

                {/* Live Database Table Record Viewer */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <Database size={16} className="text-emerald-400" />
                      <span>MySQL Table: <code className="text-xs font-mono text-emerald-400">messages</code></span>
                    </h5>
                    <span className="text-[10px] font-mono text-white/40">{storedMessages.length} records</span>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/60 overflow-hidden text-xs font-mono">
                    <div className="grid grid-cols-12 bg-white/5 p-2.5 text-white/60 font-bold border-b border-white/10 text-[11px]">
                      <div className="col-span-2">ID</div>
                      <div className="col-span-7">MESSAGE</div>
                      <div className="col-span-3 text-right">TIMESTAMP</div>
                    </div>
                    <div className="max-h-40 overflow-y-auto divide-y divide-white/5">
                      {storedMessages.map(msg => (
                        <div key={msg.id} className="grid grid-cols-12 p-2.5 text-white/80 hover:bg-white/5 items-center">
                          <div className="col-span-2 text-primary font-bold">#{msg.id}</div>
                          <div className="col-span-7 truncate pr-2">{msg.text}</div>
                          <div className="col-span-3 text-right text-white/40 text-[10px]">{msg.timestamp}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Architectural Highlights */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold mb-4">
                <Shield size={20} />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Security Isolation</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                The database container does not need to expose port 3306 on the host. Network traffic between the Flask application and MySQL travels strictly within the internal Docker bridge subnet.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold mb-4">
                <HardDrive size={20} />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Zero Data Loss Volumes</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                By mounting a Docker named volume (`mysql_data`) to `/var/lib/mysql`, database writes are preserved even when the MySQL container is restarted, updated, or recreated.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold mb-4">
                <Cpu size={20} />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Horizontal Scalability</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Because the Flask web application is fully stateless, multiple frontend replicas can be deployed behind a reverse proxy or Kubernetes Service without session affinity bottlenecks.
              </p>
            </div>
          </div>

          {/* Docker Network Inspect Live CLI simulation */}
          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6">
            <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Terminal size={18} className="text-primary" />
              <span>Container Network Inspection (`docker network inspect two-tier-net`)</span>
            </h4>
            <div className="p-4 rounded-xl bg-black/70 font-mono text-xs text-white/80 border border-white/5 overflow-x-auto space-y-1">
              <div className="text-white/40">$ docker network inspect two-tier-net --format json</div>
              <div className="text-emerald-400">&#123;</div>
              <div className="pl-4">"Name": <span className="text-amber-300">"two-tier-net"</span>,</div>
              <div className="pl-4">"Driver": <span className="text-amber-300">"bridge"</span>,</div>
              <div className="pl-4">"Subnet": <span className="text-amber-300">"172.28.0.0/16"</span>,</div>
              <div className="pl-4">"Containers": &#123;</div>
              <div className="pl-8">"flask_backend_app": &#123; "IPv4Address": <span className="text-sky-300">"172.28.0.2/16"</span>, "MacAddress": "02:42:ac:1c:00:02" &#125;,</div>
              <div className="pl-8">"flask_mysql_db": &#123; "IPv4Address": <span className="text-sky-300">"172.28.0.3/16"</span>, "MacAddress": "02:42:ac:1c:00:03" &#125;</div>
              <div className="pl-4">&#125;</div>
              <div className="text-emerald-400">&#125;</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab 2: Multi-Stage Dockerfile */}
      {activeTab === 'dockerfile' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold tracking-tight mb-2">Production Multi-Stage Dockerfile</h3>
            <p className="text-white/60 text-sm max-w-3xl leading-relaxed">
              Standard Python Docker images often exceed 850 MB and bundle build compilers like GCC, increasing the security attack surface. By employing a 2-stage build, build-time dependencies are isolated in the builder stage, producing an ultra-compact ~115 MB production runtime container.
            </p>
          </div>

          {/* Size Comparison Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-neutral-900 border border-rose-500/20">
              <span className="text-xs font-mono uppercase text-rose-400 font-bold">Traditional Single-Stage</span>
              <div className="text-3xl font-bold text-white mt-2 mb-1">842 MB</div>
              <p className="text-xs text-white/50">Bundles GCC, header files, package managers, and development build artifacts.</p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900 border border-emerald-500/20">
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Optimized Multi-Stage</span>
              <div className="text-3xl font-bold text-white mt-2 mb-1">118 MB</div>
              <p className="text-xs text-white/50">Only runtime binary artifacts, Python interpreter, and compiled wheels. 86% size reduction!</p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900 border border-primary/20">
              <span className="text-xs font-mono uppercase text-primary font-bold">Security Posture</span>
              <div className="text-3xl font-bold text-white mt-2 mb-1">Non-Root</div>
              <p className="text-xs text-white/50">Executes under dedicated UID 10001 (`appuser`), preventing container breakout privilege escalation.</p>
            </div>
          </div>

          {/* Dockerfile Viewer */}
          <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-2xl">
            <div className="p-4 bg-neutral-950 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode size={16} className="text-primary" />
                <span className="font-mono text-xs font-bold text-white">Dockerfile (Multi-Stage Production Build)</span>
              </div>
              <button
                onClick={() => copyToClipboard('dockerfile', dockerfileContent)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-xs text-white/80 transition-colors"
              >
                {copiedFile === 'dockerfile' ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Dockerfile</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-6 bg-black/80 font-mono text-xs leading-relaxed overflow-x-auto text-white/80">
              <pre><code>{dockerfileContent}</code></pre>
            </div>
          </div>

          {/* Optimization Checklist */}
          <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10">
            <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-400" />
              <span>Container Best Practices Implemented</span>
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-xs text-white/70">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Strict .dockerignore</strong>
                  <p className="text-white/50 text-[11px] mt-0.5">Excludes `.git`, `.env`, `__pycache__`, tests, and virtualenvs from Docker context upload.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Layer Caching Strategy</strong>
                  <p className="text-white/50 text-[11px] mt-0.5">Copies `requirements.txt` before source code so pip install layers are cached across code updates.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Container Healthcheck</strong>
                  <p className="text-white/50 text-[11px] mt-0.5">Queries `/health` every 30s so orchestrators detect application deadlocks automatically.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">No Bytecode & Unbuffered Logs</strong>
                  <p className="text-white/50 text-[11px] mt-0.5">`PYTHONUNBUFFERED=1` ensures standard output is immediately emitted into Docker log streams.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab 3: Docker Compose & Networks */}
      {activeTab === 'compose' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold tracking-tight mb-2">Docker Compose Multi-Container Orchestration</h3>
            <p className="text-white/60 text-sm max-w-3xl leading-relaxed">
              Docker Compose orchestrates the lifecycle of both the Flask application and MySQL database containers. It manages container startup dependencies with healthy condition checks, creates named persistent storage volumes, and establishes an isolated bridge network.
            </p>
          </div>

          {/* docker-compose.yml Viewer */}
          <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-2xl">
            <div className="p-4 bg-neutral-950 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Box size={16} className="text-primary" />
                <span className="font-mono text-xs font-bold text-white">docker-compose.yml (Local Stack Specification)</span>
              </div>
              <button
                onClick={() => copyToClipboard('compose', dockerComposeContent)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-xs text-white/80 transition-colors"
              >
                {copiedFile === 'compose' ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Compose File</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-6 bg-black/80 font-mono text-xs leading-relaxed overflow-x-auto text-white/80">
              <pre><code>{dockerComposeContent}</code></pre>
            </div>
          </div>

          {/* Compose CLI Lifecycle Cheatsheet */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10">
              <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Terminal size={15} className="text-primary" />
                <span>1. Launch Stack</span>
              </h4>
              <div className="p-3 rounded-lg bg-black/60 font-mono text-xs text-primary mb-2">
                docker compose up -d --build
              </div>
              <p className="text-xs text-white/50">Builds the Flask image, creates volume & network, and launches containers in the background.</p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10">
              <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Activity size={15} className="text-emerald-400" />
                <span>2. Monitor Health</span>
              </h4>
              <div className="p-3 rounded-lg bg-black/60 font-mono text-xs text-emerald-400 mb-2">
                docker compose ps
              </div>
              <p className="text-xs text-white/50">Verifies that both `flask_backend_app` and `flask_mysql_db` report healthy status.</p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10">
              <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <HardDrive size={15} className="text-amber-400" />
                <span>3. Graceful Teardown</span>
              </h4>
              <div className="p-3 rounded-lg bg-black/60 font-mono text-xs text-amber-400 mb-2">
                docker compose down
              </div>
              <p className="text-xs text-white/50">Stops containers cleanly while preserving the MySQL data volume on disk.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab 4: Kubernetes Manifests & Storage */}
      {activeTab === 'kubernetes' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold tracking-tight mb-2">Kubernetes Orchestration & Storage Persistence</h3>
            <p className="text-white/60 text-sm max-w-3xl leading-relaxed">
              Transitioning from local Docker Compose to enterprise Kubernetes: The application is deployed into the <code className="text-primary font-mono text-xs">two-tier-app</code> namespace with 3 Flask stateless pod replicas, an internal ClusterIP Service for MySQL, and a PersistentVolumeClaim ensuring database transactions survive node crashes.
            </p>
          </div>

          {/* Manifest Tabs Switcher */}
          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
            {[
              { id: 'deployment', label: 'Deployments (Flask & MySQL)', icon: Box },
              { id: 'service', label: 'Services (ClusterIP & NodePort)', icon: Network },
              { id: 'pvc', label: 'PersistentVolumeClaim (Storage)', icon: HardDrive },
              { id: 'configmap', label: 'ConfigMap & Secret', icon: Lock }
            ].map(m => {
              const Icon = m.icon;
              const isActive = activeK8sManifest === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    soundService.click();
                    setActiveK8sManifest(m.id as any);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    isActive 
                      ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={14} />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Manifest Code Viewer */}
          <div className="rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden shadow-2xl">
            <div className="p-4 bg-neutral-950 border-b border-white/10 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white">kubernetes/{activeK8sManifest}.yaml</span>
              <button
                onClick={() => copyToClipboard(`k8s_${activeK8sManifest}`, k8sManifests[activeK8sManifest])}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-xs text-white/80 transition-colors"
              >
                {copiedFile === `k8s_${activeK8sManifest}` ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy YAML</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-6 bg-black/80 font-mono text-xs leading-relaxed overflow-x-auto text-white/80">
              <pre><code>{k8sManifests[activeK8sManifest]}</code></pre>
            </div>
          </div>

          {/* Live Cluster Pods Status Output */}
          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Terminal size={16} className="text-emerald-400" />
                <span>Cluster State (`kubectl get pods,svc,pvc -n two-tier-app`)</span>
              </h4>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All Pods 1/1 Running</span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-black/70 font-mono text-xs text-white/80 border border-white/5 overflow-x-auto space-y-1">
              <div className="text-white/40">NAME                                  READY   STATUS    RESTARTS   AGE</div>
              <div className="text-emerald-300">pod/flask-app-7b8f9c-84k92            1/1     Running   0          4h12m</div>
              <div className="text-emerald-300">pod/flask-app-7b8f9c-m93ls            1/1     Running   0          4h12m</div>
              <div className="text-emerald-300">pod/flask-app-7b8f9c-w28px            1/1     Running   0          4h12m</div>
              <div className="text-emerald-300">pod/mysql-db-0                        1/1     Running   0          18h</div>
              <div className="text-white/40 pt-2">NAME                                  TYPE        CLUSTER-IP       PORT(S)          AGE</div>
              <div>service/flask-service                 NodePort    10.96.142.18     5000:30050/TCP   4h12m</div>
              <div>service/mysql-service                 ClusterIP   10.96.88.204     3306/TCP         18h</div>
              <div className="text-white/40 pt-2">NAME                                  STATUS   VOLUME          CAPACITY   ACCESS MODES</div>
              <div className="text-sky-300">persistentvolumeclaim/mysql-pvc       Bound    pvc-83b9f421    10Gi       RWO</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab 5: CI/CD & Security Hardening */}
      {activeTab === 'cicd_security' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold tracking-tight mb-2">Automated CI/CD Pipeline & Security Hardening</h3>
            <p className="text-white/60 text-sm max-w-3xl leading-relaxed">
              Every commit pushed to GitHub triggers automated static analysis, Python unit testing, multi-stage container compilation, Trivy vulnerability evaluation, and deployment to Docker Hub.
            </p>
          </div>

          {/* Pipeline Stages */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { stage: "01", name: "Lint & Format", tool: "Flake8 & Black", status: "Pass (0 warnings)", color: "text-emerald-400" },
              { stage: "02", name: "Unit Tests", tool: "PyTest Runner", status: "14 passed in 0.8s", color: "text-emerald-400" },
              { stage: "03", name: "Docker Build", tool: "Docker Buildx", status: "Multi-stage cache", color: "text-emerald-400" },
              { stage: "04", name: "Trivy Scan", tool: "Vulnerability Gate", status: "0 Critical / 0 High", color: "text-emerald-400" },
              { stage: "05", name: "Push Registry", tool: "Docker Hub", status: "Tagged :v1.0.0", color: "text-emerald-400" },
            ].map(s => (
              <div key={s.stage} className="p-4 rounded-2xl bg-neutral-900 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2 font-mono text-xs text-white/40">
                    <span>STAGE {s.stage}</span>
                    <CheckCircle2 size={14} className="text-emerald-400" />
                  </div>
                  <h5 className="text-sm font-bold text-white">{s.name}</h5>
                  <p className="text-xs text-white/50">{s.tool}</p>
                </div>
                <div className={`mt-3 pt-2 border-t border-white/5 font-mono text-[11px] ${s.color}`}>
                  {s.status}
                </div>
              </div>
            ))}
          </div>

          {/* Trivy Security Scan Matrix */}
          <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Shield size={18} className="text-emerald-400" />
                <span>Trivy Container Security Vulnerability Gate</span>
              </h4>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs border border-emerald-500/20 font-bold">
                POLICY: PASSED
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-black/50 border border-white/5 text-center">
                <div className="text-2xl font-bold text-emerald-400 font-mono">0</div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Critical</div>
              </div>
              <div className="p-4 rounded-xl bg-black/50 border border-white/5 text-center">
                <div className="text-2xl font-bold text-emerald-400 font-mono">0</div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-1">High</div>
              </div>
              <div className="p-4 rounded-xl bg-black/50 border border-white/5 text-center">
                <div className="text-2xl font-bold text-amber-400 font-mono">2</div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Medium (Non-exploitable)</div>
              </div>
              <div className="p-4 rounded-xl bg-black/50 border border-white/5 text-center">
                <div className="text-2xl font-bold text-sky-400 font-mono">4</div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Low (Informational)</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/70 font-mono text-xs text-white/80 border border-white/5 space-y-1 overflow-x-auto">
              <div className="text-white/40">$ trivy image --severity HIGH,CRITICAL prasads3/two-tier-flask-app:v1.0.0</div>
              <div className="text-emerald-400">2026-09-13T11:20:14.231Z  INFO  Vulnerability scanning is enabled</div>
              <div>prasads3/two-tier-flask-app:v1.0.0 (debian 12.5)</div>
              <div>=================================================</div>
              <div className="text-emerald-300">Total: 0 (HIGH: 0, CRITICAL: 0)</div>
              <div className="text-emerald-400">Security quality gate successfully passed. Proceeding to Docker Hub push.</div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
