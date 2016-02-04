var React = require('react-native');
var {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
} = React;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var globalStyles = require("../globalStyles.js");

var MiniItem = React.createClass({
	_goToCollectionView: function (){
			
		if(this.props.toRoute){
			var GridView = require("./GridView.js");

			this.props.toRoute({
				  name: this.props.data.name,
				  component: GridView,
				  data: {
					  collection: this.props.data, 
					  toRoute: this.props.toRoute,
					  description: this.props.data.description,
				  }
				});
		}

	},

	render: function (){
		var uri;
		if(this.props.data.coverImage)
			uri = this.props.data.coverImage.url();
		return (
			<TouchableOpacity onPress={this._goToCollectionView}>
				<Image 
					source={{uri: uri}}
					style={[styles.container, this.props.style]}>
					<View style={styles.background}>
						<Text 
						numberOfLines={6}
						style={[
							globalStyles.text.heading, 
							globalStyles.text.size.large, 
							styles.text
						]}>
							{this.props.data.name.toUpperCase()}
						</Text>	
					</View>
				</Image>
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
		backgroundColor: '#ccc',
	},
	background: {
		backgroundColor: 'rgba(255,255,255, .4)', 
		margin: eachItemPadding, 
		width: eachItemWidth,
		height: eachItemHeight,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		textAlign: 'center',
		backgroundColor: 'transparent'
	}
}

module.exports = MiniItem
