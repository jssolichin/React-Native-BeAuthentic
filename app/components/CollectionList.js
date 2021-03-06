var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
} = React;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var Spinner = require('react-native-spinkit');

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
			<EachDetail subItem={true}>
				<View style={[styles.row]}>
					<Text> {this.props.data.name}</Text>
					<Text style={styles.buttonText}>›</Text>
				</View>
			</EachDetail>
		</TouchableOpacity>
		)	
	}
})
var CollectionList = React.createClass({
	mixins: [ParseReact.Mixin],
	observe: function (){

		var query = new Parse.Query('Collection')
			.include('createdBy')
		
		if(this.props.query && this.props.query.userId){
			var user = new Parse.User();
			user.id = this.props.query.userId;

			query.equalTo('createdBy', user);
		}

		if(this.props.query && this.props.query.limit)
			query.limit(this.props.query.limit)

		if(this.props.query && this.props.query.descending)
			query.descending(this.props.query.descending)
				
		return {
			collections: query,
		}	

	},
	componentDidUpdate: function (prevProps) {
		if(prevProps.dirty != this.props.dirty)	{
			this.refreshQueries('collections');
		}
	},
	render: function() {

		return (
			<ScrollView
				automaticallyAdjustContentInsets={false}
				style={styles.container}
				>

				{this.data.collections ? 
					this.data.collections.length > 0 ? 
						this.data.collections.map((collection, i) => <CollectionListItem key={i} data={collection} toRoute={this.props.toRoute} toBack={this.props.toBack} replaceRoute={this.props.replaceRoute} emitter={this.props.emitter}/>) 
						: 
						<View style={{padding: 20, paddingBottom: 0}}>
							<Text style={globalStyles.text.color.gray}>Looks like there's nothing here!</Text>
						</View>
						: 
					<View style={[globalStyles.loadingSpinner]}>
						<Spinner isVisible={true} size={50} type='Arc' color='#000'/>
					</View>
				}

			 </ScrollView>
		);
	}
});


var styles = StyleSheet.create({
	container: {
		flex: 1, 
		marginBottom: -1, 
		backgroundColor: '#fff',
	},
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

module.exports = CollectionList;
