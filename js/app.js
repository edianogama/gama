$(document).foundation()
// https://ihatetomatoes.net/greensock-tutorial-create-simple-image-slideshow/



$(document).ready(function(){
    let slider = {
        contentToScroll : $('#slider .featured'),
        scrollWidht: $('#slider .featured').width(),
        windowWidth: $(window).width(),
        scrollRequest: 0
    }
    let requestId = null;

    // https://codepen.io/osublake/pen/QqPqbN/?editors=0010
    // window.onscroll = scrollContentSlider();
    function scrollContentSlider($direction) {
        console.log(slider.windowWidth);
        console.log(slider.scrollRequest);
        
        let quantoAnda = 0;
        let  faltaQuanto =  0;
        if($direction == 'right'){
            quantoAnda = (slider.contentToScroll.position().left + 150) * 0.05;
            faltaQuanto = Math.abs(slider.scrollWidht) - quantoAnda;
        }else{
            quantoAnda =  (slider.contentToScroll.position().left - 350 );
            faltaQuanto = Math.abs(slider.scrollWidht) + quantoAnda;
        }

        if(faltaQuanto < slider.windowWidth ){
            return;
        }
        if(faltaQuanto < slider.scrollWidht && $direction == 'right'){
            return;
        }
        console.log(quantoAnda);
        
        TweenMax.to(slider.contentToScroll,.5, { x:quantoAnda, ease:Power2.easeInOut });
        // requestId = slider.scrollRequest > 0 ? requestAnimationFrame(scrollContentSlider) : null;
    }
    // TweenLite.set(contentToScroll, {
    //     y: -window.pageYOffset
    // });

    var featuredElement = document.getElementById("featured");
    if (featuredElement.addEventListener)
    {
        // IE9, Chrome, Safari, Opera
        featuredElement.addEventListener("mousewheel", MouseWheelHandler, false);
        // Firefox
        featuredElement.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
    }
    // IE 6/7/8
    else
    {
        featuredElement.attachEvent("onmousewheel", MouseWheelHandler);
    }

    function MouseWheelHandler(e)
    {   
        slider.scrollRequest++;

        // cross-browser wheel delta
        var e = window.event || e; // old IE support
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        if(delta>0){
            scrollContentSlider('right');
        }else{
            scrollContentSlider('left');
        }
        return false;
    }






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
        slideTransition = $('#slider .transition'),
        slideOut = $('#slider .active'),
        slideNext = $('#slider li.next').next();
        var tl = new TimelineLite();
        // go to the next slide timeline
        tl
        .set(slideIn, {height:'100%'})
        .fromTo(slideTransition, 0.4, {width:'150px',  transformOrigin:"50% 50%" }, { width:'100%',  transformOrigin:"50% 50%", ease:Power1.easeInOut})
        .fromTo(slideIn, 0.4, { width:'150px', autoAlpha:0, transformOrigin:"50% 50%" }, {autoAlpha:1, width:'100%', transformOrigin:"50% 50%" ,  ease:Power1.easeInOut})
        
        // .to(slideIn, .2, {autoAlpha: 1,ease:Power1.easeInOut})
        .set(slideTransition, {width:'0' })
        
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
