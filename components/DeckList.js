import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DeckListItem from './DeckListItem'
import { getDecks } from '../utils/helpers'
import { yellow } from '../utils/colors'

export default class DeckList extends React.Component {
	
	
	state = {
      decks: ''
    }

	componentDidMount(){
		const decks = getDecks()
		this.setState({
			decks
		})
	}

	render() {
		return(
			<View>
				<View style={styles.topText}><Text> DECKS </Text></View>
				{this.state.decks && Object.keys(this.state.decks).map((key) => {
	            return <DeckListItem
	                      title={this.state.decks[key].title}
	                      questionCount={this.state.decks[key].questions.length}
	                      key={this.state.decks[key].title}
	                      navigate={this.props.navigation.navigate}
	                    />
	        	})}
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
	}
})