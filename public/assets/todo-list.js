$(document).ready(function(){ // when document is ready we fire a function

  $('form').on('submit', function(){ //when we have a submit event we fire a function

      var item = $('form input'); // we create variable which equal to the input field
      var todo = {item: item.val()}; // we create variable which equal to an object and the item property in that object is set equal to the item variable .val()

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
