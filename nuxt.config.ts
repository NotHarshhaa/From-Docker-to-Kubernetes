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
    '/getting-started': { redirect: { to: '/getting-started/introduction', statusCode: 302 } },
    '/learn-docker': { redirect: { to: '/learn-docker/docker/containers', statusCode: 302 } },
    '/learn-kubernetes': { redirect: { to: '/learn-kubernetes/kubernetes/architecture', statusCode: 302 } },
    '/tools': { redirect: { to: '/tools/dockerfile-generator', statusCode: 302 } },
    '/': { isr: 86400, prerender: isVercel },
    '/getting-started/**': { isr: 86400, prerender: isVercel },
    '/learn-docker/**': { isr: 86400, prerender: isVercel },
    '/learn-kubernetes/**': { isr: 86400, prerender: isVercel },
    '/tools/**': { isr: 86400, prerender: isVercel },
    '/blog/**': { isr: 86400, prerender: isVercel },
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  },
  compatibilityDate: '2024-07-06',
});