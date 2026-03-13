import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,ImageBackground } from 'react-native';

const AfterRecordScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require('../../../assets/them.jpg')} style={{height:750, paddingTop:140}}>
    <View style={styles.container}>
      <Text style={styles.header}> Attendance Successfully Recorded! </Text>

      <Image
        source={require('../../../assets/done.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.message}>
        Great job! Your attendance has been successfully recorded.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MarkAttendance1')}
      >
        <Text style={styles.buttonText}>Back to Attendance Screen</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:70

  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#3498db', // Header color
  },
  image: {
    height: 150,
    width: '80%', // Adjusted width for better aesthetics
    marginBottom: 20,
    borderRadius: 10, // Rounded corners
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555', // Message color
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    elevation: 5, // Add elevation for a subtle shadow
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AfterRecordScreen;
