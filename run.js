/// execute_script.js
(function(){
  var url='https://raw.githubusercontent.com/ilovepizza90/ilovepizza90/refs/heads/main/wow.js'; // <-- change
  var w=window.open('','_blank');
  if(!w){ alert('Popup blocked — allow popups for this site'); return; }
  var scriptCode = `
    (function(){
      function send(msg){ try{ window.opener.postMessage(msg, "*"); } catch(e) {} }
      send({type:"loader-start", payload:{url:"${url.replace(/"/g,'\\"')}}"});
      var script = document.createElement("script");
      script.src = "${url.replace(/"/g,'\\"')}";
      script.async = false;
      script.onload = function() { send({type:"loader-ready"}); };
      script.onerror = function() { send({type:"loader-error", message:"Failed to load script"}); };
      document.head.appendChild(script);
    })();
  `;
  var blob = new Blob([scriptCode], {type: 'application/javascript'});
  var blobUrl = URL.createObjectURL(blob);
  var scriptTag = w.document.createElement('script');
  scriptTag.src = blobUrl;
  w.document.body.appendChild(scriptTag);
})();
