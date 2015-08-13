var requestsArray = [];
var requestsIDArray = [];
var updateQueue = [];
var currentReqID = -1;

//variable we load treatment options into
var treatments = [
    {"value":90,"label":"Treatment 1", "id":"dsd"},
    {"value":64,"label":"Treatment 2", "id":"fgh"},
    {"value":58,"label":"Treatment 3", "id":"lmq"}
]

//variable for basic layout of each treatment
var treatment = {};
treatment.dWidth = 10; //Donut Width
treatment.width = 115;
treatment.height = 75;
treatment.radius = Math.min(treatment.width, treatment.height) / 2;
treatment.pie = d3.layout.pie().sort(null);

var colour = d3.scale.category20();



var pie = d3.layout.pie()
    .value(function(d) {return d.value; })
    .sort(null);




$(document).ready(function(){

    /***** CRUD Functions *****/

    //Prevent default action so we can do async form submit.
    $('#user-form').submit(function(e){
        e.preventDefault();
        console.log("fired");

        var inputs = $('#user-form input, #user-form select');
        var cereal = inputs.serialize();
        console.log(cereal);

        //this is shitty and needs to be deprecated either when form fields are fully converted or
        //when we get an efficient to hash working. For now we do array traverse and switch to build a hash.
        var o = {};
            o.firstName = "Test";
            o.lastName = "Value";
        inputs = inputs.serializeArray();
        for (var i in inputs){
            switch(inputs[i].name) {
                case "authenticity_token":
                    o.authToken = inputs[i].value;
                    break;
                case "p_Fname":
                    o.firstName = inputs[i].value;
                    console.log("pizza")
                    break;
                case "p_Lname":
                    o.lastName = inputs[i].value;
                    console.log('wutwut')
                    break;
                default:
                    break;
            }
        }
        console.log(inputs);
        console.log(o);

        $('#backTransition').click();
        $.ajax({
            type : "POST",
            url : $(this).attr('action'),
            datatype : "application/json",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: {
                    authenticity_token: o.authToken,
                    message:{
                            sender_id: "1",
                            receiver_id:"2",
                            firstnamepatient: o.firstName,
                            lastnamepatient: o.lastName
                    }
            }
            ,
            success : function(result) {
            },
        });
        $("#closeModal").click();
    });


    $('#approveRequest').click(function(){
        $.ajax({
            type : "POST",
            url : "/api/updatePriorAuth",
            datatype : "html",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: {
                "receive_org": objLookup(currentReqID, "source_org"),
                "receive_name": objLookup(currentReqID, "source_name"),
                "status": "approved",
                "request_seq_id": objLookup(currentReqID, "request_seq_id")},
            success : function(result) {
            },
        });
    });


    $('#denyRequest').click(function(){
        $.ajax({
            type : "POST",
            url : "/api/updatePriorAuth",
            datatype : "html",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: {
                "receive_org": objLookup(currentReqID, "source_org"),
                "receive_name": objLookup(currentReqID, "source_name"),
                "status": "denied",
                "request_seq_id": objLookup(currentReqID, "request_seq_id")},
            success : function(result) {
            },
        });
    });

    function updateRefresh(result){
        for (var req in result) {
            if ($.inArray(result[req].request_id, requestsIDArray) == -1){
                updateQueue.push(result[req]);
                requestsArray.push(result[req]);
                requestsIDArray.push(result[req].request_id)
            }
        }
    }

    function deconstructUpdates(){
        for(var foo in updateQueue){
            req = updateQueue[foo];
            var trString =  '<tr class="gradeA '+ req.status +'" data-req-id="'+ req.request_id +'" role="row" data-toggle="modal" data-target="#myModal">';
            trString += '<td class="statItem">'+ req.status +'</td>';
            trString += '<td class="reqIDItem">'+ req.request_id+'</td>';
            trString += '<td class="sendDtItem">'+ req.send_date +'</td>';
            trString += '<td class="sourceItem">'+ req.source_name +'</td>';
            trString += '<td class="recOrgItem">'+ req.receive_org +'</td>';
            trString += '</tr>';
            $(trString).hide().prependTo('#requestContainer').fadeIn("slow");
        }
        $('#all-num').html("(" + requestsArray.length + ")")
        updateQueue = [];
        console.log(requestsArray);
    }

    function getRequests(){
        $.ajax({
            type: "GET",
            url: "/api/getPriorAuths",
            success: function(result){
                console.log(result)
                updateRefresh(result);
                deconstructUpdates();
                getFreshRequests();
            },
            error: function(result){
                getFreshRequests();
            },
            datatype: "json"
        });
    }

    function getFreshRequests(){
        setTimeout(function(){
            getRequests();
        }, 2000);
    }

    /****** COLOR/STYLING CHANGES *****/

    function clearActive(){
        $('.filter-toggle').removeClass("active");
    }

    $('.filter-toggle').click(function(){
        clearActive();
        $(this).addClass('active');
    });


    /******* REQUEST SORTING ********************/
    //var table = document.getElementById('xtable')
    //    ,tableHead = table.querySelector('thead')
    //    ,tableHeaders = tableHead.querySelectorAll('th')
    //    ,tableBody = table.querySelector('tbody');
    //tableHead.addEventListener('click',function(e){
    //    var tableHeader = e.target
    //        ,textContent = tableHeader.textContent
    //        ,tableHeaderIndex,isAscending,order
    //        ;
    //    if (textContent!=='add row') {
    //        while (tableHeader.nodeName!=='TH') {
    //            tableHeader = tableHeader.parentNode;
    //        }
    //        tableHeaderIndex = Array.prototype.indexOf.call(tableHeaders,tableHeader);
    //        isAscending = tableHeader.getAttribute('data-order')==='asc';
    //        order = isAscending?'desc':'asc';
    //        tableHeader.setAttribute('data-order',order);
    //        tinysort(
    //            tableBody.querySelectorAll('tr')
    //            ,{
    //                selector:'td:nth-child('+(tableHeaderIndex+1)+')'
    //                ,order: order
    //            }
    //        );
    //    }
    //});



    /****** AUTHORIZATION FORM TRANSITIONS & D3 *******/

    $('#authTransition').click(function(){
        $(".modal-content").find(".inactive").removeClass("inactive");
        $("#authButtons").addClass("inactive");
        $("#authEngine").addClass("inactive");
    });

    $('#backTransition').click(function(){
        $(".modal-content").find(".inactive").removeClass("inactive");
        $("#submitButtons").addClass("inactive");
        $("#authForm").addClass("inactive");
    });

    $('.treatmentElement').click(function(){
        $('#authTransition').click();
    })

    function loadTreatments(treatments){

        for (var i = 0; i < treatments.length; i++){
            //j = treatment, nuff said.
            var j = treatments[i];
            $(".treatmentContainer").append("<div class='treatmentElement' id='" + j.id +"'>"+ j.label +"</div>" )
            console.log(typeof(i))
            var treatmentNum = i + 1;
            var options = [];
            var remainder = {};
            remainder.value = 100 - j.value;
            remainder.label = "remainder";
            options.push(remainder);
            options.push(j);

            var svg = d3.select(('#' + j.id))
                .append('svg')
                .attr('width', treatment.width)
                .attr('height', treatment.height)
                .append('g')
                .attr('transform', 'translate(' + (treatment.width / 2) + ',' + (treatment.height / 2) + ')');

            svg.append("text")
                .attr("x", (-6)) //Even with baseline central we still have some align issues. Not sure why.
                .attr("y", (0))
                .attr("dominant-baseline", "central")
                .text(treatmentNum);


            treatment.arc = d3.svg.arc()
                .innerRadius(treatment.radius - treatment.dWidth)
                .outerRadius(treatment.radius)

            console.log(options);
            var path = svg.selectAll('path')
                .data(pie(options))
                .enter()
                .append('path')
                .attr('d', treatment.arc)
                .attr('fill', function(d, i) {
                    return colour(d.data.label);
                });
        }
    }


    /****** REQUEST LOOK UP AND TRACKING *******/

        //triggered when modal is about to be shown
    $('#myModal').on('show.bs.modal', function(e) {
        //get data-id attribute of the clicked element
        currentReqID = $(e.relatedTarget).data('req-id');
    });


    function objLookup(id, attr){
        console.log(id);
        for(var i = 0; i < requestsArray.length; i++){
            console.log(requestsArray[i]);
            if (requestsArray[i].request_id == id){
                console.log(requestsArray[i][attr])
                return requestsArray[i][attr];
            }
        }
    }


    loadTreatments(treatments);
    /****** ON PAGE LOAD DIRECTIVES *******/
    //getRequests();
});
