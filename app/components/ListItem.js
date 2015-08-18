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

var CommentItem = require("./CommentItem.js");
var EachDetail = require('./EachDetail.js');
var EachTag = require('./EachTag.js');
var globalStyles = require("../globalStyles.js");

var ListItem = React.createClass({
	getInitialState: function () {
		return {
			visible: false,	
		}	
	},
	render: function() {
		var question;
		if(this.props.href != undefined)
			question = (
				<TouchableOpacity onPress={this.props.href}>
					<Text style={[styles.heroText, globalStyles.text.heading]}>
						{this.props.data.question}
					</Text>
				</TouchableOpacity>
			);
			else
				question = (
					<Text style={[styles.heroText, globalStyles.text.heading]}>
						{this.props.data.question}
					</Text>
				);
			return (
					<View style={styles.container}>
						<View style={[styles.eachDetail, styles.postHeader]}>
							<View style={styles.profileLink}>
								<Image
									style={styles.profileImage}
									source={require('image!profileImage')}
									resizeMode='contain'
								/>
								<View style={styles.profileShort}>
									<Text style={styles.profileName}>
										{this.props.data.authorName}
									</Text>
									<Text style={styles.profileBlurb}>
										Dreamer
									</Text>
								</View>
							</View>
							<View>
								<Text style={styles.timeStamp}>
									12m
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
								{(this.props.data.tags.map((tag) => 
														   <EachTag tag={tag} toRoute={this.props.toRoute}/>
														  ))}
													  </ScrollView>
												  </View>

												  {(() => {
													  return this.props.showTopComment ? <CommentItem visibleUser={this.state.visible} visibleComment={true} data={this.props.data.topComment} /> : undefined; 
												  })()}

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
		backgroundColor: '#333'
	},
	profileShort: {
		marginLeft: 10,	
	},
	profileName: {
		fontWeight: 'bold'
	},
	profileBlurb: {
	},
	timeStamp: {
		color: '#000',
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
