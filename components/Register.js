import React, { useState } from 'react';
import { View, TextInput, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [country, setCountry] = useState('');
  
  // Function to handle image upload
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please grant permission to access the camera roll');
      return;
      
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setUserImage(result.uri);
    }
  };

  // Function to handle location upload
  const pickLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please grant permission to access location');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      const geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      if (geocode && geocode.length > 0) {
        setCountry(geocode[0].country);
      }
    }
  };

  // Function to handle registration
  const register = async () => {
    try {
      // Upload image to Firebase Storage (not implemented here)
      // Get download URL of the uploaded image (not implemented here)
      const userImageUrl = 'url_of_uploaded_image';

      // Add user data to Firestore
      await firebase.firestore().collection('users').add({
        username,
        password,
        userImage,
        country,
        cups: 0,
      });

      Alert.alert('Registration Successful', 'User registered successfully');
    } catch (error) {
      console.error('Error registering user: ', error);
      Alert.alert('Registration Failed', 'An error occurred while registering the user');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ height: 40, width: '80%', marginBottom: 10, borderColor: 'gray', borderWidth: 1 }}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={{ height: 40, width: '80%', marginBottom: 10, borderColor: 'gray', borderWidth: 1 }}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="Pick Image" onPress={pickImage} />
      {userImage && <Image source={{ uri: userImage }} style={{ width: 200, height: 200, marginBottom: 10 }} />}
      <Button title="Pick Location (country)" onPress={pickLocation} />
      <Button title="Register" onPress={register} />
    </View>
  );
};

export default Register;
