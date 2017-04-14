$(document).ready(function () {

nosourceschoosen();

// menu
var trigger = $('.hamburger'),
overlay = $('.overlay'),
isClosed = false;

trigger.click(function () {
  hamburger_cross();      
});

function hamburger_cross() {

  if (isClosed == true) {          
    overlay.hide();
    trigger.removeClass('is-open');
    trigger.addClass('is-closed');
    isClosed = false;
  } else {   
    overlay.show();
    trigger.removeClass('is-closed');
    trigger.addClass('is-open');
    isClosed = true;
  }
}

$('[data-toggle="offcanvas"]').click(function () {
  $('#wrapper').toggleClass('toggled');
});  
  
}); // close ready

var lastScrollTop = 100;
$(window).scroll(function(event){
   var st = $(this).scrollTop();
   if (st > lastScrollTop){
       $('#beta').fadeOut(2000);
   } else {
       $('#beta').fadeIn(2000);
   }
   lastScrollTop = st;
});