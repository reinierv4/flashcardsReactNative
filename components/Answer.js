import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { red, green, white, black } from '../utils/colors'

//Make this a stateless functional component
export default class Answer extends React.Component{
	
	constructor(props){
		super(props)
		const { questionNumber, deck, answeredCorrect, answeredWrong } = props.navigation.state.params
		this.state= {
			questionNumber,
			deck,
			question: deck.questions[questionNumber-1].question,
			answer: deck.questions[questionNumber-1].answer,
			answerSubmitted: false,
			answeredWrong,
			answeredCorrect,
		}
		this.incrementCorrectAnswer = this.incrementCorrectAnswer.bind(this)
		this.incrementWrongAnswer = this.incrementWrongAnswer.bind(this)
		this.nextQuestion = this.nextQuestion.bind(this)
		this.showResults = this.showResults.bind(this)
	}

	nextQuestion(){
		const { questionNumber, deck, answeredCorrect, answeredWrong } = this.state
		this.props.navigation.navigate(
			'Question',
			{deck: this.state.deck, questionNumber: questionNumber + 1, answeredCorrect, answeredWrong }
		)
	}

	incrementCorrectAnswer() {
		this.setState((prevState) => {
			return { answeredCorrect: prevState.answeredCorrect+1, answerSubmitted: true }
		})
		
	}

	incrementWrongAnswer() {
		this.setState((prevState) => {
			return { answeredWrong: prevState.answeredWrong+1, answerSubmitted: true }
		})
	}

	showResults() {
		const { answeredCorrect, answeredWrong } = this.state
		this.props.navigation.navigate(
			'Results',
			{ answeredWrong, answeredCorrect }
		)
	}

	render(){
		return(
			<View style={styles.container}>
				<Text>{`${this.state.questionNumber}/${this.state.deck.questions.length}`}</Text>
				<View style={styles.answerContainer}>
					<Text style={styles.answerText}>{this.state.answer}</Text>
					{!this.state.answerSubmitted && 
						<View>
							<TouchableOpacity onPress={this.incrementCorrectAnswer} style={[styles.btn, {backgroundColor: green}]}>
							<Text style={styles.btnText}>
								Correct
							</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={this.incrementWrongAnswer} style={[styles.btn, {backgroundColor: red}]}>
								<Text style={styles.btnText}>
									Wrong
								</Text>
							</TouchableOpacity>
						</View>
					}
					{(this.state.questionNumber < this.state.deck.questions.length) && this.state.answerSubmitted &&
						<TouchableOpacity onPress={this.nextQuestion} style={[styles.btn, {backgroundColor: black}]}>
							<Text style={styles.btnText}>
								Next Question
							</Text>
						</TouchableOpacity>}
					{this.state.questionNumber === this.state.deck.questions.length && this.state.answerSubmitted &&
						<TouchableOpacity onPress={this.showResults} style={[styles.btn, {backgroundColor: black}]}>
							<Text style={styles.btnText}>
								Results
							</Text>
						</TouchableOpacity>
					}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	answerContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	answerText: {
		fontSize: 25, 
		padding: 20, 
		textAlign: 'center'
	},
	btn: {
		margin: 5,
		width: 200,
		height: 45,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnText: {
		color: white,
	}
});