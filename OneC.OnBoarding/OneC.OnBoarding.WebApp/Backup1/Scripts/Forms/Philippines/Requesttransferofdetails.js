
$().ready(function () {


    $("#REQ_Txt_MemberLastName").val(TaskPrefillValues.PrefillValues.Set1.LastName);
    $("#REQ_Txt_MemberFirstName").val(TaskPrefillValues.PrefillValues.Set1.FirstName);
    $("#REQ_Txt_MemberMiddleName").val(TaskPrefillValues.PrefillValues.Set1.MiddleName);
    $("#REQ_Txt_HomeAdress").val(TaskPrefillValues.PrefillValues.Set1.Address);
    $("#REQ_Txt_TelephoneNo").val(TaskPrefillValues.PrefillValues.Set1.PhoneNumber);

    $("#REQ_Txt_previousemployername1").val(TaskPrefillValues.PrefillValues.Set2.Companyname);
    $("#REQ_Txt_previousemployeradres1").val(TaskPrefillValues.PrefillValues.Set2.Address);
    $("#REQ_Txt_previousemployerninclusivedates1").val(TaskPrefillValues.PrefillValues.Set2.InclusiveDates);
    $("#REQ_Txt_previousemployername2").val(TaskPrefillValues.PrefillValues.Set3.Companyname);
    $("#REQ_Txt_previousemployeradres2").val(TaskPrefillValues.PrefillValues.Set3.Address);
    $("#REQ_Txt_previousemployerninclusivedates2").val(TaskPrefillValues.PrefillValues.Set3.InclusiveDates);
    $("#REQ_Txt_previousemployername3").val(TaskPrefillValues.PrefillValues.Set4.Companyname);
    $("#REQ_Txt_previousemployeradres3").val(TaskPrefillValues.PrefillValues.Set4.Address);
    $("#REQ_Txt_previousemployerninclusivedates3").val(TaskPrefillValues.PrefillValues.Set4.InclusiveDates);
    $("#REQ_Txt_previousemployername4").val(TaskPrefillValues.PrefillValues.Set5.Companyname);
    $("#REQ_Txt_previousemployeradres4").val(TaskPrefillValues.PrefillValues.Set5.Address);
    $("#REQ_Txt_previousemployerninclusivedates4").val(TaskPrefillValues.PrefillValues.Set5.InclusiveDates);
    $('.housingloan').hide();
    $('.stl').hide();




    document.getElementById('Check_intrabranch').disabled = true;
    document.getElementById('Check_Interbranch').disabled = true;
    document.getElementById('Text_others').disabled = true;
    document.getElementById('Text_takeoutdate1').disabled = true;
    document.getElementById('Text_loanstatus1').disabled = true;
    document.getElementById('Text_outstandbal1').disabled = true;
    document.getElementById('Text_devdate').disabled = true;
    document.getElementById('loanstatus2_text').disabled = true;
    document.getElementById('outstandbal2_text').disabled = true;

    var taskObj = JSON.parse(OBPager.strFormDetails).Requestfortransfer;
    var HouseLoanChecked = taskObj.HousingLoan;

    if (HouseLoanChecked == 1 || HouseLoanChecked == 'true') {
        document.getElementById("Chk_stl").checked = false;
        document.getElementById('Text_takeoutdate1').disabled = false;
        document.getElementById('Text_loanstatus1').disabled = false;
        document.getElementById('Text_outstandbal1').disabled = false;
        document.getElementById('Text_devdate').disabled = true;
        document.getElementById('loanstatus2_text').disabled = true;
        document.getElementById('outstandbal2_text').disabled = true;
        //        $('#Text_takeoutdate1').removeAttr('disabled').addClass('textMandatory');
        //        $('#Text_devdate').attr("disabled", "true").removeClass('textMandatory');
        $('.housingloan').show();
        $('.stl').hide();
    }
    else {
       
        document.getElementById("Chk_housingloan").checked = false;
    }

    var STLChecked = taskObj.STL;

    if (STLChecked == 1 || STLChecked == 'true') {
        document.getElementById("Chk_housingloan").checked = false;
        document.getElementById('Text_takeoutdate1').disabled = true;
        document.getElementById('Text_loanstatus1').disabled = true;
        document.getElementById('Text_outstandbal1').disabled = true;
        document.getElementById('Text_devdate').disabled = false;
        document.getElementById('loanstatus2_text').disabled = false;
        document.getElementById('outstandbal2_text').disabled = false;
        //        $('#Text_devdate').removeAttr('disabled').addClass('textMandatory');
        //        $('#Text_takeoutdate1').attr("disabled", "true").removeClass('textMandatory');
        $('.housingloan').hide();
        $('.stl').show();

    }
    else {
        document.getElementById("Chk_stl").checked = false;
     
    }

    var checkedother = taskObj.purposeofTransfer.Chkothers;
    if (checkedother == 1 || checkedother == 'true') {
        document.getElementById('Check_intrabranch').disabled = true;
        document.getElementById('Check_Interbranch').disabled = true;
        document.getElementById("chek_others").checked = true;
        //        OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkothers', 1, '1', false);
        //        OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkconsolidation', 1, '', false);
        //        OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkclaims', 1, '', false);
        //        OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkintrabranch', 1, '', false);
        //        OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.ChkSTL', 1, '', false);
        //        OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.ChkInterbranch', 1, '', false);

        document.getElementById("Text_others").disabled = false;
        document.getElementById("Check_consolidation").checked = false;
        document.getElementById("Check_claims").checked = false;
        document.getElementById("Req_Check_stl").checked = false;
        document.getElementById("Check_Interbranch").checked = false;
        document.getElementById("Check_intrabranch").checked = false;
    }


    // $('input[type="checkbox"]').live("click",
    //  function () {
    //    if ($(this).is(':checked') == true) {

    //        $('#REQ_Chxbx_LegaSep').attr("checked,true
    //    } else {

    //        $('#Txt_EmailId').val(emailId);
    //        ;
    //    }

    //    $('input[type="checkbox"]').live("click",function () {
    //        if (!$(this).is(":checked")) {
    //            $(".REQ_Check").attr("disabled", true);
    //        } else {
    //            $(".REQ_Check").removeAttr("disabled");
    //        }
    //        });



    //    $('input[type="checkbox"]').live('click', function (event) {
    //        if ($(this).attr('checked') == false) {
    //            $(this).attr('checked', "checked");
    //        } else {
    //            $(this).attr('checked', false);
    //        }
    //        return false;
    //    });
});







    function check_status(flag) {
           if (flag == 1) {
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.Single', 1, '1', false);
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.LegallySeparated', 1, '', false);
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.Married', 1, '', false);
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.Annulled', 1, '', false);
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.Widower', 1, '', false);
        
        document.getElementById("REQ_Chxbx_LegaSep").checked = false;
        document.getElementById("REQ_Chxbx_Married").checked = false;
        document.getElementById("REQ_Chxbx_Annl").checked = false;
        document.getElementById("REQ_Chxbx_Widower").checked = false;
      
        

    }
   if (flag == 2){
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.LegallySeparated', 1, '1', false);
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.Single', 1, '', false);
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.Married', 1, '', false);
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.Annulled', 1, '', false);
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.Widower', 1, '', false);
        document.getElementById("REQ_Chxbx_Single").checked = false;
        document.getElementById("REQ_Chxbx_Married").checked = false;
        document.getElementById("REQ_Chxbx_Annl").checked = false;
        document.getElementById("REQ_Chxbx_Widower").checked = false;
      
    }
    if (flag == 3) {
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.Married', 1, '1', false);
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.Single', 1, '', false);
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.Annulled', 1, '', false);
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.Widower', 1, '', false);
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.LegallySeparated', 1, '', false);
        document.getElementById("REQ_Chxbx_Single").checked = false;
        document.getElementById("REQ_Chxbx_LegaSep").checked = false;
        document.getElementById("REQ_Chxbx_Annl").checked = false;
        document.getElementById("REQ_Chxbx_Widower").checked = false;

    }
    if (flag == 4) {
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.Annulled', 1, '1', false);
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.Single', 1, '', false);
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.Widower', 1, '', false);
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.LegallySeparated', 1, '', false);
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.Married', 1, '', false);
        document.getElementById("REQ_Chxbx_Single").checked = false;
        document.getElementById("REQ_Chxbx_LegaSep").checked = false;
        document.getElementById("REQ_Chxbx_Married").checked = false;
        document.getElementById("REQ_Chxbx_Widower").checked = false;

    }

    if (flag == 5) {
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.Widower', 1, '1', false);
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.Single', 1, '', false);
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.Annulled', 1, '', false);
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.LegallySeparated', 1, '', false);
        OBPager.SetTaskContentMemberValue('Requestfortransfer.CivilStatus.Married', 1, '', false);
        document.getElementById("REQ_Chxbx_Single").checked = false;
        document.getElementById("REQ_Chxbx_LegaSep").checked = false;
        document.getElementById("REQ_Chxbx_Married").checked = false;
        document.getElementById("REQ_Chxbx_Annl").checked = false;
        

    }
        
        }





        function purpose_of_transfer(flag) {
            if (flag == 1) {
                document.getElementById("Text_others").value = "";
                document.getElementById('Text_others').disabled = true;
                document.getElementById('Check_intrabranch').disabled = true;
                document.getElementById('Check_Interbranch').disabled = true;
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkclaims', 1, '1', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkconsolidation', 1, '', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.ChkSTL', 1, '', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkintrabranch', 1, '', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkothers', 1, '', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.ChkInterbranch', 1, '', false);
                document.getElementById('Text_others').disabled = true;
                document.getElementById("Check_consolidation").checked = false;
                document.getElementById("Req_Check_stl").checked = false;
                document.getElementById("chek_others").checked = false;
                document.getElementById("Check_Interbranch").checked = false;
                document.getElementById("Check_intrabranch").checked = false;

            }
            if (flag == 2) {
                document.getElementById("Text_others").value = "";
                document.getElementById('Text_others').disabled = true;
                document.getElementById('Check_intrabranch').disabled = false;
                document.getElementById('Check_Interbranch').disabled = false;
               
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkconsolidation', 1, '1', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkclaims', 1, '', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.ChkSTL', 1, '', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkothers', 1, '', false);
               

                if (document.getElementById('Check_Interbranch').checked == true) {
                    OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.ChkInterbranch', 1, '1', false);
                    OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkintrabranch', 1, '', false);
                    document.getElementById("Check_intrabranch").checked = false;
                }
                if (document.getElementById('Check_intrabranch').checked == true) {
                    OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.ChkIntrabranch', 1, '1', false);
                    OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkinterbranch', 1, '', false);
                    document.getElementById("Check_Interbranch").checked = false;

                }
                document.getElementById("Check_claims").checked = false;
                document.getElementById("Req_Check_stl").checked = false;
                document.getElementById("chek_others").checked = false;


            }

            if (flag == 3) {
                document.getElementById('Text_others').value = "";
                document.getElementById('Text_others').disabled = true;
                document.getElementById('Check_intrabranch').disabled = true;
                document.getElementById('Check_Interbranch').disabled = true;
                
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.ChkSTL', 1, '1', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkconsolidation', 1, '', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkclaims', 1, '', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkintrabranch', 1, '', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkothers', 1, '', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.ChkInterbranch', 1, '', false);

                document.getElementById("Check_consolidation").checked = false;
                document.getElementById("Check_claims").checked = false;
                document.getElementById("chek_others").checked = false;
                document.getElementById("Check_Interbranch").checked = false;
                document.getElementById("Check_intrabranch").checked = false;

            }


            if (flag == 4) {
                document.getElementById('Check_intrabranch').disabled = true;
                document.getElementById('Check_Interbranch').disabled = true;
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkothers', 1, '1', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkconsolidation', 1, '', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkclaims', 1, '', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkintrabranch', 1, '', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.ChkSTL', 1, '', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.ChkInterbranch', 1, '', false);

                document.getElementById("Text_others").disabled = false;
                document.getElementById("Check_consolidation").checked = false;
                document.getElementById("Check_claims").checked = false;
                document.getElementById("Req_Check_stl").checked = false;
                document.getElementById("Check_Interbranch").checked = false;
                document.getElementById("Check_intrabranch").checked = false;

            }

            if (flag == 5) {
                document.getElementById("Text_others").value = "";
                document.getElementById('Text_others').disabled = true;
                document.getElementById('Check_intrabranch').disabled = false;
                document.getElementById('Check_Interbranch').disabled = false;

                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkconsolidation', 1, '1', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkclaims', 1, '', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.ChkSTL', 1, '', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkothers', 1, '', false);


                
                    OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.ChkIntrabranch', 1, '1', false);
                    OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkinterbranch', 1, '', false);
                    document.getElementById("Check_Interbranch").checked = false;

                
                document.getElementById("Check_claims").checked = false;
                document.getElementById("Req_Check_stl").checked = false;
                document.getElementById("chek_others").checked = false;


            }


            if (flag == 6) {
                document.getElementById("Text_others").value = "";
                document.getElementById('Text_others').disabled = true;
                document.getElementById('Check_intrabranch').disabled = false;
                document.getElementById('Check_Interbranch').disabled = false;

                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkconsolidation', 1, '1', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkclaims', 1, '', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.ChkSTL', 1, '', false);
                OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkothers', 1, '', false);


               
                    OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.ChkInterbranch', 1, '1', false);
                    OBPager.SetTaskContentMemberValue('Requestfortransfer.purposeofTransfer.Chkintrabranch', 1, '', false);
                    document.getElementById("Check_intrabranch").checked = false;
                
              
                document.getElementById("Check_claims").checked = false;
                document.getElementById("Req_Check_stl").checked = false;
                document.getElementById("chek_others").checked = false;


            }
       }




       function check_if_with(flag) {

           if (flag == 1) {
               if (document.getElementById("Chk_housingloan").checked == true) {
                   OBPager.SetTaskContentMemberValue('Requestfortransfer.HousingLoan', '', '1', true);
                   document.getElementById("Chk_stl").checked = false;
                   OBPager.SetTaskContentMemberValue('Requestfortransfer.STL', '', '', true);
                   
                   document.getElementById('Text_takeoutdate1').disabled = false;
                   document.getElementById('Text_loanstatus1').disabled = false;
                   document.getElementById('Text_outstandbal1').disabled = false;
                   document.getElementById('Text_devdate').disabled = true;
                   document.getElementById('loanstatus2_text').disabled = true;
                   document.getElementById('outstandbal2_text').disabled = true;
                   //               $('#Text_takeoutdate1').removeAttr('disabled').addClass('textMandatory');
                   //               $('#Text_devdate').attr("disabled", "true").removeClass('textMandatory');
                   $('.stl').hide();
                   $('.housingloan').show();
               }
               else {
                   OBPager.SetTaskContentMemberValue('Requestfortransfer.HousingLoan', '', '', true);
                   OBPager.SetTaskContentMemberValue('Requestfortransfer.STL','', '', true);
                   document.getElementById("Chk_housingloan").checked = false;
                   document.getElementById("Chk_stl").checked = false;
                   document.getElementById('Text_takeoutdate1').disabled = true;
                   document.getElementById('Text_loanstatus1').disabled = true;
                   document.getElementById('Text_outstandbal1').disabled = true;
                   document.getElementById('Text_devdate').disabled = true;
                   document.getElementById('loanstatus2_text').disabled = true;
                   document.getElementById('outstandbal2_text').disabled = true;
                   //               $('#Text_takeoutdate1').removeAttr('disabled').addClass('textMandatory');
                   //               $('#Text_devdate').attr("disabled", "true").removeClass('textMandatory');
                   $('.stl').hide();
                   $('.housingloan').hide();
               }
           }

           if (flag == 2) {
               if (document.getElementById('Chk_stl').checked == true) {
                   OBPager.SetTaskContentMemberValue('Requestfortransfer.STL', '', '1', true);
                   OBPager.SetTaskContentMemberValue('Requestfortransfer.HousingLoan', '', '', true);
                   document.getElementById("Chk_housingloan").checked = false;
                   document.getElementById('Text_takeoutdate1').disabled = true;
                   document.getElementById('Text_loanstatus1').disabled = true;
                   document.getElementById('Text_outstandbal1').disabled = true;
                   document.getElementById('Text_devdate').disabled = false;
                   document.getElementById('loanstatus2_text').disabled = false;
                   document.getElementById('outstandbal2_text').disabled = false;
                   //               $('#Text_devdate').removeAttr('disabled').addClass('textMandatory');
                   //               $('#Text_takeoutdate1').attr("disabled", "true").removeClass('textMandatory');
                   $('.housingloan').hide();
                   $('.stl').show();
               }
               else {

                   OBPager.SetTaskContentMemberValue('Requestfortransfer.HousingLoan','', '', true);
                   OBPager.SetTaskContentMemberValue('Requestfortransfer.STL','', '', true);
                   document.getElementById("Chk_housingloan").checked = false;
                   document.getElementById("Chk_stl").checked = false;
                   document.getElementById('Text_takeoutdate1').disabled = true;
                   document.getElementById('Text_loanstatus1').disabled = true;
                   document.getElementById('Text_outstandbal1').disabled = true;
                   document.getElementById('Text_devdate').disabled = true;
                   document.getElementById('loanstatus2_text').disabled = true;
                   document.getElementById('outstandbal2_text').disabled = true;
                   //               $('#Text_devdate').removeAttr('disabled').addClass('textMandatory');
                   //               $('#Text_takeoutdate1').attr("disabled", "true").removeClass('textMandatory');
                   $('.housingloan').hide();
                   $('.stl').hide();
               }
           }


       
        } 





















    function check_status1() {
        if (document.getElementById('REQ_Chxbx_Single').checked == true) {
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Single ', 1, '', true);
            document.getElementById('REQ_Chxbx_LegaSep').checked == false;
            document.getElementById('REQ_Chxbx_Married').checked == false;
            document.getElementById('REQ_Chxbx_Annl').checked == false;
            document.getElementById('REQ_Chxbx_Widower').checked == false;
            OBPager.SetTaskContentMemberValue('Requestfortransfer.LegallySeparated ', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Married ', null, '-1', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Annulled ', null, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Widower  ', null, '', false);

        }

    }


    function check_status2() {
        if (document.getElementById('REQ_Chxbx_LegaSep').checked == true) {
            OBPager.SetTaskContentMemberValue('Requestfortransfer.LegallySeparated ', 1, '', true);
            document.getElementById('REQ_Chxbx_Single').checked == false;
            document.getElementById('REQ_Chxbx_Married').checked == false;
            document.getElementById('REQ_Chxbx_Annl').checked == false;
            document.getElementById('REQ_Chxbx_Widower').checked == false;
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Single ', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Married ', null, '-1', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Annulled ', null, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Widower  ', null, '', false);

        }

    }


    function check_status3() {
        if (document.getElementById('REQ_Chxbx_Married').checked == true) {
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Married ', 1, '', true);
            document.getElementById('REQ_Chxbx_Single').checked == false;
            document.getElementById('REQ_Chxbx_LegaSep').checked == false;
            document.getElementById('REQ_Chxbx_Annl').checked == false;
            document.getElementById('REQ_Chxbx_Widower').checked == false;
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Single ', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.LegallySeparated ', null, '-1', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Annulled ', null, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Widower  ', null, '', false);

        }

    }

    function check_status4() {
        if (document.getElementById('REQ_Chxbx_Annl').checked == true) {
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Annulled ', 1, '', true);
            document.getElementById('REQ_Chxbx_Single').checked == false;
            document.getElementById('REQ_Chxbx_LegaSep').checked == false;
            document.getElementById('REQ_Chxbx_Married').checked == false;
            document.getElementById('REQ_Chxbx_Widower').checked == false;
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Single ', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.LegallySeparated ', null, '-1', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Married ', null, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Widower  ', null, '', false);

        }

    }



    function check_status5() {
        if (document.getElementById('REQ_Chxbx_Widower').checked == true) {
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Widower ', 1, '', true);
            document.getElementById('REQ_Chxbx_Single').checked == false;
            document.getElementById('REQ_Chxbx_LegaSep').checked == false;
            document.getElementById('REQ_Chxbx_Married').checked == false;
            document.getElementById('REQ_Chxbx_Annl').checked == false;
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Single ', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.LegallySeparated ', null, '-1', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Married ', null, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Annulled  ', null, '', false);

        }

    }


    function check_housingloan() {
        
        if (document.getElementById('Chk_housingloan').checked == true) {
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Housingloan ', 1, '', true);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.STL ', 1, '', false);
            document.getElementById('Chk_stl').checked = false;
            document.getElementById('Text_takeoutdate1').enabled = true;
            document.getElementById('Text_loanstatus1').enabled = true;
            document.getElementById('Text_outstandbal1').enabled = true;
       

        }
    }

    function check_stl() {

        if (document.getElementById('Chk_stl').checked == true) {
            OBPager.SetTaskContentMemberValue('Requestfortransfer.STL ', 1, '', true);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Housingloan  ', 1, '', false);
            document.getElementById('Chk_housingloan').checked == false;
            document.getElementById('Text_devdate').enabled = true;
            document.getElementById('Text_loanstatus2').enabled = true;
            document.getElementById('Text_outstandbal2').enabled = true;


        }
    }





    function req_check_consolidation() {

        if (document.getElementById('Check_consolidation').checked == true) {
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkconsolidation', 1, '', true);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkclaims', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkothers', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.ChkSTL', 1, '', false);


            document.getElementById('Check_claims').checked == false;
            document.getElementById('Check_consolidation').checked == false;
            document.getElementById('Req_Check_stl').checked == false;
            document.getElementById('Check_intrabranch').disabled == false;
            document.getElementById('Check_Interbranch').disabled  == false;
            document.getElementById("Text_others").disabled = true;
        }
    }

    function req_check_intrabranch() {

        if (document.getElementById('Check_intrabranch').checked == true) {
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkconsolidation', 1, '', true);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkintrabranch', 1, '', true);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.ChkInterbranch', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkclaims', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkothers', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.ChkSTL', 1, '', false);


            document.getElementById('Check_claims').checked == false;
            document.getElementById('Check_consolidation').checked == true;
            document.getElementById('Req_Check_stl').checked == false;
            document.getElementById('Check_intrabranch').disabled == false;
            document.getElementById('Check_Interbranch').disabled == false;
            document.getElementById('Check_interbranch').checked == false;
            document.getElementById("Text_others").disabled = true;
        }
    }



    function req_check_Interbranch() {

        if (document.getElementById('Check_Interbranch').checked == true) {
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkconsolidation', 1, '', true);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkinterbranch', 1, '', true);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.ChkIntrabranch', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkclaims', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkothers', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.ChkSTL', 1, '', false);


            document.getElementById('Check_claims').checked == false;
            document.getElementById('Check_consolidation').checked == true;
            document.getElementById('Req_Check_stl').checked == false;            
            document.getElementById('Check_intrabranch').disabled == false;
            document.getElementById('Check_Interbranch').disabled == false;
            document.getElementById('Check_intrabranch').checked == false;
            document.getElementById("Text_others").disabled = true;
        }
    }

    function req_check_others() {

        if (document.getElementById('chek_others').checked == true) {
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkothers', 1, '', true);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkconsolidation  ', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.ChkSTL', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkintrabranch', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.ChkInterbranch ', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkclaims', 1, '', false);

            document.getElementById('Check_claims').checked == false;
            document.getElementById('Check_consolidation').checked == false;
            document.getElementById('Req_Check_stl').checked == false;
            document.getElementById('Check_intrabranch').checked == false;
            document.getElementById('Check_Interbranch').checked == false;            
            document.getElementById("Text_others").disabled = false;            
        }
    }



    function req_check_claims() {

        if (document.getElementById('Check_claims').checked == true) {
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkclaims', 1, '', true);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkconsolidation  ', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.ChkSTL', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkothers', 1, '', false);          
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkintrabranch', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.ChkInterbranch ', 1, '', false);

            document.getElementById('chek_others').checked == false;
            document.getElementById('Check_consolidation').checked == false;
            document.getElementById('Req_Check_stl').checked == false;
            document.getElementById('Check_intrabranch').checked == false;
            document.getElementById('Check_Interbranch').checked == false;
            document.getElementById("Text_others").disabled = true;
        }
    }


    function req_check_stl() {

        if (document.getElementById('Req_Check_stl').checked == true) {
            OBPager.SetTaskContentMemberValue('Requestfortransfer.ChkSTL', 1, '', true);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkconsolidation  ', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkclaims', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkothers', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.Chkintrabranch', 1, '', false);
            OBPager.SetTaskContentMemberValue('Requestfortransfer.ChkInterbranch ', 1, '', false);

            document.getElementById('chek_others').checked == false;
            document.getElementById('Check_consolidation').checked == false;
            document.getElementById('Check_claims').checked == false;
            document.getElementById('Check_intrabranch').checked == false;
            document.getElementById('Check_Interbranch').checked == false;
            document.getElementById("Text_others").disabled = true;
        }
    }






//    OBPager.ShowPage(1);
    ValidateOnlyInteger();
    ValidateOnlyAlphabets();
  

function SaveTaskData(saveMode) {
    // saveMode { 0:Save, 1:Submit }
    if (saveMode == 1) {
        if (validate.ValidateSubmit() == true) {
            if (OBPager.ValidateTaskData(saveMode) == true) {
                try {
                    if (OBPager.SaveTaskData(saveMode) == true) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                catch (e) {
                }
            }
            else {

                MsgboxInfo(OBPager.ValidationMessage);
            }
        }
    }
    else {

        try {
            if (OBPager.SaveTaskData(saveMode) == true) {
                //alert('Task saved successfully');
                return true;
            }
            else {
                alert('Error occured while saving the task');
                return false;
            }
        }
        catch (e) {
        }
    }
}
function ResetTaskData() {
    OBPager.ResetTaskContent();
    if (OBPager.taskStatusFlag == -1) {
        $("#Pg_1_text_LastName").val(TaskPrefillValues.PrefillValues.Set1.LastName);
        $("#Pg_1_text_FirstName").val(TaskPrefillValues.PrefillValues.Set1.FirstNameandInitials);
        $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.DateOfBirth);
        $("#Pg_1_text_EmpNumber").val(TaskPrefillValues.PrefillValues.Set1.EmployeeNumber);
        $("#Pg_1_text_Address").val(TaskPrefillValues.PrefillValues.Set1.Address);
        $("#Pg_1_text_SSN").val(TaskPrefillValues.PrefillValues.Set1.SSN);
        $("#Pg_2_text_SignatureDate").val(TaskPrefillValues.PrefillValues.Set1.SubmissionDate);
        OBPager.SetTaskContentMemberValue('ProvincialTaxALBERTA.BasicPersonalamt', null, 16825, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxALBERTA.TotalClaimAmt', null, 16825, true);
        jQXB.doBind(OBPager.taskContentDSName);
    }
}
function ValidateOnlyInteger() {
    $('input.nospace').keydown(function (e) {
        if (e.which != 8 && e.which != 46 && e.which != 37 && e.which != 32 && e.which != 39 && e.which != 16 && e.which != 9 && (e.which < 48 || e.which > 57) && (e.which < 96 || e.which > 105)) {
            return false;
        }
    });
}

function ValidateOnlyAlphabets() {
    $('input.nospace1').keydown(function (e) {
        if (e.which != 8 && e.which != 46 && e.which != 37 && e.which != 32 && e.which != 39 && e.which != 16 && e.which != 9 && (e.which < 65 || e.which > 90)) {
            return false;
        }
    });
}


$(function () {
    $(".jQrydatepicker").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
        yearRange: "-62:+0",
        maxDate: "0",
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });

});
   




       







