import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((_nuxtApp) => {
  console.log('Plugin injected by nuxt-analytics-module!')
  const config = useRuntimeConfig().public.analytics

  if (config.matomoUrl && config.matomoSiteId) {
    const matomoScript = document.createElement('script')
    matomoScript.src = `${config.matomoUrl}/matomo.js`
    matomoScript.async = true
    document.head.appendChild(matomoScript)

    window._paq = window._paq || []
    window._paq.push(['setSiteId', config.matomoSiteId])
    window._paq.push(['trackPageView'])
  }

  if (config.gtmId) {
    const gtmScript = document.createElement('script')
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${config.gtmId}');
    `
    document.head.appendChild(gtmScript)
  }
})
