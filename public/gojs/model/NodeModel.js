var TOD = TOD || {};
TOD.gojs = TOD.gojs || {};
TOD.gojs.NodeModels = {};

function makePort(name, spot, output, input) {
	return GO(go.Shape, "Circle", {
		fill: "transparent",
		stroke: null,
		desiredSize: new go.Size(8, 8),
		alignment: spot,
		alignmentFocus: spot,
		portId: name,
		fromSpot: spot,
		toSpot: spot,
		fromLinkable: output,
		toLinkable: input,
		cursor: "pointer"
	});
}

// Make all ports on a node visible when the mouse is over the node
function showPorts(node, show) {
	var diagram = node.diagram;
	if (!diagram || diagram.isReadOnly || !diagram.allowLink)
		return;
	node.ports.each(function(port) {
		port.stroke = (show ? "white" : null);
	});
}

function nodeStyle() {
	return [
		// The Node.location comes from the "loc" property of the node data,
		// converted by the Point.parse static method.
		// If the Node.location is changed, it updates the "loc" property of the node data,
		// converting back using the Point.stringify static method.
		{
			// the Node.location is at the center of each node
			locationSpot: go.Spot.Center,
			locationObjectName:"SHAPE",
			resizable: true,
			//isShadowed: true,
			//shadowColor: "#888",
			// handle mouse enter/leave events to show/hide the ports
			mouseEnter: function(e, obj) {
				showPorts(obj.part, true);
			},
			mouseLeave: function(e, obj) {
				showPorts(obj.part, false);
			},
			click: function(e, node) {
				console.log(node.data);
				console.log(node.position);
			}
		}, new go.Binding("location", "loc", go.Point.parse ).makeTwoWay(go.Point.stringify)
	];
}

TOD.gojs.NodeModels.getNodeModel = function ( modelName ){
	try {
		var target = TOD.gojs.NodeModels[modelName]();
	
		if(target.name){
			return target.init();
		}
	} catch (e){
		console.log("invalid modelName");
	}
	return null;
}

TOD.gojs.NodeModels.ActionNode = function() {
	function nodeSpecific(){
		var _nodeStyle = nodeStyle();
		events = _nodeStyle[0];
		events.doubleClick = function (e, node){
			// console.log("events binding for actionNode");
			TOD.gojs.selectedNode = node;
			console.log("dblClicked");
			console.log(node.data)
			TOD.gojs.detailDialog.setState({
				mode:"display",
				data: node.data
			});
			$("#detail-dialog").dialog("open");
		}
		return _nodeStyle;
	}

	function init() {
		return GO(go.Node, "Spot", nodeSpecific(),
			GO(go.Panel, "Auto",
				GO(go.Shape, "Rectangle", {
					minSize: new go.Size(32, 32),
					fill: "#00A9C9",
					stroke: null
				}, new go.Binding("figure", "figure")),
				GO(go.TextBlock,
					// some room around the text, a larger font, and a white stroke:
					{
						margin: 6,
						stroke: "white",
						font: "bold 11px sans-serif",
						maxSize: new go.Size(160, NaN)
					},
					// TextBlock.text is data bound to the "name" attribute of the model data
					new go.Binding("text").makeTwoWay())
			),
			makePort("T", go.Spot.Top, false, true),
			makePort("L", go.Spot.Left, true, true),
			makePort("R", go.Spot.Right, true, true),
			makePort("B", go.Spot.Bottom, true, false)
		)
	}

	return {
		name: "actionNode",
		'init': init
	};
};

TOD.gojs.NodeModels.StartNode = function(){
	function init(){
		return GO(go.Node, "Spot", nodeStyle(),
			GO(go.Panel, "Auto",
				GO(go.Shape, "Circle", {
					minSize: new go.Size(32, 32),
					fill: "#8800C9",
					stroke: null
				}),
				GO(go.TextBlock,
					"Start", // the initial value for TextBlock.text
					{
						margin: 6,
						stroke: "white",
						font: "bold 14px sans-serif"
					},
					new go.Binding("text")
				)
			),
			makePort("L", go.Spot.Left, true, false),
			makePort("R", go.Spot.Right, true, false),
			makePort("B", go.Spot.Bottom, true, false)
		)
	}

	return {
		name: "startNode",
		'init': init
	};
};

TOD.gojs.NodeModels.EndNode = function (){
	function init(){
		return 	GO(go.Node, "Spot", nodeStyle(),
			GO(go.Panel, "Auto",
				GO(go.Shape, "Circle", {
					minSize: new go.Size(32, 32),
					fill: "lightgreen",
					stroke: null
				}),
				GO(go.TextBlock, "Start", {
						margin: 6,
						stroke: "white",
						font: "bold 14px sans-serif"
					},
					new go.Binding("text"))
			),
			makePort("L", go.Spot.Left, false, true),
			makePort("R", go.Spot.Right, false, true),
			makePort("T", go.Spot.Top, false, true)
		)
	}

	return {
		name: "endNode",
		'init': init
	};
}

TOD.gojs.NodeModels.AssertNode = function (){
	function nodeSpecific(){
		var _nodeStyle = nodeStyle();
		events = _nodeStyle[0];
		events.doubleClick = function (e, node){
			console.log("events binding for assertNode");
			TOD.gojs.selectedNode = node;
			
			TOD.gojs.detailDialog.setState({
				mode:"display",
				data: node.data
			});
			$("#detail-dialog").dialog("open");
		}
		return _nodeStyle;
	}

	function init(){
		return GO(go.Node, "Spot", nodeSpecific(),
			GO(go.Panel, "Auto",
				GO(go.Shape, "RoundedRectangle", {
					minSize: new go.Size(32, 32),
					fill: "orange",
					stroke: null
				}),
				GO(go.TextBlock, "Assert", {
						margin: 6,
						stroke: "white",
						font: "bold 14px sans-serif"
					},
					new go.Binding("text").makeTwoWay())
			),
			makePort("T", go.Spot.Top, false, true),
			makePort("L", go.Spot.Left, true, true),
			makePort("R", go.Spot.Right, true, true),
			makePort("B", go.Spot.Bottom, true, false)
		)
	}

	return {
		name: "assertNode",
		'init': init
	};
}

TOD.gojs.NodeModels.PredefinedNode = function (){
	function nodeSpecific(){
		var _nodeStyle = nodeSpecific();
		events = _nodeStyle[0];
		events.doubleClick = function (e, node){
			console.log("events binding for assertNode");
		}
		return _nodeStyle;
	}

	function init(){
		return GO(go.Node, "Spot", nodeStyle(),
			GO(go.Panel, "Auto",
				GO(go.Shape, "RoundedRectangle", {
					minSize: new go.Size(40, 40),
					fill: "black",
					stroke: null
				}),
				GO(go.TextBlock, "Defined step", {
						margin: 6,
						stroke: "white",
						font: "bold 12px sans-serif"
					},
					new go.Binding("text").makeTwoWay())
			),
			makePort("T", go.Spot.Top, false, true),
			makePort("L", go.Spot.Left, true, true),
			makePort("R", go.Spot.Right, true, true),
			makePort("B", go.Spot.Bottom, true, false)
		)
	}

	return {
		name: "predefinedNode",
		'init': init
	};
}

TOD.gojs.NodeModels.PreconditionNode = function (){
	function nodeSpecific(){
		var _nodeStyle = nodeSpecific();
		events = _nodeStyle[0];
		events.doubleClick = function (e, node){
			console.log("events binding for assertNode");
		}
		return _nodeStyle;
	}

	function init(){
		return GO(go.Node, "Spot", nodeStyle(),
			GO(go.Panel, "Auto",
				GO(go.Shape, "RoundedRectangle", {
					minSize: new go.Size(40, 40),
					fill: "#E95055",
					stroke: null
				}),
				GO(go.TextBlock, "Defined step", {
						margin: 6,
						stroke: "white",
						font: "bold 12px sans-serif",
					},
					new go.Binding("text").makeTwoWay())
			),
			makePort("T", go.Spot.Top, false, true),
			makePort("L", go.Spot.Left, true, true),
			makePort("R", go.Spot.Right, true, true),
			makePort("B", go.Spot.Bottom, true, false)
		)
	}

	return {
		name: "preconditionNode",
		'init': init
	};
}


// Thinking about the possibility of template

