/**
* This is component for logic controller
*/
/** @jsx React.DOM */

var LogicControlInfo = React.createClass({
    displayName: 'LogicControlInfo',
    getInitialState: function () {
        return {
            linksFrom:[]  
        };
    },
    updateComponent: function(){
        var node = this.props.data;
        console.log(node.data);
        var _linksFrom =  [];
        node.findLinksConnected().each(function(e){
			if(e.data.from=== node.data.key){
				_linksFrom.push(e.data);
			}
		});

        this.setState({
        	linksFrom: _linksFrom
        })

    },
    componentWillMount: function () {
    	console.log("will mount logic control");
    	this.updateComponent();
		return true;
    },
    componentWillUpdate: function (nextProps, nextState) {
        if(nextProps!==this.props){
        	console.log("update Component");
			// Manually update props
        	this.props=nextProps;
           	this.updateComponent();	
        }        
        return true;  
    },
    render: function () {
    	var connectedLinks = this.state.linksFrom.map(function (link) {
	    	console.log(link);
	    	var toNode = TOD.gojs.myDiagram.findNodeForKey(link.to);
		      return (
		        <a href="#" className="list-group-item">
					<h4 className="list-group-item-heading">Port: <span className="badge label-primary">{link.fromPort}</span></h4>
					<p className="list-group-item-text">Assert result: <span className="label label-success">{link.text}</span> To Node: <span className="label label-success">{toNode.data.text}</span></p>
				</a>
		     );
	    });
        return (
            <div className="logicControlInfo">
       			<div className="form-horizontal">
		          <div className="form-group">
		            <label for="stepNameInput" className="col-sm-2 control-label">Step Name</label>
		            <div className="col-sm-10">
		              <span className="form-control" id="stepNameInput" placeholder="name of Step" >{this.props.data.data.text}</span>
		            </div>
		          </div>
		          <div className="form-group">
		            <label for="stepSource" className="col-sm-2 control-label">Source</label>
		            <div className="col-sm-10">
		              <span type="text" className="form-control" id="stepSource" placeholder="source" >{this.props.data.data.source}</span>
		            </div>
		          </div>
		        </div>
            	<div id="logicControlPortInfo">
            		<div><label className="control-label">Conditions</label></div>
            		<div className="list-group">
					  {connectedLinks}
					</div>
            	</div>
            </div>
        );
    }
});

// module.exports = ;