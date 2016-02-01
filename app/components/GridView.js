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
		
		var questionQuery = Parse.Query.or(queryByTag1, queryByTag2, queryByTag3)
			.descending("createdAt");

		  return { question: questionQuery };
	},
	mixins: [ParseReact.Mixin],
	observe: function(props, state) {
		if(this.props.data.tag)
			return this._queryByTag();
		else 
			return {}

	},
	render: function (){

		if(this.data && this.data.question)	
			return <GridView data={this.data.question} toRoute={this.props.data.toRoute}/>;

	}
});

var styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
});

module.exports = GridViewLoader;
