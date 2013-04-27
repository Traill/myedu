'use strict';


define(['app', "jquery", "services/drawer"], function ( app, $ ) {
	
	app.directive('ngClose', function($document, drawer) {
	    
	    

	    return function(scope, element, attr) {
	    	

	    	var btn = element.find('.close_btn');

	    	drawer.on('open', function(){
	    		scope.close = false;
	    		element.animate({"margin-left": 0}, 300, function(){
	    			//console.log('ok');
	    		});

	    		scope.$digest();
	    	});

	    	drawer.on('close', function(){
	    		scope.close = true;
	    		element.animate({"margin-left": -300}, 300, function(){
	    			//console.log('ok');
	    		});
	    		scope.$digest();
	    	}); 
	    	btn.bind('click', drawer.toggle );
	    }

	});
});