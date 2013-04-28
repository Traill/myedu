'use strict';


define(['app', 'services/layers', 'services/viewLayer'], function ( app, layers ) {
	

	

	app.directive('ngSlider', function(layers, viewLayer) {
	    var our_layer = null,
	    	nb = 0,
	    	h = 0;

	    var ctrl = function(){
	    	this.getNb = function(){
	    		return nb;
	    	}
	    	this.getH = function(){
	    		return h;
	    	}
	    }

	    return {
	    	restrict: 'E',
	    	replace: true,
	    	controller: ctrl,
	    	template: '<div class="slider_w"><div id="slider">		<div class="slide">	 <div class="clearfix"></div> <a class="knob" ng-slide></a>	</div></div><div id="names"></div><div class="label-pf">LYR</div></div>',
		    link: function(scope, element, attr) {
		    	
		    	var my_slider = element.find('#slider');
		    	our_layer = layers.getName(),
		    		nb = our_layer.length,
		    		h = Math.floor(my_slider.height() / (nb + 1));
		    	
		    
		    	for (var i = 0; i < nb+1; i++) {
		    		
		    		if( i < nb )
		    			$('#slider').children(0).append($('<div class="part l" style="margin-top:' + (h-8) +'px;height:8px;cursor:pointer;"></div>'));
		    		else
		    			$('#slider').children(0).append($('<div class="part" style="height:' + h +'px;"></div>'));
		    	};
		    	

		    	$('#slider .part').click(function(e){
		    			viewLayer.setPos(  Math.floor($(this).position().top/h) / nb * 100 );
		    	});


		    }
		}

	});
});