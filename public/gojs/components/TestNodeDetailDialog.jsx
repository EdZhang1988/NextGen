var TestNodeDetailDialog = React.createClass({
	getInitialState: function () {
		console.log("init dialog")
		return {
			mode: "display",
			data: {
				data: {}
			}
		};
	},
	// componentDidMount: function (){
	// 	console.log("componentDidMount");
	// },
	shouldComponentUpdate: function (nextProps, nextState) {
		
		return true;
	},
	detailModalClose: function(){

		$("#detail-dialog").dialog("close");
	},
	updateNodeInfo: function(){
		//TODO for now, this will only update the node on the diagram
		if(!this.state.newVal){
			return;
		}

		for(var att in this.state.data.data){
			TOD.gojs.myDiagram.model.setDataProperty(this.state.data.data, att, this.state.newVal[att]);	
		}
		// TOD.gojs.myDiagram.model.setDataProperty(this.state.data.data, "name", this.state.data.data.name+" ");
		
		this.detailModalClose();
		
		// TOD.gojs.myDiagram.undoManager.startTransaction();
		
		// TOD.gojs.myDiagram.undoManager.commitTransaction();
	},
	changeMode: function(){
		this.setState({mode:"edit"});
	},
	handleContentChange: function(data){
		console.log("handleContentChange");
		this.state.newVal = data;
	},
	render: function (){
		var _self = this;
		return (
	<div className="testNodeDetail">
		<div className="modal-dialog">
			<div className="modal-content">
				<div className="modal-header">
					<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
					<h4 className="modal-title">{this.state.data.data.category}</h4>
				</div>
				<div className="modal-body">
					{ ( function(){
						switch (_self.state.data.data.category){
							default : {
								switch (_self.state.mode) {
									case "display": return <StepDetailInfo data={_self.state.data} />;
									case "edit": return <StepDetailInfoEdit data={_self.state.data} onContentChange={_self.handleContentChange}/>;
								}		
							};
							case "Assertion": {
								switch (_self.state.mode) {
									case "display": return <AssertionDetail data={_self.state.data} />;
									case "edit": return <StepDetailInfoEdit data={_self.state.data}  onContentChange={_self.handleContentChange}/>;
								}
							};
							case "LogicControl": {
								switch (_self.state.mode) {
									case "display": return <LogicControlInfo data={_self.state.data} />;
									case "edit": return <StepDetailInfoEdit data={_self.state.data}  onContentChange={_self.handleContentChange}/>;
								}
							}
						}

						
					})()}
				</div>
				<div className="modal-footer">
					<button onClick={this.detailModalClose} type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
					{ ( function(){
						switch (_self.state.mode) {
							case "display": return <button onClick={_self.changeMode} className="btn btn-sm btn-primary">Edit</button>;
							case "edit": return <button onClick={_self.updateNodeInfo}  type="button" className="btn btn-primary">Save changes</button>;
						}
					})()}		
				</div>
			</div>
		</div>
	</div>
		)
	}
});

TOD.gojs.detailDialog = React.render(
   <TestNodeDetailDialog />,
   document.getElementById('detail-dialog')
);

