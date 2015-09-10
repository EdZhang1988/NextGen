$('document').ready(function(){

	var GO = go.GraphObject.make;

	var TOD = TOD || {}; 
	TOD.gojs = TOD.gojs || {}; 
	
	TOD.gojs.myDiagram = GO(go.Diagram, "myDiagramDiv", {
		initialContentAlignment: go.Spot.Center, // center Diagram contents
		allowDrop: true,

		layout: GO(go.TreeLayout, {
			angle: 90,
			layerSpacing: 35
		}),
		autoScale: go.Diagram.Uniform,
		"undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
	});


	function nodeStyle() {
		return [
			// The Node.location comes from the "loc" property of the node data,
			// converted by the Point.parse static method.
			// If the Node.location is changed, it updates the "loc" property of the node data,
			// converting back using the Point.stringify static method.
			new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify), {
				// the Node.location is at the center of each node
				locationSpot: go.Spot.Center,
				// handle mouse enter/leave events to show/hide the ports
				mouseEnter: function(e, obj) {
					showPorts(obj.part, true);
				},
				mouseLeave: function(e, obj) {
					showPorts(obj.part, false);
				},
				doubleClick: showDetail
			}
		];
	}

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

	TOD.gojs.myDiagram.nodeTemplateMap.add("",
		GO(go.Node, "Spot", nodeStyle(),
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
						font: "bold 16px sans-serif"
					},
					// TextBlock.text is data bound to the "name" attribute of the model data
					new go.Binding("text").makeTwoWay())
			),
			makePort("T", go.Spot.Top, false, true),
			makePort("L", go.Spot.Left, true, true),
			makePort("R", go.Spot.Right, true, true),
			makePort("B", go.Spot.Bottom, true, false)
		)
	);

	TOD.gojs.myDiagram.nodeTemplateMap.add("Start",
		GO(go.Node, "Spot", nodeStyle(),
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
						font: "bold 16px sans-serif"
					},
					new go.Binding("text")
				)
			),
			makePort("L", go.Spot.Left, true, false),
			makePort("R", go.Spot.Right, true, false),
			makePort("B", go.Spot.Bottom, true, false)
		)
	);

	TOD.gojs.myDiagram.nodeTemplateMap.add("Assertion",
		GO(go.Node, "Spot", nodeStyle(),
			GO(go.Panel, "Auto",
				GO(go.Shape, "RoundedRectangle", {
					minSize: new go.Size(32, 32),
					fill: "orange",
					stroke: null
				}),
				GO(go.TextBlock, "Assert", {
						margin: 6,
						stroke: "white",
						font: "bold 16px sans-serif"
					},
					new go.Binding("text").makeTwoWay())
			),
			makePort("T", go.Spot.Top, false, true),
			makePort("L", go.Spot.Left, true, true),
			makePort("R", go.Spot.Right, true, true),
			makePort("B", go.Spot.Bottom, true, false)
		)
	);

	TOD.gojs.myDiagram.nodeTemplateMap.add("End",
		GO(go.Node, "Spot", nodeStyle(),
			GO(go.Panel, "Auto",
				GO(go.Shape, "Circle", {
					minSize: new go.Size(32, 32),
					fill: "lightgreen",
					stroke: null
				}),
				GO(go.TextBlock, "Start", {
						margin: 6,
						stroke: "white",
						font: "bold 16px sans-serif"
					},
					new go.Binding("text"))
			),
			makePort("L", go.Spot.Left, false, true),
			makePort("R", go.Spot.Right, false, true),
			makePort("T", go.Spot.Top, false, true)
		)
	);

	TOD.gojs.myDiagram.nodeTemplateMap.add("Predef_Step",
		GO(go.Node, "Spot", nodeStyle(),
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
			makePort("L", go.Spot.Left, false, true),
			makePort("R", go.Spot.Right, false, true),
			makePort("T", go.Spot.Top, false, true)
		)
	);


	// myDiagram.addDiagramListener("ObjectDoubleClicked", showDetail);

	function showDetail(e, node, t) {
		if (node !== null) {
			$("#detail-dialog").dialog("open");
			// alert("The node is double clicked");
			console.log(node.data);

		}
	}

	function modalClose(e) {
		console.log(e);
		$("#detail-dialog").dialog("close");

	}
	/*
	    	myDiagram.nodeTemplate = GO(go.Node, "Horizontal", { background: "#44CCFF"},
					GO(go.Shape, "Rectangle", {}),
					GO(go.Picture,
				      // Pictures should normally have anxplicit width and height.
				      // This picture has a red background, only visible when there is no source set
				      // or when the image is partially transparent.
				      { margin: 5, width: 30, height: 30, background: "red" },
				      // Picture.source is data bound to the "source" attribute of the model data
				      new go.Binding("source")),
				    GO(go.TextBlock,
				      "Default Text",  // the initial value for TextBlock.text
				      // some room around the text, a larger font, and a white stroke:
				      { margin: 6, stroke: "white", font: "bold 16px sans-serif" },
				      // TextBlock.text is data bound to the "name" attribute of the model data
				      new go.Binding("text", "name"))
				  );
	*/
	/*
    		myDiagram.linkTemplate = 
    		GO(go.Link, {routing: go.Link.Orthogonal, corner: 5}, 
				GO(go.Shape, {strokeWidth:3, stroke: "#555"})); */
	TOD.gojs.myDiagram.linkTemplate =
		GO(go.Link, // the whole link panel
		{
			routing: go.Link.AvoidsNodes,
			curve: go.Link.JumpOver,
			corner: 5,
			toShortLength: 4,
			relinkableFrom: true,
			relinkableTo: true,
			reshapable: true,
			resegmentable: true,
			// mouse-overs subtly highlight links:
			mouseEnter: function(e, link) {
				link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)";
			},
			mouseLeave: function(e, link) {
				link.findObject("HIGHLIGHT").stroke = "transparent";
			}
		},
		new go.Binding("points").makeTwoWay(),
		GO(go.Shape, // the highlight shape, normally transparent
			{
				isPanelMain: true,
				strokeWidth: 8,
				stroke: "transparent",
				name: "HIGHLIGHT"
			}),
		GO(go.Shape, // the link path shape
			{
				isPanelMain: true,
				stroke: "gray",
				strokeWidth: 2
			}),
		GO(go.Shape, // the arrowhead
			{
				toArrow: "standard",
				stroke: null,
				fill: "gray"
			}),
		GO(go.Panel, "Auto", // the link label, normally not visible
			{
				visible: false,
				name: "LABEL",
				segmentIndex: 2,
				segmentFraction: 0.5
			},
			new go.Binding("visible", "visible").makeTwoWay(),
			GO(go.Shape, "RoundedRectangle", // the label shape
				{
					fill: "#F8F8F8",
					stroke: null
				}),
			GO(go.TextBlock, "Yes", // the label
				{
					textAlign: "center",
					font: "10pt helvetica, arial, sans-serif",
					stroke: "#333333",
					editable: true
				},
				new go.Binding("text", "text").makeTwoWay())
		)
	);

	var myPalette = GO(go.Palette, "myPalette", {
		nodeTemplateMap: TOD.gojs.myDiagram.nodeTemplateMap,
		model: new go.GraphLinksModel([{
			category: "Start",
			text: "Start"
		}, {
			text: "Step"
		}, {
			text: "???",
			figure: "Diamond"
		}, {
			text: "Assert",
			category: "Assertion"
		}, {
			category: "End",
			text: "End"
		}])
	});

	var groupPalette = GO(go.Palette, "palette-group", {
		nodeTemplateMap: TOD.gojs.myDiagram.nodeTemplateMap,
		model: new go.GraphLinksModel([{
				category: "Predef_Step",
				text: "Predefined Step"
			}

		])
	});

	// var myModel = GO(go.GraphLinksModel);
	// in our model data, each node is represented by a JavaScript object:

	var dataSet = new MockTestModelService().load();

	// myDiagram.model = myModel;
	TOD.gojs.myDiagram.model = go.Model.fromJson(dataSet);

	$("#detail-dialog").dialog({
		autoOpen: false,
		modal: true
	});
}());