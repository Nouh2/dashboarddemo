import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoibm91aDIiLCJhIjoiY21jeDdiYnFiMDhjazJqcXQ3cmp1MzJwdiJ9.n7iaZJM7Y5M31XTYccKXYA';

const MapboxMap = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/nouh2/cmcxgiule001m01sjaxe4fawt',
      center: [2.35, 48.85],
      zoom: 5
    });
    return () => map.remove();
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', background: '#e3e3e3' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default MapboxMap; 
