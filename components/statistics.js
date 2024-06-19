import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import axios from 'axios';
import { IP } from '@env';

const Statistics = ({ navigation }) => {
  const [championsData, setChampionsData] = useState([]);
  const [maxCountry, setMaxCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMaxCountry, setLoadingMaxCountry] = useState(true);
  const [maxLossesUser, setMaxLossesUser] = useState(null); 

  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Top 10' });

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${IP}:3000/api/users`);
        const top10Champions = response.data.sort((a, b) => b.cups - a.cups).slice(0, 10);
        setChampionsData(top10Champions);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchMaxCountry = async () => {
      try {
        const response = await axios.get(`http://${IP}:3000/api/users/max/country`);
        console.log('Max country response:', response.data);
        setMaxCountry(response.data);
      } catch (error) {
        console.error('Error fetching max country:', error);
      } finally {
        setLoadingMaxCountry(false);
      }
    };

    const fetchMaxLossesUser = async () => {
      try {
        const response = await axios.get(`http://${IP}:3000/api/users/max/losses`);
        setMaxLossesUser(response.data);
      } catch (error) {
        console.error('Error fetching user with max losses: ', error);
      }
    };

    fetchData();
    fetchMaxCountry();
    fetchMaxLossesUser(); 
  }, [navigation]);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.username}</Text>
      <Text style={styles.cell}>{item.country}</Text>
      <Text style={styles.cell}>{item.cups}</Text>
    </View>
  );

  if (loading || loadingMaxCountry || !maxLossesUser) { 
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/premium-vector/red-poker-background_6735-67.jpg' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Top 10 Players</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Username</Text>
          <Text style={styles.headerCell}>Country</Text>
          <Text style={styles.headerCell}>Cups</Text>
        </View>
        <FlatList
          data={championsData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
        />
        <View style={styles.statisticsContainer}>
          <Text style={styles.statisticsTitle}>Statistics:</Text>
          <View style={styles.statisticsContent}>
            <View style={styles.statisticsBox}>
              <Text style={styles.statisticsLabel}>Maximum Losses User:</Text>
              <Text style={styles.statisticsText}>{maxLossesUser.username}</Text>
              <Text style={styles.statisticsText}>Losses: {maxLossesUser.loses}</Text>
            </View>
            <View style={styles.statisticsBox}>
              <Text style={styles.statisticsLabel}>Maximum Users Country:</Text>
              <Text style={styles.statisticsText}>{maxCountry ? maxCountry.country : 'N/A'}</Text>
              <Text style={styles.statisticsText}>
                Number of Users: {maxCountry ? maxCountry.userCount : 'N/A'}
              </Text>
            </View>
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
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#ffffff',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statisticsContainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
  },
  statisticsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  statisticsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statisticsBox: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    marginBottom: 10,
  },
  statisticsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
  },
  statisticsText: {
    fontSize: 16,
    color: '#000000',
  },
});

export default Statistics;
