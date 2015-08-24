var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} = React;

var globalStyles = require("../globalStyles.js");

var EachTag = React.createClass({
	_onPress: function (){
		var ListView = require("./ListView.js");

	    this.props.toRoute({
		      name: 'Hearts On "' + this.props.tag + '"',
		      component: ListView
		    });
	},
	render: function() {
		return (
		<TouchableOpacity onPress={this._onPress}>
		   <Text style={styles.tag}>
			   {this.props.tag}	
		   </Text> 
	   </TouchableOpacity>
		);
	}
});

var styles = StyleSheet.create({
	tag: {
		backgroundColor: '#000',
		color: '#fff',
		padding: 2,
		paddingHorizontal: 5,
		//borderRadius: 5,
		marginRight: 2,
		marginTop: -12,
	},
});

module.exports = EachTag;
