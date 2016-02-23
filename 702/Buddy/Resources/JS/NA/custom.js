  $(document).ready(function(){
		
		
		// autocomplete feature
		var associate_name = [
			  "AAAAaaaaPP PppLLLlll EEEeeeeeee",
			  "Jameeeeeeeeeeeeeeeeeeees",
			  "Jinson Abrahaaaamm",
			  "Louisssss philiphh",
			  "Madison",
			  "James",
			  "Abraham",
			  "Louis",
			  "Madison",
			  "James",
			  "Louis",
			  "Madison",
			];
			var project_name= [
				"CAS",
				"Mobility",
			];
			var BU_name= [
				"HealthCare",
				"Insurance",
			];
			var account_name= [
				"CAS",
				"Mobility",
			];
			$("#inpt_IDname").autocomplete({
			  source: associate_name
			});
			$("#inpt_Project").autocomplete({
			  source: project_name
			});
			$("#inpt_BU").autocomplete({
			  source: BU_name
			});
			$("#inpt_Account").autocomplete({
			  source: account_name
			});
			
		//Progress bar
		function init_circular_progress(el_id, xCenter, yCenter, radius, percentage){
				
			var paper = Raphael(el_id, 500, 500);
			
			paper.customAttributes.arc = function (xloc, yloc, value, total, R) {
				var alpha = 360 / total * value,
					a = (90 - alpha) * Math.PI / 180,
					x = xloc + R * Math.cos(a),
					y = yloc + R * Math.sin(a),
					path;
				if (total == value) {
					path = [
						["M", xloc, yloc - R],
						["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
					];
				} else {
					if(x == xCenter){
						path = [
							["M", xloc, yloc + R],
							["A", R, R, 0, +(alpha > 180), 0, x-0.01, y]
						];
					}
					else{
						path = [
							["M", xloc, yloc + R],
							["A", R, R, 0, +(alpha > 180), 0, x, y]
						];
					}
				}
				return {
					path: path
				};
			};
			
			var my_arc = paper.path().attr({
				"stroke": "#484848",			/* Stroke color */
				"stroke-width": 8,				/* Stroke width */
				arc: [xCenter, yCenter, 100, 100, radius]
			});
			
			my_arc.animate({
				arc: [xCenter, yCenter, 100-percentage, 100, radius]
			}, 1500, "bounce");					/* Speed and animation effect */

		}


		window.onload = function(){
		
			init_circular_progress('custom_arc', 38, 38, 31, 40);	
		}
		
		
		$("#clslazy").lazyload();
		$('.selectpicker').selectpicker({
				 
		});
		
		
		//Reset fnctn
		/* var input = $( "input:reset" ).css({
		  background: "#606b71",
		  border: "1px red #4f595e"
		}); */
		
		$(".clsReset").click(function() {
			$('.selectpicker').selectpicker('deselectAll');
			$('.filter-option').text('All');
			$('.search_by_input').find('input:text').val('');    
		});
			

		//Popup Recommend advisor 
		$(".recommend_advisor").click(function() {	
			$('.wrapper').prepend('<div class="overlay"></div>');
			$('.wrapper').addClass('overflowhid'); 
			$('.popup_recommend').show();
		}); 
		  $('.popup_close,.submit_fb_confirm').click(function() {
			$('.popup_recommend').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
			$('#successful_completion').hide();
		}); 
		$('#ys_recommend').click(function() {
			$('.popup_recommend').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
		});
		$('#no_recommend').click(function() {
			$('.popup_recommend').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
		});

		
		 //Search advisor
		$(".search_advisor").click(function() {	
			$('.martop').hide();
			$('.main_content').show();	
			$('.menu_list_header ul').find('.selected').removeClass('selected');		
			$('.menu_list_header ul li:nth-child(2)').addClass('selected');
			
			$('.menu_list ul').find('.selected').removeClass('selected');		
			$('.menu_list ul li:nth-child(2)').addClass('selected');
			
		}); 
		 
		 
		//Popup Send request
		$(".btn_send_req").click(function() {
			$('.wrapper').prepend('<div class="overlay"></div>');
			$('.wrapper').addClass('overflowhid');
			$('#Popup1_send_req').show();
		});
		$('.popup_close').click(function() {
			$('#Popup1_send_req').hide();
			$('#endConnection').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
		});
		$('#ys_send_req').click(function() {
			$('#Popup2_send').show();	
			$('#Popup1_send_req').hide();
		});
		$('#no_send_req').click(function() {
			$('#Popup1_send_req').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
			$('#endConnection').hide();	
		});
		$('.clsOk_req').click(function() {
			$('#Popup2_send').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
		});
		$('.popup_close').click(function() {
			$('#Popup2_send').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
		});
		
		
		//Page navigation by icons (desktop and tab )
		$('.menu_list_header ul li a').click(function(ev){
			$('.menu_list_header ul li').removeClass('selected');
			$(ev.currentTarget).parent('li').addClass('selected');
		});
		$(".home_icon").click(function(){
			$('#clsHome_content').show();
			$('#clsSearch_content').hide();
			$('#clsHirepgm_content').hide();
			$('#clsAdvisorHome_content').show();
			$('.main_content_advisor').hide();	
		});
		$(".search_icon").click(function(){
			$('#clsSearch_content').show();		
			$('#clsHome_content').hide();
		});
		$('.details_icon').click(function(){
			$('#clsAdvisorHome_content').hide();	
			$('.main_content_advisor').show();
		});
		$('.alert_icon').click(function(){
			$('#clsSlide15Home_content').hide();
			$('#clsAlert_content').show();	
			$('#clsHirepgm_content').hide();	
		});
		$('.request_icon').click(function(){
			$("#clsSlide22Home_content").hide();
			$("#clsRequest_content").show();	
		});
		
		
		
		//Page navigation by icons (for mobile)
		 $('.menu_list ul li a').click(function(ev){
			$('.menu_list ul li').removeClass('selected');
			$(ev.currentTarget).parent('li').addClass('selected');
		});
		$(".home_icon").click(function(){
			$('#clsHome_content').show();
			$('#clsSearch_content').hide();
		});
		$(".search_icon").click(function(){
			$('#clsSearch_content').show();		
			$('#clsHome_content').hide();
		}); 
		$('.details_icon').click(function(){
			$('#clsAdvisorHome_content').hide();	
			$('#cls_view_advisor').show();
		});
		$('.alert_icon').click(function(){
			$('#clsSlide15Home_content').hide();
			$('#clsAlert_content').show();	
		});
		$('.request_icon').click(function(){
			$("#clsSlide22Home_content").hide();
			$("#clsRequest_content").show();	
		});
		
		
		
		//Pop up  end_connection
		$('.end_connection').click(function() {
			$('.wrapper').prepend('<div class="overlay"></div>');
			$('.wrapper').addClass('overflowhid');
			$('#endConnection').show();
		});
		$('.popup_close').click(function() {
			$('#Popup1_send_req').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
		});
		$('#ys_send_req').click(function() {
			$('#Popup1_send_req').hide();
			$('#Popup2_send').show();
		});
		$('#no_send_req').click(function() {
			$('#Popup1_send_req').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
		});
		
		
		//feedback popup
		$(".feedback_btn").click(function(){
			$("#feedback").modal('show');
		});
	
	
		//view_advisor
		$('.view_advisor').click(function(){
			$('.martop').hide();
			$('.main_content_advisor').show();	
			$('.menu_list_header ul').find('.selected').removeClass('selected');		
			$('.menu_list_header ul li:nth-child(3)').addClass('selected');
			
			$('.menu_list ul').find('.selected').removeClass('selected');		
			$('.menu_list ul li:nth-child(3)').addClass('selected');
		});
		
		
		//li choose click
		$('.choose_option li').click(function(){
			var ind = $(this).index();
			 $(this).siblings().find('span').removeClass('selected');
			 $(this).find('span').addClass('selected');
				
		})
	 
	 
		//**26/8**/
		//result page
		$('.clsSend_req').click(function() {
		
			var inval = $(".clsSend_req").index( this ); 
			/* var a = $('inval').parent();
			alert('a'); */
			/* alert( "That was div index #" + inval); */
			
			$('#success_ok_send').click(function() {
				$('.clsSend_req').hide();
				$('.req_send_label').show();	
			});
			$('.req_send_label').click(function() {
				alert('hi');
				$('.wrapper').removeClass('overflowhid');
				$('.overlay').hide();
				$('#Popup1_send_req').hide();
			});
		});
		
		
		 //history_details slide 15
		$(".history_details").click(function() {	
			$('#clsSlide15Home_content').hide();
			$('#clsAlert_content').show();	
			$('.menu_list_header ul').find('.selected').removeClass('selected');		
			$('.menu_list_header ul li:nth-child(4)').addClass('selected');
			
			$('.menu_list ul').find('.selected').removeClass('selected');		
			$('.menu_list ul li:nth-child(4)').addClass('selected');
			
		}); 
		$(".home_icon").click(function(){
			$('#clsAlert_content').hide();
			$('#clsSlide15Home_content').show();
		});
		
		$('.close_popup,#feedback .popup_close').click(function(){
			//$('#feedback,.modal-backdrop,.in').hide();
			$('.modal-backdrop').remove();
			$('.modal').removeClass('in')
		});
		$('#yes_end_connection').click(function(){
			$('.main_content_advisor').hide();
			$('#clsAdvisorHome_content').show();
			$('#endConnection,.overlay').hide();
		});
		$('.send_fb').click(function(){
			$('.wrapper').prepend('<div class="overlay"></div>');
			$('.modal-backdrop').remove();
			$('.modal').removeClass('in')
			$('#successful_completion').show();
		
		});
	
	
		//**27/8**/
		//Sliding
		$('.more_icon').click(function(){	
			 $("#panel").slideToggle( "slow" );
		});
		
		//Newhire pgm slide 18
		$(".advisor_program").click(function() {	
			$('#clsSlide15Home_content').hide();
			$('#clsHirepgm_content').show();	
			$('.menu_list_header ul').find('.selected').removeClass('selected');		
			$('.menu_list_header ul li:nth-child(1)').addClass('selected');
			
			$('.menu_list ul').find('.selected').removeClass('selected');		
			$('.menu_list ul li:nth-child(1)').addClass('selected');
			
		}); 
		
		//27-8
	
		/* ("#cls_view_advisor").lazyload(); */
		
	
		// 28/8/14 
		//slide 20
		 $(".volunteer_advisor").click(function() {	
			$('.wrapper').prepend('<div class="overlay"></div>');
			$('.wrapper').addClass('overflowhid');
			$('#popup_volunteer').show();	
		});
		$('.popup_close').click(function() {
			$('#popup_volunteer').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
		});
		$('#ys_volunteer').click(function() {
			$('#popup_volunteer').hide();
			$('#Popup2_send').show();
		});
		$('#no_volunteer').click(function() {
			$('#popup_volunteer').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
		});
		$('.clsOk_req').click(function() {
			$('#Popup2_send').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();	
			$('#clsSlide20Home_content').hide();
			$('#clsSlide22Home_content').show();
		});
		$('.popup_close').click(function() {
			$('#Popup2_send').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
		});
		
		 
		//slide 22
		$(".pending_req").click(function() {	
			$("#clsSlide22Home_content").hide();
			$("#clsRequest_content").show();
			$('.menu_list_header ul').find('.selected').removeClass('selected');		
			$('.menu_list_header ul li:nth-child(5)').addClass('selected');
			
			$('.menu_list ul').find('.selected').removeClass('selected');		
			$('.menu_list ul li:nth-child(5)').addClass('selected');
		});
		
		
		//29/8/14
		//Slide26
		$(".view_connections").click(function() {	
			$("#clsSlide26Home_content").hide();
			$("#clsReq27_content").show();
			$('.menu_list_header ul').find('.selected').removeClass('selected');		
			$('.menu_list_header ul li:nth-child(5)').addClass('selected');
			
			$('.menu_list ul').find('.selected').removeClass('selected');		
			$('.menu_list ul li:nth-child(5)').addClass('selected');
		});
		
		
		//confirm 
		$('.clsAccept').click(function(){
			$('#accept_request').show();
			$('.wrapper').prepend('<div class="overlay"></div>');
			$('.wrapper').addClass('overflowhid'); 
			$(this).addClass('accept_clicked')
		});	
		$('#accept_req').click(function(){
			$('.accept_clicked').attr('disabled','disabled');
			$('#accept_request').hide();	
			$('.overlay').hide();
		});		
		$('#reject_req').click(function(){
			$('.accept_clicked').removeClass('accept_clicked');
			$('#accept_request').hide();	
			$('.overlay').hide();
		});	
			
		
		
		
		
		
});











  