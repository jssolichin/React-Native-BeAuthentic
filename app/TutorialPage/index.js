var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} = React;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Swiper = require('react-native-swiper')
var {Icon, } = require('react-native-icons');
var Button = require('../components/Button.js');

var globalStyles = require('../globalStyles.js');

var iconNames = ['ion|home', 'ion|earth', 'ion|help', 'ion|chatbox', 'ion|person'];
var slides = [
	{
		title: 'GET TO KNOW YOURSELF',
		body: "Everyday we'll give you a new question to help you learn more about yourself."
	},
	{
		title: 'GET TO KNOW OTHERS',
		body: "Explore other questions to ask on your next date, hangout, or happy hour."
	},
	{
		title: 'GET TO KNOW MORE',
		body: "Create more conversations by: asking your own questions or getting a random question to ask IRL."
	},
	{
		title: 'REMEMBER, LIFE IS MORE THAN AN APP',
		body: "Real conversations, with ourselves and others, can help us be more authentic--online, or offline; So, look up!"
	},
]

var Slide = function (props) {
	return (
		<View style={[styles.slide]}>
			<Text style={[globalStyles.text.heading, {fontSize: 50, width: 200}]}>{props.title}</Text>
			<Text style={[globalStyles.text.roman, globalStyles.text.size.large]}>{props.body}</Text>
			{props.children}
		</View>
	)
}

var TutorialPage = React.createClass({
	getInitialState: function (){
		return {
			swiperIndex: 0,
		};
	},
	_onMomentumScrollEnd: function (e, state, context) {
		this.setState({swiperIndex: state.index})
	},
	_disableOnboarding: function (){
		this.props.disableOnboarding('true');
	},
	render: function() {

		var passiveDot = <View style={[styles.dot, {backgroundColor: '#aaa'}]} />;
		var activeDot = <View style={[styles.dot, {backgroundColor: '#000'}]} />;

		// change active tabbar icon
		
		return (
			<View style={styles.container}>
				<Swiper dot={passiveDot} activeDot={activeDot} showPagination={true} autoplay={false} loop={false} onMomentumScrollEnd={this._onMomentumScrollEnd}>
					{slides.map((slide, idx) => {
						return (
							<View key={idx}>
								<Slide title={slide.title} body={slide.body}>

									{idx == 3 ? 
										<View style={styles.actionContainer}>
											<TouchableOpacity onPress={this._disableOnboarding} style={styles.actionItem}>
												<Button text="Get Started →" />
											</TouchableOpacity>
										</View>
									: null }
									
								</Slide>
							</View>
						)
					})}
				</Swiper>
				<View style={[styles.tabBar]}>
					{iconNames.map((iconName, idx) => {
						var iconColor = '#aaa';

						switch(this.state.swiperIndex) {
							case 0:
								if(idx == 0)
								iconColor = '#000';
								break;
							case 1:
								if(idx == 1)
								iconColor = '#000';
								break;
							case 2:
								if(idx == 2)
								iconColor = '#000';
								break;
							default:
								break;

						}

						return (
							<Icon
								key={idx}
							  name={iconName}
							  size={32}
							  color={iconColor}
							  style={styles.icon}
							/>
						)
					})}
				</View>
			</View>
		)
	}
});


var styles = StyleSheet.create({
	container: {
		flex: 1, 
		marginBottom: -1, 
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
	actionContainer: {
		width: width - 40,
		marginTop: 60,
	},
	actionItem: {
		marginTop: 5,	
	},
	slide: {
		padding: 20, 	
		flex: 1,
		justifyContent: 'center',
		height: height,
	},
	tabBar: {
		borderTopWidth: 1,
		height: 49,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
	},
	icon: {
		width: 32,
		height: 32,
	},
	dot: {
		width: 8, 
		height: 8,
		borderRadius: 4, 
		marginHorizontal: 3, 
		marginBottom: height - 70,
	},
});

module.exports = TutorialPage;
