/* ==========================================================================
   Crumbs & Co. starter  ·  ITE 270 Module 5
   Rule for this whole file: JavaScript decides WHEN. CSS decides HOW IT LOOKS.
   Most of your JavaScript should only add or remove a class, set a data
   attribute, or set a CSS custom property. The exception is STEP 7.
   ========================================================================== */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const calm = () => reduced || root.classList.contains('paused');   // true = keep motion to a minimum

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
const revealIO = new IntersectionObserver(entries => {
   entries.forEach(en => {
     if (!en.isIntersecting) return;
     const el = en.target;
     el.classList.add('arriving');                          // switch on the entrance transition
     el.classList.remove('pending');                        // move to the visible state
     setTimeout(() => el.classList.remove('arriving'), 1600); // hand control back to hover
     revealIO.unobserve(el);
   });
 }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });

 if (!reduced){
   $$('.reveal').forEach(el => {
      if (el.getBoundingClientRect().top > innerHeight) {    // below the fold?
      el.classList.add('pending');                         // then hide it and wait
      revealIO.observe(el);
      }
   });
}


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

    
   const zoom = $('#zoom');
   function updateZoom() {
     if (reduced) { zoom.style.setProperty('--p', 1); return; }   // reduced motion: show the end state
     const r = zoom.getBoundingClientRect();
     const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
     zoom.style.setProperty('--p', p.toFixed(3));
   }
   addEventListener('scroll', () => requestAnimationFrame(updateZoom), { passive: true });
   addEventListener('resize', updateZoom);
   updateZoom();

   const stage = $('#stage');
const stageLabel = $('#stageLabel');
const steps = $$('.step');
const stepIO = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    stage.dataset.step = en.target.dataset.step;          // CSS reacts to this attribute
    stageLabel.textContent = en.target.dataset.label;
    steps.forEach(s => s.classList.toggle('active', s === en.target));
  });
}, { rootMargin: '-45% 0px -45% 0px' });                   // a thin band across the middle
steps.forEach(s => stepIO.observe(s));
steps[0].classList.add('active');
window.motionXray && motionXray.zone('-45% 0px -45% 0px'); // lets the X-ray draw that band

// your code here


/* ---------- STEP 7: click interaction with element.animate() (R6) ----------
   For every .add button:
     1. Update the count and announce(`${name} added. ${count} in your order.`)
     2. Animate something with element.animate([...keyframes], { duration, easing }).
        Ideas: fly a copy of the card's .art to #cart; pop the button; wiggle the cart.
     3. Chain a second animation with .finished.then(() => ...),
        for example a bounce on #count.
     4. If `reduced`, skip the travel and just update the count.             */


// your code here
const boxBtn = $('#cart');
const badge = $('#count');
let count = 0;
function bumpBadge() {
  badge.textContent = count;
  badge.hidden = false;
  if (!calm()) badge.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.6)' }, { transform: 'scale(1)' }],
    { duration: 450, easing: 'cubic-bezier(.34,1.56,.64,1)' });
}
$$('.add').forEach(btn => btn.addEventListener('click', () => {
  const card = btn.closest('.card');
  count++;
  announce(`${card.dataset.name} added. ${count} ${count === 1 ? 'item' : 'items'} in your order.`);
  btn.textContent = 'Added';
  setTimeout(() => { btn.textContent = 'Add to box'; }, 1200);
  if (calm()) { bumpBadge(); return; }                 // reduced motion: no flight

  // 1. Measure where the art is and where the box is
  const art = card.querySelector('.art');
  const a = art.getBoundingClientRect();
  const b = boxBtn.getBoundingClientRect();
  const dx = (b.left + b.width / 2) - (a.left + a.width / 2);
  const dy = (b.top + b.height / 2) - (a.top + a.height / 2);

  console.log("art is: " + art);
  // 2. Make a copy and place it exactly on top of the original
  const ghost = art.cloneNode(true);
  ghost.classList.add('ghost');
  Object.assign(ghost.style, { left: a.left + 'px', top: a.top + 'px', width: a.width + 'px', height: a.height + 'px' });
  document.body.appendChild(ghost);

  // 3. Fly it along an arc, then bounce the badge when it lands
  ghost.animate([
    { transform: 'translate(0,0) scale(1) rotate(0deg)' },
    { transform: `translate(${dx * 0.4}px, ${dy * 0.4 - 80}px) scale(.7) rotate(-20deg)`, offset: 0.45 },
    { transform: `translate(${dx}px, ${dy}px) scale(.15) rotate(20deg)`, opacity: 0.4 }
  ], { duration: 900, easing: 'cubic-bezier(.45,0,.25,1)' })
  .finished.then(() => { ghost.remove(); bumpBadge(); });
}));
boxBtn.addEventListener('click', () => announce(count ? `${count} ${count === 1 ? 'treat' : 'treats'} in your box.` : 'Your box is empty. Add something sweet.'));




/* ---------- STEP 9: pause button (R8) ---------------------------------------
   Toggle the class 'paused' on document.documentElement, flip aria-pressed,
   and change the button text between "Pause motion" and "Play motion".     */

// your code here
const pauseBtn = $('#pauseBtn');
let pausedJs = [];
pauseBtn.addEventListener('click', () => {
  const on = root.classList.toggle('paused');
  console.log("on is currently " + on);
  pauseBtn.setAttribute('aria-pressed', String(on));
  pauseBtn.querySelector('span').textContent = on ? 'Play motion' : 'Pause motion';
  if (on) {
    // CSS animations pause via the .paused class; pause running JS (Web Animations API) ones too
    pausedJs = (document.getAnimations ? document.getAnimations() : [])
      .filter(a => a.playState === 'running' && !(window.CSSAnimation && a instanceof CSSAnimation) && !(window.CSSTransition && a instanceof CSSTransition));
    pausedJs.forEach(a => a.pause());
  } else {
    pausedJs.forEach(a => a.play());
    pausedJs = [];
  }
});