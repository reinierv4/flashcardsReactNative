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

export async function getDecks () {
	AsyncStorage.clear().then(() => {
    try {
      AsyncStorage.getItem(DECKS_STORAGE_KEY).then( (result) => {
        if (result !== null){
          console.log("returning the result...")
          return JSON.parse(value)
        }else{
          addDummyDataToStorage().then( result => {
            console.log("received result..")
          })
        }
      })
    }catch (error) {
      console.log(error)
      return dummyData 
    }
  })
  
}

export function getDeck (deckId) {
	// return AsyncStorage.getItem(DECKS_STORAGE_KEY)
	// 	.then((results) => {
 //      		const data = JSON.parse(results)
 //      		return data[deckId] 
 //      	})
      
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

function addDummyDataToStorage(){
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({})).then( () => {
    saveDeckTitle('React').then( () => {
      console.log("Added the react deck")
      saveDeckTitle('JavaScript').then( () => {
        console.log("Added the js deck")
        addCardToDeck('React', dummyData['React'].questions[0]).then( () => {
          console.log("Added the first react card")
          addCardToDeck('React', dummyData['React'].questions[1]).then( () => {
            console.log("Added the second react card")
            addCardToDeck('JavaScript', dummyData['JavaScript'].questions[0])
            console.log("Finished adding dummy data...")
          })
        })
      })
    })
  })
  
}


//Observations: addCard doesn't seem to wait
//Check if save deck title waits
// see print statements


