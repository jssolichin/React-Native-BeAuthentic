var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ListView,
	TextInput,
	TouchableHighlight,
} = React;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var { Icon, } = require('react-native-icons');

var EachDetail = require('../components/EachDetail.js');
var TagInput = require('../components/TagInput.js');
var Button = require('../components/Button.js');
var SinglePage = require('../SinglePage/index.js');
var globalStyles = require('../globalStyles.js');

var notifications = [ 
	{type: 'comment', user: 'Jonathan', text: ' wrote a comment on ', to: 'Given the choice of anyone in the world, whom would you want as a dinner guest?', time: '18h'},
	{type: 'question', user: 'Jonathan', text: ' asked the question: ', to: 'Before making a telephone call, do you ever rehearse what you are going to say? Why?',  time: '18h'},
	{type: 'heart', user: 'Jonathan', text: ' hearted the question: ', to: 'Would you like to be famous? In what way?',  time: '18h'},
	{type: 'follow', user: 'Jonathan', text: ' started following ', to: 'you',  time: '18h'},
	{type: 'comment', user: 'Jonathan', text: ' wrote a comment on ', to: 'Given the choice of anyone in the world, whom would you want as a dinner guest?', time: '18h'},
	{type: 'question', user: 'Jonathan', text: ' asked the question: ', to: 'Before making a telephone call, do you ever rehearse what you are going to say? Why?',  time: '18h'},
	{type: 'heart', user: 'Jonathan', text: ' hearted the question: ', to: 'Would you like to be famous? In what way?',  time: '18h'},
	{type: 'follow', user: 'Jonathan', text: ' started following ', to: 'you.',  time: '18h'},
];

var NotificationItem = React.createClass({
	getInitialState: function (){
		var iconType;
		switch(this.props.data.type){
			case 'comment':
				iconType='ios-chatbubble-outline'
				break;
			case 'question':
				iconType = 'ios-help-outline';
				break;
			case 'heart':
				iconType = 'ios-heart-outline';
				break;
			case 'follow':
				iconType = 'ios-personadd-outline';
				break;
			default: 
				icontype = 'ios-information-outline';
				break;
		};

		return {
			active: false,	
			iconType: iconType,
		}	
	},
	_toggleActive: function (){
		//we can only make active state something that can be changed, e.g. whether we are following back or not
		if(this.props.data.type == 'follow')
			this.setState({active: !this.state.active})	
	},
	_goToSinglePage: function() {
	    this.props.toRoute({
		      name: "A Heart Question",
		      component: SinglePage
		    });
  	},
	render: function (){

		return (
			<EachDetail style={styles.notificationItem}>
				<TouchableHighlight onPress={this._toggleActive} underlayColor='#fff'>
					<View style={[
						styles.notificationType, 
						this.props.data.type == 'follow' && {borderColor: '#aaa'}]}>
						<Icon
							name={'ion|'+ this.state.iconType}
						  size={35}
						  color={this.props.data.type == 'follow' && !this.state.active ? '#aaa' : '#000'}
						  style={styles.icon}
						/>
					</View>
				</TouchableHighlight>
				<Text style={[globalStyles.text.roman, styles.notificationText]}>
					<Text style={[globalStyles.text.romanBold]}>
						{this.props.data.user}
					</Text>
					<Text style={[]}>
						{this.props.data.text}
					</Text>
					<Text onPress={this._goToSinglePage} style={[globalStyles.text.romanBold]}>
						{this.props.data.type != 'follow' ? this.props.data.to.substring(0, 39) + "..." : this.props.data.to}
					</Text>
					<Text style={[]}>
						&nbsp;
					</Text>
					<Text style={[globalStyles.text.color.gray]}>
						{this.props.data.time}
					</Text>
				</Text>
			</EachDetail>
		);
	}
});

var NotificationPage = React.createClass({
	getInitialState: function() {
	  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	  return {
	      dataSource: ds.cloneWithRows(notifications),
	    };
	},

	render: function() {
	  return (
	      <ListView
			  contentInset={{bottom: 48,}} 
			  automaticallyAdjustContentInsets={false}
			style={styles.container}
	        dataSource={this.state.dataSource}
			renderRow={(rowData) => <NotificationItem data={rowData} toRoute={this.props.toRoute}/>}
	      />
	    );
	},
});


var styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
	icon: {
		width: 35,
		height: 35,
	}, 
	notificationItem: {
		paddingHorizontal: 10,
	},
	notificationType: {
		width: 50,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
		marginRight: 10,
	},
	notificationText: {
		marginTop: 7,
		flexDirection: 'row',
		width: width - 80,
	},
});

module.exports = NotificationPage;
