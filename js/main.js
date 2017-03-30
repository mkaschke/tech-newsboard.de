
// load check boxes
loadData("menuTemplate","menu-container", "json/sources.json" );

var i = 0; 
// checkboxes
$(document).on('click','[id^=someSwitchOptionPrimary]',function(){
 
  // get values from checkbox
  var url =  $(this).val();
  var checked =  $(this).is(':checked');
  //var name = $(this).parent().parent().text().trim();

  // create container
  var containerName = "news-container";
  var tempContainer = "news-temp";
  if(checked){  
    if (i == 0){

     $('.content').prepend($("<div id="+ containerName + "></div>"));
      // load data  
      loadData("newsTemplate", containerName , url );


    }else{

     $('.content').prepend($("<div id="+ tempContainer + "></div>"));
     $('#' + tempContainer).hide();
      // load data  
      loadData("newsTemplate", tempContainer , url );
      $("#" + tempContainer).appendTo("#" + containerName);
    }
  i++;

  
  }else{
    // Remove div TODO
    $('#' + containerName).remove();
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
    outContainer.innerHTML = ourGeneratedHTML;
  }


