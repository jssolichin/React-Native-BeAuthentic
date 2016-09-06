//TODO: 
// - Link hero to collection

'use strict';

var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ListView,
	Image,
} = React;
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var Spinner = require('react-native-spinkit');

var EachDetail = require('../components/EachDetail.js');
var CollectionListItem = require('../components/CollectionListItem.js');

var globalStyles = require("../globalStyles.js");

var CollectionPage = React.createClass({
	getInitialState: function() {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
		return {
			dataSource: ds.cloneWithRows(this.props.data),
		};
	},
	render: function() {

		console.log(this.props.data)
		return (
			<ListView
				enableEmptySections={true}
				automaticallyAdjustContentInsets={false}
				contentInset={{bottom: 18}}
				style={[styles.container]}
				dataSource={this.state.dataSource.cloneWithRows(this.props.data)}
				renderRow={(rowData) => {
					return <CollectionListItem expanded={true} data={rowData} emitter={this.props.emitter} toRoute={this.props.toRoute} toBack={this.props.toBack} replaceRoute={this.props.replaceRoute} toRoute={this.props.toRoute}/>;
				}}
			/>
		);
	}
});

var CollectionPageLoader = React.createClass({
	mixins: [ParseReact.Mixin],
	observe: function(props, state) {

		var query = new Parse.Query('Collection')
			.include('createdBy')
			.ascending('name')
				
		return {
			collections: query,
		}	

	},
	render: function (){

		if(this.data && this.data.collections) {
			var data = this.data.collections;

			return (
				<View style={styles.container}>
					<CollectionPage data={data} toRoute={this.props.toRoute || this.props.data.toRoute} toBack={this.props.toBack} replaceRoute={this.props.replaceRoute}  emitter={this.props.emitter}/>
				</View>
			);

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
	},
});

module.exports = CollectionPageLoader;
