import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import trackerApi from "../../api/tracker";

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
  const [remainingTime, setRemainingTime] = useState('');

  const calculateRemainingTime = () => {
    const now = new Date();
    const endTimeParts = endTime.split(':');
    const endDateTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      parseInt(endTimeParts[0]),
      parseInt(endTimeParts[1]),
      parseInt(endTimeParts[2])
    );

    const differenceInSeconds = Math.floor((endDateTime - now) / 1000);
    const minutes = Math.floor(differenceInSeconds / 60);
    const seconds = differenceInSeconds % 60;

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    console.log("s1",formattedMinutes);
    console.log("s2",formattedSeconds);

    return `${formattedMinutes}:${formattedSeconds}`;
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
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const handleRecordLocation = async () => {
    try {
      console.log('Recording Location:', currentLocation);
      const response = await trackerApi.post('/submit-attendance', { currentLocation, moduleName, moduleCode, venue, startTime, sessionId });
      navigation.navigate('AfterRecordScreen');
    } catch (error) {
      console.error('Error making API call:', error.message);
    }
  };

  const tableData = [
    { label1: 'Module Name ', label2: ': ' + moduleName },
    { label1: 'Module Code ', label2: ': ' + moduleCode },
    { label1: 'Lecturer Name ', label2: ': ' + lectruerName },
    { label1: 'Venue ', label2: ': ' + venue },
    { label1: 'code ', label2: ': ' + code },
    { label1: 'Date ', label2: ': ' + date },
    { label1: 'endTime ', label2: ': ' + dataEndTime },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.timer1}>Remaining Time</Text>
      <Text style={styles.timer2}>{remainingTime}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.tableContainer}>
          <ScrollView horizontal>
            <View style={styles.tableContent}>
              {tableData.map((rowData, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.rightAlign1]}>{rowData.label1}</Text>
                  <Text style={[styles.tableCell, styles.rightAlign2]}>{rowData.label2}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.recordButton} onPress={handleRecordLocation}>
          <Text style={styles.recordButtonText}>Record Location</Text>
        </TouchableOpacity>
        {currentLocation ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Current Location"
            />
          </MapView>
        ) : (
          <Text>Loading Map...</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#add8e6',
    padding: 25
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginTop: 10
  },
  rightAlign1: {
    textAlign: 'left',
    width: 100
  },
  rightAlign2: {
    textAlign: 'left',
    fontSize: 14,
    width: 200
  },
  recordButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    elevation: 8,
  },
  recordButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  timer1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  timer2: {
    fontSize: 46,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  tableContainer: {
    flex: 1,
    zIndex: 2,
    paddingTop: 10,
    paddingBottom: 8,
    borderRadius: 15,
    paddingLeft: 30,
  },
  tableContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0,
    borderColor: '#ccc',
    width: 260
  },
  tableCell: {
    flex: 1,
    paddingVertical: 7,
    width: 150,
    fontSize: 17
  },
});

export default TrackCreateScreen;
