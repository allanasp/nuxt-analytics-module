// src/module.ts

import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { defu } from 'defu'


export enum AnalyticsProvider {
  GTM = 'gtm',
  Matomo = 'matomo',
  // Future providers can be added here
}

export interface AnalyticsOptions {
  gtmId?: string;
  matomoUrl?: string;
  matomoSiteId?: string;
}

export interface ModuleOptions {
  provider: AnalyticsProvider;
  tokens: AnalyticsOptions;
  enableRouterSync?: boolean;
  devtools?: boolean;
}

// Extend Nuxt runtime configuration
declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    analytics: ModuleOptions
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-analytics-module',
    configKey: 'analytics',
    compatibility: { nuxt: '^3.0.0' }
  },
  defaults: {
    devtools: true,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const moduleOptions: ModuleOptions = defu(nuxt.options.runtimeConfig.public.analytics, options)
    nuxt.options.runtimeConfig.public.analytics = moduleOptions

    // Add the plugin to initialize the chosen analytics provider
    addPlugin(resolver.resolve('./runtime/plugin'))

    // Optional: Add devtools if enabled
    if (options.devtools) {
      import('./devtools').then(({ setupDevToolsUI }) => setupDevToolsUI(nuxt, resolver))
    }
  }
})
