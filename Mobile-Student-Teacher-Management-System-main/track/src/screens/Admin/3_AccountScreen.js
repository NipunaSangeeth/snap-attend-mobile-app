import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import Spacer from '../../components/Spacer';
import { Context as AuthContext1 } from '../../context/AuthContext';
import trackerApi from "../../api/tracker";
import { useIsFocused } from '@react-navigation/native';

const AccountScreen = () => {
  const { signout } = useContext(AuthContext1);
  const [email, setEmail] = useState('');
  const isFocused = useIsFocused(); // Get isFocused state

  const getUserDetails1 = async () => {
    try {
      const response = await trackerApi.get(`/getUserDetails1`);
      setEmail(response.data.email);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getUserDetails1(); // Fetch data when screen is focused
    }
  }, [isFocused]);  // Re-run effect when isFocused changes

  return (
    <ImageBackground source={require('../../../assets/acc.jpg')} style={{ height:800, paddingTop: 0 }}>
      <View style={{ backgroundColor: "#484BF1", width: "100%", height: 18, marginBottom: 30, marginTop:0 }}><Text></Text></View>
      <View style={{ paddingTop: 150 }}>
        <Spacer>
          <Text style={styles.subtitle}>
            Manage your account and sign out when needed.
          </Text>
        </Spacer>
        <Spacer>
          <Text style={{fontSize:18, paddingLeft:13, paddingTop:20, paddingBottom:40}}>Email :  {email}</Text>
        </Spacer>
        <View style={{alignItems:"center"}}>
          <Button
            title="Sign Out"
            buttonStyle={styles.signOutButton}
            titleStyle={styles.signOutButtonText}
            onPress={signout}
          />
        </View>
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Light background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black', // Dark gray color
    fontWeight:"bold"
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  customTimeContainer: {
    marginBottom: 20,
  },
  customTimeLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  customTimeInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  toggleButton: {
    backgroundColor: '#9b59b6', // Purple color
    borderRadius: 10,
    marginBottom: 10,
  },
  toggleButtonText: {
    color: '#fff', // White text color
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#3498db', // Blue color
    borderRadius: 10,
    marginBottom: 10,
  },
  signOutButton: {
    backgroundColor: '#e74c3c', // Red color
    borderRadius: 10,
    width: 240
  },
  signOutButtonText: {
    color: '#fff', // White text color
    fontWeight: 'bold',
  },
});

export default AccountScreen;
