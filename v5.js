/// execute_script.js
(function(){
  const url='https://raw.githubusercontent.com/ilovepizza90/ilovepizza90/refs/heads/main/o.js'; // <-- change
  let w;
  document.addEventListener('keydown', e => {
    if (e.key === '$' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      if (w && !w.closed) { w.focus(); return; }
      w = window.open('about:blank');
      if (!w) return alert('Popup blocked');
      const code = `(function(){var s=document.createElement('script');s.src='${url}';s.onload=()=>window.opener.postMessage('ready','*');s.onerror=()=>window.opener.postMessage('error','*');document.head.appendChild(s)})();`;
      w.document.open();
      w.document.write('<html><body><script>' + code + '</script></body></html>');
      w.document.close();
    }
  });
  window.addEventListener('message', e => {
    if (e.data === 'ready') console.log('Script loaded');
    else if (e.data === 'error') console.error('Failed to load');
  });
})();
