<template>
  <div class="my-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 dark:from-blue-950/90 dark:via-indigo-950 dark:to-purple-950 p-8 sm:p-12 md:p-14 text-center shadow-2xl border border-white/20 dark:border-indigo-500/30">
    <!-- Ambient glow decorative circles -->
    <div class="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-blue-400/25 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-purple-400/25 blur-3xl"></div>

    <div class="relative z-10 mx-auto max-w-3xl">
      <!-- Badge -->
      <div class="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-md shadow-sm">
        <SmartIcon name="lucide:sparkles" class="size-3.5 text-yellow-300" />
        <span>{{ badge || 'Ready to Begin?' }}</span>
      </div>

      <!-- Title (clean, no prose underline) -->
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-sm mb-4">
        {{ title || 'Level Up Your Container & Kubernetes Skills' }}
      </h2>

      <!-- Description -->
      <p class="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-blue-100/90 font-normal leading-relaxed mb-8">
        {{ description || 'Start your journey from container basics to production-ready Kubernetes mastery today. Everything is open source and completely free.' }}
      </p>

      <!-- Buttons Row -->
      <div class="flex flex-wrap items-center justify-center gap-4">
        <!-- Primary Action -->
        <NuxtLinkLocale
          to="/getting-started/introduction"
          class="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm sm:text-base font-semibold text-gray-900 shadow-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
        >
          <SmartIcon name="lucide:rocket" class="size-4 text-indigo-600" />
          <span>Get Started Now</span>
        </NuxtLinkLocale>

        <!-- Secondary Action: Docker -->
        <NuxtLinkLocale
          to="/learn-docker/docker/containers"
          class="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/15 px-6 py-3.5 text-sm sm:text-base font-semibold text-white backdrop-blur-md shadow-sm transition-all duration-200 hover:bg-white/25 hover:border-white/50 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
        >
          <SmartIcon name="lucide:box" class="size-4 text-blue-200" />
          <span>Start with Docker</span>
        </NuxtLinkLocale>

        <!-- Tertiary Action: Kubernetes -->
        <NuxtLinkLocale
          to="/learn-kubernetes/kubernetes/architecture"
          class="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/15 px-6 py-3.5 text-sm sm:text-base font-semibold text-white backdrop-blur-md shadow-sm transition-all duration-200 hover:bg-white/25 hover:border-white/50 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
        >
          <SmartIcon name="lucide:ship-wheel" class="size-4 text-indigo-200" />
          <span>Explore Kubernetes</span>
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  badge?: string;
  title?: string;
  description?: string;
}>();
</script>
