import { Image, StyleSheet, Platform, TouchableOpacity, TextInput, ImageBackground, View, Text } from 'react-native';
import { useRouter } from 'expo-router'; // Correctly importing useRouter

export default function HomeScreen() {
  const router = useRouter(); // Using useRouter hook
  
  return (
    <ImageBackground source={require('../../assets/images/back.jpeg')} style={styles.image}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to NASA Collections</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/Register')}>
          <Text style={styles.buttonText}>Register yourself</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adds a dark overlay to improve text readability
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
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
