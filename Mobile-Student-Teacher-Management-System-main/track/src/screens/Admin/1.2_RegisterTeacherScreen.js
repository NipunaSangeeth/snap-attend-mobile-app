import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import trackerApi from "../../api/tracker";

const TeacherRegister = () => {
  const [teachername, setTeacherName] = useState("");
  const [teacheremail, setTeacherEmail] = useState("");
  const [teacherpassword, setTeacherPassword] = useState("");

  const handleRegister = async () => {
    const Teacher = {
      name: teachername,
      email: teacheremail,
      password: teacherpassword,
    };
    await trackerApi
      .post("/signupT", Teacher)
      .then((response) => {
        setTeacherName("");
        setTeacherEmail("");
        setTeacherPassword("");
        Alert.alert("Success", "Lecturer has been registered successfully");
      })
      .catch((error) => {
        Alert.alert("register failed", "Error register the Shedule");
        console.log("register failed", error);
      });
  };

TeacherRegister.navigationOptions = {
    title: 'Teacher Registration',
  };
  return (
      <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: "center", paddingBottom: 350
    }}>
            <View style={{backgroundColor:"#484BF1", width:"100%",height:18,marginBottom:30}}><Text></Text></View>
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "dark white",
        alignItems: "center",
      }}
    >
      <View>
        <TextInput
          value={teachername}
          onChangeText={(text) => setTeacherName(text)}
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
          placeholder="Lecturer name"
          placeholderTextColor={"#828282"}
        />
      </View>

      <View style={{ padding: 10 }}>
        <TextInput
          value={teacheremail}
          onChangeText={(text) => setTeacherEmail(text)}
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
          placeholder="Email"
          placeholderTextColor={"#828282"}
        />
      </View>

      <View>
        <TextInput
          value={teacherpassword}
          onChangeText={(text) => setTeacherPassword(text)}
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

      <TouchableOpacity
        onPress={handleRegister}
        style={{
          backgroundColor: "rgba(0, 122, 255, 0.7)",
          padding: 10,
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          width: 180
        }}
      >
        <Text style={{ fontWeight: "bold", color: "white" }}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </ScrollView>
    //</ImageBackground>
  );
};

export default TeacherRegister;

const styles = StyleSheet.create({});