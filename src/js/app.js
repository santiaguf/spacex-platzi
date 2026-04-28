/* eslint-disable no-console */
import { router } from './router.js';
import { renderHomePage } from './components/HomePage.js';
import { renderLaunchPage } from './components/LaunchPage.js';

router.addRoute('/', renderHomePage);
router.addRoute('/home', renderHomePage);
router.addRoute('/launch/:id', renderLaunchPage);

const setupGlobalEventListeners = () => {
  const clearcache = document.getElementById('clear-cache');
  clearcache.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
  });
};

const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker
        .register('/serviceWorker.js')
        .then(() => console.log('service worker registered'))
        .catch(err => console.log('service worker not registered', err));
    });
  }
};

setupGlobalEventListeners();
registerServiceWorker();
router.init();
