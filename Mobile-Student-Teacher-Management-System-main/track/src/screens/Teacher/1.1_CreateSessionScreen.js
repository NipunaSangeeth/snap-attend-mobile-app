import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import trackerApi from "../../api/tracker";

const SessionWaitingScreen = ({ initialSeconds, route }) => {
  const { params } = route || {};
  const { data1, data2, data3 } = params || {};
  const navigation = useNavigation();
  const handleSession = async () => {
     try{
       const response = await trackerApi.get(`/getattendance?sessionId=${data1}`);
       if (response.data == null) {
        navigation.navigate("ViewAttenSheetScreen", {data4:response.data});
       }
       else {
       navigation.navigate("ViewAttenSheetScreen", {data4:response.data});
       }
     } catch (error){
       console.log("axios error:", error)
     }
     
  };
  const [seconds, setSeconds] = useState(data3*60);
  const [timerEnded, setTimerEnded] = useState(false);

  useEffect(() => {
    
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(interval); // Stop the timer when it reaches 0
          setTimerEnded(true);
          try{
            trackerApi.post(`/deleteAttendanceCode?sessionId=${data1}`)
            
          } catch (error){
            console.log("Post Req error", error)
          }
          return 0;
        }
      });
    }, 1000);
    
    return () => clearInterval(interval);
    
  }, [data1]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 60 / 60);
    const minutes = Math.floor((time / 60) % 60);
    //const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${hours < 10 ? "" : ""}${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };
  return (
    <View>
      <View style={{backgroundColor:"#484BF1", width:"100%",height:18}}><Text></Text></View>
      <View
        style={{
          //backgroundColor: "white",
          alignItems: 'center',
          height: "100%",
          paddingTop:50,
          
        }}
      >
        <View style={{backgroundColor:"white", alignItems:"center", paddingVertical:"30%", paddingHorizontal:"10%",borderRadius:10
          /* paddingVertical:100, borderRadius:15, paddingHorizontal:40, ...Platform.select({
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
        }}>
        {!timerEnded && (
          <>
            <Text
              style={{
                color: "black",
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              Remaining Time
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 65,
                fontWeight: "bold",
                alignItems: "center",
                marginTop: 50,
              }}
            >
              {formatTime(seconds)}
            </Text>
          </>
        )}
        {timerEnded && (
          
          <Text
            style={{
              color: "red",
              fontSize: 50,
              fontWeight: "bold",
              alignItems: "center",
              marginTop: 42
            }}
          >
            Time is over

          </Text>
        )}
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            alignItems: "center",
            marginTop: 50,
            fontSize: 32,
          }}
        >
          OTP Code: {data2}
        </Text>
        </View>
      </View>
      <Pressable
        onPress={handleSession}
        style={{
          width: 230,
          backgroundColor: "rgba(0, 122, 255, 0.7)",
          borderRadius: 6,
          marginLeft: "auto",
          marginRight: "auto",
          padding: 15,
          marginTop: -85,
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
          View Attendance Report
        </Text>
      </Pressable>
    </View>
  );
};
export default SessionWaitingScreen;

const styles = StyleSheet.create({});
