/// execute_script.js
(function() {
  var userCode = prompt("Enter JavaScript code to execute:", "console.log('Hello World!')");
  
  if (userCode !== null) {
    try {
      var script = document.createElement('script');
      script.textContent = userCode;
      document.body.appendChild(script);
    } catch (e) {
      alert("Error executing code: " + e.message);
    }
  }
})();
