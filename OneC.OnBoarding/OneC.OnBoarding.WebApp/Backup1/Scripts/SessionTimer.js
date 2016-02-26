var sessionExpireTime = document.getElementById('hdnExpire').value;
var sessionWarnTime = document.getElementById('hdnWarning').value;
var sessionMode = document.getElementById('hdnSessionMode').value;
var sessionInterval;
$(document).ready(function () {
    ResetTimer();
});

function ResetTimer() {
    sessionInterval = setInterval(SessionWarningMessage, sessionWarnTime);
}

function SessionWarningMessage() {
    clearInterval(sessionInterval);
    if (sessionMode == true) { $("#aTimerWarning").click(); };
}