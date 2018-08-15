$(document).foundation()
// https://ihatetomatoes.net/greensock-tutorial-create-simple-image-slideshow/



$(document).ready(function(){
    var $activeSlide = $('#slider .active'),
        $allSlide = $('#slider li'),
        $nextSlide = $("#slider .next");
    function init(){
        TweenMax.set($allSlide.not($activeSlide), {autoAlpha: 0});
        TweenMax.set($nextSlide, {autoAlpha: .7});

    }
    // init();
    function goNext() {
        console.log('gooo');
        var slideIn = $('#slider li.next'),
        slideOut = $('#slider .active'),
        slideNext = $('#slider li.next').next();
        var tl = new TimelineLite();
        // go to the next slide timeline
        tl
        .fromTo(slideIn, 0.4, { width:'150px'}, { width:'100%',autoAlpha: 1,  ease:Power1.easeInOut})
        .set(slideIn, { className: '+=active'})
        .set(slideOut, {className: '-=active'})
        .set(slideIn, {className: '-=next'})        

        // animate H1 and p of the active slide up and fade them out
        // .to([slideOutH1,slideOutP], 0.3, {y: '-=15px', autoAlpha: 0, ease:Power3.easeInOut}, 0)

        .fromTo(slideNext, 0.6,{x:'150%', autoAlpha:0}, {x: '-0%', autoAlpha: 1,className: '+=next', ease:Power3.easeInOut}, 0)

        // animate new slide up (from out of the viewport)
        // .to(slideIn, 0.5, {x: '-=100%', ease:Power3.easeInOut}, 0)

        // animate H1 and P of the new slide up and fade them in
        // .fromTo([slideInH1,slideInP], 0.3, {y: '+=20px', autoAlpha: 0}, {autoAlpha: 1, y: 0, ease:Power1.easeInOut}, 0.3);

    }
    $('.goNextSlide').click(function(e){
        e.preventDefault();
        goNext();
    })
    
});
