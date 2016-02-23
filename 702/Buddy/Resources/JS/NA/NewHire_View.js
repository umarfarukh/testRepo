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
			  var advisor_name = [
          "123456",
          "James",
          "Louis",
		  "Madison James",
		  "Joe","Doe","John"
      ];
			$("#inpt_IDname").autocomplete({
          source: associate_name,
          response: function(event, ui) {
              if (!ui.content.length) {
                  var noResult = {
                      value: "",
                      label: "No results found"
                  };
                  ui.content.push(noResult);
              }
          }
      });
      $("#inpt_Project").autocomplete({
          source: project_name,
          response: function(event, ui) {
              if (!ui.content.length) {
                  var noResult = {
                      value: "",
                      label: "No results found"
                  };
                  ui.content.push(noResult);
              }
          }
      });
      $("#inpt_BU").autocomplete({
          source: BU_name,
          response: function(event, ui) {
              if (!ui.content.length) {
                  var noResult = {
                      value: "",
                      label: "No results found"
                  };
                  ui.content.push(noResult);
              }
          }
      });
      $("#inpt_Account").autocomplete({
          source: account_name,
          response: function(event, ui) {
              if (!ui.content.length) {
                  var noResult = {
                      value: "",
                      label: "No results found"
                  };
                  ui.content.push(noResult);
              }
          }
      });
      $("#add_admin").autocomplete({
          source: associate_name,
          appendTo: '#autocomplete_admin',
          open: function() {
              $('#autocomplete_admin .ui-menu').width(158)
          },
		  response: function(event, ui) {
              if (!ui.content.length) {
                  var noResult = {
                      value: "",
                      label: "No results found"
                  };
                  ui.content.push(noResult);
              }
          }
      });
	  
		  $('#inpt_IDname_associate').autocomplete({
          source: advisor_name,
          appendTo: '#autocomplete_admin',
          open: function() {
              $('#autocomplete_admin .ui-menu').width(158)
          },
          response: function(event, ui) {
              if (!ui.content.length) {
                  var noResult = {
                      value: "",
                      label: "No results found"
                  };
                  ui.content.push(noResult);
              }
          }
      });
      $('#inpt_IDname_associate_rec').autocomplete({
          source: advisor_name,
          appendTo: '#autocomplete_admin',
          open: function() {
              $('#autocomplete_admin .ui-menu').width(158)
          },
          response: function(event, ui) {
              if (!ui.content.length) {
                  var noResult = {
                      value: "",
                      label: "No results found"
                  };
                  ui.content.push(noResult);
              }
          }
      });
	    $('#inpt_IDname_advisors').autocomplete({
          source: advisor_name,
          appendTo: '#autocomplete_admin',
          open: function() {
              $('#autocomplete_admin .ui-menu').width(158)
          },
          response: function(event, ui) {
              if (!ui.content.length) {
                  var noResult = {
                      value: "",
                      label: "No results found"
                  };
                  ui.content.push(noResult);
              }
          }
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
		$(".clsReset").click(function() {
			$('.selectpicker').selectpicker('deselectAll');
			$('.filter-option').text('All');
			$('.view_select_box .filter-option').text('Advisor');
			$('.configure_duration .filter-option').text('30');
			$('.configure_view_box .filter-option').text('1');
			$('.search_by_input').find('input:text').val('');   
			$('.feedback_btn_1').show(); 
		});

		
		//result page
		$('.clsSend_req').click(function() {
		
			var inval = $(".clsSend_req").index( this ); 
			$(this).addClass('send_clicked')	
			
			/* alert( "That was div index #" + inval); */
			
			$('#success_ok_send').click(function() {
				/* $('.clsSend_req').hide(); */
				$('.send_clicked').parent().html('Request Sent');
				$('.send_clicked').removeClass('send_clicked');
				
			});
		});
		
		
		//Sliding
		$('.more_icon').click(function(){	
			 $("#panel").slideToggle( "slow" );
		});
		
		
				//********POPUP starts********//
		
		//Popup Send request
		$(".clsSend_req").click(function() {
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
			$('#Popup1_send_req').hide();
			$('#Popup2_send').show();	
			$('.wrapper').addClass('search_advisor_clicked')
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
			 $('#notify_associate').hide();
		});
		$('.popup_close').click(function() {
			$('#Popup2_send').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
			 $('#notify_associate').hide();
		});
		

		//Pop up end_connection
		$('.end_connection').click(function() {
			$('.wrapper').prepend('<div class="overlay"></div>');
			$('.wrapper').addClass('overflowhid');
			$('#endConnection').show();
			$(this).addClass('accept_clicked');
			
		});
		$('.popup_close').click(function() {
			$('#endConnection').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
		});
		$('#yes_end_connection').click(function() {
			$('#endConnection').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
			$('.accept_clicked').attr('disabled','disabled')
								.css({
									"color":"gray",
									"background-color":"gray",
									"border-style":"solid"
								});
			$('.accept_clicked').parents('.view_advisor_inner_content').find('.status_holder').hide();
			$('.accept_clicked').parents('.view_advisor_inner_content').find('.days_left').hide();					
		});
		$('#no_end_connection').click(function() {
			$('.accept_clicked').removeClass('accept_clicked');
			$('#endConnection').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
		}); 
		
		
		// Popup feedback 
		$(".feedback_btn").click(function(){
			$("#feedback").modal('show');
		
		});

				//li choose click
				$('.choose_option li').click(function(){
					var ind = $(this).index();
					 $(this).siblings().find('span').removeClass('selected');
					 $(this).find('span').addClass('selected');
						
				})
	 
		$('.close_popup,#feedback .popup_close').click(function(){
			$('.modal-backdrop').remove();
			$('.modal').removeClass('in')
		});
		/* $('#yes_end_connection').click(function(){
			$('.main_content_advisor').hide();
			$('#clsAdvisorHome_content').show();
			$('#endConnection,.overlay').hide();
		}); */
		$('.send_fb').click(function(){
			var len = $('.feedback_ques li .selected').length;
			console.log(len)
			if(len==5){
				$('.wrapper').prepend('<div class="overlay"></div>');
				$('#successful_completion').show();
				//$('.fill_fb').hide();
				//$('.send_fb').attr('data-dismiss','modal');
				//$('.send_fb').attr('aria-hidden','true');
			}
			else{
				//$('.send_fb').removeAttr('data-dismiss')
				//$('.send_fb').removeAttr('aria-hidden');
				$('.wrapper').prepend('<div class="overlay"></div>');
				$('#fill_feedback').show();
					
			}
		});
		$('.provide_fb').click(function(){
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
			$('#fill_feedback').hide();
			$("#feedback").modal('show');
		});
		$('#fill_feedback .popup_close').click(function(){
				$('#fill_feedback').hide();
				$('.provide_fb').hide();
				$("#feedback").modal('show');
		});	
		//27-8
		/* ("#cls_view_advisor").lazyload(); */
		

		//whole nav by icons
		//Page navigation by icons (desktop and tab )
		$('.menu_list_header ul li a').click(function(ev){
			$('.menu_list_header ul li').removeClass('selected');
			$(ev.currentTarget).parent('li').addClass('selected');
		});
			// 3 to 8
		$(".home_icon").click(function(){
			$('#clsHome_content').show();
			$('#clsSearch_content').hide();
			$('#clsAdvisorHome_content').hide();
			$('#clsAlert_content').hide();	
			$('#clsHirepgm_content').hide();	
			$('.main_content_advisor').hide();
			$('#tab_superadmin').hide();$('.supervisor_view').hide();
			if($('.wrapper').hasClass('search_advisor_clicked'))
				{
				/* 	$('#clsHome_content').hide();
					$('#clsAdvisorHome_content').show(); */
					$('.search_advisor').parent().hide();
					$('.newhire_content').css('margin-left','17%')
					$(".recommend_advisor").addClass('view_advisor');
					$(".view_advisor").find('h5').html('View your Advisor Details');
					$(".view_advisor").find('img').attr('src','../images/icon_advisor_details.png');
					$(".view_advisor").find('p').html('Click here to learn more about your Advisor, provide feedback on the program,or end your connection with your Advisor.');
				}
		});
		$(".search_icon").click(function(){
			$('#clsSearch_content').show();		
			$('#clsHome_content').hide();
			$('#clsAdvisorHome_content').hide();
			/* $('#clsSlide15Home_content').hide(); */
			$('#clsAlert_content').hide();	
			$('#clsHirepgm_content').hide();
			$('.main_content_advisor').hide();
			$('#tab_superadmin').hide();$('.supervisor_view').hide();
		});
		
			//9 to 14
		$('.history_icon').click(function(){
			$('.main_content_advisor').show();
			$('#clsHome_content').hide();
			$('#clsSearch_content').hide();
			$('#clsAdvisorHome_content').hide();
			/* $('#clsSlide15Home_content').hide(); */
			$('#clsAlert_content').hide();	
			$('#clsHirepgm_content').hide();
			$('#tab_superadmin').hide();
			$('.supervisor_view').hide();
		});
			//15 to 18
		$('.alert_icon').click(function(){
			$('#clsAlert_content').show();	
			$('#clsHome_content').hide();
			$('#clsSearch_content').hide();
			$('#clsAdvisorHome_content').hide();
			$('.main_content_advisor').hide();	
			/* $('#clsSlide15Home_content').hide(); */
			$('#clsHirepgm_content').hide();
			$('#tab_superadmin').hide();
	$('.supervisor_view').hide();
		});
		
		//Superadmin
		$('.superadmin_icon').click(function(){
			$('#tab_superadmin').show();
			$('#clsHome_content').hide();
			$('#clsSearch_content').hide();
			$('#clsAdvisorHome_content').hide();
			$('.main_content_advisor').hide();
			$('#clsHirepgm_content').hide();
			$('#clsAlert_content').hide();
			$('.supervisor_view').hide();		
		});
		
		//Supervisor
		$('.supervisor_icon').click(function(){
			$('#clsHome_content').hide();
			$('#clsSearch_content').hide();
			$('#clsAdvisorHome_content').hide();
			$('#clsAlert_content').hide();	
			$('#clsHirepgm_content').hide();	
			$('.main_content_advisor').hide();
			$('#tab_superadmin').hide();
			$('#tab_supervisor').show();
			$('.supervisor_view').show();
		});	
		$('#clsOk_access').click(function() {
			$('#admin_access').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
		});
		$('.popup_close').click(function() {
			$('#admin_access').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
			$('#Popup1_remove').hide();
			$('#Popup_empty_add').hide();
			
		});	
		

		//Page navigation by icons (for mobile)
		 $('.menu_list ul li a').click(function(ev){
			$('.menu_list ul li').removeClass('selected');
			$(ev.currentTarget).parent('li').addClass('selected');
		});
		// 3 to 8
		$(".home_icon").click(function(){
			$('#clsHome_content').show();
			$('#clsSearch_content').hide();
			$('#clsAdvisorHome_content').hide();
			$('#clsAlert_content').hide();	
			$('#clsHirepgm_content').hide();	$('.supervisor_view').hide();
			$('.main_content_advisor').hide();	
			if($('.wrapper').hasClass('search_advisor_clicked'))
				{
				/* 	$('#clsHome_content').hide();
					$('#clsAdvisorHome_content').show(); */
					$('.search_advisor').parent().hide();
					$('.newhire_content').css('margin-left','17%')
					$(".recommend_advisor").addClass('view_advisor');
					$(".view_advisor").find('h5').html('View your Advisor Details');
					$(".view_advisor").find('img').attr('src','../images/icon_advisor_details.png');
					$(".view_advisor").find('p').html('Click here to learn more about your Advisor, provide feedback on the program,or end your connection with your Advisor.');
				}
		});
		$(".search_icon").click(function(){
			$('#clsSearch_content').show();		
			$('#clsHome_content').hide();
			$('#clsAdvisorHome_content').hide();	
			$('#clsAlert_content').hide();	
			$('#clsHirepgm_content').hide();
			$('.main_content_advisor').hide();	$('.supervisor_view').hide();
		});
			//9 to 14
		$('.history_icon').click(function(){
			$('.main_content_advisor').show();
			$('#clsHome_content').hide();
			$('#clsSearch_content').hide();
			$('#clsAdvisorHome_content').hide();
			$('#clsAlert_content').hide();	
			$('#clsHirepgm_content').hide();		
			
		});
			//15 to 18
		$('.alert_icon').click(function(){
			$('#clsAlert_content').show();	
			$('#clsHome_content').hide();
			$('#clsSearch_content').hide();
			$('#clsAdvisorHome_content').hide();
			$('.main_content_advisor').hide();	
			$('#clsHirepgm_content').hide();	
			$('.supervisor_view').hide();
		});
	
		
		//whole nav by div
		// 1 Newhire pgm 
		$(".advisor_program").click(function() {	
			$('#clsHome_content').hide();
			$('#clsAdvisorHome_content').hide();
			$('#clsHirepgm_content').show();	
			$('.menu_list_header ul').find('.selected').removeClass('selected');		
			$('.menu_list_header ul li:nth-child(1)').addClass('selected');
			
			$('.menu_list ul').find('.selected').removeClass('selected');		
			$('.menu_list ul li:nth-child(1)').addClass('selected');$('.supervisor_view').hide();
		}); 	
			$(".home_icon").click(function(){
				$('#clsAdvisorHome_content').hide();
				$('#clsHome_content').show();
				$('#clsSearch_content').hide();
				$('#clsAlert_content').hide();	
				$('#clsHirepgm_content').hide();	
				$('.main_content_advisor').hide();$('.supervisor_view').hide();	
				if($('.wrapper').hasClass('search_advisor_clicked'))
					{
						/* $('#clsHome_content').hide();
						$('#clsAdvisorHome_content').show(); */
					}
				 
		});
			
		
		// 2 recommend_advisor (popup)
		$(".recommend_advisor").click(function() {	
			if($(this).hasClass('view_advisor')){
				$('.main_content_advisor').show();
				$('.martop').hide();
				$('.menu_list_header ul').find('.selected').removeClass('selected');		
				$('.menu_list_header ul li:nth-child(3)').addClass('selected');
				
				$('.menu_list ul').find('.selected').removeClass('selected');		
				$('.menu_list ul li:nth-child(3)').addClass('selected');
				
				/* if($('.main_content_advisor').height()>370)
				{ $('.main_content_advisor').css({'overflow-y':'auto','height':'370px'}) 
				}
				else{$('.main_content_advisor').css({'overflow':'hidden','height':'auto'})}
			 */
			}
			else{ 
				$('.wrapper').prepend('<div class="overlay"></div>');
				$('.wrapper').addClass('overflowhid'); 
				$('.popup_recommend').show();
			}	
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
		
		 // 3 Search advisor
		$(".search_advisor").click(function() {	
			$('.martop').hide();
			$('.main_content').show();	
			$('.menu_list_header ul').find('.selected').removeClass('selected');		
			$('.menu_list_header ul li:nth-child(2)').addClass('selected');
			
			$('.menu_list ul').find('.selected').removeClass('selected');		
			$('.menu_list ul li:nth-child(2)').addClass('selected');
			$('.supervisor_view').hide();
		}); 
		
		// 5 history_details slide 15
		$(".history_details").click(function() {
			$('#clsAlert_content').show();	
			$('#clsHome_content').hide();
			$('#clsAdvisorHome_content').hide();$('.supervisor_view').hide();
			$('.menu_list_header ul').find('.selected').removeClass('selected');		
			$('.menu_list_header ul li:nth-child(4)').addClass('selected');
			
			$('.menu_list ul').find('.selected').removeClass('selected');		
			$('.menu_list ul li:nth-child(4)').addClass('selected');
			
			if($('#clsAlert_content .alert_wrapper').height()>395)
			{ $('#clsAlert_content .alert_wrapper').css({'overflow-y':'auto','height':'395px'}) 
			}
			else{$('#clsAlert_content .alert_wrapper').css({'overflow':'hidden','height':'auto'})}
			
		}); 
		
		
		//Tooltip function
			$('.header_icons').find('.list_menu_icon').each(function() { 	
			$(this).hover(function() { 
				
				$(this).children('.driver_score').show();	
					//$('.driver_score').show();					
				}) .mouseleave( function (event) {
					$(this).children('.driver_score').hide();	
				
					});	
			});
			
			
		//**SUPERADMIN VIEW**//
			/*$('#view_select').change(function(){
				if($(this).val()==1){	
					$('.feedback_btn_1').hide();
					$('.btn_alignment').addClass('btn_alignment_alt');
				}
			});*/
			$('.clsCancel').click(function() {
				$('.admin_input').val('Enter Associate ID/Name');
			});
		
		
			//Popup add (add admin)
			
			$(".clsAdd").click(function() {
          //console.log($('#add_admin').val())
			  if ($('#add_admin').val() == "Enter Associate ID/Name")
				{
					$('.wrapper').prepend('<div class="overlay"></div>');
					$('.wrapper').addClass('overflowhid');
					$('#Popup_empty_add').show();
				} 
			  else {
				  $('.wrapper').prepend('<div class="overlay"></div>');
				  $('.wrapper').addClass('overflowhid');
				  $('#Popup1_add').show();
			  }
			});
		  $('.popup_close').click(function() {
			  $('#Popup1_add').hide();
			  $('.wrapper').removeClass('overflowhid');
			  $('.overlay').hide();
		  });
		  $('#ys_add').click(function() {
			  $('#Popup1_add').hide();
			  var addUser = "<div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content'><div class='profile_pic'><img width='43' height='43' class='img-circle' src='../images/associate_image_img.png'></div><div class='col-xs-8 col-sm-4 col-md-4 col-lg-4 clsDetails'><p><span class='results_label'>Name</span><span class='result_text'>Madison James</span></p><p><span class='results_label'>ID</span><span>1234568888888</span></p></div><div class='col-xs-12 col-sm-4 col-md-4 col-lg-4 clsDetails'><p><span class='results_label'>Title</span><span class='result_text'>AVP Projects</span></p></div><div class='col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_remove'><span><input class='btn_grey clsRemove_access new_remove' id='remove_access' value='Remove access' type='button'></span></div></div></div>";
			  $('.results_wrapper_content').find('.admin_results_wrapper').eq(0).prepend(addUser); 
			   /* $('.admin_results_wrapper').eq(1).prepend(addUser); */
			  $('#Popup2_add').show();
		  });
		  $('#no_add').click(function() {
			  $('#Popup1_add').hide();
			  $('.wrapper').removeClass('overflowhid');
			  $('.overlay').hide();
		  });
		  $('.clsOk_req').click(function() {
			  $('#Popup2_add').hide();
			  $('#Popup_empty_add').hide();
			  $('.wrapper').removeClass('overflowhid');
			  $('.overlay').hide();
		  });
		  $('.popup_close').click(function() {
			  $('#Popup2_add').hide();
			  $('.wrapper').removeClass('overflowhid');
			  $('.overlay').hide();
		  });
			
			//Popup Remove access (add admin)
			
			$('.clsRemove_access').click(function() {
				$('.wrapper').prepend('<div class="overlay"></div>');
				$('.wrapper').addClass('overflowhid');
				$('#Popup1_remove').show();
				$(this).addClass('remove');
			});		
			$('.new_remove').click(function() {
				$('.wrapper').prepend('<div class="overlay"></div>');
				$('.wrapper').addClass('overflowhid');
				$('#Popup1_remove').show();
				$(this).addClass('remove');
			});
			$('#ys_remove').click(function() {
				$('#Popup1_remove').hide();
				$('.remove').parents('.results_content').remove();
				$('#Popup2_add').show();	
			});
			$('#no_remove').click(function() {
				$('#Popup1_remove').hide();
				$('.wrapper').removeClass('overflowhid');
				$('.overlay').hide();
				$('.remove').removeClass('remove');
			});
			$('.clsOk_req').click(function() {
				$('#Popup2_add').hide();
				$('.wrapper').removeClass('overflowhid');
				$('.overlay').hide();
			});
			$('.popup_close').click(function() {
				$('#Popup2_add').hide();
				$('.wrapper').removeClass('overflowhid');
				$('.overlay').hide();
			});
			
			
			//Review Feedback
			$('.feedback_btn_1').click(function(){
				$("#feedback").modal('show');
				$("#feedback li").unbind('click');
			});

			$('.close_popup,#feedback .popup_close').click(function(){
				$('.modal-backdrop').remove();
				$('.modal').removeClass('in')
			});
			
			//Popup Connections
			$('.connections_btn').click(function() {
				$('.wrapper').prepend('<div class="overlay"></div>');
				$('.wrapper').addClass('overflowhid');
				$('#connections').show();	
			});
			$('.popup_close').click(function() {
				$('#connections').hide();
				$('.wrapper').removeClass('overflowhid');
				$('.overlay').hide();
			});
		
			/* Vertical Carousel */
			var countList = 3;
			$(".prev").hide();
			var actualTotalList = $(".assmagslider li").size();
			var totalList = $(".assmagslider li").size()-1;
			
			if(actualTotalList<=3){
				$(".next").hide();
			}
				
			$(".next").bind("click", function() {
				$(".prev").show();
				countList++;	
				$(".list_carousel").animate({"margin-left" : "-="+123}, 500)
				if(countList >= (actualTotalList))
				{
					$(this).hide();
				}
			});
			$(".prev").bind("click", function() {
				$(".next").show();
				countList--;
				$(".list_carousel").animate({"margin-left" : "+="+123}, 500)
				if(countList <= 3)
				{
					$(this).hide();
				}
			});	
			/* Vertical Carousel */

		//**SUPERVISOR VIEW**//	

		  $('.assign_advisor').click(function() {
			  $("#advisorAssign").modal('show');
		  });
		  $('.notify_btn').click(function() {
			  $('.wrapper').prepend('<div class="overlay"></div>');
			  $('.wrapper').addClass('overflowhid');
			  $('#notify_associate').show();
		  });
		  
		 // var a = []
		 // name_txt 
		 var array_name=[];
		 var i =0;
		 var count=0;
		 var rows=$('.pending_req_set .row');
		/* $('.pending_req_set .row').each(function(i,val){
			var array_name_txt = $(this).find('.name_txt').text();	
			array_name.push(array_name_txt)
		 });*/
		$('#autocomplete_admin .ui-menu').on('click',function(){
			
			$(rows).show();
			$('.no_result').hide();
			var name_val = $('#inpt_IDname_associate').val();
					$(rows).each(function(i,val){
						var txt_name = $(this).find('.name_txt').text();
						if(txt_name==name_val){
							count++;
						}
						else{$(this).hide()
						}
	if(count==0){ $('.no_result').css('display','inline-block');}
	else if(count>0){$('.no_result').hide();}
						//if(count==0){ $('.no_result').css('display','inline-block');}
						//$(rows).length
						
					});
		}); 
		
		$('#inpt_IDname_associate').focus(function () {
			if ($(this).val()=="Search") {
				$(this).val("");
				$(rows).show();
				$('.no_result').hide();
			}
		});
		$('#inpt_IDname_associate').blur(function () {
			if ($(this).val()=="") {
				$(rows).show();
				$(this).val("Search");
				$(rows).each(function(i,val){
						$(this).show();
				});
				$('.no_result').hide();
			}
		});
		
	$('.apply_btn').click(function(){
				if($('#view_select').val()==1){	
					$('.feedback_btn_1').hide();
					$('.btn_alignment').addClass('btn_alignment_alt');
				}
				if($('#view_select').val()==0){	
					$('.feedback_btn_1').show();
					$('.btn_alignment').removeClass('btn_alignment_alt');
				}
		});
	
	//Popup Send-recomendation 
	var chkbox_count=0;
		$('.Send_Recommendations').click(function(){
			$('.advisor_assign_popup_content .chkbox').each(function(){
				if($(this).is(':checked'))	{count++}
			});
			if(count>0){
				$('.wrapper').prepend('<div class="overlay"></div>');
				$('.wrapper').addClass('overflowhid');
				$('#send_recommend').show();
				count=0;
			}
			else{
				$('.wrapper').prepend('<div class="overlay"></div>');
				$('.wrapper').addClass('overflowhid');
				$('#send_recommend_condn').show();
			}
		});
		
		
		
		$('.clsOk_req').click(function() {
			$('#send_recommend').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
			$('#send_recommend_condn').hide();
		});
		$('.popup_close').click(function() {
			$('#send_recommend').hide();
			$('#send_recommend_condn').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
		});
		
		$('#send_recommend_condn .clsOk_req').click(function() {
			
			 $("#advisorAssign").modal('show');
		});
		
	//Popup Submit 
		$('.submit').click(function(){
			$('.wrapper').prepend('<div class="overlay"></div>');
			$('.wrapper').addClass('overflowhid');
			$('#submit_configure').show();
	
		});
		$('.clsSubmit').click(function() {
			$('#submit_configure').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
		});
		$('.popup_close').click(function() {
			$('#submit_configure').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
		});
		
		
		//Popup  Notify All
		$('.notify_all_btn').click(function(){
			$('.wrapper').prepend('<div class="overlay"></div>');
			$('.wrapper').addClass('overflowhid');
			$('#submit_configure').show();
	
		});
		$('.clsSubmit').click(function() {
			$('#submit_configure').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
		});
		$('.popup_close').click(function() {
			$('#submit_configure').hide();
			$('.wrapper').removeClass('overflowhid');
			$('.overlay').hide();
		});
		
		
		
		
		
		
		
		
		
		
		
		
		
		
});











  