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
var CollectionListItem = require('../components/CollectionListItem.js');
var globalStyles = require("../globalStyles.js");

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
	_goToCollectionPage: function() {
		var CollectionPage = require('./CollectionPage.js');

		this.props.toRoute({
			  name: 'All Collections', 
			  component: CollectionPage,
			  passProps: {
				  emitter: this.props.emitter,
			  },
			  data: {
				  toRoute: this.props.toRoute,
			  },
			});
  	},
	render: function() {

		return (
			<ScrollView
				automaticallyAdjustContentInsets={false}
				style={styles.container}
				>

				{this.data.collections ? 
					this.data.collections.length > 0 ? 
						<View>
							{this.data.collections.map((collection, i) => <CollectionListItem key={i} data={collection} toRoute={this.props.toRoute} toBack={this.props.toBack} replaceRoute={this.props.replaceRoute} emitter={this.props.emitter}/>)}
							<TouchableOpacity onPress={this._goToCollectionPage} style={{flex: 1, alignItems: 'flex-end', marginHorizontal: 20, marginTop: 5}}>
								<Text style={globalStyles.text.color.gray}>Show More</Text>
							</TouchableOpacity>
						</View>
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
