import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import { yellow, black, white, gray } from '../utils/colors'
import { addCardToDeck } from '../utils/helpers'

export default class CreateQuestion extends React.Component {
	
	constructor(props){
		super(props)
		this.state = {
			question: '',
			answer: ''
		}
		this.createCard = this.createCard.bind(this)
	}

	createCard(){
		const card = {
			question: this.state.question,
			answer: this.state.answer
		}
		const deckName = this.props.navigation.state.params.deck.title
		addCardToDeck(deckName, card).then(() => {
			this.props.navigation.navigate(
				'Home',
			)
		})
	}

	render(){
		return(
			<KeyboardAvoidingView style={styles.titleContainer} behavior="padding">
				<TextInput
				   	style={styles.input}
				   	onChangeText={(question) => this.setState({question})}
				   	value={this.state.text}
				   	editable={true}
				   	placeholder="Question..."
				   	placeholderTextColor={gray}
				   	autoCorrect={false}
				   	maxLength={80}
				/>
				<TextInput
				    style={styles.input}
				    onChangeText={(answer) => this.setState({answer})}
				    value={this.state.answer}
				    editable={true}
				    placeholder="Answer..."
				    placeholderTextColor={gray}
				    autoCorrect={false}
				    maxLength={80}
				/>
				{!!this.state.question && !!this.state.answer && 
					<TouchableOpacity style={styles.btn} onPress={this.createCard}><Text style={{color:white}}>Submit</Text></TouchableOpacity>
				}
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	input: {
      margin: 15,
      height: 40,
      width: 300,
      justifyContent: 'center',
      borderColor: black,
      borderWidth: 1,
      textAlign: 'center',
   	},
   	titleContainer:{
		flex: 1,
		alignItems: 'center',
		top: 50
	},
	btn: {
		margin: 5,
		width: 150,
		height: 40,
		marginTop: 50,
		borderRadius: 5,
		borderWidth: 1,
		backgroundColor: black,
		alignItems: 'center',
		justifyContent: 'center'
	},
})