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
	getInitialState: function (){
		return {
			secondaryMode: false,
		}	
	},
	_addToCollection: function () {
		return 	<AddButton data={this.props.data}/>;
	},
	//TODO: delete question funct
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
	_callSecondaryMode: function (){
		this.props.secondary({
			collectionId: this.props.source.collection.objectId, 
			objectId: this.props.data.objectId,
		});
	},
	_toggleSecondaryMode: function(){
		if(this.props.secondary)
			this.setState({secondaryMode: !this.state.secondaryMode});
	},
	render: function (){
		return (
			<View>
			<TouchableOpacity onPress={this._goToSinglePage} onLongPress={this._toggleSecondaryMode}>
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
				{this.state.secondaryMode ?
					<TouchableOpacity style={styles.secondaryContainer} onPress={this._toggleSecondaryMode}>
						<View style={globalStyles.centerContent}>
							<TouchableOpacity onPress={this._callSecondaryMode} >
								<View style={styles.deleteContainer} >
									<Text style={[globalStyles.text.color.white, globalStyles.text.size.large]}>&times;</Text>
								</View>
							</TouchableOpacity>
							<View style={[styles.deleteContainer, styles.cancelContainer]}>
								<Text style={[]}>Cancel</Text>
							</View>
						</View>
					</TouchableOpacity>
				: null}
			</View>
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
	secondaryContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: eachItemWidth + eachItemPadding*2,
		height: eachItemHeight + eachItemPadding*2,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(255,255,255, .6)',
	},
	deleteContainer: {
		borderRadius: 20,
		padding: 7,
		paddingVertical: 1,
		backgroundColor: globalStyles.color.red.color,
	},
	cancelContainer: {
		marginTop: 15,
		backgroundColor: 'transparent',
	},
}

module.exports = MiniItem
