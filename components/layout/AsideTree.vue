<template>
  <ul
    class="flex flex-col gap-0.5 py-1"
    :class="[level > 0 && 'mx-2.5 border-l border-border/60 pl-2.5 space-y-0.5']"
  >
    <template v-for="link in links" :key="link._id">
      <LayoutAsideTreeItem
        :link="link"
        :level="level"
      />
    </template>
  </ul>
</template>

<script setup lang="ts">
import type { NavItem } from '@ztl-uwu/nuxt-content';

defineProps<{
  links: NavItem[];
  level: number;
}>();
</script>
