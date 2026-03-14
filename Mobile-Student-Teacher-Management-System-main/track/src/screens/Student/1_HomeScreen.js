import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import trackerApi from "../../api/tracker";
import { SafeAreaView } from 'react-native-safe-area-context';

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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.topic}>Welcome!</Text>
            <Text style={styles.subTopic}>Manage your schedules and alerts</Text>
          </View>
    
          <View style={styles.menuContainer}>
            {/* First Rectangle */}
            <TouchableOpacity style={[styles.rectangle, { backgroundColor: '#484BF1' }]} onPress={handlePressRectangle1} activeOpacity={0.8}>
              <View style={styles.rectangleContent}>
                <View>
                  <Text style={styles.rectangleText}>Time Table</Text>
                  <Text style={styles.rectangleSubText}>View your schedule</Text>
                </View>
                <Image source={require('../../../assets/timetable.png')} style={styles.rectangleImage} />
              </View>
            </TouchableOpacity>
      
            {/* Second Rectangle */}
            <TouchableOpacity style={[styles.rectangle, { backgroundColor: '#2ecc71' }]} onPress={handlePressRectangle2} activeOpacity={0.8}>
              <View style={styles.rectangleContent}>
                <View>
                  <Text style={styles.rectangleText}>Notifications</Text>
                  <Text style={styles.rectangleSubText}>Check your alerts</Text>
                </View>
                <Image source={require('../../../assets/Notification.webp')} style={styles.rectangleImage} />
              </View>
            </TouchableOpacity>
          </View>
    
          <View style={styles.footer}>
            <Image source={require('../../../assets/SLTC.png')} style={styles.image} resizeMode="contain" />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
  },
  topic: {
    fontSize: 36,
    fontWeight: '800',
    color: '#2D3748',
  },
  subTopic: {
    fontSize: 16,
    color: '#718096',
    marginTop: 5,
    fontWeight: '500',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  rectangle: {
    width: '100%',
    height: 140,
    marginVertical: 12,
    borderRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    overflow: 'hidden',
  },
  rectangleContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  rectangleImage: {
    width: 70,
    height: 70,
    opacity: 0.9,
  },
  rectangleText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
  },
  rectangleSubText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 4,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 80,
    opacity: 0.8,
  },
});

export default HomeScreen;
