import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

export default class  Results extends React.Component{
	
	constructor(props){
		super(props)
		this.backHome = this.backHome.bind(this)
	}

	backHome(){
		this.props.navigation.navigate(
			'Home',
		)
	}

	render() {
		const { answeredCorrect, answeredWrong } = this.props.navigation.state.params 
		const percentage = 100*answeredCorrect/(answeredCorrect+answeredWrong)
		return(
			<View style={styles.container}>
				<Text>{answeredCorrect} out of {answeredCorrect+answeredWrong} questions answered correct..</Text>
				<Text style={styles.scoreTxt}>You have a score of {percentage} %!</Text>
				<TouchableOpacity onPress={this.backHome}> 
					<Text>Quiz Overview</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 25
	},
	scoreTxt: {
		fontSize: 25,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

