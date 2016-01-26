'use strict';

var React = require('react-native');
var {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
} = React;
var { Icon, } = require('react-native-icons');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var LinearGradient = require('react-native-linear-gradient');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var globalStyles = require("../globalStyles.js");
var EachTag = require('../components/EachTag.js');
var Button = require('../components/Button.js');
var LargeItem = require('../components/LargeItem.js');
var SinglePage = require('../SinglePage/new.js');

var NewHome = React.createClass({
	mixins: [ParseReact.Mixin],
	observe: function() {
		var Activity = Parse.Object.extend("Activity");
		var query = new Parse.Query(Activity);
		var lastQuotd = query
			.equalTo('type', 'quotd')
			.descending("updatedAt")
			.limit(1)
			.include(['question', 'question.createdBy', 'question.tag_1', 'question.tag_2', 'question.tag_3']);

	  return {
			lastQuotd: lastQuotd 
		  };
	},
	getInitialState: function (){
		return {
		}
	},
	_goToSinglePage: function (){
		this.props.toRoute({
			name: 'Respond',
			component: SinglePage,
			data: {
				question: this.data.lastQuotd[0].question,
			}
		})	
	},
	render: function() {
		var lastQuotdData;
		if(this.data.lastQuotd[0])
			lastQuotdData = this.data.lastQuotd[0].question;

		return (
			<ScrollView 
				automaticallyAdjustContentInsets={false}
				contentInset={{bottom: 50}}
				style={styles.container}
				>

				<LargeItem data={lastQuotdData}/>

				<View style={styles.actionContainer}>
					<TouchableOpacity onPress={this._goToSinglePage} style={styles.actionItem}>
						<Button text="Respond" />
					</TouchableOpacity>
					<TouchableOpacity onPress={this.props.href} style={styles.actionItem}>
						<Button text="See Responses From Others" noBorder={true}/>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.props.href} style={styles.actionItem}>
						<Button text="Ask a Question" noBorder={true}/>
					</TouchableOpacity>
				</View>

	</ScrollView>
		);
	},

});

var imageHeight = height - height*0.33;
var styles = {
	container: {
		backgroundColor: '#fff',
	},
	actionContainer: {
		width: width - 50,
		margin: 25,
		marginLeft: 20,
		marginTop: 10,
	},
	actionItem: {
		marginTop: 5,	
	},

}

module.exports = NewHome;