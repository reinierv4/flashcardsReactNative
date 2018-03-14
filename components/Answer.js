import React from 'react'
import { View, Text, TouchableOpacity} from 'react-native'


//Make this a stateless functional component
export default class Answer extends React.Component{
	
	constructor(props){
		super(props)
		const { questionNumber, deck } = props.navigation.state.params
		this.state= {
			questionNumber,
			deck,
			question: deck.questions[questionNumber-1].question,
			answer: deck.questions[questionNumber-1].answer
		}
	}

	render(){
		return(
			<View>
				<Text>{this.state.answer}</Text>
			</View>
		)
	}
}