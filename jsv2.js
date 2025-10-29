// execute_script.js
(function(){
  const RAW_URL = 'https://raw.githubusercontent.com/ilovepizza90/ilovepizza90/refs/heads/main/wow.js'; // <-- replace
  let loaderWin = null;
  let lastOpenAttempt = 0;

  function openLoader() {
    // Prevent rapid repeated opens
    if (Date.now() - lastOpenAttempt < 500) return;
    lastOpenAttempt = Date.now();

    // If we already have an open loader window, focus it
    if (loaderWin && !loaderWin.closed) {
      try { loaderWin.focus(); } catch(e) {}
      return;
    }

    const w = window.open('about:blank');
    if (!w) { console.warn('Popup blocked — allow popups for this site'); return; }
    loaderWin = w;

    try {
      const scriptCode = '(function(){' +
        'function send(m){try{window.opener&&window.opener.postMessage(m,\"*\")}catch(e){}}' +
        'send({type:\"loader-start\",payload:{url:\"' + RAW_URL.replace(/"/g,'\\"') + '\"}});' +
        'var s=document.createElement(\"script\");' +
        's.src=\"' + RAW_URL.replace(/"/g,'\\"') + '\"; s.async=false;' +
        's.onload=function(){send({type:\"loader-ready\"});};' +
        's.onerror=function(){send({type:\"loader-error\",message:\"Failed to load script\"});};' +
        'document.head.appendChild(s);' +
      '})();';

      const blob = new Blob([scriptCode], { type: 'application/javascript' });
      const blobUrl = URL.createObjectURL(blob);

      const html = '<!doctype html><html><head><meta charset="utf-8"><title>loader</title></head><body>' +
                   '<script src="' + blobUrl + '"></' + 'script></body></html>';

      w.document.open();
      w.document.write(html);
      w.document.close();

      // cleanup blob URL later
      setTimeout(() => { try { URL.revokeObjectURL(blobUrl); } catch(e) {} }, 5000);
    } catch(err) {
      console.error('Loader injection failed:', err);
      try { if (w && !w.closed) w.close(); } catch(e) {}
      loaderWin = null;
    }
  }

  // Handle messages from loader window
  window.addEventListener('message', function(ev){
    // Optionally validate ev.origin here if needed
    const d = ev.data;
    if (!d || !d.type) return;
    console.log('Loader message:', d);
    if (d.type === 'loader-ready') {
      console.log('Remote script loaded in about:blank');
    } else if (d.type === 'loader-error') {
      console.error('Loader reported error:', d.message);
    } else if (d.type === 'loader-start') {
      console.log('Loader started, url:', d.payload && d.payload.url);
    }
  });

  // Key handler: Backquote (the key that produces ` or ~). Ignore when typing in inputs/editables.
  function onKeyDown(e) {
    // only the Backquote key; accept with or without shift (so both ` and ~)
    if (e.code !== 'Backquote') return;
    const active = document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) return;
    // prevent side-effects when desired
    e.preventDefault();
    openLoader();
  }

  // Attach listener (use capture to catch early)
  document.addEventListener('keydown', onKeyDown, true);

  console.log('Tilde loader ready — press the ` (backquote) key to open the loader. Replace RAW_URL in script to point to your script.');
})();
