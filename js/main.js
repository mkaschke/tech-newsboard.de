
// load menu check boxes sources
loadData("menuTemplate","menu-container", "json/sources.json" );

// click checkboxes
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
    nosourceschoosen();
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
    sorting();
    nosourceschoosen();
  }
};

// Helper Date
Handlebars.registerHelper( "getData", function ( publishedAt ){
  var date; 
  if(publishedAt == null){
     publishedAt =  moment().add(-1, 'days');
  };
  // console.log("datum: " + publishedAt);
  var now = moment(publishedAt).add(-2, 'hours').fromNow();
  // date = publishedAt.split('T')[0];

  return now;
});

// Helper Time
Handlebars.registerHelper( "getTime", function ( publishedAt ){
  var time;

  if(publishedAt == null){
    publishedAt =  moment().add(-1, 'days').toISOString();
  };

  time = publishedAt.split('T')[1].split("Z")[0];

  return time;
});

// // Helper if null
Handlebars.registerHelper("nullhelper", function(publishedAt) {
    var date;
    if(publishedAt == null) {
       date = moment().add(-1, 'days').toISOString();
    }else{
      date = publishedAt;
    }
    return date;
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
        $(this).attr("src", "images/replace.jpg");
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
    lastupdated();
  };
}, 300000);  // 300000

// Update the APIs function
function updateSources(){
  console.log("update");
  $('input[type=checkbox][menu=sources]').each(function () {
    var checked =  $(this).is(':checked');

    if(checked){
      var url =  $(this).val();
      var name =  $(this).attr('source');
      $('.' + name).each(function (){
        $(this).remove();
      });
      console.log(name);
      loadData("newsTemplate",  "news-container" , url );
    };
  });
};

function lastupdated(){
  var dt = new Date();
  var time = dt.getHours() + ":" + dt.getMinutes();
  // var time =  moment(dt).fromNow();

 
  // console.log(time);
  $('#updated').html("last update: " + time);

}
lastupdated();

// Default news-container
function nosourceschoosen(){
if ($.trim($("#news-container").html())=='') {
     $( "#someSwitchOptionPrimary-techcrunch").click();
  }else{
      // $('#addsources').hide();
  };
};
