<template>
  <UiScrollArea orientation="vertical" class="relative h-full overflow-hidden py-6 pr-5 text-sm md:pr-4" type="hover">
    <LayoutHeaderNavMobile v-if="isMobile" class="mb-5 border-b pb-3" />
    <LayoutSearchButton v-if="config.search.inAside" class="mb-3" />

    <!-- Top-level track navigation (Docker / Kubernetes / Getting Started) -->
    <div v-if="config.aside.useLevel" class="mb-4 space-y-1 border-b border-border/60 pb-4">
      <div class="px-2 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
        Curriculum Sections
      </div>
      <NuxtLinkLocale
        v-for="link in navigation"
        :key="link.id"
        :to="link.redirect ?? link._path"
        class="group flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-sm font-medium transition-all duration-150"
        :class="[
          path.startsWith(link._path)
            ? 'bg-primary/10 text-primary font-semibold shadow-xs ring-1 ring-primary/20'
            : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground',
        ]"
      >
        <SmartIcon
          v-if="link.icon"
          :name="link.icon"
          class="shrink-0 transition-transform duration-150 group-hover:scale-110"
          :size="16"
        />
        <span class="truncate">{{ link.title }}</span>

        <span v-for="(badge, i) in link.navBadges" :key="i" class="ml-auto">
          <Badge :variant="badge.variant" :type="badge.type" :size="badge.size ?? 'sm'">
            {{ badge.value }}
          </Badge>
        </span>
      </NuxtLinkLocale>
    </div>

    <!-- Tree Navigation -->
    <LayoutAsideTree
      :links="tree"
      :level="0"
      :class="[config.aside.useLevel ? 'pt-2' : 'pt-1']"
    />

    <!-- Sidebar Footer Helper Card -->
    <div class="mt-8 pt-4 border-t border-border/50 px-2">
      <div class="rounded-xl p-3 bg-muted/40 border border-border/40 text-xs">
        <div class="font-semibold text-foreground flex items-center gap-1.5 mb-1">
          <Icon name="lucide:sparkles" class="size-3.5 text-indigo-500" />
          <span>DevOps Curriculum</span>
        </div>
        <p class="text-muted-foreground mb-2 leading-relaxed">
          Open-source, self-paced guides from containers to Kubernetes.
        </p>
        <div class="flex items-center gap-2">
          <a
            href="https://github.com/NotHarshhaa/from-docker-to-kubernetes"
            target="_blank"
            class="text-[11px] font-medium text-primary hover:underline flex items-center gap-1"
          >
            <Icon name="lucide:github" class="size-3" />
            GitHub
          </a>
          <span class="text-muted-foreground/50">•</span>
          <a
            href="https://t.me/NotHarshhaa"
            target="_blank"
            class="text-[11px] font-medium text-primary hover:underline flex items-center gap-1"
          >
            <Icon name="lucide:message-circle" class="size-3" />
            Community
          </a>
        </div>
      </div>
    </div>
  </UiScrollArea>
</template>

<script setup lang="ts">
defineProps<{ isMobile: boolean }>();

const { navDirFromPath } = useContentHelpers();
const config = useConfig();
const { locale, defaultLocale, navigation } = useI18nDocs();

const tree = computed(() => {
  const route = useRoute();
  const path = route.path.split('/');
  if (config.value.aside.useLevel) {
    const leveledPath = path.splice(0, locale.value === defaultLocale ? 2 : 3).join('/');

    const dir = navDirFromPath(leveledPath, navigation.value);
    return dir ?? [];
  }

  return navigation.value;
});

const path = computed(() => useRoute().path);
</script>
