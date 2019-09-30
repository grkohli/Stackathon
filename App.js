import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SearchScreen from './src/screens/SearchScreen';
import ResultsShowScreen from './src/screens/ResultsShowScreen'

//first argument is going to list all the different routes our object has
const navigator = createStackNavigator(
  {
    Search: SearchScreen,
    ResultsShow: ResultsShowScreen
  }, 
  {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
      title: "Restaurant Search"
    }
  }
);

//createAppContainer makes sure we export a React component this file (a default App component)
export default createAppContainer(navigator);