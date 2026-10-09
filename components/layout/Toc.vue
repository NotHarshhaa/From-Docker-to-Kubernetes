<template>
  <UiScrollArea
    v-if="!isSmall"
    orientation="vertical"
    class="z-30 hidden h-[calc(100vh-6.5rem)] overflow-y-auto md:block lg:block pr-4"
    type="hover"
  >
    <div class="flex h-[calc(100vh-6.5rem)] flex-col gap-6 py-2">
      <!-- TOC Headings List -->
      <div v-if="toc?.links.length">
        <div class="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
          <Icon name="lucide:align-left" class="size-3.5 text-primary" />
          <span>{{ $t(title) }}</span>
        </div>
        <LayoutTocTree
          :links="toc.links.filter((x: any) => x.id !== 'hide-toc')"
          :level="0"
          :class="[(links.length || iconLinks?.length) && 'border-b border-border/50 pb-5']"
        />
      </div>

      <!-- Quick Action Links -->
      <div v-if="links.length" class="space-y-2 text-xs" :class="[iconLinks?.length && 'border-b border-border/50 pb-4']">
        <NuxtLinkLocale
          v-for="(link, i) in links"
          :key="i"
          :to="localePath(link.to)"
          :target="link.target"
          class="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group py-0.5"
        >
          <SmartIcon
            v-if="link.icon"
            :name="link.icon"
            class="size-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0"
          />
          <span class="truncate">{{ $t(link.title) }}</span>
          <Icon
            v-if="link.showLinkIcon ?? (link.target === '_blank')"
            name="lucide:arrow-up-right"
            class="text-muted-foreground/60 ml-auto size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
          />
        </NuxtLinkLocale>

        <!-- Back to Top button -->
        <button
          type="button"
          class="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group pt-1.5 w-full text-left cursor-pointer"
          @click="scrollToTop"
        >
          <Icon name="lucide:arrow-up" class="size-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          <span>Back to top</span>
        </button>
      </div>

      <!-- Icon Links -->
      <div v-if="iconLinks" class="flex items-center gap-1.5 text-muted-foreground">
        <NuxtLinkLocale
          v-for="(link, i) in iconLinks"
          :key="i"
          :to="localePath(link.to)"
          :target="link.target"
        >
          <UiButton size="icon" variant="ghost" class="size-7 rounded-lg hover:bg-accent">
            <SmartIcon
              v-if="link.icon"
              :name="link.icon"
              :size="15"
            />
          </UiButton>
        </NuxtLinkLocale>
      </div>

      <div class="flex-grow" />
      <LayoutCarbonAds v-if="isDesktop && carbonAdsEnabled" />
    </div>
  </UiScrollArea>

  <!-- Mobile Collapsible TOC -->
  <UiCollapsible
    v-else
    v-model:open="isOpen"
    class="block w-full text-sm lg:hidden bg-muted/20 border-b border-border/60"
  >
    <UiCollapsibleTrigger class="flex w-full items-center justify-between px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground hover:text-foreground">
      <span class="flex items-center gap-2">
        <Icon name="lucide:align-left" class="size-3.5 text-primary" />
        {{ title }}
      </span>
      <Icon
        name="lucide:chevron-right"
        class="size-3.5 transition-transform duration-200"
        :class="[isOpen && 'rotate-90']"
      />
    </UiCollapsibleTrigger>
    <UiCollapsibleContent class="px-4 pb-3 pt-1">
      <LayoutTocTree :links="toc.links" :level="0" />
    </UiCollapsibleContent>
  </UiCollapsible>
</template>

<script setup lang="ts">
defineProps<{ isSmall: boolean }>();

const { toc } = useContent();
const { localePath } = useI18nDocs();
const { title, links: configLinks, iconLinks, carbonAds } = useConfig().value.toc;

const isDesktop = useMediaQuery('(min-width: 1024px)');
const carbonAdsEnabled = computed(
  () => carbonAds.enable && !(import.meta.dev && carbonAds.disableInDev),
);

const isOpen = ref(false);

const { url, enabledToc, text, icon } = useEditLink();

const links = computed(
  () => {
    if (enabledToc.value) {
      return configLinks.concat([{
        title: text,
        icon,
        to: url.value,
        target: '_blank',
        showLinkIcon: true,
      }]);
    }
    return configLinks;
  },
);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>
