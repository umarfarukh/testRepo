$().ready(function () {
    //Variable which holds list of parameters passed in query string in array object
    var qs = (function (a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'));

    //Initializing globally processing variables
    candidateId = parseInt(qs["cand"]);
    taskId = parseInt(qs["task"]);
    countryId = parseInt(qs["cntry"]);
    sessionId = parseInt(qs["ss"]);
    ProcessID = parseInt(qs["processID"]);


    var pgDom = {};
    GetFaqInfo();
    function OBParseXML(data) {
        var xml;
        try {
            if ($.browser.msie) {
                xml = new ActiveXObject("Microsoft.XMLDOM");
                xml.async = "false";
                xml.loadXML(data);
            }
            else {
                xml = $.parseXML(data);
            }
        }
        catch (e) {
            xml = undefined;
        }
        if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
            jQuery.error("Invalid XML: " + data);
        }
        return xml;
    };

    function GetFaqInfo() {
       // alert('ProcessId HardCoded here');
        var data = "{";
        data += "'sessionId':" + sessionId.toString() + ",";
        data += "'candidateId':" + candidateId.toString() + ",";
        data += "'taskId':" + taskId.toString() + ",";
        data += "'countryId':" + countryId.toString() + ",";
        data += "'processId':1";
        data += "}";

        $.ajax({
            type: "POST",
            url: "../FormsService.aspx/FAQ",
            data: data,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                pgDom = OBParseXML(msg.d);
                var pageDetails = '';
                var ansID = 0;
                var quesID = 0;
                pageDetails += '<div class="header"><img src="../Images/logo.png" alt="Logo" /></div>';  /* adding header image */
                pageDetails += '<div class="content"><div class="faq_header"><p>Generic Frequently Asked Questions</p></div><div class="questions">';

                $(pgDom).find('FaqMasterList').find('FaqMasterData').find('FaqData').each(function () {
                    var group = $(this);
                    var Question;
                    var Answer;
                    var FaqGroupName = group.find('FaqGroupName').text(); /* Getting Question */

                    pageDetails += '<p>' + FaqGroupName + '</p>';

                    group.find('FaqDetails').find('Faq').each(function () {
                        var group1 = $(this);
                        ansID++;
                        quesID++;
                        Question = group1.find('FaqQuestion').text(); /* Getting Question */
                        Answer = group1.find('FaqAnswer').text();  /* Getting Answer */
                        pageDetails += '<ul style="list-style-type:disc"><li ><a class="ques" onclick="Answer(' + ansID + ');" id=content_quest' + quesID + '>' + Question + '</a></li>';
                     //   $('#content_quest'+quesID).bind("click", terst());


                        pageDetails += '<li  class="none paddingL22"><span id=' + ansID + ' class="ans">' + Answer + '</span></li></ul>';
                    });


                });
                pageDetails += '</div>';

                $('#faq_main').append(pageDetails);

            },
            error: function (xhr) { alert("Error " + xhr.responseText ); }

        });
    }
});

function Answer(ansID) {
   // alert(ansID);

    if (document.getElementById(ansID).style.color == "black") {
        document.getElementById(ansID).style.display = 'none';
        document.getElementById(ansID).style.color = "red";
    }
    else {
        document.getElementById(ansID).style.display = 'block';
        // document.getElementById(ansID).style.display = 'block';
        document.getElementById(ansID).style.color = "black";
    }
}