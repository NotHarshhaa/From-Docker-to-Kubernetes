<template>
  <header
    class="sticky top-0 z-40 bg-background/85 backdrop-blur-xl border-b border-border/70 transition-all duration-200 shadow-xs"
  >
    <div
      class="flex h-14 items-center justify-between gap-3 px-4 md:px-8 container max-w-screen-2xl mx-auto"
    >
      <LayoutHeaderLogo class="hidden flex-1 md:flex" />
      <LayoutMobileNav />
      <LayoutHeaderLogo v-if="config.header.showTitleInMobile" class="flex md:hidden" />
      <LayoutHeaderNav class="hidden flex-1 lg:flex justify-center" />
      <div class="flex flex-1 items-center justify-end gap-2">
        <LayoutSearchButton v-if="!config.search.inAside && config.search.style === 'input'" />
        <div class="flex items-center gap-1">
          <LayoutSearchButton v-if="!config.search.inAside && config.search.style === 'button'" />
          <LangSwitcher v-if="i18nEnabled" />
          <ThemePopover v-if="config.theme.customizable" />
          <DarkModeToggle v-if="config.header.darkModeToggle" />
          <NuxtLinkLocale
            v-for="(link, i) in config.header.links"
            :key="i"
            :to="localePath(link?.to)"
            :target="link?.target"
          >
            <UiButton variant="ghost" size="icon" class="flex size-9 rounded-lg hover:bg-accent transition-colors">
              <SmartIcon v-if="link?.icon" :name="link.icon" :size="18" />
            </UiButton>
          </NuxtLinkLocale>

          <!-- Quick GitHub Star Badge Button -->
          <a
            href="https://github.com/NotHarshhaa/from-docker-to-kubernetes"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 ml-1.5"
          >
            <Icon name="lucide:star" class="size-3.5 fill-current" />
            <span>Star</span>
          </a>
        </div>
      </div>
    </div>
    <div v-if="showToc" class="lg:hidden border-t border-border/50">
      <LayoutToc is-small />
    </div>
  </header>
</template>

<script setup lang="ts">
const config = useConfig();
const { i18nEnabled, localePath } = useI18nDocs();
const { page } = useContent();

const showToc = computed(() => {
  return config.value.toc.enable
    && config.value.toc.enableInMobile
    && (page.value?._path === '/' ? config.value.toc.enableInHomepage : true);
});
</script>
