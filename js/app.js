$(document).foundation()
$(document).ready(function(){
    var windowWidth = $(window).innerWidth();
    var sliderCount = $('#slider .featured li').length;
    var slideWidth  = (windowWidth/sliderCount); 
     $('#slider .featured li').each(function(){
            $(this).width(slideWidth);
    });
    $('#slider .nav').width(slideWidth);
  
});
