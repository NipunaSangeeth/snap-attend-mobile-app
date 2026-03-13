import React, { useMemo, useRef, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const TimetableScreen_V3 = ({ route }) => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  
  const { params } = route || {};
  const { data } = params || {};

  // useMemo derived data is safer than setState/useEffect for processed props
  const events = useMemo(() => {
    if (!data || !Array.isArray(data.timetable)) {
      return {};
    }
    
    const newEvents = {};
    data.timetable.forEach((event) => {
      if (!event.startDate || !event.endDate) return;

      const currentDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);

      // Safety check for invalid dates
      if (isNaN(currentDate.getTime()) || isNaN(endDate.getTime())) return;

      let iterations = 0;
      const MAX_ITERATIONS = 52; // Limit to 1 year of weekly recurrences

      while (currentDate <= endDate && iterations < MAX_ITERATIONS) {
        const currentDateString = currentDate.toISOString().split('T')[0];

        if (!newEvents[currentDateString]) {
          newEvents[currentDateString] = [];
        }

        newEvents[currentDateString].push({
          ...event,
          startDate: currentDateString,
          endDate: currentDateString,
          key: `${event._id || event.code}_${currentDateString}` // Add a unique key
        });

        // Increment date by 7 days
        currentDate.setDate(currentDate.getDate() + 7);
        iterations++;
      }
    });

    return newEvents;
  }, [data]);

  // Stable props for Agenda to prevent internal re-renders
  const theme = useMemo(() => ({
    agendaKnobColor: '#484BF1',
    selectedDayBackgroundColor: '#484BF1',
    todayTextColor: '#484BF1',
    dotColor: '#484BF1',
  }), []);

  const renderEmptyDate = useCallback(() => <View />, []);

  const renderItem = useCallback((item) => (
    <View style={styles.eventContainer}>
      <Text style={styles.eventName}>{item.name}</Text>
      <Text style={styles.eventCode}>{item.code}</Text>
      <View style={styles.detailRow}>
        <Icon name="map-marker" size={14} color="#828282" />
        <Text style={styles.eventDetails}> {item.venue}</Text>
      </View>
      <View style={styles.detailRow}>
        <Icon name="clock-outline" size={14} color="#828282" />
        <Text style={styles.eventDetails}> {item.startTime} - {item.endTime}</Text>
      </View>
    </View>
  ), []);

  const selectedDate = useMemo(() => new Date().toISOString().split('T')[0], []);

  if (renderCount.current > 50) {
    console.warn('CRITICAL: TimetableScreen_V3 reached 50 renders! Stopping to prevent crash.');
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
            <Icon name="alert-circle-outline" size={50} color="red" />
            <Text style={{marginTop: 10, fontSize: 16, fontWeight: 'bold'}}>Rendering safety limit reached.</Text>
            <Text style={{color: '#666', marginTop: 5}}>There might be a loop in the navigation state.</Text>
        </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}></View>
      
      {(!data || Object.keys(events).length === 0) ? (
        <View style={styles.emptyContainer}>
            <Icon name="calendar-blank" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No sessions found for your batch.</Text>
        </View>
      ) : (
        <Agenda
          items={events}
          renderEmptyDate={renderEmptyDate}
          renderItem={renderItem}
          theme={theme}
          pastScrollRange={1}
          futureScrollRange={3}
          selected={selectedDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  topBar: {
    backgroundColor: "#484BF1",
    width: "100%",
    height: 18,
  },
  eventContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginRight: 10,
    marginTop: 17,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  eventCode: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  eventDetails: {
    fontSize: 13,
    color: '#828282',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#828282',
    textAlign: 'center',
  }
});

export default TimetableScreen_V3;
