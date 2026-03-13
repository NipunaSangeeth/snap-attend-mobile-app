import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import trackerApi from "../../api/tracker";
import { useNavigation } from '@react-navigation/native';

const EditTimeTable = () => {
  const [batchCodes, setBatchCodes] = useState([]);
  const navigation = useNavigation();
  
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await trackerApi.get('/getAllBatchCodes');
        setBatchCodes(response.data.batchCodes);
      } catch (error) {
        console.error('Error fetching batch codes:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs only once on component mount

  const handleBatchCodePress = async (code) => {
    try {
      // Make an API call with the selected batch code
      const response = await trackerApi.get('/api/getData', { code });
      // Navigate to the desired screen with the obtained response as a parameter
      navigation.navigate('AfterViewTimeTable', { responseData: response.data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderBatchCodeButtons = () => {
    return batchCodes.map((code) => (
      <TouchableOpacity
        key={code}
        style={styles.batchCodeButton}
        onPress={() => handleBatchCodePress(code)}
      >
        <Text style={styles.buttonText}>{code}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView>
          <View style={styles.buttonContainer}>
            {renderBatchCodeButtons()}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
  },
  batchCodeButton: {
    backgroundColor: '#3498db',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditTimeTable;
