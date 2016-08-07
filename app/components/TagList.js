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

var EachTag = require('../components/EachTag.js');
var globalStyles = require("../globalStyles.js");

var TagsList = React.createClass({
	mixins: [ParseReact.Mixin],
	observe: function (){

		var tagQuery = new Parse.Query('Tag')
			.ascending("text")

			if(this.props.query && this.props.query.context)
				tagQuery.equalTo('context', this.props.query.context);
			else
				tagQuery.limit(10);

			if(this.props.query && this.props.query.limit)
				tagQuery.limit(this.props.query.limit);

			if(this.props.query && this.props.query.ascending)
				tagQuery.ascending(this.props.query.ascending);

		return {
			tags: tagQuery,
		}

	},
	getInitialState: function (){
		return {
			expanded: false,	
		}	
	},
	render: function() {

		if(this.props.collapsible)
		return (
			<View style={styles.tagsContainer} >
				<TouchableOpacity onPress={()=>this.setState({expanded: !this.state.expanded})} >
					<View style={styles.tagsContainerTitle}>
						<Text 
							style={[globalStyles.text.roman, globalStyles.text.size.medium,]}
						>
							{this.props.title}
						</Text>
						<Text>
							{this.state.expanded ? "-" : "+"}
						</Text>
					</View>
				</TouchableOpacity>

				{this.state.expanded ?
					<View style={styles.tagsList}>
						{this.data.tags ? 
							this.data.tags.length > 0 ? 
								this.data.tags.map(
									(tag, i) => 
									<EachTag key={i} tag={tag} large={true} toRoute={this.props.toRoute}/>)
								:
								<View style={{padding: 20, paddingBottom: 0}}>
									<Text style={globalStyles.text.color.gray}>Looks like there's nothing here!</Text>
								</View>
							:
							<View style={[globalStyles.loadingSpinner]}>
								<Spinner isVisible={true} size={50} type='Arc' color='#000'/>
							</View>
						}
					</View>
				: null}

			</View>
		
		);
		else return (
				<ScrollView horizontal={true} style={[styles.tagsList, styles.tagsScroll]}>
					{this.data.tags ? 
						this.data.tags.length > 0 ? 
							this.data.tags.map(
								(tag, i) => 
								<EachTag key={i} tag={tag} large={true} toRoute={this.props.toRoute}/>)
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
	tagsList: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 10,
	},
	tagsScroll: {
		paddingHorizontal: 20,
		width: width - 20 ,
	},
	tagsContainer: {
		width: width -40 ,
		borderWidth: 1,
		marginLeft: 20,
		padding: 10,
		paddingVertical: 5,
		marginBottom: 10,
	},
	tagsContainerTitle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	}
});

module.exports = TagsList;
