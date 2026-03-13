import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, SafeAreaView,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const handleButton1 = () => {
    // Navigate to Screen1
    navigation.navigate('RegisterStudentScreen');
  };

  const handleButton2 = () => {
    // Navigate to Screen2
    navigation.navigate('RegisterTeacherScreen');
  };

  return (
    <ImageBackground source={require('../../../assets/home.png')} style={styles.background}>
    <SafeAreaView style={styles.container}>
        <View style={{ paddingTop: 400}}>
        </View>
        <View style={{}}>
        <TouchableOpacity style={styles.button} onPress={handleButton1}>
        <Image source={require('../../../assets/student.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Register Student</Text>
        </TouchableOpacity>
        </View>
        <View style={{paddingTop:20, paddingBottom:20}}>
        <TouchableOpacity style={styles.button} onPress={handleButton2}>
        <Image source={require('../../../assets/teacher.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Register Lecturer</Text>
        </TouchableOpacity>
        </View>
        <Image source={require('../../../assets/SLTC.png')} style={styles.logo} />
      
    </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'yellow'
  },
  content: {
    width: '80%',
    marginTop:40,
    alignItems:"center"
  },
  buttonIcon: {
    width: 30, // Adjust the width and height of the image as needed
    height: 30,
    marginHorizontal:20,
    marginVertical:5
  },
  logo: {
    width: 200, // Adjust the width and height of the image as needed
    height: 100,
  },
  button: {
    backgroundColor: 'rgba(0, 122, 255, 0.7)', // Adjust the color and opacity as needed
    marginBottom: 12,
    borderRadius: 15,
    alignItems: 'center',
    width:300,
    flexDirection: 'row',
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight:"bold"
  },
});

export default RegisterScreen;
