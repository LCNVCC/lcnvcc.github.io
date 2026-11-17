# Motion log

**Student:*Liam Cullen*
**Shop name:*Liams Way*
**Live site:** https://lcnvcc.github.io/#menu
## Motion sentences

Write one row for every animation. Fill in all six parts:

> When **[trigger]**, the **[element]** changes **[property]** over **[duration and delay]** with **[easing]**, so that **[job]**.

Jobs: feedback, orientation, continuity, status, storytelling, delight.

# | Req | Trigger | Element | Property | Duration / delay | Easing | Job | Tool
1 | R1 | hover or focus | button | scale 1.0 to 1.1 | 180ms (--fast) | ease | feedback | transition
2 | R2 | page loads | title | translateX by -6em | (--slow), 100ms + 120ms | ease-out | delight | keyframes
3 | R3 | page is loaded | awning | skewX 4.5deg | 4s | ease-in-out | delight | keyframes
4 | R3 | page is loaded | puff | rises and changes color | 3.6s | ease-out | delight | keyframes
5 | R4 | item enters viewport | cards | opacity 0 to 1; translateY 48px to 0 | 800ms, staggered by 90ms | ease-out | storytelling | IntersectionObserver
6 | R5 | user scrolls through story steps | stage and SVG | background color, dough scale and fill, spoon and bowl appearance | 900ms–1.6s | ease-out | storytelling | IntersectionObserver
7 | R6 | user clicks Add to box | artwork copy (ghost) | translate, scale down, rotate and fade | 900ms | cubic-bezier(.45,0,.25,1) | continuity | element.animate()
8 | R6 | artwork reaches cart | cart count | scale 1 to 1.6 and back to 1 | 450ms | cubic-bezier(.34,1.56,.64,1) | feedback | element.animate()
Tool = transition, @keyframes, IntersectionObserver, scroll progress, element.animate(), SVG, View Transition.

## Easing choices (R7)

Name three different easing curves you used. For each, say in one sentence why it fits that motion.

1. I used (--fast) 180ms on the buttons, when clicked or hovered over they need to react fast because the user doesn't want to wait for an animation to play just to see what they are about to click on.
2. I used (--slow) on the scroll story because 
3.  
## What I saw in the X-ray

Pick one animation and describe what the Motion X-ray or the Chrome Animations panel showed you that you couldn't see at normal speed.

## Checks

- [ ] (R8) Reduced motion emulated in DevTools: what still moves, and what stops?
- [ ] (R8) Pause button stops every infinite loop, and works from the keyboard
- [ ] (R8) Every :hover effect also happens on :focus-visible
- [ ] (R8) Nothing flashes more than 3 times per second
- [ ] (R9) Paint flashing checked: my animations use transform and opacity
- [ ] (R9) No `transition: all` anywhere
- [ ] (R4) With JavaScript disabled, every card is still visible
