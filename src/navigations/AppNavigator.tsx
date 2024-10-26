import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from 'types/NavigatorTypes';
import {navigationRef} from 'utils/NavigationService';
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigator from './MainNavigator';
import ToastComponent from 'components/Toast';
import {useToast} from 'hooks/useToast';
import {wait} from 'utils/Utils';

const App = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const {alertState, alertActions} = useToast();

  const onCloseToast = () => {
    wait(2000).then(() => {
      alertActions.toggleClose();
    });
  };
  return (
    <NavigationContainer ref={navigationRef}>
      <App.Navigator screenOptions={{headerShown: false}}>
        <App.Screen
          name="MainNavigator"
          component={MainNavigator}
          options={{headerShown: false}}
        />
      </App.Navigator>
      <ToastComponent
        visible={alertState?.isVisible || false}
        text={alertState?.text || ''}
        icon={alertState?.icon || ''}
        withIcon={alertState?.withIcon}
        onHide={onCloseToast}
        onShown={onCloseToast}
      />
    </NavigationContainer>
  );
};

export default AppNavigator;
