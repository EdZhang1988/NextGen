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
		//TODO suppose this should be the API for 
		var dataSet = [];

		dataSet["simple"] = makeSimpleTestModel();
		dataSet["complex"] = makeComplexTestModel();

		if (dataSet[id]) {
			return dataSet[id];
		} else {
			return null;
		}
	}

	function makeSimpleTestModel() {
		var nodeDataArray = [{
			key: "-1",
			loc: "0 70",
			name: "Start",
			category: "Start"
		}, {
			key: "0",
			loc: "0 120",
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
			loc: "30 170",
			name: "Beta",
			text: "input password",
			source: "cat1.png"
		}, {
			key: "2",
			loc: "0 220",
			name: "Gamma",
			text: "select 'remember me'",
			source: "cat1.png"
		}, {
			key: "3",
			loc: "0 270",
			name: "Delta",
			text: "click 'login' button",
			source: ""
		}, {
			key: "4",
			loc: "0 320",
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

	function makeComplexTestModel() {
		return {
			"class": "go.GraphLinksModel",
			"linkFromPortIdProperty": "fromPort",
			"linkToPortIdProperty": "toPort",
			"nodeDataArray": [{
				"key": "-1",
				"loc": "-26 -63",
				"name": "Start",
				"category": "Start",
			}, {
				"key": "0",
				"loc": "-81 108",
				"name": "Alpha",
				"text": "input username",
				"source": "cat1.png",
				"actionType": "sendKey",
				"parameter": {
					"id": "input-box",
					"value": "13800138000"
				},
			}, {
				"key": "1",
				"loc": "-16 163.99999999999991",
				"name": "Beta",
				"text": "input password",
				"source": "cat1.png",
			}, {
				"key": "2",
				"loc": "-15.999999999999993 218.99999999999991",
				"name": "Gamma",
				"text": "select 'remember me'",
				"source": "cat1.png",
			}, {
				"key": "3",
				"loc": "-16 273.0000000000001",
				"name": "Delta",
				"text": "click 'login' button",
				"source": "",
			}, {
				"key": "4",
				"loc": "-16 391",
				"name": "end",
				"text": "End",
				"category": "End",
			}, {
				"category": "Precondition",
				"text": "Precondition",
				"key": -7,
				"loc": "-25.953125 12",
			}, {
				"text": "isPageOpen",
				"figure": "Diamond",
				"category":"LogicControl",
				"key": -3,
				"loc": "-24.953125 71",
			}, {
				"text": "Assert",
				"category": "Assertion",
				"key": -4,
				"loc": "-121.953125 193",
			}, {
				"text": "Assert",
				"category": "Assertion",
				"key": -10,
				"loc": "-15.953125 328",
			}],
			"linkDataArray": [{
				"from": "2",
				"to": "3",
				"fromPort": "B",
				"toPort": "T",
				"__gohashid": 2059,
				"points": {
					"__gohashid": 72195,
					"Qa": true,
					"q": [{
						"x": -16,
						"y": 235,
						"Qa": true
					}, {
						"x": -16,
						"y": 245,
						"Qa": true
					}, {
						"x": -16,
						"y": 246,
						"Qa": true
					}, {
						"x": -16,
						"y": 246,
						"Qa": true
					}, {
						"x": -16,
						"y": 247,
						"Qa": true
					}, {
						"x": -16,
						"y": 257,
						"Qa": true
					}],
					"W": 14,
					"Dd": null,
					"eo": null
				}
			}, {
				"__gohashid": 10037,
				"from": "-1",
				"to": -7,
				"fromPort": "B",
				"toPort": "T",
				"points": {
					"__gohashid": 37776,
					"Qa": true,
					"q": [{
						"x": -26.000000000000014,
						"y": -30.598485192587205,
						"Qa": true
					}, {
						"x": -26.000000000000014,
						"y": -20.598485192587205,
						"Qa": true
					}, {
						"x": -26.000000000000014,
						"y": -19.299242596293603,
						"Qa": true
					}, {
						"x": -25.953125000000007,
						"y": -19.299242596293603,
						"Qa": true
					}, {
						"x": -25.953125000000007,
						"y": -18,
						"Qa": true
					}, {
						"x": -25.953125000000007,
						"y": -8,
						"Qa": true
					}],
					"W": 14,
					"Dd": null,
					"eo": null
				}
			}, {
				"__gohashid": 38014,
				"from": -7,
				"to": -3,
				"fromPort": "B",
				"toPort": "T",
				"points": {
					"__gohashid": 40229,
					"Qa": true,
					"q": [{
						"x": -25.953125000000007,
						"y": 32,
						"Qa": true
					}, {
						"x": -25.953125000000007,
						"y": 42,
						"Qa": true
					}, {
						"x": -25.453125000000004,
						"y": 42,
						"Qa": true
					}, {
						"x": -25.453125000000004,
						"y": 36.58798828125,
						"Qa": true
					}, {
						"x": -24.953125,
						"y": 36.58798828125,
						"Qa": true
					}, {
						"x": -24.953125,
						"y": 46.58798828125,
						"Qa": true
					}],
					"W": 14,
					"Dd": null,
					"eo": null
				}
			}, {
				"__gohashid": 40333,
				"from": -3,
				"to": "0",
				"fromPort": "L",
				"toPort": "T",
				"text": "true",
				"visible":true,
				"points": {
					"__gohashid": 57225,
					"Qa": true,
					"q": [{
						"x": -57.61083984375,
						"y": 71,
						"Qa": true
					}, {
						"x": -67.61083984375,
						"y": 71,
						"Qa": true
					}, {
						"x": -81,
						"y": 71,
						"Qa": true
					}, {
						"x": -81,
						"y": 76.5,
						"Qa": true
					}, {
						"x": -81,
						"y": 82,
						"Qa": true
					}, {
						"x": -81,
						"y": 92,
						"Qa": true
					}],
					"W": 14,
					"Dd": null,
					"eo": null
				}
			}, {
				"__gohashid": 46334,
				"from": -3,
				"to": "4",
				"fromPort": "R",
				"toPort": "R",
				"text": "false",
				"visible":true,
				"points": {
					"__gohashid": 75461,
					"Qa": true,
					"q": [{
						"x": 7.70458984375,
						"y": 71,
						"Qa": true
					}, {
						"x": 17.70458984375,
						"y": 71,
						"Qa": true
					}, {
						"x": 20,
						"y": 71,
						"Qa": true
					}, {
						"x": 20,
						"y": 71,
						"Qa": true
					}, {
						"x": 60,
						"y": 71,
						"Qa": true
					}, {
						"x": 60,
						"y": 391,
						"Qa": true
					}, {
						"x": 22.437068495639537,
						"y": 391,
						"Qa": true
					}, {
						"x": 12.437068495639537,
						"y": 391,
						"Qa": true
					}],
					"W": 18,
					"Dd": null,
					"eo": null
				}
			}, {
				"__gohashid": 57384,
				"from": "0",
				"to": "1",
				"fromPort": "B",
				"toPort": "T",
				"points": {
					"__gohashid": 68776,
					"Qa": true,
					"q": [{
						"x": -81,
						"y": 124,
						"Qa": true
					}, {
						"x": -81,
						"y": 134,
						"Qa": true
					}, {
						"x": -81,
						"y": 136,
						"Qa": true
					}, {
						"x": -16,
						"y": 136,
						"Qa": true
					}, {
						"x": -16,
						"y": 138,
						"Qa": true
					}, {
						"x": -16,
						"y": 148,
						"Qa": true
					}],
					"W": 14,
					"Dd": null,
					"eo": null
				}
			}, {
				"__gohashid": 69354,
				"from": "1",
				"to": -4,
				"fromPort": "L",
				"toPort": "T",
				"points": {
					"__gohashid": 71406,
					"Qa": true,
					"q": [{
						"x": -63.140380859375,
						"y": 164,
						"Qa": true
					}, {
						"x": -73.140380859375,
						"y": 164,
						"Qa": true
					}, {
						"x": -121.953125,
						"y": 164,
						"Qa": true
					}, {
						"x": -121.953125,
						"y": 165.07910257854803,
						"Qa": true
					}, {
						"x": -121.953125,
						"y": 166.15820515709603,
						"Qa": true
					}, {
						"x": -121.953125,
						"y": 176.15820515709603,
						"Qa": true
					}],
					"W": 14,
					"Dd": null,
					"eo": null
				}
			}, {
				"__gohashid": 70391,
				"from": -4,
				"to": "2",
				"fromPort": "B",
				"toPort": "L",
				"points": {
					"__gohashid": 71486,
					"Qa": true,
					"q": [{
						"x": -121.953125,
						"y": 209.84179484290397,
						"Qa": true
					}, {
						"x": -121.953125,
						"y": 219.84179484290397,
						"Qa": true
					}, {
						"x": -121.953125,
						"y": 219.84179484290397,
						"Qa": true
					}, {
						"x": -88.313720703125,
						"y": 219.84179484290397,
						"Qa": true
					}, {
						"x": -88.313720703125,
						"y": 219,
						"Qa": true
					}, {
						"x": -78.313720703125,
						"y": 219,
						"Qa": true
					}],
					"W": 14,
					"Dd": null,
					"eo": null
				}
			}, {
				"__gohashid": 76044,
				"from": "3",
				"to": -10,
				"fromPort": "B",
				"toPort": "T",
				"points": {
					"__gohashid": 76577,
					"Qa": true,
					"q": [{
						"x": -16,
						"y": 289,
						"Qa": true
					}, {
						"x": -16,
						"y": 299,
						"Qa": true
					}, {
						"x": -16,
						"y": 300.07910257854803,
						"Qa": true
					}, {
						"x": -15.953125000000007,
						"y": 300.07910257854803,
						"Qa": true
					}, {
						"x": -15.953125000000007,
						"y": 301.15820515709606,
						"Qa": true
					}, {
						"x": -15.953125000000007,
						"y": 311.15820515709606,
						"Qa": true
					}],
					"W": 14,
					"Dd": null,
					"eo": null
				}
			}, {
				"__gohashid": 76687,
				"from": -10,
				"to": "4",
				"fromPort": "B",
				"toPort": "T",
				"points": {
					"__gohashid": 76701,
					"Qa": true,
					"q": [{
						"x": -15.953125000000007,
						"y": 344.841794842904,
						"Qa": true
					}, {
						"x": -15.953125000000007,
						"y": 354.841794842904,
						"Qa": true
					}, {
						"x": -15.976562500000004,
						"y": 354.841794842904,
						"Qa": true
					}, {
						"x": -15.976562500000004,
						"y": 352.56293150436045,
						"Qa": true
					}, {
						"x": -16,
						"y": 352.56293150436045,
						"Qa": true
					}, {
						"x": -16,
						"y": 362.56293150436045,
						"Qa": true
					}],
					"W": 8,
					"Dd": null,
					"eo": null
				}
			}]
		};
	}

	return {
		load: getDataModel,
		loadHeaders: getModelHeader
	};


}