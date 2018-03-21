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

export function mulitRemoveDecks(){
  return AsyncStorage.getAllKeys().then(AsyncStorage.mulitRemove)
}


export async function getDecks () {
	 if(await AsyncStorage.getItem(DECKS_STORAGE_KEY)){
      return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result) => {
        return JSON.parse(result)
      })
   }else{
    addDummyDataToStorage.then(getDecks)
   }
}

export function getDeck (deckId) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then((results) => {
      		const data = JSON.parse(results)
      		return data[deckId] 
      	})
      
}

export async function saveDeckTitle ( deckName ) {
	try {
    const value = JSON.parse(await AsyncStorage.getItem(DECKS_STORAGE_KEY))
    if (value && !value[deckName]){
      value[deckName] = { title: deckName, questions: []} 
      await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(value))
    }else{
      console.log("deckcard already exists")
    }
  } catch (error) {
    console.log(error)
  }
  
}

export async function addCardToDeck (deckName, card) {
	try {
    let value = JSON.parse(await AsyncStorage.getItem(DECKS_STORAGE_KEY))
    if (value && value[deckName]){
      value[deckName].questions.push(card)
      await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(value))
    }else{
      console.log("Trying to add a card to deck that doesn't exist...")
    }
  } catch (error) {
    console.log(error)
  }
}

async function addDummyDataToStorage(){
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({})).then( () => {
    saveDeckTitle('React').then( () => {
      saveDeckTitle('JavaScript').then( () => {
        addCardToDeck('React', dummyData['React'].questions[0]).then( () => {
          addCardToDeck('React', dummyData['React'].questions[1]).then( () => {
            console.log("going to add the last card...")
            addCardToDeck('JavaScript', dummyData['JavaScript'].questions[0])
          })
        })
      })
    })
  })
  
}


//Observations: addCard doesn't seem to wait
//Check if save deck title waits
// see print statements


