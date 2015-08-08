var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ListView,
} = React;

var ListItem = require('../components/ListItem.js');

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
		question: "What are three verbs that describes your life? Why?",
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
	getInitialState: function() {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return {
			dataSource: ds.cloneWithRows(listData),
		};
	},
	render: function() {
		return (
			<ListView
				automaticallyAdjustContentInsets={false}
				style={styles.container}
				dataSource={this.state.dataSource}
				renderRow={(rowData) => <ListItem data={rowData} />}
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
