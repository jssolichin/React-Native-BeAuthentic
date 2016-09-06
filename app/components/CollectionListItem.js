var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} = React;
var Parse = require('parse/react-native');

var EachDetail = require('./EachDetail.js');
var globalStyles = require("../globalStyles.js");

var CollectionListItem = React.createClass({
	_collectionSettings: function () {
		var CollectionSettingsButton = require('./CollectionSettingsButton.js');
		return 	<CollectionSettingsButton emitter={this.props.emitter} data={this.props.data} replaceRoute={this.props.replaceRoute} toRoute={this.props.toRoute} toBack={this.props.toBack}/>;
	},
	_goToCollectionView: function (){
			
		if(this.props.toRoute){
			var GridView = require("./GridView.js");

			var rightCorner;
			if(this.props.data.createdBy.objectId == Parse.User.current().id)
				rightCorner = this._collectionSettings;

			this.props.toRoute({
				  name: this.props.data.name,
				  component: GridView,
				  rightCorner: rightCorner,
				  passProps: {
				 	emitter: this.props.emitter 
				  },
				  data: {
					  collection: this.props.data, 
					  toRoute: this.props.toRoute,
					  description: this.props.data.description,
					  source: this.props.data.source,
					  createdBy: this.props.data.createdBy,
				  }
				});
		}

	},
	render: function (){
		return (
		  <TouchableOpacity onPress={this._goToCollectionView}>
			<EachDetail style={{flexDirection:'column'}}>
				<View style={[styles.row]}>
					<Text style={[
						this.props.expanded	&& globalStyles.text.weight.bold,
						this.props.expanded	&& globalStyles.text.size.medium,
					]}>{this.props.data.name}</Text>
					<Text style={styles.buttonText}>›</Text>
				</View>

				{this.props.expanded ? 
					<Text style={{marginTop: 2, marginBottom: 5,}}>{this.props.data.description}</Text>
					: null
				}
				
			</EachDetail>
		</TouchableOpacity>
		)	
	}
})

var styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		flex: 1,
	},
	buttonText: {
		fontSize: 20,
		marginTop: 5,
		lineHeight: 15,
	    color: '#000',
	  },
});

module.exports = CollectionListItem;
