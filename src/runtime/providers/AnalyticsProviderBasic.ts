// src/runtime/providers/AnalyticsProviderBase.ts

export interface AnalyticsProviderOptions {
  enableRouterSync?: boolean;
}

export abstract class AnalyticsProviderBase {
  constructor(protected options: AnalyticsProviderOptions) {}

  // Method for setting up the provider, to be implemented by subclasses
  abstract initialize(): void
}
