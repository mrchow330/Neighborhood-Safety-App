import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: 60,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2563eb',
  },
  filterToggle: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
    color: '#2563eb',
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    paddingBottom: 4,
  },
  filters: {
    marginBottom: 20,
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 10,
    width: '90%',
    maxWidth: 500,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 10,
    borderRadius: 6,
    color: '#1E293B',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#1e293b',
  },
  reportList: {
    marginTop: 10,
    width: '100%',
  },
  reportListContainer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  reportItem: {
    backgroundColor: '#ffffff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
    width: '90%',
    maxWidth: 500,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  reportLabel: {
    fontSize: 13,
    color: '#334155',
  },
  reportValue: {
    fontWeight: '600',
  },
  expandText: {
    textAlign: 'right',
    color: '#1e3a8a',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 8,
  },
  expandedContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#e2e8f0',
  },
  expandedLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  expandedText: {
    fontSize: 14,
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: '100%',
    height: 160,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 6,
  },
  imageText: {
    color: '#475569',
    fontStyle: 'italic',
  },
});

export default function ReportScreen() {
  const router = useRouter();
  const [selectedIssue, setSelectedIssue] = useState('');
  const [hasImage, setHasImage] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const [reports, setReports] = useState([]);

  React.useEffect(() => {
  const fetchReports = async () => {
    try {
      const response = await fetch('https://neighborhood-safety-backend.vercel.app/api/reports');
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    }
  };

  fetchReports();
}, []);

  const statusColors: Record<string, string> = {
    'Reviewed': '#16a34a',
    'Submitted': '#22c55e',
    'In Progress': '#f97316',
    'Resolved': '#22c55e',
    'Under Review': '#eab308'
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredReports = reports.filter((report) => {
  const imageMatch = hasImage ? !!report.image : true;
  const typeMatch = selectedIssue ? report.type === selectedIssue : true;
  const startMatch = startDate ? report.date >= startDate : true;
  const endMatch = endDate ? report.date <= endDate : true;
  return imageMatch && typeMatch && startMatch && endMatch;
});


return (
    <View style={styles.container}>
      <Text style={styles.title}>Reports</Text>

      <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
        <Text style={styles.filterToggle}>Filter {showFilters ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {showFilters && (
        <View style={styles.filters}>
          <Text style={styles.label}>Issue Type</Text>
          <Picker
            selectedValue={selectedIssue}
            onValueChange={(itemValue) => setSelectedIssue(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select issue type" value="" />
            <Picker.Item label="Pothole" value="Pothole" />
            <Picker.Item label="Streetlight Outage" value="Streetlight Outage" />
            <Picker.Item label="Graffiti" value="Graffiti" />
            <Picker.Item label="Other" value="Other" />
          </Picker>

          <View style={styles.row}>
            <Text style={styles.label}>Contains Image:</Text>
            <Switch value={hasImage} onValueChange={setHasImage} />
          </View>

          <Text style={styles.label}>Before:</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={endDate}
            onChangeText={setEndDate}
          />

          <Text style={styles.label}>After:</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={startDate}
            onChangeText={setStartDate}
          />
        </View>
      )}

      <ScrollView style={styles.reportList} contentContainerStyle={styles.reportListContainer}>
        {filteredReports.map((report, index) => (
          <View key={index} style={styles.reportItem}>
            <View style={styles.rowBetween}>
              <Text style={styles.reportLabel}>Issue Type: <Text style={styles.reportValue}>{report.issueType}</Text></Text>
              <Text style={styles.reportLabel}>Submitted at: <Text style={styles.reportValue}>{report.createdAt}</Text></Text>
            </View>
            <Text style={styles.reportLabel}>Status: <Text style={[styles.reportValue, { color: statusColors[report.status] || '#000' }]}>{report.status}</Text></Text>
            <TouchableOpacity onPress={() => toggleExpand(index)}>
              <Text style={styles.expandText}>{expandedIndex === index ? 'Collapse ▲' : 'Expand ▼'}</Text>
            </TouchableOpacity>
            {expandedIndex === index && (
              <View style={styles.expandedContainer}>
                <Text style={styles.expandedLabel}>Location</Text>
                <Text style={styles.expandedText}>{report.location}</Text>
                {report.image && (
                  <Image
                    source={{ uri: report.image }}
                    style={styles.imagePlaceholder}
                    resizeMode="cover"
                  />
                )}
                <Text style={styles.expandedLabel}>Description</Text>
                <Text style={styles.expandedText}>{report.description}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
