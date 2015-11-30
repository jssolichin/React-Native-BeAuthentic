var React = require('react-native');
var {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} = React;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var globalStyles = require("../globalStyles.js");

var MiniItem = React.createClass({
	render: function (){
		return (
			<View style={styles.container}>
				<View style={styles.background}>
					<Text style={[
						globalStyles.text.heading, 
						styles.text
					]}>
						{this.props.question}
					</Text>	
				</View>
			</View>
		);
	}
});

var styles = {
	container: {
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#ccc',
	},
	background: {
		backgroundColor: '#eee', 
		width: width/3 - 41,
		height: 123,
		margin: 20, 
	},
	text: {
		margin: -5,	
		fontSize: 17,
		backgroundColor: 'transparent'
	}
}

module.exports = MiniItem
