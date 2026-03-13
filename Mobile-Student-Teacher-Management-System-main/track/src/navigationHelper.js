// NavigationHelper.js
import { navigationRef } from "./navigationRef";

export const navigateToTrackList = () => {
  // Ensure the navigation reference exists
  if (navigationRef.current) {
    navigationRef.current.navigate('MainFlow', { screen: 'Home' });
  } else {
    console.error('Navigation reference is not available.');
  }
};

export const navigateToTeacherHome = () => {
  // Ensure the navigation reference exists
  if (navigationRef.current) {
    navigationRef.current.navigate('TeacherFlow', { screen: 'Create Session' });
  } else {
    console.error('Navigation reference is not available.');
  }
};

export const navigateToadmin = () => {
  // Ensure the navigation reference exists
  if (navigationRef.current) {
    navigationRef.current.navigate('AdminFlow', { screen: 'Make Register' });
  } else {
    console.error('Navigation reference is not available.');
  }
};

export const navigateToSignup = () => {
  // Ensure the navigation reference exists
  if (navigationRef.current) {
    navigationRef.current.navigate('LoginFlow', { screen: 'Signin' });
  } else {
    console.error('Navigation reference is not available.');
  }
};



