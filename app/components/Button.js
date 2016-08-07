var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
} = React;
var Spinner = require('react-native-spinkit');

var globalStyles = require("../globalStyles.js");

var EachDetail = React.createClass({
	render: function() {
		var spinnerColor = '#000000';

		if(this.props.invert)
			spinnerColor = '#ffffff';

		return (
			<View style={[styles.button, 
				this.props.style, 
				this.props.invert && styles.invertButton,
				this.props.noBorder && styles.noBorder,
			]}>
				{this.props.loading ?
					<Spinner isVisible={true} size={15} type='Arc' color={spinnerColor} />
					: 
				<Text style={[
					globalStyles.text.roman,
					globalStyles.text.size.medium,
					this.props.invert && styles.invertText
				]}>
					{this.props.text}
				</Text>
				}
			</View>
		);
	}
});

var styles = StyleSheet.create({
	button: {
		padding: 5,
		paddingHorizontal: 10,
		borderWidth: 1,
	},
	noBorder: {
		borderWidth: 0,	
	},
	invertButton: {
		borderColor: '#fff',
	},
	invertText: {
		color: '#fff',
	}
});

module.exports = EachDetail;
