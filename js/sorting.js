
  jQuery.fn.sortElements = (function(){
 
    var sort = [].sort;
 
    return function(comparator, getSortable) {
 
        getSortable = getSortable || function(){return this;};
 
        var placements = this.map(function(){
 
            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,
 
                // Since the element itself will change position, we have
                // to have some way of storing its original position in
                // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );
 
            return function() {
 
                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }
 
                // Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);
 
            };
 
        });
 
        return sort.call(this, comparator).each(function(i){
            placements[i].call(getSortable.call(this));
        });
 
    };
 
})();

  // $('.sorter').sortElements(function(a, b){
  //   return Date.parse($(a).data('date')) > Date.parse($(b).data('date')) ? 1 : -1;});


  // TODO time sorting 
 function sortDate(){
    console.log("läuft");
    $('.sorter').sortElements(function(a, b){
          console.log("datum");
      return Date.parse($(a).data('date')) > Date.parse($(b).data('date')) ? 1 : -1;});

   
      $('.sorter').sortElements(function(c, d){

            if (Date.parse($(c).data('date')) === Date.parse($(d).data('date'))){
                       console.log("time");
               return Date.parse($(c).data('time')) > Date.parse($(d).data('time')) ? -1 : 1;
                }

      });
    }; 
 


  // sortDate();







