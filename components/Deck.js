import React from 'react'
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

	state = {
		deck: ''
	}

	componentDidMount(){
		const deck = getDeck( this.props.navigation.state.params.deckId )
		this.setState({
			deck
		})
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
					<TouchableOpacity style={[styles.btn]}>
	      				<Text>Add Card</Text>
	    			</TouchableOpacity>
	        		<TouchableOpacity style={[styles.btn]}>
	      				<Text>Start Quiz</Text>
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
		borderRadius: 8,
		borderWidth: 1,
		borderColor: black,
		alignItems: 'center',
		justifyContent: 'center'
	}
})