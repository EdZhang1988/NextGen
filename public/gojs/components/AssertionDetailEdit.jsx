/** @jsx React.DOM */
var AssertionDetailEdit = React.createClass({
    displayName: 'AssertionDetailEdit',
    getInitialState: function (){
    	var _supportType = [
    		{type: "AssertTrue", params:1, param_type: "Expression"},
    		{type: "AssertEqual", params:2, param_type:"data"},
    		{type: "AssertMatch", params:2, param_type:"data"}
    	];

	  	return { 
	  		supportType: _supportType,
	  		newVal: {}
	  	};
	},
	componentWillMount: function () {
		for(var att in this.props.data.data){
	      this.state.newVal[att] = this.props.data.data[att];
	    }
		return true;
	},
	handleChange: function(e){
	    // this.state.oldVal = this.state.newVal;
	    var updateProp = e.target.dataset.name;
	    console.log(updateProp);    
	    this.state.newVal[updateProp] = e.target.value;
	    this.setState({
	      // "oldVal": this.state.oldVal,
	      "newVal": this.state.newVal
	    });
	    this.props.onContentChange(this.state.newVal);
    },
    render: function(){
		var title = this.state.newVal.text;
    	var source = this.state.newVal.source;
    	var assertType = this.state.newVal.assertType;
    	var errorMessage = this.state.newVal.errorMessage;

    	var options = this.state.supportType.map(function(e){
    		return <option value={e.type} label={e.type}></option>
    	});
    	

		return (
		<form className="form-horizontal">
          <div className="form-group">
            <label for="stepNameInput" className="col-sm-2 control-label">Step Name</label>
            <div className="col-sm-10">
              <input onChange={this.handleChange} className="form-control" id="stepNameInput" placeholder="name of Step" value={title} data-name="text"></input>
            </div>
          </div>
          <div className="form-group">
            <label for="assertionType" className="col-sm-2 control-label">Assert Type</label>
            <div className="col-sm-10">
              <select onChange={this.handleChange} className="form-control" id="assertTypeInput" placeholder="assert type" value={assertType} data-name="assertType">
        		{options}      	
              </select>
            </div>
          </div>
          <div className="form-group">
            <label for="assertionType" className="col-sm-2 control-label">Error Message</label>
            <div className="col-sm-10">
              <input onChange={this.handleChange} type="text" className="form-control" id="errorMessage" placeholder="error message" value={errorMessage} data-name="errorMessage"></input>
            </div>
          </div>
          <div className="form-group">
            <label for="stepSource" className="col-sm-2 control-label">Source</label>
            <div className="col-sm-10">
              <input onChange={this.handleChange} type="text" className="form-control" id="stepSource" placeholder="source" value={source} data-name="source"></input>
            </div>
          </div>
        </form>
		);
	}
});

// module.exports = ;