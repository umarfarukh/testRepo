
$().ready(function () {
    
    $("#Pg_1_Graduates").hide();
    $("#Pg_1_interns").hide();
    OBPager.ShowPage(1);
    OBPager.GetMaster(129, "Graduates");
    OBPager.GetMaster(130, "interns");
    showhide();
    
});
        function SaveTaskData(saveMode) { closeIt(); }
        function ResetTaskData() { }
        function showhide() {
            if (TaskPrefillValues.PrefillValues.Set1.JobDescription == "Graduates") {
                document.getElementById('Pg_1_Graduates').style.display = "block";
                
                $("#Pg_1_Graduates").show();
                $("#Pg_1_interns").hide();
            }
            else if (TaskPrefillValues.PrefillValues.Set1.JobDescription == "Interns") {
                document.getElementById('Pg_1_interns').style.display = "block";
                
                $("#Pg_1_Graduates").hide();
                $("#Pg_1_interns").show();
            }
               else {
                $("#Pg_1_Graduates").hide();
                $("#Pg_1_interns").hide();
            }
        }
           
        
          
 