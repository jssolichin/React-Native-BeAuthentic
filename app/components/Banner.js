var React = require('react-native');
var {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} = React;
var Dimensions = require('Dimensions');
var { Icon, } = require('react-native-icons');
var {width, height} = Dimensions.get('window');

var globalStyles = require("../globalStyles.js");

var Banner = React.createClass({
	render: function (){
		return (
			<View style={[styles.container, this.props.style]}>
				<View style={{ width: width-100 }}>
					{this.props.title == undefined ? null : 
					<Text style={[globalStyles.text.heading, globalStyles.text.size.large]}>
						{this.props.title}
					</Text>
					}
					{this.props.body == undefined ? null : 
						<Text style={[globalStyles.text.roman]}>
						{this.props.body}
					</Text>}
					{this.props.children}
				</View>
				{this.props.onPress == undefined ? null : 
				<TouchableOpacity onPress={this.props.onPress} style={styles.iconPosition }>
					<Icon
						name={'ion|ios-close-empty'}
						size={30}
						color='#979797'
						style={styles.icon}
					/>
				</TouchableOpacity>}
			</View>
		);
	}
});

var styles = {
	container: {
		padding: 20,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2,},
		shadowRadius: 4,
		shadowOpacity: .2,
		borderBottomWidth: 1,
		borderColor: '#979797',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	iconPosition: {
		marginTop: -10,
		marginRight: -10,
	},
	icon: {
		width: 20,
		height: 20,
	}
}

module.exports = Banner
