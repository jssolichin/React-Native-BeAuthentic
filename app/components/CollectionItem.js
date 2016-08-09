var React = require('react-native');
var {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
} = React;
var Dimensions = require('Dimensions');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var {width, height} = Dimensions.get('window');


var globalStyles = require("../globalStyles.js");

var MiniItem = React.createClass({
	mixins: [ParseReact.Mixin],
	observe: function() {
	  return {
	  };
	},
	_collectionSettings: function () {
		var CollectionSettingsButton = require('./CollectionSettingsButton.js');
		return 	<CollectionSettingsButton emitter={this.props.emitter} data={this.props.data} replaceRoute={this.props.replaceRoute} toRoute={this.props.toRoute} toBack={this.props.toBack}/>;
	},
	_goToCollectionView: function (){
			
		if(this.props.toRoute){
			var GridView = require("./GridView.js");

			var rightCorner;
			if(this.props.data.createdBy.objectId == Parse.User.current().id)
				rightCorner = this._collectionSettings;

			this.props.toRoute({
				  name: this.props.data.name,
				  component: GridView,
				  rightCorner: rightCorner,
				  passProps: {
					  emitter: this.props.emitter,
				  },
				  data: {
					  collection: this.props.data, 
					  toRoute: this.props.toRoute,
					  description: this.props.data.description,
					  createdBy: this.props.data.createdBy,
					  source: this.props.data.source,
				  }
				});
		}

	},

	render: function (){
		var uri;
		if(this.props.data.coverImage)
			uri = this.props.data.coverImage.url();

		if(this.props.hero)
			return (
				<TouchableOpacity onPress={this._goToCollectionView}>
					<Image
						style={styles.heroContainer}
						source={{uri: uri}}
						>
						<View style={styles.heroBorder}>
							<Text style={[globalStyles.text.heading, globalStyles.text.size.large]}>
								{this.props.data.name.toUpperCase()}
							</Text>
							<Text style={[globalStyles.text.roman, {marginTop: -5}]}>
								{this.props.data.description}
							</Text>
						</View>
					</Image>
				</TouchableOpacity>
			)
		else 
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
var thirdWidth = width/2.5;
var eachItemPadding = thirdWidth * ((1-percentageWidth)/2) - .5;
var eachItemWidth = thirdWidth * percentageWidth;
var eachItemHeight = eachItemWidth * 1.50 ;

var styles = {
	container: {
		backgroundColor: '#ccc',
	},
	background: {
		backgroundColor: 'rgba(255,255,255, .6)', 
		margin: eachItemPadding, 
		width: eachItemWidth,
		height: eachItemHeight,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 5,
	},
	text: {
		textAlign: 'center',
		backgroundColor: 'transparent'
	},
	heroContainer: {
		width: width,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000',
		height: 145,
	},
	heroBorder: {
		flex: 1,
		width: width - 40,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255,255,255,.4)',
		margin: 20,
	},
}

module.exports = MiniItem
