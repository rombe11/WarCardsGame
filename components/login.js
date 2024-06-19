import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity , ImageBackground } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { IP } from '@env';

const Login = ({ setCurrUser }) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      if (!username || !password) {
        alert('Username and password are required');
        return;
      } else {
        
        const userExistsResponse = await axios.get(`http://${IP}:3000/api/users/${username}/exist`, { params: { password: password } });
        const userExists = userExistsResponse.data;
        console.log( userExistsResponse.data);
        if (userExists.isExist) {
          const user = { username };
          setCurrUser(user);

          navigation.navigate('Home');
        } else {
          alert('User Not Found.');
        }
      }
    } catch (error) {
      console.error('Error logging in user: ', error);
    }
  };

  return (
<ImageBackground
      source={{ uri: 'https://img.freepik.com/premium-vector/red-poker-background_6735-67.jpg' }}
      style={styles.background}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      <View style={styles.inputWrapper}>
        <Input
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          inputStyle={{ color: 'black' }}
          placeholderTextColor="#ccc"
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          inputStyle={{ color: 'black' }}
          placeholderTextColor="#ccc"
        />
        <View style={{ marginTop: 20 }}>
          <Button
            onPress={handleSubmit}
            disabled={!username.trim() || !password.trim()}
            appearance="filled"
          >
            Submit
          </Button>
        
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{color:"#FFFFFF", textDecorationLine: 'underline'}}>Don't have an account yet? Register</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF', 
  },
  inputWrapper: {
    width: '75%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    color: 'black',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 17,
  },
});

export default Login;