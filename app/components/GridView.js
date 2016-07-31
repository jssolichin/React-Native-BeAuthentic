//TODO: add loading state, add empty state

var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ListView,
	TouchableOpacity,
} = React;
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var EachDetail = require('../components/EachDetail.js');
var MiniItem = require('../components/MiniItem.js');
var Banner = require('../components/Banner.js');

var globalStyles = require("../globalStyles.js");

var GridView = React.createClass({
	getInitialState: function() {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
		return {
			dataSource: ds.cloneWithRows(this.props.data),
		};
	},
	render: function() {

		return (
			<View style={styles.container}>
			{this.props.source && this.props.source.description ? <Banner body={this.props.source.description} /> : null}
			{this.props.data.length > 0 ? 
				<View>
			<ListView
				automaticallyAdjustContentInsets={false}
				style={[styles.container]}
				contentContainerStyle={globalStyles.flexRow}
				dataSource={this.state.dataSource.cloneWithRows(this.props.data)}
				bounces={false}
				renderRow={(rowData) => {
					return (
						<MiniItem 
							key={rowData.objectId} 
							data={rowData}
							toRoute={this.props.toRoute}
							secondary={this.props.secondary}
							source={this.props.source}
						/>
					);
				}}
			/>
		</View>
		: 
			<View style={{padding: 20, paddingBottom: 0}}>
				<Text style={globalStyles.text.color.gray}>Looks like there's nothing here!</Text>
			</View>
		}
		</View>
		);
	}
});

var GridViewLoader = React.createClass({
	_queryByCollection: function (){

		var collection = new Parse.Object('Collection')
		collection.id = this.props.data.collection.objectId;

		var questionsQuery = collection.relation('questions').query();


		return { questions: questionsQuery };

	},
	_queryByTag: function (){
		var Tag = new Parse.Object.extend('Tag');
		var tag = new Tag();
		tag.id = this.props.data.tag.objectId;

		var queryByTag1 = new Parse.Query('Question')
			.equalTo('tag_1', tag);
		var queryByTag2 = new Parse.Query('Question')
			.equalTo('tag_2', tag);
		var queryByTag3 = new Parse.Query('Question')
			.equalTo('tag_3', tag);
		
		var questionsQuery = Parse.Query.or(queryByTag1, queryByTag2, queryByTag3)
			.descending("createdAt");

		  return { questions: questionsQuery };
	},
	_queryLatestQuestions: function (){

		var questionsQuery = new Parse.Query('Question')
			.descending("createdAt").limit(6);

		if(this.props.query && this.props.query.questionsByUserId){
			var user = new Parse.User();
			user.id = this.props.query.questionsByUserId;

			questionsQuery.equalTo('createdBy', user);
		}

		  return { questions: questionsQuery };
	},
	_queryFavoriteQuestions: function (){

		var user = new Parse.User();
		user.id = this.props.query.favoritesByUserId;

		var query = new Parse.Query('Activity');
		var questionsQuery = query
			.equalTo('type', 'liked')
			.equalTo('fromUser', user)
			.descending("createdAt")
			.limit(6)
			.include(['question', 'question.createdBy', 'question.tag_1', 'question.tag_2', 'question.tag_3']);

		  return { questions: questionsQuery };
	},
	mixins: [ParseReact.Mixin],
	observe: function(props, state) {
		if(this.props.data && this.props.data.tag)
			return this._queryByTag();
		else if(this.props.data && this.props.data.collection)
			return this._queryByCollection();
		else if(this.props.type == 'latestQuestions' || (this.props.query && this.props.query.questionsByUserId))
			return this._queryLatestQuestions();
		else if(this.props.query && this.props.query.favoritesByUserId)
			return this._queryFavoriteQuestions();
		else
			return {'error': 'no type selected'}

	},
	secondaryModeHandler: function (){
		if(this.props.data && this.props.data.collection)
			return this.props.data.collection.createdBy.objectId == Parse.User.current().id ? this.removeFromCollection : undefined;
		else
			return undefined;
	},
	removeFromCollection: function (data){
		var collection = new Parse.Object.extend('Collection');
		collection.objectId = data.collectionId;

		var question = new Parse.Object.extend('Question');
		question.objectId = data.objectId;

		var promise = ParseReact.Mutation.RemoveRelation(collection, 'questions', question)
		.dispatch();

		console.log(promise)

		this.refreshQueries('questions');
	},
	render: function (){

		if(this.data && this.data.questions) {
			var data = this.data.questions;

			if(data[0] && data[0].className == 'Activity')	
				data = data.map((activity) => activity.question)

			return <GridView data={data} source={this.props.data || this.props.type} secondary={this.secondaryModeHandler()} toRoute={this.props.toRoute || this.props.data.toRoute}/>;

		}
		else 
			return <Text> Loading... </Text>;

	}
});

var styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
	},
});

module.exports = GridViewLoader;
