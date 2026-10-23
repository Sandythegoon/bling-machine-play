const C='bm-mvlaqvwr',F='bm-fonts',FILES=['./','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k!==F).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=e.request.url;
 if(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//.test(u)){e.respondWith(caches.open(F).then(c=>c.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{c.put(e.request,r.clone());return r;}))));return;}
 if(!u.startsWith(self.location.origin))return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));}return r;})
  .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('./'))));});
