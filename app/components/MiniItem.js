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
var AddButton = require('./AddButton.js');

var globalStyles = require("../globalStyles.js");

var MiniItem = React.createClass({
	_addToCollection: function () {
		return 	<AddButton data={this.props.data}/>;
	},
	_goToSinglePage: function() {
	    this.props.toRoute({
		      name: "A Heart Question",
			  component: SinglePageView,
			  rightCorner: this._addToCollection,
			  data: {
				  question: this.props.data,
				  toRoute: this.props.toRoute,
			  },
		    });
  	},
	_handlePress: function (){
		if(this.props.secondaryMode)
			this.props.secondary(this.props.source.collection.objectId, this.props.data.objectId);
		else
			this._goToSinglePage();
	},
	render: function (){
		return (
			<TouchableOpacity onPress={this._handlePress}>
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
				{this.props.secondaryMode ?
					<View style={styles.deleteContainer}>
						<Text style={[globalStyles.text.color.white, globalStyles.text.size.large]}>&times;</Text>
					</View>
				: null}
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
	},
	deleteContainer: {
		backgroundColor: '#000',
		padding: 7,
		paddingVertical: 1,
		position: 'absolute',
		top: eachItemHeight/2 ,
		left: eachItemWidth/2 +5,
		borderRadius: 20,
	}
}

module.exports = MiniItem
