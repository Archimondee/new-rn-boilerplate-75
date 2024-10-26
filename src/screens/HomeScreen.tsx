import { useToast } from 'hooks/useToast';
import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import Config from 'react-native-config';
import { useGetRandomUser } from 'services/ExampleService';

interface HomeScreenProps { }

const HomeScreen = (props: HomeScreenProps) => {
  const { data } = useGetRandomUser(1, 10)
  const { alertActions } = useToast();

  const showToast = () => {
    alertActions.showAlert({ text: "Hehe", icon: "", withIcon: false })
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HomeScreen</Text>
      {data?.data?.data?.map((item, index) => {
        return (
          <Text key={index} style={{ marginTop: 3 }}>{item.name.title} {item.name.first} {item.name.last}</Text>
        )
      })}
      <TouchableOpacity onPress={() => showToast()}>
        <Text>Toast Show</Text>
      </TouchableOpacity>
      <Text>{`${Config.API_URL}/${Config.API_VERSION}`}</Text>
    </View>
  );
};

export default HomeScreen;
