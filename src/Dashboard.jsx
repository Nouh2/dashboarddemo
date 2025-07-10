import React, { useEffect, useState } from 'react';
import MapboxMap from './MapboxMap';
import LayerControls from './LayerControls';

// Définition des catégories et indicateurs associés
const INDICATOR_CATEGORIES = {
    'soil health': [
      'Soil Cover',
      'Soil Organic Matter',
      'Soil Structure',
      'Erosion Signs',
      'Presence of Soil Fauna',
      'Water Infiltration',
    ],
    'climate': {
      Mitigation: [
        'Carbon Sequestration',
        'GHG Emissions',
        'Conversion of Natural Ecosystems',
      ],
      Adaptation: [
        'Agroforestry',
        'Efficient Livestock Systems',
        'Water Use Efficiency',
      ],
    },
    'biodiversity': {
      "Soil Biodiversity": [
        "Worms' Abundance",
        "Worms' Diversity",
        'Soil Bacterial Biodiversity',
      ],
      "Agroecological Practices": [
        'Use of Phytosanitary Products',
        'Hedgerows, Woods and Moorland',
        'Permanent Grasslands',
      ],
      "Agricultural Biodiversity": [
        'Number of Species and Varieties Grown',
        'Number of Animal Species and Breeds',
      ],
    },
    'socio-economic': {
      "Program Reach": [
        'Number of Beneficiaries',
        'Average Financing Amount',
        'Number of Training Hours',
      ],
      Diversity: [
        'Proportion of Women',
        'Proportion of Youth',
      ],
      "Value Creation": [
        'Increase in Gross Added Value',
        'Increase in Revenue',
      ],
    },
  };

const getScoreForLabel = (label) => {
  // Génère un score aléatoire pour chaque indicateur
  switch (label) {
    case 'Soil cover':
      return Math.random() * 4 + 1;
    case 'Soil organic matter':
      return 2 + Math.random() * 2;
    case 'Soil structure':
      return Math.random() * 5;
    case 'Erosions signs':
      return Math.random() * 5;
    case 'Presence of soil fauna':
      return Math.random() * 5;
    case 'Water infiltration':
      return 2 + Math.random() * 2;
    case 'Precipitation':
      return Math.random() * 5;
    case 'Temperature':
      return Math.random() * 5;
    case 'Humidity':
      return Math.random() * 5;
    case 'Drought index':
      return Math.random() * 5;
    case 'Plant diversity':
      return Math.random() * 5;
    case 'Fauna diversity':
      return Math.random() * 5;
    case 'Pollinator presence':
      return Math.random() * 5;
    case 'Rare species':
      return Math.random() * 5;
    case 'Farm income':
      return Math.random() * 5;
    case 'Employment':
      return Math.random() * 5;
    case 'Market access':
      return Math.random() * 5;
    case 'Education level':
      return Math.random() * 5;
    default:
      return 3;
  }
};

const Gauge = ({ label, value = 0 }) => {
  const size = 120;
  const stroke = 14;
  const separatorStroke = 100;
  const radius = (size - stroke) / 2;
  const center = size / 2;
  const segmentColors = [
    ['#e74c3c', '#e67e22'],
    ['#e67e22', '#f1c40f'],
    ['#f1c40f', '#2ecc71'],
    ['#2ecc71', '#27ae60'],
    ['#27ae60', '#27ae60'],
  ];
  const segments = [
    { start: -90, end: -54 },
    { start: -54, end: -18 },
    { start: -18, end: 18 },
    { start: 18, end: 54 },
    { start: 54, end: 90 }
  ];
  function arcPath(startAngle, endAngle, rad = radius) {
    const start = polarToCartesian(center, center, rad, endAngle);
    const end = polarToCartesian(center, center, rad, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", start.x, start.y,
      "A", rad, rad, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  }
  function polarToCartesian(cx, cy, r, angle) {
    let rad = (angle-90) * Math.PI / 180.0;
    return {
      x: cx + (r * Math.cos(rad)),
      y: cy + (r * Math.sin(rad))
    };
  }
  const degrees = -90 + ((value - 1) * 45);
  const needleLength = radius - 5;
  const needleAngle = (Math.PI / 180) * degrees;
  const needleX = center + needleLength * Math.cos(needleAngle - Math.PI/2);
  const needleY = center + needleLength * Math.sin(needleAngle - Math.PI/2);
  return (
    <div className="gauge-container">
      <svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`}>
        <defs>
          {segmentColors.map(([color1, color2], i) => (
            <linearGradient
              key={i}
              id={`gauge-gradient-${i}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={color1} />
              <stop offset="100%" stopColor={color2} />
            </linearGradient>
          ))}
        </defs>
        {segments.map((seg, i) => (
          <path
            key={i}
            d={arcPath(seg.start, seg.end)}
            stroke={`url(#gauge-gradient-${i})`}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="butt"
          />
        ))}
        {segments.slice(1).map((seg, i) => (
          <path
            key={'sep' + i}
            d={arcPath(seg.start, seg.start + 0.7)}
            stroke="#fff"
            strokeWidth={separatorStroke}
            fill="none"
            strokeLinecap="butt"
          />
        ))}
        <g>
          <line
            x1={center}
            y1={center}
            x2={needleX}
            y2={needleY}
            stroke="#444"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.15"
          />
          <line
            x1={center}
            y1={center}
            x2={needleX}
            y2={needleY}
            stroke="#333"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle
            cx={center}
            cy={center}
            r="8"
            fill="#333"
            stroke="white"
            strokeWidth="2"
          />
        </g>
      </svg>
      <div className="gauge-label">{label}</div>
      <div className="gauge-score">
        Niveau : {value.toFixed(1)} / 5
      </div>
    </div>
  );
};

const DashboardIndicator = ({ customLabel }) => {
  const [score, setScore] = useState(0);
  useEffect(() => {
    setScore(getScoreForLabel(customLabel));
  }, [customLabel]);
  return (
    <div className="dashboard">
      <Gauge label={customLabel} value={score} />
    </div>
  );
};

const Dashboards = ({ category }) => {
  const data = INDICATOR_CATEGORIES[category];
  if (!data) {
    return <div style={{ color: 'red', padding: 16 }}>Aucun indicateur pour cette catégorie.</div>;
  }
  // Si sous-catégories (objet), on affiche chaque sous-catégorie avec ses indicateurs
  if (typeof data === 'object' && !Array.isArray(data)) {
    return (
      <div className="dashboards-container">
        {Object.entries(data).map(([subcat, indicators]) => (
          <div key={subcat} className="dashboard-subcategory-block">
            <h3 className="dashboard-subcategory-title">{subcat}</h3>
            <div className="dashboards-subgrid">
              {Array.isArray(indicators) ? indicators.map(label => (
                <DashboardIndicator key={label} customLabel={label} />
              )) : null}
            </div>
          </div>
        ))}
      </div>
    );
  }
  // Sinon, simple liste
  return (
    <div className="dashboards-container">
      {Array.isArray(data) ? data.map(label => (
        <DashboardIndicator key={label} customLabel={label} />
      )) : null}
    </div>
  );
};

const Dashboard = () => {
  const [showPoints, setShowPoints] = useState(true);
  const [showPolygons, setShowPolygons] = useState(true);
  const [category, setCategory] = useState('soil health');

  return (
    <div className="dashboard-layout">
      <div className="dashboard-map-col">
        <MapboxMap showPoints={showPoints} showPolygons={showPolygons} />
        <LayerControls
          showPoints={showPoints}
          setShowPoints={setShowPoints}
          showPolygons={showPolygons}
          setShowPolygons={setShowPolygons}
        />
      </div>
      <div className="dashboard-indicators-col">
        <div className="dashboard-indicators-header">
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="dashboard-indicators-select"
          >
            {Object.keys(INDICATOR_CATEGORIES).map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
          <span className="dashboard-indicators-title">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
        </div>
        <Dashboards category={category} />
      </div>
    </div>
  );
};

export default Dashboard; 