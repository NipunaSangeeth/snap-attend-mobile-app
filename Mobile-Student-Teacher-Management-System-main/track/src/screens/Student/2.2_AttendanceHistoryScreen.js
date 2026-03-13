import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const formatDate = (dateString) => {
  const options = {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: true 
  };
  return new Date(dateString).toLocaleString(undefined, options);
};

const AttendanceHistoryScreen = ({ route }) => {
  const { params } = route || {};
  const attendanceData = params?.attendanceHistory.attendanceHistory || [];
  console.log("Attendance Data: ", attendanceData);

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#484BF1", width: "100%", height: 18 }}></View>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText1}>Module Name</Text>
          <Text style={styles.headerText2}>Module Code</Text>
          <Text style={styles.headerText3}>Start Time</Text>
          <Text style={styles.headerText4}>Date & Time</Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {attendanceData.map((item, index) => (
            <View key={item.moduleCode + index} style={styles.row}>
              <Text style={styles.cell1}>{item.moduleName}</Text>
              <Text style={styles.cell2}>{item.moduleCode}</Text>
              <Text style={styles.cell3}>{item.startTime}</Text>
              <Text style={styles.cell4}>{formatDate(item.attendanceDate)}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  innerContainer: {
    flex: 1, // Add flex to ensure it takes up available space
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 2,
    paddingBottom: 5,
    borderColor:'#2773e5',
    paddingTop:10
  },
  headerText1: {
    fontWeight: 'bold',
    fontSize: 13,
    width: screenWidth * 0.3,
    textAlign: 'center',
    color:'#2166cd'
  },
  headerText2: {
    fontWeight: 'bold',
    fontSize: 12,
    width: screenWidth * 0.2,
    textAlign: 'center',
    color:'#2166cd'
  },
  headerText3: {
    fontWeight: 'bold',
    fontSize: 12,
    width: screenWidth * 0.2,
    textAlign: 'center',
    color:'#2166cd'
  },
  headerText4: {
    fontWeight: 'bold',
    fontSize: 12,
    width: screenWidth * 0.3,
    textAlign: 'center',
    color:'#2166cd'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderBottomWidth: 1.5,
    paddingBottom: 5,
    paddingHorizontal: 1,
    borderColor:'#5d97ee'
  },
  cell1: {
    fontSize: 14,
    color: 'black',
    width: screenWidth * 0.3,
    textAlign: 'center',
  },
  cell2: {
    fontSize: 14,
    color: 'black',
    width: screenWidth * 0.2,
    textAlign: 'center',
  },
  cell3: {
    fontSize: 14,
    color: 'black',
    width: screenWidth * 0.2,
    textAlign: 'center',
  },
  cell4: {
    fontSize: 14,
    color: 'black',
    width: screenWidth * 0.3,
    textAlign: 'center',
  },
});

export default AttendanceHistoryScreen;
