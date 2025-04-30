/*!
 * tci-global.js — injection loader
 * Version 1.0.0 — MIT
 */
(function(){
  'use strict';

  // ——— CONFIGURE THESE URLs ———
  // Point at your hosted CSS/JS (GitHub Pages, jsDelivr, raw.githubusercontent, etc.)
  const assets = {
    css: [
      'https://your-username.github.io/tci-repo/custom.css',
      // e.g. 'https://cdn.jsdelivr.net/gh/your-username/tci-repo@main/custom2.css'
    ],
    js: [
      'https://your-username.github.io/tci-repo/custom.js',
      // e.g. 'https://cdn.jsdelivr.net/gh/your-username/tci-repo@main/extra.js'
    ]
  };
  // ————————————————

  function loadCSS(href){
    const link = document.createElement('link');
    link.rel    = 'stylesheet';
    link.href   = href;
    link.media  = 'all';
    link.onload = () => console.log(`✅ CSS loaded: ${href}`);
    link.onerror= () => console.error(`❌ CSS failed: ${href}`);
    document.head.appendChild(link);
  }

  function loadJS(src){
    const script      = document.createElement('script');
    script.src        = src;
    script.defer      = true;
    script.onload     = () => console.log(`✅ JS loaded: ${src}`);
    script.onerror    = () => console.error(`❌ JS failed: ${src}`);
    document.body.appendChild(script);
  }

  function injectAll(){
    assets.css.forEach(loadCSS);
    assets.js.forEach(loadJS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectAll);
  } else {
    injectAll();
  }

})();
