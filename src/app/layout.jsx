import { RootLayout } from '@/components/RootLayout'
import Script from 'next/script'

const CIO_SITE_ID = process.env.NEXT_PUBLIC_CIO_SITE_ID || "YOUR_SITE_ID";
const CIO_REGION = process.env.NEXT_PUBLIC_CIO_REGION || "US";

import '@/styles/tailwind.css'

export const metadata = {
  title: {
    template: '%s - Studio',
    default: 'Studio - Award winning developer studio based in Denmark',
  },
}

export default function Layout({ children }) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <head>
      <Script id="initialize-cio" strategy="beforeInteractive">
        {`
          var _cio = _cio || [];
          (function() {
              var a,b,c;a=function(f){return function(){_cio.push([f].
              concat(Array.prototype.slice.call(arguments,0)))}};b=["load","identify",
              "sidentify","track","page","on","off"];for(c=0;c<b.length;c++){_cio[b[c]]=a(b[c])};
              var t = document.createElement('script'),
                  s = document.getElementsByTagName('script')[0];
              t.async = true;
              t.id    = 'cio-tracker';
              t.setAttribute('data-site-id', '${CIO_SITE_ID}');
              t.setAttribute('data-use-array-params', 'true');
              t.setAttribute('data-auto-track-page', 'false'); // Since this is a SPA, we will manually track page nav
              
              //Enables in-app messaging
              t.setAttribute('data-use-in-app', 'true');
              
              t.src = 'https://assets.customer.io/assets/track${ CIO_REGION != "US" ? "-eu"   : ""}.js';
              //If your account is in the EU, use:
              //t.src = 'https://assets.customer.io/assets/track-eu.js'
              s.parentNode.insertBefore(t, s);
          })();


          // OPTIONAL: Initialize forms handler to enable scanning for newsletter form or contact form
          // (function() {
          //   var t = document.createElement('script'),
          //       s = document.getElementsByTagName('script')[0];
          //   t.async = true;
          //   t.id    = 'cio-forms-handler';
          //   t.setAttribute('data-site-id', '${CIO_SITE_ID}');
          //   t.setAttribute('data-base-url', 'https://${CIO_REGION != "US" ? "eu." : "" }customerioforms.com');

          //   t.src = 'https://${CIO_REGION != "US" ? "eu." : "" }customerioforms.com/assets/forms.js';

          //   s.parentNode.insertBefore(t, s);
          // })();
        `}
      </Script>
      </head>
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
