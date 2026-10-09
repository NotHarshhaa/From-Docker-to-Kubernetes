<template>
  <div class="my-8 rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-xl text-card-foreground">
    <!-- Header -->
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
      <div>
        <div class="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
          <Icon name="lucide:terminal" class="size-3.5" />
          <span>Interactive DevOps Tool</span>
        </div>
        <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
          <Icon name="lucide:search-code" class="size-6 text-emerald-500" />
          <span>Kubectl &amp; Docker Cheat Sheet Explorer</span>
        </h3>
        <p class="text-sm text-muted-foreground mt-1">
          Search, filter, and customize commands in real-time with dynamic variable substitution and flag explanations.
        </p>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors"
          @click="resetFilters"
        >
          <Icon name="lucide:rotate-ccw" class="size-3.5" />
          <span>Reset All</span>
        </button>
      </div>
    </div>

    <!-- Mode Selector: Kubectl vs Docker vs Compose -->
    <div class="mb-6 flex flex-wrap items-center gap-2">
      <button
        v-for="tool in tools"
        :key="tool.id"
        type="button"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all shadow-sm shrink-0"
        :class="activeTool === tool.id
          ? 'bg-primary text-primary-foreground shadow-primary/20 scale-[1.02]'
          : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/60'"
        @click="selectTool(tool.id)"
      >
        <Icon :name="tool.icon" class="size-4" />
        <span>{{ tool.name }}</span>
        <span
          class="text-xs px-1.5 py-0.5 rounded-full font-mono font-normal"
          :class="activeTool === tool.id ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-background/80 text-muted-foreground'"
        >
          {{ getToolCommandCount(tool.id) }}
        </span>
      </button>
    </div>

    <!-- Dynamic Variable Substitution Toolbar -->
    <div class="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 transition-colors">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <Icon name="lucide:sliders-horizontal" class="size-4" />
          <span>Live Variable Substitution</span>
        </div>
        <span class="text-[11px] text-muted-foreground">Type below to update commands instantly</span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        <div v-for="variable in currentVariables" :key="variable.key">
          <label class="block text-[11px] font-mono text-muted-foreground mb-1 flex items-center justify-between">
            <span>${{ variable.key }}</span>
          </label>
          <input
            v-model="variables[variable.key]"
            type="text"
            class="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-muted-foreground/50"
            :placeholder="variable.placeholder"
          />
        </div>
      </div>
    </div>

    <!-- Search Bar & Category Filters -->
    <div class="mb-6 space-y-3">
      <!-- Search Input -->
      <div class="relative">
        <Icon name="lucide:search" class="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Filter commands by keyword, flag, or use case (e.g., 'logs -f', 'port-forward', 'prune', 'oom', 'crash')..."
          class="w-full rounded-xl border border-border bg-background pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
        />
        <button
          v-if="searchQuery"
          type="button"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          @click="searchQuery = ''"
        >
          <Icon name="lucide:x" class="size-4" />
        </button>
      </div>

      <!-- Categories Filter Pills -->
      <div class="flex flex-wrap items-center gap-1.5 pt-1">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors"
          :class="selectedCategory === 'ALL'
            ? 'bg-foreground text-background font-semibold'
            : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'"
          @click="selectedCategory = 'ALL'"
        >
          <span>All Categories</span>
          <span class="text-[10px] opacity-70">({{ filteredByToolCommands.length }})</span>
        </button>

        <button
          v-for="cat in availableCategories"
          :key="cat.id"
          type="button"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors"
          :class="selectedCategory === cat.id
            ? 'bg-foreground text-background font-semibold'
            : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'"
          @click="selectedCategory = cat.id"
        >
          <Icon :name="cat.icon" class="size-3" />
          <span>{{ cat.name }}</span>
          <span class="text-[10px] opacity-70">({{ getCategoryCount(cat.id) }})</span>
        </button>
      </div>
    </div>

    <!-- Results Counter and Safety Badge Legend -->
    <div class="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground gap-2">
      <div>
        Showing <strong class="text-foreground">{{ displayedCommands.length }}</strong> of
        <strong class="text-foreground">{{ filteredByToolCommands.length }}</strong> commands
      </div>
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center gap-1">
          <span class="size-2 rounded-full bg-emerald-500 inline-block"></span>
          Safe / Read-only
        </span>
        <span class="inline-flex items-center gap-1">
          <span class="size-2 rounded-full bg-amber-500 inline-block"></span>
          Modifies state
        </span>
        <span class="inline-flex items-center gap-1">
          <span class="size-2 rounded-full bg-rose-500 inline-block"></span>
          Destructive / Danger
        </span>
      </div>
    </div>

    <!-- Commands List Grid -->
    <div v-if="displayedCommands.length > 0" class="space-y-3.5">
      <div
        v-for="cmd in displayedCommands"
        :key="cmd.id"
        class="group rounded-xl border border-border/80 bg-background/50 hover:bg-background/90 p-4 transition-all duration-200 hover:shadow-md hover:border-border"
      >
        <!-- Command Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2.5">
          <div class="flex items-center gap-2 flex-wrap">
            <span
              class="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
              :class="safetyBadgeClass(cmd.safety)"
            >
              <span class="size-1.5 rounded-full" :class="safetyDotClass(cmd.safety)"></span>
              {{ cmd.safety }}
            </span>
            <span class="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              <Icon :name="getCategoryIcon(cmd.category)" class="size-3" />
              {{ cmd.category }}
            </span>
            <h4 class="text-sm font-bold text-foreground">
              {{ cmd.title }}
            </h4>
          </div>

          <!-- Tags -->
          <div class="flex items-center gap-1.5">
            <span
              v-for="tag in cmd.tags"
              :key="tag"
              class="text-[10px] text-muted-foreground/80 bg-muted/40 px-1.5 py-0.5 rounded border border-border/40 font-mono"
            >
              #{{ tag }}
            </span>
          </div>
        </div>

        <!-- Description -->
        <p class="text-xs text-muted-foreground mb-3 leading-relaxed">
          {{ cmd.description }}
        </p>

        <!-- Command Code Box -->
        <div class="relative rounded-lg border border-border/70 bg-zinc-950 text-zinc-100 p-3 font-mono text-xs overflow-x-auto flex items-center justify-between gap-3 group-hover:border-primary/40 transition-colors">
          <div class="flex items-center gap-2 overflow-x-auto py-0.5">
            <span class="text-emerald-400 select-none font-bold">$</span>
            <span class="whitespace-nowrap selection:bg-emerald-500/30 font-medium tracking-wide">
              {{ substituteVariables(cmd.command) }}
            </span>
          </div>

          <button
            type="button"
            class="shrink-0 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-sans font-medium transition-all"
            :class="copiedCommandId === cmd.id
              ? 'bg-emerald-500 text-white'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'"
            @click="copyCommand(cmd)"
          >
            <Icon :name="copiedCommandId === cmd.id ? 'lucide:check' : 'lucide:copy'" class="size-3.5" />
            <span>{{ copiedCommandId === cmd.id ? 'Copied' : 'Copy' }}</span>
          </button>
        </div>

        <!-- Flag Explanations / Notes if present -->
        <div v-if="cmd.flags && cmd.flags.length > 0" class="mt-2.5 pt-2 border-t border-border/40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
          <div
            v-for="flag in cmd.flags"
            :key="flag.name"
            class="text-[11px] flex items-start gap-1.5 text-muted-foreground"
          >
            <code class="font-mono text-emerald-600 dark:text-emerald-400 shrink-0 font-semibold text-[10px] bg-muted/60 px-1 py-0.2 rounded">
              {{ flag.name }}
            </code>
            <span class="truncate">{{ flag.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12 border border-dashed border-border rounded-xl">
      <Icon name="lucide:search-x" class="size-10 text-muted-foreground mx-auto mb-3" />
      <h4 class="text-base font-semibold text-foreground">No commands matched your search</h4>
      <p class="text-xs text-muted-foreground max-w-sm mx-auto mt-1 mb-4">
        Try searching with fewer words, clear your category filter, or reset your search query.
      </p>
      <button
        type="button"
        class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-primary text-primary-foreground px-4 py-2 text-xs font-medium hover:opacity-90 transition-opacity"
        @click="resetFilters"
      >
        <Icon name="lucide:rotate-ccw" class="size-3.5" />
        <span>Clear Filters</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

const activeTool = ref<'kubectl' | 'docker' | 'compose'>('kubectl')
const searchQuery = ref('')
const selectedCategory = ref('ALL')
const copiedCommandId = ref<string | null>(null)

// Dynamic variables mapped to replacement tokens
const variables = reactive<Record<string, string>>({
  NAMESPACE: 'default',
  POD_NAME: 'my-app-pod',
  DEPLOYMENT: 'my-app-deploy',
  CONTAINER: 'app',
  IMAGE: 'nginx:alpine',
  SERVICE: 'my-service',
  PORT: '8080:80',
  NODE: 'node-1',
  TAG: 'latest',
  COMPOSE_FILE: 'docker-compose.yml',
})

const tools = [
  { id: 'kubectl', name: 'Kubernetes (kubectl)', icon: 'lucide:box', count: 0 },
  { id: 'docker', name: 'Docker Engine', icon: 'lucide:container', count: 0 },
  { id: 'compose', name: 'Docker Compose', icon: 'lucide:layers', count: 0 },
]

const variableConfigs: Record<string, { key: string; placeholder: string }[]> = {
  kubectl: [
    { key: 'NAMESPACE', placeholder: 'default' },
    { key: 'POD_NAME', placeholder: 'my-app-pod' },
    { key: 'DEPLOYMENT', placeholder: 'my-app-deploy' },
    { key: 'CONTAINER', placeholder: 'app' },
    { key: 'SERVICE', placeholder: 'my-service' },
    { key: 'PORT', placeholder: '8080:80' },
  ],
  docker: [
    { key: 'CONTAINER', placeholder: 'my-container' },
    { key: 'IMAGE', placeholder: 'nginx:alpine' },
    { key: 'PORT', placeholder: '8080:80' },
    { key: 'TAG', placeholder: 'latest' },
  ],
  compose: [
    { key: 'COMPOSE_FILE', placeholder: 'docker-compose.yml' },
    { key: 'SERVICE', placeholder: 'web' },
  ],
}

const currentVariables = computed(() => {
  return variableConfigs[activeTool.value] || []
})

interface FlagInfo {
  name: string
  desc: string
}

interface CommandItem {
  id: string
  tool: 'kubectl' | 'docker' | 'compose'
  category: string
  title: string
  description: string
  command: string
  safety: 'read-only' | 'modifies' | 'danger'
  tags: string[]
  flags?: FlagInfo[]
}

const commandDatabase: CommandItem[] = [
  // --- KUBECTL: Pods & Workloads ---
  {
    id: 'k-get-pods-wide',
    tool: 'kubectl',
    category: 'Pods & Workloads',
    title: 'List Pods with Node & IP Details',
    description: 'List all running and pending pods in the specified namespace with IP, assigned node, and readiness status.',
    command: 'kubectl get pods -n ${NAMESPACE} -o wide',
    safety: 'read-only',
    tags: ['pods', 'status', 'ip', 'node'],
    flags: [
      { name: '-n', desc: 'Target namespace' },
      { name: '-o wide', desc: 'Displays Node, IP, and readiness' },
    ],
  },
  {
    id: 'k-get-pods-all',
    tool: 'kubectl',
    category: 'Pods & Workloads',
    title: 'List Pods Across Entire Cluster',
    description: 'Query all pods across all namespaces simultaneously. Crucial for cluster-wide health checks.',
    command: 'kubectl get pods -A',
    safety: 'read-only',
    tags: ['cluster-wide', 'overview'],
    flags: [{ name: '-A / -all-namespaces', desc: 'Scans all namespaces' }],
  },
  {
    id: 'k-get-not-running',
    tool: 'kubectl',
    category: 'Pods & Workloads',
    title: 'Find Unhealthy & Crashing Pods',
    description: 'Filter only pods that are not in the "Running" state (e.g. CrashLoopBackOff, Pending, Error).',
    command: 'kubectl get pods -A --field-selector=status.phase!=Running',
    safety: 'read-only',
    tags: ['troubleshooting', 'crashloop', 'errors'],
    flags: [{ name: '--field-selector', desc: 'Filter by server-side resource fields' }],
  },
  {
    id: 'k-describe-pod',
    tool: 'kubectl',
    category: 'Pods & Workloads',
    title: 'Deep Inspect Pod & Lifecycle Events',
    description: 'Displays container state, exit codes, volume mounts, resource limits, and event history for diagnosing crashes.',
    command: 'kubectl describe pod ${POD_NAME} -n ${NAMESPACE}',
    safety: 'read-only',
    tags: ['inspect', 'oomkilled', 'events'],
  },
  {
    id: 'k-delete-pod-force',
    tool: 'kubectl',
    category: 'Pods & Workloads',
    title: 'Force Kill Stuck Terminating Pod',
    description: 'Immediately terminate a stuck pod with zero grace period. Use with caution in production.',
    command: 'kubectl delete pod ${POD_NAME} -n ${NAMESPACE} --grace-period=0 --force',
    safety: 'danger',
    tags: ['force', 'cleanup', 'stuck'],
    flags: [
      { name: '--grace-period=0', desc: 'Zero delay before SIGKILL' },
      { name: '--force', desc: 'Bypass API confirmation delay' },
    ],
  },
  {
    id: 'k-rollout-restart',
    tool: 'kubectl',
    category: 'Pods & Workloads',
    title: 'Zero-Downtime Rolling Restart of Deployment',
    description: 'Trigger a rolling restart of all pods in a Deployment without changing the deployment spec.',
    command: 'kubectl rollout restart deployment/${DEPLOYMENT} -n ${NAMESPACE}',
    safety: 'modifies',
    tags: ['deployment', 'restart', 'zero-downtime'],
  },
  {
    id: 'k-rollout-status',
    tool: 'kubectl',
    category: 'Pods & Workloads',
    title: 'Track Deployment Rollout Progress',
    description: 'Block and watch until the deployment update finishes or fails with a timeout.',
    command: 'kubectl rollout status deployment/${DEPLOYMENT} -n ${NAMESPACE}',
    safety: 'read-only',
    tags: ['ci-cd', 'status', 'automation'],
  },
  {
    id: 'k-rollout-undo',
    tool: 'kubectl',
    category: 'Pods & Workloads',
    title: 'Rollback Deployment to Previous Revision',
    description: 'Instantly revert a bad deployment to the previous stable replica set revision.',
    command: 'kubectl rollout undo deployment/${DEPLOYMENT} -n ${NAMESPACE}',
    safety: 'modifies',
    tags: ['rollback', 'recovery', 'incident'],
  },
  {
    id: 'k-scale-replicas',
    tool: 'kubectl',
    category: 'Pods & Workloads',
    title: 'Manually Scale Deployment Replicas',
    description: 'Increase or decrease the replica count of an active deployment.',
    command: 'kubectl scale deployment/${DEPLOYMENT} --replicas=5 -n ${NAMESPACE}',
    safety: 'modifies',
    tags: ['scale', 'traffic', 'capacity'],
    flags: [{ name: '--replicas', desc: 'Target desired replica count' }],
  },

  // --- KUBECTL: Debugging & Logs ---
  {
    id: 'k-logs-tail-f',
    tool: 'kubectl',
    category: 'Debugging & Logs',
    title: 'Stream Live Logs (Follow & Tail)',
    description: 'Continuously stream real-time logs with the latest 100 lines for immediate debugging.',
    command: 'kubectl logs -f ${POD_NAME} -n ${NAMESPACE} --tail=100',
    safety: 'read-only',
    tags: ['logs', 'stream', 'tail'],
    flags: [
      { name: '-f', desc: 'Stream logs continuously' },
      { name: '--tail', desc: 'Number of recent lines to display' },
    ],
  },
  {
    id: 'k-logs-previous',
    tool: 'kubectl',
    category: 'Debugging & Logs',
    title: 'View Logs of Crashed/Terminated Container',
    description: 'Retrieve the logs from the previous instance of a pod that died or was OOMKilled.',
    command: 'kubectl logs ${POD_NAME} -n ${NAMESPACE} -c ${CONTAINER} --previous',
    safety: 'read-only',
    tags: ['crash', 'oom', 'debug'],
    flags: [
      { name: '-p / --previous', desc: 'Inspect logs from previous terminated container' },
      { name: '-c', desc: 'Specify container inside multi-container pod' },
    ],
  },
  {
    id: 'k-exec-shell',
    tool: 'kubectl',
    category: 'Debugging & Logs',
    title: 'Interactive Shell Inside Running Pod',
    description: 'Open an interactive sh/bash terminal session inside a container.',
    command: 'kubectl exec -it ${POD_NAME} -n ${NAMESPACE} -c ${CONTAINER} -- /bin/sh',
    safety: 'modifies',
    tags: ['exec', 'ssh', 'terminal', 'debug'],
    flags: [
      { name: '-i', desc: 'Pass stdin to container' },
      { name: '-t', desc: 'Allocate TTY (pseudo-terminal)' },
    ],
  },
  {
    id: 'k-port-forward',
    tool: 'kubectl',
    category: 'Debugging & Logs',
    title: 'Forward Local Port to Pod or Service',
    description: 'Access internal cluster applications, Redis, or databases directly from your localhost browser.',
    command: 'kubectl port-forward pod/${POD_NAME} ${PORT} -n ${NAMESPACE}',
    safety: 'read-only',
    tags: ['network', 'localhost', 'proxy'],
  },
  {
    id: 'k-top-pods',
    tool: 'kubectl',
    category: 'Debugging & Logs',
    title: 'View Pod CPU & Memory Resource Metrics',
    description: 'Inspect live CPU millicores and memory megabytes usage using Metrics Server.',
    command: 'kubectl top pods -n ${NAMESPACE} --sort-by=memory',
    safety: 'read-only',
    tags: ['metrics', 'cpu', 'memory', 'hpa'],
    flags: [{ name: '--sort-by', desc: 'Sort output by memory or cpu' }],
  },
  {
    id: 'k-debug-ephemeral',
    tool: 'kubectl',
    category: 'Debugging & Logs',
    title: 'Attach Ephemeral Debug Container to Distroless Pod',
    description: 'Attach a debug container equipped with curl, netstat, and bash to a stripped distroless pod.',
    command: 'kubectl debug -it ${POD_NAME} -n ${NAMESPACE} --image=nicolaka/netshoot --target=${CONTAINER}',
    safety: 'modifies',
    tags: ['distroless', 'netshoot', 'troubleshoot'],
  },

  // --- KUBECTL: Config & Secrets ---
  {
    id: 'k-get-secret-decoded',
    tool: 'kubectl',
    category: 'Config & Secrets',
    title: 'Decode Secret Value Directly to Plaintext',
    description: 'Extract and decode base64 Kubernetes Secret data keys directly on the CLI.',
    command: "kubectl get secret my-secret -n ${NAMESPACE} -o jsonpath='{.data}'",
    safety: 'read-only',
    tags: ['secret', 'base64', 'decode'],
    flags: [{ name: '-o jsonpath', desc: 'Extract specific JSON attributes' }],
  },
  {
    id: 'k-create-secret-generic',
    tool: 'kubectl',
    category: 'Config & Secrets',
    title: 'Create Generic Secret from Literal Values',
    description: 'Quickly create a Kubernetes secret without manually encoding in base64.',
    command: 'kubectl create secret generic app-secrets --from-literal=DB_PASS=secret123 -n ${NAMESPACE}',
    safety: 'modifies',
    tags: ['secret', 'create', 'credentials'],
  },
  {
    id: 'k-dry-run-yaml',
    tool: 'kubectl',
    category: 'Config & Secrets',
    title: 'Generate YAML Manifest via Client-Side Dry Run',
    description: 'Generate starter Kubernetes manifest YAML without applying it to the cluster.',
    command: 'kubectl create deployment ${DEPLOYMENT} --image=${IMAGE} --dry-run=client -o yaml > deployment.yaml',
    safety: 'read-only',
    tags: ['yaml', 'generator', 'dry-run'],
    flags: [
      { name: '--dry-run=client', desc: 'Run locally without cluster contact' },
      { name: '-o yaml', desc: 'Output clean YAML manifest' },
    ],
  },

  // --- KUBECTL: Cluster Admin & Nodes ---
  {
    id: 'k-top-nodes',
    tool: 'kubectl',
    category: 'Cluster Admin',
    title: 'View Node CPU & RAM Consumption',
    description: 'Quickly identify overworked or bottlenecked worker nodes in your cluster.',
    command: 'kubectl top nodes --sort-by=cpu',
    safety: 'read-only',
    tags: ['nodes', 'cluster', 'capacity'],
  },
  {
    id: 'k-drain-node',
    tool: 'kubectl',
    category: 'Cluster Admin',
    title: 'Drain Node Safely for Maintenance',
    description: 'Evict all running pods from a node so it can be safely upgraded or replaced.',
    command: 'kubectl drain ${NODE} --ignore-daemonsets --delete-emptydir-data',
    safety: 'danger',
    tags: ['maintenance', 'upgrade', 'drain'],
    flags: [
      { name: '--ignore-daemonsets', desc: 'Preserves cluster-wide system daemon pods' },
      { name: '--delete-emptydir-data', desc: 'Continues even if pods have temporary emptyDir storage' },
    ],
  },
  {
    id: 'k-cordon-node',
    tool: 'kubectl',
    category: 'Cluster Admin',
    title: 'Cordon Node (Mark Unschedulable)',
    description: 'Prevent the Kubernetes scheduler from assigning new pods to the target node.',
    command: 'kubectl cordon ${NODE}',
    safety: 'modifies',
    tags: ['cordon', 'unschedulable'],
  },
  {
    id: 'k-change-context',
    tool: 'kubectl',
    category: 'Cluster Admin',
    title: 'Switch Active Kubeconfig Cluster Context',
    description: 'Switch your active kubectl context between dev, staging, and production clusters.',
    command: 'kubectl config use-context prod-cluster-admin',
    safety: 'modifies',
    tags: ['context', 'kubeconfig', 'auth'],
  },

  // --- DOCKER: Containers ---
  {
    id: 'd-run-detached',
    tool: 'docker',
    category: 'Containers',
    title: 'Run Container Detached with Port & Restart Policy',
    description: 'Start a container in background with port mapping, named container, and automatic restart on crash.',
    command: 'docker run -d --name ${CONTAINER} -p ${PORT} --restart unless-stopped ${IMAGE}',
    safety: 'modifies',
    tags: ['run', 'daemon', 'start'],
    flags: [
      { name: '-d', desc: 'Run in background (detached)' },
      { name: '-p', desc: 'Host:Container port binding' },
      { name: '--restart', desc: 'Auto restart on server reboot or crash' },
    ],
  },
  {
    id: 'd-ps-all',
    tool: 'docker',
    category: 'Containers',
    title: 'List All Containers Including Stopped',
    description: 'Inspect active and exited containers along with exit codes and ports.',
    command: 'docker ps -a --format "table {{.ID}}\\t{{.Names}}\\t{{.Status}}\\t{{.Ports}}"',
    safety: 'read-only',
    tags: ['ps', 'status', 'list'],
    flags: [
      { name: '-a', desc: 'Show all stopped and running containers' },
      { name: '--format', desc: 'Custom table column formatting' },
    ],
  },
  {
    id: 'd-logs-tail-f',
    tool: 'docker',
    category: 'Containers',
    title: 'Stream Container Logs with Timestamps',
    description: 'Follow live output from stdout/stderr with exact timestamps and last 100 lines.',
    command: 'docker logs -f --tail 100 -t ${CONTAINER}',
    safety: 'read-only',
    tags: ['logs', 'tail', 'timestamps'],
    flags: [
      { name: '-f', desc: 'Follow log stream' },
      { name: '-t', desc: 'Include RFC3339 timestamps' },
      { name: '--tail', desc: 'Limit lines from the end' },
    ],
  },
  {
    id: 'd-exec-bash',
    tool: 'docker',
    category: 'Containers',
    title: 'Interactive Shell Inside Container',
    description: 'Spawn a live bash/sh session inside a running Docker container.',
    command: 'docker exec -it ${CONTAINER} sh',
    safety: 'modifies',
    tags: ['exec', 'sh', 'shell'],
    flags: [
      { name: '-i', desc: 'Keep STDIN open' },
      { name: '-t', desc: 'Allocate a pseudo-TTY' },
    ],
  },
  {
    id: 'd-stats-stream',
    tool: 'docker',
    category: 'Containers',
    title: 'Live CPU, RAM & Network I/O Stream',
    description: 'Live performance dashboard of all running Docker containers.',
    command: 'docker stats --no-stream=false',
    safety: 'read-only',
    tags: ['stats', 'metrics', 'memory', 'cpu'],
  },
  {
    id: 'd-stop-all',
    tool: 'docker',
    category: 'Containers',
    title: 'Gracefully Stop All Running Containers',
    description: 'Send SIGTERM followed by SIGKILL to all active containers.',
    command: 'docker stop $(docker ps -q)',
    safety: 'modifies',
    tags: ['stop', 'cleanup'],
  },

  // --- DOCKER: Images ---
  {
    id: 'd-build-no-cache',
    tool: 'docker',
    category: 'Images',
    title: 'Build Image Without Cache',
    description: 'Force a complete rebuild from scratch, pulling fresh base layers and dependencies.',
    command: 'docker build --no-cache -t ${IMAGE}:${TAG} -f Dockerfile .',
    safety: 'modifies',
    tags: ['build', 'no-cache', 'dockerfile'],
    flags: [
      { name: '--no-cache', desc: 'Ignore cached image layers' },
      { name: '-t', desc: 'Tag image name and version' },
    ],
  },
  {
    id: 'd-prune-images',
    tool: 'docker',
    category: 'Images',
    title: 'Delete All Dangling & Unused Images',
    description: 'Reclaim gigabytes of disk space by deleting unused and untagged intermediate layers.',
    command: 'docker image prune -a --force',
    safety: 'danger',
    tags: ['prune', 'cleanup', 'disk-space'],
    flags: [
      { name: '-a', desc: 'Remove all images not referenced by running container' },
      { name: '--force', desc: 'Do not prompt for confirmation' },
    ],
  },
  {
    id: 'd-history-layers',
    tool: 'docker',
    category: 'Images',
    title: 'Inspect Docker Image Layer Sizes',
    description: 'Identify large layers and bloated steps in your Dockerfile to optimize image footprint.',
    command: 'docker history --human=true ${IMAGE}',
    safety: 'read-only',
    tags: ['inspect', 'layers', 'size', 'optimize'],
  },

  // --- DOCKER: Volumes & Networks ---
  {
    id: 'd-volume-prune',
    tool: 'docker',
    category: 'Volumes & Networks',
    title: 'Remove All Unattached Storage Volumes',
    description: 'Permanently remove all anonymous or named Docker volumes not connected to a container.',
    command: 'docker volume prune -f',
    safety: 'danger',
    tags: ['volume', 'disk', 'prune'],
  },
  {
    id: 'd-network-inspect',
    tool: 'docker',
    category: 'Volumes & Networks',
    title: 'Inspect Containers Attached to Network Bridge',
    description: 'List all containers and their assigned internal IPs within a Docker network.',
    command: 'docker network inspect bridge',
    safety: 'read-only',
    tags: ['network', 'ip', 'dns'],
  },
  {
    id: 'd-system-prune',
    tool: 'docker',
    category: 'Maintenance',
    title: 'Nuclear System Cleanup (Containers, Images, Networks)',
    description: 'Reclaim maximum disk space by pruning all stopped containers, unused networks, and dangling images.',
    command: 'docker system prune -a --volumes -f',
    safety: 'danger',
    tags: ['nuclear', 'clean', 'disk', 'free-space'],
    flags: [
      { name: '-a', desc: 'Prune all unused images, not just dangling' },
      { name: '--volumes', desc: 'Prune unused storage volumes too' },
    ],
  },

  // --- COMPOSE: Lifecycle & Operations ---
  {
    id: 'dc-up-build',
    tool: 'compose',
    category: 'Lifecycle',
    title: 'Build and Start All Services Detached',
    description: 'Rebuild images if changed and start containers in background with isolated network.',
    command: 'docker compose -f ${COMPOSE_FILE} up -d --build',
    safety: 'modifies',
    tags: ['up', 'build', 'daemon'],
    flags: [
      { name: '-d', desc: 'Detached background mode' },
      { name: '--build', desc: 'Rebuild images before starting' },
    ],
  },
  {
    id: 'dc-down-volumes',
    tool: 'compose',
    category: 'Lifecycle',
    title: 'Tear Down Stack & Wipe Volumes',
    description: 'Stop and remove all containers, networks, and named storage volumes declared in compose.',
    command: 'docker compose -f ${COMPOSE_FILE} down -v --remove-orphans',
    safety: 'danger',
    tags: ['down', 'destroy', 'clean'],
    flags: [
      { name: '-v', desc: 'Remove named volumes declared in compose file' },
      { name: '--remove-orphans', desc: 'Clean containers not defined in compose' },
    ],
  },
  {
    id: 'dc-logs-service',
    tool: 'compose',
    category: 'Operations',
    title: 'Stream Logs for Specific Service',
    description: 'Filter real-time log output for a single target service rather than entire multi-container stack.',
    command: 'docker compose -f ${COMPOSE_FILE} logs -f --tail=100 ${SERVICE}',
    safety: 'read-only',
    tags: ['logs', 'service', 'stream'],
  },
  {
    id: 'dc-exec-service',
    tool: 'compose',
    category: 'Operations',
    title: 'Execute Command Inside Service Container',
    description: 'Execute interactive bash/sh inside the running instance of a compose service.',
    command: 'docker compose -f ${COMPOSE_FILE} exec ${SERVICE} sh',
    safety: 'modifies',
    tags: ['exec', 'sh', 'debug'],
  },
  {
    id: 'dc-restart-service',
    tool: 'compose',
    category: 'Operations',
    title: 'Restart Single Service Without Downtime to Others',
    description: 'Restart only the target service without stopping databases or cache containers.',
    command: 'docker compose -f ${COMPOSE_FILE} restart ${SERVICE}',
    safety: 'modifies',
    tags: ['restart', 'isolated'],
  },
]

function selectTool(id: string) {
  activeTool.value = id as 'kubectl' | 'docker' | 'compose'
  selectedCategory.value = 'ALL'
}

function getToolCommandCount(toolId: string) {
  return commandDatabase.filter((c) => c.tool === toolId).length
}

const filteredByToolCommands = computed(() => {
  return commandDatabase.filter((c) => c.tool === activeTool.value)
})

const availableCategories = computed(() => {
  const cats = new Set<string>()
  filteredByToolCommands.value.forEach((c) => cats.add(c.category))
  return Array.from(cats).map((name) => ({
    id: name,
    name,
    icon: getCategoryIcon(name),
  }))
})

function getCategoryCount(catName: string) {
  return filteredByToolCommands.value.filter((c) => c.category === catName).length
}

function getCategoryIcon(cat: string): string {
  switch (cat) {
    case 'Pods & Workloads':
      return 'lucide:box'
    case 'Debugging & Logs':
      return 'lucide:stethoscope'
    case 'Config & Secrets':
      return 'lucide:key'
    case 'Cluster Admin':
      return 'lucide:server'
    case 'Containers':
      return 'lucide:container'
    case 'Images':
      return 'lucide:layers'
    case 'Volumes & Networks':
      return 'lucide:network'
    case 'Maintenance':
      return 'lucide:sparkles'
    case 'Lifecycle':
      return 'lucide:play'
    case 'Operations':
      return 'lucide:terminal'
    default:
      return 'lucide:tag'
  }
}

const displayedCommands = computed(() => {
  let list = filteredByToolCommands.value

  if (selectedCategory.value !== 'ALL') {
    list = list.filter((c) => c.category === selectedCategory.value)
  }

  const query = searchQuery.value.trim().toLowerCase()
  if (query) {
    list = list.filter((c) => {
      const substituted = substituteVariables(c.command).toLowerCase()
      const rawCmd = c.command.toLowerCase()
      const title = c.title.toLowerCase()
      const desc = c.description.toLowerCase()
      const tags = c.tags.join(' ').toLowerCase()
      const flags = c.flags ? c.flags.map((f) => `${f.name} ${f.desc}`).join(' ').toLowerCase() : ''

      return (
        substituted.includes(query) ||
        rawCmd.includes(query) ||
        title.includes(query) ||
        desc.includes(query) ||
        tags.includes(query) ||
        flags.includes(query)
      )
    })
  }

  return list
})

function substituteVariables(template: string): string {
  let result = template
  for (const [key, val] of Object.entries(variables)) {
    const value = val && val.trim() ? val.trim() : `$${key}`
    result = result.replace(new RegExp(`\\$\\{${key}\\}`, 'g'), value)
  }
  return result
}

async function copyCommand(cmd: CommandItem) {
  const finalCmd = substituteVariables(cmd.command)
  try {
    await navigator.clipboard.writeText(finalCmd)
    copiedCommandId.value = cmd.id
    setTimeout(() => {
      if (copiedCommandId.value === cmd.id) {
        copiedCommandId.value = null
      }
    }, 2000)
  } catch (e) {
    console.error('Failed to copy command:', e)
  }
}

function resetFilters() {
  searchQuery.value = ''
  selectedCategory.value = 'ALL'
  variables.NAMESPACE = 'default'
  variables.POD_NAME = 'my-app-pod'
  variables.DEPLOYMENT = 'my-app-deploy'
  variables.CONTAINER = 'app'
  variables.IMAGE = 'nginx:alpine'
  variables.SERVICE = 'my-service'
  variables.PORT = '8080:80'
  variables.NODE = 'node-1'
  variables.TAG = 'latest'
  variables.COMPOSE_FILE = 'docker-compose.yml'
}

function safetyBadgeClass(safety: CommandItem['safety']) {
  switch (safety) {
    case 'read-only':
      return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
    case 'modifies':
      return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
    case 'danger':
      return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
  }
}

function safetyDotClass(safety: CommandItem['safety']) {
  switch (safety) {
    case 'read-only':
      return 'bg-emerald-500'
    case 'modifies':
      return 'bg-amber-500'
    case 'danger':
      return 'bg-rose-500'
  }
}
</script>
