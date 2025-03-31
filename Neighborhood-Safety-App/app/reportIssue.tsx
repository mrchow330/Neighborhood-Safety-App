import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

export default function ReportScreen() {
  const [selectedIssue, setSelectedIssue] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access the media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleReview = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Report Issue Form</Text>
      <Picker
        selectedValue={selectedIssue}
        onValueChange={(itemValue) => setSelectedIssue(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select an issue type" value="" />
        <Picker.Item label="Pothole/Road Damage" value="pothole" />
        <Picker.Item label="Streetlight Outage" value="streetlight" />
        <Picker.Item label="Graffiti" value="graffiti" />
        <Picker.Item label="Other" value="other" />
      </Picker>
      <TextInput
        style={styles.textInput}
        placeholder="Enter location of the issue"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Describe the issue in detail"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline={true}
        numberOfLines={4}
      />
      <View style={{ marginTop: 50 }}>
        <Button 
          title="Upload Photo (Optional)" 
          onPress={pickImage} 
        />
      </View>
      {photo && <Image source={{ uri: photo }} style={styles.imagePreview} />}
      <View style={{ marginTop: 30 }}>
        <Button 
          title="Review Submission" 
          onPress={handleReview} 
        />
      </View>

      {/* Modal for Review */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Review Your Submission</Text>
              <Text style={styles.modalText}><Text style={styles.boldText}>Issue Type:</Text> {selectedIssue || "Not selected"}</Text>
              <Text style={styles.modalText}><Text style={styles.boldText}>Location:</Text> {location || "Not provided"}</Text>
              <Text style={styles.modalText}><Text style={styles.boldText}>Description:</Text> {description || "Not provided"}</Text>
              {photo && (
                <>
                  <Text style={styles.modalText}><Text style={styles.boldText}>Photo:</Text></Text>
                  <Image source={{ uri: photo }} style={styles.imagePreview} />
                </>
              )}
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#1E293B',
    fontFamily: 'Nunito_400Regular',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 250,
    color: '#1E293B',
  },
  textInput: {
    height: 40,
    width: 250,
    borderColor: '#CBD5E1',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    color: '#1E293B',
  },
  textArea: {
    height: 100,
    width: 250,
    borderColor: '#CBD5E1',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
    color: '#1E293B',
    textAlignVertical: 'top',
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#1E293B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});