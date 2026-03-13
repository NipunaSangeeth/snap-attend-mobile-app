import {
  Alert,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import trackerApi from "../../api/tracker";
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BatchCodes =["2027A","2027B","2026A","2026B","2025A","2025B"];
const StudentRegister = () => {
  const [studentemail, setStudentEmail] = useState("");
  const [studentpassword, setStudentPassword] = useState("");
  const [registernumber, setRegisterNumber] = useState("");
  const [bachcode, setBatchCode] = useState("");

  const handleRegister = async () => {
    const Student = {
      email: studentemail,
      password: studentpassword,
      regNum: registernumber,
      batchCode: bachcode,
    };
    await trackerApi
      .post("/signupS", Student)
      .then((response) => {
        setStudentEmail("");
        setStudentPassword("");
        setRegisterNumber("");
        setBatchCode("");
        Alert.alert("Success", "Student has been registered successfully");
      })
      .catch((error) => {
        Alert.alert("register failed", "Error register the Shedule");
        console.log("register failed", error);
      });
  };
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: "center", paddingBottom: 0
    }}>
      <View style={{backgroundColor:"#484BF1", width:"100%",height:18}}><Text></Text></View>
      <View style={{ paddingBottom: 10, paddingTop: 30 }}>
  <TextInput
    value={studentemail}
    onChangeText={(text) => setStudentEmail(text)}
    style={{
      padding: 10,
      marginTop: 5,
      borderRadius: 8,
      width: 350,
      backgroundColor: "white",
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
    placeholder="Email"
    placeholderTextColor="#828282"
  />
</View>

      <View style={{ paddingBottom:1 }}>
        <TextInput
          value={studentpassword}
          onChangeText={(text) => setStudentPassword(text)}
          secureTextEntry={true}
          style={{
            padding: 10,
            marginTop: 5,
            borderRadius: 8,
            width: 350,
            backgroundColor:"white",
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
          placeholder="Password"
          placeholderTextColor={"#828282"}
        />
      </View>

      <View style={{ padding: 10 }}>
        <TextInput
          value={registernumber}
          onChangeText={(text) => setRegisterNumber(text)}
          style={{
            padding: 10,
            marginTop: 5,
            borderRadius: 8,
            width: 350,
            backgroundColor:"white",
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
          placeholder="Registration number"
          placeholderTextColor={"#828282"}
        />
      </View>
      <View>
      <SelectDropdown
  data={BatchCodes}
  onSelect={(selectedItem, index) => {
    setBatchCode(selectedItem)
    console.log(selectedItem, index);
  }}
  renderButton={(selectedItem, isOpened) => {
    return (
      <View style={styles.dropdownButtonStyle}>
        <Text style={styles.dropdownButtonTxtStyle}>
          {(selectedItem) || 'Select Batch Code'}
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

      <TouchableOpacity
        onPress={handleRegister}
        style={{
          backgroundColor: "rgba(0, 122, 255, 0.7)",
          padding: 10,
          marginTop: 20,

          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          width:180
        }}
      >
        <Text style={{ fontWeight: "bold", color: "white", fontSize:14 }}>Sumbit</Text>
      </TouchableOpacity>
      </ScrollView>
    
  );
};



const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 350,
    backgroundColor: 'white',
    padding: 10,
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

export default StudentRegister;