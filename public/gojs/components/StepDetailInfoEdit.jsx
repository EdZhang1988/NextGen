/**
* This is a component to display all information of each step
*/
var StepDetailInfoEdit = React.createClass({
  getInitialState: function (){
  	return { 
      // oldVal: {},
      newVal: {}
    };
  },
  componentWillMount: function () {
    // Simplily replicate the item 
    for(var att in this.props.data.data){
      this.state.newVal[att] = this.props.data.data[att];
    }
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
  render: function() {
    var title = this.state.newVal.text;
    var source = this.state.newVal.source;

    return (
      <div className="detail-info">
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="stepNameInput" className="col-sm-2 control-label">Step Name</label>
            <div className="col-sm-10">
              <input type="text" onChange={this.handleChange} className="form-control" id="stepNameInput" placeholder="name of Step" value={title} data-name="text"></input>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="stepSource" className="col-sm-2 control-label">Source</label>
            <div className="col-sm-10">
              <input type="text" onChange={this.handleChange} className="form-control" id="stepSource" placeholder="source" value={source} data-name="source"></input>
            </div>
          </div>
        </form>
      </div>
    );
  }
});