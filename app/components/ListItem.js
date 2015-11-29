var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	TouchableOpacity,
} = React;
var { Icon, } = require('react-native-icons');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react');
var TimeAgo = require('react-native-timeago');

var CommentItem = require("./CommentItem.js");
var EachDetail = require('./EachDetail.js');
var EachTag = require('./EachTag.js');
var globalHelpers = require("../globalHelpers.js");
var globalStyles = require("../globalStyles.js");

var ListItem = React.createClass({
	getInitialState: function () {
		var tags = [];

		for(var i=0; i<3; i++){
			if(this.props.data['tag_'+i])
				tags.push(this.props.data['tag_'+i])
		}
			
		return {
			visible: false,	
			tags: tags,
		}	
	},
	render: function() {
		console.log(this.props.data)
		var question;
		if(this.props.href != undefined)
			question = (
				<TouchableOpacity onPress={this.props.href}>
					<Text style={[styles.heroText, globalStyles.text.heading]}>
						{this.props.data.text}
					</Text>
				</TouchableOpacity>
			);
			else
				question = (
					<Text style={[styles.heroText, globalStyles.text.heading]}>
						{this.props.data.text}
					</Text>
				);
				return (
					<View style={styles.container}>
						<View style={[styles.eachDetail, styles.postHeader]}>
							<View style={styles.profileLink}>
								<Image
									style={styles.profileImage}
									source={{uri: this.props.data.createdBy.img_url ? this.props.data.createdBy.img_url.url(): undefined }}
									resizeMode='contain'
								/>
								<View style={[
									styles.profileShort,
								]}>
									<Text style={[
										globalStyles.text.weight.bold, 
										{transform: [{rotateZ: '90deg'}]}
									]}>
										{this.props.data.createdBy ? this.props.data.createdBy.username : "loading..."}
									</Text>
									<Text style={styles.profileBlurb}>
										{this.props.data.createdBy ? globalHelpers.shorten(this.props.data.createdBy.description, 25) : "loading..."}
									</Text>
								</View>
							</View>
							<View>
								<Text style={[globalStyles.text.color.gray]}>
									<TimeAgo time={this.props.data.createdAt.toString()} />
								</Text>
							</View>
						</View>
						<View style={[styles.eachDetail, styles.hero]}>
							{question}
						</View>
						<View style={[styles.eachDetail, styles.toolbar]}>
							<View style={styles.actions}> 
								<Icon
									name='ion|ios-heart-outline'
									size={35}
									color='#000'
									style={styles.icon}
								/>
								<Icon
									name='ion|ios-chatbubble-outline'
									size={35}
									color='#000'
									style={styles.icon}
								/>
							</View>

								<ScrollView directionalLockEnabled={true} style={styles.tagsList} horizontal={true} contentInset={{top: 0,bottom:-50}} >
								{(this.state.tags.map((tag) => 
									<EachTag tag={tag} toRoute={this.props.toRoute}/>
								))}
								</ScrollView>

							</View>

							{ /*
								 (() => {
								return this.props.showTopComment ? <CommentItem visibleUser={this.state.visible} visibleComment={true} data={this.props.data.topComment} /> : undefined; 
								})()
								
								*/}

							</View>
				);
	}
});


var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	postHeader: {
		padding: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	profileLink: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	profileImage: {
		borderRadius: 17,
		width: 35,
		height: 35,
		backgroundColor: '#000'
	},
	profileShort: {
		marginLeft: 10,	
	},
	profileName: {
		fontWeight: 'bold'
	},
	profileBlurb: {
	},
	hero: {
		flexDirection: 'column',
		padding: 15,
		paddingBottom: 0,
	},
	heroText: {
		fontSize: 50,
	},
	eachDetail: {
		padding: 5,
		paddingHorizontal: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#000',
		flexDirection: 'row',
	},
	actions: {
		width: 90,	
		flexDirection: 'row',
		alignItems: 'center',
	},
	tagsList: {
		flexDirection: 'row',
		height: 35,
	},
	icon: {
		width: 35, 	
		height: 35, 
		marginRight: 5,
	},
});

module.exports = ListItem;
