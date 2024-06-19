import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { IP } from '@env';

const Profile = ({ currUser, setCurrUser }) => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(null);
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://${IP}:3000/api/users/${currUser.username}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details: ', error);
      }
    };

    const fetchUserStats = async () => {
      try {
        const response = await axios.get(`http://${IP}:3000/api/users/${currUser.username}/stats`);
        setUserStats(response.data);
      } catch (error) {
        console.error('Error fetching user stats: ', error);
      }
    };

    fetchUserDetails();
    fetchUserStats();
  }, [currUser]);

  const handleLogout = () => {
    setCurrUser(null);
    navigation.navigate('Login');
  };

  if (!userDetails || !userStats) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/premium-vector/red-poker-background_6735-67.jpg' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.profileContent}>
          <View style={styles.profileDetails}>
            <Text style={styles.username}>{userDetails.username}</Text>
            <Text style={styles.detailText}>Country: {userDetails.country}</Text>
            <Text style={styles.detailText}>Cups: {userDetails.cups}</Text>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileImageWrapper}>
            <Image
              source={{ uri: userDetails.userImage || "https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"}}
              style={styles.profileImage}
              onError={(e) => console.error('Error loading image: ', e.nativeEvent.error)}
            />
          </View>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Statistics</Text>
          <View style={styles.statsContent}>
            <Text style={styles.statsText}>Total Games: {userStats.games}</Text>
            <Text style={styles.statsText}>Wins: {userStats.wins}</Text>
            <Text style={styles.statsText}>Losses: {userStats.loses}</Text>
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
  profileContent: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  profileImageWrapper: {
    marginLeft: 20,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 75,
    overflow: 'hidden',
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  profileDetails: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
  },
  logoutButtonText: {
    color: 'red',
    fontSize: 18,
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  statsContainer: {
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
  },
  statsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  statsContent: {
    marginTop: 10,
  },
  statsText: {
    fontSize: 18,
    marginBottom: 5,
    color: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;
