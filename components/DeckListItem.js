import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { gray } from '../utils/colors'

export default class DeckListItem extends React.Component {

	onPressDeck = () => {
		this.props.navigate(
            'Deck',
            {deckId: this.props.title}
        )
  	}

	render(){
		return( 
			<TouchableOpacity onPress={this.onPressDeck}>	
				<View style={styles.container}>
					<Text>{this.props.title}</Text>
					<Text style={{color: gray}}>{this.props.questionCount} cards</Text>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		height: 150,
		justifyContent: 'center',
		borderBottomWidth: 1
	}
})