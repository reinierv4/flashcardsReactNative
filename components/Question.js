import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, black, red } from '../utils/colors'

export default class Question extends React.Component{
	
	static navigationOptions = ({ navigation }) => ({
		title: "quiz",
		headerTintColor: white,
      	headerStyle: {
        	backgroundColor: black,
      	}
	})

	constructor(props){
		super(props)
		const { questionNumber, deck, answeredCorrect=0, answeredWrong=0 } = props.navigation.state.params
		console.log(props.navigation.state.params)
		this.state= {
			questionNumber,
			deck,
			question: deck.questions[questionNumber-1].question,
			answer: deck.questions[questionNumber-1].answer,
			answeredCorrect: answeredCorrect,
			answeredWrong: answeredWrong,
		}
		this.showAnswer = this.showAnswer.bind(this)	
		
	}
	
	showAnswer(){
		const { questionNumber, deck, answer, answeredCorrect, answeredWrong } = this.state
		this.props.navigation.navigate(
			'Answer',
			{ questionNumber, deck, answer, answeredCorrect, answeredWrong }
		)
	}

	render(){
		return(
			<View style={styles.container}> 
				<Text>{`${this.state.questionNumber}/${this.state.deck.questions.length}`}</Text>
				<View style={styles.question}>
					<Text style={{fontSize: 25}}>{this.state.question}</Text>
					<TouchableOpacity onPress={this.showAnswer}> 
						<Text style={{color: red}}>Answer</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	question: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
});
