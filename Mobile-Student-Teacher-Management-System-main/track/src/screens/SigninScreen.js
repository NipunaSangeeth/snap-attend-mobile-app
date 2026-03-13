import React, {useState, useContext, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity,TextInput} from 'react-native';
import { Text,Input,Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const SigninScreen = ({ navigation }) => { // Destructure navigation from props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  const resetState = () => {
    setEmail('');
    setPassword('');
    clearErrorMessage(); // Clear any error messages
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', resetState);
    return unsubscribe; // Cleanup function for the effect
  }, [navigation]); // Re-run effect when navigation changes

    return (
        <View style={styles.container}>
        <View style={{backgroundColor:"#484BF1", width:"100%",height:200}}><Text></Text></View>
            <Spacer>
            <Text h2 style={styles.topic}>Sign in</Text>
            </Spacer>
            {/* <Input 
            label="Email" 
            value={email} 
            onChangeText={(newEmail) => setEmail(newEmail)} 
            autoCapitalize='none' 
            autoCorrect={false}
            /> */}
            <View style={{alignItems:"center"}}>
            <View style={{paddingBottom:20}}>
            <TextInput
    value={email}
    onChangeText={(text) => setEmail(text)}
    style={{
      padding: 20,
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
            {/* <Input 
            secureTextEntry
            label="Password" 
            value={password} 
            onChangeText={(newPassword) => setPassword(newPassword)} 
            autoCapitalize='none' 
            autoCorrect={false}
            /> */}
            <TextInput
    value={password}
    onChangeText={(text) => setPassword(text)}
    secureTextEntry={true}
    style={{
      padding: 20,
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
    placeholder="Password"
    placeholderTextColor="#828282"
  />
  </View>
            {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
            <View style={{paddingTop:28, width:365, paddingLeft: 12}}>
            <Button title="Sign In" onPress={()=> signin({email,password})}/>
            </View>
            <TouchableOpacity onPress={()=> navigation.navigate('Signup')}>
                <Spacer>
                <Text style={styles.link}>Don't have an account? Sign up instead</Text>
                </Spacer>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        //flex:1,
        justifyContent:'center',
        marginBottom:250
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft:15,
        marginTop:15
    },
    link:{
        color:'blue'
    },
    topic:{
        textAlign:'center',
        paddingBottom:10,
        fontWeight:"bold",
    }
});

export default SigninScreen;


