import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, ImageBackground } from 'react-native';
import Slider from '@react-native-community/slider';
import axios from 'axios';
import { IP } from '@env';

const Ratings = ({ currUser }) => {
  const [rating, setRating] = useState(5);
  const [maxRating, setMaxRating] = useState(null);
  const [maxRatingCount, setMaxRatingCount] = useState(0);

  //fetch initial data 
  useEffect(() => {
    fetchMaxRatingCount();
    fetchMaxRating();
  }, []);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://${IP}:3000/api/ratings`, { username: currUser.username, rate: rating });
      alert(response.data.message);
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Error submitting rating');
    }
  };

  const fetchMaxRating = async () => {
    try {
      const response = await axios.get(`http://${IP}:3000/api/ratings/max/rate`);
      setMaxRating(response.data.maxRating); // Assuming API returns an object with a 'maxRating' property
    } catch (error) {
      console.error('Error fetching max rating:', error);
    }
  };

  const fetchMaxRatingCount = async () => {
    try {
      const response = await axios.get(`http://${IP}:3000/api/ratings/max/count`);
      if (response.data && response.data.count !== undefined) {
        setMaxRatingCount(parseInt(response.data.count));
      } else {
        console.error('Invalid data format received for maxRatingCount:', response.data);
      }
    } catch (error) {
      console.error('Error fetching max rating count:', error);
    }
  };

  const handleMaxRatingClick = async () => {
    try {
      await fetchMaxRating();
    } catch (error) {
      console.error('Error fetching max rating:', error);
    }
  };

  const handleMaxRatingCountClick = async () => {
    try {
      await fetchMaxRatingCount();
    } catch (error) {
      console.error('Error fetching max rating count:', error);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/premium-vector/red-poker-background_6735-67.jpg' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Rate War App!</Text>
        <Text style={styles.ratingText}>Rating: {rating}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={rating}
          onValueChange={handleRatingChange}
          minimumTrackTintColor="#1EB1FC"
          maximumTrackTintColor="#1EB1FC"
          thumbTintColor="#1EB1FC"
        />
        <Button title="Submit" onPress={handleSubmit} />
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Statistics</Text>
          <Button title="Fetch Maximum Rating" onPress={handleMaxRatingClick} />
          <Text style={styles.statsText}>Maximum Rating: {maxRating}</Text>
          <Button title="Fetch Maximum Rating Count" onPress={handleMaxRatingCountClick} />
          <Text style={styles.statsText}>Number of Maximum Ratings: {maxRatingCount}</Text>
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
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  ratingText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#ffffff',
  },
  slider: {
    width: 300,
    height: 40,
    marginBottom: 20,
  },
  statsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
  statsText: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 5,
  },
});

export default Ratings;
