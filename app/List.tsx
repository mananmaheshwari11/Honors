import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

type AsteroidData = {
  name: string;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
};

const List = () => {
  const { asteroidNumber } = useLocalSearchParams();
  const [asteroidData, setAsteroidData] = useState<AsteroidData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAsteroidData = async () => {
      try {
        setError(null);
        const response = await fetch(
          `https://api.nasa.gov/neo/rest/v1/neo/${asteroidNumber}?api_key=oQZRZ95yP5LV3fdOOmGENAuou5ZFMet8QELvHf8D`
        );
        if (!response.ok) throw new Error('Data fetch failed');
        const data = await response.json();
        setAsteroidData(data);
      } catch (error) {
        setError("Failed to fetch asteroid data.");
        console.error(error);
      }
    };

    if (asteroidNumber) fetchAsteroidData();
  }, [asteroidNumber]);

  return (
    <ImageBackground source={require('../assets/images/back.jpeg')} style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.title}>Asteroid Information</Text>
        <Text style={styles.subtitle}>Asteroid Number: {asteroidNumber || 'N/A'}</Text>

        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : asteroidData ? (
          <>
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Name</Text>
              <Text style={styles.infoText}>{asteroidData.name}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Estimated Diameter (km)</Text>
              <Text style={styles.infoText}>
                {asteroidData.estimated_diameter.kilometers.estimated_diameter_min} -{' '}
                {asteroidData.estimated_diameter.kilometers.estimated_diameter_max}
              </Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Potentially Hazardous</Text>
              <Text style={styles.infoText}>
                {asteroidData.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
              </Text>
            </View>
          </>
        ) : (
          <Text style={styles.loading}>Loading...</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent overlay
    width: '90%',
    borderRadius: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#F5F5F5',
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#1C1C1E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color for labels
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  error: {
    fontSize: 16,
    color: '#FF6347', // Tomato color for errors
    marginVertical: 10,
  },
  loading: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default List;
