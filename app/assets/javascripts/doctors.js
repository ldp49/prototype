//taken from jQueryUI dialog 'form' demo.http://jqueryui.com/demos/dialog/#modal-form
$(document).ready(function(event){

var name = $( "#name" ),
            email = $( "#email" ),
            password = $( "#password" ),
            allFields = $( [] ).add( name ).add( email ).add( password ),
            tips = $( ".validateTips" );
//taken from jQueryUI dialog 'form' demo.http://jqueryui.com/demos/dialog/#modal-form
// validation function message helper
        function updateTips( t ) {
    tips
        .text( t )
        .addClass( "ui-state-highlight" );
    setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
    }, 500 );
}
//taken from jQueryUI dialog 'form' demo.http://jqueryui.com/demos/dialog/#modal-form
// validation function 
function checkLength( o, n, min, max ) {
    if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Length of " + n + " must be between " +
            min + " and " + max + "." );
        return false;
    } else {
        return true;
    }
}
  $("#dialog").dialog({
  height: 300,
            width: 350,
            modal: true,
                    open : function(event, ui){
                    // not needed b/c of ajax load
},
            buttons: {
                "Save": function() {
                    var bValid = true;
                                    // clear previous validation errors.
                    // perform errror checking on dialog form values            
                    if ( bValid ) {
                        $.post("url/to/save/data", $("#dialog form").serializeArray(), function(data, text, xhr){
// check for errors saving edits in the 'data' variable
var hadErrors = true;
if( data.someWayToCheckForErrors == hadErrors){
// append an error message to the dialog without closing it, or, append an error message to the main page.
//$("#dialog").append("<div class='ui-state-error'>you had an error saving</div>");
}else{
$( this ).dialog( "close" );
}
}); 
                    }
                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            },
            close: function() {

            });



$(".editLink").click(function(event){
       var theDialog = $("#dialog");
//shorthand ajax call to query server for the Dialog Content in another action.
       theDialog.load("someUrlToGetDataFromYourAction",
       {optional json of url parameters for Action}, 
       function(data, text, jqXhr){
// success 
theDialog.dialog("open");});

  });
});