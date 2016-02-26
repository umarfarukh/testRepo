
/* Make this statement in end of script - as data loading and other predata filling works has to be completed */
//Display default page on load
$().ready(function () {

    $("#Pg_1_p_headerName").text(TaskPrefillValues.PrefillValues.Set1.FormName);

    var PopUp = TaskPrefillValues.PrefillValues.Set1.PopUp;
    if (PopUp == 2) {
        var urlpath = TaskPrefillValues.PrefillValues.Set1.RedirectURL;
        $("#lblNote").show();
        var Path = urlpath;
        try {
            var width = 970;
            var height = 700;
            var left = (screen.width - width) / 2;
            var top = (screen.height - height) / 2;
            var params = 'width=' + width + ', height=' + height;
            params += ', top=' + top + ', left=' + left;
            params += ', directories=no';
            params += ', location=no';
            params += ', menubar=no';
            params += ', resizable=no';
            params += ', scrollbars=yes';
            params += ', status=no';
            params += ', toolbar=no';

            var childWin1 = window.open(Path, "Popup1", params);
        }


        catch (e) { alert(e.Message); };
    }
    else {
        $("#lblNote").hide();
        document.getElementById("ifPopUp").src = TaskPrefillValues.PrefillValues.Set1.RedirectURL;
    }
});
