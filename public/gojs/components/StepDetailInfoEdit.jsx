/**
* This is a component to display all information of each step
*/
var StepDetailInfoEdit = React.createClass({
  // getInitialState: function (){
  // 	return {data: []};
  // },

  shouldComponentUpdate: function (nextProps, nextState) {  	
  	return true;
  },

  render: function() {
    return (
      <div className="detail-info">
        <form className="form-horizontal">
          <div className="form-group">
            <label for="stepNameInput" className="col-sm-2 control-label">Step Name</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="stepNameInput" placeholder="name of Step" value={this.props.data.text}></input>
            </div>
          </div>
          <div className="form-group">
            <label for="stepSource" className="col-sm-2 control-label">Source</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="stepSource" placeholder="source" value={this.props.data.source}></input>
            </div>
          </div>
        </form>
      </div>
    );
  }
});