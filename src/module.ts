import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { defu } from 'defu'
// Module options TypeScript interface definition
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-analytics-module',
    configKey: 'analytics',
    compatibility: { nuxt: '>=3.0.0' },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    matomoUrl: '',
    matomoSiteId: '',
    gtmId: '',
  },
  setup(_options, _nuxt) {
    _nuxt.options.runtimeConfig.public.analytics = defu(_nuxt.options.runtimeConfig.public.analytics, _options)

    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
