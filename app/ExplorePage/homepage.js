//TODO: 
// - Link hero to collection

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

var Swiper = require('react-native-swiper')
var EachDetail = require('../components/EachDetail.js');
var CommentItem = require('../components/CommentItem.js');
var EachTag = require('../components/EachTag.js');
var CollectionItem = require('../components/CollectionItem.js');
var GridView = require("../components/GridView.js");

var globalStyles = require("../globalStyles.js");

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

var Hero = React.createClass({
	render: function() {
		var uri = this.props.data.coverImage.url();
		return (
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
		);
	}
});

var Homepage = React.createClass({
	mixins: [ParseReact.Mixin],
	observe: function(props, state) {
		var tagQuery = new Parse.Query('Tag')
			.ascending("text")
			.limit(10);

		var collectionQuery = new Parse.Query('Collection')
			.ascending("text")
			.limit(5);

		var heroCollectionQuery = new Parse.Query('Collection')
			.exists('heroItem')
			.ascending('createdAt')
			.limit(3);

		return { 
			tags: tagQuery,
			collection: collectionQuery,
			heroCollection: heroCollectionQuery,
		};
	},
	render: function() {

		var passiveDot = <View style={[styles.dot, {borderWidth: 1}]} />;
		var activeDot = <View style={[styles.dot, {backgroundColor: 'rgba(0,0,0,1)'}]} />;

		return (
			<ScrollView style={styles.container} contentInset={{bottom: 80,}} automaticallyAdjustContentInsets={false}>
				<Swiper dot={passiveDot} activeDot={activeDot} height={145} showPagination={true} autoplay={true}>
					{this.data.heroCollection.map((collection, i) => <Hero key={i} data={collection}/> )}
				</Swiper>

				<EachDetail heading={true}>
					<Text style={globalStyles.text.roman}>Explore Trending Tags</Text>
				</EachDetail>
				<ScrollView horizontal={true} style={styles.tagsList}>
					{this.data.tags.map(
						(tag, i) => 
						<EachTag key={i} tag={tag} large={true} toRoute={this.props.toRoute}/>)
					}
				</ScrollView>

				<EachDetail heading={true}>
					<Text style={globalStyles.text.roman}>What are You Doing?</Text>
				</EachDetail>
				<ScrollView directionalLockEnabled={true} style={styles.collectionList} horizontal={true} >
					{this.data.collection.map(
						(collection,i) => 
							<CollectionItem key={i} data={collection} replaceRoute={this.props.replaceRoute} toRoute={this.props.toRoute} style={{marginRight: 10,}}/>
						)
					}
				</ScrollView>

				<EachDetail heading={true}>
					<Text style={globalStyles.text.roman}>Explore Latest Questions</Text>
				</EachDetail>
				<GridView type="latestQuestions" toRoute={this.props.toRoute}/>

				{/*
				<EachDetail heading={true}>
					<Text style={globalStyles.text.roman}>Explore latest questions</Text>
				</EachDetail>
				{comments.map(
					(comment, i) => 
					<CommentItem 
						key={i}
						visibleUser={false} 
						visibleComment={true} 
						data={comment} />
					)
				}
				*/}

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
		width: width - 40,
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
		//flexWrap: 'wrap',
		width: width ,
		marginTop: 10,
	},
	collectionList: {
		marginTop: 20,
		marginLeft: 20,
		height: (width/3 *.65) * 2.1,
	},
});

module.exports = Homepage;
