Zepto(function(){


	   /*禁止默认拖动事件*/
	  document.ontouchmove = function(event){
		event.preventDefault();
	  };
	    
	    

		Zepto('.loading').hide();
		Zepto('#wrap').eq(0).css('opacity',1);
       
       Zepto('.con').css({
       	  'height':Zepto(window).height()+'px',
       	  'top':'0px'
       });
       
       Zepto('.page1_text').addClass('page1_textin');


       Zepto('.car_lan').addClass('carl_in');
       Zepto('.car_hong').addClass('carh_in');


      Zepto('.page1').swipeUp(function(){
       	Zepto('.page2_bg2').addClass('page2_bg2o');
       	Zepto('.page2_text').addClass('page2_textin');

       });


      
       Zepto('.page3').swipeDown(function(){
       	Zepto('.page2_bg2').addClass('page2_bg2o');
       	Zepto('.page2_text').addClass('page2_textin');
       	setTimeout(function(){
       		Zepto('.page2_bg2').removeClass('page2_bg2o');
       	},1800);
        setTimeout(function(){
       		Zepto('.page2_bg2').addClass('page2_bg2o');
       	},3600);
       });



       Zepto('.page2').swipeUp(function(){
       	Zepto('.page3_text').addClass('page3_textin');
       	Zepto('.page3_bg2').addClass('page3_bg2o');
       });
       Zepto('.page4').swipeDown(function(){
       	Zepto('.page3_text').addClass('page3_textin');
       	Zepto('.page3_bg2').addClass('page3_bg2o');
       });
     
       
     

       Zepto('.page3').swipeUp(function(){
       	Zepto('.page4_text').addClass('page4_textin');
       	Zepto('.page4_bg').addClass('page4_bgi');
       	Zepto('.car4').addClass('car4in');
              Zepto('.nd').addClass('nd_wy');

       });
       Zepto('.page5').swipeDown(function(){
       	Zepto('.page4_text').addClass('page4_textin');
       	Zepto('.page4_bg').addClass('page4_bgi');
       	Zepto('.car4').addClass('car4in');
              Zepto('.nd').addClass('nd_wy');
       });


       Zepto('.page4').swipeUp(function(){
       	Zepto('.page5_text').addClass('page5_textin');
       });
       Zepto('.page6').swipeDown(function(){
       	Zepto('.page5_text').addClass('page5_textin');
       });
       



});




