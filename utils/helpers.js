//Add the interactions with the AsyncStorage here
//getDecks: return all of the decks along with their titles, questions, and answers. 
//getDeck: take in a single id argument and return the deck associated with that id. 
//saveDeckTitle: take in a single title argument and add it to the decks. 
//addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'Flashcards:notifications'
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
  return AsyncStorage.removeItem(DECKS_STORAGE_KEY)
}


export async function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
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
      return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(value))
    }else if(value && value[deckName]){
      console.log("deckcard already exists")
    }else if(!value){
      const value = {}
      value[deckName] = { title: deckName, questions: []} 
      return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(value))
    }else{
      console.log("unknown error..")
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
      return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(value))
    }else{
      console.log("Trying to add a card to deck that doesn't exist...")
    }
  } catch (error) {
    console.log(error)
  }
}

export function addDummyDataToStorage(){
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData))
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(notifications.cancelAllScheduledNotificationAsync)
}

function createNotification() {
  return{
    title: "A quizz a day...",
    body: "..keeps unemployement away! ",
    sound: true
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if( data === null){
        Permissions.askAsync(Permissions.NOTIFICATION)
        .then(({status}) => {
          if(status === 'granted'){
            Notifications.cancelAllScheduledNotificationAsync()
            let tomorrow = new Date()
            tomorrow.setData(tomorrow.getDate() + 1)
            tomorrow.setHours(23)
            tomorrow.setMinutes(0)
            Notifications.setLocalNotificationAsync(
              createNotification(),
              {
                time: tomorrow,
                repeat: 'day',
              }
            )
            AsyncStorage.setItem(NOTIFICATION, JSON.stringify(true))
          }
        })
      }      
    })
}