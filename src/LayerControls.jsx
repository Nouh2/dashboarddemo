import React from 'react';

const LayerControls = ({ showPoints, setShowPoints, showPolygons, setShowPolygons }) => (
  <div className="layer-controls">
    <label>
      <input type="checkbox" checked={showPoints} onChange={e => setShowPoints(e.target.checked)} />
      Afficher les points
    </label>
    <label style={{ marginLeft: '16px' }}>
      <input type="checkbox" checked={showPolygons} onChange={e => setShowPolygons(e.target.checked)} />
      Afficher les polygones
    </label>
  </div>
);

export default LayerControls; 