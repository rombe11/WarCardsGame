import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity , ImageBackground} from 'react-native';
import axios from 'axios';
import { IP } from '@env';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../utils/firebaseConfig';
import { FirebaseError } from 'firebase/app';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const navigation=useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userImage, setUserImage] = useState("");
  const [country, setCountry] = useState('');

const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    setUserImage(result.assets[0].uri);
  }
};

const uploadImage = async (uri) => {
  if (!uri) return null;

  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `images/${Date.now()}`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    if (error.code === 'auth/network-request-failed') {
      console.error("Network request failed. Please check your connection.");
    } else if (error instanceof FirebaseError) {
      console.error("Firebase Storage Error:", error.code, error.message, error.customData);
    } else {
      console.error("Unknown Error uploading image:", error);
    }
    return null;
  }
};

  const addUser = async () => {
    try {
      const imgUrl = await uploadImage(userImage);
      console.log(imgUrl);
      if(imgUrl){
        const newUser = await axios.post(`http://${IP}:3000/api/users`, {
          username,
          password,
          userImage:imgUrl,
          country
        });
        console.log('User registered successfully: ', newUser.data);
        alert('Welcome!');
        navigation.navigate('Login')
      
        //Clear input fields 
        setUsername('');
        setPassword('');
        setUserImage('');
        setCountry('');
    
      return newUser.data;
      }
    } catch (error) {
      console.error('Error registering user: ', error);
    }
  };
  const handleRegister = async () => {
    try {
      if (!username || !password) {
        alert('Username and password are required');
        return;
      }
      else{
        const userExistsResponse = await axios.get(`http://${IP}:3000/api/users/${username}/exist`);
        const userExists = userExistsResponse.data;
        console.log(userExists.isExist);
        if (userExists.isExist) {
          alert('Username already exists');
        }
        else{
          await addUser();
        }
      }
    } catch (error) {
      console.error('Error registering user: ', error);
    }
  };
  
  
  return (
<ImageBackground
      source={{ uri: 'https://img.freepik.com/premium-vector/red-poker-background_6735-67.jpg' }}
      style={styles.background}
    >
    <View style={styles.container}>
      
      <Text style={styles.title}>Sign up</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          placeholderTextColor="#ccc"
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Enter your password"
          placeholderTextColor="#ccc"
        />

        <TextInput
          style={styles.input}
          value={country}
          onChangeText={setCountry}
          placeholder="Enter your country"
          placeholderTextColor="#ccc"
        />

      <View style={{ paddingVertical: 20 }}>
        <Button title="Choose Image" style={{ marginBottom: 10, height: 30 }} onPress={pickImage} />
      </View>

      <Button title="REGISTER"  onPress={handleRegister} />

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ paddingTop: 20 }}>
        <Text style={{ color: "#FFFFFF", textDecorationLine: 'underline' }}>Already have an account? Log In</Text>
      </TouchableOpacity>

      
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

export default Register;