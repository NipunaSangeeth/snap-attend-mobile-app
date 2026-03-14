console.log('App.js Loading... VERSION: 2026-03-13_20:25');
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AccountScreen from './src/screens/Student/3_AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/Student/2.1_LocationRecorderScreen';
import HomeScreen from './src/screens/Student/1_HomeScreen';
import MarkAttendance1 from './src/screens/Student/2_MarkAttendance';
import AfterRecordScreen from './src/screens/Student/2.1A_AfterRecordScreen';
import AfterRecordScreen2 from './src/screens/Student/2.1B_EndTimeScreen';
import AttendanceHistoryScreen from './src/screens/Student/2.2_AttendanceHistoryScreen';
import TimetableScreen from './src/screens/Student/TimetableScreen_V3';
import NotificationScreen from './src/screens/Student/1.2_NotificationScreen';
import HomeTeacherScreen from './src/screens/Teacher/1_HomeTeacherScreen';
import CreateSessionScreen from './src/screens/Teacher/1.1_CreateSessionScreen';
import ViewAttenSheetScreen from './src/screens/Teacher/1.2_ViewAttenSheetScreen';
import AllAttenScreen from './src/screens/Teacher/2_AllSessionsScreen';
import SpecificAttenScreen from './src/screens/Teacher/2.1_SpecificAttenScreen';
import AccountTeacherScreen from './src/screens/Teacher/3_AccountScreen';
import RegisterScreen from './src/screens/Admin/1_RegisterScreen';
import ATimeTable from './src/screens/Admin/2_TimeTableScreen';
import AccountAdmin from './src/screens/Admin/3_AccountScreen';
import RegisterStudentScreen from './src/screens/Admin/1.1_RegisterStudentScreen';
import RegisterTeacherScreen from './src/screens/Admin/1.2_RegisterTeacherScreen';
import CreateTimeTbale from './src/screens/Admin/2.1_CreateTimeTable';
import ViewTimeTable from './src/screens/Admin/2.2_EditTimeTable';
import AfterViewTimeTable from './src/screens/Admin/2.3_SpecificTimeTable';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Signup">
    <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }}/>
  </Stack.Navigator>
);

const MarkAten = () => (
  <Stack.Navigator initialRouteName="MarkAttendance1k">
    <Stack.Screen name="MarkAttendance1" component={MarkAttendance1} options={{ headerShown: false }}/>
    <Stack.Screen name="AttendanceHistoryScreen" component={AttendanceHistoryScreen}options={{ headerBackTitle:"Back", title:"Attendance History",headerBackTitleStyle:{
          color:"#484BF1"
        },
        headerTintColor: "#484BF1",
        headerStyle: {
          backgroundColor: '#99B0F4' 
        },
        headerTitleStyle: {
          fontSize: 20
        }}}/>
    <Stack.Screen name="TrackCreateScreen" component={TrackCreateScreen} options={{ headerBackTitle:"Back", title:"Let's Track You",headerBackTitleStyle:{
          color:"#484BF1"
        },
        headerTintColor: "#484BF1",
        headerStyle: {
          backgroundColor: '#99B0F4'
        },
        headerTitleStyle: {
          fontSize: 20
        }}}/>

    <Stack.Screen name="AfterRecordScreen" component={AfterRecordScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="AfterRecordScreen2" component={AfterRecordScreen2} options={{ headerShown: false }}/>
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator >
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="TimetableScreen"
      component={TimetableScreen}
      options={{
        headerBackTitle:"Back", 
        title:"Time Table",
        headerBackTitleStyle:{
          color:"#484BF1"
        },
        headerTintColor: "#484BF1",
        headerStyle: {
          backgroundColor: '#99B0F4' 
        },
        headerTitleStyle: {
          fontSize: 20
        }
      }}
    />
    <Stack.Screen
      name="NotificationScreen"
      component={NotificationScreen}
      options={{
        headerBackTitle:"Back", 
        title:"Notification"
      }}
    />
  </Stack.Navigator>
);

const HomeTeacherStack = () => (
  <Stack.Navigator >
    <Stack.Screen
      name="HomeTeacherScreen"
      component={HomeTeacherScreen}
      options={{
        headerShown: false,
        title:"Create Session"
      }}
    />
    <Stack.Screen
      name="CreateSessionScreen"
      component={CreateSessionScreen}
      options={{
        headerBackTitle:"Back", 
        title:"Take Attendance",
        headerBackTitleStyle:{
          color:"#484BF1"
        },
        headerTintColor: "#484BF1",
        headerStyle: {
          backgroundColor: '#99B0F4' 
        },
        headerTitleStyle: {
          fontSize: 20
        }
      }}
    />
    <Stack.Screen
      name="ViewAttenSheetScreen"
      component={ViewAttenSheetScreen}
      options={{
        headerBackTitle:"Back", 
        title:"Attendance Sheet",
        headerBackTitleStyle:{
          color:"#484BF1"
        },
        headerTintColor: "#484BF1",
        headerStyle: {
          backgroundColor: '#99B0F4'
        },
        headerTitleStyle: {
          fontSize: 20
        }
      }}
    />
  </Stack.Navigator>
);

const HistoryTeacherStack = () => (
  <Stack.Navigator >
    <Stack.Screen
      name="AllAttenScreen"
      component={AllAttenScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SpecificAttenScreen"
      component={SpecificAttenScreen}
      options={{
        headerBackTitle:"Back", 
        title:"Attendance Report",
        headerBackTitleStyle:{
          color:"#484BF1"
        },
        headerTintColor: "#484BF1",
        headerStyle: {
          backgroundColor: '#99B0F4'
        },
        headerTitleStyle: {
          fontSize: 20
        }
      }}
    />
  </Stack.Navigator>
);

const RegisterAdminStack = () => (
  <Stack.Navigator >
    <Stack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="RegisterStudentScreen"
      component={RegisterStudentScreen}
      options={{
        headerBackTitle:"Back", 
        title:"Student Registrations",
        headerBackTitleStyle:{
          color:"#484BF1"
        },
        headerTintColor: "#484BF1",
        headerStyle: {
          backgroundColor: '#99B0F4' 
        },
        headerTitleStyle: {
          fontSize: 20
        }
      }}
    />
    <Stack.Screen
      name="RegisterTeacherScreen"
      component={RegisterTeacherScreen}
      options={{
        headerBackTitle:"Back", 
        title:"Lecturer Registrations",
        headerBackTitleStyle:{
          color:"#484BF1"
        },
        headerTintColor: "#484BF1",
        headerStyle: {
          backgroundColor: '#99B0F4' 
        },
        headerTitleStyle: {
          fontSize: 20
        }
      }}
    />
  </Stack.Navigator>
  
);

const RegisterTimeTableStack = () => (
  <Stack.Navigator >
    <Stack.Screen
      name="ATimeTable"
      component={ATimeTable}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
  name="CreateTimeTbale"
  component={CreateTimeTbale}
  options={{
    title: "Create Timetable",
    headerBackTitle: "Back",
    headerBackTitleVisible: true, // Ensure back title is visible
    headerBackTitleStyle: {
      color: "#484BF1"
    },
    headerTintColor: "#484BF1",
    headerStyle: {
      backgroundColor: '#99B0F4' 
    },
    headerTitleStyle: {
      flex: 1, // This ensures title is centered on Android
      textAlign: 'center',
      fontSize: 20
    }
  }}
/>

    <Stack.Screen
      name="ViewTimeTable"
      component={ViewTimeTable}
      options={{
        headerBackTitle:"Back", 
        title:"View TimeTable"
      }}
    />
    <Stack.Screen
      name="AfterViewTimeTable"
      component={AfterViewTimeTable}
      options={{
        headerBackTitle:"Back", 
        title:"View TimeTable"
      }}
    />
  </Stack.Navigator>
);
const MainTabs = () => (
  <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Mark Attendance') {
          iconName = 'check-circle';
        } else if (route.name === 'Account') {
          iconName = 'account';
        }

        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeStack}  options={{headerShown: false}} />
    <Tab.Screen name="Mark Attendance" component={MarkAten} options={{headerShown: false}}/>
    <Tab.Screen name="Account" component={AccountScreen}  options={{
        headerTintColor: "#484BF1",
        headerStyle: {
          backgroundColor: '#99B0F4' 
        },
        headerTitleStyle: {
          fontSize: 20
        }}}/>
  </Tab.Navigator>
);

const TeacherTab = () => (
  <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Create Session') {
          iconName = 'pencil';
        } else if (route.name === 'History') {
          iconName = 'history';
        } else if (route.name === 'Account') {
          iconName = 'account';
        }

        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Create Session" component={HomeTeacherStack} options={{headerShown: false}}/>
    <Tab.Screen name="History" component={HistoryTeacherStack}  options={{headerShown: false}}/>
    <Tab.Screen name="Account" component={AccountTeacherScreen} options={{
        headerTintColor: "#484BF1",
        headerStyle: {
          backgroundColor: '#99B0F4' 
        },
        headerTitleStyle: {
          fontSize: 20
        }}} />
  </Tab.Navigator>
);

const AdminTab = () => (
  <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Make Register') {
          iconName = 'pen';
        } else if (route.name === 'Create/edit TimeTable') {
          iconName = 'timetable';
        } else if (route.name === 'Account') {
          iconName = 'account';
        }

        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Make Register" component={RegisterAdminStack} options={{headerShown: false}}/>
    <Tab.Screen name="Create/edit TimeTable" component={RegisterTimeTableStack} options={{headerShown: false}}/>
    <Tab.Screen name="Account" component={AccountAdmin} options={{
        headerTintColor: "#484BF1",
        headerStyle: {
          backgroundColor: '#99B0F4'
        },
        headerTitleStyle: {
          fontSize: 20
        }}}/>
  </Tab.Navigator>
);

import { SafeAreaProvider } from 'react-native-safe-area-context';

const AppNavigator = () => (
  <NavigationContainer ref={setNavigator}>
    <Stack.Navigator initialRouteName="ResolveAuth" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TeacherFlow" component={TeacherTab} />
      <Stack.Screen name="MainFlow" component={MainTabs} />
      <Stack.Screen name="LoginFlow" component={AuthStack} />
      <Stack.Screen name="AdminFlow" component={AdminTab} />
      <Stack.Screen name="ResolveAuth" component={ResolveAuthScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

const App = AppNavigator;

export default () => (
  <SafeAreaProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </SafeAreaProvider>
);
