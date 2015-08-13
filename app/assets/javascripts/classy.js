//Classy javascript
//This file is intended for Ajax calls and api hits to the backend
//Currently Housing:
//Call to classification function



$(document).ready(function(){

  $('#featureForm').submit(function(e)
  {
    e.preventDefault();
    console.log("fired");
    var data = $(this).serialize();
    var dataRaw = this;
    var inputs = $('#featureForm :input[type=text]')
    var allString= "";
    console.log(inputs);
    console.log(data);

    $('#featureForm input, #featureForm select').each(
      function(index){
          var input = $(this);
          allString += input.val() + ',';
          console.log('Value: ' + input.val());
      });
      allString = allString.substring(0, allString.length - 2);
      console.log(allString);
      var dataM = JSON.stringify(allString);
      console.log(dataM);

      $.ajax({
        type : "POST",
        url : "http://localhost:3000/api/bodyFromStringClassTest",
        datatype : "html",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {"valString": allString},
        success : function(result) {
          console.log(result);
          display = result[0];
          console.log(display.c_list);
          $('#ClassCont').html(display.patientgroup);
          $('#PatientCount').html("nan");
          $('#avgAge').html("nan");
          $('#pdrPrev').html("nan");
          $('#dmePrev').html("nan");
          $('#focMacPrev').html("nan");
          $('#bestRepFreq').html("nan");
          $('#bcvaChange').html("nan");
        },
      });
  });
});
