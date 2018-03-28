import React from 'react'
import { ScrollView, View, Text, StyleSheet, AsyncStorage } from 'react-native'
import DeckListItem from './DeckListItem'
import NewDeck from './NewDeck'
import { getDecks, mulitRemoveDecks, addDummyDataToStorage } from '../utils/helpers'
import { yellow } from '../utils/colors'

export default class DeckList extends React.Component {
	
	
	state = {
      decks: ''
    }

	componentDidMount(){
		try{
			// mulitRemoveDecks()
			// .then(addDummyDataToStorage)
			// .then(getDecks)
			getDecks().then((result) => {
				const decks = JSON.parse(result)
				console.log(decks)
				this.setState({
					decks
				})
			})
				
		}catch(error){
			console.log(error)
		}
		
	}

	render() {
		return(
			<ScrollView>
				<View style={styles.topText}><Text> DECKS </Text></View>
				{!!this.state.decks && Object.keys(this.state.decks).map((key) => {
	            return <DeckListItem
	                      title={this.state.decks[key].title}
	                      questionCount={this.state.decks[key].questions.length}
	                      key={this.state.decks[key].title}
	                      navigate={this.props.navigation.navigate}
	                    />
	        	})}
	        	<NewDeck 
	        		navigate={this.props.navigation.navigate}
	        	/>
	        </ScrollView>
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
	}
})