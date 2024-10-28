// src/runtime/plugin.ts

import { defineNuxtPlugin, useRouter } from '#app'
import { AnalyticsProvider } from '../module'
import { GtmProvider } from './providers/GtmProvider'
import { MatomoProvider } from './providers/MatomoProvider'

export default defineNuxtPlugin((nuxtApp) => {
  const config = nuxtApp.$config.public.analytics

  if (process.client) {
    const router = useRouter()
    let analyticsProvider

    // Select the provider class based on the config provider type
    switch (config.provider) {
      case AnalyticsProvider.GTM:
        analyticsProvider = new GtmProvider({
          gtmId: config.tokens.gtmId!,
          vueRouter: config.enableRouterSync ? router : undefined
        })
        break

      case AnalyticsProvider.Matomo:
        analyticsProvider = new MatomoProvider({
          matomoUrl: config.tokens.matomoUrl!,
          matomoSiteId: config.tokens.matomoSiteId!
        })
        break

      default:
        console.warn('Unsupported analytics provider specified')
    }

    // Initialize the chosen provider
    analyticsProvider?.initialize()
  }
})
