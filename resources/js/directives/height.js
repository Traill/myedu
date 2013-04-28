'use strict';


define(['app', "jquery"], function ( app, $ ) {

	app.directive('ngHeight', function($document) {

		return function(scope, element, attrs) {

			var scale_format = attrs.ngHeight;
			
			var cpt_height = function(){
				var win_height = $(window).height();
				element.height(eval(scale_format.replace('win', win_height)));
			}
			cpt_height();
	
			([$(window), $(document)]).forEach(function(a){
					a.resize(function(){
					cpt_height();
				});
			});
		};
	});
});