import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home'; 
import Login from './components/login'; 
import Register from './components/Register'; 
import Game from './components/Game'; 
import { Image } from 'react-native';
import Statistics from './components/statistics';
import Profile from './components/Profile';
import Ratings from './components/Ratings';


const Stack = createStackNavigator();

//Logo component
const LogoTitle = () => {
  return (
    <Image
      source={{ uri: 'https://static.thenounproject.com/png/638932-200.png' }}
      style={{ width: 40, height: 40, borderRadius: 5 }}
    />
  );
};

export default function App() {
  const [currUser, setCurrUser] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: props => <LogoTitle {...props} />,
            headerTitleAlign: 'center',

          }}
        />
        <Stack.Screen name="Login">
          {(props) => <Login {...props} setCurrUser={setCurrUser} />}
        </Stack.Screen>
        <Stack.Screen name="Register">
          {(props) => <Register {...props} setCurrUser={setCurrUser} />}
        </Stack.Screen>
        <Stack.Screen name="Game">
          {(props) => <Game {...props} currUser={currUser} />}
        </Stack.Screen>
        <Stack.Screen name="Profile">
          {(props) => <Profile {...props} currUser={currUser} setCurrUser={setCurrUser}/>}
        </Stack.Screen>
        <Stack.Screen name="Ratings">
          {(props) => <Ratings {...props} currUser={currUser}/>}
        </Stack.Screen>
        <Stack.Screen
          name="Statistics"
          component={Statistics}
          options={{ headerTitle: 'Top 10 & Stats' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
