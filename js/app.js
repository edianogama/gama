$(document).foundation()
// https://ihatetomatoes.net/greensock-tutorial-create-simple-image-slideshow/
// https://greensock.com/forums/topic/17564-scrollmagic-horizontal-scroll-with-anchor-navigation/
// https://codepen.io/osublake/pen/QqPqbN/?editors=0010

var bg  = $('.slide__bg');
var slideReveal  = $('.slide__reveal');
var img = $('.slide__image');

var tl = new TimelineMax();
tl.set(slideReveal, {opacity: 1});
tl.set(bg, {opacity: 1});
tl.set(img, {opacity: 1 });

tl.to(bg, .5, 
    { startAt: {
        scaleX: 0,
        rotation: 2
}, scaleX: 1, 
rotation:0,
opacity: 1, transformOrigin: '100% 0 ', ease: Sine.easeInOut  })
.add('begin')
.to(slideReveal, .5, 
    { startAt: {
        scaleX: 1,
        rotation: 2
    }, 
    scaleX: 0, 
    rotation: 0,
    // opacity: 0, 
    transformOrigin: '0 100%', ease: Sine.easeInOut  })
.to(bg, .4, 
    {
    scaleX: 0, 
    transformOrigin: '0 100%', ease: Sine.easeInOut  }, 'begin+=.4')

;    // .to(img, 2, {
//     startAt: {
//         scaleX: 0,
//     },
//     scaleX: 1,
//     transformOrigin: '100% '
// });