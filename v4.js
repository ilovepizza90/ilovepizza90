/// execute_script.js
(function(){
  const url='https://raw.githubusercontent.com/ilovepizza90/ilovepizza90/refs/heads/main/wow.js'; // <-- change
  let w;
  document.addEventListener('keydown', e=>{
    if(e.key === '$' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){
      if(w && !w.closed){ w.focus(); return; }
      w = window.open('about:blank');
      if(!w) return alert('Popup blocked');
      const code = `(function(){var s=document.createElement('script');s.src='${url}';s.onload=function(){window.opener.postMessage('ready','*')};document.head.appendChild(s)})()`;
      w.document.write(`<html><body><script>${code}</script></body></html>`);
    }
  });
  window.addEventListener('message', e=>{if(e.data === 'ready') console.log('Loaded');});
})();
