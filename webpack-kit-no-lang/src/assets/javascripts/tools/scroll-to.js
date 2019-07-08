import { qs, qsa } from '../tools/helpers.js';
import { forEach } from 'ramda';

// easing functions http://goo.gl/5HLl8
Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2;
  if (t < 1) {
    return c / 2 * t * t + b
  }
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
const requestAnimFrame = (function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

function scrollTo(to, callback) {
  const start = position();
  const change = to - start;
  const increment = 20;
  const duration = 500;

  let currentTime = 0;

  function move(amount) {
    document.documentElement.scrollTop = amount;
    document.body.parentNode.scrollTop = amount;
    document.body.scrollTop = amount;
  }

  function position() {
    return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
  }

  function animateScroll() {
    const val = Math.easeInOutQuad(currentTime, start, change, duration);
    
    currentTime += increment;

    move(val);

    if (currentTime < duration) {
      requestAnimFrame(animateScroll);
    } else if (callback && typeof(callback) === 'function') {
      callback();
    }
  };

  animateScroll();
}

const scrollToLink = el => {
  const to = el.getAttribute('scroll-to');
  const element = qs(to);
  const bodyRect = document.body.getBoundingClientRect();
  const elemRect = element.getBoundingClientRect();
  const offset = elemRect.top - bodyRect.top;
  el.addEventListener('click', () => {
    scrollTo(offset, null);
  });
}


forEach(scrollToLink, qsa('[scroll-to]'));
