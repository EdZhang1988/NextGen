var AssertionDetail = React.createClass({
	render: function(){
		return (
		<form className="form-horizontal">
          <div className="form-group">
            <label for="stepNameInput" className="col-sm-2 control-label">Step Name</label>
            <div className="col-sm-10">
              <span className="form-control" id="stepNameInput" placeholder="name of Step" >{this.props.data.data.text}</span>
            </div>
          </div>
          <div className="form-group">
            <label for="assertionType" className="col-sm-2 control-label">Assert Type</label>
            <div className="col-sm-10">
              <span type="text" className="form-control" id="stepSource" placeholder="source" >{this.props.data.data.assertType}</span>
            </div>
          </div>
          <div className="form-group">
            <label for="assertionType" className="col-sm-2 control-label">Error Message</label>
            <div className="col-sm-10">
              <span type="text" className="form-control" id="stepSource" placeholder="source" >{this.props.data.data.errorMessage}</span>
            </div>
          </div>
          <div className="form-group">
            <label for="stepSource" className="col-sm-2 control-label">Source</label>
            <div className="col-sm-10">
              <span type="text" className="form-control" id="stepSource" placeholder="source" >{this.props.data.data.source}</span>
            </div>
          </div>
        </form>
		);
	}
});