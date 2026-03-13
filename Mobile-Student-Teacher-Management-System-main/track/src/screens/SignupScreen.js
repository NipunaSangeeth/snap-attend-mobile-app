import React, { useState, useContext } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Input, Button, ButtonGroup } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const SignupScreen = ({ navigation }) => {
  const { state, signup } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [batchCode, setBatchCode] = useState('');
  const [regNum, setRegNum] = useState('');
  const [name, setName] = useState('');
  const [roleIndex, setRoleIndex] = useState(0); // 0: Student, 1: Teacher, 2: Admin

  const roles = ['Student', 'Lecturer', 'Admin'];
  const roleValues = ['student', 'teacher', 'admin'];

  return (
    <View style={styles.container}>
      <Spacer>
        <Text h3 style={{textAlign: 'center'}}>Create Account</Text>
      </Spacer>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ButtonGroup
          onPress={setRoleIndex}
          selectedIndex={roleIndex}
          buttons={roles}
          containerStyle={{height: 40, marginBottom: 20}}
        />

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          secureTextEntry
          label="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {roleIndex === 0 && ( // Student
          <>
            <Input
              label="Batch Code"
              value={batchCode}
              onChangeText={setBatchCode}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Input
              label="Registration Number"
              value={regNum}
              onChangeText={setRegNum}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </>
        )}

        {roleIndex === 1 && ( // Teacher
          <Input
            label="Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}

        {state.errorMessage ? (
          <Text style={styles.errorMessage}>{state.errorMessage}</Text>
        ) : null}
        
        <Spacer>
          <Button 
            title="Sign Up" 
            onPress={() => signup({ 
              email, 
              password, 
              batchCode, 
              regNum, 
              name, 
              role: roleValues[roleIndex] 
            })} 
          />
        </Spacer>
        
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Spacer>
            <Text style={styles.link}>Already have an account? Sign in instead</Text>
          </Spacer>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
  },
  link: {
    color: 'blue',
  },
});

export default SignupScreen;
