import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from 'types/NavigatorTypes';
import { navigationRef } from 'utils/NavigationService';
import { createStackNavigator } from '@react-navigation/stack';
import MainNavigator from './MainNavigator';

const App = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <App.Navigator screenOptions={{ headerShown: false }}>
        <App.Screen
          name="MainNavigator"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
      </App.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
