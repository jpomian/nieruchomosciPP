'use client';

import Script from 'next/script';

export const MatomoTracker = () => {
  return (
    <>
      <Script id="matomo-config" strategy="afterInteractive">
        {`
          var _paq = window._paq = window._paq || [];
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="//analytics.jpomian.pl/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '1']);
          })();
        `}
      </Script>
      <Script
        strategy="afterInteractive"
        src="//analytics.jpomian.pl/matomo.js"
      />
    </>
  );
};