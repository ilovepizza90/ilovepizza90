/// execute_script.js
window.addEventListener("keyup", event => {
  if (event.ctrlKey && event.which === 192) {
    let code = prompt("inject:");
    if (code.startsWith("javascript:")) {
      code = code.substring(11);
    }
    eval(code);
  }
});
