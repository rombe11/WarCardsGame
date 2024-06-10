import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Register from './Register'; 

const Tab = createBottomTabNavigator();

const TabNavigation = ({ handleTabChange }) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          tabStyle: {
            marginHorizontal: 20, 
          },
        }}
      >
        <Tab.Screen 
          name="Register" 
          component={Register} 
          listeners={({ navigation }) => ({
            tabPress: e => {
              e.preventDefault();
              handleTabChange('Register');
              navigation.navigate('Register');
            },
          })}
        />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
