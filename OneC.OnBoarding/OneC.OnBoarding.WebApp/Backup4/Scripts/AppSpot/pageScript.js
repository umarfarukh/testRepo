// JavaScript Document
$(function() { 
		   vctoolTip();
		   uptooltip();
		   supTooltip();
		   notifyMenu();
		   
//	var GmaxHeight = 0; 
//    $('.banner_header ul li').each(function(){ 
//        if (GmaxHeight < $(this).height()) {GmaxHeight = $(this).height()} 
//    }); 
//    $('.banner_header ul li').each(function(){ 
//        $(this).height(GmaxHeight); 
//    });


//for equalizing ht of right n left panel
	var GmaxHeight = 0; 
    $('.div_ht').each(function(){ 
        if (GmaxHeight < $(this).height()) {GmaxHeight = $(this).height()} 
   }); 
    $('.div_ht').each(function(){ 
        $(this).height(GmaxHeight); 
		});

	
// language bar
	 $('.language').click(function() {
   		 $('.lang_option').slideToggle('fast');
  	  });
	 
	 
// banner show hide
$('.bannerText').hide();
$('.openbtn').hide();

$('.banner_btn').toggle(function(){
	$(this).text("Close");
	$('.bannerText').slideToggle(500);
	return false;},function(){
	
	$(this).text("Open");
	$('.bannerText').slideToggle(500);
	return false;}
);

// date picker 	
//	 $("#datepicker").datepicker();

 var maxHeight = 0; 
    $('.comumn_box').each(function(){ 
        if (maxHeight < $(this).height()) {maxHeight = $(this).height()} 
    }); 
    $('.comumn_box').each(function(){ 
        $(this).height(maxHeight); 
    }); 
	

if($("#col_Leftpannel").length!=0){
	$("."+pageVar+"").parent().addClass('active');	
}
	
	
});


// code for page theme apply in page 

$(function(){
		   
	
	var listindex= $('#col_Leftpannel .left_tabs li.active').index();

	switch (parseInt(listindex)){
		case 1:
		$('#wrapper').addClass('green');
		break;
		case 2:
		$('#wrapper').addClass('blue');
		break;
		case 3:		
		$('#wrapper').addClass('brown');
		break;
	}

 });

 
$(function(){
		   

var cName = "(Cognizant)";

v = $(".userName").html().replace(cName,'');

$(".userName").html(v);
		   
		   
 });	


$(function(){

    $(".mainmenu li").hover(function(){
      $(this).find(".hover_toplink").show();
    }, function(){
    
       
     $(this).parent().find(".hover_toplink").hide();
    });
    
  
});


//Virtual Cupboard Tooltip Function Start

//this.helpTip = function(){	
this.vctoolTip = function(){	
	/* CONFIG */		
		xOffset2 = -30;
		yOffset2 = -410;		
	/* END CONFIG */		
	$(".vctooltip").hover(function(e){
		
		$(this).css('cursor','pointer')											  
		this.t = this.title;
		var x = this.t.split("#")
		this.title = "";									  
		$("body").append("<p id='vctooltip'><span class='helpTip_arrow'></span>"+ x[0] +"<br>"+x[1]+"</p>");

		$("#vctooltip")
			.css("top",(e.pageY - xOffset2) + "px")
			.css("left",(e.pageX + yOffset2) + "px")
			
			.fadeIn("fast");		
    },
	function(){
		this.title = this.t;		
		$("#vctooltip").remove();
    });	
	$(".vctooltip").mousemove(function(e){
		$("#vctooltip")
			.css("top",(e.pageY - xOffset2)+ "px")
			.css("left",(e.pageX + yOffset2)+ "px");
	});			
};
//Virtual Cupboard Tooltip Function Start



//Tooltip Function Start
this.uptooltip = function(){	
		xOffset = -20;
		yOffset = -20;	
	    $(".uptooltip").hover(function(e){	
		$(this).css('cursor','pointer')											  
		this.t = this.title;
		this.title = "";									  
		$("body").append("<p id='uptooltip'><span class='upTip_arrow'></span>"+ this.t +"</p>");

		$("#uptooltip")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px")
			
			.fadeIn("fast");		
    },
	function(){
		this.title = this.t;		
		$("#uptooltip").remove();
    });	
	$(".uptooltip").mousemove(function(e){
		$("#uptooltip")
			.css("top",(e.pageY - xOffset)+ "px")
			.css("left",(e.pageX + yOffset)+ "px");
	});			
};



//Tooltip Function Start
this.supTooltip = function(){	
	
		xOffset1 = -20;
		yOffset1 = -300;		
		// these 2 variable determine popup's distance from the cursor
		// you might want to adjust to get the right result		
		
	$("a.supTooltip").hover(function(e){											  
		//alert('hi');
		this.t = this.title;
		//alert(this.t);
		this.title = "";									  
		//$("body").append("<p id='tooltip'>"+ this.t +"</p>");
		$("body").append("<p id='supTooltip'><span class='tooltop_arrow'></span>"+ this.t +"</p>");

		//alert($("#tooltip").length)
		$("#supTooltip")
			.css("top",(e.pageY - xOffset1) + "px")
			
			.css("left",(e.pageX + yOffset1) + "px")
			.fadeIn("fast");		
			//alert(e.pageY);
    },
	function(){
		this.title = this.t;		
		$("#supTooltip").remove();
    });	
	$("a.supTooltip").mousemove(function(e){
		$("#supTooltip")
			.css("top",(e.pageY - xOffset1)+ "px")
			.css("left",(e.pageX + yOffset1)+ "px");
	});			
};

/* notification Script */
function notifyMenu(){
	
	
	$(".notificaton-box").click(
		function(){
			$(this).find('div').slideDown("slow");
			$("#notifyMenu").addClass('notificaton-active');
			$("#notifyArrow").attr("src","../Template-Assets/images/icon-notification-uparrow.gif")
			return false;
		}	
	);
	$("body").click(function()
	{
		$(".notification-info").slideUp();
		$("#notifyMenu").removeClass('notificaton-active');
		$("#notifyArrow").attr("src","../Template-Assets/images/icon-notification-dnarrow.gif")
		return true;
	});
	/*$(".notificaton-box").mouseout(
		function(){
			//alert('hi')
			$("#notifyMenu").removeClass('notificaton-active');
			$("#notifyArrow").attr("src","../Template-Assets/images/icon-notification-dnarrow.gif")
			$(this).find('div').slideUp("slow");
		}
	);
*/}


