import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

// Define styles at the top
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E293B',
  },
  picker: {
    height: 50,
    width: 250,
    color: '#1E293B',
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    width: 250,
    borderColor: '#CBD5E1',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#1E293B',
  },
  textArea: {
    margin: 20,
    height: 100,
    width: 750,
    borderColor: '#CBD5E1',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#1E293B',
    textAlignVertical: 'top', // Ensures text starts at the top of the text area
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
  buttonStyle: {
    backgroundColor: '#1E293B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'center',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
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
  guidelinesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1E293B',
  },
  guidelinesText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#1E293B',
  },
  submitButton: {
    backgroundColor: '#1E293B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  submissionMessage:{
    fontSize: 24,
    marginBottom: 7,
    textAlign: 'center',
  },
  mapContainer: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  mapSnapshotContainer: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  mapSnapshot: {
    width: '100%',
    height: '100%',
  }
});


const center = {
  lat: 40.698, // Default latitude
  lng: -89.615, // Default longitude
};

export default function ReportScreen() {
  const [selectedIssue, setSelectedIssue] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [geoLocation, setGeoLocation] = useState(null); 
  const [mapLocation, setMapLocation] = useState(center); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(center); 
  const [mapCenter, setMapCenter] = useState(center); 

  const router = useRouter(); 

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCDnW55eORWwd5nOQZ5PPDygxtNljP_fYY',
  });

  const fetchUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const geoJsonLocation = {
          type: "Point",
          coordinates: [longitude, latitude], // GeoJSON format: [longitude, latitude]
        };
        setGeoLocation(geoJsonLocation);
        setMarkerPosition({ lat: latitude, lng: longitude }); // Update the marker position
        setMapCenter({ lat: latitude, lng: longitude }); // Update the map center
        console.log("User's Current Location:", geoJsonLocation); // Debugging
      },
      (error) => {
        console.error("Error fetching location:", error);
        alert("Unable to fetch your location. Please enable location services.");
      }
    );
  };

  const handleMapClick = (event) => {
    const { lat, lng } = event.latLng.toJSON();
    const geoJsonLocation = {
      type: "Point",
      coordinates: [lng, lat], // GeoJSON format: [longitude, latitude]
    };
    console.log("Selected Location:", geoJsonLocation);
    setGeoLocation(geoJsonLocation); 
    setMarkerPosition({ lat, lng }); 
    setMapLocation({ lat, lng });
  };

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

  const uploadToCloudinary = async (uri, reportId) => {
    try {
      const isBase64 = uri.startsWith('data:image');
      const data = new FormData();
  
      if (isBase64) {
        data.append('file', uri);
      } else {
        data.append('file', {
          uri,
          type: 'image/jpeg',
          name: `${reportId}.jpg`, // Use the report ID as the file name
        });
      }
  
      // Add the public_id parameter to set the image name in Cloudinary
      data.append('public_id', `report_${reportId}`); // Use the report ID as the public ID
      data.append('upload_preset', 'neighborhood_safety_app');
  
      const response = await fetch('https://api.cloudinary.com/v1_1/drpqpcyij/image/upload', {
        method: 'POST',
        body: data,
      });
  
      const result = await response.json();
  
      if (!result.secure_url) {
        throw new Error('Failed to upload image to Cloudinary');
      }
  
      return result.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };

  const [submissionMessage, setSubmissionMessage] = useState("");
  const [submissionMessageColor, setSubmissionMessageColor] = useState("#000"); // Default color
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status

  const handleSubmit = async () => {
    
    try {

      // Validate that a location has been selected
      if (!geoLocation || !geoLocation.coordinates || geoLocation.coordinates.length !== 2) {
        alert("Please select a location on the map.");
        return;
      }

      const reportId = uuidv4(); // Generate a unique ID for the report
      let photoUri = null;
  
      if (photo) {
        try {
          photoUri = await uploadToCloudinary(photo, reportId); // Pass the report ID to Cloudinary
        } catch (error) {
          setSubmissionMessage("Failed to upload the image. Please try again.");
          setSubmissionMessageColor("#dc3545");
          return;
        }
      }
  
      const reportData = {
        report_id: reportId,
        issueType: selectedIssue,
        location: geoLocation || { type: 'Point', coordinates: [] }, // Use GeoJSON location
        description,
        photoUri, // Cloudinary URL of the uploaded image
      };
  
      const response = await axios.post('https://neighborhood-safety-backend.vercel.app/api/reports', reportData);
  
      setSubmissionMessage("Report submitted successfully!\nRedirecting to homepage...");
      setSubmissionMessageColor("#28a745")

      setIsSubmitting(true);
  
      // Close the modal after a delay
      setTimeout(() => {
        handleCloseModal();
        setSubmissionMessage(""); // Clear the message after closing
        router.push('/'); // Redirect to the homepage
      }, 3000);
    } catch (error) {
      console.error("Error submitting report:", error);
      setSubmissionMessage("Failed to submit the report. Please try again.");
      setSubmissionMessageColor("#dc3545");
      }
  };


  return (
    <View style={styles.container}>
      {/* Guidelines Section */}
      <ScrollView>
        <Text style={styles.guidelinesTitle}>Examples of Real Safety Concerns:</Text>
        <Text style={styles.guidelinesText}>
          ✅ Hazards – Broken streetlights, fallen trees blocking roads, exposed wiring, etc.
        </Text>
        <Text style={styles.guidelinesText}>
          ✅ Suspicious Activity – Unusual behavior that may indicate a crime or safety risk.
        </Text>
        <Text style={styles.guidelinesText}>
          ✅ Vandalism or Property Damage – Graffiti, broken windows, tampered locks, etc.
        </Text>
        <Text style={styles.guidelinesText}>
          ✅ Unsafe Infrastructure – Potholes, damaged sidewalks, missing street signs.
        </Text>
        <Text style={styles.guidelinesText}>
          ✅ Environmental Risks – Flooding, gas leaks, fires, or unsafe dumping.
        </Text>
        <Text style={styles.guidelinesText}>
          ✅ Lost or Found Items – A lost pet, abandoned suspicious objects, etc.
        </Text>

        <Text style={styles.guidelinesTitle}>What Wouldn't Count?</Text>
        <Text style={styles.guidelinesText}>
          ❌ Personal Disputes – Arguments between neighbors that don’t involve safety.
        </Text>
        <Text style={styles.guidelinesText}>
          ❌ Non-urgent Issues – A slightly overgrown lawn, personal grievances, etc.
        </Text>
        <Text style={styles.guidelinesText}>
          ❌ False Alarms – Reporting someone just because they “look suspicious” without valid reasons.
        </Text>

        {/* Dropdown Menu */}
        <Picker
          selectedValue={selectedIssue}
          onValueChange={(itemValue) => setSelectedIssue(itemValue)}
          style={[styles.picker, { marginTop: 20 }]}
        >
          <Picker.Item label="Select an issue type" value="" />
          <Picker.Item label="Pothole/Road Damage" value="pothole" />
          <Picker.Item label="Streetlight Outage" value="streetlight" />
          <Picker.Item label="Graffiti" value="graffiti" />
          <Picker.Item label="Other" value="other" />
        </Picker>

        <View style={{ marginTop: 30 }}>

          {/* Form Section */}
          <Text style={styles.text}>Select Location on the Map or press "Use My Location"</Text>
          {isLoaded && (
            <View style={styles.mapContainer}>
              <GoogleMap
                mapContainerStyle={styles.mapContainer}
                center={mapCenter} // Use mapCenter for the map's center
                zoom={15}
                onClick={handleMapClick}
              >
                <Marker position={markerPosition} /> {/* Use markerPosition for the marker */}
              </GoogleMap>
            </View>
          )}
          {geoLocation && geoLocation.coordinates && (
            <Text style={styles.text}>
              Selected Location: Lat: {geoLocation.coordinates[1]}, Lng: {geoLocation.coordinates[0]}
            </Text>
          )}
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity style={styles.buttonStyle} onPress={fetchUserLocation}>
              <Text style={styles.buttonTextStyle}>Use My Location</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 20 }}>
            <TouchableOpacity style={styles.buttonStyle} onPress={pickImage}>
              <Text style={styles.buttonTextStyle}>Upload Photo (Optional)</Text>
            </TouchableOpacity>
            {photo && (
              <View style={{ marginTop: 20, alignItems: 'center' }}>
                <Image source={{ uri: photo }} style={styles.imagePreview} />
                <TouchableOpacity
                  style={[styles.buttonStyle, { backgroundColor: '#dc3545', marginTop: 10 }]} // Red button for "Remove Photo"
                  onPress={() => setPhoto(null)} // Reset the photo state
                >
                  <Text style={styles.buttonTextStyle}>Remove Photo</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.text}>Describe the Issue</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Describe the issue in detail"
              value={description}
              onChangeText={(text) => setDescription(text)}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <View style={{ marginTop: 30 }}>
            <TouchableOpacity style={styles.buttonStyle} onPress={handleReview}>
              <Text style={styles.buttonTextStyle}>Review Submission</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Review Your Submission</Text>
            <Text style={styles.modalText}>
              <Text style={styles.boldText}>Issue Type:</Text> {selectedIssue || "Not selected"}
            </Text>
            <Text style={styles.modalText}>
              <Text style={styles.boldText}>Location:</Text>{' '}
              {geoLocation ? `Lat: ${mapLocation.lat}, Lng: ${mapLocation.lng}` : 'Not provided'}
            </Text>

            {geoLocation && (
              <View style={styles.mapSnapshotContainer}>
                <GoogleMap
                  mapContainerStyle={styles.mapSnapshot}
                  center={mapLocation}
                  zoom={15}
                  options={{
                    disableDefaultUI: true, // Hide default controls for a cleaner snapshot
                    draggable: false, // Disable dragging
                  }}
                >
                  <Marker position={mapLocation} />
                </GoogleMap>
              </View>
            )}
            <Text style={styles.modalText}>
              <Text style={styles.boldText}>Description:</Text> {description || "Not provided"}
            </Text>
            {photo && (
              <>
                <Text style={styles.modalText}>
                  <Text style={styles.boldText}>Photo:</Text>
                </Text>
                <Image source={{ uri: photo }} style={styles.imagePreview} />
              </>
            )}
            
            {/* Conditionally render buttons */}
            {!isSubmitting && (
              <>
                <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Submit Report</Text>
                </TouchableOpacity>
              </>
            )}

            {/* Display the submission message */}
            {submissionMessage ? (
              <Text style={[styles.submissionMessage, { color: submissionMessageColor }]}>
                {submissionMessage}
              </Text>
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  );
}