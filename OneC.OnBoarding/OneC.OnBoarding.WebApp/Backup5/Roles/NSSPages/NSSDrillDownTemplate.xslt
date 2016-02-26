<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    exclude-result-prefixes="msxsl">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="/">
		<html>
			<head>
				<link href="../../Styles/drilldown.css" rel="stylesheet" type="text/css" />
				<script type="text/javascript" src="../../Scripts/JQuery/1.8/indiaonboarding.js"></script>
				<script type="text/javascript" language="javascript">
					window.updateWithNewData = function () {
					return false;
					}
				</script>
				<script type="text/javascript" language="javascript">

          $(document).ready(function() {onSelection();
          statuschange();
          });

          function onSelection(){
          statuschange();
          showLabels();
          }

          function showLabels(){
          if ($("#ddl_SamsungNote4  option:selected").val() == "14" || $("#ddl_IPhone6  option:selected").val() == "14" || $("#ddl_IPhone6P  option:selected").val() == "14" || $("#ddl_LG_G3_16GB option:selected").val() == "14" || $("#ddl_Samsung_S6_32GB option:selected").val() == "14" || $("#ddl_Samsung_S6_64GB option:selected").val() == "14" || $("#ddl_Samsung_S6_128GB option:selected").val() == "14" || $("#ddl_Samsung_S6edge_32GB option:selected").val() == "14" || $("#ddl_Samsung_S6edge_64GB option:selected").val() == "14" || $("#ddl_Samsung_S6edge_128GB option:selected").val() == "14" || $("#ddl_SamsungNote3  option:selected").val() == "14" || $("#ddl_LGG2  option:selected").val() == "14" || $("#ddl_IPhone5C  option:selected").val() == "14" || $("#ddl_IPhone5S option:selected").val() == "14" || $("#ddl_IPhone4S option:selected").val() == "14" || $("#ddl_SamsungS5 option:selected").val() == "14" || $("#ddl_SamsungS4 option:selected").val() == "14" || $("#ddl_SamsungS3 option:selected").val() == "14" || $("#ddl_Q10 option:selected").val() == "14" || $("#ddl_BlackBerryZ10 option:selected").val() == "14" ||$("[id='ddl_Laptop issued by cognizant'] option:selected").val() == "14" ||$("#ddl_AndroidDevice option:selected").val() == "14" ||$("#ddl_ClientLaptop option:selected").val() == "14" || $("#ddl_Laptop option:selected").val() == "14" || $("#ddl_Blackberry option:selected").val() == "14" || $("#ddl_CellPhone option:selected").val() == "14" || $("#ddl_ClientEquipment option:selected").val() == "14" || $("#ddl_DataCard option:selected").val() == "14")
          {
          $("#commentsLbl").show();
          $("#fedexLbl").show();
          $("#dateLbl").show();
          }
          else if ($("#ddl_SamsungNote4 option:selected").val() == "6" || $("#ddl_IPhone6 option:selected").val() == "6" || $("#ddl_IPhone6P option:selected").val() == "6" || $("#ddl_LG_G3_16GB option:selected").val() == "6" || $("#ddl_Samsung_S6_32GB option:selected").val() == "6" || $("#ddl_Samsung_S6_64GB option:selected").val() == "6" || $("#ddl_Samsung_S6_128GB option:selected").val() == "6" || $("#ddl_Samsung_S6edge_32GB option:selected").val() == "6" || $("#ddl_Samsung_S6edge_64GB option:selected").val() == "6" || $("#ddl_Samsung_S6edge_128GB option:selected").val() == "6" || $("#ddl_SamsungNote3 option:selected").val() == "6" || $("#ddl_LGG2 option:selected").val() == "6" || $("#ddl_IPhone5C option:selected").val() == "6" || $("#ddl_IPhone5S option:selected").val() == "6" || $("#ddl_IPhone4S option:selected").val() == "6" || $("#ddl_SamsungS5 option:selected").val() == "6" || $("#ddl_SamsungS4 option:selected").val() == "6" || $("#ddl_SamsungS3 option:selected").val() == "6" || $("#ddl_Q10 option:selected").val() == "6" || $("#ddl_BlackBerryZ10 option:selected").val() == "6" || $("#ddl_SamsungNote4 option:selected").val() == "5" || $("#ddl_IPhone6 option:selected").val() == "5" || $("#ddl_IPhone6P option:selected").val() == "5"|| $("#ddl_LG_G3_16GB option:selected").val() == "5" || $("#ddl_Samsung_S6_32GB option:selected").val() == "5" || $("#ddl_Samsung_S6_64GB option:selected").val() == "5" || $("#ddl_Samsung_S6_128GB option:selected").val() == "5" || $("#ddl_Samsung_S6edge_32GB option:selected").val() == "5" || $("#ddl_Samsung_S6edge_64GB option:selected").val() == "5" || $("#ddl_Samsung_S6edge_128GB option:selected").val() == "5" || $("#ddl_SamsungNote3 option:selected").val() == "5" || $("#ddl_LGG2 option:selected").val() == "5" || $("#ddl_IPhone5C option:selected").val() == "5"|| $("#ddl_IPhone5S option:selected").val() == "5" || $("#ddl_IPhone4S option:selected").val() == "5" || $("#ddl_SamsungS5 option:selected").val() == "5" || $("#ddl_SamsungS4 option:selected").val() == "5" || $("#ddl_SamsungS3 option:selected").val() == "5" || $("#ddl_Q10 option:selected").val() == "5" || $("#ddl_BlackBerryZ10 option:selected").val() == "5" ||$("[id='ddl_Laptop issued by cognizant'] option:selected").val() == "5" || $("[id='ddl_Laptop issued by cognizant'] option:selected").val() == "6" ||$("#ddl_AndroidDevice option:selected").val() == "5" || $("#ddl_AndroidDevice option:selected").val() == "6" ||$("#ddl_ClientLaptop option:selected").val() == "5" || $("#ddl_ClientLaptop option:selected").val() == "6" || $("#ddl_Laptop option:selected").val() == "5" || $("#ddl_Laptop option:selected").val() == "6" || $("#ddl_Blackberry option:selected").val() == "5" || $("#ddl_Blackberry option:selected").val() == "6" || $("#ddl_CellPhone option:selected").val() == "5" || $("#ddl_CellPhone option:selected").val() == "6" || $("#ddl_ClientEquipment option:selected").val() == "5" || $("#ddl_ClientEquipment option:selected").val() == "6" || $("#ddl_DataCard option:selected").val() == "5" || $("#ddl_DataCard option:selected").val() == "6")
          {
          $("#commentsLbl").show();
          $("#fedexLbl").hide();
          $("#dateLbl").hide();
          }
          else
          {
          $("#commentsLbl").hide();
          $("#fedexLbl").hide();
          $("#dateLbl").hide();
          }

          }
          var flagA;
          var flagB;
          var flagC;
          var flagD;
          var flagE;
          var flagF;
          var flagG;
          var flagH;
          var flagI;
          var flagJ;
          var flagK;
          var flagL;
          var flagM;
          var flagN;

          var flagO;
          var flagP;
          var flagQ;

          function statuschange() {

          if ($("[id='ddl_Laptop issued by cognizant'] option:selected").val() == "14") {
          $("[id='txtComments_Laptop issued by cognizant']").show();
          $("[id='txtFedEx_Laptop issued by cognizant']").show();
          $("[id='txtDeliveryDate_Laptop issued by cognizant']").show();
          $("[id='txtDeliveryDate_Laptop issued by cognizant']").parent().show();
          if(!flagC){addDatepicker($("[id='txtDeliveryDate_Laptop issued by cognizant']")); flagC=true;}
          }
          else if ($("[id='ddl_Laptop issued by cognizant'] option:selected").val() == "5" || $("[id='ddl_Laptop issued by cognizant'] option:selected").val() == "6") {
          $("[id='txtComments_Laptop issued by cognizant']").show();
          $("[id='txtFedEx_Laptop issued by cognizant']").hide();
          $("[id='txtDeliveryDate_Laptop issued by cognizant']").hide();
          $("[id='txtDeliveryDate_Laptop issued by cognizant']").parent().hide();
          $("[id='txtDeliveryDate_Laptop issued by cognizant']").val("");
          }
          else
          {
          $("[id='txtComments_Laptop issued by cognizant']").hide();
          $("[id='txtFedEx_Laptop issued by cognizant']").hide();
          $("[id='txtDeliveryDate_Laptop issued by cognizant']").hide();
          $("[id='txtDeliveryDate_Laptop issued by cognizant']").parent().hide();
          $("[id='txtDeliveryDate_Laptop issued by cognizant']").val("");
          }

          if ($("#ddl_AndroidDevice option:selected").val() == "14") {
          $("#txtComments_AndroidDevice").show();
          $("#txtFedEx_AndroidDevice").show();
          $("#txtDeliveryDate_AndroidDevice").show();
          $("#txtDeliveryDate_AndroidDevice").parent().show();
          if(!flagC){addDatepicker($("#txtDeliveryDate_AndroidDevice")); flagC=true;}
          }
          else if ($("#ddl_AndroidDevice option:selected").val() == "5" || $("#ddl_AndroidDevice option:selected").val() == "6") {
          $("#txtComments_AndroidDevice").show();
          $("#txtFedEx_AndroidDevice").hide();
          $("#txtDeliveryDate_AndroidDevice").hide();
          $("#txtDeliveryDate_AndroidDevice").parent().hide();
          $("#txtDeliveryDate_AndroidDevice").val("");
          }
          else
          {
          $("#txtComments_AndroidDevice").hide();
          $("#txtFedEx_AndroidDevice").hide();
          $("#txtDeliveryDate_AndroidDevice").hide();
          $("#txtDeliveryDate_AndroidDevice").parent().hide();
          $("#txtDeliveryDate_AndroidDevice").val("");
          }



          if ($("#ddl_ClientLaptop option:selected").val() == "14") {
          $("#txtComments_ClientLaptop").show();
          $("#txtFedEx_ClientLaptop").show();
          $("#txtDeliveryDate_ClientLaptop").show();
          $("#txtDeliveryDate_ClientLaptop").parent().show();
          if(!flagC){addDatepicker($("#txtDeliveryDate_ClientLaptop")); flagC=true;}
          }
          else if ($("#ddl_ClientLaptop option:selected").val() == "5" || $("#ddl_ClientLaptop option:selected").val() == "6") {
          $("#txtComments_ClientLaptop").show();
          $("#txtFedEx_ClientLaptop").hide();
          $("#txtDeliveryDate_ClientLaptop").hide();
          $("#txtDeliveryDate_ClientLaptop").parent().hide();
          $("#txtDeliveryDate_ClientLaptop").val("");
          }
          else
          {
          $("#txtComments_ClientLaptop").hide();
          $("#txtFedEx_ClientLaptop").hide();
          $("#txtDeliveryDate_ClientLaptop").hide();
          $("#txtDeliveryDate_ClientLaptop").parent().hide();
          $("#txtDeliveryDate_ClientLaptop").val("");
          }


          if ($("#ddl_Laptop option:selected").val() == "14") {
          $("#txtComments_Laptop").show();
          $("#txtFedEx_Laptop").show();
          $("#txtDeliveryDate_Laptop").parent().show();
          $("#txtDeliveryDate_Laptop").show();
          if(!flagA){ addDatepicker($("#txtDeliveryDate_Laptop")); flagA=true;}
          }
          else if ($("#ddl_Laptop option:selected").val() == "5" || $("#ddl_Laptop option:selected").val() == "6") {
          $("#txtComments_Laptop").show();
          $("#txtFedEx_Laptop").hide();
          $("#txtFedEx_Laptop").val("");
          $("#txtDeliveryDate_Laptop").hide();
          $("#txtDeliveryDate_Laptop").parent().hide();
          $("#txtDeliveryDate_Laptop").val("");
          }
          else
          {
          $("#txtFedEx_Laptop").hide();
          $("#txtFedEx_Laptop").val("");
          $("#txtComments_Laptop").hide();
          $("#txtComments_Laptop").val("");
          $("#txtDeliveryDate_Laptop").hide();
          $("#txtDeliveryDate_Laptop").parent().hide();
          $("#txtDeliveryDate_Laptop").val("");
          }

          if ($("#ddl_Blackberry option:selected").val() == "14") {
          $("#txtComments_Blackberry").show();
          $("#txtFedEx_Blackberry").show();
          $("#txtDeliveryDate_Blackberry").show();
          $("#txtDeliveryDate_Blackberry").parent().show();
          if(!flagB){addDatepicker($("#txtDeliveryDate_Blackberry")); flagB=true;}
          }
          else if ($("#ddl_Blackberry option:selected").val() == "5" || $("#ddl_Blackberry option:selected").val() == "6") {
          $("#txtComments_Blackberry").show();
          $("#txtFedEx_Blackberry").hide();
          $("#txtDeliveryDate_Blackberry").hide();
          $("#txtDeliveryDate_Blackberry").parent().hide();
          $("#txtDeliveryDate_Blackberry").val("");
          }
          else
          {
          $("#txtComments_Blackberry").hide();
          $("#txtFedEx_Blackberry").hide();
          $("#txtDeliveryDate_Blackberry").hide();
          $("#txtDeliveryDate_Blackberry").parent().hide();
          $("#txtDeliveryDate_Blackberry").val("");
          }

          if ($("#ddl_CellPhone option:selected").val() == "14") {
          $("#txtComments_CellPhone").show();
          $("#txtFedEx_CellPhone").show();
          $("#txtDeliveryDate_CellPhone").show();
          $("#txtDeliveryDate_CellPhone").parent().show();
          if(!flagC){addDatepicker($("#txtDeliveryDate_CellPhone")); flagC=true;}
          }
          else if ($("#ddl_CellPhone option:selected").val() == "5" || $("#ddl_CellPhone option:selected").val() == "6") {
          $("#txtComments_CellPhone").show();
          $("#txtFedEx_CellPhone").hide();
          $("#txtDeliveryDate_CellPhone").hide();
          $("#txtDeliveryDate_CellPhone").parent().hide();
          $("#txtDeliveryDate_CellPhone").val("");
          }
          else
          {
          $("#txtComments_CellPhone").hide();
          $("#txtFedEx_CellPhone").hide();
          $("#txtDeliveryDate_CellPhone").hide();
          $("#txtDeliveryDate_CellPhone").parent().hide();
          $("#txtDeliveryDate_CellPhone").val("");
          }

          if ($("#ddl_ClientEquipment option:selected").val() == "14") {
          $("#txtComments_ClientEquipment").show();
          $("#txtFedEx_ClientEquipment").show();
          $("#txtDeliveryDate_ClientEquipment").show();
          $("#txtDeliveryDate_ClientEquipment").parent().show();
          if(!flagD){addDatepicker($("#txtDeliveryDate_ClientEquipment")); flagD=true;}
          }
          else if ($("#ddl_ClientEquipment option:selected").val() == "5" || $("#ddl_ClientEquipment option:selected").val() == "6") {
          $("#txtComments_ClientEquipment").show();
          $("#txtFedEx_ClientEquipment").hide();
          $("#txtDeliveryDate_ClientEquipment").hide();
          $("#txtDeliveryDate_ClientEquipment").parent().hide();
          $("#txtDeliveryDate_ClientEquipment").val("");
          }
          else
          {
          $("#txtComments_ClientEquipment").hide();
          $("#txtFedEx_ClientEquipment").hide();
          $("#txtDeliveryDate_ClientEquipment").hide();
          $("#txtDeliveryDate_ClientEquipment").parent().hide();
          $("#txtDeliveryDate_ClientEquipment").val("");
          }
          if ($("#ddl_DataCard option:selected").val() == "14") {
          $("#txtComments_DataCard").show();
          $("#txtFedEx_DataCard").show();
          $("#txtDeliveryDate_DataCard").show();
          $("#txtDeliveryDate_DataCard").parent().show();
          if(!flagE){addDatepicker($("#txtDeliveryDate_DataCard")); flagE=true;}
          }
          else if ($("#ddl_DataCard option:selected").val() == "5" || $("#ddl_DataCard option:selected").val() == "6") {
          $("#txtComments_DataCard").show();
          $("#txtFedEx_DataCard").hide();
          $("#txtDeliveryDate_DataCard").hide();
          $("#txtDeliveryDate_DataCard").parent().hide();
          $("#txtDeliveryDate_DataCard").val("");
          }
          else
          {
          $("#txtComments_DataCard").hide();
          $("#txtFedEx_DataCard").hide();
          $("#txtDeliveryDate_DataCard").hide();
          $("#txtDeliveryDate_DataCard").parent().hide();
          $("#txtDeliveryDate_DataCard").val("");
          }

          if ($("#ddl_IPhone5C  option:selected").val() == "14") {
          $("#txtComments_IPhone5C").show();
          $("#txtFedEx_IPhone5C").show();
          $("#txtDeliveryDate_IPhone5C").parent().show();
          $("#txtDeliveryDate_IPhone5C").show();
          if(!flagF){ addDatepicker($("#txtDeliveryDate_IPhone5C ")); flagF=true;}
          }
          else if ($("#ddl_IPhone5C  option:selected").val() == "5" || $("#ddl_IPhone5C  option:selected").val() == "6") {
          $("#txtComments_IPhone5C").show();
          $("#txtFedEx_IPhone5C").hide();
          $("#txtFedEx_IPhone5C").val("");
          $("#txtDeliveryDate_IPhone5C").hide();
          $("#txtDeliveryDate_IPhone5C").parent().hide();
          $("#txtDeliveryDate_IPhone5C").val("");
          }
          else
          {
          $("#txtFedEx_IPhone5C").hide();
          $("#txtFedEx_IPhone5C").val("");
          $("#txtComments_IPhone5C").hide();
          $("#txtComments_IPhone5C").val("");
          $("#txtDeliveryDate_IPhone5C").hide();
          $("#txtDeliveryDate_IPhone5C").parent().hide();
          $("#txtDeliveryDate_IPhone5C").val("");
          }

          if ($("#ddl_IPhone5S  option:selected").val() == "14") {
          $("#txtComments_IPhone5S").show();
          $("#txtFedEx_IPhone5S").show();
          $("#txtDeliveryDate_IPhone5S").parent().show();
          $("#txtDeliveryDate_IPhone5S").show();
          if(!flagG){ addDatepicker($("#txtDeliveryDate_IPhone5S")); flagG=true;}
          }
          else if ($("#ddl_IPhone5S  option:selected").val() == "5" || $("#ddl_IPhone5S  option:selected").val() == "6") {
          $("#txtComments_IPhone5S").show();
          $("#txtFedEx_IPhone5S").hide();
          $("#txtFedEx_IPhone5S").val("");
          $("#txtDeliveryDate_IPhone5S").hide();
          $("#txtDeliveryDate_IPhone5S").parent().hide();
          $("#txtDeliveryDate_IPhone5S").val("");
          }
          else
          {
          $("#txtFedEx_IPhone5S").hide();
          $("#txtFedEx_IPhone5S").val("");
          $("#txtComments_IPhone5S").hide();
          $("#txtComments_IPhone5S").val("");
          $("#txtDeliveryDate_IPhone5S").hide();
          $("#txtDeliveryDate_IPhone5S").parent().hide();
          $("#txtDeliveryDate_IPhone5S").val("");
          }

          if ($("#ddl_IPhone4S  option:selected").val() == "14") {
          $("#txtComments_IPhone4S").show();
          $("#txtFedEx_IPhone4S").show();
          $("#txtDeliveryDate_IPhone4S").parent().show();
          $("#txtDeliveryDate_IPhone4S").show();
          if(!flagH){ addDatepicker($("#txtDeliveryDate_IPhone4S")); flagH=true;}
          }
          else if ($("#ddl_IPhone4S  option:selected").val() == "5" || $("#ddl_IPhone4S  option:selected").val() == "6") {
          $("#txtComments_IPhone4S").show();
          $("#txtFedEx_IPhone4S").hide();
          $("#txtFedEx_IPhone4S").val("");
          $("#txtDeliveryDate_IPhone4S").hide();
          $("#txtDeliveryDate_IPhone4S").parent().hide();
          $("#txtDeliveryDate_IPhone4S").val("");
          }
          else
          {
          $("#txtFedEx_IPhone4S").hide();
          $("#txtFedEx_IPhone4S").val("");
          $("#txtComments_IPhone4S").hide();
          $("#txtComments_IPhone4S").val("");
          $("#txtDeliveryDate_IPhone4S").hide();
          $("#txtDeliveryDate_IPhone4S").parent().hide();
          $("#txtDeliveryDate_IPhone4S").val("");
          }

          if ($("#ddl_SamsungS5  option:selected").val() == "14") {
          $("#txtComments_SamsungS5").show();
          $("#txtFedEx_SamsungS5").show();
          $("#txtDeliveryDate_SamsungS5").parent().show();
          $("#txtDeliveryDate_SamsungS5").show();
          if(!flagH){ addDatepicker($("#txtDeliveryDate_SamsungS5")); flagH=true;}
          }
          else if ($("#ddl_SamsungS5  option:selected").val() == "5" || $("#ddl_SamsungS5  option:selected").val() == "6") {
          $("#txtComments_SamsungS5").show();
          $("#txtFedEx_SamsungS5").hide();
          $("#txtFedEx_SamsungS5").val("");
          $("#txtDeliveryDate_SamsungS5").hide();
          $("#txtDeliveryDate_SamsungS5").parent().hide();
          $("#txtDeliveryDate_SamsungS5").val("");
          }
          else
          {
          $("#txtFedEx_SamsungS5").hide();
          $("#txtFedEx_SamsungS5").val("");
          $("#txtComments_SamsungS5").hide();
          $("#txtComments_SamsungS5").val("");
          $("#txtDeliveryDate_SamsungS5").hide();
          $("#txtDeliveryDate_SamsungS5").parent().hide();
          $("#txtDeliveryDate_SamsungS5").val("");
          }

          if ($("#ddl_SamsungS4  option:selected").val() == "14") {
          $("#txtComments_SamsungS4").show();
          $("#txtFedEx_SamsungS4").show();
          $("#txtDeliveryDate_SamsungS4").parent().show();
          $("#txtDeliveryDate_SamsungS4").show();
          if(!flagI){ addDatepicker($("#txtDeliveryDate_SamsungS4")); flagI=true;}
          }
          else if ($("#ddl_SamsungS4  option:selected").val() == "5" || $("#ddl_SamsungS4  option:selected").val() == "6") {
          $("#txtComments_SamsungS4").show();
          $("#txtFedEx_SamsungS4").hide();
          $("#txtFedEx_SamsungS4").val("");
          $("#txtDeliveryDate_SamsungS4").hide();
          $("#txtDeliveryDate_SamsungS4").parent().hide();
          $("#txtDeliveryDate_SamsungS4").val("");
          }
          else
          {
          $("#txtFedEx_SamsungS4").hide();
          $("#txtFedEx_SamsungS4").val("");
          $("#txtComments_SamsungS4").hide();
          $("#txtComments_SamsungS4").val("");
          $("#txtDeliveryDate_SamsungS4").hide();
          $("#txtDeliveryDate_SamsungS4").parent().hide();
          $("#txtDeliveryDate_SamsungS4").val("");
          }

          if ($("#ddl_SamsungS3  option:selected").val() == "14") {
          $("#txtComments_SamsungS3").show();
          $("#txtFedEx_SamsungS3").show();
          $("#txtDeliveryDate_SamsungS3").parent().show();
          $("#txtDeliveryDate_SamsungS3").show();
          if(!flagJ){ addDatepicker($("#txtDeliveryDate_SamsungS3")); flagJ=true;}
          }
          else if ($("#ddl_SamsungS3  option:selected").val() == "5" || $("#ddl_SamsungS3  option:selected").val() == "6") {
          $("#txtComments_SamsungS3").show();
          $("#txtFedEx_SamsungS3").hide();
          $("#txtFedEx_SamsungS3").val("");
          $("#txtDeliveryDate_SamsungS3").hide();
          $("#txtDeliveryDate_SamsungS3").parent().hide();
          $("#txtDeliveryDate_SamsungS3").val("");
          }
          else
          {
          $("#txtFedEx_SamsungS3").hide();
          $("#txtFedEx_SamsungS3").val("");
          $("#txtComments_SamsungS3").hide();
          $("#txtComments_SamsungS3").val("");
          $("#txtDeliveryDate_SamsungS3").hide();
          $("#txtDeliveryDate_SamsungS3").parent().hide();
          $("#txtDeliveryDate_SamsungS3").val("");
          }

          if ($("#ddl_Q10  option:selected").val() == "14") {
          $("#txtComments_Q10").show();
          $("#txtFedEx_Q10").show();
          $("#txtDeliveryDate_Q10").parent().show();
          $("#txtDeliveryDate_Q10").show();
          if(!flagK){ addDatepicker($("#txtDeliveryDate_Q10")); flagK=true;}
          }
          else if ($("#ddl_Q10  option:selected").val() == "5" || $("#ddl_Q10  option:selected").val() == "6") {
          $("#txtComments_Q10").show();
          $("#txtFedEx_Q10").hide();
          $("#txtFedEx_Q10").val("");
          $("#txtDeliveryDate_Q10").hide();
          $("#txtDeliveryDate_Q10").parent().hide();
          $("#txtDeliveryDate_Q10").val("");
          }
          else {
          $("#txtFedEx_Q10").hide();
          $("#txtFedEx_Q10").val("");
          $("#txtComments_Q10").hide();
          $("#txtComments_Q10").val("");
          $("#txtDeliveryDate_Q10").hide();
          $("#txtDeliveryDate_Q10").parent().hide();
          $("#txtDeliveryDate_Q10").val("");
          }

          if ($("#ddl_BlackBerryZ10  option:selected").val() == "14") {
          $("#txtComments_BlackBerryZ10").show();
          $("#txtFedEx_BlackBerryZ10").show();
          $("#txtDeliveryDate_BlackBerryZ10").parent().show();
          $("#txtDeliveryDate_BlackBerryZ10").show();
          if(!flagL){ addDatepicker($("#txtDeliveryDate_BlackBerryZ10")); flagL=true;}
          }
          else if ($("#ddl_BlackBerryZ10  option:selected").val() == "5" || $("#ddl_BlackBerryZ10  option:selected").val() == "6") {
          $("#txtComments_BlackBerryZ10").show();
          $("#txtFedEx_BlackBerryZ10").hide();
          $("#txtFedEx_BlackBerryZ10").val("");
          $("#txtDeliveryDate_BlackBerryZ10").hide();
          $("#txtDeliveryDate_BlackBerryZ10").parent().hide();
          $("#txtDeliveryDate_BlackBerryZ10").val("");
          }
          else {
          $("#txtFedEx_BlackBerryZ10").hide();
          $("#txtFedEx_BlackBerryZ10").val("");
          $("#txtComments_BlackBerryZ10").hide();
          $("#txtComments_BlackBerryZ10").val("");
          $("#txtDeliveryDate_BlackBerryZ10").hide();
          $("#txtDeliveryDate_BlackBerryZ10").parent().hide();
          $("#txtDeliveryDate_BlackBerryZ10").val("");
          }

          if ($("#ddl_SamsungNote3  option:selected").val() == "14") {
          $("#txtComments_SamsungNote3").show();
          $("#txtFedEx_SamsungNote3").show();
          $("#txtDeliveryDate_SamsungNote3").parent().show();
          $("#txtDeliveryDate_SamsungNote3").show();
          if(!flagM){ addDatepicker($("#txtDeliveryDate_SamsungNote3")); flagM=true;}
          }
          else if ($("#ddl_SamsungNote3  option:selected").val() == "5" || $("#ddl_SamsungNote3  option:selected").val() == "6") {
          $("#txtComments_SamsungNote3").show();
          $("#txtFedEx_SamsungNote3").hide();
          $("#txtFedEx_SamsungNote3").val("");
          $("#txtDeliveryDate_SamsungNote3").hide();
          $("#txtDeliveryDate_SamsungNote3").parent().hide();
          $("#txtDeliveryDate_SamsungNote3").val("");
          }
          else
          {
          $("#txtFedEx_SamsungNote3").hide();
          $("#txtFedEx_SamsungNote3").val("");
          $("#txtComments_SamsungNote3").hide();
          $("#txtComments_SamsungNote3").val("");
          $("#txtDeliveryDate_SamsungNote3").hide();
          $("#txtDeliveryDate_SamsungNote3").parent().hide();
          $("#txtDeliveryDate_SamsungNote3").val("");
          }

          if ($("#ddl_LGG2  option:selected").val() == "14") {
          $("#txtComments_LGG2").show();
          $("#txtFedEx_LGG2").show();
          $("#txtDeliveryDate_LGG2").parent().show();
          $("#txtDeliveryDate_LGG2").show();
          if(!flagN){ addDatepicker($("#txtDeliveryDate_LGG2")); flagN=true;}
          }
          else if ($("#ddl_LGG2  option:selected").val() == "5" || $("#ddl_LGG2  option:selected").val() == "6") {
          $("#txtComments_LGG2").show();
          $("#txtFedEx_LGG2").hide();
          $("#txtFedEx_LGG2").val("");
          $("#txtDeliveryDate_LGG2").hide();
          $("#txtDeliveryDate_LGG2").parent().hide();
          $("#txtDeliveryDate_LGG2").val("");
          }
          else
          {
          $("#txtFedEx_LGG2").hide();
          $("#txtFedEx_LGG2").val("");
          $("#txtComments_LGG2").hide();
          $("#txtComments_LGG2").val("");
          $("#txtDeliveryDate_LGG2").hide();
          $("#txtDeliveryDate_LGG2").parent().hide();
          $("#txtDeliveryDate_LGG2").val("");
          }

          if ($("#ddl_SamsungNote4  option:selected").val() == "14") {
          $("#txtComments_SamsungNote4").show();
          $("#txtFedEx_SamsungNote4").show();
          $("#txtDeliveryDate_SamsungNote4").parent().show();
          $("#txtDeliveryDate_SamsungNote4").show();
          if(!flagO){ addDatepicker($("#txtDeliveryDate_SamsungNote4")); flagO=true;}
          }
          else if ($("#ddl_SamsungNote4  option:selected").val() == "5" || $("#ddl_SamsungNote4  option:selected").val() == "6") {
          $("#txtComments_SamsungNote4").show();
          $("#txtFedEx_SamsungNote4").hide();
          $("#txtFedEx_SamsungNote4").val("");
          $("#txtDeliveryDate_SamsungNote4").hide();
          $("#txtDeliveryDate_SamsungNote4").parent().hide();
          $("#txtDeliveryDate_SamsungNote4").val("");
          }
          else
          {
          $("#txtFedEx_SamsungNote4").hide();
          $("#txtFedEx_SamsungNote4").val("");
          $("#txtComments_SamsungNote4").hide();
          $("#txtComments_SamsungNote4").val("");
          $("#txtDeliveryDate_SamsungNote4").hide();
          $("#txtDeliveryDate_SamsungNote4").parent().hide();
          $("#txtDeliveryDate_SamsungNote4").val("");
          }

          if ($("#ddl_IPhone6  option:selected").val() == "14") {
          $("#txtComments_IPhone6").show();
          $("#txtFedEx_IPhone6").show();
          $("#txtDeliveryDate_IPhone6").parent().show();
          $("#txtDeliveryDate_IPhone6").show();
          if(!flagP){ addDatepicker($("#txtDeliveryDate_IPhone6")); flagP=true;}
          }
          else if ($("#ddl_IPhone6  option:selected").val() == "5" || $("#ddl_IPhone6  option:selected").val() == "6") {
          $("#txtComments_IPhone6").show();
          $("#txtFedEx_IPhone6").hide();
          $("#txtFedEx_IPhone6").val("");
          $("#txtDeliveryDate_IPhone6").hide();
          $("#txtDeliveryDate_IPhone6").parent().hide();
          $("#txtDeliveryDate_IPhone6").val("");
          }
          else
          {
          $("#txtFedEx_IPhone6").hide();
          $("#txtFedEx_IPhone6").val("");
          $("#txtComments_IPhone6").hide();
          $("#txtComments_IPhone6").val("");
          $("#txtDeliveryDate_IPhone6").hide();
          $("#txtDeliveryDate_IPhone6").parent().hide();
          $("#txtDeliveryDate_IPhone6").val("");
          }

          if ($("#ddl_IPhone6P  option:selected").val() == "14") {
          $("#txtComments_IPhone6P").show();
          $("#txtFedEx_IPhone6P").show();
          $("#txtDeliveryDate_IPhone6P").parent().show();
          $("#txtDeliveryDate_IPhone6P").show();
          if(!flagQ){ addDatepicker($("#txtDeliveryDate_IPhone6P")); flagQ=true;}
          }
          else if ($("#ddl_IPhone6P  option:selected").val() == "5" || $("#ddl_IPhone6P  option:selected").val() == "6") {
          $("#txtComments_IPhone6P").show();
          $("#txtFedEx_IPhone6P").hide();
          $("#txtFedEx_IPhone6P").val("");
          $("#txtDeliveryDate_IPhone6P").hide();
          $("#txtDeliveryDate_IPhone6P").parent().hide();
          $("#txtDeliveryDate_IPhone6P").val("");
          }
          else
          {
          $("#txtFedEx_IPhone6P").hide();
          $("#txtFedEx_IPhone6P").val("");
          $("#txtComments_IPhone6P").hide();
          $("#txtComments_IPhone6P").val("");
          $("#txtDeliveryDate_IPhone6P").hide();
          $("#txtDeliveryDate_IPhone6P").parent().hide();
          $("#txtDeliveryDate_IPhone6P").val("");
          }

          if ($("#ddl_LG_G3_16GB  option:selected").val() == "14") {
          $("#txtComments_LG_G3_16GB").show();
          $("#txtFedEx_LG_G3_16GB").show();
          $("#txtDeliveryDate_LG_G3_16GB").parent().show();
          $("#txtDeliveryDate_LG_G3_16GB").show();
          if(!flagQ){ addDatepicker($("#txtDeliveryDate_LG_G3_16GB")); flagQ=true;}
          }
          else if ($("#ddl_LG_G3_16GB  option:selected").val() == "5" || $("#ddl_LG_G3_16GB  option:selected").val() == "6") {
          $("#txtComments_LG_G3_16GB").show();
          $("#txtFedEx_LG_G3_16GB").hide();
          $("#txtFedEx_LG_G3_16GB").val("");
          $("#txtDeliveryDate_LG_G3_16GB").hide();
          $("#txtDeliveryDate_LG_G3_16GB").parent().hide();
          $("#txtDeliveryDate_LG_G3_16GB").val("");
          }
          else
          {
          $("#txtFedEx_LG_G3_16GB").hide();
          $("#txtFedEx_LG_G3_16GB").val("");
          $("#txtComments_LG_G3_16GB").hide();
          $("#txtComments_LG_G3_16GB").val("");
          $("#txtDeliveryDate_LG_G3_16GB").hide();
          $("#txtDeliveryDate_LG_G3_16GB").parent().hide();
          $("#txtDeliveryDate_LG_G3_16GB").val("");
          }

          if ($("#ddl_Samsung_S6_32GB  option:selected").val() == "14") {
          $("#txtComments_Samsung_S6_32GB").show();
          $("#txtFedEx_Samsung_S6_32GB").show();
          $("#txtDeliveryDate_Samsung_S6_32GB").parent().show();
          $("#txtDeliveryDate_Samsung_S6_32GB").show();
          if(!flagQ){ addDatepicker($("#txtDeliveryDate_Samsung_S6_32GB")); flagQ=true;}
          }
          else if ($("#ddl_Samsung_S6_32GB  option:selected").val() == "5" || $("#ddl_Samsung_S6_32GB  option:selected").val() == "6") {
          $("#txtComments_Samsung_S6_32GB").show();
          $("#txtFedEx_Samsung_S6_32GB").hide();
          $("#txtFedEx_Samsung_S6_32GB").val("");
          $("#txtDeliveryDate_Samsung_S6_32GB").hide();
          $("#txtDeliveryDate_Samsung_S6_32GB").parent().hide();
          $("#txtDeliveryDate_Samsung_S6_32GB").val("");
          }
          else
          {
          $("#txtFedEx_Samsung_S6_32GB").hide();
          $("#txtFedEx_Samsung_S6_32GB").val("");
          $("#txtComments_Samsung_S6_32GB").hide();
          $("#txtComments_Samsung_S6_32GB").val("");
          $("#txtDeliveryDate_Samsung_S6_32GB").hide();
          $("#txtDeliveryDate_Samsung_S6_32GB").parent().hide();
          $("#txtDeliveryDate_Samsung_S6_32GB").val("");
          }

          if ($("#ddl_Samsung_S6_64GB  option:selected").val() == "14") {
          $("#txtComments_Samsung_S6_64GB").show();
          $("#txtFedEx_Samsung_S6_64GB").show();
          $("#txtDeliveryDate_Samsung_S6_64GB").parent().show();
          $("#txtDeliveryDate_Samsung_S6_64GB").show();
          if(!flagQ){ addDatepicker($("#txtDeliveryDate_Samsung_S6_64GB")); flagQ=true;}
          }
          else if ($("#ddl_Samsung_S6_64GB  option:selected").val() == "5" || $("#ddl_Samsung_S6_64GB  option:selected").val() == "6") {
          $("#txtComments_Samsung_S6_64GB").show();
          $("#txtFedEx_Samsung_S6_64GB").hide();
          $("#txtFedEx_Samsung_S6_64GB").val("");
          $("#txtDeliveryDate_Samsung_S6_64GB").hide();
          $("#txtDeliveryDate_Samsung_S6_64GB").parent().hide();
          $("#txtDeliveryDate_Samsung_S6_64GB").val("");
          }
          else
          {
          $("#txtFedEx_Samsung_S6_64GB").hide();
          $("#txtFedEx_Samsung_S6_64GB").val("");
          $("#txtComments_Samsung_S6_64GB").hide();
          $("#txtComments_Samsung_S6_64GB").val("");
          $("#txtDeliveryDate_Samsung_S6_64GB").hide();
          $("#txtDeliveryDate_Samsung_S6_64GB").parent().hide();
          $("#txtDeliveryDate_Samsung_S6_64GB").val("");
          }

          if ($("#ddl_Samsung_S6_128GB  option:selected").val() == "14") {
          $("#txtComments_Samsung_S6_128GB").show();
          $("#txtFedEx_Samsung_S6_128GB").show();
          $("#txtDeliveryDate_Samsung_S6_128GB").parent().show();
          $("#txtDeliveryDate_Samsung_S6_128GB").show();
          if(!flagQ){ addDatepicker($("#txtDeliveryDate_Samsung_S6_128GB")); flagQ=true;}
          }
          else if ($("#ddl_Samsung_S6_128GB  option:selected").val() == "5" || $("#ddl_Samsung_S6_128GB  option:selected").val() == "6") {
          $("#txtComments_Samsung_S6_128GB").show();
          $("#txtFedEx_Samsung_S6_128GB").hide();
          $("#txtFedEx_Samsung_S6_128GB").val("");
          $("#txtDeliveryDate_Samsung_S6_128GB").hide();
          $("#txtDeliveryDate_Samsung_S6_128GB").parent().hide();
          $("#txtDeliveryDate_Samsung_S6_128GB").val("");
          }
          else
          {
          $("#txtFedEx_Samsung_S6_128GB").hide();
          $("#txtFedEx_Samsung_S6_128GB").val("");
          $("#txtComments_Samsung_S6_128GB").hide();
          $("#txtComments_Samsung_S6_128GB").val("");
          $("#txtDeliveryDate_Samsung_S6_128GB").hide();
          $("#txtDeliveryDate_Samsung_S6_128GB").parent().hide();
          $("#txtDeliveryDate_Samsung_S6_128GB").val("");
          }

          if ($("#ddl_Samsung_S6edge_32GB  option:selected").val() == "14") {
          $("#txtComments_Samsung_S6edge_32GB").show();
          $("#txtFedEx_Samsung_S6edge_32GB").show();
          $("#txtDeliveryDate_Samsung_S6edge_32GB").parent().show();
          $("#txtDeliveryDate_Samsung_S6edge_32GB").show();
          if(!flagQ){ addDatepicker($("#txtDeliveryDate_Samsung_S6edge_32GB")); flagQ=true;}
          }
          else if ($("#ddl_Samsung_S6edge_32GB  option:selected").val() == "5" || $("#ddl_Samsung_S6edge_32GB  option:selected").val() == "6") {
          $("#txtComments_Samsung_S6edge_32GB").show();
          $("#txtFedEx_Samsung_S6edge_32GB").hide();
          $("#txtFedEx_Samsung_S6edge_32GB").val("");
          $("#txtDeliveryDate_Samsung_S6edge_32GB").hide();
          $("#txtDeliveryDate_Samsung_S6edge_32GB").parent().hide();
          $("#txtDeliveryDate_Samsung_S6edge_32GB").val("");
          }
          else
          {
          $("#txtFedEx_Samsung_S6edge_32GB").hide();
          $("#txtFedEx_Samsung_S6edge_32GB").val("");
          $("#txtComments_Samsung_S6edge_32GB").hide();
          $("#txtComments_Samsung_S6edge_32GB").val("");
          $("#txtDeliveryDate_Samsung_S6edge_32GB").hide();
          $("#txtDeliveryDate_Samsung_S6edge_32GB").parent().hide();
          $("#txtDeliveryDate_Samsung_S6edge_32GB").val("");
          }

          if ($("#ddl_Samsung_S6edge_64GB  option:selected").val() == "14") {
          $("#txtComments_Samsung_S6edge_64GB").show();
          $("#txtFedEx_Samsung_S6edge_64GB").show();
          $("#txtDeliveryDate_Samsung_S6edge_64GB").parent().show();
          $("#txtDeliveryDate_Samsung_S6edge_64GB").show();
          if(!flagQ){ addDatepicker($("#txtDeliveryDate_Samsung_S6edge_64GB")); flagQ=true;}
          }
          else if ($("#ddl_Samsung_S6edge_64GB  option:selected").val() == "5" || $("#ddl_Samsung_S6edge_64GB  option:selected").val() == "6") {
          $("#txtComments_Samsung_S6edge_64GB").show();
          $("#txtFedEx_Samsung_S6edge_64GB").hide();
          $("#txtFedEx_Samsung_S6edge_64GB").val("");
          $("#txtDeliveryDate_Samsung_S6edge_64GB").hide();
          $("#txtDeliveryDate_Samsung_S6edge_64GB").parent().hide();
          $("#txtDeliveryDate_Samsung_S6edge_64GB").val("");
          }
          else
          {
          $("#txtFedEx_Samsung_S6edge_64GB").hide();
          $("#txtFedEx_Samsung_S6edge_64GB").val("");
          $("#txtComments_Samsung_S6edge_64GB").hide();
          $("#txtComments_Samsung_S6edge_64GB").val("");
          $("#txtDeliveryDate_Samsung_S6edge_64GB").hide();
          $("#txtDeliveryDate_Samsung_S6edge_64GB").parent().hide();
          $("#txtDeliveryDate_Samsung_S6edge_64GB").val("");
          }

          if ($("#ddl_Samsung_S6edge_128GB  option:selected").val() == "14") {
          $("#txtComments_Samsung_S6edge_128GB").show();
          $("#txtFedEx_Samsung_S6edge_128GB").show();
          $("#txtDeliveryDate_Samsung_S6edge_128GB").parent().show();
          $("#txtDeliveryDate_Samsung_S6edge_128GB").show();
          if(!flagQ){ addDatepicker($("#txtDeliveryDate_Samsung_S6edge_128GB")); flagQ=true;}
          }
          else if ($("#ddl_Samsung_S6edge_128GB  option:selected").val() == "5" || $("#ddl_Samsung_S6edge_128GB  option:selected").val() == "6") {
          $("#txtComments_Samsung_S6edge_128GB").show();
          $("#txtFedEx_Samsung_S6edge_128GB").hide();
          $("#txtFedEx_Samsung_S6edge_128GB").val("");
          $("#txtDeliveryDate_Samsung_S6edge_128GB").hide();
          $("#txtDeliveryDate_Samsung_S6edge_128GB").parent().hide();
          $("#txtDeliveryDate_Samsung_S6edge_128GB").val("");
          }
          else
          {
          $("#txtFedEx_Samsung_S6edge_128GB").hide();
          $("#txtFedEx_Samsung_S6edge_128GB").val("");
          $("#txtComments_Samsung_S6edge_128GB").hide();
          $("#txtComments_Samsung_S6edge_128GB").val("");
          $("#txtDeliveryDate_Samsung_S6edge_128GB").hide();
          $("#txtDeliveryDate_Samsung_S6edge_128GB").parent().hide();
          $("#txtDeliveryDate_Samsung_S6edge_128GB").val("");
          }

          }

        </script>
			</head>
			<body>

				<div id="personalDiv" class="drill-down_details pd_nss" style="overflow-y:scroll;">
					<table width="95%">
						<tr>
							<div class="header_dd" style="height:41px; width:850px;">
								<p>
									Candidate details view
								</p>
							</div>
							<xsl:for-each select="CandidateTask">


								<div class="name_dd">
									<p id="back_dd" onclick="Refreshdata();">
										&lt;&lt; back to summary page
									</p>
									<img src="../../Images/person.png" alt="PersonIcon" />
									<span>
										<xsl:value-of select="CandidateFName" />

										(<xsl:value-of select="CandidateId" />)
										<input type="hidden" id="hdnCandidateid"  >
											<xsl:attribute name="value">
												<xsl:value-of select="CandidateId" />
											</xsl:attribute>
										</input>

										<input type="hidden" id="hdnCountryId"  >
											<xsl:attribute name="value">
												<xsl:value-of select="CountryID" />
											</xsl:attribute>
										</input>



									</span>
								</div>
								<!--312539-->
								<div class="personal_details_dd scroll-div "  style="height:330px">
									<div class="pdhead">
										<p>
											Personal details
										</p>
									</div>

									<xsl:variable name="countryid" xml:space="preserve">
                                        <xsl:value-of select="CountryID"/>
                                      </xsl:variable>
									<xsl:variable name="CEFlag" xml:space="preserve">
                                        <xsl:value-of select="CEFlag"/>
                                      </xsl:variable>
									<xsl:variable name="manilaflag" xml:space="preserve">
                                        <xsl:value-of select="NSSChosenLocation"/>
                                      </xsl:variable>
									<xsl:variable name="manilacountryid" xml:space="preserve">
                                        <xsl:value-of select="ManilaCountryId"/>
                                      </xsl:variable>
									<div class="pd_details"  style="height:600px">
										<ul class="pdlist">
											<li class="boldtext">E-mail:</li>
											<li>
												<xsl:value-of select="CandidateEmailId" />
											</li>
											<li class="boldtext">Contact No:</li>
											<li>
												<xsl:value-of select="CandidateMobileNo" />
											</li>


											<xsl:choose>
												<xsl:when test="($CEFlag)=1">
													<li  class="boldtext">Address:</li>
													<li>
														<xsl:value-of select="CandidateAddress"/>
													</li>
												</xsl:when>
												<xsl:when test="CountryID=104">
													<li  class="boldtext">Address:</li>
													<li style="overflow-y:scroll;">
														<xsl:value-of select="CandidateAddress" />
													</li>
												</xsl:when>
												<xsl:otherwise>
													<li  class="boldtext" style="height:70px">Address:</li>
													<li style="height:70px">
														<xsl:value-of select="CandidateAddress" />
													</li>
												</xsl:otherwise>
											</xsl:choose>


											<li class="boldtext">Level of Hire:</li>
											<li>
												<xsl:value-of select="LevelOfHire" />
											</li>

											<li class="boldtext">Hiring Department:</li>
											<li>
												<xsl:value-of select="DepartmentName" />
											</li>
											<li class="boldtext">Recruiter Id</li>
											<li>
												<xsl:value-of select="RecruiterName" />
											</li>
											<xsl:if test="($countryid)!=($manilacountryid)">
												<xsl:choose>
													<xsl:when test="CountryID=104">
														<li class="boldtext">Shipping Address:</li>
														<li>
															<xsl:value-of select="ShippingAddress" />
														</li>
													</xsl:when>
													<xsl:otherwise>
														<li class="boldtext" style="height:100px">Shipping Address:</li>
														<li style="height:100px">
															<xsl:value-of select="ShippingAddress" />
														</li>
													</xsl:otherwise>
												</xsl:choose>

											</xsl:if>

											<li class="boldtext">Associate Id:</li>
											<li>
												<xsl:value-of select="AssociateID" />
											</li>
											<xsl:if test="CountryID=104">
												<xsl:if test="ArrayOfAssetStatusDC/AssetStatusDC/IrelandCommentsFlag=1">
													<li class="boldtext">HM Approver Justification:</li>
													<li></li>
													<li class="boldtext">
														Laptop Justification:
													</li>
													<li style="overflow-y:scroll;">
														<xsl:value-of select="ArrayOfAssetStatusDC/AssetStatusDC/LTCommentsLog" />
													</li>
													<li class="boldtext">
														BlackBerry Justification:
													</li>
													<li style="overflow-y:scroll;">
														<xsl:value-of select="ArrayOfAssetStatusDC/AssetStatusDC/BBCommentsLog" />
													</li>
													<li class="boldtext">
														Cellphone Justification:
													</li>
													<li style="overflow-y:scroll;">
														<xsl:value-of select="ArrayOfAssetStatusDC/AssetStatusDC/CPCommentsLog" />
													</li>
												</xsl:if>
												<xsl:if test="ArrayOfAssetStatusDC/AssetStatusDC/IrelandCommentsFlag=2">
													<li class="boldtext">HM Approver Justification:</li>
													<li></li>
													<li class="boldtext" style="padding-left:10px;">
														Laptop Justification:
													</li>
													<li style="overflow-y:scroll;">
														<xsl:value-of select="ArrayOfAssetStatusDC/AssetStatusDC/LTCommentsLog" />
													</li>
													<li class="boldtext">
														Cellphone Justification:
													</li>
													<li style="overflow-y:scroll;">
														<xsl:value-of select="ArrayOfAssetStatusDC/AssetStatusDC/CPCommentsLog" />
													</li>
													<li class="boldtext">BU Approver Justification:</li>
													<li></li>
													<li class="boldtext">
														BlackBerry Justification:
													</li>
													<li style="overflow-y:scroll;">
														<xsl:value-of select="ArrayOfAssetStatusDC/AssetStatusDC/BBCommentsLog" />
													</li>

												</xsl:if>
												<xsl:if test="ArrayOfAssetStatusDC/AssetStatusDC/IrelandCommentsFlag=3">
													<li class="boldtext">BU Approver Justification:</li>
													<li></li>
													<li class="boldtext">
														Laptop Justification:
													</li>
													<li style="overflow-y:scroll;">
														<xsl:value-of select="ArrayOfAssetStatusDC/AssetStatusDC/LTCommentsLog" />
													</li>
													<li class="boldtext">
														Cellphone Justification:
													</li>
													<li style="overflow-y:scroll;">
														<xsl:value-of select="ArrayOfAssetStatusDC/AssetStatusDC/CPCommentsLog" />
													</li>
												</xsl:if>
											</xsl:if>
											<xsl:if test="CountryID!=4">
												<xsl:if test="CountryID!=104">
													<li class="boldtext">LapTop ApproverDetails:</li>
													<li>
														<xsl:value-of select="LapTopApproverDetails" />
													</li>
													<li class="boldtext"> Blackberry ApproverDetails:</li>
													<li>
														<xsl:value-of select="BlacberryApproverDetails" />
													</li>
													</xsl:if>
													<xsl:if test="((CountryID=1) or (CountryID=2))">
														<li class="boldtext"> Smartphone ApproverDetails:</li>
														<li>
															<xsl:value-of select="SmartphoneApproverDetails" />
														</li>
													</xsl:if>													
													<xsl:if test="($countryid)!=($manilacountryid)">
														<li class="boldtext"> Cellphone ApproverDetails:</li>
														<li>
															<xsl:value-of select="CellPhoneApproverDetails" />
														</li>
														<xsl:if test="($CEFlag)=1">
															<li class="boldtext"> DataCard ApproverDetails:</li>
															<li>
																<xsl:value-of select="DataCardApproverDetails" />
															</li>
														</xsl:if>
													<xsl:if test="((CountryID=1) or (CountryID=2))">
														<li class="boldtext"> ContractorEquipment ApproverDetails:</li>
														<li>
															<xsl:value-of select="ContractorEquipmentApproverDetails" />
														</li>
													</xsl:if>
												</xsl:if>
											</xsl:if>

											<xsl:variable name="ShowUpdateDiv" xml:space="preserve">
                                        <xsl:value-of select="ShowUpdateDiv"/>
                                      </xsl:variable>
											<xsl:if test="($ShowUpdateDiv)!=1">
												<!--<xsl:if test="CandidateDOJ !='null'">
                          <li class="boldtext last_li">Joining Date:</li>
                          <li class="last_li">
                            <xsl:value-of select="CandidateDOJ" />
                          </li>
                        </xsl:if>-->
											</xsl:if>
										</ul>
									</div>

								</div>
							</xsl:for-each>

							<div class="new_hire_dd " style="height:310px;width:40%">
								<div class="pdhead">
									<p>
										New Hire  tasks
									</p>
								</div>

								<div class="pd_details" style="height:280px">

									<ul class="new_hire_list">
										<xsl:for-each select="CandidateTask/ArrayOfTaskDetail/TaskDetail">
											<xsl:variable name="TaskID">
												<xsl:value-of select="TaskId"/>
											</xsl:variable>
											<xsl:variable name="Url">
												<xsl:value-of select="RelativeUrl"/>
											</xsl:variable>
											<li class="boldtext task">
												<xsl:element name="img">
													<xsl:attribute name="src">
														<xsl:value-of select="StatusImage" />
													</xsl:attribute>
												</xsl:element>

												<xsl:if test="Status &gt; '0'">
													<p style="cursor:pointer" onclick="OpenPop('{$Url}','{$TaskID}',document.getElementById('hdnCandidateid'),document.getElementById('hdnCountryId'));">
														<xsl:value-of select="Title" />
													</p>
												</xsl:if>
												<xsl:if  test="Status &lt;='0'">
													<p>
														<xsl:value-of select="Title" />
													</p>
												</xsl:if>
											</li>
										</xsl:for-each>
									</ul>

									<div id="paginationTask">

									</div>
								</div>


							</div>

						</tr>
					</table>

					<div class="footer_dd">
						<xsl:variable name="countryid" xml:space="preserve">
                                        <xsl:value-of select="CountryID"/>
                                      </xsl:variable>
						<xsl:variable name="CEFlag" xml:space="preserve">
                                        <xsl:value-of select="CandidateTask/CEFlag"/>
                                      </xsl:variable>
						<xsl:variable name="manilaflag" xml:space="preserve">
                                        <xsl:value-of select="NSSChosenLocation"/>
                                      </xsl:variable>
						<xsl:variable name="manilacountryid" xml:space="preserve">
                                        <xsl:value-of select="ManilaCountryId"/>
                                      </xsl:variable>
						<xsl:variable name="enableEdit" xml:space="preserve">
                                        <xsl:value-of select="EnableEdit"/>
                                      </xsl:variable>
						<xsl:variable name="roleDetailId" xml:space="preserve">
                                        <xsl:value-of select="RoleDetailId"/>
                                      </xsl:variable>

						<!--Checking allow update access-->

						<xsl:choose>
							<xsl:when test="CandidateTask/CountryID=1 or CandidateTask/CountryID=2">
								<xsl:if test="CandidateTask/RoleDetailId='R_ID_0110'">
									<xsl:if test="CandidateTask/EnableEdit=-1">
										<!--disabled="disabled-->
										<div class="border-dd">
											<table disabled="disabled" class="assetTbl" border="0" cellspacing="0" cellpadding="0">
												<tbody>
													<tr>
														<td colspan="5">
															<label style="width:105px;display:block;float:left;">
																<b>Equipment</b>
															</label>
															<label style="width:190px;display:block;float:left;">
																<b>Status</b>
															</label>
															<label id="commentsLbl" style="width:90px;float:left; margin-left:65px;">
																<b>Comments</b>
															</label>
															<label id="fedexLbl" style="width:90px;float:left; margin-left:65px;">
																<b>FedEx</b>
															</label>
															<label id="dateLbl" style="width:90px;float:left; margin-left:50px;">
																<b>Delivery Date</b>
															</label>
														</td>
													</tr>
													<xsl:if test="CandidateTask/ArrayOfCandAssetStatusDC/CandAssetStatusDC">

														<xsl:for-each select="CandidateTask/ArrayOfCandAssetStatusDC/CandAssetStatusDC">
															<tr>
																<td colspan="5" class="assetRow">
																	<label style="width:125px;padding-top:10px;">
																		<xsl:value-of select="AssetType" />
																	</label>

																	<xsl:variable name="AssetStatusCode" select="AssetStatusCode"/>
																	<xsl:variable name="ddlname" select="concat('ddl', '_', AssetType)"/>
																	<xsl:variable name="lblcommentsname" select="concat('lblComments', '_', AssetType)"/>
																	<xsl:variable name="txtcommentsname" select="concat('txtComments', '_', AssetType)"/>
																	<xsl:variable name="lblFedexname" select="concat('lblFedEx', '_', AssetType)"/>
																	<xsl:variable name="txtFedexname" select="concat('txtFedEx', '_', AssetType)"/>
																	<xsl:variable name="lblDelDatename" select="concat('lblDeliveryDate', '_', AssetType)"/>
																	<xsl:variable name="txtDelDatename" select="concat('txtDeliveryDate', '_', AssetType)"/>
																	<xsl:variable name="hdnTrackingIDname" select="concat('hdnTrackingID', '_', AssetType)"/>
																	<!--ddlname:<xsl:text/><xsl:value-of select="$ddlname" />-->
																	<input type="hidden" id="{$hdnTrackingIDname}"  >
																		<xsl:attribute name="value">
																			<xsl:value-of select="AssetTrackingID" />
																		</xsl:attribute>
																	</input>
																	<select name="status" class="tbinfo1" style="width:230px;height:25px; font-size:11px;"  id="{$ddlname}" onchange="onSelection()">
																		<xsl:for-each select="/CandidateTask/ArrayOfAssetStatusDC/AssetStatusDC">
																			<xsl:choose>
																				<xsl:when test="($AssetStatusCode)=AssetStatusCode">
																					<option>
																						<xsl:attribute name="value">
																							<xsl:value-of select="AssetStatusCode" />
																						</xsl:attribute>
																						<xsl:attribute name="selected">
																							selected
																						</xsl:attribute>
																						<xsl:value-of select="AssetStatusDesc"  />
																					</option>
																				</xsl:when>
																				<xsl:otherwise>
																					<option>
																						<xsl:attribute name="value">
																							<xsl:value-of select="AssetStatusCode"/>
																						</xsl:attribute>
																						<xsl:value-of select="AssetStatusDesc" />
																					</option>
																				</xsl:otherwise>
																			</xsl:choose>
																		</xsl:for-each>
																	</select>
																	<input type="text" id="{$txtcommentsname}" class="tbinfo1" style="width:130px" maxlength="250">
																		<xsl:attribute name="value">
																			<xsl:value-of select="Comments" />
																		</xsl:attribute>
																	</input>
																	<xsl:choose>
																		<xsl:when test="($countryid)=($manilacountryid)">
																			<input type="text" id="{$txtFedexname}" class="tbinfo1"  style="width:120px" maxlength="250">
																				<xsl:attribute name="value">
																					<xsl:value-of select="FedEx" />
																				</xsl:attribute>
																			</input>
																		</xsl:when>
																		<xsl:when test="($CEFlag)=1">
																			<input type="text" id="{$txtFedexname}" class="tbinfo1"  style="width:120px" maxlength="250">
																				<xsl:attribute name="value">
																					<xsl:value-of select="FedEx" />
																				</xsl:attribute>
																			</input>
																		</xsl:when>
																		<xsl:otherwise>
																			<input type="text" id="{$txtFedexname}" class="tbinfo1"  style="width:120px" maxlength="250">
																				<xsl:attribute name="value">
																					<xsl:value-of select="FedEx" />
																				</xsl:attribute>
																			</input>
																		</xsl:otherwise>
																	</xsl:choose>
																	<div>
																		<input type="text"  class="tb_rc1 dateFld" id="{$txtDelDatename}" readOnly="readOnly" style="width:100px;margin-right:5px;">
																			<xsl:attribute name="value">
																				<xsl:value-of select="DeliveryDate" />
																			</xsl:attribute>
																		</input>
																	</div>
																</td>
															</tr>
														</xsl:for-each>
													</xsl:if>


													<!--<tr>
                               <td colspan="5">
                                 <xsl:for-each select="CandidateTask">
                                   <img src="../../Images/updatebtn.png" title="Update" onclick="UpdateCandidateInfo(document.getElementById('hdnTrackingID_Laptop'),document.getElementById('hdnTrackingID_CellPhone'),document.getElementById('hdnTrackingID_Blackberry'),document.getElementById('hdnTrackingID_ClientEquipment'),document.getElementById('ddl_Laptop'),document.getElementById('ddl_CellPhone'),document.getElementById('ddl_Blackberry'),document.getElementById('ddl_ClientEquipment'),document.getElementById('txtComments_Laptop'),document.getElementById('txtComments_CellPhone'),document.getElementById('txtComments_Blackberry'),document.getElementById('txtComments_ClientEquipment'),document.getElementById('txtFedEx_Laptop'),document.getElementById('txtFedEx_CellPhone'),document.getElementById('txtFedEx_Blackberry'),document.getElementById('txtFedEx_ClientEquipment'),document.getElementById('txtDeliveryDate_Laptop'),document.getElementById('txtDeliveryDate_CellPhone'),document.getElementById('txtDeliveryDate_Blackberry'),document.getElementById('txtDeliveryDate_ClientEquipment'),document.getElementById('msg'));" id="update_dd" alt="UpdateButton" />
                                   <div id="msg" style="float:left;text-align:center;padding-top:10px;width:40%;color:green;font-weight:bold;display:none">Updated Successfully</div>
                                 </xsl:for-each>
                               </td>
                             </tr>-->



												</tbody>
											</table>
										</div>
									</xsl:if>
									<xsl:if test="CandidateTask/EnableEdit=1">
										<div class="border-dd">
											<table  class="assetTbl" border="0" cellspacing="0" cellpadding="0">
												<tbody>
													<tr>
														<td colspan="5">
															<label style="width:105px;display:block;float:left;">
																<b>Equipment</b>
															</label>
															<label style="width:190px;display:block;float:left;">
																<b>Status</b>
															</label>
															<label id="commentsLbl" style="width:90px;float:left; margin-left:65px;">
																<b>Comments</b>
															</label>
															<label id="fedexLbl" style="width:90px;float:left; margin-left:65px;">
																<b>FedEx</b>
															</label>
															<label id="dateLbl" style="width:90px;float:left; margin-left:50px;">
																<b>Delivery Date</b>
															</label>
														</td>
													</tr>
													<xsl:if test="CandidateTask/ArrayOfCandAssetStatusDC/CandAssetStatusDC">

														<xsl:for-each select="CandidateTask/ArrayOfCandAssetStatusDC/CandAssetStatusDC">
															<tr>
																<td colspan="5" class="assetRow">
																	<label style="width:85px;padding-top:10px;">
																		<xsl:value-of select="AssetType" />
																	</label>

																	<xsl:variable name="AssetStatusCode" select="AssetStatusCode"/>
																	<xsl:variable name="ddlname" select="concat('ddl', '_', AssetType)"/>
																	<xsl:variable name="lblcommentsname" select="concat('lblComments', '_', AssetType)"/>
																	<xsl:variable name="txtcommentsname" select="concat('txtComments', '_', AssetType)"/>
																	<xsl:variable name="lblFedexname" select="concat('lblFedEx', '_', AssetType)"/>
																	<xsl:variable name="txtFedexname" select="concat('txtFedEx', '_', AssetType)"/>
																	<xsl:variable name="lblDelDatename" select="concat('lblDeliveryDate', '_', AssetType)"/>
																	<xsl:variable name="txtDelDatename" select="concat('txtDeliveryDate', '_', AssetType)"/>
																	<xsl:variable name="hdnTrackingIDname" select="concat('hdnTrackingID', '_', AssetType)"/>
																	<!--ddlname:<xsl:text/><xsl:value-of select="$ddlname" />-->
																	<input type="hidden" id="{$hdnTrackingIDname}"  >
																		<xsl:attribute name="value">
																			<xsl:value-of select="AssetTrackingID" />
																		</xsl:attribute>
																	</input>
																	<select name="status" class="tbinfo1" style="width:230px;height:25px; font-size:11px;"  id="{$ddlname}" onchange="onSelection()">
																		<xsl:for-each select="/CandidateTask/ArrayOfAssetStatusDC/AssetStatusDC">
																			<xsl:choose>
																				<xsl:when test="($AssetStatusCode)=AssetStatusCode">
																					<option>
																						<xsl:attribute name="value">
																							<xsl:value-of select="AssetStatusCode" />
																						</xsl:attribute>
																						<xsl:attribute name="selected">
																							selected
																						</xsl:attribute>
																						<xsl:value-of select="AssetStatusDesc"  />
																					</option>
																				</xsl:when>
																				<xsl:otherwise>
																					<option>
																						<xsl:attribute name="value">
																							<xsl:value-of select="AssetStatusCode"/>
																						</xsl:attribute>
																						<xsl:value-of select="AssetStatusDesc" />
																					</option>
																				</xsl:otherwise>
																			</xsl:choose>
																		</xsl:for-each>
																	</select>
																	<input type="text" id="{$txtcommentsname}" class="tbinfo1" style="width:130px" maxlength="250">
																		<xsl:attribute name="value">
																			<xsl:value-of select="Comments" />
																		</xsl:attribute>
																	</input>
																	<xsl:choose>
																		<xsl:when test="($countryid)=($manilacountryid)">
																			<input type="text" id="{$txtFedexname}" class="tbinfo1"  style="width:120px" maxlength="250">
																				<xsl:attribute name="value">
																					<xsl:value-of select="FedEx" />
																				</xsl:attribute>
																			</input>
																		</xsl:when>
																		<xsl:when test="($CEFlag)=1">
																			<input type="text" id="{$txtFedexname}" class="tbinfo1"  style="width:120px" maxlength="250">
																				<xsl:attribute name="value">
																					<xsl:value-of select="FedEx" />
																				</xsl:attribute>
																			</input>
																		</xsl:when>
																		<xsl:otherwise>
																			<input type="text" id="{$txtFedexname}" class="tbinfo1"  style="width:120px" maxlength="250">
																				<xsl:attribute name="value">
																					<xsl:value-of select="FedEx" />
																				</xsl:attribute>
																			</input>
																		</xsl:otherwise>
																	</xsl:choose>
																	<div>
																		<input type="text"  class="tb_rc1 dateFld" id="{$txtDelDatename}" readOnly="readOnly" style="width:100px;margin-right:5px;">
																			<xsl:attribute name="value">
																				<xsl:value-of select="DeliveryDate" />
																			</xsl:attribute>
																		</input>
																	</div>
																</td>
															</tr>
														</xsl:for-each>
													</xsl:if>


													<tr>
														<td colspan="5">
															<xsl:for-each select="CandidateTask">
                                <img src="../../Images/updatebtn.png" title="Update" onclick="UpdateCandidateInfo(document.getElementById('hdnTrackingID_Laptop issued by cognizant'),document.getElementById('hdnTrackingID_AndroidDevice'),document.getElementById('hdnTrackingID_ClientLaptop'),document.getElementById('hdnTrackingID_Laptop'),	document.getElementById('hdnTrackingID_CellPhone'),	document.getElementById('hdnTrackingID_Blackberry'),	document.getElementById('hdnTrackingID_ClientEquipment'),	document.getElementById('hdnTrackingID_DataCard'),	document.getElementById('hdnTrackingID_BlackBerryZ10'),	document.getElementById('hdnTrackingID_Q10'),	document.getElementById('hdnTrackingID_SamsungS3'),	document.getElementById('hdnTrackingID_SamsungS4'),	document.getElementById('hdnTrackingID_SamsungS5'),	document.getElementById('hdnTrackingID_IPhone4S'),	document.getElementById('hdnTrackingID_IPhone5S'),	document.getElementById('hdnTrackingID_IPhone5C'),	document.getElementById('hdnTrackingID_LGG2'),	document.getElementById('hdnTrackingID_SamsungNote3'), document.getElementById('hdnTrackingID_SamsungNote4'), document.getElementById('hdnTrackingID_IPhone6'), document.getElementById('hdnTrackingID_IPhone6P'),document.getElementById('hdnTrackingID_LG_G3_16GB'),document.getElementById('hdnTrackingID_Samsung_S6_32GB'),document.getElementById('hdnTrackingID_Samsung_S6_64GB'),document.getElementById('hdnTrackingID_Samsung_S6_128GB'),document.getElementById('hdnTrackingID_Samsung_S6edge_32GB'),document.getElementById('hdnTrackingID_Samsung_S6edge_64GB'),document.getElementById('hdnTrackingID_Samsung_S6edge_128GB'),document.getElementById('ddl_Laptop issued_by_cognizant'),	document.getElementById('ddl_AndroidDevice'),		document.getElementById('ddl_ClientLaptop'),document.getElementById('ddl_Laptop'),	document.getElementById('ddl_CellPhone'),	document.getElementById('ddl_Blackberry'),	document.getElementById('ddl_ClientEquipment'),	document.getElementById('ddl_DataCard'),	document.getElementById('ddl_BlackBerryZ10'),	document.getElementById('ddl_Q10'),	document.getElementById('ddl_SamsungS3'),	document.getElementById('ddl_SamsungS4'),	document.getElementById('ddl_SamsungS5'),	document.getElementById('ddl_IPhone4S'),	document.getElementById('ddl_IPhone5S'),	document.getElementById('ddl_IPhone5C'),	document.getElementById('ddl_LGG2'),	document.getElementById('ddl_SamsungNote3'), document.getElementById('ddl_SamsungNote4'), document.getElementById('ddl_IPhone6'), document.getElementById('ddl_IPhone6P'),document.getElementById('ddl_LG_G3_16GB'),document.getElementById('ddl_Samsung_S6_32GB'),document.getElementById('ddl_Samsung_S6_64GB'),document.getElementById('ddl_Samsung_S6_128GB'),document.getElementById('ddl_Samsung_S6edge_32GB'),document.getElementById('ddl_Samsung_S6edge_64GB'),document.getElementById('ddl_Samsung_S6edge_128GB'),document.getElementById('txtComments_Laptop issued by cognizant'),	document.getElementById('txtComments_AndroidDevice'),document.getElementById('txtComments_ClientLaptop'),	document.getElementById('txtComments_Laptop'),	document.getElementById('txtComments_CellPhone'),	document.getElementById('txtComments_Blackberry'),	document.getElementById('txtComments_ClientEquipment'),	document.getElementById('txtComments_DataCard'),	document.getElementById('txtComments_BlackBerryZ10'),	document.getElementById('txtComments_Q10'),	document.getElementById('txtComments_SamsungS3'),	document.getElementById('txtComments_SamsungS4'),	document.getElementById('txtComments_SamsungS5'),	document.getElementById('txtComments_IPhone4S'),	document.getElementById('txtComments_IPhone5S'),	document.getElementById('txtComments_IPhone5C'),	document.getElementById('txtComments_LGG2'),	document.getElementById('txtComments_SamsungNote3'), document.getElementById('txtComments_SamsungNote4'), document.getElementById('txtComments_IPhone6'), document.getElementById('txtComments_IPhone6P'),document.getElementById('txtComments_LG_G3_16GB'),document.getElementById('txtComments_Samsung_S6_32GB'),document.getElementById('txtComments_Samsung_S6_64GB'),document.getElementById('txtComments_Samsung_S6_128GB'),document.getElementById('txtComments_Samsung_S6edge_32GB'),document.getElementById('txtComments_Samsung_S6edge_64GB'),document.getElementById('txtComments_Samsung_S6edge_128GB'),document.getElementById('txtFedEx_Laptop issued by cognizant'),document.getElementById('txtFedEx_AndroidDevice'),document.getElementById('txtFedEx_ClientLaptop'),	document.getElementById('txtFedEx_Laptop'),	document.getElementById('txtFedEx_CellPhone'),	document.getElementById('txtFedEx_Blackberry'),	document.getElementById('txtFedEx_ClientEquipment'),	document.getElementById('txtFedEx_DataCard'),	document.getElementById('txtFedEx_BlackBerryZ10'),	document.getElementById('txtFedEx_Q10'),	document.getElementById('txtFedEx_SamsungS3'),	document.getElementById('txtFedEx_SamsungS4'),	document.getElementById('txtFedEx_SamsungS5'),	document.getElementById('txtFedEx_IPhone4S'),	document.getElementById('txtFedEx_IPhone5S'),	document.getElementById('txtFedEx_IPhone5C'),	document.getElementById('txtFedEx_LGG2'),	document.getElementById('txtFedEx_SamsungNote3'), document.getElementById('txtFedEx_SamsungNote4'), document.getElementById('txtFedEx_IPhone6'), document.getElementById('txtFedEx_IPhone6P'),document.getElementById('txtFedEx_LG_G3_16GB'),document.getElementById('txtFedEx_Samsung_S6_32GB'),document.getElementById('txtFedEx_Samsung_S6_64GB'),document.getElementById('txtFedEx_Samsung_S6_128GB'),document.getElementById('txtFedEx_Samsung_S6edge_32GB'),document.getElementById('txtFedEx_Samsung_S6edge_64GB'),document.getElementById('txtFedEx_Samsung_S6edge_128GB'),	document.getElementById('txtDeliveryDate_Laptop issued by cognizant'),	document.getElementById('txtDeliveryDate_AndroidDevice'),document.getElementById('txtDeliveryDate_ClientLaptop'),	document.getElementById('txtDeliveryDate_Laptop'),	document.getElementById('txtDeliveryDate_CellPhone'),	document.getElementById('txtDeliveryDate_Blackberry'),	document.getElementById('txtDeliveryDate_ClientEquipment'),	document.getElementById('txtDeliveryDate_DataCard'),	document.getElementById('txtDeliveryDate_BlackBerryZ10'),	document.getElementById('txtDeliveryDate_Q10'),	document.getElementById('txtDeliveryDate_SamsungS3'),	document.getElementById('txtDeliveryDate_SamsungS4'),	document.getElementById('txtDeliveryDate_SamsungS5'),	document.getElementById('txtDeliveryDate_IPhone4S'),	document.getElementById('txtDeliveryDate_IPhone5S'),	document.getElementById('txtDeliveryDate_IPhone5C'),	document.getElementById('txtDeliveryDate_LGG2'),	document.getElementById('txtDeliveryDate_SamsungNote3'), document.getElementById('txtDeliveryDate_SamsungNote4'), document.getElementById('txtDeliveryDate_IPhone6'), document.getElementById('txtDeliveryDate_IPhone6P'),document.getElementById('txtDeliveryDate_LG_G3_16GB'),document.getElementById('txtDeliveryDate_Samsung_S6_32GB'),document.getElementById('txtDeliveryDate_Samsung_S6_64GB'),document.getElementById('txtDeliveryDate_Samsung_S6_128GB'),document.getElementById('txtDeliveryDate_Samsung_S6edge_32GB'),document.getElementById('txtDeliveryDate_Samsung_S6edge_64GB'),document.getElementById('txtDeliveryDate_Samsung_S6edge_128GB'), document.getElementById('msg'));" id="update_dd" alt="UpdateButton" />
                                <div id="msg" style="float:left;text-align:center;padding-top:10px;width:40%;color:green;font-weight:bold;display:none">Updated Successfully</div>		
                              </xsl:for-each>
														</td>
													</tr>

												</tbody>
											</table>
										</div>
									</xsl:if>
								</xsl:if>

								<xsl:if test="CandidateTask/RoleDetailId !='R_ID_0110'">
									<div class="border-dd">
										<table  class="assetTbl" border="0" cellspacing="0" cellpadding="0">
											<tbody>
												<tr>
													<td colspan="5">
														<label style="width:105px;display:block;float:left;">
															<b>Equipment</b>
														</label>
														<label style="width:190px;display:block;float:left;">
															<b>Status</b>
														</label>
														<label id="commentsLbl" style="width:90px;display:block;float:left; margin-left:65px;">
															<b>Comments</b>
														</label>
														<xsl:choose>
															<xsl:when test="CandidateTask/ManilaCountryId!='' and ($countryid)=($manilacountryid)">
																<!--For Manila-->
																<label id="fedexLbl" style="width:90px;display:block;float:left; margin-left:65px;">
																	<b>Serial Number</b>
																</label>
															</xsl:when>
															<xsl:when test="($CEFlag)=1">
																<label id="fedexLbl" style="width:90px;display:block;float:left; margin-left:65px;">
																	<b>Serial Number</b>
																</label>
															</xsl:when>
															<xsl:otherwise>
																<label id="fedexLbl" style="width:90px;display:block;float:left; margin-left:65px;">
																	<b>FedEx</b>
																</label>
															</xsl:otherwise>
														</xsl:choose>

														<label id="dateLbl" style="width:90px;display:block;float:left; margin-left:50px;">
															<b>Delivery Date</b>
														</label>
													</td>
												</tr>
												<xsl:if test="CandidateTask/ArrayOfCandAssetStatusDC/CandAssetStatusDC">

													<xsl:for-each select="CandidateTask/ArrayOfCandAssetStatusDC/CandAssetStatusDC">
														<tr>
															<td colspan="5" class="assetRow">
																<label style="width:85px;padding-top:10px;">
																	<xsl:value-of select="AssetType" />
																</label>

																<xsl:variable name="AssetStatusCode" select="AssetStatusCode"/>
																<xsl:variable name="ddlname" select="concat('ddl', '_', AssetType)"/>
																<xsl:variable name="lblcommentsname" select="concat('lblComments', '_', AssetType)"/>
																<xsl:variable name="txtcommentsname" select="concat('txtComments', '_', AssetType)"/>
																<xsl:variable name="lblFedexname" select="concat('lblFedEx', '_', AssetType)"/>
																<xsl:variable name="txtFedexname" select="concat('txtFedEx', '_', AssetType)"/>
																<xsl:variable name="lblDelDatename" select="concat('lblDeliveryDate', '_', AssetType)"/>
																<xsl:variable name="txtDelDatename" select="concat('txtDeliveryDate', '_', AssetType)"/>
																<xsl:variable name="hdnTrackingIDname" select="concat('hdnTrackingID', '_', AssetType)"/>
																<!--ddlname:<xsl:text/><xsl:value-of select="$ddlname" />-->
																<input type="hidden" id="{$hdnTrackingIDname}"  >
																	<xsl:attribute name="value">
																		<xsl:value-of select="AssetTrackingID" />
																	</xsl:attribute>
																</input>
																<select name="status" class="tbinfo1" style="width:230px;height:25px; font-size:11px;"  id="{$ddlname}" onchange="onSelection()">
																	<xsl:for-each select="/CandidateTask/ArrayOfAssetStatusDC/AssetStatusDC">
																		<xsl:choose>
																			<xsl:when test="($AssetStatusCode)=AssetStatusCode">
																				<option>
																					<xsl:attribute name="value">
																						<xsl:value-of select="AssetStatusCode" />
																					</xsl:attribute>
																					<xsl:attribute name="selected">
																						selected
																					</xsl:attribute>
																					<xsl:value-of select="AssetStatusDesc"  />
																				</option>
																			</xsl:when>
																			<xsl:otherwise>
																				<option>
																					<xsl:attribute name="value">
																						<xsl:value-of select="AssetStatusCode"/>
																					</xsl:attribute>
																					<xsl:value-of select="AssetStatusDesc" />
																				</option>
																			</xsl:otherwise>
																		</xsl:choose>
																	</xsl:for-each>
																</select>
																<input type="text" id="{$txtcommentsname}" class="tbinfo1" style="width:130px" maxlength="250">
																	<xsl:attribute name="value">
																		<xsl:value-of select="Comments" />
																	</xsl:attribute>
																</input>
																<xsl:choose>
																	<xsl:when test="($countryid)=($manilacountryid)">
																		<input type="text" id="{$txtFedexname}" class="tbinfo1"  style="width:120px" maxlength="250">
																			<xsl:attribute name="value">
																				<xsl:value-of select="FedEx" />
																			</xsl:attribute>
																		</input>
																	</xsl:when>
																	<xsl:when test="($CEFlag)=1">
																		<input type="text" id="{$txtFedexname}" class="tbinfo1"  style="width:120px" maxlength="250">
																			<xsl:attribute name="value">
																				<xsl:value-of select="FedEx" />
																			</xsl:attribute>
																		</input>
																	</xsl:when>
																	<xsl:otherwise>
																		<input type="text" id="{$txtFedexname}" class="tbinfo1"  style="width:120px" maxlength="250">
																			<xsl:attribute name="value">
																				<xsl:value-of select="FedEx" />
																			</xsl:attribute>
																		</input>
																	</xsl:otherwise>
																</xsl:choose>
																<div>
																	<input type="text"  class="tb_rc1 dateFld" id="{$txtDelDatename}" readOnly="readOnly" style="width:100px;margin-right:5px;">
																		<xsl:attribute name="value">
																			<xsl:value-of select="DeliveryDate" />
																		</xsl:attribute>
																	</input>
																</div>
															</td>
														</tr>
													</xsl:for-each>
												</xsl:if>


												<tr>
													<td colspan="5">
														<xsl:for-each select="CandidateTask">
                              <img src="../../Images/updatebtn.png" title="Update" onclick="UpdateCandidateInfo(document.getElementById('hdnTrackingID_Laptop issued by cognizant'),document.getElementById('hdnTrackingID_AndroidDevice'),document.getElementById('hdnTrackingID_ClientLaptop'),document.getElementById('hdnTrackingID_Laptop'),	document.getElementById('hdnTrackingID_CellPhone'),	document.getElementById('hdnTrackingID_Blackberry'),	document.getElementById('hdnTrackingID_ClientEquipment'),	document.getElementById('hdnTrackingID_DataCard'),	document.getElementById('hdnTrackingID_BlackBerryZ10'),	document.getElementById('hdnTrackingID_Q10'),	document.getElementById('hdnTrackingID_SamsungS3'),	document.getElementById('hdnTrackingID_SamsungS4'),	document.getElementById('hdnTrackingID_SamsungS5'),	document.getElementById('hdnTrackingID_IPhone4S'),	document.getElementById('hdnTrackingID_IPhone5S'),	document.getElementById('hdnTrackingID_IPhone5C'),	document.getElementById('hdnTrackingID_LGG2'),	document.getElementById('hdnTrackingID_SamsungNote3'), document.getElementById('hdnTrackingID_SamsungNote4'), document.getElementById('hdnTrackingID_IPhone6'), document.getElementById('hdnTrackingID_IPhone6P'),document.getElementById('hdnTrackingID_LG_G3_16GB'),document.getElementById('hdnTrackingID_Samsung_S6_32GB'),document.getElementById('hdnTrackingID_Samsung_S6_64GB'),document.getElementById('hdnTrackingID_Samsung_S6_128GB'),document.getElementById('hdnTrackingID_Samsung_S6edge_32GB'),document.getElementById('hdnTrackingID_Samsung_S6edge_64GB'),document.getElementById('hdnTrackingID_Samsung_S6edge_128GB'),document.getElementById('ddl_Laptop issued by cognizant'),	document.getElementById('ddl_AndroidDevice'),		document.getElementById('ddl_ClientLaptop'),document.getElementById('ddl_Laptop'),	document.getElementById('ddl_CellPhone'),	document.getElementById('ddl_Blackberry'),	document.getElementById('ddl_ClientEquipment'),	document.getElementById('ddl_DataCard'),	document.getElementById('ddl_BlackBerryZ10'),	document.getElementById('ddl_Q10'),	document.getElementById('ddl_SamsungS3'),	document.getElementById('ddl_SamsungS4'),	document.getElementById('ddl_SamsungS5'),	document.getElementById('ddl_IPhone4S'),	document.getElementById('ddl_IPhone5S'),	document.getElementById('ddl_IPhone5C'),	document.getElementById('ddl_LGG2'),	document.getElementById('ddl_SamsungNote3'), document.getElementById('ddl_SamsungNote4'), document.getElementById('ddl_IPhone6'), document.getElementById('ddl_IPhone6P'),document.getElementById('ddl_LG_G3_16GB'),document.getElementById('ddl_Samsung_S6_32GB'),document.getElementById('ddl_Samsung_S6_64GB'),document.getElementById('ddl_Samsung_S6_128GB'),document.getElementById('ddl_Samsung_S6edge_32GB'),document.getElementById('ddl_Samsung_S6edge_64GB'),document.getElementById('ddl_Samsung_S6edge_128GB'),document.getElementById('txtComments_Laptop issued by cognizant'),	document.getElementById('txtComments_AndroidDevice'),document.getElementById('txtComments_ClientLaptop'),	document.getElementById('txtComments_Laptop'),	document.getElementById('txtComments_CellPhone'),	document.getElementById('txtComments_Blackberry'),	document.getElementById('txtComments_ClientEquipment'),	document.getElementById('txtComments_DataCard'),	document.getElementById('txtComments_BlackBerryZ10'),	document.getElementById('txtComments_Q10'),	document.getElementById('txtComments_SamsungS3'),	document.getElementById('txtComments_SamsungS4'),	document.getElementById('txtComments_SamsungS5'),	document.getElementById('txtComments_IPhone4S'),	document.getElementById('txtComments_IPhone5S'),	document.getElementById('txtComments_IPhone5C'),	document.getElementById('txtComments_LGG2'),	document.getElementById('txtComments_SamsungNote3'), document.getElementById('txtComments_SamsungNote4'), document.getElementById('txtComments_IPhone6'), document.getElementById('txtComments_IPhone6P'),document.getElementById('txtComments_LG_G3_16GB'),document.getElementById('txtComments_Samsung_S6_32GB'),document.getElementById('txtComments_Samsung_S6_64GB'),document.getElementById('txtComments_Samsung_S6_128GB'),document.getElementById('txtComments_Samsung_S6edge_32GB'),document.getElementById('txtComments_Samsung_S6edge_64GB'),document.getElementById('txtComments_Samsung_S6edge_128GB'),document.getElementById('txtFedEx_Laptop issued by cognizant'),document.getElementById('txtFedEx_AndroidDevice'),document.getElementById('txtFedEx_ClientLaptop'),	document.getElementById('txtFedEx_Laptop'),	document.getElementById('txtFedEx_CellPhone'),	document.getElementById('txtFedEx_Blackberry'),	document.getElementById('txtFedEx_ClientEquipment'),	document.getElementById('txtFedEx_DataCard'),	document.getElementById('txtFedEx_BlackBerryZ10'),	document.getElementById('txtFedEx_Q10'),	document.getElementById('txtFedEx_SamsungS3'),	document.getElementById('txtFedEx_SamsungS4'),	document.getElementById('txtFedEx_SamsungS5'),	document.getElementById('txtFedEx_IPhone4S'),	document.getElementById('txtFedEx_IPhone5S'),	document.getElementById('txtFedEx_IPhone5C'),	document.getElementById('txtFedEx_LGG2'),	document.getElementById('txtFedEx_SamsungNote3'), document.getElementById('txtFedEx_SamsungNote4'), document.getElementById('txtFedEx_IPhone6'), document.getElementById('txtFedEx_IPhone6P'),document.getElementById('txtFedEx_LG_G3_16GB'),document.getElementById('txtFedEx_Samsung_S6_32GB'),document.getElementById('txtFedEx_Samsung_S6_64GB'),document.getElementById('txtFedEx_Samsung_S6_128GB'),document.getElementById('txtFedEx_Samsung_S6edge_32GB'),document.getElementById('txtFedEx_Samsung_S6edge_64GB'),document.getElementById('txtFedEx_Samsung_S6edge_128GB'),	document.getElementById('txtDeliveryDate_Laptop issued by cognizant'),	document.getElementById('txtDeliveryDate_AndroidDevice'),document.getElementById('txtDeliveryDate_ClientLaptop'),	document.getElementById('txtDeliveryDate_Laptop'),	document.getElementById('txtDeliveryDate_CellPhone'),	document.getElementById('txtDeliveryDate_Blackberry'),	document.getElementById('txtDeliveryDate_ClientEquipment'),	document.getElementById('txtDeliveryDate_DataCard'),	document.getElementById('txtDeliveryDate_BlackBerryZ10'),	document.getElementById('txtDeliveryDate_Q10'),	document.getElementById('txtDeliveryDate_SamsungS3'),	document.getElementById('txtDeliveryDate_SamsungS4'),	document.getElementById('txtDeliveryDate_SamsungS5'),	document.getElementById('txtDeliveryDate_IPhone4S'),	document.getElementById('txtDeliveryDate_IPhone5S'),	document.getElementById('txtDeliveryDate_IPhone5C'),	document.getElementById('txtDeliveryDate_LGG2'),	document.getElementById('txtDeliveryDate_SamsungNote3'), document.getElementById('txtDeliveryDate_SamsungNote4'), document.getElementById('txtDeliveryDate_IPhone6'), document.getElementById('txtDeliveryDate_IPhone6P'),document.getElementById('txtDeliveryDate_LG_G3_16GB'),document.getElementById('txtDeliveryDate_Samsung_S6_32GB'),document.getElementById('txtDeliveryDate_Samsung_S6_64GB'),document.getElementById('txtDeliveryDate_Samsung_S6_128GB'),document.getElementById('txtDeliveryDate_Samsung_S6edge_32GB'),document.getElementById('txtDeliveryDate_Samsung_S6edge_64GB'),document.getElementById('txtDeliveryDate_Samsung_S6edge_128GB'), document.getElementById('msg'));" id="update_dd" alt="UpdateButton" />
                              <div id="msg" style="float:left;text-align:center;padding-top:10px;width:40%;color:green;font-weight:bold;display:none">Updated Successfully</div>
                            </xsl:for-each>
													</td>
												</tr>

											</tbody>
										</table>
									</div>
								</xsl:if>

							</xsl:when>

							<xsl:otherwise>
								<div class="border-dd">

									<table  class="assetTbl" border="0" cellspacing="0" cellpadding="0">
										<tbody>
											<tr>
												<td colspan="5">
													<label style="width:105px;display:block;float:left;">
														<b>Equipment</b>
													</label>
													<label style="width:190px;display:block;float:left;">
														<b>Status</b>
													</label>
													<label id="commentsLbl" style="width:90px;display:block;float:left; margin-left:65px;">
														<b>Comments</b>
													</label>
													<xsl:choose>
														<xsl:when test="($CEFlag)=1">
															<!--For CE Countries-->
															<label id="fedexLbl" style="width:90px;display:block;float:left; margin-left:65px;">
																<b>Serial Number</b>
															</label>
														</xsl:when>
														<xsl:when test="CandidateTask/ManilaCountryId!='' and ($countryid)=($manilacountryid)">
															<!--For Manila-->
															<label id="fedexLbl" style="width:90px;display:block;float:left; margin-left:65px;">
																<b>Serial Number</b>
															</label>
														</xsl:when>

														<xsl:otherwise>
															<label id="fedexLbl" style="width:90px;display:block;float:left; margin-left:65px;">
																<b>FedEx</b>
															</label>
														</xsl:otherwise>
													</xsl:choose>

													<label id="dateLbl" style="width:90px;display:block;float:left; margin-left:50px;">
														<b>Delivery Date</b>
													</label>
												</td>
											</tr>
											<xsl:if test="CandidateTask/ArrayOfCandAssetStatusDC/CandAssetStatusDC">

												<xsl:for-each select="CandidateTask/ArrayOfCandAssetStatusDC/CandAssetStatusDC">
													<tr>
														<td colspan="5" class="assetRow">
															<label style="width:85px;padding-top:10px;">
																<xsl:value-of select="AssetType" />
															</label>

															<xsl:variable name="AssetStatusCode" select="AssetStatusCode"/>
															<xsl:variable name="ddlname" select="concat('ddl', '_', AssetType)"/>
															<xsl:variable name="lblcommentsname" select="concat('lblComments', '_', AssetType)"/>
															<xsl:variable name="txtcommentsname" select="concat('txtComments', '_', AssetType)"/>
															<xsl:variable name="lblFedexname" select="concat('lblFedEx', '_', AssetType)"/>
															<xsl:variable name="txtFedexname" select="concat('txtFedEx', '_', AssetType)"/>
															<xsl:variable name="lblDelDatename" select="concat('lblDeliveryDate', '_', AssetType)"/>
															<xsl:variable name="txtDelDatename" select="concat('txtDeliveryDate', '_', AssetType)"/>
															<xsl:variable name="hdnTrackingIDname" select="concat('hdnTrackingID', '_', AssetType)"/>
															<!--ddlname:<xsl:text/><xsl:value-of select="$ddlname" />-->
															<input type="hidden" id="{$hdnTrackingIDname}"  >
																<xsl:attribute name="value">
																	<xsl:value-of select="AssetTrackingID" />
																</xsl:attribute>
															</input>
															<xsl:choose>
																<xsl:when test="(($AssetStatusCode)=9 or ($AssetStatusCode)=21) and ($CEFlag)=1">
																	<select name="status" class="tbinfo1" style="width:230px;height:25px; font-size:11px;"  id="{$ddlname}" onchange="onSelection()" disabled="true">
																		<xsl:for-each select="/CandidateTask/ArrayOfAssetStatusDC/AssetStatusDC">
																			<xsl:choose>
																				<xsl:when test="($AssetStatusCode)=AssetStatusCode">
																					<option>
																						<xsl:attribute name="value">
																							<xsl:value-of select="AssetStatusCode" />
																						</xsl:attribute>
																						<xsl:attribute name="selected">
																							selected
																						</xsl:attribute>
																						<xsl:value-of select="AssetStatusDesc"  />
																					</option>
																				</xsl:when>
																				<xsl:otherwise>
																					<option>
																						<xsl:attribute name="value">
																							<xsl:value-of select="AssetStatusCode"/>
																						</xsl:attribute>
																						<xsl:value-of select="AssetStatusDesc" />
																					</option>
																				</xsl:otherwise>
																			</xsl:choose>
																		</xsl:for-each>
																	</select>
																</xsl:when>
																<xsl:otherwise>
																	<select name="status" class="tbinfo1" style="width:230px;height:25px; font-size:11px;"  id="{$ddlname}" onchange="onSelection()" >
																		<xsl:for-each select="/CandidateTask/ArrayOfAssetStatusDC/AssetStatusDC">
																			<xsl:choose>
																				<xsl:when test="($AssetStatusCode)=AssetStatusCode">
																					<option>
																						<xsl:attribute name="value">
																							<xsl:value-of select="AssetStatusCode" />
																						</xsl:attribute>
																						<xsl:attribute name="selected">
																							selected
																						</xsl:attribute>
																						<xsl:value-of select="AssetStatusDesc"  />
																					</option>
																				</xsl:when>
																				<xsl:otherwise>
																					<option>
																						<xsl:attribute name="value">
																							<xsl:value-of select="AssetStatusCode"/>
																						</xsl:attribute>
																						<xsl:value-of select="AssetStatusDesc" />
																					</option>
																				</xsl:otherwise>
																			</xsl:choose>
																		</xsl:for-each>
																	</select>

																</xsl:otherwise>
															</xsl:choose>

															<input type="text" id="{$txtcommentsname}" class="tbinfo1" style="width:130px" maxlength="250">
																<xsl:attribute name="value">
																	<xsl:value-of select="Comments" />
																</xsl:attribute>
															</input>
															<xsl:choose>
																<xsl:when test="($CEFlag)=1">
																	<input type="text" id="{$txtFedexname}" class="tbinfo1"  style="width:120px" maxlength="250">
																		<xsl:attribute name="value">
																			<xsl:value-of select="FedEx" />
																		</xsl:attribute>
																	</input>
																</xsl:when>
																<xsl:when test="($countryid)=($manilacountryid)">
																	<input type="text" id="{$txtFedexname}" class="tbinfo1"  style="width:120px" maxlength="250">
																		<xsl:attribute name="value">
																			<xsl:value-of select="FedEx" />
																		</xsl:attribute>
																	</input>
																</xsl:when>
																<xsl:otherwise>
																	<input type="text" id="{$txtFedexname}" class="tbinfo1"  style="width:120px" maxlength="250">
																		<xsl:attribute name="value">
																			<xsl:value-of select="FedEx" />
																		</xsl:attribute>
																	</input>
																</xsl:otherwise>
															</xsl:choose>
															<div>
																<input type="text"  class="tb_rc1 dateFld" id="{$txtDelDatename}" readOnly="readOnly" style="width:100px;margin-right:5px;">
																	<xsl:attribute name="value">
																		<xsl:value-of select="DeliveryDate" />
																	</xsl:attribute>
																</input>
															</div>
														</td>
													</tr>
												</xsl:for-each>
											</xsl:if>


											<tr>
												<td colspan="5">
													<xsl:for-each select="CandidateTask">

                            <img src="../../Images/updatebtn.png" title="Update" onclick="UpdateCandidateInfo(document.getElementById('hdnTrackingID_Laptop issued by cognizant'),document.getElementById('hdnTrackingID_AndroidDevice'),document.getElementById('hdnTrackingID_ClientLaptop'),document.getElementById('hdnTrackingID_Laptop'),	document.getElementById('hdnTrackingID_CellPhone'),	document.getElementById('hdnTrackingID_Blackberry'),	document.getElementById('hdnTrackingID_ClientEquipment'),	document.getElementById('hdnTrackingID_DataCard'),	document.getElementById('hdnTrackingID_BlackBerryZ10'),	document.getElementById('hdnTrackingID_Q10'),	document.getElementById('hdnTrackingID_SamsungS3'),	document.getElementById('hdnTrackingID_SamsungS4'),	document.getElementById('hdnTrackingID_SamsungS5'),	document.getElementById('hdnTrackingID_IPhone4S'),	document.getElementById('hdnTrackingID_IPhone5S'),	document.getElementById('hdnTrackingID_IPhone5C'),	document.getElementById('hdnTrackingID_LGG2'),	document.getElementById('hdnTrackingID_SamsungNote3'), document.getElementById('hdnTrackingID_SamsungNote4'), document.getElementById('hdnTrackingID_IPhone6'), document.getElementById('hdnTrackingID_IPhone6P'),document.getElementById('hdnTrackingID_LG_G3_16GB'),document.getElementById('hdnTrackingID_Samsung_S6_32GB'),document.getElementById('hdnTrackingID_Samsung_S6_64GB'),document.getElementById('hdnTrackingID_Samsung_S6_128GB'),document.getElementById('hdnTrackingID_Samsung_S6edge_32GB'),document.getElementById('hdnTrackingID_Samsung_S6edge_64GB'),document.getElementById('hdnTrackingID_Samsung_S6edge_128GB'),document.getElementById('ddl_Laptop issued by cognizant'),	document.getElementById('ddl_AndroidDevice'),		document.getElementById('ddl_ClientLaptop'),document.getElementById('ddl_Laptop'),	document.getElementById('ddl_CellPhone'),	document.getElementById('ddl_Blackberry'),	document.getElementById('ddl_ClientEquipment'),	document.getElementById('ddl_DataCard'),	document.getElementById('ddl_BlackBerryZ10'),	document.getElementById('ddl_Q10'),	document.getElementById('ddl_SamsungS3'),	document.getElementById('ddl_SamsungS4'),	document.getElementById('ddl_SamsungS5'),	document.getElementById('ddl_IPhone4S'),	document.getElementById('ddl_IPhone5S'),	document.getElementById('ddl_IPhone5C'),	document.getElementById('ddl_LGG2'),	document.getElementById('ddl_SamsungNote3'), document.getElementById('ddl_SamsungNote4'), document.getElementById('ddl_IPhone6'), document.getElementById('ddl_IPhone6P'),document.getElementById('ddl_LG_G3_16GB'),document.getElementById('ddl_Samsung_S6_32GB'),document.getElementById('ddl_Samsung_S6_64GB'),document.getElementById('ddl_Samsung_S6_128GB'),document.getElementById('ddl_Samsung_S6edge_32GB'),document.getElementById('ddl_Samsung_S6edge_64GB'),document.getElementById('ddl_Samsung_S6edge_128GB'),document.getElementById('txtComments_Laptop issued by cognizant'),	document.getElementById('txtComments_AndroidDevice'),document.getElementById('txtComments_ClientLaptop'),	document.getElementById('txtComments_Laptop'),	document.getElementById('txtComments_CellPhone'),	document.getElementById('txtComments_Blackberry'),	document.getElementById('txtComments_ClientEquipment'),	document.getElementById('txtComments_DataCard'),	document.getElementById('txtComments_BlackBerryZ10'),	document.getElementById('txtComments_Q10'),	document.getElementById('txtComments_SamsungS3'),	document.getElementById('txtComments_SamsungS4'),	document.getElementById('txtComments_SamsungS5'),	document.getElementById('txtComments_IPhone4S'),	document.getElementById('txtComments_IPhone5S'),	document.getElementById('txtComments_IPhone5C'),	document.getElementById('txtComments_LGG2'),	document.getElementById('txtComments_SamsungNote3'), document.getElementById('txtComments_SamsungNote4'), document.getElementById('txtComments_IPhone6'), document.getElementById('txtComments_IPhone6P'),document.getElementById('txtComments_LG_G3_16GB'),document.getElementById('txtComments_Samsung_S6_32GB'),document.getElementById('txtComments_Samsung_S6_64GB'),document.getElementById('txtComments_Samsung_S6_128GB'),document.getElementById('txtComments_Samsung_S6edge_32GB'),document.getElementById('txtComments_Samsung_S6edge_64GB'),document.getElementById('txtComments_Samsung_S6edge_128GB'),document.getElementById('txtFedEx_Laptop issued by cognizant'),document.getElementById('txtFedEx_AndroidDevice'),document.getElementById('txtFedEx_ClientLaptop'),	document.getElementById('txtFedEx_Laptop'),	document.getElementById('txtFedEx_CellPhone'),	document.getElementById('txtFedEx_Blackberry'),	document.getElementById('txtFedEx_ClientEquipment'),	document.getElementById('txtFedEx_DataCard'),	document.getElementById('txtFedEx_BlackBerryZ10'),	document.getElementById('txtFedEx_Q10'),	document.getElementById('txtFedEx_SamsungS3'),	document.getElementById('txtFedEx_SamsungS4'),	document.getElementById('txtFedEx_SamsungS5'),	document.getElementById('txtFedEx_IPhone4S'),	document.getElementById('txtFedEx_IPhone5S'),	document.getElementById('txtFedEx_IPhone5C'),	document.getElementById('txtFedEx_LGG2'),	document.getElementById('txtFedEx_SamsungNote3'), document.getElementById('txtFedEx_SamsungNote4'), document.getElementById('txtFedEx_IPhone6'), document.getElementById('txtFedEx_IPhone6P'),document.getElementById('txtFedEx_LG_G3_16GB'),document.getElementById('txtFedEx_Samsung_S6_32GB'),document.getElementById('txtFedEx_Samsung_S6_64GB'),document.getElementById('txtFedEx_Samsung_S6_128GB'),document.getElementById('txtFedEx_Samsung_S6edge_32GB'),document.getElementById('txtFedEx_Samsung_S6edge_64GB'),document.getElementById('txtFedEx_Samsung_S6edge_128GB'),	document.getElementById('txtDeliveryDate_Laptop issued by cognizant'),	document.getElementById('txtDeliveryDate_AndroidDevice'),document.getElementById('txtDeliveryDate_ClientLaptop'),	document.getElementById('txtDeliveryDate_Laptop'),	document.getElementById('txtDeliveryDate_CellPhone'),	document.getElementById('txtDeliveryDate_Blackberry'),	document.getElementById('txtDeliveryDate_ClientEquipment'),	document.getElementById('txtDeliveryDate_DataCard'),	document.getElementById('txtDeliveryDate_BlackBerryZ10'),	document.getElementById('txtDeliveryDate_Q10'),	document.getElementById('txtDeliveryDate_SamsungS3'),	document.getElementById('txtDeliveryDate_SamsungS4'),	document.getElementById('txtDeliveryDate_SamsungS5'),	document.getElementById('txtDeliveryDate_IPhone4S'),	document.getElementById('txtDeliveryDate_IPhone5S'),	document.getElementById('txtDeliveryDate_IPhone5C'),	document.getElementById('txtDeliveryDate_LGG2'),	document.getElementById('txtDeliveryDate_SamsungNote3'), document.getElementById('txtDeliveryDate_SamsungNote4'), document.getElementById('txtDeliveryDate_IPhone6'), document.getElementById('txtDeliveryDate_IPhone6P'),document.getElementById('txtDeliveryDate_LG_G3_16GB'),document.getElementById('txtDeliveryDate_Samsung_S6_32GB'),document.getElementById('txtDeliveryDate_Samsung_S6_64GB'),document.getElementById('txtDeliveryDate_Samsung_S6_128GB'),document.getElementById('txtDeliveryDate_Samsung_S6edge_32GB'),document.getElementById('txtDeliveryDate_Samsung_S6edge_64GB'),document.getElementById('txtDeliveryDate_Samsung_S6edge_128GB'), document.getElementById('msg'));" id="update_dd" alt="UpdateButton" />
                            <div id="msg" style="float:left;text-align:center;padding-top:10px;width:40%;color:green;font-weight:bold;display:none">Updated Successfully</div>

                          </xsl:for-each>
												</td>
											</tr>



										</tbody>
									</table>
								</div>
							</xsl:otherwise>
						</xsl:choose>

					</div>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
