// src/runtime/providers/GtmProvider.ts

import { AnalyticsProviderBase } from './AnalyticsProviderBase'
import { createGtm } from '@gtm-support/vue-gtm'
import { Router } from 'vue-router'

interface GtmOptions extends AnalyticsProviderOptions {
  gtmId: string;
  vueRouter?: Router;
}

export class GtmProvider extends AnalyticsProviderBase {
  constructor(private gtmOptions: GtmOptions) {
    super(gtmOptions)
  }

  initialize() {
    const { gtmId, vueRouter } = this.gtmOptions
    if (gtmId) {
      createGtm({
        id: gtmId,
        vueRouter,
      })
    }
  }
}
