window.onbeforeunload = closeIt;
function closeIt() {
     try { window.parent.opener.disablePopup(); } catch   { }
    try { window.parent.opener.CloseChildPage(); } catch   { }
}