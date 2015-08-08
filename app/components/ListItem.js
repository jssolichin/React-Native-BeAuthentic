var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
} = React;
var { Icon, } = require('react-native-icons');

var globalStyles = require("../globalStyles.js");

var ListItem = React.createClass({
	getInitialState: function () {
		return {
			visible: false,	
		}	
	},
	render: function() {
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
				<Text style={[styles.heroText, globalStyles.text.heading]}>
					{this.props.data.question}
				</Text>
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
											   <Text style={styles.tag}>
												   {tag}	
											   </Text> 
											  ))}
										  </ScrollView>
									  </View>
									  <View style={styles.eachDetail}>
										  <Text style={styles.eachDetailLead}>
											  {this.state.visible ? this.props.data.topComment.name : '█████'}
										  </Text>
										  <Text style={styles.eachDetailText} numberOfLines="3">
											  {this.props.data.topComment.comment}
										  </Text>
									  </View>
								  </View>
		);
	}
});


var styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 30,
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
	tag: {
		backgroundColor: '#000',
		color: '#fff',
		padding: 2,
		paddingHorizontal: 5,
		//borderRadius: 5,
		marginRight: 2,
		marginTop: -12,
	},
	eachDetailLead: {
		width: 90,	
		fontWeight: 'bold',
	},
	eachDetailText: {
		width: 225, 
		fontSize: 12,
	},
	icon: {
		width: 35, 	
		height: 35, 
		marginRight: 5,
	},
});

module.exports = ListItem;
