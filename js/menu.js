$(document).ready(function () {

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

  // init Masonry
  // var $grid = $('.grid').masonry({
  //   itemSelector: '.grid-item',
  //   percentPosition: true,
  //   columnWidth: '.grid-sizer'
  // });
  // // layout Masonry after each image loads
  // $grid.imagesLoaded().progress( function() {
  //   $grid.masonry('layout');
  // });

}); // close ready



