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
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var moment = require('moment');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var { Icon, } = require('react-native-icons');

var EachDetail = require('../components/EachDetail.js');
var TagInput = require('../components/TagInput.js');
var Button = require('../components/Button.js');
var Banner = require('../components/Banner.js');
var SinglePage = require('../SinglePage/index.js');
var globalStyles = require('../globalStyles.js');

var NotificationItem = React.createClass({
	getInitialState: function (){
		var iconType, text;

		switch(this.props.data.type){
			case 'comment':
				text = ' wrote a comment on ';
				iconType='ios-chatbubble-outline'
				break;
			case 'question':
				text = ' asked ';
				iconType = 'ios-help-outline';
				break;
			case 'liked':
				text = ' liked ';
				iconType = 'ios-heart-outline';
				break;
			case 'follow':
				text = ' followed ';
				iconType = 'ios-personadd-outline';
				break;
			default: 
				text = ' ';
				icontype = 'ios-information-outline';
				break;
		};

		return {
			active: false,	
			text: text,
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
						{this.state.text}
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
	  return {
	  };
	},
	componentDidMount: function(){
		this._getActivity();	
		this._getShowHint();	
	},
	_getShowHint: function (){
		var User = Parse.Object.extend("User");
		var query = new Parse.Query(User)
		.equalTo('objectId', Parse.User.current().id);

		query.first({
			success: (user)	=> {
				this.setState({showHint: user.get('showNotifHelp')})
			},
			error: (error) => {
				console.log(error)	
			}
		})
	
	},
	_getActivity: function (){

		var Activity = Parse.Object.extend("Activity");
		var query = new Parse.Query(Activity)
			.limit(10)
			.include('question')
			.include('fromUser')
			.equalTo('toUser', Parse.User.current());

		query.find({
			success: (activities) => {
				var notifications = activities.map((activity)=>{
					var username = activity.get('fromUser').get('username');
					var questionText = activity.get('question').get('text');
					var createdAt = moment(activity.createdAt).fromNow();
				
					return {
						type: activity.get('type'), 
						user: username, 
						to: questionText, 
						time: createdAt, 
					}
				})

				var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
				this.setState({dataSource: ds.cloneWithRows(notifications) });
		  },
		  error: function(error) {
			  console.log(error); return null;
		  }
		});
			
	},
	_closeHint: function (){

		var object = new Parse.User
		object.objectId = Parse.User.current().id;

		var mutator = ParseReact.Mutation.Set(object, {showNotifHelp: false});

		mutator.dispatch()
			.then((error,data) => {
				console.log(error, data)
			})

		this.setState({'showHint': false});
	},
	render: function() {
		
	  return (
	  <View style={styles.container} >
		  {this.state.showHint ? 
			  <Banner title='Bond over experiences ' body='When you share your response, you are subscribed to the question and will get notified when others share their responses.' onPress={this._closeHint}/> 
				  : null
		  }

		  {this.state.dataSource ?  
	      <ListView
			  contentInset={{bottom: 48,}} 
			  style={{backgroundColor: 'transparent'}}
			  automaticallyAdjustContentInsets={false}
	        dataSource={this.state.dataSource}
			renderRow={(rowData) => <NotificationItem data={rowData} toRoute={this.props.toRoute}/>}
		/>
		 :  
			<Text>Loading...</Text>
		  }

	  </View>
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
