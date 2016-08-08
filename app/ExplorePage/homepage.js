//TODO: 
// - Link hero to collection

'use strict';

var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
} = React;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var Spinner = require('react-native-spinkit');

var Swiper = require('react-native-swiper')
var EachDetail = require('../components/EachDetail.js');
var CommentItem = require('../components/CommentItem.js');
var CollectionItem = require('../components/CollectionItem.js');
var CollectionList = require('../components/CollectionList.js');
var TagList = require('../components/TagList.js');
var GridView = require("../components/GridView.js");

var globalStyles = require("../globalStyles.js");

var Homepage = React.createClass({
	mixins: [ParseReact.Mixin],
	observe: function(props, state) {
		var collectionQuery = new Parse.Query('Collection')
			.ascending("text")
			.include('createdBy')	
			.limit(5);

		var heroCollectionQuery = new Parse.Query('Collection')
			.exists('heroItem')
			.include('createdBy')	
			.ascending('createdAt')
			.limit(3);

		var featuredCollectionQuery = new Parse.Query('Collection')
			.exists('featuredItem')
			.include('createdBy')	
			.ascending('createdAt')
			.limit(5);

		return { 
			collection: collectionQuery,
			heroCollection: heroCollectionQuery,
			featuredCollection: featuredCollectionQuery
		};
	},
	render: function() {

		var passiveDot = <View style={[styles.dot, {borderWidth: 1}]} />;
		var activeDot = <View style={[styles.dot, {backgroundColor: 'rgba(0,0,0,1)'}]} />;

		console.log(this.data.heroCollection)
		return (
			<ScrollView style={styles.container} contentInset={{bottom: 80,}} automaticallyAdjustContentInsets={false}>
				<Swiper dot={passiveDot} activeDot={activeDot} height={145} showPagination={true} autoplay={true}>
					{this.data.heroCollection && this.data.heroCollection.length > 0 ?
						this.data.heroCollection.map((collection, i) => 
							<CollectionItem key={i} hero={true} data={collection} replaceRoute={this.props.replaceRoute} toRoute={this.props.toRoute} toBack={this.props.toBack} emitter={this.props.emitter}/>
								) :
						<View style={[globalStyles.loadingSpinner]}>
							<Spinner isVisible={true} size={50} type='Arc' color='#000'/>
						</View>
					}
				</Swiper>

				<EachDetail heading={true}>
					<Text style={globalStyles.text.roman}>Explore Latest Tags</Text>
				</EachDetail>
				<TagList query={{limit: 5, descending: 'updatedAt'}} toRoute={this.props.toRoute} emitter={this.props.emitter}/>

				<EachDetail heading={true}>
					<Text style={globalStyles.text.roman}>Featured Collections</Text>
				</EachDetail>
				<ScrollView directionalLockEnabled={true} style={styles.collectionList} horizontal={true}>
					{this.data.featuredCollection && this.data.featuredCollection.length > 0 ? 
						this.data.featuredCollection.map(
							(collection,i) => 
								<CollectionItem key={i} data={collection} replaceRoute={this.props.replaceRoute} toRoute={this.props.toRoute} style={{marginRight: 10,}} toBack={this.props.toBack} emitter={this.props.emitter}/>
							)
						: 
						<View style={[globalStyles.loadingSpinner]}>
							<Spinner isVisible={true} size={50} type='Arc' color='#000'/>
						</View>
						
					}
				</ScrollView>

				<EachDetail heading={true} style={{marginBottom: 10,}}>
					<Text style={globalStyles.text.roman}>Explore by Context</Text>
				</EachDetail>
				<TagList collapsible={true} title="By Situation" query={{ascending: 'text', context: 'situation'}} toRoute={this.props.toRoute} emitter={this.props.emitter}/>
				<TagList collapsible={true} title="By Topic" query={{ascending: 'text', context: 'topic'}} toRoute={this.props.toRoute} emitter={this.props.emitter}/>
				<TagList collapsible={true} title="By Participants" query={{ascending: 'text', context: 'participants'}} toRoute={this.props.toRoute} emitter={this.props.emitter}/>


				<EachDetail heading={true}>
					<Text style={globalStyles.text.roman}>Explore Latest Questions</Text>
				</EachDetail>
				<GridView showMoreName="Latest Questions" type="latestQuestions" toRoute={this.props.toRoute} emitter={this.props.emitter}/>

				<EachDetail heading={true}>
					<Text style={globalStyles.text.roman}>Explore Latest Collections</Text>
				</EachDetail>
				<CollectionList query={{limit: 5, descending: 'updatedAt'}} toRoute={this.props.toRoute} toBack={this.props.toBack} emitter={this.props.emitter}/>

				{/*
				<EachDetail heading={true}>
					<Text style={globalStyles.text.roman}>Explore latest questions</Text>
				</EachDetail>
				{comments.map(
					(comment, i) => 
					<CommentItem 
						key={i}
						visibleUser={false} 
						visibleComment={true} 
						data={comment} />
					)
				}
				*/}

			</ScrollView>
		);
	}
});


var styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',	
	},
	dot: {
		width: 8, 
		height: 8,
		borderRadius: 4, 
		marginHorizontal: 3, 
		marginBottom: -75,
	},
	collectionList: {
		marginTop: 10,
		marginLeft: 20,
		height: (width/3 *.65) * 2.1,
	},
});

module.exports = Homepage;
