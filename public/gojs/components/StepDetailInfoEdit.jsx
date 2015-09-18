/**
* This is a component to display all information of each step
*/
var StepDetailInfoEdit = React.createClass({
  getInitialState: function (){
    var _supportAction = [
        {type: "click", params:["id"], description: "This Action will trigger a click event on element with given 'identifier'"},
        {type: "dblClick", params:["id"], description: "This Action will trigger a double click event on element with given 'identifier'"},
        {type: "sendKey", params:["id", "value"], description: "This Action will set 'value' to the element with given 'identifier'"},
        {type: "scroll", params:["start", "end"], description: "This Action will similulate a scroll behavior from 'start' to 'end'"},
      ];

  	return { 
      supportAction:_supportAction,
      newVal: {
        params: []
      }
    };
  },
  componentWillMount: function () {
    // Simplily replicate the item 
    for(var att in this.props.data.data){
      this.state.newVal[att] = this.props.data.data[att];
    }
  },
  // componentWillUpdate: function (nextProps, nextState) {
  //   this.props = nextProps;
  //   for(var att in this.props.data.data){
  //     this.state.newVal[att] = this.props.data.data[att];
  //   }
  //   return true;
  // },
  renderParamInputs: function(){
    // if(this.state.newVal.actionType){
      // in case that the node already has actionType property
      var _self = this;
      var action = this.state.supportAction.filter(function(e){
        return (_self.state.newVal && e.type===_self.state.newVal.actionType)
      })

      if(!action || action.length<1){
        action=[this.state.supportAction[0]];
      }
      console.log("action length: "+action.length);

      var params = action[0].params.map(function(p){
        var dom_id = "actionParam"+p;
        var _value = _self.state.newVal.params[p];
        console.log("att is "+p+"; value is "+_value);
        return (
          <div className="form-group">
            <label htmlFor={dom_id} className="col-sm-2 control-label">{p}</label>
            <div className="col-sm-10">
              <input onChange={_self.handleActionChange} type="text" className="form-control" placeholder={p} data-name={p} id={dom_id} value={_value}></input>
            </div>
          </div>
          );
      });

      return (
        <div id="params-input-group" style={{border:"1px dashed #CCCCCC", 'marginBottom':'5px', 'paddingLeft': '5px'}} >
          <div>
            <label className="control-label">Parameters: </label>
            <span className="label label-primary pull-right" title={action[0].description} style={{ margin: '5px'}}>i</span>
          </div>
          {params}
        </div>
        );
    // }
  },
  handleActionChange: function(e){
    console.log("onChange event for action params: ");
    var updateProp = e.target.dataset.name;
    console.log(e.target.value);
    this.state.newVal.params = this.state.newVal.params || [];
    this.state.newVal.params[updateProp] = e.target.value;
    this.setState({
      // "oldVal": this.state.oldVal,
      "newVal": this.state.newVal
    });
    // this.handleChange(e);
    this.props.onContentChange(this.state.newVal);
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
    var actionType = this.state.newVal.actionType;

    var options = this.state.supportAction.map(function(e){
      return <option value={e.type} title={e.discription} label={e.type}></option>
    });

    var parameters = this.renderParamInputs();

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
            <label htmlFor="stepSource" className="col-sm-2 control-label">Action</label>
            <div className="col-sm-10">
              <select onChange={this.handleChange} className="form-control" id="stepSource" placeholder="source" value={actionType} data-name="actionType">
                {options}
              </select>
            </div>
          </div>
          {parameters}
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