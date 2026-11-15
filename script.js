/* ==========================================================================
   Crumbs & Co. starter  ·  ITE 270 Module 5
   Rule for this whole file: JavaScript decides WHEN. CSS decides HOW IT LOOKS.
   Most of your JavaScript should only add or remove a class, set a data
   attribute, or set a CSS custom property. The exception is STEP 7.
   ========================================================================== */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Small helper for STEP 7: shows a message and announces it to screen readers */
const toast = $('#toast');
let toastTimer;
function announce(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}


/* ---------- STEP 5: reveal on scroll (R4) ----------------------------------
   1. Make an IntersectionObserver. When an entry isIntersecting, remove
      'pending' from entry.target and stop observing it.
   2. Loop over $$('.reveal'). If an element's getBoundingClientRect().top is
      greater than innerHeight (below the fold), add 'pending' and observe it.
   3. Skip all of this if `reduced` is true.                                 */

// your code here


/* ---------- STEP 6, OPTION A: steps that change a sticky picture (R5) ------
   1. const STORY_MARGIN = '-45% 0px -45% 0px';   (a band in the middle of the screen)
   2. Observe every .step with { rootMargin: STORY_MARGIN }.
   3. When one isIntersecting, set $('#stage').dataset.step = entry.target.dataset.step
      and update #stageLabel's text.
   4. So you can SEE the band: window.motionXray && motionXray.zone(STORY_MARGIN);  */

// your code here


/* ---------- STEP 6, OPTION B: scroll progress for a product zoom (R5) ------
   On scroll (inside requestAnimationFrame):
     const r = zoom.getBoundingClientRect();
     const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
     zoom.style.setProperty('--p', p.toFixed(3));
   If `reduced`, set --p to 1 and skip the listener.                         */

// your code here


/* ---------- STEP 7: click interaction with element.animate() (R6) ----------
   For every .add button:
     1. Update the count and announce(`${name} added. ${count} in your order.`)
     2. Animate something with element.animate([...keyframes], { duration, easing }).
        Ideas: fly a copy of the card's .art to #cart; pop the button; wiggle the cart.
     3. Chain a second animation with .finished.then(() => ...),
        for example a bounce on #count.
     4. If `reduced`, skip the travel and just update the count.             */

let count = 0;
// your code here


/* ---------- STEP 9: pause button (R8) ---------------------------------------
   Toggle the class 'paused' on document.documentElement, flip aria-pressed,
   and change the button text between "Pause motion" and "Play motion".     */

// your code here
