// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  extends: ['shadcn-docs-nuxt'],
  i18n: {
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        name: 'English',
        language: 'en-US',
      },
    ],
  },
  routeRules: {
    '/': { swr: 3600 },
    '/getting-started/**': { swr: 3600 },
    '/learn-docker/**': { swr: 3600 },
    '/learn-kubernetes/**': { swr: 3600 },
    '/blog/**': { swr: 3600 },
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  },
  compatibilityDate: '2024-07-06',
});