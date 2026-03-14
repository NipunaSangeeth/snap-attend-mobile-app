import React, { useMemo, useRef } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { format, parseISO, isToday, isFuture } from 'date-fns';

const TimetableScreen_V3 = ({ route }) => {
  const { params } = route || {};
  const { data } = params || {};

  // 1. Process Raw Data into Grouped Events (Recurrence Logic)
  const groupedEvents = useMemo(() => {
    if (!data || !Array.isArray(data.timetable)) {
      return {};
    }
    
    const eventsMap = {};
    data.timetable.forEach((session) => {
      if (!session.startDate || !session.endDate) return;

      let currentDate = new Date(session.startDate);
      const endDate = new Date(session.endDate);

      if (isNaN(currentDate.getTime()) || isNaN(endDate.getTime())) return;

      let iterations = 0;
      const MAX_ITERATIONS = 52; // Safety limit: 1 year of weekly sessions

      while (currentDate <= endDate && iterations < MAX_ITERATIONS) {
        const dateKey = currentDate.toISOString().split('T')[0];

        if (!eventsMap[dateKey]) {
          eventsMap[dateKey] = [];
        }

        eventsMap[dateKey].push({
          ...session,
          displayDate: dateKey,
          id: `${session._id || session.code}_${dateKey}`
        });

        // Weekly recurrence
        currentDate.setDate(currentDate.getDate() + 7);
        iterations++;
      }
    });

    return eventsMap;
  }, [data]);

  // 2. Format for SectionList: [{ title: '2026-03-13', data: [...] }]
  const sections = useMemo(() => {
    return Object.keys(groupedEvents)
      .sort()
      .map(date => {
        const parsedDate = parseISO(date);
        let title = format(parsedDate, 'EEEE, MMM do');
        if (isToday(parsedDate)) title = `Today - ${title}`;

        return {
          title,
          dateKey: date,
          data: groupedEvents[date].sort((a, b) => a.startTime.localeCompare(b.startTime))
        };
      });
  }, [groupedEvents]);

  // 3. Renderers
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={[styles.statusIndicator, isFuture(parseISO(item.displayDate)) ? styles.future : styles.past]} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.moduleName}>{item.name}</Text>
          <View style={styles.codeBadge}>
            <Text style={styles.codeText}>{item.code}</Text>
          </View>
        </View>
        
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Icon name="clock-outline" size={16} color="#484BF1" />
            <Text style={styles.detailText}>{item.startTime} - {item.endTime}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="map-marker-outline" size={16} color="#484BF1" />
            <Text style={styles.detailText}>{item.venue}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  if (!data || sections.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="calendar-blank-outline" size={80} color="#CBD5E0" />
        <Text style={styles.emptyTitle}>No Sessions Found</Text>
        <Text style={styles.emptySubtitle}>Your timetable is currently empty for this batch.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar} />
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  topBar: {
    backgroundColor: "#484BF1",
    height: 4,
    width: '100%',
  },
  listContainer: {
    paddingBottom: 40,
  },
  sectionHeader: {
    backgroundColor: '#EDF2F7',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4A5568',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  statusIndicator: {
    width: 6,
  },
  future: {
    backgroundColor: '#484BF1',
  },
  past: {
    backgroundColor: '#A0AEC0',
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  moduleName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2D3748',
    flex: 1,
    marginRight: 8,
  },
  codeBadge: {
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  codeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#484BF1',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#718096',
    marginLeft: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2D3748',
    marginTop: 20,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
});

export default TimetableScreen_V3;
