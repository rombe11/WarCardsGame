import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/login'; 
import Chat from './components/Chat';

const Stack = createStackNavigator();

export default function App() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  return (
    
    <NavigationContainer>
     
      <Stack.Navigator>
        <Stack.Screen name="Log in" options={{ headerTitle: "Log In" }}>
          {() => <Login users={users} setUsers={setUsers} setMessages={setMessages} />}
        </Stack.Screen>
        <Stack.Screen name="Chat" options={{ headerBackTitle: "" }}>
          {(props) => <Chat {...props} messages={messages} setMessages={setMessages} />}
        </Stack.Screen>
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}
