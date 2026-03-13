import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const AfterRecordScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.topic}>Time Has been Ended </Text>
      
      <Image
        source={require('../../../assets/wrong.png')} // Replace with your actual image source
        style={styles.image}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MarkAttendance1')} // Replace 'NextScreen' with the actual screen name
      >
        <Text style={styles.buttonText}>Back to Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  topic: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    height: 150,
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AfterRecordScreen;
