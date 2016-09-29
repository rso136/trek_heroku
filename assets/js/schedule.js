$(function(){
  $('#timePicker').timepicker();

  var dataRef = new Firebase("https://trekhub.firebaseio.com/schedule");

  var schedCount = 0;

  $("#addToSched").on("click", function(){

    var schedTime = $('#timePicker').val().trim();
    var schedTask = $('#schedInput').val().trim();
    dataRef.push({
        'time' : schedTime,
        'task' : schedTask,
        'count': schedCount
    })
  }); 

  dataRef.on('child_removed', function(child){
    console.log(child);
    $('#item-' + child.key()).empty();
  });

  dataRef.on('child_added', function(child, prevChild){
    console.log(child.val().task);
    // debugger;
    var schedItem = $('<p>');
    schedItem.attr('id', 'item-' + child.key());
    schedItem.append(" " + child.val().time + " - " + child.val().task);

    var schedClose = $("<button>");
    schedClose.attr("data-sched", schedCount);

    schedClose.attr("data-key", child.key());

    schedClose.addClass("checkbox btn-floating btn-small waves-effect waves-light blue");
    schedClose.append("-");
    schedItem = schedItem.prepend(schedClose);

    $("#sched").append(schedItem);

    $('#schedInput').val("");
    $('#timePicker').val("");

    schedCount++;

    return false;
  });

  // $('#sched').toString();
  // $('#sched').html();

  $(document.body).on('click', '.checkbox', function(){
    var key = $(this).data("key");
    console.log('key', key);
    dataRef.child(key).remove();
  }); 

});
