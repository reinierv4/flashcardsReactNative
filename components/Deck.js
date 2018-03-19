import React from 'react'
import Question from './Question'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { getDeck } from '../utils/helpers'
import { white, black, gray } from '../utils/colors'

export default class Deck extends React.Component {
	
	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.deckId,
		headerTintColor: white,
      	headerStyle: {
        	backgroundColor: black,
      	}
	})

	constructor(props) {
	    super(props);
	    this.state = {
	      	deck: '',
	    }
	    this.addCard = this.addCard.bind(this);
	    this.startQuiz = this.startQuiz.bind(this);
  	}

	componentDidMount(){
		const deck = getDeck( this.props.navigation.state.params.deckId )
		this.setState({
			deck
		})
	}

	addCard(){
		console.log(this.props)
	}

	startQuiz(){
		if(this.state.deck && this.state.deck.questions.length > 0){
			this.props.navigation.navigate(
				'Question',
				{deck: this.state.deck, questionNumber: 1 }
			)
		}
		
	}

	render(){
		return(
			<View>
			{this.state.deck &&
				<View style={styles.container}>
					<Text>{this.state.deck.title}</Text>
					<Text style={{color: gray}}>{this.state.deck.questions.length} cards</Text>
				</View>
			}
				<View style={{alignItems: 'center'}}> 
					<TouchableOpacity onPress={this.addCard}>
	      				<View style={[styles.btn]}>
	      					<Text >Add Card</Text>
	      				</View>
	    			</TouchableOpacity>
	        		<TouchableOpacity style={[styles.btn, styles.btnDark]} onPress={this.startQuiz}>
	      				<Text style={{color:white}}>Start Quiz</Text>
	    			</TouchableOpacity>
	    		</View>
			</View>
			
		)
	}
} 

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		height: 300,
		justifyContent: 'center'
	},
	btn: {
		margin: 5,
		width: 200,
		height: 45,
		borderRadius: 5,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	btnDark: {
		backgroundColor: black,
		
	}
})