//Web call method which checks whether the session is active or not
//Returns: true if valid or false if not valid
var IsSessionActive = function (sessionId) {
    var isActive = false;
    if (sessionId > 0) {
        try {
            $.ajax({
                type: 'post',
                url: "/FormsService.aspx/IsServiceActive",
                data: "{'sessionId':" + sessionId + "}",
                dataType: "json",
                async: false,
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    isActive = msg.d;
                },
                error: function (xhr, status, textRemarks) {
                    alert("Error : " + xhr.status + " " + textRemarks);
                    isActive = false;
                }
            });
        }
        catch (e) {
            isActive = false;
            alert(e.Message);
        }
    }
    else {
        isActive = false;
    }
    return isActive;
};

var IsPageValid = function (sessionId, candidateId, TaskId, countryId) {
    var isValid = false;
    if (sessionId > 0) {
        try {
            $.ajax({
                type: 'post',
                url: "/FormsService.aspx/IsServiceActive",
                data: "{'sessionId':" + sessionId + "}",
                dataType: "json",
                async: false,
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    isValid = msg.d;
                },
                error: function (xhr, status, textRemarks) {
                    alert("Error : " + xhr.status + " " + textRemarks);
                    isValid = false;
                }
            });
        }
        catch (e) {
            isValid = false;
            alert(e.Message);
        }
    }
    else {
        isValid = false;
    }
    return isValid;
};
