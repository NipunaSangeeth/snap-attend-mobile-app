import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import trackerApi from "../../api/tracker";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handlePressRectangle1 = async () => {
    try {
      const response = await trackerApi.get(`/api/getTimetable`);
      navigation.navigate('TimetableScreen', { data: response.data.timetable });
    } catch (error) {
      console.error('Error fetching timetable:', error);
      Alert.alert("Notice", "No timetable found for your batch. Please contact your administrator.");
    }
  };

  const handlePressRectangle2 = async () => {
    try {
      const response = await trackerApi.get(`/api/getTimetable`);
      navigation.navigate('NotificationScreen', { data: response.data.timetable });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      Alert.alert("Notice", "Failed to fetch notifications. Ensure your timetable is set up.");
    }
  };

  return (
    <ImageBackground source={require('../../../assets/them.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.topic}>Welcome You !</Text>
  
        {/* First Rectangle */}
        <TouchableOpacity style={[styles.rectangle, { backgroundColor: '#3498db' }]} onPress={handlePressRectangle1}>
          <View style={styles.rectangleContent}>
            <Text style={styles.rectangleText}>Time Table</Text>
            <Image source={require('../../../assets/timetable.png')} style={styles.rectangleImage} />
          </View>
        </TouchableOpacity>
  
        {/* Second Rectangle */}
        <TouchableOpacity style={[styles.rectangle, { backgroundColor: '#2ecc71' }]} onPress={handlePressRectangle2}>
          <View style={styles.rectangleContent}>
            <Text style={styles.rectangleText}>Notifications</Text>
            <Image source={require('../../../assets/Notification.webp')} style={styles.rectangleImage} />
          </View>
        </TouchableOpacity>
  
        <Image source={require('../../../assets/SLTC.png')} style={styles.image} resizeMode="contain" />
      </View>
    </ImageBackground>
  );
  
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, // Make the container take up all available space
    paddingTop:100
    //paddingTop: Platform.OS === 'android' ? 150 : 100
  },
  backgroundImage:{
    flex: 1, // Make the background image cover the entire viewport
    resizeMode: 'cover', // Stretch the image to fill the container
  },
  rectangle: {
    width: 300,
    height: 150,
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden', // Clip the image to the rectangle
  },
  rectangleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingTop:40
  },
  rectangleImage: {
    width: 60,
    height: 60,
  },
  rectangleText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: '100%', // Take full width
    height: 120, // Set the height as needed
    marginVertical: 20,
    borderRadius: 10,
  },
  topic: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:20
  },
});

export default HomeScreen;
