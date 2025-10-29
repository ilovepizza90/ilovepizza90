/// execute_script.js
(function(){
  const url = 'https://raw.githubusercontent.com/ilovepizza90/ilovepizza90/refs/heads/main/wow.js';
  let win = null;
  
  function openLoader(){
    if (win && !win.closed) { win.focus(); return; }
    win = window.open('about:blank');
    if (!win) { alert('Popup blocked'); return; }
    const code = `(function(){
      function send(msg){ try{ window.opener.postMessage(msg, "*"); } catch(e) {} }
      send({type:"loader-start", payload:{url:"${url}"}})
      var s = document.createElement("script");
      s.src = "${url}"; s.async = false;
      s.onload = () => send({type:"loader-ready"});
      s.onerror = () => send({type:"loader-error", message:"Failed to load"});
      document.head.appendChild(s);
    })();`;
    const blob = new Blob([code], {type: 'application/javascript'});
    win.document.write('<html><body><script src="' + URL.createObjectURL(blob) + '"></' + 'script></body></html>');
  }
  
  document.addEventListener('keydown', function(e){
    if (e.code === 'Backquote' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      openLoader();
    }
  });

  window.addEventListener('message', function(ev){
    const d = ev.data;
    if (d.type === 'loader-ready') console.log('Script loaded');
    else if (d.type === 'loader-error') console.error(d.message);
  });
})();
