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

		if(this.props.callback)
			this.props.callback(this.props.tag);

		if(this.props.toRoute){
			var ListView = require("./ListView.js");

			this.props.toRoute({
				  name: 'Hearts On "' + this.props.tag + '"',
				  component: ListView
				});
		}
	},
	render: function() {
		return (
		<TouchableOpacity onPress={this._onPress}>
			<Text style={[styles.tag, 
				globalStyles.text.roman,
				globalStyles.text.size.medium,
				this.props.large && styles.large,
				this.props.normal && styles.normal,
				this.props.style,
				]}>
			   {this.props.displayPlus ? '+ ' : null}	
			   {this.props.tag.text}	
			   {this.props.displayX ? ' ×' : null}	
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
		marginRight: 5,
		marginTop: -12,
	},
	normal: {
		paddingVertical: 2,
		paddingHorizontal: 5,
		marginTop: 2,
		marginBottom: 2,
	},
	large: {
		marginTop: 0,
		paddingVertical: 5,
		paddingHorizontal: 15,
		marginBottom: 5,
		marginRight: 5,
		fontSize: 16,
	}
});

module.exports = EachTag;
