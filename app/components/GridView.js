var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ListView,
} = React;
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var SinglePage = require('../SinglePage/index.js');
var EachDetail = require('../components/EachDetail.js');
var MiniItem = require('../components/MiniItem.js');

var globalStyles = require("../globalStyles.js");

var GridView = React.createClass({
	getInitialState: function() {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
		return {
			dataSource: ds.cloneWithRows(this.props.data),
		};
	},
	_goToSinglePage: function(rowData) {
	    this.props.toRoute({
		      name: "A Heart Question",
			  component: SinglePage,
			  data: rowData,
		    });
  	},
	render: function() {
		return (
			<ListView
				automaticallyAdjustContentInsets={false}
				contentInset={{bottom: 50}}
				style={[styles.container]}
				contentContainerStyle={globalStyles.flexRow}
				dataSource={this.state.dataSource.cloneWithRows(this.props.data)}
				renderRow={(rowData) => {
					return (
						<MiniItem 
							key={rowData.objectId} 
							data={rowData}
							toRoute={this.props.toRoute}
						/>
					);
				}}
			/>
		);
	}
});

var GridViewLoader = React.createClass({
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

		  return { questions: questionsQuery };
	},
	_queryMyFavoriteQuestions: function (){

		var query = new Parse.Query('Activity');
		var questionsQuery = query
			.equalTo('type', 'liked')
			.equalTo('fromUser', Parse.User.current())
			.descending("createdAt")
			.limit(6)
			.include(['question', 'question.createdBy', 'question.tag_1', 'question.tag_2', 'question.tag_3']);

		  return { questions: questionsQuery };
	},
	mixins: [ParseReact.Mixin],
	observe: function(props, state) {
		if(this.props.data && this.props.data.tag)
			return this._queryByTag();
		else if(this.props.type == 'latestQuestions')
			return this._queryLatestQuestions();
		else if(this.props.type == 'myFavoriteQuestions')
			return this._queryMyFavoriteQuestions();
		else
			return {'error': 'no type selected'}

	},
	render: function (){

		if(this.data && this.data.questions) {
			var data = this.data.questions;

			if(data[0] && data[0].className == 'Activity')	
				data = data.map((activity) => activity.question)

			return <GridView data={data} toRoute={this.props.toRoute || this.props.data.toRoute}/>;

		}

	}
});

var styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
});

module.exports = GridViewLoader;
