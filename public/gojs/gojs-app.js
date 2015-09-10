var GO = go.GraphObject.make;

var TOD = TOD || {};
TOD.gojs = TOD.gojs || {};


// Initialization for canvas part

TOD.gojs.myDiagram = GO(go.Diagram, "myDiagramDiv", {
	initialContentAlignment: go.Spot.Top, // center Diagram contents
	allowDrop: true,

	layout: GO(go.TreeLayout, {
		angle: 90,
		layerSpacing: 35
	}),
	autoScale: go.Diagram.Uniform,
	"undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
});

TOD.gojs.myDiagram.nodeTemplateMap.add("",
	TOD.gojs.NodeModels.getNodeModel("ActionNode")
);

TOD.gojs.myDiagram.nodeTemplateMap.add("Start",
	TOD.gojs.NodeModels.getNodeModel("StartNode")
);

TOD.gojs.myDiagram.nodeTemplateMap.add("Assertion",
	TOD.gojs.NodeModels.getNodeModel("AssertNode")
);

TOD.gojs.myDiagram.nodeTemplateMap.add("End",
	TOD.gojs.NodeModels.getNodeModel("EndNode")
);

TOD.gojs.myDiagram.nodeTemplateMap.add("Predef_Step",
	TOD.gojs.NodeModels.getNodeModel("PredefinedNode")
);

TOD.gojs.myDiagram.nodeTemplateMap.add("Precondition",
	TOD.gojs.NodeModels.getNodeModel("PreconditionNode")
);


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
			category: "Precondition",
			text: "Precondition"
		}, {
			category: "Predef_Step",
			text: "Predefined Step"
		}
	])
});

var myOverview = GO( go.Overview, "myOverviewDiv", {
	observed: TOD.gojs.myDiagram
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

