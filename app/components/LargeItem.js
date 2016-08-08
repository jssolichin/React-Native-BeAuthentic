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
import LinearGradient from 'react-native-linear-gradient'
var SinglePage = require('../SinglePage/new.js');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var Spinner = require('react-native-spinkit');

var LargeItem = React.createClass({
	//source={require('image!profileImage')}
	mixins: [ParseReact.Mixin],
	observe: function (){

		var question = new Parse.Object('Question');
		question.id = this.props.data.objectId;

		var query = new Parse.Query('Activity')
				.equalTo('type', 'liked')
				.equalTo('fromUser', Parse.User.current())
				.equalTo('question', question);
				
		return {
			likeCount: query,
		}	

	},
	getInitialState: function (){
		return {
		}	
	},
	_markAsLiked: function (){

		var that = this;

		var postACL = new Parse.ACL(Parse.User.current());
		postACL.setPublicReadAccess(true);

		var creator = ParseReact.Mutation.Create('Activity', {
			ACL: postACL,
			fromUser: Parse.User.current(),
			toUser: this.props.data.createdBy,
			question: this.props.data,
			readStatus: Parse.User.current().id == this.props.data.createdBy.objectId,
			type: 'liked',
		});

		creator.dispatch()
			.then((a,b,c)=>{
				that.refreshQueries('likeCount');
				that.props.emitter.emit('newLiked', a);
			})
	},
	_markAsUnliked: function (){

		var batch = new ParseReact.Mutation.Batch();

		this.data.likeCount.map((like) => {
			ParseReact.Mutation.Destroy(like)
				.dispatch({batch: batch});
		})

		batch.dispatch()
			.then((a,b,c)=>{
				//that.refreshQueries('likeCount');
			})
	},
	_toggleLike: function (){

		if(this.data.likeCount.length > 0)
			this._markAsUnliked();
		else 
			this._markAsLiked();	

	},
	_goToSinglePage: function (){
		this.props.toRoute({
			name: 'Respond',
			component: SinglePage,
			passProps: {
				emitter: this.props.emitter,
			},
			data: {
				question: this.props.data,
				toRoute: this.props.toRoute,
			}
		})	
	},
	_goToProfilePage: function() {
		var ProfilePage = require('../ProfilePage/homepage.js');
		this.props.toRoute({
			  name: this.props.data.createdBy.username, 
			  component: ProfilePage,
			  passProps: {
				  emitter: this.props.emitter,
			  },
			  data: {
				  userId: this.props.data.createdBy.objectId,
				  toRoute: this.props.toRoute,
			  },
			});
  	},
	render: function() {

		//TODO: programmatically add tags
		var tags=[];
		for(var i = 1;i<4; i++){
			var eachTag = this.props.data['tag_'+i];
			if(eachTag)	
				tags.push(eachTag);
		}

		var imageUri;
		if(this.props.data.coverImage)
			imageUri= this.props.data.coverImage.url();

		var createdAt = moment(this.props.data.createdAt);

		return (
			<View style={styles.insideContainer}>
				<Image
					style={styles.heroImage}
					source={{uri: imageUri}}
					>
					<LinearGradient colors={['rgba(255,255,255,.3)', 'rgba(255,255,255,1)']} style={styles.linearGradient}>
					</LinearGradient>

					<View style={styles.mainContainer}>
						<TouchableOpacity onPress={this._goToSinglePage}>
							<Text style={[styles.heroText, globalStyles.text.heading]}>
								{this.props.data.text}	
							</Text>
						</TouchableOpacity>
					</View>
				</Image>

					<View style={styles.metaData}>
						<ScrollView directionalLockEnabled={true} style={styles.tagsList} horizontal={true} contentInset={{top: 50,bottom:-50}} >
							{(tags.map((tag,i) => 
								<EachTag style={{marginTop: 7}} key={i} tag={tag} toRoute={this.props.toRoute}/>
							))}
						</ScrollView>

						<TouchableOpacity onPress={this._toggleLike}>
							<Icon
								name={this.data.likeCount.length > 0 ? 'ion|ios-heart' : 'ion|ios-heart-outline'}
								size={35}
								color={this.data.likeCount.length > 0 ? globalStyles.color.red.color : '#000'}
								style={styles.icon}
							/>
						</TouchableOpacity>

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
							<Text style={globalStyles.text.romanBold} onPress={this._goToProfilePage}>
								{this.props.data.createdBy.username}
							</Text>
						</Text>

						<Text>
						</Text>
						<Text>
						</Text>
						
					</View>

				<View style={styles.actionContainer}>
					<TouchableOpacity onPress={this._goToSinglePage} style={styles.actionItem}>
						<Button text="Respond" />
					</TouchableOpacity>
				</View>

		</View>
		);

	},

});

var Loader = React.createClass({
	propTypes: {
		emitter: React.PropTypes.object.isRequired,
	},
	render: function (){
		var dataLoadingView = (
			<View style={[globalStyles.loadingSpinner]}>
				<Spinner isVisible={true} size={50} type='Arc' color='#000'/>
			</View>
		);

		var dataLoadedView = <LargeItem data={this.props.data} toRoute={this.props.toRoute} emitter={this.props.emitter}/>;

		return this.props.data ? dataLoadedView : dataLoadingView; 
	
	}
})

var imageWidth = width * .75;
var imageHeight = imageWidth * 1.50;

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
		backgroundColor: '#ccc',
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
		top: imageHeight/2 + 40,
		right: -imageWidth/2 - 40,
		width: imageHeight,
		height: 20,
	},
	actionContainer: {
		width: width - 50,
		margin: 25,
		marginLeft: 20,
		marginTop: 10,
	},
	actionItem: {
		marginTop: 5,	
	},
}

module.exports = Loader;
