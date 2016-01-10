'use strict';

var React = require('react-native');
var {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
} = React;
var { Icon, } = require('react-native-icons');
var globalStyles = require("../globalStyles.js");
var EachTag = require('../components/EachTag.js');
var Button = require('../components/Button.js');
var moment = require('moment');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var LinearGradient = require('react-native-linear-gradient');

var LargeItem = React.createClass({
	//source={require('image!profileImage')}
	render: function() {

		var dataLoadingView = (
			<View>
				<Text> Loading... </Text>
			</View>
		);

		if(this.props.data){

			//TODO: programmatically add tags
			var tags=[];
			for(var i = 1;i<4; i++){
				var eachTag = this.props.data['tag_'+i];
				if(eachTag)	
					tags.push(eachTag);
			}

		var createdAt = moment(this.props.data.createdAt);
		
		var dataLoadedView = (
			<View style={styles.insideContainer}>
				<Image
					style={styles.heroImage}
					source={{uri: this.props.data.coverImage.url()}}
					//source={{uri: 'http://i.imgur.com/h4L179U.png'}}
					>
					<LinearGradient colors={['rgba(255,255,255,.3)', 'rgba(255,255,255,1)']} style={styles.linearGradient}>
					</LinearGradient>
					<View style={styles.mainContainer}>
						<TouchableOpacity onPress={this.props.href}>
							<Text style={[styles.heroText, globalStyles.text.heading]}>
								{this.props.data.text}	
							</Text>
						</TouchableOpacity>

						<View style={styles.metaData}>
							<ScrollView directionalLockEnabled={true} style={styles.tagsList} horizontal={true} contentInset={{top: 50,bottom:-50}} >
								{(tags.map((tag,i) => 
									<EachTag style={{marginTop: 7}} key={i} tag={tag} toRoute={this.props.toRoute}/>
								))}
							</ScrollView>

							<Icon
								name='ion|ios-heart-outline'
								size={35}
								color='#000'
								style={styles.icon}
							/>

						</View>

					</View>

					<View style={[
						styles.metaDataVertical
					]}>
						<Text style={globalStyles.text.roman}>
							<Text style={globalStyles.text.romanBold}>{
								createdAt.format('ddd')}. </Text>
							{createdAt.date()}
						</Text>

						<Text style={globalStyles.text.roman}>
							Asked by&nbsp; 
							<Text style={globalStyles.text.romanBold}>{this.props.data.createdBy.username}</Text>
						</Text>
						
						<Text>
						</Text>
						<Text>
						</Text>
					</View>

			</Image>
		</View>
		);
		}

		return this.props.data ? dataLoadedView : dataLoadingView; 
	},

});

var imageHeight = height - height*0.33;
var imageWidth = width - width*0.25;

var styles = {
	insideContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	heroImage: {
		height: imageHeight,
		width: imageWidth,
		resizeMode: 'stretch',
		marginTop: 51,
		overflow: 'visible',
	},
	linearGradient: {
		flex: 1,
		position: 'absolute',
		left: -6,
		width: imageWidth + 12,
		height: imageHeight,
		backgroundColor: 'transparent',
		marginBottom: -1,
	},
	mainContainer: {
		position: 'absolute',
		backgroundColor: 'transparent',
		top: -20,
		left: -20,
	},
	heroText: {
		paddingTop: 2,
		fontSize: 50,
		lineHeight: 48,
		height: imageHeight + 30,
	},
	metaData: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		width: width - 30,
	},
	tagsList: {
		flexDirection: 'row',
		height: 35,
	},
	icon: {
		width: 35, 	
		height: 35, 
		marginRight: 5,
	},
	metaDataVertical: {
		backgroundColor: 'transparent',
		transform: [{rotateZ: '90deg'}],
		justifyContent: 'space-between',
		flexDirection: 'row',
		position: 'absolute',
		top: 180,
		right: -210,
		width: imageHeight,
		height: 20,
	}

}

module.exports = LargeItem;
