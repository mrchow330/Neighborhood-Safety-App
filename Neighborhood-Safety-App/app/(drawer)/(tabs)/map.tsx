import React from 'react';
import { createRoot } from 'react-dom/client';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

declare global {
  interface Global {
    GOOGLE_MAPS_API_KEY?: string;
  }
}

const API_KEY =
  (globalThis as Global).GOOGLE_MAPS_API_KEY ?? ("AIzaSyCDnW55eORWwd5nOQZ5PPDygxtNljP_fYY");

const App = () => (
  <APIProvider
    solutionChannel='GMP_devsite_samples_v3_rgmbasicmap'
    apiKey={API_KEY}>
    <Map
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />
  </APIProvider>
);
const root = createRoot(document.getElementById('app')!);
root.render(<App />);