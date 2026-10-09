const isVercel = Boolean(process.env.VERCEL);

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
  nitro: {
    preset: isVercel ? 'vercel' : undefined,
    prerender: {
      crawlLinks: isVercel,
      failOnError: false,
    },
  },
  // Vercel Zero-Delay Edge & Prerender Strategy
  routeRules: {
    '/': { isr: 86400, prerender: isVercel },
    '/getting-started/**': { isr: 86400, prerender: isVercel },
    '/learn-docker/**': { isr: 86400, prerender: isVercel },
    '/learn-kubernetes/**': { isr: 86400, prerender: isVercel },
    '/blog/**': { isr: 86400, prerender: isVercel },
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  },
  compatibilityDate: '2024-07-06',
});