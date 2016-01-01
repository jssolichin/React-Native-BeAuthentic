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
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

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
		if(text.length >=3){
			var tagQuery = new Parse.Query('Tag')
				.contains('text', text.toLowerCase())
				.ascending("text");

			tagQuery.find({
				success: (results) => {

					var tags = [];

					results.forEach(function(result){
						var tagText = result.get('text')	
						tags.push({text: tagText});
					})

					this.setState({typeAheadList: tags});

				},
				error: (error) => console.log(error)
			})
		}
		else {
			this._clearTypeahead();
		}
	},
	_clearTypeahead: function (){
		this.setState({typeAheadList: []});
	},
	_addTag: function (tag,b,c){
		if(this.state.chosenTags.indexOf(tag) < 0)
			this.setState({chosenTags: this.state.chosenTags.concat([tag])},
						 ()=>this.props.callback(this.state.chosenTags));

		this.setState({text: ''});
		this._clearTypeahead();
	},
	_removeTag: function (tag){
		var indexOfTag = this.state.chosenTags.indexOf(tag);

		if(indexOfTag >= 0){
			var newChosenTags= this.state.chosenTags.slice()
			newChosenTags.splice(indexOfTag, 1);
			this.setState({chosenTags: newChosenTags})
			this.props.callback(this.state.chosenTags)
		}

	},
	render: function() {
		var TypeAhead = null;

	   if(this.state.typeAheadList.length > 0 )
		   var TypeAhead = <View style={styles.typeAheadListContainer}>
			   {this.state.typeAheadList.map((item, i) => 
						<EachTag key={i} tag={item} large={true} callback={this._addTag} displayPlus={true} />
				 )}</View>;
		 else if(this.state.text && this.state.text.length >= 3) 
			 TypeAhead = <View style={styles.typeAheadListContainer}>
				 <EachTag tag={{text: this.state.text.toLowerCase()}} large={true} callback={this._addTag} displayPlus={true} />
			 </View>;

		return (
			<View style={[styles.container]}>
			<View style={[styles.inputContainer]}>
				<View style={styles.tagsList}>
				{(this.state.chosenTags.map((tag, i) => 
					<EachTag key={i} tag={tag} normal={true} callback={this._removeTag} displayX={true}/>))}
				</View>
				<TextInput
					style={[styles.inputText, this.state.chosenTags.length >= 3 && {width: 0}]}
					onChangeText={(text) => {
						this._getTypeAhead(text);
						this.setState({text});
					}}
					//onSubmitEditing={this._addTag}
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
