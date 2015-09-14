'use strict';

var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
} = React;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var Carousel = require('react-native-carousel');
var Swiper = require('react-native-swiper')
var EachDetail = require('../components/EachDetail.js');
var CommentItem = require('../components/CommentItem.js');
var EachTag = require('../components/EachTag.js');

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
			<View style={styles.heroContainer}>
				<View style={styles.heroBorder}>
					<Text style={[globalStyles.text.color.white, globalStyles.text.heading, globalStyles.text.size.large]}>
						{this.props.main.toUpperCase()}
					</Text>
					<Text style={[globalStyles.text.color.white, globalStyles.text.size.small]}>
						{this.props.subtitle}
					</Text>
				</View>
			</View>
		);
	}
});

var Homepage = React.createClass({
	render: function() {

		var passiveDot = <View style={[styles.dot, {borderWidth: 1}]} />;
		var activeDot = <View style={[styles.dot, {backgroundColor: 'rgba(0,0,0,1)'}]} />;

		return (
			<ScrollView style={styles.container} contentInset={{bottom: 80,}} automaticallyAdjustContentInsets={false}>
				<Swiper dot={passiveDot} activeDot={activeDot} height={120} showPagination={true} autoplay={true}>
					{heroItems.map((tag) => <Hero main={tag.title} subtitle={tag.subtitle}/> )}
				</Swiper>

				<EachDetail heading={true}>
					<Text style={globalStyles.text.weight.bold}>EXPLORE TRENDING TAGS</Text>
				</EachDetail>

				<View style={styles.tagsList}>
					{tags.map(
						(tag) => 
						<EachTag tag={tag} large={true} toRoute={this.props.toRoute}/>)
					}
				</View>

				<EachDetail style={{marginTop: 30,}}>
					<Text style={globalStyles.text.weight.bold}>EXPLORE QUESTIONS</Text>
				</EachDetail>
				{topQuestions.slice(0,5).map(
					(question) => 
					<EachDetail >
						<Text style={{width: width-20}}>{question}</Text>	
					</EachDetail>
					)
				}

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
		width: width-40,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#fff',
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
		paddingHorizontal: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: width ,
		marginTop: 10,
	}
});

module.exports = Homepage;
