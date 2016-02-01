var React = require('react-native');
var {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} = React;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var SinglePageView = require('../SinglePage/view.js');

var globalStyles = require("../globalStyles.js");

var MiniItem = React.createClass({
	_goToSinglePage: function() {
	    this.props.toRoute({
		      name: "A Heart Question",
			  component: SinglePageView,
			  data: {
				  question: this.props.data,
				  toRoute: this.props.toRoute
			  },
		    });
  	},
	render: function (){
		return (
			<TouchableOpacity onPress={this._goToSinglePage}>
				<View style={styles.container}>
					<View style={styles.background}>
						<Text 
						numberOfLines={6}
						style={[
							globalStyles.text.heading, 
							styles.text
						]}>
							{this.props.data.text}
						</Text>	
					</View>
				</View>
			</TouchableOpacity>
		);
	}
});

var percentageWidth = .65;
var thirdWidth = width/3;
var eachItemPadding = thirdWidth * ((1-percentageWidth)/2) - .5;
var eachItemWidth = thirdWidth * percentageWidth;
var eachItemHeight = eachItemWidth * 1.50;

var styles = {
	container: {
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#ccc',
	},
	background: {
		backgroundColor: '#eee', 
		margin: eachItemPadding, 
		width: eachItemWidth,
		height: eachItemHeight,
	},
	text: {
		margin: -5,	
		fontSize: 17,
		backgroundColor: 'transparent'
	}
}

module.exports = MiniItem
