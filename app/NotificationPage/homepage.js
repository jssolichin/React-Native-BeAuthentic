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
var Spinner = require('react-native-spinkit');

var EachDetail = require('../components/EachDetail.js');
var TagInput = require('../components/TagInput.js');
var Button = require('../components/Button.js');
var Banner = require('../components/Banner.js');
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
			case 'quotd':
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
	_addToCollection: function () {
		var AddButton = require('../components/AddButton.js');
		return 	<AddButton emitter={this.props.emitter} data={this.props.data.question}/>;
	},
	_goToSinglePage: function() {
		var SinglePageView = require('../SinglePage/view.js');
	    this.props.toRoute({
		      name: "A Heart Question",
		      component: SinglePageView,
			  rightCorner: this._addToCollection,
			  passProps: {
				  emitter: this.props.emitter,
			  },
			  data: {
				  question: {objectId: this.props.data.question.id}, 
				  toRoute: this.props.toRoute,
			  },
		    });
  	},
	_goToRespondPage: function() {
		console.log(this.props.data.question)
		var RespondPage = require('../SinglePage/new.js');
		this.props.toRoute({
			name: 'Respond',
			component: RespondPage,
			passProps: {
				emitter: this.props.emitter,
			},
			data: {
				question: {objectId: this.props.data.question.id, text: this.props.data.question.get('text')}, 
				toRoute: this.props.toRoute,
			}
		})	
  	},
	_goToProfilePage: function() {
		var ProfilePage = require('../ProfilePage/homepage.js');
	    this.props.toRoute({
		      name: this.props.data.user.get('username'), 
		      component: ProfilePage,
			  passProps: {
				  emitter: this.props.emitter,
			  },
			  data: {
				  userId: this.props.data.user.id,
				  toRoute: this.props.toRoute,
			  },
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
						{this.props.data.type != 'quotd' ? 
							<Text>
								<Text onPress={this._goToProfilePage} style={[globalStyles.text.romanBold]}>
									{this.props.data.user.get('username')} 
								</Text>
								<Text style={[]}>
									{this.state.text}
								</Text>
								<Text onPress={this._goToRespondPage} style={[globalStyles.text.romanBold]}>
									{this.props.data.type != 'follow' ? this.props.data.question.get('text').substring(0, 39) + "..." : this.props.data.question.text}
								</Text>
								<Text style={[]}>
									&nbsp;
								</Text>
							</Text>
						: 
							<Text>
								A new question of the day: 
								<Text onPress={this._goToSinglePage} style={[globalStyles.text.romanBold]}>
									{this.props.data.question.get('text')}
								</Text>
								&nbsp;
							</Text>
						}
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
			notificationsLimit: 10,
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
		if(!this.state.loadingMore) {
			var that = this;

			var Activity = Parse.Object.extend("Activity");
			var query = new Parse.Query(Activity)
				.equalTo('toUser', Parse.User.current())
				.notEqualTo('fromUser', Parse.User.current());
				
			var query2 = new Parse.Query(Activity)
				.equalTo('type', 'quotd');

			var mainQuery = Parse.Query.or(query, query2)
				.include('question')
				.include('fromUser')
				.limit(this.state.notificationsLimit)
				.descending('createdAt');

			this.setState({loadingMore: true })
			mainQuery.find({
				success: (activities) => {
					this.setState({loadingMore: false })

					var notifications = activities.map((activity)=> {
						
						if(activity.get('type') != 'quotd')
						activity.set('readStatus', true).save(null, {
							success: function (){
								that.props.updateBadge(0);
							},
							error: function (obj,error) {
								console.log(obj, error)	
							}
						});

						return {
							type: activity.get('type'), 
							user: activity.get('fromUser'), 
							question: activity.get('question'), 
							time: moment(activity.createdAt).fromNow(), 
						}
					})

					var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
					this.setState({dataSource: ds.cloneWithRows(notifications) });
			  },
			  error: function(error) {
				  console.log(error); return null;
			  }
			});
		}
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
	_loadMore: function (){
		if(!this.state.loadingMore && this.state.notificationsLimit <= 50) {
			console.log('Call Loading More');
			this.setState({notificationsLimit: this.state.notificationsLimit + 10});
			this._getActivity();
		}
	},
	render: function() {
		
	  return (
	  <View style={styles.container} >
		  {this.state.showHint ? 
			  <Banner title='Bond Over Experiences ' body='When you share your response, you are subscribed to the question and will get notified when others share their responses.' onPress={this._closeHint}/> 
				  : null
		  }

		  {this.state.dataSource ?  
	      <ListView
			  contentInset={{bottom: 48,}} 
			  style={{backgroundColor: 'transparent', flex: 1,}}
			  automaticallyAdjustContentInsets={false}
			  dataSource={this.state.dataSource}
			  enableEmptySections={true}
			  onEndReached={this._loadMore}
			  onEndReachedThreshold={100}
			  renderFooter={() => this.state.loadingMore ? 
				<View style={[globalStyles.loadingSpinner]}>
					<Spinner isVisible={true} size={50} type='Arc' color='#000'/>
				</View>
				: null
			  }
			renderRow={(rowData) => <NotificationItem data={rowData} emitter={this.props.emitter} toRoute={this.props.toRoute}/>}
		/>
		 :  
			<View style={[globalStyles.loadingSpinner]}>
				<Spinner isVisible={true} size={50} type='Arc' color='#000'/>
			</View>
		  }

	  </View>
	    );
	},
});


var styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
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
