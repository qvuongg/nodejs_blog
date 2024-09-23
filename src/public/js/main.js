// Load FontAwesome
// const fontAwesomeScript = document.createElement('script');
// fontAwesomeScript.src = 'https://kit.fontawesome.com/03fba539b2.js';
// fontAwesomeScript.crossOrigin = 'anonymous';
// document.head.appendChild(fontAwesomeScript);   
// fontAwesomeScript.onload = () => console.log('FontAwesome loaded successfully.');

// Load jQuery
const jQueryScript = document.createElement('script');
jQueryScript.src = 'https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js';
document.head.appendChild(jQueryScript);
jQueryScript.onload = () => console.log('jQuery loaded successfully.');

// Load Popper.js
const popperScript = document.createElement('script');
popperScript.src = 'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js';
document.head.appendChild(popperScript);
popperScript.onload = () => console.log('Popper.js loaded successfully.');

// Load Bootstrap
const bootstrapScript = document.createElement('script');
bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js';
document.head.appendChild(bootstrapScript);
bootstrapScript.onload = () => console.log('Bootstrap loaded successfully.');
