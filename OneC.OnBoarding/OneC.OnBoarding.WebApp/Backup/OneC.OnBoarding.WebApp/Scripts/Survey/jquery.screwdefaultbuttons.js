/*Custom Radio Button Plugin*/
$(document).ready(function(){
	
		$('input:radio').screwDefaultButtons({
		    checked: "url(../../../../images/Survey/rad_chk.png)",
		    unchecked: "url(../../../../images/Survey/rad.png)",
			width:		15,
			height:		16
		});
		
	});
(function($) {
	$.fn.screwDefaultButtons = function(options) {
	options = $.extend($.fn.screwDefaultButtons.defaults, options);
		var checkedImage = options.checked;
		var uncheckedImage = options.unchecked;
		var disabledImage = options.disabled;
		var disabledCheckImage = options.disabledChecked;
		var selectAllBtn = options.selectAll;
		var width = options.width;
		var height = options.height;
		var checkPath = checkedImage.slice(4,-1);
		var uncheckPath = uncheckedImage.slice(4,-1);
		$('body').append('<img class="preloadCheck" src="' + checkPath + '" width="0" height="0" />');
		$('body').append('<img class="preloadUnCheck" src="' + uncheckPath + '" width="0" height="0"  />');
		$('.preloadCheck').fadeOut(0);
		$('.preloadUnCheck').fadeOut(0);
		if($(this).is(":radio")){
			// ------------ Styled Radio Buttons ---------------
			var radioButton = $(this);
			$(radioButton).wrap('<div class="styledRadio"></div>').hide();
			$('.styledRadio').css({backgroundImage:uncheckedImage, width: width, height:height,float:"left"});
			$(radioButton).filter(':checked').parent().addClass('checked').css({"background-image":checkedImage});			
			$(radioButton).each(function(){
				var radioButtonClass = $(this).attr('class');
				var radioButtonClick = $(this).attr('onclick');
				$(this).parent().addClass(radioButtonClass);
				$(this).parent().attr('onclick',radioButtonClick );
			});
			$('.styledRadio').click(function(){
          
				if(!($(this).hasClass('disabled'))){
					thisCheckName = $(this).find("input:radio").attr("name");
					if(!($(this).hasClass('checked'))){ 
						$('.selected').removeClass('selected')
						$(this).addClass('checked').addClass('selected')
						.css({backgroundImage:checkedImage})
						.find('input:radio')
							.attr('checked','checked')
							.trigger('change');
						$('.styledRadio').each(function(){
							otherCheckName = $(this).find("input:radio").attr("name")
							if(otherCheckName == thisCheckName){
								if(!($(this).hasClass('selected'))){
									if($(this).hasClass('disabled')){
										$(this).removeClass('checked')
										.css({backgroundImage:disabledImage});
									}
									else {
										$(this).removeClass('checked')
										.css({backgroundImage:uncheckedImage});
									}	
								}
							}
						});
					}
				}
               if($('#'+$(this).find('input').attr('id')+'_feedback').attr('type') !=undefined){
                 $('#'+$(this).find('input').attr('id')+'_feedback').attr('disabled',false);
               }else{
                var name = $(this).find('input').attr('name');
                $('input[name="'+name+'"]').each(function(){
                    if($(this).attr('optionType') ==null){
                    
                    }else{
                   if($(this).is(':checked') == true){
                    $('#'+$(this).attr('id')+'_feedback').attr('disabled',false);
                   }else{
                    $('#'+$(this).attr('id')+'_feedback').attr('disabled',true);
                    $('#'+$(this).attr('id')+'_feedback').val('');
                   }
                    }
                
                });
               
               }
               
              
			});
		}
		$('.styledRadio').css({'cursor':'pointer', "background-repeat":"no-repeat"});		
	}
	$.fn.screwDefaultButtons.defaults = {
		checked: 	"url(../../../../images/Survey/rad_chk.jpg)",
		unchecked:	"url(../../../../images/Survey/rad.jpg)",
		disabled:	false,
		disabledChecked:	false,
		selectAll:  null,    
		width:		20,
		height:		20
	};
})(jQuery);