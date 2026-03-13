import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const SpecificAttenScreen = ({ route, navigation }) => {
  const { params } = route || {};
  const { Data6 } = params || {};
  const {studentsAttendance } = Data6 || {};


  if (!studentsAttendance || studentsAttendance.length === 0) {
    return (
      <View style={styles.container1}>
        <View style={{ backgroundColor: "#484BF1", width: "100%", height: 18 }}><Text></Text></View>
        <View style={styles.messageContainer1}>
          <Text style={styles.messageText}>No one has marked attendance.</Text>
        </View>
      </View>
    );
  }
  // Markers for student locations on the map
  const markers = studentsAttendance.map((student, index) => (
    <Marker
      key={index}
      coordinate={{ latitude: student.latitude, longitude: student.longitude }}
      title={student.regNum}
    />
  ));

  // Count the number of regNum
  const regNumCount = studentsAttendance.length;

  return (
    <View style={styles.container2}>
          <View style={{backgroundColor:"#484BF1", width:"100%",height:18}}><Text></Text></View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: studentsAttendance[0].latitude,
          longitude: studentsAttendance[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers}
      </MapView>

      <View style={styles.tableContainer}>
        <Text style={styles.tableHeader}>RegNum</Text>
        <FlatList
          data={studentsAttendance}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.regNum}>{item.regNum}</Text>
            </View>
          )}
        />

        <Text style={styles.countText}>Number of Students: {regNumCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  container1: {
    flex: 1,
  },
  messageContainer1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  messageText: {
    fontSize: 18,
    color: 'red',
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  regNum: {
    fontSize: 16,
  },
  countText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SpecificAttenScreen;
