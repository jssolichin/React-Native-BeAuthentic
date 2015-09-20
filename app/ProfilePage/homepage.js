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
var {width, height} = Dimensions.get('window');
var { Icon, } = require('react-native-icons');

var EachDetail = require('../components/EachDetail.js');
var Button = require('../components/Button.js');
var CommentItem = require('../components/CommentItem.js');
var globalStyles = require("../globalStyles.js");
var globalHelpers = require("../globalHelpers.js");

var stats = [
	{name: 'Questions', value: 100},
	{name: 'Hearts Shared', value: 120},
	{name: 'Heart to Heart', value: 150},
	{name: 'Heart Cares', value: 140},
]

var topQuestions = [
	"Given the choice of anyone in the world, whom would you want as a dinner guest?",
	"Would you like to be famous? In what way?",
	"Before making a telephone call, do you ever rehearse what you are going to say? Why?",
	"What would constitute a “perfect” day for you?",
	"When did you last sing to yourself? To someone else?",
	"If you were able to live to the age of 90 and retain either the mind or body of a 30-year-old for the last 60 years of your life, which would you want?",
	"Do you have a secret hunch about how you will die?",
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
			<View style={{}}>
				<Text style={[ globalStyles.text.size.small]}>
					{this.props.data.name}
				</Text>
				<Text style={[globalStyles.text.size.large, globalStyles.text.weight.bold,]}>
					{this.props.data.value}
				</Text>
			</View>
		)	
	}
});
	
var ProfilePage = React.createClass({
	getInitialState: function (){
		return {
			visible: false,
			comments: comments
		};
	},
	_addFriend: function (){
		this.setState({visible: true});
	},
  render: function() {
	  var profileImage;
	  if(this.state.visible)
		  profileImage = (
				<Image
					style={styles.profileImage}
					source={require('image!profileImage')}
					resizeMode='contain'
				/>
	  )
	  else 
		  profileImage = (
			<Icon
				name={'ion|ios-personadd-outline'}
			  size={50}
			  color={'#fff'}
			  style={styles.profileImage}
			/>
		  )

    return (
		<ScrollView 
			automaticallyAdjustContentInsets={false}
			contentInset={{bottom: 70,}} 
			style={styles.container}>
			<View style={styles.heroContainer}>
				<TouchableOpacity onPress={this._addFriend}>
					{profileImage}
				</TouchableOpacity>
				<Text style={[globalStyles.text.center, globalStyles.text.weight.bold]}>
					{globalHelpers.censorship('Jonathan Solichin', this.state.visible)}
				</Text>
				<Text style={[globalStyles.text.center]}>
					{globalHelpers.censorship('Something about myself here. #liveLoveLaugh', this.state.visible)}
				</Text>
				{this.state.visible ? <Button text="Edit Profile" style={{marginTop: 20,}}/> : null}
			</View>

			<View style={styles.statsContainer}>
				{stats.map((stat) => <Stat data={stat} />)}
			</View>

			<EachDetail style={{marginTop: 30,}}>
				<Text style={globalStyles.text.weight.bold}>HEARTS SHARED</Text>
			</EachDetail>
				{this.state.comments.map((comment) =>
					 <CommentItem hideUsername={true} visibleUser={this.state.visible} visibleComment={this.state.visible} data={comment} />
					 )}

			<EachDetail style={{marginTop: 30,}}>
				<Text style={globalStyles.text.weight.bold}>QUESTIONS ASKED</Text>
			</EachDetail>
			{topQuestions.slice(0,5).map(
				(question) => 
				<EachDetail >
					<Text style={{width: width-20}}>{question}</Text>	
				</EachDetail>
				)
			}

			<EachDetail style={{marginTop: 30,}}>
				<Text style={globalStyles.text.weight.bold}>QUESTIONS HEARTED</Text>
			</EachDetail>
			{topQuestions.slice(0,5).map(
				(question) => 
				<EachDetail >
					<Text style={{width: width-20}}>{question}</Text>	
				</EachDetail>
				)
			}

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


var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  heroContainer: {
 	padding: 20, 
    alignItems: 'center',
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
	  padding: 10,
	  borderTopWidth: 1,
	  borderBottomWidth: 1,
  },
  hintsContainer: {
 	marginVertical: 10, 
  },
  hint: {
	  marginTop: 10,
 	paddingHorizontal: 10, 
  }
});

module.exports = ProfilePage;
