
// load check boxes
loadData("menuTemplate","menu-container", "json/sources.json" );

// checkboxes
$(document).on('click','[id^=someSwitchOptionPrimary]',function(){

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

    // not menu template
    if (Template  === 'menuTemplate') {
      checkOrNot();
    } else{
      imagesize();
    }
  }

  // check cookie with menu check / unchecked 
  function checkOrNot(){
    $('input[type=checkbox]').each(function () {
     var name = $(this).attr('source');
     var cookInformtion = Cookies.get(name);     
   
         if (cookInformtion == 'true'){
          $( "#someSwitchOptionPrimary-"+ name).click();
            console.log(name + " "+ cookInformtion);
        } else{

           $( "#someSwitchOptionPrimary-"+ name).prop('checked', false);
            console.log(name + " "+ cookInformtion);
        }

      });
  }

    // image size and gray box on the images
  function imagesize(){
    $('#news-container').imagesLoaded().always( function( instance ) {
      $('.blur').each(function () {
        var src = $(this).attr("src");

        if (src === ""){
          $(this).attr("src", "/images/replace.jpg");

        }

        console.log(src);

      var height = $(this).height();
      var heightbackground = $(this).next(".title-backgroud").height();
      var calcheighttop = height - heightbackground;
      $(this).next(".title-backgroud").css('top', calcheighttop + "px");
    });
   }); 


    console.log('all images loaded');
  };

 
 
