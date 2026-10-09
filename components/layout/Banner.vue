<template>
  <Transition name="banner">
    <div
      v-if="open"
      class="group relative z-50 overflow-hidden border-b border-indigo-200/50 bg-gradient-to-r from-blue-500/10 via-indigo-500/15 to-purple-500/10 dark:from-blue-950/50 dark:via-indigo-900/40 dark:to-purple-950/50 dark:border-indigo-800/40 backdrop-blur-md transition-colors hover:from-blue-500/15 hover:via-indigo-500/20 hover:to-purple-500/15"
    >
      <div class="container mx-auto flex h-11 max-w-screen-2xl items-center justify-between px-4 sm:px-8">
        <!-- Left spacer for perfect centering -->
        <div class="hidden lg:block w-8" />

        <!-- Banner Center Clickable Link -->
        <NuxtLinkLocale
          v-if="to"
          :to="localePath(to)"
          :target="target ?? '_self'"
          class="flex flex-1 items-center justify-center gap-2.5 text-xs sm:text-sm font-medium text-foreground transition-colors hover:text-primary py-1"
        >
          <span class="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/15 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 dark:text-indigo-300 shadow-xs">
            <span class="size-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
            v2.4.0 Live
          </span>
          <span class="line-clamp-1 font-semibold">
            Explore 80+ Production Guides for Docker &amp; Kubernetes
          </span>
          <span class="hidden md:inline-flex items-center text-muted-foreground text-xs font-normal">
            • Hands-on architectures &amp; security patterns
          </span>
          <Icon
            name="lucide:arrow-right"
            class="size-3.5 text-indigo-600 dark:text-indigo-400 transition-transform duration-200 group-hover:translate-x-1 shrink-0"
          />
        </NuxtLinkLocale>

        <!-- Fallback if no link -->
        <div v-else class="flex flex-1 items-center justify-center text-xs sm:text-sm font-medium">
          <MDC :value="content" class="flex items-center" />
        </div>

        <!-- Close Button with dismiss cookie -->
        <button
          v-if="showClose"
          type="button"
          aria-label="Dismiss banner"
          class="flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground hover:rotate-90 active:scale-95"
          @click.stop="open = false"
        >
          <Icon name="lucide:x" class="size-3.5" />
        </button>
        <div v-else class="w-8" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const open = useCookie<boolean>('banner-open', { default: () => true });
const { showClose, content, to, target } = useConfig().value.banner;
const { localePath } = useI18nDocs();
</script>

<style scoped>
.banner-enter-active,
.banner-leave-active {
  transition: all 0.25s ease;
}

.banner-enter-from,
.banner-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-100%);
}
</style>
