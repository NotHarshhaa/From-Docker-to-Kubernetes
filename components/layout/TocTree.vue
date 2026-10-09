<template>
  <ul :class="[level !== 0 ? 'ml-3 border-l border-border/50 pl-3 space-y-1' : 'space-y-1.5 border-l border-border/60 pl-3']">
    <li v-for="link in links" :key="link.id" class="text-sm">
      <NuxtLink
        :to="`#${link.id}`"
        class="block py-0.5 text-xs sm:text-[13px] leading-snug transition-all duration-150"
        :class="[
          activeHeadings.includes(link.id)
            ? 'font-semibold text-primary -ml-[13px] pl-[11px] border-l-2 border-primary'
            : 'text-muted-foreground hover:text-foreground',
        ]"
      >
        {{ link.text }}
      </NuxtLink>
      <TocTree
        v-if="link.children"
        :links="(link.children || []).filter((x: any) => x.id !== 'hide-toc')"
        :level="level + 1"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { TocLink } from '@ztl-uwu/nuxt-content';

defineProps<{
  links: TocLink[];
  level: number;
}>();

const { activeHeadings, updateHeadings } = useScrollspy();

onMounted(() =>
  updateHeadings([
    ...document.querySelectorAll('.docs-content h1'),
    ...document.querySelectorAll('.docs-content h2'),
    ...document.querySelectorAll('.docs-content h3'),
    ...document.querySelectorAll('.docs-content h4'),
  ]),
);
</script>
