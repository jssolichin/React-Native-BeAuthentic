var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  NativeModules,
} = React;
var Dimensions = require('Dimensions');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var {width, height} = Dimensions.get('window');
var { Icon, } = require('react-native-icons');
var imagePicker = require('react-native-imagepicker');

var EachDetail = require('../components/EachDetail.js');
var Button = require('../components/Button.js');
var CommentList = require('../components/CommentList.js');
var CollectionList = require('../components/CollectionList.js');
var GridView = require('../components/GridView.js');

var globalStyles = require("../globalStyles.js");
var globalHelpers = require("../globalHelpers.js");

var Stat = React.createClass({
	getInitialState: function(){
		return {
		
		}	
	},
	componentDidMount: function(){
		var that = this;

		this.props.query.count({
			success: function(count) {
				that.setState({value: count});
				return count;
		  },
		  error: function(error) {
			  console.log(error); return null;
		  }
		});
		
	},
	render: function (){
		if(this.state.value != undefined){
		return (
			<View style={[styles.stat]}>
				<Text style={[globalStyles.text.heading, globalStyles.text.weight.bold, {fontSize: 40,}]}>
					{this.state.value}
				</Text>
				<Text style={[globalStyles.text.roman, {marginTop: -10, fontSize: 11,}]}>
					{this.props.name}
				</Text>
			</View>
		)	
		}
		else {
			return <Text>Loading...</Text>
		}
		

	}
});
	
var ProfilePage = React.createClass({
	getInitialState: function (){
		return {
			visible: true,
			currentUserProfilePage: this.props.data.objectId == Parse.User.current().id,
			stats: [
						{name: 'Questions Asked', query: new Parse.Query(Parse.Object.extend("Question")).equalTo('createdBy', this.props.data)},
						{name: 'Questions Liked', query: new Parse.Query(Parse.Object.extend("Activity")).equalTo('fromUser', this.props.data).equalTo('type', 'liked')},
						{name: 'Questions Answered', query: new Parse.Query(Parse.Object.extend("Answer")).equalTo('createdBy', this.props.data)},
						{name: 'Answers Shared', query: new Parse.Query(Parse.Object.extend("Answer")).equalTo('createdBy', this.props.data).equalTo('publicallyShared', true)},
					]

		};
	},
	_addFriend: function (){
		this.setState({visible: true});
	},
	_setImage: function (imageUri){
		var that = this;

		NativeModules.ReadImageData.readImage(imageUri, (imageFile) => {
			var filename = imageUri.match(/(\w+)(\.\w+)+(?!.*(\w+)(\.\w+)+)/);
			var parseImageFile = new Parse.File(filename[0], {base64: imageFile})

			parseImageFile.save().then(function (img){
				saveToServer(img);
			})
		});

		function saveToServer(coverImage) {
			console.log(coverImage)
			
			var changes = {img_url: coverImage};

			var object = new Parse.User
			object.objectId = that.props.data.objectId;

			var mutator = ParseReact.Mutation.Set(object, changes);

			mutator.dispatch()
				.then((error,data) => {
					console.log(error, data)
				})

		}
	},
	_pickImage: function(){
		var that = this;
		var image = imagePicker.open({
		    takePhoto: true,
		    useLastPhoto: true,
		    chooseFromLibrary: true
		}).then(function(imageUri) {
			console.log('direct',imageUri);
			that._setImage(imageUri);
		}, function() {
		    console.log('user cancel');
		});
	},
	render: function() {

	  var profileImage;
	  if(this.state.visible && this.props.data.img_url){
		  var uri = this.props.data.img_url.url();
		  profileImage = (
				<Image
					style={styles.profileImage}
					source={{uri: uri}}
					resizeMode='contain'
				/>
		  )
	  }
	  else if (this.state.currentUserProfilePage)
		  profileImage = (
			<Icon
				name={'ion|ios-personadd-outline'}
			  size={50}
			  color={'#fff'}
			  style={styles.profileImage}
			/>
		  )
	else 
		profileImage = (
			<View style={styles.profileImage}>
				<Text style={[{marginTop: 25, marginHorizontal: 10, textAlign: 'center', fontSize: 40, backgroundColor: 'transparent'}, globalStyles.text.heading, globalStyles.text.weight.bold, globalStyles.text.color.white]}>
					{this.props.data.username.substring(0,1).toUpperCase()}
				</Text>
			</View>
		);

    return (
		<ScrollView 
			automaticallyAdjustContentInsets={false}
			contentInset={{bottom: 70,}} 
			style={styles.container}>
			<View style={styles.heroContainer}>
				<TouchableOpacity onPress={this.state.currentUserProfilePage? this._pickImage : null}>
					{profileImage}
				</TouchableOpacity>
				<View style={styles.userInfo}>
					<Text style={[globalStyles.text.heading, globalStyles.text.size.large, globalStyles.text.weight.bold]}>
						{this.props.data.name ? globalHelpers.censorship(this.props.data.name, this.state.visible) : '-'}
					</Text>
					<Text style={[globalStyles.text.roman, {marginTop: -5,}]}>
						{this.props.data.bio ? globalHelpers.censorship(this.props.data.bio, this.state.visible) : null}
					</Text>
				</View>
			</View>

			<View style={styles.statsContainer}>
				{this.state.stats.map((stat,i) => {
					return <Stat key={i} name={stat.name} query={stat.query} />;
				})}
			</View>

			<EachDetail heading={true} style={[{flexDirection: 'column'}]}>
				<Text style={globalStyles.text.roman}>Questions liked</Text>
			</EachDetail>
			<GridView query={{questionsByUserId: this.props.data.id}} toRoute={this.props.toRoute}/>

			<EachDetail heading={true}>
				<Text style={globalStyles.text.roman}>Questions answered</Text>
			</EachDetail>
			<CommentList query={{answersByUserId: this.props.data.id}} hideUsername={true} visibleComment={this.state.currentUserProfilePage} toRoute={this.props.toRoute} showArrow={true}/>

			<EachDetail heading={true}>
				<Text style={globalStyles.text.roman}>Questions asked</Text>
			</EachDetail>
			<GridView query={{favoritesByUserId: this.props.data.id}} toRoute={this.props.toRoute}/>

			<EachDetail heading={true}>
				<Text style={globalStyles.text.roman}>My Collections</Text>
			</EachDetail>
			<CollectionList query={{userId: this.props.data.id}} toRoute={this.props.toRoute} />

      </ScrollView>
    );
  }
});

var ProfilePageLoader = React.createClass({
	mixins: [ParseReact.Mixin],
	observe: function(props, state) {
		var query = new Parse.Query(Parse.User)
			.equalTo('objectId', this.props.data.userId);

		return {
			users: query,
		};
	},
	render: function (){
		if(this.data.users && this.data.users[0])	
			return <ProfilePage data={this.data.users[0]} toRoute={this.props.toRoute}/>
		else
			return <Text>Loading...</Text>
	}
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  heroContainer: {
 	padding: 20, 
	flexDirection: 'row',
  },
  userInfo: {
	  width: width - 140, 
	  marginLeft: 20,
	  marginTop: 10,
	  alignItems: 'flex-start',
  },
	profileImage: {
		borderRadius: 40,
		width: 80,
		height: 80,
		backgroundColor: '#000',
		marginBottom: 10,
	},
  statsContainer: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  justifyContent: 'space-between',
	  paddingHorizontal: 20,
  },
  stat: {
	  alignItems: 'center',
	  borderBottomWidth: 1,
	  paddingBottom: 5,
	  paddingHorizontal: 2,
	  borderColor: '#979797',
  },
  hintsContainer: {
 	marginVertical: 10, 
  },
  hint: {
	  marginTop: 10,
 	paddingHorizontal: 10, 
  }
});

module.exports = ProfilePageLoader;
