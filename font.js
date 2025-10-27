/// execute_script.js
function modifyElement(selector, newText) {
  const existingElement = document.querySelector(selector);

  if (existingElement) {
    if (!document.querySelector('link[href="https://fonts.googleapis.com/css2?family=Bitcount:wght@100..900&display=swap"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Bitcount:wght@100..900&display=swap';
      document.head.appendChild(link);
    }

    existingElement.style.fontFamily = 'Bitcount, sans-serif';
    existingElement.innerText = newText;
  }
}
