var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} = React;
var Dimensions = require('Dimensions');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var {width, height} = Dimensions.get('window');
var { Icon, } = require('react-native-icons');

var EachDetail = require('../components/EachDetail.js');
var Button = require('../components/Button.js');
var CommentList = require('../components/CommentList.js');
var GridView = require('../components/GridView.js');

var globalStyles = require("../globalStyles.js");
var globalHelpers = require("../globalHelpers.js");

var stats = [
	{name: 'Questions', value: 100},
	{name: 'Hearts Shared', value: 120},
	{name: 'Heart to Heart', value: 150},
	{name: 'Heart Cares', value: 140},
]

var comments = [ 
	{
					name: "Jonathan",
					comment: "Maker, Thinker, and Believer. I think that I am a maker because I pursue..."
				},
				{
					name: "Jonathan",
					comment: "Maker, Thinker, and Believer. I think that I am a maker because I pursue..."
				}
			];

var Stat = React.createClass({
	render: function (){
		return (
			<View style={[styles.stat]}>
				<Text style={[globalStyles.text.heading, globalStyles.text.weight.bold, {fontSize: 40,}]}>
					{this.props.data.value}
				</Text>
				<Text style={[globalStyles.text.roman, {marginTop: -10, fontSize: 11,}]}>
					{this.props.data.name}
				</Text>
			</View>
		)	
	}
});
	
var ProfilePage = React.createClass({
	getInitialState: function (){
		return {
			visible: true,
			comments: comments
		};
	},
	_addFriend: function (){
		this.setState({visible: true});
	},
	render: function() {

	  var profileImage;
	  if(this.state.visible){
		  var uri = this.props.data.img_url.url();
		  profileImage = (
				<Image
					style={styles.profileImage}
					source={{uri: uri}}
					resizeMode='contain'
				/>
		  )
	  }
	  else 
		  profileImage = (
			<Icon
				name={'ion|ios-personadd-outline'}
			  size={50}
			  color={'#fff'}
			  style={styles.profileImage}
			/>
		  )

		  var currentUserId = Parse.User.current().id;

    return (
		<ScrollView 
			automaticallyAdjustContentInsets={false}
			contentInset={{bottom: 70,}} 
			style={styles.container}>
			<View style={styles.heroContainer}>
				<TouchableOpacity onPress={this._addFriend}>
					{profileImage}
				</TouchableOpacity>
				<View style={styles.userInfo}>
					<Text style={[globalStyles.text.heading, globalStyles.text.size.large, globalStyles.text.weight.bold]}>
						{globalHelpers.censorship(this.props.data.name, this.state.visible)}
					</Text>
					<Text style={[globalStyles.text.roman, {marginTop: -5,}]}>
						{globalHelpers.censorship(this.props.data.description, this.state.visible)}
					</Text>
				</View>
			</View>

			<View style={styles.statsContainer}>
				{stats.map((stat,i) => <Stat key={i} data={stat} />)}
			</View>

			<EachDetail heading={true} style={[{flexDirection: 'column'}]}>
				<Text style={globalStyles.text.roman}>Questions hearted</Text>
				<Text style={globalStyles.text.eachDetailSubheading}>You should ask IRL, or share your heart and answer!</Text>
			</EachDetail>
			<GridView query={{questionsByUserId: currentUserId}} toRoute={this.props.toRoute}/>

			<EachDetail heading={true}>
				<Text style={globalStyles.text.roman}>Questions I have answered</Text>
			</EachDetail>
			<CommentList query={{answersByUserId: currentUserId}} hideUsername={true} />

			<EachDetail heading={true}>
				<Text style={globalStyles.text.roman}>Questions I have asked</Text>
			</EachDetail>
			<GridView query={{favoritesByUserId: currentUserId}} toRoute={this.props.toRoute}/>

			<View style={styles.hintsContainer}>
			<Text style={[globalStyles.text.color.gray, styles.hint]}>
				<Text style={globalStyles.text.weight.bold}>
					Hearts are shared&nbsp;
				</Text> 
				when a user answers a question, their own or other's.&nbsp;    
			</Text>
			<Text style={[globalStyles.text.color.gray, styles.hint]}>
				<Text style={globalStyles.text.weight.bold}>
					Heart to heart&nbsp;
				</Text>
				happens when two people add each other as friends, allowing them to see each other's answer.&nbsp;
			</Text>
			<Text style={[globalStyles.text.color.gray, styles.hint]}>
				<Text style={globalStyles.text.weight.bold}>
					Heart Cares&nbsp;
				</Text>
				is the number of people a person is added by, BUT not vice-versa. 
			</Text>
		</View>

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
	getInitialState: function (){
		return {
			visible: true,
			comments: comments
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
