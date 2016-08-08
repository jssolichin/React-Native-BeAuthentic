var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
	ListView,
	TouchableOpacity,
} = React;
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var EachDetail = require('../components/EachDetail.js');
var MiniItem = require('../components/MiniItem.js');
var Banner = require('../components/Banner.js');
var Spinner = require('react-native-spinkit');

var globalStyles = require("../globalStyles.js");

var GridView = React.createClass({
	getInitialState: function() {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
		return {
			dataSource: ds.cloneWithRows(this.props.data),
		};
	},
	_goToProfilePage: function() {
		var ProfilePage = require('../ProfilePage/homepage.js');

		this.props.toRoute({
			  name: this.props.source.createdBy.username, 
			  component: ProfilePage,
			  passProps: {
				  emitter: this.props.emitter,
			  },
			  data: {
				  userId: this.props.source.createdBy.objectId,
				  toRoute: this.props.toRoute,
			  },
			});
  	},
	render: function() {

		return (
			<ScrollView style={styles.container}>
				{this.props.source && (this.props.source.description || this.props.source.source) ? 
					<Banner>
						{this.props.source.description ? 
							<Text style={[globalStyles.text.roman]}>
								{this.props.source.description}

							</Text>
							: null}

							{this.props.source.description && this.props.source.createdBy ? <View style={{height: 20}} /> : null}

						{this.props.source.createdBy ? 
							<TouchableOpacity onPress={this._goToProfilePage} style={{flexDirection: 'row'}}>
								<Text style={globalStyles.text.roman}>Created by: </Text>
								<Text style={globalStyles.text.romanBold}>{this.props.source.createdBy.username}</Text>
							</TouchableOpacity>
						: null}

						{this.props.source.source ? <View style={{height: 20}} /> : null}
						
						{this.props.source.source ? 
							<Text style={[globalStyles.text.eachDetailSubheading]}>Source: {this.props.source.source}</Text>
							: null}

					</Banner> 
				: null}
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
							emitter={this.props.emitter}
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
		</ScrollView>
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
			.descending("createdAt")

			console.log(this.props.showMoreName)
		if(this.props.showMoreName != undefined)
			questionsQuery.limit(6)

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
			.include(['question', 'question.createdBy', 'question.tag_1', 'question.tag_2', 'question.tag_3']);

		if(this.props.showMoreName != undefined)
			questionsQuery.limit(6)

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
	componentDidUpdate: function (prevProps) {
		if(prevProps.dirty != this.props.dirty)	{
			this.refreshQueries('questions');
		}
	},
	_goToFullView: function (){

		this.props.toRoute({
			  name: this.props.showMoreName,
			  component: GridViewLoader,
			  passProps: {
				  emitter: this.props.emitter,
				  data: this.props.data,
				  type: this.props.type,
				  query: this.props.query,
			  },
			  data: {
				  toRoute: this.props.toRoute,
			  }
			});

	},
	render: function (){

		if(this.data && this.data.questions) {
			var data = this.data.questions;

			if(data[0] && data[0].className == 'Activity')	
				data = data.map((activity) => activity.question)

			return (
				<View>
					<GridView data={data} source={this.props.data || this.props.type} secondary={this.secondaryModeHandler()} toRoute={this.props.toRoute || this.props.data.toRoute} emitter={this.props.emitter}/>

					{this.props.showMoreName && data.length >= 6 ? 
					<TouchableOpacity onPress={this._goToFullView} style={{flex: 1, alignItems: 'flex-end', marginHorizontal: 20, marginTop: 5}}>
						<Text style={globalStyles.text.color.gray}>Show More</Text>
					</TouchableOpacity>
					: null}

				</View>);

		}
		else 
			return (
				<View style={[globalStyles.loadingSpinner]}>
					<Spinner isVisible={true} size={50} type='Arc' color='#000'/>
				</View>
			);

	}
});

var styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
	},
});

module.exports = GridViewLoader;
