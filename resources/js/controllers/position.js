define(["jquery", "radio", "params","util/array", "ajax/loadPos/default"], function ($, radio, config, arrrr, res) {

	//////////////////////////////////////////////
	//											//
	//               Interface					//
	//											//
	//////////////////////////////////////////////
	var position = {};

	
	//////////////////////////////////////////////
	//											//
	//               Properties					//
	//											//
	//////////////////////////////////////////////

	// Will be something like:
	// {"ididididid": {'x':12, 'y': 13}, ... }
	var pos_data = res ? res: {} ;

	//////////////////////////////////////////////
	//											//
	//                Events					//
	//											//
	//////////////////////////////////////////////
	events = function() {

		// Listen for adding and deleting a filter
		radio("graph:changed").subscribe(position.save);

	}

	//////////////////////////////////////////////
	//											//
	//              Initialize					//
	//											//
	//////////////////////////////////////////////
	position.init = function() {
			// Nothing here

			return this;
	}

	//////////////////////////////////////////////
	//											//
	//            Public Functions				//
	//											//
	//////////////////////////////////////////////
	


		
	// Get 
	position.get = function(id){
		return pos_data[id];
	}
	


	// Save data
	position.save = function(nodes, id) {
		if(!id) id = "default";
		//if (config['save_position']) return
		data = {};
		// Get the position of the node.
		nodes.forEach(function(el){
			data[el.id] = {'x': el.x, 'y': el.y}
		});
		// Save with ajax
		$.ajax({
			type: "POST",
			url: "ajax/savePos/"+id,
			data: { data: JSON.stringify(data) },
			success: function (response) { /* nothing */ },
			dataType: "json"
		});
	}

	//////////////////////////////////////////////
	//											//
	//           Private Functions				//
	//											//
	//////////////////////////////////////////////

	// Loads the position
	position.load = function(id) {

		
		// Make ajax call to get data
		$.getJSON("ajax/loadPos/"+id, function (response) {

			if (response) {
				pos_data = response;
			}
		});

		return pos_data
	}

	//////////////////////////////////////////////
	//											//
	//            Return Interface				//
	//											//
	//////////////////////////////////////////////

	events();
	return position.init();
})
