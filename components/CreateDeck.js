import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { yellow, black, white, gray } from '../utils/colors'
import { saveDeckTitle } from '../utils/helpers'

export default class CreateDeck extends React.Component{
	

	constructor(props) {
	    super(props);
	    this.state = { text: '' };
	    this.createDeck = this.createDeck.bind(this)
	}

	createDeck(){
		const deckName = this.state.text
		saveDeckTitle(deckName).then(() => {
			this.props.navigation.navigate(
				'Home',
			)
		})
	}

	render(){
		return(
			<View style={{alignItems: 'flex-end', flex: 1}}>
				<View style={styles.topText}><Text > NEW DECK</Text></View>
				<View style={styles.titleContainer}>
					<Text style={{fontSize: 35, paddingLeft: 75, paddingRight: 75, textAlign: 'center'}}>What is the title of your new deck?</Text>
					<TextInput
				    	style={styles.input}
				    	onChangeText={(text) => this.setState({text})}
				    	value={this.state.text}
				    	editable={true}
				    	placeholder="New Deck"
				    	placeholderTextColor={gray}
				    	autoCorrect={false}
				    	maxLength={20}
				    />
					<TouchableOpacity style={styles.btn} onPress={this.createDeck}><Text style={{color:white}}>Submit</Text></TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	topText:{
		height: 50,
		width: 150,
		borderBottomWidth: 3,
		borderBottomColor: yellow,
		justifyContent: 'center',
		alignItems: 'center'
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
	titleContainer:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	input: {
      margin: 15,
      height: 40,
      width: 300,
      justifyContent: 'center',
      borderColor: black,
      borderWidth: 1,
      textAlign: 'center'
   },
})