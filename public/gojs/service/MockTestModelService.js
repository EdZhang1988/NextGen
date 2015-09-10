// This module is used for mock the client side aquire data from the server side

/**
 * This service is used for handle requests to get model for building the view
 */
var MockTestModelService = function() {

	function getDataModel(id, version) {
		//TODO suppose this should be the API for 
		var nodeDataArray = [{
			key: "-1",
			loc: "0 70",
			name: "Start",
			category: "Start"
		}, {
			key: "0",
			loc: "30 70",
			name: "Alpha",
			text: "input username",
			source: "cat1.png",
			actionType: "sendKey",
			parameter: {
				id: "input-box",
				value: "13800138000"
			}
		}, {
			key: "1",
			loc: "60 70",
			name: "Beta",
			text: "input password",
			source: "cat1.png"
		}, {
			key: "2",
			loc: "90 70",
			name: "Gamma",
			text: "select 'remember me'",
			source: "cat1.png"
		}, {
			key: "3",
			loc: "120 70",
			name: "Delta",
			text: "click 'login' button",
			source: ""
		}, {
			key: "4",
			loc: "150 70",
			name: "end",
			text: "End",
			category: "End"	
		}];

		var linkDataArray = [{
			from: "-1",
			to: "0",
			"fromPort": "B",
			"toPort": "T"
		}, {
			from: "0",
			to: "1",
			"fromPort": "B",
			"toPort": "T"
		}, {
			from: "1",
			to: "2",
			"fromPort": "B",
			"toPort": "T"
		}, {
			from: "2",
			to: "3",
			"fromPort": "B",
			"toPort": "T"
		}, {
			from: "3",
			to: "4",
			"fromPort": "B",
			"toPort": "T"
		}];

		return {
			'class': 'go.GraphLinksModel',
			'linkFromPortIdProperty': 'fromPort',
			'linkToPortIdProperty': 'toPort',
			'nodeDataArray': nodeDataArray,
			'linkDataArray': linkDataArray
		}

	}

	return {
		load: getDataModel
	};
}