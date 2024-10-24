import React from 'react';
import { Text, View, } from 'react-native';
import Config from 'react-native-config';
import { useGetRandomUser } from 'services/ExampleService';

interface HomeScreenProps { }

const HomeScreen = (props: HomeScreenProps) => {
  const { data } = useGetRandomUser(1, 10,)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HomeScreen</Text>
      {data?.data?.data?.map((item, index) => {
        return (
          <Text key={index} style={{ marginTop: 3 }}>{item.name.title} {item.name.first} {item.name.last}</Text>
        )
      })}
      <Text>{`${Config.API_URL}/${Config.API_VERSION}`}</Text>
    </View>
  );
};

export default HomeScreen;
