
        $().ready(function () {
            $("#Pg_1_Graduates").hide();
            $("#Pg_1_interns").hide();
            OBPager.ShowPage(1);
           
            showhide();
        });
             
        function showhide() {
            if (TaskPrefillValues.PrefillValues.Set1.JobDescription == "Graduates") {
                $("#Pg_1_Graduates").show();
                $("#Pg_1_interns").hide();
            }
            else if (TaskPrefillValues.PrefillValues.Set1.JobDescription == "Interns") {
                $("#Pg_1_Graduates").hide();
                $("#Pg_1_interns").show();
            }
            else {
                $("#Pg_1_Graduates").hide();
                $("#Pg_1_interns").hide();
            }


        }
           
        
          
   