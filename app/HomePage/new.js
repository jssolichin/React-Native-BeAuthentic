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
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var LinearGradient = require('react-native-linear-gradient');

var tags = [
	{
		text: 'Love'	
	},
	{
		text: 'Friend'	
	},
	{
		text: 'Couple'	
	},
]
var NewHome = React.createClass({
	//source={require('image!profileImage')}
	render: function() {
		return (
			<ScrollView 
				automaticallyAdjustContentInsets={false}
				contentInset={{bottom: 230}}
				style={styles.container}
				>
			<View style={styles.insideContainer}>
				<Image
					style={styles.profileImage}
					source={{uri: 'http://i.imgur.com/h4L179U.png'}}
					>
					<LinearGradient colors={['rgba(0,0,0,0)', 'rgba(255,255,255,1)']} style={styles.linearGradient}>
						<View style={styles.imageMask}>
						</View>
					</LinearGradient>
					<View style={styles.mainContainer}>
						<TouchableOpacity onPress={this.props.href}>
							<Text style={[styles.heroText, globalStyles.text.heading]}>
								Given the choice of anyone in the world whom would you want as a dinner guest?
							</Text>
						</TouchableOpacity>

						<View style={styles.metaData}>
							<ScrollView directionalLockEnabled={true} style={styles.tagsList} horizontal={true} contentInset={{top: 0,bottom:-50}} >
								{(tags.map((tag) => 
									<EachTag tag={tag} toRoute={this.props.toRoute}/>
								))}
							</ScrollView>

							<Icon
								name='ion|ios-heart-outline'
								size={35}
								color='#000'
								style={styles.icon}
							/>
						</View>

						<View style={styles.actionContainer}>
							<TouchableOpacity onPress={this.props.href} style={styles.actionItem}>
								<Button text="Share My Heart" />
							</TouchableOpacity>
							<TouchableOpacity onPress={this.props.href} style={styles.actionItem}>
								<Button text="See Responses From Others" noBorder={true}/>
							</TouchableOpacity>
							<TouchableOpacity onPress={this.props.href} style={styles.actionItem}>
								<Button text="Ask a Question" noBorder={true}/>
							</TouchableOpacity>
						</View>
					</View>

					<View style={[
						styles.metaDataVertical
					]}>
						<Text style={globalStyles.text.roman}>
							<Text style={globalStyles.text.romanBold}>Tues.</Text>
							13
						</Text>

						<Text style={globalStyles.text.roman}>
							Asked by&nbsp; 
							<Text style={globalStyles.text.romanBold}>jssolichin</Text>
						</Text>
						
						<Text>
						</Text>
						<Text>
						</Text>
					</View>

			</Image>
		</View>
	</ScrollView>
		);
	},

});

var imageHeight = height - height*0.33;
var styles = {
	container: {
		backgroundColor: '#fff',
	},
	insideContainer: {
		justifyContainer: 'center',
		alignItems: 'center',
	},
	profileImage: {
		width: width - width*0.25,
		height: imageHeight,
		resizeMode: 'cover',
		marginTop: 51,
		overflow: 'visible',
	},
	imageMask: {
		backgroundColor: 'rgba(255,255,255,.5)',
		width: width - width*0.2,
		height: height - height*0.28,
	},
	linearGradient: {
		flex: 1,
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
	},
	actionContainer: {
		width: width - 55,
		marginTop:17, 
	},
	actionItem: {
		marginTop: 5,	
	},
	metaData: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		width: width - 40,
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
		top: 215,
		right: -245,
		width: imageHeight,
	}

}

module.exports = NewHome;
