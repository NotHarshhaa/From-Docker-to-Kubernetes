---
title: Home
navigation: false
---

::hero
---
announcement:
  title: 'v1.1.0 now available'
  icon: 'lucide:sparkles'
  to: '/blog/v1-1'
actions:
  - name: Get Started
    to: /getting-started/introduction
    leftIcon: 'lucide:rocket'
  - name: GitHub
    variant: outline
    to: https://github.com/NotHarshhaa
    leftIcon: 'lucide:github'
  - name: View Source
    variant: destructive
    to: https://github.com/NotHarshhaa/From-Docker-to-Kubernetes
    leftIcon: 'lucide:folder-git-2'
---

#title
Master Docker. :br
Orchestrate with Kubernetes.

#description
A comprehensive, hands-on learning platform to help you master containerization and orchestration. :br
Starting with Docker fundamentals and progressing to production-ready Kubernetes deployments. Ideal for developers, DevOps engineers, and anyone building modern cloud-native applications.
::

::feature-banner{class="py-8 my-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl"}
#title
Your Container Journey :span{class="text-gradient-primary"} Simplified

#description
From Docker basics to Kubernetes production deployments, we've got you covered with practical, hands-on guides.
::

::tabs{class="mt-12"}
  ::tab{name="Learning Path" icon="lucide:map"}
    ::div{class="grid grid-cols-1 md:grid-cols-3 gap-6 my-4"}
      ::card{icon="lucide:box" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-blue-100 dark:border-blue-900"}
      #title
      01. Docker Fundamentals
      #description
      Master container basics, images, networking, and best practices. Perfect starting point for your containerization journey.
      ::

      ::card{icon="lucide:layers" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-indigo-100 dark:border-indigo-900"}
      #title
      02. Docker Compose
      #description
      Learn to orchestrate multi-container applications. Define and manage complex application stacks with ease.
      ::

      ::card{icon="lucide:ship" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-purple-100 dark:border-purple-900"}
      #title
      03. Kubernetes Basics
      #description
      Dive into Kubernetes concepts, architecture, and components. Understand how to manage containerized applications at scale.
      ::
    ::
  ::

  ::tab{name="Key Topics" icon="lucide:book-open"}
    ::div{class="grid grid-cols-1 md:grid-cols-3 gap-6 my-4"}
      ::card{icon="lucide:container" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"}
      #title
      Docker Concepts
      #description
      Container lifecycle, Dockerfile optimization, multi-stage builds, and efficient image layering strategies.
      ::

      ::card{icon="lucide:network" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"}
      #title
      Networking
      #description
      Docker networks, Kubernetes networking models, service discovery, and CNI plugins.
      ::

      ::card{icon="lucide:database" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"}
      #title
      Storage Solutions
      #description
      Volumes, persistent storage, StatefulSets, and data management across container lifecycles.
      ::
    ::
  ::

  ::tab{name="Advanced" icon="lucide:zap"}
    ::div{class="grid grid-cols-1 md:grid-cols-3 gap-6 my-4"}
      ::card{icon="lucide:git-merge" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"}
      #title
      GitOps Workflows
      #description
      Implement declarative infrastructure with GitOps principles for continuous deployment to Kubernetes.
      ::

      ::card{icon="lucide:wrench" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"}
      #title
      Service Mesh
      #description
      Enhance application communication with Istio, Linkerd, or Cilium for advanced traffic management.
      ::

      ::card{icon="lucide:shield" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"}
      #title
      Zero-Trust Security
      #description
      Implement security best practices with Pod Security Policies, network policies, and RBAC.
      ::
    ::
  ::
::

::div{class="my-12 py-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 rounded-xl"}
  ::div{class="text-center mb-6"}
    ::h2{class="flex items-center justify-center gap-2 text-xl font-bold"}
      <i class="lucide-layers text-green-600 dark:text-green-400"></i>
      Key Kubernetes Components
    ::
  ::

  ::div{class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 px-4"}
    ::card{icon="lucide:box-select" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"}
    #title
    Pods & Deployments
    #description
    Core building blocks for running containers and ensuring application availability.
    ::

    ::card{icon="lucide:webhook" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"}
    #title
    Services & Ingress
    #description
    Network abstraction and external access for your containerized applications.
    ::

    ::card{icon="lucide:disc" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"}
    #title
    ConfigMaps & Secrets
    #description
    Manage configuration data and sensitive information for your applications.
    ::

    ::card{icon="lucide:file-cog" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"}
    #title
    StatefulSets & Storage
    #description
    Persistent storage solutions for stateful applications in Kubernetes.
    ::
  ::
::

::div{class="my-12"}
  ::div{class="text-center mb-6"}
    ::h2{class="flex items-center justify-center gap-2 text-xl font-bold"}
      <i class="lucide-workflow text-blue-600 dark:text-blue-400"></i>
      Advanced Topics
    ::
  ::

  ::div{class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"}
    ::card{icon="lucide:package" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"}
    #title
    Helm Charts
    #description
    Package, version, and deploy applications with Kubernetes' package manager. Create reusable application templates.
    ::

    ::card{icon="lucide:wand-sparkles" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"}
    #title
    Operators & CRDs
    #description
    Extend Kubernetes capabilities with custom resources and automated operations for complex applications.
    ::

    ::card{icon="lucide:webhook" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"}
    #title
    Gateway API
    #description
    The next generation of Kubernetes networking with advanced routing, traffic splitting, and API management.
    ::
  ::

  ::div{class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"}
    ::card{icon="lucide:shield" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"}
    #title
    Security
    #description
    Implement defense-in-depth with container scanning, runtime security, network policies, and RBAC.
    ::

    ::card{icon="lucide:git-merge" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"}
    #title
    CI/CD Pipelines
    #description
    Build automated workflows for container build, test, and deployment with GitHub Actions, Jenkins, or ArgoCD.
    ::

    ::card{icon="lucide:activity" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"}
    #title
    Observability
    #description
    Implement monitoring, logging, and tracing with Prometheus, Grafana, Loki, and OpenTelemetry.
    ::
  ::
::

::div{class="my-12 py-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl"}
  ::div{class="text-center mb-6"}
    ::h2{class="flex items-center justify-center gap-2 text-xl font-bold"}
      <i class="lucide-sparkles text-purple-600 dark:text-purple-400"></i>
      Real-World Applications
    ::
  ::

  ::div{class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 px-4"}
    ::card{icon="lucide:blocks" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"}
    #title
    Microservices Architecture
    #description
    Deploy a complete microservices application with API gateway, service discovery, and backend services.
    ::

    ::card{icon="lucide:database" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"}
    #title
    Stateful Applications
    #description
    Run databases, message queues, and other stateful workloads with proper persistence and high availability.
    ::

    ::card{icon="lucide:server" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"}
    #title
    Edge Computing
    #description
    Deploy lightweight Kubernetes distributions at the edge with K3s, MicroK8s, or KubeEdge.
    ::
  ::
::

::div{class="my-12 grid grid-cols-1 md:grid-cols-2 gap-8"}
  ::card{icon="lucide:users" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-l-4 border-l-blue-500 dark:border-l-blue-400"}
  #title
  Who is this for?

  #description
  - **Developers** looking to containerize their applications
  - **DevOps Engineers** building modern deployment pipelines
  - **System Administrators** managing container infrastructure
  - **Cloud Engineers** working with container orchestration
  - **Platform Teams** building developer experiences
  - **SREs** implementing reliability practices
  - **Students** learning cloud-native technologies
  ::

  ::card{icon="lucide:check-circle" class="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-l-4 border-l-green-500 dark:border-l-green-400"}
  #title
  What You'll Learn

  #description
  - Docker container fundamentals and advanced techniques
  - Multi-container applications with Docker Compose
  - Kubernetes concepts, components, and architecture
  - Deploying and scaling applications on Kubernetes
  - Infrastructure as Code and GitOps workflows
  - Implementing security best practices
  - Monitoring and observability for container workloads
  - Production-ready deployment strategies
  ::
::

::div{class="my-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-8 rounded-xl text-center"}
  ::div{class="text-center mb-6"}
    ::h2{class="flex items-center justify-center gap-2 text-xl font-bold"}
      <i class="lucide-rocket text-blue-600 dark:text-blue-400"></i>
      Ready to Begin Your Container Journey?
    ::
  ::

  ::div{class="max-w-3xl mx-auto mt-4 text-lg text-gray-700 dark:text-gray-300"}
  Start your path from Docker basics to Kubernetes mastery. Our structured learning approach ensures you build a solid foundation while gaining practical, real-world experience.
  ::

  ::div{class="mt-8 flex flex-wrap justify-center gap-4"}
    ::a{href="/getting-started/introduction" class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-flex items-center"}
    Get Started Now
    ::

    ::a{href="/examples/demo" class="px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 inline-flex items-center"}
    View Demo Applications
    ::
  ::
::
