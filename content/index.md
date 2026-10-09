---
title: Home
navigation: false
---

::hero{class="py-12 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50/90 via-indigo-50/80 to-purple-50/90 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-purple-950/40 rounded-3xl border border-blue-100/60 dark:border-blue-900/40 shadow-2xl transition-all duration-500 hover:shadow-blue-200/40 dark:hover:shadow-blue-500/10 max-w-[90rem] xl:max-w-[100rem] 2xl:max-w-[120rem] mx-auto"}
---
announcement:
  title: 'v2.4.0 Released: 80+ Guides for Docker & Kubernetes'
  icon: 'lucide:sparkles'
  to: '/blog/v2-4'
actions:
  - name: Get Started
    to: /getting-started/introduction
    leftIcon: 'lucide:rocket'
    variant: default
  - name: Explore Docker
    to: /learn-docker/docker/containers
    leftIcon: 'lucide:box'
    variant: secondary
  - name: Learn Kubernetes
    to: /learn-kubernetes/kubernetes/architecture
    leftIcon: 'lucide:ship-wheel'
    variant: outline
  - name: Star on GitHub
    to: https://github.com/NotHarshhaa/from-docker-to-kubernetes
    leftIcon: 'lucide:star'
    variant: outline
    target: _blank
---

#title
Master Docker. :br
Orchestrate with :span{class="text-gradient-primary animate-pulse-slow"} Kubernetes.

#description
A comprehensive, production-grade open-source curriculum. :br
Journey from container fundamentals and multi-stage builds to enterprise Kubernetes clusters, GitOps, service meshes, and zero-trust security.
::

::div{class="my-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[90rem] mx-auto"}
  ::card{icon="lucide:box" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-blue-100 dark:border-blue-900/60 bg-white/70 dark:bg-card/60 backdrop-blur-sm"}
  #title
  40+ Docker Guides
  #description
  Container lifecycle, multi-stage builds, rootless mode, Buildx, and AI/ML runtimes.
  ::

  ::card{icon="lucide:ship-wheel" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-indigo-100 dark:border-indigo-900/60 bg-white/70 dark:bg-card/60 backdrop-blur-sm"}
  #title
  40+ Kubernetes Guides
  #description
  Cluster architecture, operators, Gateway API, KEDA autoscaling, and FinOps.
  ::

  ::card{icon="lucide:shield-check" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-emerald-100 dark:border-emerald-900/60 bg-white/70 dark:bg-card/60 backdrop-blur-sm"}
  #title
  Production Hardened
  #description
  Zero-trust security, admission controllers, network policies, and disaster recovery.
  ::

  ::card{icon="lucide:github" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-purple-100 dark:border-purple-900/60 bg-white/70 dark:bg-card/60 backdrop-blur-sm"}
  #title
  100% Open Source
  #description
  Battle-tested manifests, reproducible examples, and an active global community.
  ::
::

::div{class="my-14 py-10 px-6 sm:px-8 bg-gradient-to-r from-blue-50/70 via-indigo-50/70 to-purple-50/70 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 border border-blue-100 dark:border-blue-900/40 rounded-2xl shadow-sm text-center"}
  ::div{class="max-w-3xl mx-auto"}
    ::badge{variant="outline" class="mb-3 px-3 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"}
      Your Progressive Roadmap
    ::
    ::h2{class="text-2xl sm:text-3xl font-extrabold tracking-tight"}
      The Modern Container Journey, :span{class="text-gradient-primary"} Simplified
    ::
    ::p{class="mt-3 text-muted-foreground text-base sm:text-lg"}
      A structured, three-phase path taking you from your first local container to enterprise-scale multi-cluster Kubernetes deployments.
    ::
  ::

  ::div{class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-left"}
    ::card{icon="lucide:box" to="/learn-docker/docker/containers" class="group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl border border-blue-100 dark:border-blue-900 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-card"}
    #title
    01. Docker Fundamentals
    #description
    Master container virtualization, image layers, multi-stage Dockerfiles, volume persistence, and secure image scanning.
    ::

    ::card{icon="lucide:layers" to="/learn-docker/docker/docker-compose" class="group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl border border-indigo-100 dark:border-indigo-900 hover:border-indigo-300 dark:hover:border-indigo-600 bg-white dark:bg-card"}
    #title
    02. Docker Compose
    #description
    Orchestrate multi-container stacks. Define isolated bridges, healthchecks, environment configs, and service dependencies with ease.
    ::

    ::card{icon="lucide:ship-wheel" to="/learn-kubernetes/kubernetes/architecture" class="group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl border border-purple-100 dark:purple-900 hover:border-purple-300 dark:hover:border-purple-600 bg-white dark:bg-card"}
    #title
    03. Kubernetes Mastery
    #description
    Scale to multi-node clusters. Manage Deployments, Ingress, StatefulSets, GitOps with ArgoCD, and automated autoscaling.
    ::
  ::
::

::div{class="my-16"}
  ::div{class="text-center max-w-3xl mx-auto mb-8"}
    ::badge{variant="outline" class="mb-2 px-3 py-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800"}
      Evolution in Action
    ::
    ::h2{class="text-2xl sm:text-3xl font-extrabold tracking-tight"}
      From Single Container to Cluster Manifest
    ::
    ::p{class="mt-2 text-muted-foreground"}
      Inspect how application definitions evolve from a lean Dockerfile into a multi-service Compose stack and a production Kubernetes Deployment.
    ::
  ::

  ::code-group
```dockerfile [Dockerfile (Multi-Stage)]
# Stage 1: Build & Dependency Resolution
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 2: Hardened Minimal Distroless Runner
FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app
COPY --from=builder /app/dist ./dist
USER nonroot:nonroot
EXPOSE 3000
CMD ["dist/server.js"]
```

```yaml [docker-compose.yml (Multi-Service)]
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    depends_on:
      db:
        condition: service_healthy
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: app
      POSTGRES_USER: user
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d app"]
      interval: 5s
      timeout: 5s
      retries: 5
volumes:
  pgdata:
```

```yaml [deployment.yaml (Kubernetes)]
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-application
  labels:
    app.kubernetes.io/name: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web
        image: registry.example.com/app:v2.4.0
        ports:
        - containerPort: 3000
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 500m
            memory: 512Mi
        readinessProbe:
          httpGet:
            path: /healthz
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 10
```
  ::
::

::div{class="my-16"}
  ::div{class="text-center max-w-3xl mx-auto mb-8"}
    ::badge{variant="outline" class="mb-2 px-3 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"}
      Interactive Curriculum
    ::
    ::h2{class="text-2xl sm:text-3xl font-extrabold tracking-tight"}
      Explore the Comprehensive Curriculum
    ::
    ::p{class="mt-2 text-muted-foreground"}
      Over 80 hands-on guides organized by specialization. Click any topic below to jump directly into the documentation.
    ::
  ::

  ::tabs{variant="line" class="mt-6"}
    ::div{label="Docker Track" icon="lucide:box"}
      ::div{class="grid grid-cols-1 md:grid-cols-3 gap-5 my-4"}
        ::card{icon="lucide:box" to="/learn-docker/docker/containers" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-blue-100 dark:border-blue-900/60 hover:border-blue-400 dark:hover:border-blue-600"}
        #title
        Containers & Lifecycle
        #description
        Container isolation, states, exec, logging, and namespace/cgroup mechanics.
        ::

        ::card{icon="lucide:copy" to="/learn-docker/docker/images" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-blue-100 dark:border-blue-900/60 hover:border-blue-400 dark:hover:border-blue-600"}
        #title
        Images & Multi-Stage Builds
        #description
        Dockerfile optimization, layer caching, distroless images, and slim footprints.
        ::

        ::card{icon="lucide:network" to="/learn-docker/docker/networking" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-blue-100 dark:border-blue-900/60 hover:border-blue-400 dark:hover:border-blue-600"}
        #title
        Networking Models
        #description
        Bridge, host, overlay networks, DNS resolution, and inter-container communication.
        ::

        ::card{icon="lucide:database" to="/learn-docker/docker/volumes" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-blue-100 dark:border-blue-900/60 hover:border-blue-400 dark:hover:border-blue-600"}
        #title
        Volumes & Storage Drivers
        #description
        Bind mounts, named volumes, tmpfs, backup workflows, and storage driver performance.
        ::

        ::card{icon="lucide:layers" to="/learn-docker/docker/docker-compose" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-blue-100 dark:border-blue-900/60 hover:border-blue-400 dark:hover:border-blue-600"}
        #title
        Docker Compose Stacks
        #description
        Multi-container orchestration, compose v2 specs, healthchecks, and secrets.
        ::

        ::card{icon="lucide:shield" to="/learn-docker/docker/security" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-blue-100 dark:border-blue-900/60 hover:border-blue-400 dark:hover:border-blue-600"}
        #title
        Hardened Container Security
        #description
        Rootless mode, vulnerability scanning with Trivy, seccomp, and user namespaces.
        ::

        ::card{icon="lucide:share-2" to="/learn-docker/docker/registry-distribution" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-blue-100 dark:border-blue-900/60 hover:border-blue-400 dark:hover:border-blue-600"}
        #title
        Registry & Distribution
        #description
        Self-hosted registries, authentication, image tagging conventions, and push/pull mirrors.
        ::

        ::card{icon="lucide:cpu" to="/learn-docker/docker/cicd-integration" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-blue-100 dark:border-blue-900/60 hover:border-blue-400 dark:hover:border-blue-600"}
        #title
        CI/CD & Multi-Arch Buildx
        #description
        Automated image building in pipelines with Buildx and multi-architecture targets.
        ::

        ::card{icon="lucide:sparkles" to="/learn-docker/docker/docker-for-ai-ml" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-blue-100 dark:border-blue-900/60 hover:border-blue-400 dark:hover:border-blue-600"}
        #title
        AI/ML & GPU Acceleration
        #description
        NVIDIA Container Toolkit, CUDA environments, and LLM inference containerization.
        ::
      ::
    ::

    ::div{label="Kubernetes Core" icon="lucide:ship-wheel"}
      ::div{class="grid grid-cols-1 md:grid-cols-3 gap-5 my-4"}
        ::card{icon="lucide:cpu" to="/learn-kubernetes/kubernetes/architecture" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-indigo-100 dark:border-indigo-900/60 hover:border-indigo-400 dark:hover:border-indigo-600"}
        #title
        Cluster Architecture
        #description
        Control plane (API Server, etcd, scheduler, controllers) and kubelet worker node design.
        ::

        ::card{icon="lucide:box-select" to="/learn-kubernetes/kubernetes/workloads" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-indigo-100 dark:border-indigo-900/60 hover:border-indigo-400 dark:hover:border-indigo-600"}
        #title
        Pods & Workload Controllers
        #description
        Deployments, ReplicaSets, Jobs, CronJobs, restart policies, and rollout strategies.
        ::

        ::card{icon="lucide:webhook" to="/learn-kubernetes/kubernetes/networking" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-indigo-100 dark:border-indigo-900/60 hover:border-indigo-400 dark:hover:border-indigo-600"}
        #title
        Services, Ingress & CNI
        #description
        ClusterIP, NodePort, LoadBalancer, Ingress controllers, and CNI networking plugins.
        ::

        ::card{icon="lucide:hard-drive" to="/learn-kubernetes/kubernetes/storage" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-indigo-100 dark:border-indigo-900/60 hover:border-indigo-400 dark:hover:border-indigo-600"}
        #title
        Persistent Storage & CSI
        #description
        StorageClasses, PVs, PVCs, dynamic volume provisioning, and reclaim policies.
        ::

        ::card{icon="lucide:key" to="/learn-kubernetes/kubernetes/config-secrets" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-indigo-100 dark:border-indigo-900/60 hover:border-indigo-400 dark:hover:border-indigo-600"}
        #title
        ConfigMaps & Secrets
        #description
        Decoupled application configuration, secret encryption at rest, and Vault integration.
        ::

        ::card{icon="lucide:database" to="/learn-kubernetes/kubernetes/statefulsets-daemonsets" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-indigo-100 dark:border-indigo-900/60 hover:border-indigo-400 dark:hover:border-indigo-600"}
        #title
        StatefulSets & DaemonSets
        #description
        Stable network identities, ordered rollouts, and node-level background agents.
        ::
      ::
    ::

    ::div{label="Advanced Cloud-Native" icon="lucide:zap"}
      ::div{class="grid grid-cols-1 md:grid-cols-3 gap-5 my-4"}
        ::card{icon="lucide:git-merge" to="/learn-kubernetes/kubernetes/gitops" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-purple-100 dark:border-purple-900/60 hover:border-purple-400 dark:hover:border-purple-600"}
        #title
        GitOps with ArgoCD & Flux
        #description
        Declarative continuous delivery, automated drift detection, and canary rollouts.
        ::

        ::card{icon="lucide:route" to="/learn-kubernetes/kubernetes/gateway-api" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-purple-100 dark:border-purple-900/60 hover:border-purple-400 dark:hover:border-purple-600"}
        #title
        Gateway API & Service Mesh
        #description
        Next-gen Kubernetes Gateway API, Istio mutual TLS, traffic shifting, and observability.
        ::

        ::card{icon="lucide:activity" to="/learn-kubernetes/kubernetes/kubernetes-event-driven-autoscaling" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-purple-100 dark:border-purple-900/60 hover:border-purple-400 dark:hover:border-purple-600"}
        #title
        KEDA Event-Driven Autoscaling
        #description
        Scale to zero and scale out based on Kafka topics, RabbitMQ queues, and cloud metrics.
        ::

        ::card{icon="lucide:blocks" to="/learn-kubernetes/kubernetes/operators-crds" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-purple-100 dark:border-purple-900/60 hover:border-purple-400 dark:hover:border-purple-600"}
        #title
        Operators & CRDs
        #description
        Extending the Kubernetes API with custom controllers, reconciliation loops, and SDKs.
        ::

        ::card{icon="lucide:shield-alert" to="/learn-kubernetes/kubernetes/cloud-native-security" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-purple-100 dark:border-purple-900/60 hover:border-purple-400 dark:hover:border-purple-600"}
        #title
        Cloud-Native Security & RBAC
        #description
        Role-based access control, security contexts, admission webhooks, and runtime audit.
        ::

        ::card{icon="lucide:wallet" to="/learn-kubernetes/kubernetes/cost-optimization-finops" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-purple-100 dark:border-purple-900/60 hover:border-purple-400 dark:hover:border-purple-600"}
        #title
        FinOps & Cost Optimization
        #description
        Right-sizing resource requests, Spot instance strategies, Kubecost, and cluster efficiency.
        ::
      ::
    ::

    ::div{label="Operations & Reliability" icon="lucide:heart-pulse"}
      ::div{class="grid grid-cols-1 md:grid-cols-3 gap-5 my-4"}
        ::card{icon="lucide:shield-check" to="/learn-kubernetes/kubernetes/kubernetes-pod-security-standards" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-emerald-100 dark:border-emerald-900/60 hover:border-emerald-400 dark:hover:border-emerald-600"}
        #title
        Pod Security Standards
        #description
        Privileged, baseline, and restricted policy levels enforced at namespace boundaries.
        ::

        ::card{icon="lucide:gauge" to="/learn-kubernetes/kubernetes/monitoring-logging" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-emerald-100 dark:border-emerald-900/60 hover:border-emerald-400 dark:hover:border-emerald-600"}
        #title
        Monitoring & Logging
        #description
        Prometheus metrics, Grafana dashboards, Fluentbit, and OpenTelemetry instrumentation.
        ::

        ::card{icon="lucide:rotate-ccw" to="/learn-kubernetes/kubernetes/backup-disaster-recovery" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-emerald-100 dark:border-emerald-900/60 hover:border-emerald-400 dark:hover:border-emerald-600"}
        #title
        Backup & Disaster Recovery
        #description
        Velero backups, etcd snapshots, volume replication, and cross-region recovery.
        ::

        ::card{icon="lucide:globe" to="/learn-kubernetes/kubernetes/multi-cluster-management" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-emerald-100 dark:border-emerald-900/60 hover:border-emerald-400 dark:hover:border-emerald-600"}
        #title
        Multi-Cluster Management
        #description
        Cluster API, fleet management, centralized policies, and global service meshes.
        ::

        ::card{icon="lucide:sliders" to="/learn-kubernetes/kubernetes/kubernetes-resource-requests-limits" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-emerald-100 dark:border-emerald-900/60 hover:border-emerald-400 dark:hover:border-emerald-600"}
        #title
        Resource Requests & Limits
        #description
        CPU/Memory request-to-limit ratios, QoS classes (Guaranteed, Burstable), and OOM prevention.
        ::

        ::card{icon="lucide:split" to="/learn-kubernetes/kubernetes/kubernetes-topology-spread-constraints" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-emerald-100 dark:border-emerald-900/60 hover:border-emerald-400 dark:hover:border-emerald-600"}
        #title
        Topology Spread Constraints
        #description
        Distribute pods evenly across availability zones, nodes, and regions for high availability.
        ::
      ::
    ::
  ::
::

::div{class="my-16 py-10 px-6 sm:px-8 bg-gradient-to-r from-emerald-50/70 to-teal-50/70 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl shadow-sm"}
  ::div{class="text-center max-w-2xl mx-auto mb-8"}
    ::badge{variant="outline" class="mb-2 px-3 py-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"}
      Core Primitives
    ::
    ::h2{class="text-2xl sm:text-3xl font-extrabold tracking-tight"}
      Essential Kubernetes Building Blocks
    ::
    ::p{class="mt-2 text-muted-foreground"}
      Everything you need to configure, network, and orchestrate resilient workloads.
    ::
  ::

  ::div{class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"}
    ::card{icon="lucide:box-select" to="/learn-kubernetes/kubernetes/workloads" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-emerald-100 dark:border-emerald-900/50 bg-white dark:bg-card"}
    #title
    Pods & Deployments
    #description
    Replicated pods, zero-downtime rolling updates, and self-healing restart policies.
    ::

    ::card{icon="lucide:webhook" to="/learn-kubernetes/kubernetes/networking" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-emerald-100 dark:border-emerald-900/50 bg-white dark:bg-card"}
    #title
    Services & Ingress
    #description
    Internal service discovery, DNS routing, and ingress controllers for external traffic.
    ::

    ::card{icon="lucide:key-round" to="/learn-kubernetes/kubernetes/config-secrets" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-emerald-100 dark:border-emerald-900/50 bg-white dark:bg-card"}
    #title
    ConfigMaps & Secrets
    #description
    Secure environment injection, mounted configurations, and secret rotation.
    ::

    ::card{icon="lucide:hard-drive" to="/learn-kubernetes/kubernetes/storage" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-emerald-100 dark:border-emerald-900/50 bg-white dark:bg-card"}
    #title
    Storage & StatefulSets
    #description
    Persistent volume claims, dynamic CSI provisioning, and stateful database storage.
    ::
  ::
::

::div{class="my-16 py-10 px-6 sm:px-8 bg-gradient-to-r from-purple-50/70 via-fuchsia-50/70 to-pink-50/70 dark:from-purple-950/20 dark:via-fuchsia-950/20 dark:to-pink-950/20 border border-purple-100 dark:border-purple-900/40 rounded-2xl shadow-sm"}
  ::div{class="text-center max-w-2xl mx-auto mb-8"}
    ::badge{variant="outline" class="mb-2 px-3 py-1 text-sm font-semibold text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800"}
      Battle-Tested Patterns
    ::
    ::h2{class="text-2xl sm:text-3xl font-extrabold tracking-tight"}
      Real-World Architectures You'll Build
    ::
    ::p{class="mt-2 text-muted-foreground"}
      Move beyond hello-world examples to deploy real, resilient cloud-native application patterns.
    ::
  ::

  ::div{class="grid grid-cols-1 md:grid-cols-3 gap-6"}
    ::card{icon="lucide:blocks" to="/learn-kubernetes/kubernetes/service-mesh-ingress" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-white dark:bg-card border border-purple-100 dark:border-purple-900/50"}
    #title
    Microservices Mesh
    #description
    Deploy end-to-end microservice fleets with API gateways, mutual TLS, traffic shaping, and distributed tracing.
    ::

    ::card{icon="lucide:database" to="/learn-kubernetes/kubernetes/statefulsets-daemonsets" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-white dark:bg-card border border-purple-100 dark:border-purple-900/50"}
    #title
    Stateful Database Clusters
    #description
    Run high-availability PostgreSQL and Redis with automated failover, backup snapshots, and dedicated persistent volumes.
    ::

    ::card{icon="lucide:cpu" to="/learn-kubernetes/kubernetes/kubernetes-ai-ml-workloads" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-white dark:bg-card border border-purple-100 dark:border-purple-900/50"}
    #title
    AI/ML Workload Platform
    #description
    Configure GPU-accelerated node pools, batch training jobs, and autoscaling LLM inference services on Kubernetes.
    ::
  ::
::

::div{class="my-16 grid grid-cols-1 md:grid-cols-2 gap-8"}
  ::card{icon="lucide:users" class="border-l-4 border-l-blue-500 shadow-md bg-white dark:bg-card"}
  #title
  Who is this for?
  #description
  - **Developers** modernizing apps and writing optimized Dockerfiles
  - **DevOps Engineers** building automated CI/CD and GitOps pipelines
  - **Cloud Architects** designing resilient, scalable cluster topologies
  - **System Administrators** transitioning from VMs to container runtimes
  - **Platform Teams & SREs** standardizing developer self-service & zero-trust security
  - **Students & Engineers** mastering cloud-native skills with hands-on practice
  ::

  ::card{icon="lucide:check-circle" class="border-l-4 border-l-emerald-500 shadow-md bg-white dark:bg-card"}
  #title
  What You'll Master
  #description
  - Writing lean, multi-stage, rootless Dockerfiles
  - Managing interconnected services with Docker Compose
  - Crafting robust Kubernetes Deployments, Services, and Ingress
  - Implementing GitOps continuous delivery with ArgoCD & Flux
  - Enforcing Pod Security Standards, Network Policies, and RBAC
  - Scaling applications dynamically using metrics and KEDA events
  - Monitoring, logging, and disaster recovery strategies
  ::
::

::div{class="my-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-8 sm:p-12 rounded-3xl text-center shadow-2xl relative overflow-hidden"}
  ::div{class="relative z-10 max-w-3xl mx-auto"}
    ::badge{variant="outline" class="mb-4 px-3 py-1 text-sm font-medium border-white/30 text-white bg-white/10"}
      Ready to Begin?
    ::
    ::h2{class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white"}
      Level Up Your Container & Kubernetes Skills
    ::
    ::p{class="mt-4 text-blue-100 text-lg sm:text-xl"}
      Start your journey from container basics to production-ready Kubernetes mastery today. Everything is open source and completely free.
    ::

    ::div{class="mt-8 flex flex-wrap justify-center gap-4"}
      ::button-link{to="/getting-started/introduction" variant="secondary" size="lg" leftIcon="lucide:rocket" class="font-semibold shadow-lg"}
        Get Started Now
      ::
      ::button-link{to="/learn-docker/docker/containers" variant="outline" size="lg" leftIcon="lucide:box" class="font-semibold bg-white/10 text-white border-white/40 hover:bg-white/20"}
        Start with Docker
      ::
      ::button-link{to="/learn-kubernetes/kubernetes/architecture" variant="outline" size="lg" leftIcon="lucide:ship-wheel" class="font-semibold bg-white/10 text-white border-white/40 hover:bg-white/20"}
        Explore Kubernetes
      ::
    ::
  ::
::

::div{class="my-16 py-10 px-6 sm:px-8 bg-gradient-to-r from-amber-50/70 to-orange-50/70 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl shadow-sm"}
  ::div{class="text-center max-w-2xl mx-auto mb-8"}
    ::badge{variant="outline" class="mb-2 px-3 py-1 text-sm font-semibold text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800"}
      Open Community
    ::
    ::h2{class="text-2xl sm:text-3xl font-extrabold tracking-tight"}
      Community, Contributions & Support
    ::
    ::p{class="mt-2 text-muted-foreground"}
      Connect with fellow learners, suggest improvements, and join our open-source journey.
    ::
  ::

  ::div{class="grid grid-cols-1 md:grid-cols-3 gap-6"}
    ::card{icon="lucide:github" to="https://github.com/NotHarshhaa/from-docker-to-kubernetes" target="_blank" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-white dark:bg-card border border-amber-100 dark:border-amber-900/50"}
    #title
    GitHub Repository
    #description
    Star the repository, open issues, submit pull requests, and contribute improvements.
    ::

    ::card{icon="lucide:message-circle" to="https://t.me/NotHarshhaa" target="_blank" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-white dark:bg-card border border-amber-100 dark:border-amber-900/50"}
    #title
    Telegram Community
    #description
    Join discussions, share your DevOps projects, ask questions, and collaborate with peers.
    ::

    ::card{icon="lucide:coffee" to="https://ko-fi.com/NotHarshhaa" target="_blank" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-white dark:bg-card border border-amber-100 dark:border-amber-900/50"}
    #title
    Support the Project
    #description
    Support ongoing open-source curriculum updates, server hosting, and new guide creation.
    ::
  ::
::

::div{class="my-16 py-10 px-6 sm:px-8 bg-gradient-to-r from-violet-50/80 to-purple-50/80 dark:from-violet-950/20 dark:to-purple-950/20 border border-violet-100 dark:border-violet-900/40 rounded-2xl shadow-sm"}
  ::div{class="text-center mb-8 max-w-xl mx-auto"}
    ::badge{variant="outline" class="mb-2 px-3 py-1 text-sm font-semibold text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800"}
      Author & Maintainer
    ::
    ::h2{class="text-2xl sm:text-3xl font-extrabold tracking-tight"}
      Meet the Creator
    ::
    ::p{class="mt-2 text-muted-foreground"}
      Built with passion for the cloud-native & open-source community
    ::
  ::

  ::div{class="max-w-3xl mx-auto"}
    ::div{class="bg-white/90 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-violet-100 dark:border-violet-900/50"}
      ::div{class="flex flex-col md:flex-row items-center gap-6 sm:gap-8"}
        ::div{class="relative group shrink-0"}
          ::div{class="relative rounded-full overflow-hidden ring-4 ring-violet-200 dark:ring-violet-700 shadow-xl transition-transform duration-300 group-hover:scale-105"}
            ::img{src="https://github.com/NotHarshhaa.png" alt="Harshhaa" class="w-32 h-32 object-cover"}
          ::
        ::

        ::div{class="flex-1 text-center md:text-left"}
          ::h3{class="text-2xl font-bold tracking-tight bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"}
            Harshhaa Vardhan Reddy
          ::
          ::div{class="text-base font-semibold text-violet-600 dark:text-violet-400 mb-2"}
            Creator & DevOps Engineer
          ::
          ::p{class="text-muted-foreground text-sm sm:text-base mb-4 leading-relaxed"}
            Passionate DevOps & Cloud Engineer committed to making containerization and Kubernetes orchestration approachable, practical, and production-ready for everyone.
          ::
          ::div{class="flex items-center justify-center md:justify-start gap-4"}
            ::a{href="https://github.com/NotHarshhaa" target="_blank" class="p-2 rounded-lg bg-muted hover:bg-violet-100 dark:hover:bg-violet-900/40 text-muted-foreground hover:text-violet-600 dark:hover:text-violet-300 transition-colors"}
              ::smart-icon{name="lucide:github" :size="20"}
            ::
            ::a{href="https://linkedin.com/in/harshhaa-vardhan-reddy" target="_blank" class="p-2 rounded-lg bg-muted hover:bg-violet-100 dark:hover:bg-violet-900/40 text-muted-foreground hover:text-violet-600 dark:hover:text-violet-300 transition-colors"}
              ::smart-icon{name="lucide:linkedin" :size="20"}
            ::
            ::a{href="https://x.com/NotHarshhaa" target="_blank" class="p-2 rounded-lg bg-muted hover:bg-violet-100 dark:hover:bg-violet-900/40 text-muted-foreground hover:text-violet-600 dark:hover:text-violet-300 transition-colors"}
              ::smart-icon{name="lucide:twitter" :size="20"}
            ::
            ::a{href="https://link.notharshhaa.site" target="_blank" class="p-2 rounded-lg bg-muted hover:bg-violet-100 dark:hover:bg-violet-900/40 text-muted-foreground hover:text-violet-600 dark:hover:text-violet-300 transition-colors"}
              ::smart-icon{name="lucide:globe" :size="20"}
            ::
          ::
        ::
      ::

      ::div{class="mt-8 grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-border"}
        ::div{class="text-center p-3 sm:p-4 rounded-xl bg-blue-50/60 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/40"}
          ::div{class="font-bold text-blue-600 dark:text-blue-400 text-sm sm:text-base flex items-center justify-center gap-1.5"}
            ::smart-icon{name="lucide:box" :size="16"}
            Docker
          ::
          ::div{class="text-xs text-muted-foreground mt-0.5"}
            Containers & Swarm
          ::
        ::

        ::div{class="text-center p-3 sm:p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40"}
          ::div{class="font-bold text-indigo-600 dark:text-indigo-400 text-sm sm:text-base flex items-center justify-center gap-1.5"}
            ::smart-icon{name="lucide:ship-wheel" :size="16"}
            Kubernetes
          ::
          ::div{class="text-xs text-muted-foreground mt-0.5"}
            Clusters & GitOps
          ::
        ::

        ::div{class="text-center p-3 sm:p-4 rounded-xl bg-purple-50/60 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/40"}
          ::div{class="font-bold text-purple-600 dark:text-purple-400 text-sm sm:text-base flex items-center justify-center gap-1.5"}
            ::smart-icon{name="lucide:cloud" :size="16"}
            Cloud Native
          ::
          ::div{class="text-xs text-muted-foreground mt-0.5"}
            DevOps & SRE
          ::
        ::
      ::
    ::
  ::
::
