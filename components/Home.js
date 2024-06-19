import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/premium-vector/red-poker-background_6735-67.jpg' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>War Cards Game</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Welcome to War Game!
            The goal is to get the highest value of winning cards, when the game ends.
            Each player gets 26 cards. Turn up a card at the same time; the higher card wins both cards.
            In case of a tie, it's War: each player turns up one card face down and one face up.
            The higher card takes all cards. The game ends when one player picks all the cards.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.startButton]} onPress={() => navigation.navigate('Game')}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.buttonCentered]} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonCentered]} onPress={() => navigation.navigate('Statistics')}>
            <Text style={styles.buttonText}>Top 10</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonCentered]} onPress={() => navigation.navigate('Ratings')}>
            <Text style={styles.buttonText}>Ratings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
  
}
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
      padding: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#ffffff',
    },
    descriptionContainer: {
      marginBottom: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    description: {
      fontSize: 16,
      color: '#ffffff',
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    button: {
      width:150,
      backgroundColor: '#1EB1FC',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    startButton: {
      backgroundColor: '#4CAF50',
    },
    buttonCentered: {
      flex: 1, 
    },
    buttonText: {
      fontSize: 16,
      color: '#ffffff',
      textAlign: 'center',
    },
  });
  

export default Home;
