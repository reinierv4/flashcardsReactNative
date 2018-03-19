import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { gray } from '../utils/colors'
import { Entypo } from '@expo/vector-icons'
import CreateDeck from './CreateDeck'


export default class NewDeck extends React.Component {

	constructor(props){
		super(props)
		this.onPressDeck = this.onPressDeck.bind(this)
	}

	onPressDeck() {
		this.props.navigate(
			'CreateDeck',
		)
  	}

	render(){
		return( 
			<TouchableOpacity onPress={this.onPressDeck}>	
				<View style={styles.container}>
					<Entypo name="add-to-list" size={32} color={gray} />
			        <Text style={{color: gray }}>
			       		Create new deck
			       	</Text>
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