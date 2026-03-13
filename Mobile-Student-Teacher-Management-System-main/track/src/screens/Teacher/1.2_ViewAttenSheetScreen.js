import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const ViewAttenSheetScreen = ({ route, navigation }) => {
  const { params } = route || {};
  const { data4 } = params || {};
  const { studentsAttendance } = data4 || {};

  console.log(studentsAttendance);

  if (!studentsAttendance || studentsAttendance.length === 0) {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "#484BF1", width: "100%", height: 18 }}><Text></Text></View>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>Wait until Time to end</Text>
          <Text style={styles.messageText}>or</Text>
          <Text style={styles.messageText}>No one has marked attendance.</Text>
        </View>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('HomeTeacherScreen')}
        >
          <Text style={styles.buttonText}>Create Another session</Text>
        </TouchableOpacity>
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
    <View style={styles.container}>
      <View style={{ backgroundColor: "#484BF1", width: "100%", height: 18 }}><Text></Text></View>
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

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('HomeTeacherScreen')}
        >
          <Text style={styles.buttonText}>Create Another session</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  messageText: {
    fontSize: 18,
    color: 'red',
  },
  map: {
    flex: 1,
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
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ViewAttenSheetScreen;
