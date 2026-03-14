import React, { useState, useEffect } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Image
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import trackerApi from "../../api/tracker";
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { SafeAreaView } from 'react-native-safe-area-context';

const timeInmin = ["1", "5", "10", "20", "30"];

const HomeTeacherScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [lecture_Name, setLectureName] = useState("");
  const [module_Name, setModuleName] = useState("");
  const [module_Code, setModuleCode] = useState("");
  const [session_Start_Time, setSessionStartTime] = useState("");
  const [session_End_Time, setSessionEndTime] = useState("");
  const [session_Start_Date, setsessionStartDate] = useState("");
  const [venue, setVenue] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleDateConfirm = (date) => {
    setsessionStartDate(format(date, "yyyy-MM-dd"));
    hideDatePicker();
  };

  const showStartTimePicker = () => setStartTimePickerVisibility(true);
  const hideStartTimePicker = () => setStartTimePickerVisibility(false);
  const handleStartTimeConfirm = (time) => {
    setSessionStartTime(format(time, "hh:mm a"));
    hideStartTimePicker();
  };

  useEffect(() => {
    if (isFocused) {
      setLectureName("");
      setModuleName("");
      setModuleCode("");
      setSessionStartTime("");
      setSessionEndTime("");
      setsessionStartDate("");
      setVenue("");
    }
  }, [isFocused]);

  const handleSession = async () => {
    if (!lecture_Name || !module_Name || !session_Start_Date || !session_Start_Time || !session_End_Time || !venue) {
      Alert.alert("Missing Information", "Please fill in all fields before creating a session.");
      return;
    }

    const Session = {
      Lectruer_Name: lecture_Name,
      Module_Name: module_Name,
      Module_Code: module_Code,
      Session_Start_Time: session_Start_Time,
      Session_End_Time: session_End_Time,
      Session_Start_Date: session_Start_Date,
      Venue: venue,
    };

    try {
      const Response = await trackerApi.post("/create-session", Session);
      navigation.navigate("CreateSessionScreen", {
        data1: Response.data.sessionId,
        data2: Response.data.Attendance_Code,
        data3: Response.data.myNumber
      });
    } catch (error) {
      console.log("Session creation error:", error);
      Alert.alert("Error", "Failed to create session. Please try again.");
    }
  };

  return (
    <ImageBackground source={require('../../../assets/them.jpg')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.topBlueBar}><Text></Text></View>

            <View style={styles.header}>
              <Text style={styles.title}>Create Session</Text>
              <Ionicons style={styles.headerIcon} name="create" size={28} color="black" />
            </View>

            <View style={styles.formContainer}>
               <TextInput
                value={lecture_Name}
                onChangeText={setLectureName}
                style={styles.input}
                placeholder="Lecturer Name"
                placeholderTextColor="#828282"
              />

              <TextInput
                value={module_Name}
                onChangeText={setModuleName}
                style={styles.input}
                placeholder="Module Name"
                placeholderTextColor="#828282"
              />

              <TextInput
                value={module_Code}
                onChangeText={setModuleCode}
                style={styles.input}
                placeholder="Module Code"
                placeholderTextColor="#828282"
              />

              <TouchableOpacity onPress={showDatePicker} style={styles.pickerButton}>
                <Text style={session_Start_Date ? styles.pickerText : styles.placeholderText}>
                  {session_Start_Date || "Select Session Date"}
                </Text>
                <Icon name="calendar" size={24} color="#484BF1" />
              </TouchableOpacity>

              <TouchableOpacity onPress={showStartTimePicker} style={styles.pickerButton}>
                <Text style={session_Start_Time ? styles.pickerText : styles.placeholderText}>
                  {session_Start_Time || "Select Start Time"}
                </Text>
                <Icon name="clock-outline" size={24} color="#484BF1" />
              </TouchableOpacity>

              <SelectDropdown
                data={timeInmin}
                onSelect={(selectedItem) => setSessionEndTime(selectedItem)}
                renderButton={(selectedItem, isOpened) => (
                  <View style={styles.dropdownButton}>
                    <Text style={selectedItem ? styles.pickerText : styles.placeholderText}>
                      {selectedItem ? `${selectedItem} min` : 'Select Duration (min)'}
                    </Text>
                    <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} size={24} color="#484BF1" />
                  </View>
                )}
                renderItem={(item, index, isSelected) => (
                  <View style={[styles.dropdownItem, isSelected && { backgroundColor: '#EBF4FF' }]}>
                    <Text style={styles.dropdownItemText}>{item} min</Text>
                  </View>
                )}
                dropdownStyle={styles.dropdownMenu}
              />

              <TextInput
                value={venue}
                onChangeText={setVenue}
                style={styles.input}
                placeholder="Venue"
                placeholderTextColor="#828282"
              />

              <TouchableOpacity
                onPress={handleSession}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Image source={require('../../../assets/SLTC.png')} style={styles.footerLogo} resizeMode="contain" />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        date={session_Start_Date ? new Date(session_Start_Date) : new Date()}
      />

      <DateTimePickerModal
        isVisible={isStartTimePickerVisible}
        mode="time"
        onConfirm={handleStartTimeConfirm}
        onCancel={hideStartTimePicker}
        date={new Date()}
      />
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
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 50,
  },
  topBlueBar: {
    backgroundColor: "#484BF1",
    width: "100%",
    height: 18,
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  headerIcon: {
    marginLeft: 10,
  },
  formContainer: {
    alignItems: 'center',
    width: '100%',
  },
  input: {
    padding: 15,
    marginTop: 10,
    borderRadius: 8,
    width: 350,
    backgroundColor: "white",
    fontSize: 16,
    color: 'black',
  },
  pickerButton: {
    padding: 15,
    marginTop: 10,
    borderRadius: 8,
    width: 350,
    backgroundColor: "white",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownButton: {
    padding: 15,
    marginTop: 10,
    borderRadius: 8,
    width: 350,
    backgroundColor: "white",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerText: {
    fontSize: 16,
    color: 'black',
  },
  placeholderText: {
    fontSize: 16,
    color: '#828282',
  },
  submitButton: {
    backgroundColor: "rgba(0, 122, 255, 0.7)",
    paddingHorizontal: 50,
    paddingVertical: 15,
    marginTop: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },
  dropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F7FAFC',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#2D3748',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerLogo: {
    width: 150,
    height: 50,
    opacity: 0.7,
  },
});

export default HomeTeacherScreen;
