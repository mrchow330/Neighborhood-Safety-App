// import React from 'react'
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
// import { GOOGLE_MAPS_API_KEY } from '../../../config';

// const containerStyle = {
//   width: '1535px',
//   height: '1000px',
// }

// const center = {
//   lat: 40.698,
//   lng: -89.615,
// }

// // const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
// // if (!googleMapsApiKey) {
// //   throw new Error('Google Maps API key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables.');
// // }
// // console.log('Google Maps API Key:', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

// function MyComponent() {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: 'AIzaSyCDnW55eORWwd5nOQZ5PPDygxtNljP_fYY', 
//     googleMapsApiOptions: {
//       libraries: ['places'],
//     },
//   });

//   const [map, setMap] = React.useState(null)

//   const onLoad = React.useCallback(function callback(map) {
//     setMap(map)
//   }, [])

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null)
//   }, [])



//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//       {/* Child components, such as markers, info windows, etc. */}
//       <></>
//     </GoogleMap>
//   ) : (
//     <></>
//   )
// }

// export default React.memo(MyComponent)


import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { GoogleMap, Marker, useJsApiLoader, InfoWindow, MarkerClustererF } from '@react-google-maps/api';
// import { GOOGLE_MAPS_API_KEY } from '../../../config'

const containerStyle = {
  width: '1535px',
  height: '1000px',
};

const statusColors = {
  'Reviewed': '#16a34a',
  'Submitted': '#22c55e',
  'In Progress': '#f97316',
  'Resolved': '#22c55e',
  'Under Review': '#eab308',
};


const center = {
  lat: 40.698,
  lng: -89.615,
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCDnW55eORWwd5nOQZ5PPDygxtNljP_fYY',
    googleMapsApiOptions: {
      libraries: ['places'],
    },
  });

  const [map, setMap] = useState(null);
  const [reports, setReports] = useState([]); 
  const [selectedReport, setSelectedReport] = useState(null);

  // Fetch reports from the backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('https://neighborhood-safety-backend.vercel.app/api/reports');
        setReports(response.data); 
        console.log('Fetched Reports:', response.data); // Debugging
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      }
    };

    fetchReports();
  }, []);

  const onLoad = React.useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Render markers for each report */}
      {reports.map((report) => (
        <Marker
          key={report.report_id}
          position={{
            lat: report.location.coordinates[1], // Latitude
            lng: report.location.coordinates[0], // Longitude
          }}
          onClick={() => setSelectedReport(report)} 
        />
      ))}


      {/* Show info window when a marker is clicked */}
      {selectedReport && (
        <InfoWindow
          position={{
            lat: selectedReport.location.coordinates[1],
            lng: selectedReport.location.coordinates[0],
          }}
          onCloseClick={() => setSelectedReport(null)} // Close the info window
        >
          <div>
            <h3>Report Details</h3>
            <p><strong>Issue Type:</strong> {selectedReport.issueType}</p>
            <p><strong>Status:</strong>{' '}
              <span
                style={{
                  color: statusColors[selectedReport.status] || '#000', // Default to black if status is not found
                }}
              >
                {selectedReport.status}
              </span>
            </p>
            <p><strong>Created At:</strong> {new Date(selectedReport.createdAt).toLocaleDateString()}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
