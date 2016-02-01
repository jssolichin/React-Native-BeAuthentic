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

var ViewSingle = React.createClass({
	mixins: [ParseReact.Mixin],
	observe: function() {
		var Question = Parse.Object.extend("Question");
		var questionQuery = new Parse.Query(Question)
			.equalTo('objectId', this.props.data.question.objectId)
			.limit(1)
			.include(['createdBy', 'tag_1', 'tag_2', 'tag_3']);

	  return {
			question: questionQuery 
		  };
	},
	getInitialState: function (){
		return {
		}
	},
	render: function() {
		var questionData;
		if(this.data && this.data.question[0])
			questionData = this.data.question[0];

		return (
			<ScrollView 
				automaticallyAdjustContentInsets={false}
				contentInset={{bottom: 50}}
				style={styles.container}
				>

				<LargeItem data={questionData} toRoute={this.props.data.toRoute}/>

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

module.exports = ViewSingle;
