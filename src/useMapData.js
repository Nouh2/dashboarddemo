import { useState, useEffect } from 'react';

export default function useMapData() {
  const [data, setData] = useState({ points: null, polygons: null, loading: true });

  useEffect(() => {
    // Simuler un chargement asynchrone
    setTimeout(() => {
      setData({
        points: {
          "type": "FeatureCollection",
          "features": [
            { "type": "Feature", "geometry": { "type": "Point", "coordinates": [2.35, 48.85] }, "properties": { "name": "Paris" } },
            { "type": "Feature", "geometry": { "type": "Point", "coordinates": [4.83, 45.76] }, "properties": { "name": "Lyon" } }
          ]
        },
        polygons: {
          "type": "FeatureCollection",
          "features": [
            { "type": "Feature", "geometry": { "type": "Polygon", "coordinates": [[[2.33, 48.84],[2.37,48.84],[2.37,48.87],[2.33,48.87],[2.33,48.84]]] }, "properties": { "zone": "Paris Centre" } }
          ]
        },
        loading: false
      });
    }, 800);
  }, []);

  return data;
} 