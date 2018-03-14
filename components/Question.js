import React from 'react'
import { View, Text, TouchableOpacity} from 'react-native'

export default class Question extends React.Component{
	
	constructor(props){
		super(props)
		const { questionNumber, deck } = props.navigation.state.params
		this.state= {
			questionNumber,
			deck,
			question: deck.questions[questionNumber-1].question,
			answer: deck.questions[questionNumber-1].answer
		}
		this.showAnswer = this.showAnswer.bind(this)	
		
	}
	
	showAnswer(){
		const { questionNumber, deck, answer } = this.state
		this.props.navigation.navigate(
			'Answer',
			{ questionNumber, deck, answer }
		)
		
		
	}

	render(){
		return(
			<View> 
				<Text>{`${this.state.questionNumber}/${this.state.deck.questions.length}`}</Text>
				<Text>{this.state.question}</Text>
				<TouchableOpacity onPress={this.showAnswer}> 
					<Text>Show Answer</Text>
				</TouchableOpacity>
			</View>
		)
	}
}