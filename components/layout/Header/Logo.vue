<template>
  <div class="flex items-center">
    <NuxtLinkLocale
      v-if="logo.light && logo.dark"
      :to="localePath('/')"
      class="group flex items-center gap-2.5 transition-all duration-200"
    >
      <div class="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <NuxtImg :src="logo.light" class="h-7 w-auto dark:hidden" alt="From Docker to Kubernetes" />
        <NuxtImg :src="logo.dark" class="hidden h-7 w-auto dark:block" alt="From Docker to Kubernetes" />
      </div>
      <span v-if="showTitle && title" class="font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
        {{ $t(title) }}
      </span>
      <span class="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 tracking-wide">
        v2.4
      </span>
    </NuxtLinkLocale>
  </div>
</template>

<script setup lang="ts">
const { logo, title, showTitle } = useConfig().value.header;
const { localePath } = useI18nDocs();
</script>
