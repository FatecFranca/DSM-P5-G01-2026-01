import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Text } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import ConsultaScreen from './screens/ConsultaScreen';
import HistoricoScreen from './screens/HistoricoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedUser, setLoggedUser] = useState(null); // estado global

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackImage: () => (
            <Text style={{ fontSize: 18, marginLeft: 10 }}>◀</Text>
          ),
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          initialParams={{ setLoggedUser }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home">
          {props => (
            <HomeScreen
              {...props}
              loggedUser={loggedUser}
              setLoggedUser={setLoggedUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Consulta">
          {props => (
            <ConsultaScreen
              {...props}
              loggedUser={loggedUser}
              setLoggedUser={setLoggedUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Historico">
          {props => (
            <HistoricoScreen
              {...props}
              loggedUser={loggedUser}
              setLoggedUser={setLoggedUser}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
