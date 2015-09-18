/**
* This is a component to display all information of each step
*/
var StepDetailInfo = React.createClass({
  shouldComponentUpdate: function (nextProps, nextState) {  	
  	return true;
  },

  render: function() {
    return (
      <form className="form-horizontal">
          <div className="form-group">
            <label for="stepNameInput" className="col-sm-2 control-label">Step Name</label>
            <div className="col-sm-10">
              <span className="form-control" id="stepName" placeholder="name of Step" >{this.props.data.data.text}</span>
            </div>
          </div>
          <div className="form-group">
            <label for="actionType" className="col-sm-2 control-label">Action</label>
            <div className="col-sm-10">
              <span className="form-control" id="actionType" placeholder="type of action" >{this.props.data.data.actionType}</span>
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