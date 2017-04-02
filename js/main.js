
// load check boxes
loadData("menuTemplate","menu-container", "json/sources.json" );

 // create container
  var containerName = "news-container";
  $('.content').prepend($("<div id="+ containerName + "></div>"));

// checkboxes
$(document).on('click','[id^=someSwitchOptionPrimary]',function(){
 
  // get values from checkbox
  var url =  $(this).val();
  var checked =  $(this).is(':checked');
  var name = $(this).attr('source');
  // console.log(checked)
  //TODO
  // Cookies.remove(name);
 // Cookies.set(name, checked, { expires: 365 });
  
  if(checked){  

      // load data  
      loadData("newsTemplate", containerName , url );

  }else{
      // Remove div TODO
      $('#' + name).remove();
  }

});

  function loadData(Template,Container, URL){
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', URL, true);
    ourRequest.onload = function() {
      if (ourRequest.status >= 200 && ourRequest.status < 400) {
        var data = JSON.parse(ourRequest.responseText);
        createHTML(data, Template, Container );
        // console.log(data); // debug 
      } else {
        console.log("We connected to the server, but it returned an error.");
      }
    };
    ourRequest.onerror = function() {
      console.log("Connection error");
    };
    ourRequest.send();
  };

  function createHTML(Data, Template, Container) {
    var rawTemplate = document.getElementById(Template).innerHTML;
    var compiledTemplate = Handlebars.compile(rawTemplate);
    var ourGeneratedHTML = compiledTemplate(Data);
    var outContainer = document.getElementById(Container);
    $(outContainer).prepend(ourGeneratedHTML);  
     

   if (Template  === 'menuTemplate') {
    checkOrNot();
    } else{
        imagesize();
    }
  }

  function checkOrNot(){
      $('input[type=checkbox]').each(function () {
         var sourcename = $(this).attr('source');
         var cookInformtion = Cookies.get(sourcename);     

         // console.log (sourcename);
         // console.log(cookInformtion);

         // TODO
         if (cookInformtion){
          $( "#someSwitchOptionPrimary-"+sourcename).click();
         } else{
          $( "#someSwitchOptionPrimary-"+sourcename).prop('checked', false);
         }

    });
  }


  function imagesize(){

    // All descendant images have loaded, now slide up.
    $(this).slideUp();


     $('.blur').each(function () {
        $(this).waitForImages(function() {
      var height = $(this).height();
      var heightbackground = $(this).next(".title-backgroud").height();
      var calcheighttop = height - heightbackground;
      $(this).next(".title-backgroud").css('top', calcheighttop + "px");


      console.log(height);
      console.log(heightbackground);
      });
    });


  }
