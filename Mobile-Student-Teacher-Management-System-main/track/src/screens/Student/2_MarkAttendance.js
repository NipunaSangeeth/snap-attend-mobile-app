import React, { useReducer, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, ImageBackground} from 'react-native';
import { Text, Button } from 'react-native-elements';
import Spacer from '../../components/Spacer';
import trackerApi from "../../api/tracker";

const initialState = {
  attendanceCode: '',
  errorMessage: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setAttendanceCode':
      return { ...state, attendanceCode: action.payload };
    case 'setErrorMessage':
      return { ...state, errorMessage: action.payload,attendanceCode: ''  };
    case 'clearErrorMessage':
      return { ...state, errorMessage: null };
    default:
      return state;
  }
};

const MarkAttendance = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef(null);

  const handleBoxPress = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch({ type: 'setAttendanceCode', payload: '' }); 
      dispatch({ type: 'clearErrorMessage', payload: null }); 
    });
    return unsubscribe;
  }, [navigation]);

  const handleChangeText = (text) => {
    if (/^\d*$/.test(text) && text.length <= 4) {
      dispatch({ type: 'setAttendanceCode', payload: text });
    }
  };

  const handleMarkAttendance = async () => {
    const code = state.attendanceCode;
    try {
      const response = await trackerApi.post('/session-details/code', { code });
      dispatch({ type: 'clearErrorMessage' });
      // Check if session exists in the response
      if (response.data && response.data.session) {
        const data=response.data;
        navigation.navigate('TrackCreateScreen', {data});
        return response.data;
      } else {
        // Handle missing session (e.g., set error message)
        throw new Error('Invalid attendance code'); // Or dispatch an error action
      }
    } catch (error) {
      dispatch({ type: 'setErrorMessage', payload: 'Invalid attendance code. Please try again.' });
    }
  };

  const handleMarkAttendanceHistory = async () => {
    try {
      const response = await trackerApi.get('/attendance-history');
      const attendanceHistory = response.data;
      console.log("dddd",attendanceHistory);
      navigation.navigate('AttendanceHistoryScreen', { attendanceHistory });
    } catch (error) {
      console.error('Error fetching attendance history:', error.message);
    }
  };

  return (
    <ImageBackground source={require('../../../assets/them.jpg')} style={styles.backgroundImage}>
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.innerContainer}>
          <Spacer>
            <Text h1 style={styles.heading}>
              Let's Mark Your Attendance
            </Text>
          </Spacer>

          <Spacer>
            <Text style={styles.text}>Enter the code below:</Text>
          </Spacer>

          <TouchableOpacity style={styles.inputContainer} onPress={handleBoxPress}>
            <TextInput
              value={state.attendanceCode}
              onChangeText={handleChangeText}
              maxLength={4}
              keyboardType="numeric"
              style={styles.hiddenInput}
              ref={inputRef}
            />
            <View style={styles.codeContainer}>
              {Array.from({ length: 4 }).map((_, index) => (
                <View key={index} style={styles.inputBoxContainer}>
                  <Text style={styles.inputText}>
                    {state.attendanceCode[index] || ''}
                  </Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>

          {state.errorMessage && (
            <Spacer>
              <Text style={styles.errorText}>{state.errorMessage}</Text>
            </Spacer>
          )}

          <Spacer>
            <Image
              source={require('../../../assets/mark_attendance.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </Spacer>

          
          <Spacer>
            <Button
              title="Mark Attendance"
              buttonStyle={styles.markButton}
              onPress={handleMarkAttendance}
            />
          </Spacer>
          <Spacer>
            <TouchableOpacity onPress={handleMarkAttendanceHistory}>
              <Text style={styles.linkText}>Mark Attendance History</Text>
            </TouchableOpacity>
          </Spacer>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  backgroundImage:{
    flex: 1, // Make the background image cover the entire viewport
    resizeMode: 'cover', // Stretch the image to fill the container
  },
  scrollViewContainer:{
    alignItems: 'center', // Center elements horizontally
    paddingTop: 120, // Add some bottom padding
  },
  heading: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#3498db',
  },
  image: {
    height: 100,
    width: '100%',
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  hiddenInput: {
    position: 'absolute',
    top: -40, // Position the input off-screen
    left: 0,
    width: '100%',
    height: 40,
    opacity: 0, // Keep it off-screen and hidden
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputBoxContainer: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 24,
    color: '#2c3e50',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  markButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
  },
  linkText: {
    textAlign: 'center',
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default MarkAttendance;
