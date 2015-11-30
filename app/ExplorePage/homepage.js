'use strict';

var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
} = React;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var Carousel = require('react-native-carousel');
var Swiper = require('react-native-swiper')
var EachDetail = require('../components/EachDetail.js');
var CommentItem = require('../components/CommentItem.js');
var EachTag = require('../components/EachTag.js');
var MiniItem = require('../components/MiniItem.js');

var globalStyles = require("../globalStyles.js");

var tags = ["Business", "Group-talk", "Family", "Dreams", "Career", "Ice Breaker", "Love", "Adventurous", "Sibling"];

var heroItems = [
	{
		title: "Love Everlasting",
		subtitle: "Get to know your significant other better.",
		tag: "love"
	},
	{
		title: "Friends Five-ever",
		subtitle: "How well do you know your friends?",
		tag: "friendship"
	},
	{
		title: "New Kids, Cool Kids",
		subtitle: "Easy ice-breakers when meeting new people.",
		tag: "friendship"
	}
];

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
	},
	{
		name: "Jonathan",
		comment: "Maker, Thinker, and Believer. I think that I am a maker because I pursue..."
	},
	{
		name: "Jonathan",
		comment: "Maker, Thinker, and Believer. I think that I am a maker because I pursue..."
},
	{
		name: "Jonathan",
		comment: "Maker, Thinker, and Believer. I think that I am a maker because I pursue..."
	}
];

var Hero = React.createClass({
	render: function() {
		return (
				<Image
					style={styles.heroContainer}
					source={{uri: 'http://i.imgur.com/h4L179U.png'}}
					>
				<View style={styles.heroBorder}>
					<Text style={[globalStyles.text.heading, globalStyles.text.size.large]}>
						{this.props.main.toUpperCase()}
					</Text>
					<Text style={[globalStyles.text.roman, {marginTop: -5}]}>
						{this.props.subtitle}
					</Text>
				</View>
			</Image>
		);
	}
});

var Homepage = React.createClass({
	mixins: [ParseReact.Mixin],
	observe: function(props, state) {
		var tagQuery = new Parse.Query('Tag')
			.ascending("text");
	  return { tags: tagQuery };
	},
	render: function() {

		var passiveDot = <View style={[styles.dot, {borderWidth: 1}]} />;
		var activeDot = <View style={[styles.dot, {backgroundColor: 'rgba(0,0,0,1)'}]} />;

		return (
			<ScrollView style={styles.container} contentInset={{bottom: 80,}} automaticallyAdjustContentInsets={false}>
				<Swiper dot={passiveDot} activeDot={activeDot} height={145} showPagination={true} autoplay={true}>
					{heroItems.map((tag) => <Hero main={tag.title} subtitle={tag.subtitle}/> )}
				</Swiper>

				<EachDetail heading={true}>
					<Text style={globalStyles.text.roman}>Explore Trending tags</Text>
				</EachDetail>

				<View style={styles.tagsList}>
					{this.data.tags.map(
						(tag) => 
						<EachTag tag={tag} large={true} toRoute={this.props.toRoute}/>)
					}
				</View>

				<EachDetail heading={true}>
					<Text style={globalStyles.text.roman}>Explore trending questions</Text>
				</EachDetail>
				<View style={globalStyles.flexRow}>
					{topQuestions.slice(0,5).map(
						(question) => 
							<MiniItem question={question}/>
						)
					}
				</View>

				<EachDetail style={{marginTop: 30,}}>
					<Text style={globalStyles.text.weight.bold}>EXPLORE RESPONSES</Text>
				</EachDetail>
				{comments.map(
					(comment) => 
					<CommentItem 
						visibleUser={false} 
						visibleComment={true} 
						data={comment} />
					)
				}

			</ScrollView>
		);
	}
});


var styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',	
	},
	heroContainer: {
		width: width,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000',
	},
	heroBorder: {
		flex: 1,
		width: width - width*0.25,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255,255,255,.4)',
		margin: 20,
	},
	dot: {
		width: 8, 
		height: 8,
		borderRadius: 4, 
		marginHorizontal: 3, 
		marginBottom: -75,
	},
	tagsList: {
		paddingHorizontal: 20,
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: width ,
		marginTop: 10,
	}
});

module.exports = Homepage;
