$().ready(function () {
    // document.getElementById('IntroContent').innerHTML = TaskPrefillValues.PrefillValues.Set1.IntroContent;
    OBPager.SetTaskContentMemberValue('Status.Accept', 1, "", false);
    OBPager.SetTaskContentMemberValue('Status.Decline', 1, "", true);
    jQXB.doBind(OBPager.taskContentDSName);
    OBPager.ShowPage(1);

});
function Save() {
    OBPager.PDFFlag = 2;
    if (($('#accept')[0].checked == true)) {

        var agree = confirm("Are you sure To Agree?");
        if (agree) {
            OBPager.SetTaskContentMemberValue('Status.Accept', 1, "true", false);
            OBPager.SetTaskContentMemberValue('Status.Decline', 1, "", true);
            if (OBPager.SaveTaskData(1) == true) {
                OBPager.RedirectOnOfferStatus(1);
            }
            else {
                return false;
            }
        }
        else {
            OBPager.SetTaskContentMemberValue('Status.Accept', 1, "", false);
            OBPager.SetTaskContentMemberValue('Status.Decline', 1, "", true);
        }
    }
    else if (($('#reject')[0].checked == true)) {
        var agree = confirm("Are you sure To Disagree?");
        if (agree) {
            OBPager.SetTaskContentMemberValue('Status.Accept', 1, "", false);
            OBPager.SetTaskContentMemberValue('Status.Decline', 1, "true", true);
            if (OBPager.SaveTaskData(1) == true) {

                OBPager.RedirectOnOfferStatus(0);
            }
            else {
                return false;
            }
        }
        else {
            OBPager.SetTaskContentMemberValue('Status.Accept', 1, "", false);
            OBPager.SetTaskContentMemberValue('Status.Decline', 1, "", true);
        }
    }
}