import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AfterViewTimeTable = ({ route }) => {
  // Extract the response data passed as a parameter
  const { params } = route || {};
  const {responseData } = params || {};

  console.log(responseData.timetable);

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        {/* Display the response data */}
        <Text>Not Implemented Yet</Text>
        {/* Add more fields as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 20,
    borderRadius: 10,
  },
});

export default AfterViewTimeTable;
