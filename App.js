
import { View, Text } from 'react-native'
import React from 'react'
import AppNavigator from './src/navigation/AppNavigator'
import { Provider } from 'react-redux'
import MyStore from './src/redux/MYStore'

const App = () => {
  return (
    <Provider store={MyStore}>//provider is used to make the store available to all components in the app

    
   <AppNavigator/>// ye navigation component hai
   </Provider>
  )
}

export default App