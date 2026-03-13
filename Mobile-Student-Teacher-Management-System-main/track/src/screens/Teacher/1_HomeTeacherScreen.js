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
} from "react-native";
import React, { useState, useEffect  } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import trackerApi from "../../api/tracker";
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const timeInmin =["1","5","10","20","30"];
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

  useEffect(() => {
    if (isFocused) {
      // Refresh the screen's data when it gains focus
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
    const Session = {
      Lectruer_Name: lecture_Name,
      Module_Name: module_Name,
      Module_Code: module_Code,
      Session_Start_Time: session_Start_Time,
      Session_End_Time: session_End_Time,
      Session_Start_Date: session_Start_Date,
      Venue : venue,
    };
    try {
      await trackerApi
        .post("/create-session", Session)
        .then((Response) => {
          setLectureName("");
          setModuleName("");
          setModuleCode("");
          setSessionStartTime("");
          setSessionEndTime("");
          setsessionStartDate("");
          setVenue("");
          navigation.navigate("CreateSessionScreen",{data1:Response.data.sessionId,data2:Response.data.Attendance_Code, data3:Response.data.myNumber});
        })
        .catch((error) => {
          console.log("_axios error :", error);
          Alert.alert("Session create Error");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground source={require('../../../assets/them.jpg')} style={{height: 750, paddingTop:140}}>
    <View style={{flexDirection:"row",alignItems: 'center', justifyContent: 'center'}}>
     <Text style={{paddingBottom:20,textAlign:"center", fontSize:25, fontWeight:"bold"}}>Create Session</Text>
    <Ionicons style={{paddingLeft:10}}name="create" size={25} color="black" />
    </View>
    {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
    <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: "center", paddingBottom: 180
    }}>
      {/* 1st */}
      <View style={{alignItems:"center"}}>
      <View style={{alignItems:"center"}}>
        <TextInput
          value={lecture_Name}
          onChangeText={(text) => setLectureName(text)}
       
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderRadius: 15,
            width:350,
            // Shadow styles
      /* ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
        },
      }) */
          }}
          placeholder="Lecturer Name"
          backgroundColor="white"
        />
      </View>
      {/* 2nd */}
      <View style={{ marginVertical: 10 }}>
        <TextInput
          value={module_Name}
          onChangeText={(text) => setModuleName(text)}
         
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
           
            marginTop: 10,
            borderRadius: 15,
            width:350,
      /*       // Shadow styles
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
        },
      }) */
          }}
          placeholder="Module Name"
          backgroundColor="white"
        />
      </View>
      {/* 3rd */}
      <View >
        <TextInput
          value={module_Code}
          onChangeText={(text) => setModuleCode(text)}
         
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
           
            marginTop: 10,
            borderRadius: 15,
            width:350,
            // Shadow styles
      /* ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
        },
      }) */
          }}
          placeholder="Module Code"
          backgroundColor="white"
        />
      </View>

      {/* 4th */}
      <View style={{ marginVertical: 10 }}>
        <TextInput
          value={session_Start_Date}
          onChangeText={(text) => setsessionStartDate(text)}
       
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            
            marginTop: 10,
            borderRadius: 15,
            width:350,
            // Shadow styles
      /* ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
        },
      }) */
          }}
          placeholder="Start Date"
          backgroundColor="white"
        />
      </View>
      {/* 5 Session Start Time */}
      <View>
        <TextInput
          value={session_Start_Time}
          onChangeText={setSessionStartTime}
          placeholder="Enter Time (e.g., 09:00 AM)"
          backgroundColor="white"
          
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
           
            marginTop: 10,
            borderRadius: 15,
            width:350,
            // Shadow styles
      /* ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
        },
      }) */
          }}
        />
      </View>

      {/* 6th */}
      <View style={{ marginVertical: 10 }}>
      <SelectDropdown
  data={timeInmin}
  onSelect={(selectedItem, index) => {
    setSessionEndTime(selectedItem)
    console.log(selectedItem, index);
  }}
  renderButton={(selectedItem, isOpened) => {
    return (
      <View style={styles.dropdownButtonStyle}>
        <Text style={styles.dropdownButtonTxtStyle}>
          {(selectedItem) || 'Select Duration'}
        </Text>
        <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
      </View>
    );
  }}
  renderItem={(item, index, isSelected) => {
    return (
      <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
        <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
      </View>
    );
  }}
  showsVerticalScrollIndicator={false}
  dropdownStyle={styles.dropdownMenuStyle}
/>

      </View>

      {/* 7th */}
      <View>
        <TextInput
          value={venue}
          onChangeText={(text) => setVenue(text)}
          
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            
            marginTop: 10,
            borderRadius: 15,
            width:350,
            // Shadow styles
      /* ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
        },
      }) */
          }}
          placeholder="Select Venue"
          backgroundColor="white"
        />
      </View>

      {/* Create Button */}
      <TouchableOpacity
        onPress={handleSession}
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          width: 200,
          backgroundColor: "rgba(0, 122, 255, 0.7)",
          borderRadius: 6,
          marginLeft: "auto",
          marginRight: "auto",
          padding: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Create
        </Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 350,
    backgroundColor: 'white',
    padding: 5,
    marginTop: 5,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow styles
    /* ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }) */
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 14,
    //fontWeight: '500',
    color: "black",
    paddingLeft:8
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 14,
    color: '#151E26',
  },
});

export default HomeTeacherScreen;
