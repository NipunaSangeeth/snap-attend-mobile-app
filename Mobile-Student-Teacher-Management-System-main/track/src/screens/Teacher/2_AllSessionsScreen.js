import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import trackerApi from "../../api/tracker";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const AllSessionsScreen = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const navigation = useNavigation();

  const handleButton = async (_id) => {
    const response = await trackerApi.get(`/getattendance?sessionId=${_id}`);
    navigation.navigate('SpecificAttenScreen', { Data6: response.data });
  };

  const fetchData = async () => {
    try {
      const response = await trackerApi.get('/attendanceList');
      // Sorting data in descending order based on _id
      const sortedData = response.data.sort((a, b) => b._id - a._id);
      // Reversing the order to display boxes in descending order
      const reversedData = sortedData.reverse();
      setAttendanceData(reversedData);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <ImageBackground source={require('../../../assets/them.jpg')} style={{ height: 750, paddingTop: 140 }}>
      <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ paddingBottom: 20, textAlign: "center", fontSize: 25, fontWeight: "bold" }}>History</Text>
        <FontAwesome style={{ paddingTop: 10 }} name="history" size={25} color="black" />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            {attendanceData.map((item) => (
              <TouchableOpacity key={item._id} style={styles.box} onPress={() => handleButton(item._id)}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.moduleName}>{item.Module_Name}</Text>
                    <Text style={styles.moduleCode}>{item.Module_Code}</Text>
                  </View>
                  <View style={{ flexDirection: "column", flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.date}>Start Date: {item.Session_Start_Date}</Text>
                    <Text style={styles.time}>Start Time: {item.Session_Start_Time}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  box: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  moduleName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  moduleCode: {
    fontSize: 16,
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    marginBottom: 4,
    color: 'black',
    marginBottom: 8,
  },
  time: {
    fontSize: 16,
    color: 'black',
    marginBottom: 8,
  },
});

export default AllSessionsScreen;
