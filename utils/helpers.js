//Add the interactions with the AsyncStorage here
//getDecks: return all of the decks along with their titles, questions, and answers. 
//getDeck: take in a single id argument and return the deck associated with that id. 
//saveDeckTitle: take in a single title argument and add it to the decks. 
//addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 
import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'Flashcards:decks'




const dummyData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function getDecks () {
	
  return dummyData
	//return AsyncStorage.getItem(DECKS_STORAGE_KEY)
}

export function getDeck (deckId) {
	// return AsyncStorage.getItem(DECKS_STORAGE_KEY)
	// 	.then((results) => {
 //      		const data = JSON.parse(results)
 //      		return data[deckId] 
 //      	})
      return dummyData[deckId]
}

export function saveDeckTitle ( { deck, deckName } ) {
	//TODO
	return ''
}

export function addCardToDeck () {
	//TODO
	return ''
}