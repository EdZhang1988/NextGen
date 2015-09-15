var GO = go.GraphObject.make;

var TOD = TOD || {};
TOD.gojs = TOD.gojs || {};

TOD.gojs.testModelService = new MockTestModelService();

// Initialization for canvas part

TOD.gojs.myDiagram = GO(go.Diagram, "myDiagramDiv", {
	initialContentAlignment: go.Spot.Top, // center Diagram contents
	allowDrop: true,
	initialAutoScale: go.Diagram.Uniform,
	"LinkDrawn": showLinkLabel, // this DiagramEvent listener is defined below
	"LinkRelinked": showLinkLabel,
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

// Make link labels visible if coming out of a "conditional" node.
// This listener is called by the "LinkDrawn" and "LinkRelinked" DiagramEvents.
function showLinkLabel(e) {
	var label = e.subject.findObject("LABEL");
	if (label !== null) 
		label.visible = (e.subject.fromNode.data.figure === "Diamond" || e.subject.fromNode.data.category === "Assertion" );
}

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

TOD.gojs.myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
TOD.gojs.myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

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
	}])
});

var myOverview = GO(go.Overview, "myOverviewDiv", {
	observed: TOD.gojs.myDiagram
});

// var myModel = GO(go.GraphLinksModel);
// in our model data, each node is represented by a JavaScript object:

var dataSet = TOD.gojs.testModelService.load('complex');

// myDiagram.model = myModel;
TOD.gojs.myDiagram.model = go.Model.fromJson(dataSet);

$("#detail-dialog").dialog({
	autoOpen: false,
	modal: true
});

$("#load-dialog").dialog({
	autoOpen: false,
	modal: true
});

$('#btn_diagram_export_json')[0].onclick = function exportDiagramDataToJson() {
	var nodes = [],
		links = [];
	var result = {};

	TOD.gojs.myDiagram.nodes.each(function(e) {
		nodes.push(e.data);
	});

	TOD.gojs.myDiagram.links.each(function(e) {
		links.push(e.data);
	});

	result = {
		'class': 'go.GraphLinksModel',
		'linkFromPortIdProperty': 'fromPort',
		'linkToPortIdProperty': 'toPort',
		'nodeDataArray': nodes,
		'linkDataArray': links
	}

	console.log(JSON.stringify(result));
}

$('#btn_load_diagrams')[0].onclick = function() {
	function initTestModelLoader() {
		var $loader = $("#test-model-selector");

		// var data = MockTestModelService().loadHeaders();

		TOD.gojs.modelLoader = $loader.jstree({
			"core": {
				"animation": 0,
				"check_callback": true,
				"themes": {
					"stripes": true
				},
				'data': {
					'url': function(node) {
						return node.id === '#' ?
							"gojs/data/ajax-project-header.json" : "gojs/data/ajax-testsuite-header.json";
					},
					'data': function(node) {
						return {
							'id': node.id
						};
					}
				}
			},
			"types": {
				"#": {
					"max_children": 1,
					"max_depth": 4,
					"valid_children": ["root"]
				},
				"root": {
					'icon': "glyphicon glyphicon-bookmark",
					"valid_children": ["default"]
				},
				"default": {
					"valid_children": ["default", "file"],
					"icon": "glyphicon glyphicon-book"
				},
				"file": {
					"icon": "glyphicon glyphicon-file",
					"valid_children": []
				}
			},
			'plugins': [
				"state", "types", "wholerow", "dnd"
			]
		});

		TOD.gojs.modelLoader.on("select_node.jstree", function(e, node) {
			TOD.gojs.selectedModelNode = node.node;
		})
	}

	if (!TOD.gojs.selectedModelNode) {
		initTestModelLoader();
	}

	$('#load-dialog').dialog('open');
}

function loadModalClose() {
	$('#load-dialog').dialog('close');
}

function openTestSuite() {
	function loadModelFromSelection() {
		var key = TOD.gojs.selectedModelNode.original.key;
		// console.log(TOD.gojs.testModelService.load(key));
		try {
			TOD.gojs.myDiagram.model = go.Model.fromJson(TOD.gojs.testModelService.load(key));
		} catch (e) {
			return false
		}

		return true;
	}

	if (!loadModelFromSelection()) {
		return;
	}
	loadModalClose();
}

$('#btn_new_diagram')[0].onclick = function() {
	if (TOD.gojs.myDiagram.isModified) {
		$.confirm({
			text: "You've modifed the diagram, proceed will discard all your changes",
			confirm: function() {
				TOD.gojs.myDiagram.clear();
			},
			cancel: function() {
				// nothing to do
			}
		});
	} else {
		TOD.gojs.myDiagram.clear();
	}
}