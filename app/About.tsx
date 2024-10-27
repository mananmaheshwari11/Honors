import { ImageBackground, StyleSheet, TouchableOpacity, TextInput, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const HomeScreen = () => {
  const router = useRouter();
  const [asteroidNumber, setAsteroidNumber] = useState('');

  return (
    <ImageBackground source={require('../assets/images/back.jpeg')} style={styles.image}>
      <View style={styles.overlay}>
        <Text style={styles.title}>NASA Asteroid Collections</Text>
        
        <Text style={styles.label}>Enter Asteroid Number</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Asteroid Number" 
          keyboardType="numeric" 
          value={asteroidNumber}
          onChangeText={setAsteroidNumber} 
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => {
            if (asteroidNumber) {
              router.push({
                pathname: '/List',
                params: { asteroidNumber } // Pass asteroidNumber using params
              });
            } else {
              alert('Please enter an asteroid number.');
            }
          }}
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
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
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    height: 40,
    width: '100%',
    paddingHorizontal: 10,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007aff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
