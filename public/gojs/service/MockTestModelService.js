// This module is used for mock the client side aquire data from the server side

/**
 * This service is used for handle requests to get model for building the view
 */
var MockTestModelService = function() {
	function getModelHeader(id, version) {
		var _projects = [{
			"id": "project_1",
			"text": "Demo Project",
			"children": true,
			"type": "root"
		}, {
			"id": "project_2",
			"text": "Amarosa",
			"type": "root"
		}];

		var _testSuites = [
			"Dead Link", {
				"id": "testsuit_1",
				"text": "Login",
				"children": [{
					"id": "testMode_1",
					"text": "Simple Test Case",
					"key":"simple",
					"type": "file"
				},{
					"id": "testMode_2",
					"text": "Complex Test Case",
					"key":"complex",
					"type": "file"
				}]
			}
		];

		return {
			projects: _projects,
			testSuites: _testSuites
		};
	}

	function getDataModel(id, version) {

		var result = requestJsonFromServer("ajax-test-suite-"+id);

		if (result) {
			return result;
		} else {
			return null;
		}
	}

	function requestJsonFromServer(id){
		if(!id){
			return null;
		}

		var result = {};
		
		result = $.ajax({
			url: 'gojs/data/testsuites/'+id+'.json',
			async: false,
			success: function(res){
				console.log("request success: "+id);
				console.log(res);
				return res;
			
			},
			error: function(res){
				return null;
			}
		});
		console.log(result.responseJSON);
		return result.responseJSON;
	}

	return {
		load: getDataModel,
		loadHeaders: getModelHeader
	};


}