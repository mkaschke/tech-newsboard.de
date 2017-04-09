
// load check boxes
loadData("menuTemplate","menu-container", "json/sources.json" );

// checkboxes
$(document).on('click','[id^=someSwitchOptionPrimary-]',function(){

// get values from checkbox
var url =  $(this).val();
var checked =  $(this).is(':checked');
var name = $(this).attr('source');

// cookie 
Cookies.set(name, checked, { expires: 365 });

// check of checkbox is checked
if(checked){  
  $(this).prop('checked', true);
    // load data  
    loadData("newsTemplate",  "news-container" , url );

  }else{
    // Remove div 
    $('.' + name).each(function (){
      $(this).remove();
    });
  }
});

// load data from url
function loadData(Template,Container, URL){
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', URL, true);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      var data = JSON.parse(ourRequest.responseText);
      createHTML(data, Template, Container );
    } else {
      console.log("We connected to the server, but it returned an error.");
    }
  };
  ourRequest.onerror = function() {
    console.log("Connection error");
  };
  ourRequest.send();
};

// handlebars render
function createHTML(Data, Template, Container) {
  var rawTemplate = document.getElementById(Template).innerHTML;
  var compiledTemplate = Handlebars.compile(rawTemplate);
  var ourGeneratedHTML = compiledTemplate(Data);
  var outContainer = document.getElementById(Container);
  $(outContainer).prepend(ourGeneratedHTML);  

  // if no menu template
  if (Template  === 'menuTemplate') {
    checkOrNot();
  } else{
    imagesize();
    colorForSource();
   
  }
};

// Helper Date
Handlebars.registerHelper( "getData", function ( publishedAt ){
  var date = publishedAt.split('T')[0];
  return date;
});

// Helper Time
Handlebars.registerHelper( "getTime", function ( publishedAt ){
  var time = publishedAt.split('T')[1].split("Z")[0];
  return time;
});

// check cookie with menu check / unchecked 
function checkOrNot(){
  $('input[type=checkbox]').each(function () {
    var name = $(this).attr('source');
    var cookInformtion = Cookies.get(name);     

    if (cookInformtion == 'true'){
      $( "#someSwitchOptionPrimary-"+ name).click();
        } else{
         $( "#someSwitchOptionPrimary-"+ name).prop('checked', false);
        }

      });
};

  // image replace
  function imagesize(){
    $('#news-container').imagesLoaded().always( function( instance ) {

    // TODO replace Bilder 
    $('.blur').each(function () {
      var src = $(this).attr("src");

      if (src === ""){
        $(this).attr("src", "/images/replace.jpg");
      }
      // console.log(src);
    });
  }); 
  // console.log('all images loaded');
};

// color for the source
function colorForSource(){
 $('input[type=checkbox]').each(function () {
   var name = $(this).attr('source');
   var color = $(this).attr('color');

   $('.source-' + name).each(function(){
    $(this).css("background-color", "#" + color);
  });
 });
};


// Update the APIs trigger
window.setInterval(function(){
  var checked =  $('#someSwitchOptionPrimary').is(':checked');
  if(checked){
    updateSources();
  };
}, 300000);  

// Update the APIs function
function updateSources(){
  console.log("update");
  $('input[type=checkbox][menu=sources]').each(function () {
    var checked =  $(this).is(':checked');

    if(checked){
      var url =  $(this).val();
      loadData("newsTemplate",  "news-container" , url );
    };
  });
};

