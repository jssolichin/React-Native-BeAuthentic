var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	AlertIOS,
} = React;

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Parse = require('parse').Parse;

var Button = require('../components/Button.js');
var globalStyles = require('../globalStyles.js');

var LoginPage = React.createClass({
	getInitialState: function (){
		return {
			signupMode: false,
		};
	},

	_signupSubmit: function (){

		if(this.state.password == this.state.password2){
			var user = new Parse.User();
			user.set("username", this.state.username);
			user.set("password", this.state.password);

			user.signUp(null, {
			  success: function(user) {
				// Hooray! Let them use the app now.
			  },
			  error: function(user, error) {
				// Show the error message somewhere and let the user try again.
				AlertIOS.alert("Error: "  + error.message);
			  }
			});
		}
		else
			AlertIOS.alert('Password is not the same');
	},

	_loginSubmit: function (){
		Parse.User.logIn(this.state.username, this.state.password, {
		  success: function(user) {
			// Do stuff after successful login.
		  },
		  error: function(user, error) {
			// The login failed. Check error to see why.
			AlertIOS.alert("Error: Incorrect Username or Password" );
		  }
		});
	},

	_switchForm: function (){
		this.setState({'signupMode': !this.state.signupMode});
	},
	
	render: function() {

		return (
			<View style={[styles.container, globalStyles.centerContent]}>
				<Text style={[styles.heroText, globalStyles.text.heading]}>
					Hello!
				</Text>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.inputText}
						onChangeText={(username) => this.setState({username})}
						value={this.state.username}
						placeholder="username"
						placeholderTextColor='#aaa'
						autoFocus={true}
					/>
				</View>

				<View style={styles.inputContainer}>
				<TextInput
					style={styles.inputText}
					onChangeText={(password) => this.setState({password})}
					value={this.state.password}
					placeholder="password"
					placeholderTextColor='#aaa'
					secureTextEntry={true}
				/>
			</View>

			{this.state.signupMode ? 
				<View style={styles.inputContainer}>
				<TextInput
					style={styles.inputText}
					onChangeText={(password2) => this.setState({password2})}
					value={this.state.password2}
					placeholder="confirm password"
					placeholderTextColor='#aaa'
					secureTextEntry={true}
				/>
			</View> 
			:null }

					<View style={styles.button}>
			<TouchableOpacity style={styles.formSwitcher} onPress={this._switchForm}>
				<Text style={globalStyles.text.color.gray}>
					{this.state.signupMode ? 'Log in' : 'Sign up'}
				</Text>
			</TouchableOpacity>
				<TouchableOpacity onPress={this.state.signupMode ? this._signupSubmit : this._loginSubmit}>
					<Button text={this.state.signupMode ? 'Sign Up' : 'Log In'} />
				</TouchableOpacity>
					</View>

			</View>
		);
	}
});

var styles = StyleSheet.create({
	container: {
	},
	heroText: {
		fontSize: 50,
		marginBottom: 50,	
	},
	inputContainer: {
		borderBottomWidth: 1,	
		marginBottom: 10,
	},
	inputText: {
		width: width ,
		height: 40, 
		padding: 10,
		paddingHorizontal: 20,
		fontSize: 15,
	},
	formSwitcher: {
		marginRight: 10,
	},
	button: {
		marginTop: 50,	
		flexDirection: 'row',
		alignItems: 'center',
	}

});

module.exports = LoginPage;
