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

import { SafeAreaView } from 'react-native-safe-area-context';

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
      if (response.data && response.data.session) {
        const data = response.data;
        navigation.navigate('TrackCreateScreen', { data });
        return response.data;
      } else {
        throw new Error('Invalid attendance code');
      }
    } catch (error) {
      dispatch({ type: 'setErrorMessage', payload: 'Invalid attendance code. Please try again.' });
    }
  };

  const handleMarkAttendanceHistory = async () => {
    try {
      const response = await trackerApi.get('/attendance-history');
      const attendanceHistory = response.data;
      navigation.navigate('AttendanceHistoryScreen', { attendanceHistory });
    } catch (error) {
      console.error('Error fetching attendance history:', error.message);
    }
  };

  return (
    <ImageBackground source={require('../../../assets/them.jpg')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.innerContainer}>
            <View style={styles.header}>
              <Text h1 style={styles.heading}>Check-In</Text>
              <Text style={styles.subHeading}>Enter the 4-digit session code</Text>
            </View>

            <TouchableOpacity style={styles.inputWrapper} onPress={handleBoxPress} activeOpacity={1}>
              <TextInput
                value={state.attendanceCode}
                onChangeText={handleChangeText}
                maxLength={4}
                keyboardType="numeric"
                style={styles.hiddenInput}
                ref={inputRef}
                caretHidden={true}
              />
              <View style={styles.codeContainer}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <View key={index} style={[
                    styles.inputBox,
                    state.attendanceCode.length === index && styles.activeInputBox
                  ]}>
                    <Text style={styles.inputText}>
                      {state.attendanceCode[index] || ''}
                    </Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>

            {state.errorMessage && (
              <Text style={styles.errorText}>{state.errorMessage}</Text>
            )}

            <View style={styles.imageContainer}>
              <Image
                source={require('../../../assets/mark_attendance.png')}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Verify Code"
                buttonStyle={styles.markButton}
                titleStyle={styles.markButtonTitle}
                onPress={handleMarkAttendance}
                disabled={state.attendanceCode.length < 4}
              />
              
              <TouchableOpacity onPress={handleMarkAttendanceHistory} style={styles.historyLink}>
                <Text style={styles.linkText}>View Attendance History</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 30,
    padding: 30,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heading: {
    fontSize: 32,
    fontWeight: '800',
    color: '#484BF1',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
  inputWrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
  hiddenInput: {
    position: 'absolute',
    width: 0,
    height: 0,
    opacity: 0,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputBox: {
    width: 60,
    height: 65,
    marginHorizontal: 8,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  activeInputBox: {
    borderColor: '#484BF1',
    backgroundColor: '#F7FAFC',
  },
  inputText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
  },
  errorText: {
    color: '#E53E3E',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
    fontSize: 14,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  illustration: {
    height: 120,
    width: '100%',
  },
  buttonContainer: {
    gap: 15,
  },
  markButton: {
    backgroundColor: '#484BF1',
    borderRadius: 15,
    paddingVertical: 15,
    elevation: 5,
  },
  markButtonTitle: {
    fontWeight: '700',
    fontSize: 18,
  },
  historyLink: {
    marginTop: 10,
    alignItems: 'center',
  },
  linkText: {
    color: '#484BF1',
    fontWeight: '700',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default MarkAttendance;
