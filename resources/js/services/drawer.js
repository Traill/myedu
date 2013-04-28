
/**
 * Services for layer view
 */

define(['jquery', 'app'], function ($, app) {
  


	app.service('drawer', function() {
		
		// Our service:
		var service = {};
		// An array of all registered event:
		var events = new Array();
		// Private current position:
		var is_open = true;

		service.on = function(name, callback){
			if(!events[name])
				events[name] = new Array();
			events[name].push(callback);
		}

		service.fire = function(name){
			var event = jQuery.Event(name);
			event.is_open = is_open;
			event.is_close = !is_open;
			$.each(events[name], function(i, callback){
				callback(event);
			});
		}

		service.open = function(){
			if(!is_open){
				is_open = true;
				service.fire('open');
			}
		}

		service.close = function(){
			if(is_open){
				is_open = false;
				service.fire('close');
			}
		}

		service.toggle = function(){
			
			if(is_open){
				service.close();
			}else{
				service.open();
			}
		}

		service.is_open = function(){
			return is_open;
		}


		return service;

	});
});