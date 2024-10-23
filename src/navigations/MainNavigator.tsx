import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native"
import HomeScreen from "screens/HomeScreen";
import { RootStackParamList } from "types/NavigatorTypes";

const Main = createStackNavigator<RootStackParamList>();
const MainNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <Main.Navigator>
        <Main.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      </Main.Navigator>
    </View>
  )
}

export default MainNavigator