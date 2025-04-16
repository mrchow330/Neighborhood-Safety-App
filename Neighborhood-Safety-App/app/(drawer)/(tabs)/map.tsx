// import React from 'react'
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
// import { GOOGLE_MAPS_API_KEY } from '../../../config';

// const containerStyle = {
//   width: '1550px',
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

import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY } from '../../../config'

const containerStyle = {
  width: '1550px',
  height: '1000px',
}

const center = {
  lat: 40.698,
  lng: -89.615,
}

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    googleMapsApiOptions: {
      libraries: ['places'],
    },
  })

  const [map, setMap] = React.useState(null)
  const [markers, setMarkers] = React.useState([])

  const onLoad = React.useCallback((map) => {
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(() => {
    setMap(null)
  }, [])

  const handleMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date().toISOString(), // unique key
      },
    ])
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleMapClick}
    >
      {markers.map((marker) => (
        <Marker key={marker.time} position={{ lat: marker.lat, lng: marker.lng }} />
      ))}
    </GoogleMap>
  ) : (
    <></>
  )
}

export default React.memo(MyComponent)
