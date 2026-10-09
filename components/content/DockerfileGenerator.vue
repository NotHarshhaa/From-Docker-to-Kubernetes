<template>
  <div class="my-8 rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-xl text-card-foreground">
    <!-- Header -->
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
      <div>
        <div class="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
          <Icon name="lucide:sparkles" class="size-3.5" />
          <span>Interactive DevOps Tool</span>
        </div>
        <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
          <Icon name="lucide:box" class="size-6 text-blue-500" />
          <span>Production Dockerfile &amp; Compose Generator</span>
        </h3>
        <p class="text-sm text-muted-foreground mt-1">
          Configure your stack and generate production-hardened multi-stage Dockerfiles with security best practices.
        </p>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors"
          @click="resetDefaults"
        >
          <Icon name="lucide:rotate-ccw" class="size-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>

    <!-- Generator Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Left Config Controls (5 cols) -->
      <div class="lg:col-span-5 space-y-5">
        <!-- Language / Stack Selector -->
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Language &amp; Runtime
          </label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="lang in languages"
              :key="lang.id"
              type="button"
              class="flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all duration-150 gap-1.5"
              :class="[
                selectedLang === lang.id
                  ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold shadow-xs ring-1 ring-blue-500/20'
                  : 'border-border bg-background hover:bg-muted/70 text-muted-foreground hover:text-foreground'
              ]"
              @click="selectedLang = lang.id"
            >
              <Icon :name="lang.icon" class="size-5" />
              <span>{{ lang.name }}</span>
            </button>
          </div>
        </div>

        <!-- Port & Version Settings -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-muted-foreground mb-1.5">Application Port</label>
            <input
              v-model="appPort"
              type="number"
              placeholder="3000"
              class="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-muted-foreground mb-1.5">Base Image Flavor</label>
            <select
              v-model="baseFlavor"
              class="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="alpine">Alpine (Ultra Minimal)</option>
              <option value="slim">Debian Slim (Compatible)</option>
              <option value="distroless">Google Distroless</option>
            </select>
          </div>
        </div>

        <!-- Package Manager (for Node) -->
        <div v-if="selectedLang === 'node'">
          <label class="block text-xs font-semibold text-muted-foreground mb-1.5">Package Manager</label>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="pm in ['npm', 'pnpm', 'yarn', 'bun']"
              :key="pm"
              type="button"
              class="py-1.5 rounded-lg border text-xs font-medium transition-all text-center"
              :class="[
                nodePm === pm
                  ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'border-border bg-background text-muted-foreground hover:text-foreground'
              ]"
              @click="nodePm = pm"
            >
              {{ pm }}
            </button>
          </div>
        </div>

        <!-- Database Addon (for Compose) -->
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Include Database Stack (Compose)
          </label>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="db in databases"
              :key="db.id"
              type="button"
              class="flex flex-col items-center justify-center p-2 rounded-xl border text-xs transition-all gap-1"
              :class="[
                selectedDb === db.id
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs'
                  : 'border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground'
              ]"
              @click="selectedDb = db.id"
            >
              <Icon :name="db.icon" class="size-4" />
              <span>{{ db.name }}</span>
            </button>
          </div>
        </div>

        <!-- Security & Best Practices Toggles -->
        <div class="rounded-xl border border-border/80 bg-muted/30 p-3.5 space-y-2.5">
          <div class="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
            <Icon name="lucide:shield-check" class="size-4 text-emerald-500" />
            <span>Hardening &amp; Optimization</span>
          </div>

          <label class="flex items-center justify-between cursor-pointer text-xs select-none">
            <div class="flex items-center gap-2">
              <span class="font-medium text-foreground">Multi-Stage Build</span>
              <span class="text-[10px] text-muted-foreground">Minimal runner image</span>
            </div>
            <input v-model="enableMultiStage" type="checkbox" class="rounded accent-blue-600 size-4 cursor-pointer" />
          </label>

          <label class="flex items-center justify-between cursor-pointer text-xs select-none">
            <div class="flex items-center gap-2">
              <span class="font-medium text-foreground">Non-Root User</span>
              <span class="text-[10px] text-muted-foreground">Blocks root privilege escalation</span>
            </div>
            <input v-model="enableNonRoot" type="checkbox" class="rounded accent-blue-600 size-4 cursor-pointer" />
          </label>

          <label class="flex items-center justify-between cursor-pointer text-xs select-none">
            <div class="flex items-center gap-2">
              <span class="font-medium text-foreground">Health Check Directive</span>
              <span class="text-[10px] text-muted-foreground">Container health polling</span>
            </div>
            <input v-model="enableHealthcheck" type="checkbox" class="rounded accent-blue-600 size-4 cursor-pointer" />
          </label>

          <label class="flex items-center justify-between cursor-pointer text-xs select-none">
            <div class="flex items-center gap-2">
              <span class="font-medium text-foreground">Layer Cache Optimization</span>
              <span class="text-[10px] text-muted-foreground">Order manifests before source</span>
            </div>
            <input v-model="enableLayerCache" type="checkbox" class="rounded accent-blue-600 size-4 cursor-pointer" />
          </label>
        </div>
      </div>

      <!-- Right Code Preview (7 cols) -->
      <div class="lg:col-span-7 flex flex-col">
        <!-- File Tabs & Action Header -->
        <div class="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 pb-3 mb-1">
          <!-- Segmented Tab Bar -->
          <div class="inline-flex items-center p-1 rounded-xl bg-muted/80 border border-border/60 gap-1 overflow-x-auto max-w-full">
            <button
              v-for="tab in availableTabs"
              :key="tab.id"
              type="button"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all select-none"
              :class="[
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/40'
              ]"
              @click="activeTab = tab.id"
            >
              <Icon :name="tab.icon" class="size-3.5 shrink-0" />
              <span>{{ tab.name }}</span>
            </button>
          </div>

          <!-- Copy & Download Action -->
          <div class="flex items-center gap-1.5 shrink-0 ml-auto">
            <button
              type="button"
              class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors shadow-xs"
              @click="copyCode"
            >
              <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-3.5" :class="copied ? 'text-emerald-500' : 'text-blue-500'" />
              <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors shadow-xs"
              title="Download file"
              @click="downloadFile"
            >
              <Icon name="lucide:download" class="size-3.5" />
            </button>
          </div>
        </div>

        <!-- Code Block Container with IDE Header -->
        <div class="relative flex-1 rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl flex flex-col">
          <!-- Code Window Titlebar -->
          <div class="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800/80 text-xs font-mono text-zinc-400 select-none">
            <div class="flex items-center gap-2">
              <div class="flex items-center gap-1.5">
                <span class="size-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                <span class="size-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                <span class="size-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              <span class="text-zinc-600 ml-1">/</span>
              <span class="text-zinc-200 font-medium flex items-center gap-1.5">
                <Icon :name="activeTabMeta.icon" class="size-3.5 text-blue-400" />
                {{ activeTabMeta.filename }}
              </span>
            </div>
            <div class="flex items-center gap-3 text-[11px] text-zinc-500">
              <span>{{ currentCodeLineCount }} lines</span>
              <span class="uppercase font-semibold tracking-wider text-zinc-400">{{ activeTabMeta.language }}</span>
            </div>
          </div>

          <!-- Code Content Area -->
          <div class="p-4 sm:p-5 overflow-auto max-h-[520px] min-h-[360px] font-mono text-xs leading-relaxed text-zinc-200 select-text">
            <pre class="m-0 whitespace-pre font-mono"><code>{{ currentCode }}</code></pre>
          </div>
        </div>

        <!-- Helpful explanation badge -->
        <div class="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="lucide:info" class="size-3.5 text-blue-400 shrink-0" />
          <span>Generated with OCI &amp; Docker v26+ best practice standards. Ready for CI/CD pipelines.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const selectedLang = ref<'node' | 'python' | 'go' | 'rust' | 'java' | 'static'>('node');
const appPort = ref(3000);
const baseFlavor = ref<'alpine' | 'slim' | 'distroless'>('alpine');
const nodePm = ref<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm');
const selectedDb = ref<'none' | 'postgres' | 'mysql' | 'redis' | 'mongodb'>('postgres');

const enableMultiStage = ref(true);
const enableNonRoot = ref(true);
const enableHealthcheck = ref(true);
const enableLayerCache = ref(true);

const activeTab = ref<'dockerfile' | 'compose' | 'dockerignore'>('dockerfile');
const copied = ref(false);

const languages = [
  { id: 'node', name: 'Node.js', icon: 'logos:nodejs-icon' },
  { id: 'python', name: 'Python', icon: 'logos:python' },
  { id: 'go', name: 'Go', icon: 'logos:go' },
  { id: 'rust', name: 'Rust', icon: 'logos:rust' },
  { id: 'java', name: 'Java', icon: 'logos:java' },
  { id: 'static', name: 'Nginx/SPA', icon: 'logos:nginx' },
] as const;

const databases = [
  { id: 'none', name: 'None', icon: 'lucide:ban' },
  { id: 'postgres', name: 'Postgres', icon: 'logos:postgresql' },
  { id: 'mysql', name: 'MySQL', icon: 'logos:mysql-icon' },
  { id: 'redis', name: 'Redis', icon: 'logos:redis' },
] as const;

const availableTabs = computed(() => [
  { id: 'dockerfile', name: 'Dockerfile', icon: 'lucide:file-code' },
  { id: 'compose', name: 'docker-compose.yml', icon: 'lucide:layers' },
  { id: 'dockerignore', name: '.dockerignore', icon: 'lucide:file-text' },
]);

function resetDefaults() {
  selectedLang.value = 'node';
  appPort.value = 3000;
  baseFlavor.value = 'alpine';
  nodePm.value = 'npm';
  selectedDb.value = 'postgres';
  enableMultiStage.value = true;
  enableNonRoot.value = true;
  enableHealthcheck.value = true;
  enableLayerCache.value = true;
  activeTab.value = 'dockerfile';
}

const currentCode = computed(() => {
  if (activeTab.value === 'dockerfile') return generateDockerfile();
  if (activeTab.value === 'compose') return generateCompose();
  return generateDockerignore();
});

const activeTabMeta = computed(() => {
  switch (activeTab.value) {
    case 'dockerfile':
      return { filename: 'Dockerfile', language: 'dockerfile', icon: 'lucide:file-code' };
    case 'compose':
      return { filename: 'docker-compose.yml', language: 'yaml', icon: 'lucide:layers' };
    case 'dockerignore':
      return { filename: '.dockerignore', language: 'ignore', icon: 'lucide:file-text' };
  }
});

const currentCodeLineCount = computed(() => {
  return currentCode.value ? currentCode.value.split('\n').length : 0;
});

function generateDockerfile(): string {
  const port = appPort.value || 3000;
  const nonRoot = enableNonRoot.value;
  const health = enableHealthcheck.value;
  const multi = enableMultiStage.value;
  const flavor = baseFlavor.value;

  if (selectedLang.value === 'node') {
    const baseImg = flavor === 'alpine' ? 'node:20-alpine' : flavor === 'slim' ? 'node:20-slim' : 'node:20-alpine';
    if (!multi) {
      return `# Node.js Single Stage Build
FROM ${baseImg}
WORKDIR /app
ENV NODE_ENV=production
${nonRoot ? 'RUN addgroup -S appgroup && adduser -S appuser -G appgroup' : ''}
${enableLayerCache.value ? 'COPY package*.json ./' : ''}
${enableLayerCache.value ? 'RUN npm ci --only=production' : ''}
COPY . .
${nonRoot ? 'USER appuser' : ''}
EXPOSE ${port}
${health ? `HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\\n  CMD wget --no-verbose --tries=1 --spider http://localhost:${port}/health || exit 1` : ''}
CMD ["node", "server.js"]`;
    }

    return `# ----------------------------------------------------
# Multi-Stage Production Dockerfile for Node.js
# ----------------------------------------------------

# Stage 1: Build & Dependencies
FROM ${baseImg} AS builder
WORKDIR /app
COPY package*.json ./
RUN ${nodePm.value === 'pnpm' ? 'corepack enable && pnpm install --frozen-lockfile' : nodePm.value === 'yarn' ? 'yarn install --frozen-lockfile' : 'npm ci'}
COPY . .
RUN npm run build --if-present

# Stage 2: Production Minimal Runtime
FROM ${baseImg} AS runner
WORKDIR /app
ENV NODE_ENV=production

${nonRoot ? '# Run as unprivileged non-root user\nRUN addgroup -S appgroup && adduser -S appuser -G appgroup' : ''}

# Copy only production artifacts
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist 2>/dev/null || COPY --from=builder /app ./

${nonRoot ? 'USER appuser' : ''}
EXPOSE ${port}

${health ? `HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\\n  CMD wget --no-verbose --tries=1 --spider http://localhost:${port}/healthz || exit 1\n` : ''}
CMD ["node", "dist/index.js"]`;
  }

  if (selectedLang.value === 'go') {
    return `# ----------------------------------------------------
# Multi-Stage Production Dockerfile for Go (Golang)
# ----------------------------------------------------

# Stage 1: Build binary statically
FROM golang:1.23-alpine AS builder
WORKDIR /app
RUN apk add --no-cache git ca-certificates tzdata

${enableLayerCache.value ? 'COPY go.mod go.sum* ./\nRUN go mod download' : ''}
COPY . .

# Compile static binary with zero external cgo dependencies
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o /app/server .

# Stage 2: Scratch or Distroless minimal runner
FROM ${flavor === 'distroless' ? 'gcr.io/distroless/static-debian12' : 'alpine:3.20'} AS runner
WORKDIR /app

${flavor !== 'distroless' && nonRoot ? 'RUN adduser -D -u 10001 appuser' : ''}
COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /app/server /app/server

${flavor !== 'distroless' && nonRoot ? 'USER appuser' : ''}
EXPOSE ${port}

${health && flavor !== 'distroless' ? `HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\\n  CMD wget --no-verbose --tries=1 --spider http://localhost:${port}/healthz || exit 1\n` : ''}
ENTRYPOINT ["/app/server"]`;
  }

  if (selectedLang.value === 'python') {
    return `# ----------------------------------------------------
# Production Dockerfile for Python (FastAPI / Flask)
# ----------------------------------------------------
FROM python:3.12-${flavor === 'alpine' ? 'alpine' : 'slim'} AS builder
WORKDIR /app

# Prevent Python from writing .pyc and buffering stdout
ENV PYTHONDONTWRITEBYTECODE=1 \\
    PYTHONUNBUFFERED=1

RUN pip install --no-cache-dir --upgrade pip
${enableLayerCache.value ? 'COPY requirements.txt .\nRUN pip install --no-cache-dir --user -r requirements.txt' : ''}

# Stage 2: Minimal Runtime
FROM python:3.12-${flavor === 'alpine' ? 'alpine' : 'slim'} AS runner
WORKDIR /app

${nonRoot ? 'RUN adduser --disabled-password --gecos "" appuser' : ''}
COPY --from=builder /root/.local /root/.local
COPY . .

ENV PATH=/root/.local/bin:$PATH
${nonRoot ? 'USER appuser' : ''}
EXPOSE ${port}

${health ? `HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\\n  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:${port}/healthz')" || exit 1\n` : ''}
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "${port}"]`;
  }

  if (selectedLang.value === 'rust') {
    return `# ----------------------------------------------------
# Multi-Stage Production Dockerfile for Rust
# ----------------------------------------------------
FROM rust:1.80-alpine AS builder
WORKDIR /app
RUN apk add --no-cache musl-dev

COPY Cargo.toml Cargo.lock* ./
COPY src ./src
RUN cargo build --release

# Stage 2: Scratch or Alpine runner
FROM alpine:3.20 AS runner
WORKDIR /app
${nonRoot ? 'RUN adduser -D -u 10001 appuser' : ''}
COPY --from=builder /app/target/release/app /app/server

${nonRoot ? 'USER appuser' : ''}
EXPOSE ${port}
CMD ["/app/server"]`;
  }

  if (selectedLang.value === 'java') {
    return `# ----------------------------------------------------
# Production Dockerfile for Java (Spring Boot)
# ----------------------------------------------------
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: JRE Minimal Runner
FROM eclipse-temurin:21-jre-alpine AS runner
WORKDIR /app
${nonRoot ? 'RUN adduser -D -u 10001 appuser' : ''}
COPY --from=builder /app/target/*.jar app.jar

${nonRoot ? 'USER appuser' : ''}
EXPOSE ${port}
ENTRYPOINT ["java", "-jar", "app.jar"]`;
  }

  // Static / Nginx
  return `# ----------------------------------------------------
# Production Dockerfile for Static Web & Nginx (Vite/React/Vue)
# ----------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: High-Performance Nginx Alpine
FROM nginx:1.27-alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
${health ? `HEALTHCHECK --interval=30s --timeout=3s CMD wget -q -O - http://localhost/ || exit 1` : ''}
CMD ["nginx", "-g", "daemon off;"]`;
}

function generateCompose(): string {
  const port = appPort.value || 3000;
  let dbBlock = '';

  if (selectedDb.value === 'postgres') {
    dbBlock = `
  postgres:
    image: postgres:16-alpine
    container_name: postgres_db
    restart: unless-stopped
    environment:
      POSTGRES_DB: app_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: \${DB_PASSWORD:-changeme_secure}
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d app_db"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - app_network`;
  } else if (selectedDb.value === 'mysql') {
    dbBlock = `
  mysql:
    image: mysql:8.4
    container_name: mysql_db
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: app_db
      MYSQL_ROOT_PASSWORD: \${DB_PASSWORD:-changeme_secure}
    volumes:
      - mysqldata:/var/lib/mysql
    networks:
      - app_network`;
  } else if (selectedDb.value === 'redis') {
    dbBlock = `
  redis:
    image: redis:7-alpine
    container_name: redis_cache
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redisdata:/data
    networks:
      - app_network`;
  }

  const hasDb = selectedDb.value !== 'none';
  const volumes = selectedDb.value === 'postgres' ? '\nvolumes:\n  pgdata:' : selectedDb.value === 'mysql' ? '\nvolumes:\n  mysqldata:' : selectedDb.value === 'redis' ? '\nvolumes:\n  redisdata:' : '';

  return `services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: app_web
    restart: unless-stopped
    ports:
      - "${port}:${port}"
    environment:
      - NODE_ENV=production
      - PORT=${port}${hasDb ? `\n      - DATABASE_URL=${selectedDb.value === 'postgres' ? 'postgres://postgres:${DB_PASSWORD}@postgres:5432/app_db' : 'redis://redis:6379'}` : ''}
    ${hasDb ? `depends_on:\n      ${selectedDb.value}:\n        condition: service_healthy` : ''}
    networks:
      - app_network
${dbBlock}

networks:
  app_network:
    driver: bridge
${volumes}`;
}

function generateDockerignore(): string {
  return `# Git & IDE
.git
.gitignore
.vscode
.idea

# Dependencies
node_modules
__pycache__
*.pyc
target/
.venv
vendor/

# Local Environment & Secrets
.env
.env.local
.env.*.local
*.pem
*.key

# Build Artifacts & Logs
dist/
build/
*.log
npm-debug.log*
yarn-debug.log*
coverage/
.DS_Store`;
}

async function copyCode() {
  try {
    await navigator.clipboard.writeText(currentCode.value);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2000);
  } catch {
    // fallback
  }
}

function downloadFile() {
  const filename = activeTab.value === 'dockerfile' ? 'Dockerfile' : activeTab.value === 'compose' ? 'docker-compose.yml' : '.dockerignore';
  const blob = new Blob([currentCode.value], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
</script>
