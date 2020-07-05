import { createAppContainer } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: {
          title: 'Qual o CEP',
        },
      },
    },
    {
      defaultNavigationOptions: {
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 23,
        },

        headerStyle: {
          backgroundColor: '#072B4F',
        },
      },
    }
  )
);

export default Routes;
