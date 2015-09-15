/**
* This is a component to display all information of each step
*/
var StepDetailInfo = React.createClass({
  // getInitialState: function (){
  // 	return {data: []};
  // },

  shouldComponentUpdate: function (nextProps, nextState) {  	
  	return true;
  },

  render: function() {
    return (
      <div className="detail-info">
        <div >
        	<label>Name:</label>
        	<span >{this.props.data.text}</span>
        </div>
      </div>
    );
  }
});