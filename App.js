import React from 'react'
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native'
import { getDecks } from './utils/helpers'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import Question from './components/Question'
import Answer from './components/Answer'
import CreateDeck from './components/CreateDeck'
import CreateQuestion from './components/CreateQuestion'
import Results from './components/Results'
import { Constants } from 'expo'
import { red, white, black } from './utils/colors'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { setLocalNotification } from './utils/helpers'


function MyStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Deck List View',
    },
  },
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
        height: 50
      },
    }
  },
  Question:{
    screen: Question,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
        height: 50
      },
    },
  },
  Answer:{
    screen: Answer,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
        height: 50
      },
    },
  },
  Results:{
    screen: Results,
    navigationOptions: {
      header: null,
    },
  },
  CreateDeck:{
    screen: CreateDeck,
    navigationOptions: {
      title: "Create deck",
      headerTintColor: black,
      headerStyle: {
        backgroundColor: white,
        height: 50
      },
    },
  },
  CreateQuestion:{
    screen: CreateQuestion,
    navigationOptions: {
      title: "Add card",
      headerTintColor: black,
      headerStyle: {
        backgroundColor: white,
        height: 50
      },
    },
  }
})

export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification()
  }

  render() {
    
    return (
      <View style={styles.container}> 
        <MyStatusBar backgroundColor={white}/>
        <MainNavigator />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});




