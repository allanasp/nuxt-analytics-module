// src/runtime/providers/MatomoProvider.ts

import { AnalyticsProviderBase } from './AnalyticsProviderBase'

interface MatomoOptions extends AnalyticsProviderOptions {
  matomoUrl: string;
  matomoSiteId: string;
}

export class MatomoProvider extends AnalyticsProviderBase {
  constructor(private matomoOptions: MatomoOptions) {
    super(matomoOptions)
  }

  initialize() {
    const { matomoUrl, matomoSiteId } = this.matomoOptions
    if (matomoUrl && matomoSiteId) {
      window._paq = window._paq || []
      const matomoScript = document.createElement('script')
      matomoScript.src = `${matomoUrl}/matomo.js`
      matomoScript.async = true
      document.head.appendChild(matomoScript)

      window._paq.push(['setSiteId', matomoSiteId])
      window._paq.push(['trackPageView'])
    }
  }
}
