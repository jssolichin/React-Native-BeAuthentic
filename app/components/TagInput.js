var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TextInput,
} = React;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var EachTag = require('./EachTag.js');
var globalStyles = require("../globalStyles.js");

var possibleTags = ['hello', 'world', 'love', 'sex', 'wonderful', 'hellipad'];

var TagInput = React.createClass({
	getInitialState: function (){
		return {
			typeAheadList: [],
			chosenTags: [],
		}	
	},
	_getTypeAhead: function (text){
		if(text.length > 2){
			var filteredPossibleTags = possibleTags.filter((tag) => tag.indexOf(text) >= 0);
			this.setState({typeAheadList: filteredPossibleTags});
		}
		else 
			this.setState({typeAheadList: []});
	},
	_clearTypeahead: function (){
		this.setState({typeAheadList: []});
	},
	_addTag: function (tag){
		//if tag is an object, its received via enter key and not passed by function call in callback
		//therefore, it does not have the addition of "+ "
		if(Object.prototype.toString.call(tag) != '[object Object]')
			tag = tag.substring(2);
		else
			tag = this.state.text; 

		if(this.state.chosenTags.indexOf(tag) < 0)
			this.setState({chosenTags: this.state.chosenTags.concat([tag])});

		this.setState({text: ''});
		this._clearTypeahead();
	},
	_removeTag: function (tag){
		tag = tag.substring(0, tag.length-2);
		var indexOfTag = this.state.chosenTags.indexOf(tag);

		if(indexOfTag >= 0){
			var newChosenTags= this.state.chosenTags.slice()
			newChosenTags.splice(indexOfTag, 1);
			this.setState({chosenTags: newChosenTags})
		}
	},
	render: function() {
		var TypeAhead = null;

	   if(this.state.typeAheadList.length > 0 )
		   var TypeAhead = <View style={styles.typeAheadListContainer}>
			   {this.state.typeAheadList.map((item) => 
						<EachTag tag={"+ " + item} large={true} callback={this._addTag}/>
				 )}
						 </View>;

		return (
			<View style={[styles.container]}>
			<View style={[styles.inputContainer]}>
				<View style={styles.tagsList}>
				{(this.state.chosenTags.map((tag) => 
					<EachTag tag={tag + " x"} normal={true} callback={this._removeTag}/>))}
				</View>
				<TextInput
					style={[styles.inputText, this.state.chosenTags.length >= 3 && {width: 0}]}
					onChangeText={(text) => {
						this._getTypeAhead(text);
						this.setState({text});
					}}
					onSubmitEditing={this._addTag}
					value={this.state.text}
					placeholder="Add up to 3 tags"
					placeholderTextColor='#aaa'
				/>
			</View>
			   {TypeAhead}
			</View>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		width: width - 30,
		marginBottom: 20,
		backgroundColor: '#fff',
	},
	inputContainer: {
		padding: 3,
		flexDirection: 'row',
		height: 30,
	},
	tagsList: {
		flexDirection: 'row',
		height: 25,
		marginRight: 5,
	},
	inputText: {
		width: width - 190,
		height: 25, 
		fontSize: 15,
		marginBottom: 20,
		backgroundColor:'transparent',
	},
	typeAheadListContainer: {
		borderTopWidth: 1,
		flexDirection: 'row',
		padding: 10,
		paddingBottom: 5,
	},
});

module.exports = TagInput;
