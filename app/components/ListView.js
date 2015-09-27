var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ListView,
} = React;
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var ListItem = require('../components/ListItem.js');
var SinglePage = require('../SinglePage/index.js');
var EachDetail = require('../components/EachDetail.js');

var listData = [
	{
		authorName: 'Jonathan',
		question: "What are three verbs that describes your life? Why?",
		tags: ["Ice Breaker", "Love", "Adventurous"],
		topComment: {
			name: "Jonathan",
			comment: "Maker, Thinker, and Believer. I think that I am a maker because I pursue..."
		}
	},
	{
		authorName: 'Jonathan',
		question: "What is your earliest memory?",
		tags: ["Ice Breaker", "Love", "Adventurous"],
		topComment: {
			name: "Jonathan",
			comment: "Maker, Thinker, and Believer. I think that I am a maker because I pursue..."
		}
	},
	{
		authorName: 'Jonathan',
		question: "What are three verbs that describes your life? Why?",
		tags: ["Ice Breaker", "Love", "Adventurous"],
		topComment: {
			name: "Jonathan",
			comment: "Maker, Thinker, and Believer. I think that I am a maker because I pursue..."
		}
	},
];

var HomePage = React.createClass({
	mixins: [ParseReact.Mixin],
	observe: function(props, state) {
		var questionQuery = new Parse.Query('Question')
			.include(['createdBy', 'tag_1', 'tag_2', 'tag_3'])
			.descending("createdAt");
	  return { question: questionQuery };
	},
	getInitialState: function() {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
		return {
			dataSource: ds.cloneWithRows(listData),
		};
	},
	_goToSinglePage: function() {
	    this.props.toRoute({
		      name: "A Heart Question",
		      component: SinglePage
		    });
  	},
	render: function() {
		return (
			<ListView
				automaticallyAdjustContentInsets={false}
				contentInset={{bottom: 50}}
				style={styles.container}
				dataSource={this.state.dataSource.cloneWithRows(this.data.question)}
				renderRow={(rowData) => <ListItem key={rowData.objectId} showTopComment={true} data={rowData} href={this._goToSinglePage} toRoute={this.props.toRoute}/>}
				renderSeparator={() => <EachDetail style={{height: 50}}></EachDetail>}
				/>
		);
	}
});


var styles = StyleSheet.create({
	container: {
		flex: 1, 
		backgroundColor: '#fff',

	},
});

module.exports = HomePage;
