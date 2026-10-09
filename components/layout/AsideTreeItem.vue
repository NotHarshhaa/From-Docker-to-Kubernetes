<template>
  <li>
    <!-- Folder -->
    <div v-if="link.children">
      <template v-if="folderStyle === 'group'">
        <div
          class="text-muted-foreground/80 mt-3 mb-1 flex items-center gap-2 rounded-md px-2 text-[11px] font-bold uppercase tracking-wider outline-none"
          :class="[link.navTruncate !== false && 'h-7']"
        >
          <LayoutAsideTreeItemButton :link />
        </div>
        <LayoutAsideTree :links="link.children" :level="level" />
      </template>
      <template v-else>
        <button
          class="text-foreground/80 hover:bg-muted/70 hover:text-foreground flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 text-left text-sm transition-colors duration-150"
          :class="[link.navTruncate !== false && 'h-8']"
          @click="isOpen = !isOpen"
        >
          <SmartIcon
            v-if="folderStyle === 'tree'"
            name="lucide:chevron-down"
            class="transition-transform duration-200"
            :class="[!isOpen && '-rotate-90']"
          />
          <LayoutAsideTreeItemButton :link />
          <SmartIcon
            v-if="folderStyle === 'default'"
            name="lucide:chevron-down"
            class="ml-auto transition-transform duration-200"
            :class="[!isOpen && '-rotate-90']"
          />
        </button>
        <div v-show="isOpen">
          <LayoutAsideTree :links="link.children" :level="level + 1" />
        </div>
      </template>
    </div>
    <!-- Page -->
    <NuxtLinkLocale
      v-else
      :to="link._path"
      class="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-all duration-150"
      :class="[
        isActive
          ? 'bg-primary/10 text-primary font-semibold shadow-xs ring-1 ring-primary/20'
          : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground',
        link.navTruncate !== false && 'h-8',
      ]"
    >
      <LayoutAsideTreeItemButton :link />
    </NuxtLinkLocale>
  </li>
</template>

<script setup lang="ts">
import type { NavItem } from '@ztl-uwu/nuxt-content';

const { link, level } = defineProps<{
  link: NavItem;
  level: number;
}>();

const { collapse, collapseLevel, folderStyle: defaultFolderStyle } = useConfig().value.aside;

const collapsed = useCollapsedMap();
const route = useRoute();

function defaultOpen() {
  if (route.path.includes(link._path))
    return true;
  if (link.collapse !== undefined)
    return !link.collapse;

  return level < collapseLevel && !collapse;
}

const isOpen = ref(collapsed.value.get(link._path) || defaultOpen());

watch(isOpen, (v) => {
  collapsed.value.set(link._path, v);
});
const isActive = computed(() => link._path === route.path);

const folderStyle = computed(() => link.sidebar?.style ?? defaultFolderStyle);
</script>
