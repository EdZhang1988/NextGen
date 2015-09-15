var TestNodeDetailDialog = React.createClass({
	getInitialState: function () {
		console.log("init dialog")
		return {
			mode: "display",
			data: {}
		};
	},

	// componentDidMount: function (){
	// 	console.log("componentDidMount");
	// },
	shouldComponentUpdate: function (nextProps, nextState) {
		console.log("shouldComponentUpdate");
		return true;
	},
	detailModalClose: function(){
		$("#detail-dialog").dialog("close");
	},
	changeMode: function(){
		this.setState({mode:"edit"});
	},
	render: function (){
		var _self = this;
		return (
	<div className="testNodeDetail">
		<div className="modal-dialog">
			<div className="modal-content">
				<div className="modal-header">
					<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
					<h4 className="modal-title">{this.state.data.category}</h4>
				</div>
				<div className="modal-body">
					{ ( function(){
						switch (_self.state.data.category){
							default : {
								switch (_self.state.mode) {
									case "display": return <StepDetailInfo data={_self.state.data} />;
									case "edit": return <StepDetailInfoEdit data={_self.state.data} />;
								}		
							};
							case "Assertion": {
								switch (_self.state.mode) {
									case "display": return <AssertionDetail data={_self.state.data} />;
									case "edit": return <StepDetailInfoEdit data={_self.state.data} />;
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
							case "edit": return <button onClick={_self.detailModalClose}  type="button" className="btn btn-primary">Save changes</button>;
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

