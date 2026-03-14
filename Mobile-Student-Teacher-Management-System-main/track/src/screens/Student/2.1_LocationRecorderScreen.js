import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import * as Location from 'expo-location';
import trackerApi from "../../api/tracker";

import { SafeAreaView } from 'react-native-safe-area-context';

const TrackCreateScreen = ({ navigation, route }) => {
  const { params } = route || {};
  const dataEndTime = params?.data.session.Session_End_Time || null;
  const moduleName = params?.data.session.Module_Name || null;
  const moduleCode = params?.data.session.Module_Code || null;
  const lectruerName = params?.data.session.Lectruer_Name || null;
  const venue = params?.data.session.Venue || null;
  const code = params?.data.session.Attendance_Code || null;
  const date = params?.data.session.Session_Start_Date || null;
  const startTime = params?.data.session.Session_Start_Time || null;
  const sessionId = params?.data.session._id || null;

  const [currentLocation, setCurrentLocation] = useState(null);
  const [endTime, setEndTime] = useState(dataEndTime);
  const [remainingTime, setRemainingTime] = useState('--:--');

  const calculateRemainingTime = () => {
    try {
      if (!endTime) return '00:00';
      const now = new Date();
      const endTimeParts = endTime.split(':');
      if (endTimeParts.length < 2) return '00:00';

      const endDateTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(endTimeParts[0]),
        parseInt(endTimeParts[1]),
        endTimeParts[2] ? parseInt(endTimeParts[2]) : 0
      );

      const differenceInSeconds = Math.floor((endDateTime - now) / 1000);
      if (differenceInSeconds <= 0) return '00:00';

      const minutes = Math.floor(differenceInSeconds / 60);
      const seconds = differenceInSeconds % 60;

      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = seconds.toString().padStart(2, '0');

      return `${formattedMinutes}:${formattedSeconds}`;
    } catch (e) {
      return '00:00';
    }
  };

  useEffect(() => {
    getLocationAsync();
    setRemainingTime(calculateRemainingTime());

    const timer = setInterval(() => {
      const newRemainingTime = calculateRemainingTime();
      setRemainingTime(newRemainingTime);

      if (newRemainingTime === '00:00') {
        console.log("Navigating to NewScreen");
        navigation.navigate('AfterRecordScreen2');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getLocationAsync = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied. Please enable it in settings.');
        return;
      }

      // High accuracy can be slow/fail in simulators without setup, so we use High but catch errors
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error('Error fetching location:', error.message);
      // Fallback to last known position if current fails
      try {
        let lastLocation = await Location.getLastKnownPositionAsync({});
        if (lastLocation) {
          setCurrentLocation({
            latitude: lastLocation.coords.latitude,
            longitude: lastLocation.coords.longitude,
          });
          return;
        }
      } catch (e) {}
      Alert.alert('Location Error', 'Unable to fetch your current location. Please ensure GPS is active.');
    }
  };

  const handleRecordLocation = async () => {
    if (!currentLocation) {
      Alert.alert('Location Missing', 'Please wait for your location to load or ensure location services are enabled.');
      getLocationAsync();
      return;
    }

    try {
      console.log('Recording Location:', currentLocation);
      const response = await trackerApi.post('/submit-attendance', { 
        currentLocation, 
        moduleName, 
        moduleCode, 
        venue, 
        startTime, 
        sessionId 
      });
      navigation.navigate('AfterRecordScreen');
    } catch (error) {
      console.error('Error making API call:', error.message);
      Alert.alert('Error', error.response?.data?.error || 'Failed to submit attendance');
    }
  };

  const tableData = [
    { label1: 'Module', label2: moduleName },
    { label1: 'Session Code', label2: code },
    { label1: 'Venue', label2: venue },
    { label1: 'Date', label2: date },
    { label1: 'End Time', label2: dataEndTime },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.timerTitle}>Session Ends In</Text>
        <Text style={styles.timerValue}>{remainingTime}</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Session Details</Text>
          {tableData.map((rowData, index) => (
            <View key={index} style={styles.dataRow}>
              <Text style={styles.dataLabel}>{rowData.label1}</Text>
              <Text style={styles.dataValue}>{rowData.label2}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.recordButton, !currentLocation && styles.disabledButton]} 
          onPress={handleRecordLocation}
          activeOpacity={0.7}
        >
          <Text style={styles.recordButtonText}>
            {currentLocation ? 'Record Attendance' : 'Detecting Location...'}
          </Text>
        </TouchableOpacity>

        <View style={styles.mapCard}>
          {currentLocation ? (
            <MapView
              key={`map-${currentLocation.latitude}-${currentLocation.longitude}`}
              style={styles.map}
              initialRegion={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
              <Marker
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                title="You are here"
              />
            </MapView>
          ) : (
            <View style={styles.mapPlaceholder}>
              <Icon name="map-marker-radius" size={40} color="#CBD5E0" />
              <Text style={styles.placeholderText}>Searching for GPS signal...</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC', // Light blue-grey background
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#484BF1',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  timerTitle: {
    fontSize: 14,
    color: '#E2E8F0',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  timerValue: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    fontVariant: ['tabular-nums'],
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
    paddingBottom: 10,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  dataLabel: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
    flex: 1,
  },
  dataValue: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '600',
    flex: 2,
    textAlign: 'right',
  },
  recordButton: {
    backgroundColor: '#484BF1',
    paddingVertical: 18,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#484BF1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  disabledButton: {
    backgroundColor: '#A0AEC0',
    shadowOpacity: 0,
    elevation: 0,
  },
  recordButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  mapCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 250,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  map: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
  },
  placeholderText: {
    marginTop: 10,
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default TrackCreateScreen;
