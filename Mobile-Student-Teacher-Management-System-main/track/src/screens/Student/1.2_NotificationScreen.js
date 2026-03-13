import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import * as Notifications from 'expo-notifications';
import NotifyHelper from '../../components/NotifyHelper';

const NotificationScreen = ({ route }) => {
  const { params } = route || {};
  const { data } = params || {};

  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDay, setCurrentDay] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    /* 
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to receive notifications was denied');
        }
      } catch (error) {
        console.error('Error requesting notification permissions:', error);
      }
    };

    */

    const intervalId = setInterval(() => {
      const newTime = new Date();
      setCurrentTime(newTime);
      setCurrentDay(newTime.toLocaleDateString('en-US', { weekday: 'long' }).split(',')[0]);
    }, 1000);

    fetchTimetable();

    return () => clearInterval(intervalId);
  }, []);

  const fetchTimetable = async () => {
    try {
      const timetableArray = data?.timetable;
      if (!timetableArray || !Array.isArray(timetableArray)) {
        console.log('No timetable array provided to NotificationScreen');
        return;
      }
      const sortedTimetable = timetableArray.slice().sort((a, b) => {
        const daysOfWeekOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return daysOfWeekOrder.indexOf(a.day) - daysOfWeekOrder.indexOf(b.day);
      });
      scheduleNotifications(sortedTimetable);
    } catch (error) {
      console.error('Error fetching timetable in NotificationScreen:', error);
    }
  };

  const scheduleNotifications = async (timetable) => {
    /* 
    timetable.forEach((day) => {
      const currentDate = new Date();
      const currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' }).split(',')[0];

      if (currentDay === day.day) {
        day.slots.forEach(async (slot) => {
          const [startTimeHours, startTimeMinutes] = slot.time.split('-')[0].split(':');

          const lectureStartTime = new Date(currentDate);
          lectureStartTime.setHours(startTimeHours, startTimeMinutes, 0, 0);

          const notificationTime1 = new Date(lectureStartTime.getTime() - 10 * 60 * 1000);
          const lecTime1 = new Date(lectureStartTime.getTime());

          const currentDate1 = currentDate.getTime();
          const notificationTime = notificationTime1.getTime();
          const lecTime = lecTime1.getTime();

          if (currentDate1 > notificationTime && currentDate1 < lecTime) {
            console.log('Scheduling Notification.......................');

            setNotification({
              message: `Your lecture for ${slot.moduleCode} will be at ${slot.time}.`,
            });

            await Notifications.scheduleNotificationAsync({
              content: {
                title: 'Upcoming Lecture',
                body: `Your lecture for ${slot.moduleCode} will be at ${slot.time}.`,
              },
              trigger: { seconds: 10 },
            });
          }
        });
      }
    */
  };

  /* useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(handleNotification);
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, []); */

  const handleNotification = (notification) => {
    console.log('Notification received:', notification);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      stickyHeaderIndices={[0]}
    >
      <View>
      {/* <NotifyHelper bodyMessage="hi" /> */}
        <View style={styles.fixedBox}>
          <Text style={styles.fixedBoxText}>
            Today is: {currentDay}
          </Text>
          <Text style={styles.fixedBoxText}>
            Current Date: {currentTime.toLocaleDateString()}
          </Text>
        </View>
      </View>
      <Text style={styles.text}>Not Implemented Yet</Text>
      <View style={styles.container}>
        {notification && (
          <View style={styles.notificationContainer}>
            <Text style={styles.notificationText}>{notification.message}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 10,
  },
  text:{
    paddingVertical:200,
    paddingHorizontal:100
  },
  fixedBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#E6E6FA',
    marginBottom: 10,
  },
  fixedBoxText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  currentTimeText: {
    fontSize: 16,
    marginBottom: 10,
  },
  notificationContainer: {
    backgroundColor: 'gray', // Adjust the background color as needed
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 18,
    color: '#ffffff',
    marginLeft: 10,
    textAlign:'center'
  },
});


export default NotificationScreen;
