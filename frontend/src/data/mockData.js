/**
 * Frontend Copy of Synthetic Cyclone & Satellite Dataset for Standalone Demo Resilience
 */

export const cyclones = [
  {
    id: "CYC-2026-BOB-01",
    name: "CYCLONE DEMO-01",
    code: "BOB-01-2026",
    region: "Bay of Bengal",
    basin: "North Indian Ocean",
    status: "ACTIVE",
    category: "Severe Cyclonic Storm",
    intensityCode: "SCS",
    currentLocation: {
      latitude: 15.40,
      longitude: 88.20,
      formatted: "15.40°N, 88.20°E"
    },
    windSpeedKt: 75,
    windSpeedKmh: 140,
    pressureHpa: 974,
    movementDirection: "North-West (315°)",
    movementSpeedKmh: 18,
    pattern: "Rapid Intensification Pattern",
    patternConfidence: 87.3,
    detectionConfidence: 92.8,
    predictionConfidence: 91.4,
    lastObservation: new Date().toISOString(),
    isSynthetic: true,
    dataLabel: "SYNTHETIC DEMONSTRATION DATA",
    track: [
      { timestamp: "2026-08-25T06:00:00Z", latitude: 10.20, longitude: 92.10, windSpeedKt: 30, pressureHpa: 1004, category: "Depression", stage: "Historical" },
      { timestamp: "2026-08-25T18:00:00Z", latitude: 11.50, longitude: 91.20, windSpeedKt: 40, pressureHpa: 998, category: "Deep Depression", stage: "Historical" },
      { timestamp: "2026-08-26T06:00:00Z", latitude: 12.80, longitude: 90.30, windSpeedKt: 50, pressureHpa: 990, category: "Cyclonic Storm", stage: "Historical" },
      { timestamp: "2026-08-26T18:00:00Z", latitude: 14.10, longitude: 89.20, windSpeedKt: 65, pressureHpa: 982, category: "Severe Cyclonic Storm", stage: "Historical" },
      { timestamp: "2026-08-27T06:00:00Z", latitude: 15.40, longitude: 88.20, windSpeedKt: 75, pressureHpa: 974, category: "Severe Cyclonic Storm", stage: "Current" }
    ],
    predictions: [
      {
        hour: 24,
        forecastTime: "2026-08-28T06:00:00Z",
        latitude: 17.10,
        longitude: 86.80,
        predictedWindSpeedKt: 90,
        predictedWindSpeedKmh: 165,
        predictedPressureHpa: 960,
        category: "Very Severe Cyclonic Storm",
        uncertaintyRadiusKm: 45,
        confidence: 93.2,
        landfallRisk: "Moderate (Odisha/WB Coast)",
        summary: "Continued intensification expected as system crosses warm SST zone (>30.2°C)."
      },
      {
        hour: 48,
        forecastTime: "2026-08-29T06:00:00Z",
        latitude: 19.30,
        longitude: 85.50,
        predictedWindSpeedKt: 105,
        predictedWindSpeedKmh: 195,
        predictedPressureHpa: 948,
        category: "Extremely Severe Cyclonic Storm",
        uncertaintyRadiusKm: 85,
        confidence: 89.4,
        landfallRisk: "HIGH — Landfall Expected Near Puri/Dhamra",
        summary: "Peak intensity expected near coast with intense convective eye organization."
      },
      {
        hour: 72,
        forecastTime: "2026-08-30T06:00:00Z",
        latitude: 21.60,
        longitude: 85.10,
        predictedWindSpeedKt: 60,
        predictedWindSpeedKmh: 110,
        predictedPressureHpa: 985,
        category: "Cyclonic Storm (Post-Landfall)",
        uncertaintyRadiusKm: 140,
        confidence: 82.1,
        landfallRisk: "Inland Weakening",
        summary: "Rapid weakening over land friction following coastal crossing."
      }
    ],
    timeSeries: [
      { time: "-36h", windSpeed: 30, pressure: 1004, eyeDiameterKm: 0, convectiveTempK: 235 },
      { time: "-30h", windSpeed: 35, pressure: 1001, eyeDiameterKm: 0, convectiveTempK: 230 },
      { time: "-24h", windSpeed: 40, pressure: 998, eyeDiameterKm: 0, convectiveTempK: 222 },
      { time: "-18h", windSpeed: 50, pressure: 990, eyeDiameterKm: 45, convectiveTempK: 212 },
      { time: "-12h", windSpeed: 60, pressure: 984, eyeDiameterKm: 38, convectiveTempK: 204 },
      { time: "-6h",  windSpeed: 68, pressure: 978, eyeDiameterKm: 32, convectiveTempK: 198 },
      { time: "Now",   windSpeed: 75, pressure: 974, eyeDiameterKm: 28, convectiveTempK: 194.5 },
      { time: "+6h",  windSpeed: 82, pressure: 968, eyeDiameterKm: 25, convectiveTempK: 191 },
      { time: "+12h", windSpeed: 88, pressure: 962, eyeDiameterKm: 24, convectiveTempK: 189 },
      { time: "+24h", windSpeed: 95, pressure: 956, eyeDiameterKm: 22, convectiveTempK: 187 },
      { time: "+48h", windSpeed: 105, pressure: 948, eyeDiameterKm: 20, convectiveTempK: 184 },
      { time: "+72h", windSpeed: 60, pressure: 985, eyeDiameterKm: 0, convectiveTempK: 215 }
    ]
  },
  {
    id: "CYC-2026-ARB-02",
    name: "SYSTEM ARB-02",
    code: "ARB-02-2026",
    region: "Arabian Sea",
    basin: "North Indian Ocean",
    status: "ACTIVE",
    category: "Deep Depression",
    intensityCode: "DD",
    currentLocation: {
      latitude: 12.10,
      longitude: 66.40,
      formatted: "12.10°N, 66.40°E"
    },
    windSpeedKt: 35,
    windSpeedKmh: 65,
    pressureHpa: 1000,
    movementDirection: "North-North-West (340°)",
    movementSpeedKmh: 14,
    pattern: "Developing System",
    patternConfidence: 84.1,
    detectionConfidence: 89.5,
    predictionConfidence: 88.0,
    lastObservation: new Date().toISOString(),
    isSynthetic: true,
    dataLabel: "SYNTHETIC DEMONSTRATION DATA",
    track: [
      { timestamp: "2026-08-26T06:00:00Z", latitude: 10.50, longitude: 67.80, windSpeedKt: 25, pressureHpa: 1006, category: "Low Pressure Area", stage: "Historical" },
      { timestamp: "2026-08-27T06:00:00Z", latitude: 12.10, longitude: 66.40, windSpeedKt: 35, pressureHpa: 1000, category: "Deep Depression", stage: "Current" }
    ],
    predictions: [
      { hour: 24, latitude: 13.8, longitude: 65.5, predictedWindSpeedKt: 45, predictedPressureHpa: 994, category: "Cyclonic Storm", uncertaintyRadiusKm: 50, confidence: 91.0 },
      { hour: 48, latitude: 15.6, longitude: 64.6, predictedWindSpeedKt: 55, predictedPressureHpa: 988, category: "Severe Cyclonic Storm", uncertaintyRadiusKm: 95, confidence: 86.5 },
      { hour: 72, latitude: 17.5, longitude: 63.8, predictedWindSpeedKt: 65, predictedPressureHpa: 980, category: "Severe Cyclonic Storm", uncertaintyRadiusKm: 150, confidence: 79.8 }
    ],
    timeSeries: [
      { time: "-24h", windSpeed: 25, pressure: 1006, eyeDiameterKm: 0, convectiveTempK: 240 },
      { time: "-12h", windSpeed: 30, pressure: 1003, eyeDiameterKm: 0, convectiveTempK: 236 },
      { time: "Now",   windSpeed: 35, pressure: 1000, eyeDiameterKm: 0, convectiveTempK: 230 },
      { time: "+24h", windSpeed: 45, pressure: 994, eyeDiameterKm: 55, convectiveTempK: 220 },
      { time: "+48h", windSpeed: 55, pressure: 988, eyeDiameterKm: 42, convectiveTempK: 210 },
      { time: "+72h", windSpeed: 65, pressure: 980, eyeDiameterKm: 35, convectiveTempK: 202 }
    ]
  },
  {
    id: "CYC-2024-AMPHAN",
    name: "SUPER CYCLONE AMPHAN",
    code: "BOB-01-2020",
    region: "Bay of Bengal",
    basin: "North Indian Ocean",
    status: "HISTORICAL",
    category: "Super Cyclonic Storm",
    intensityCode: "SuCS",
    currentLocation: {
      latitude: 21.70,
      longitude: 88.30,
      formatted: "21.70°N, 88.30°E (Landfall Sundarbans)"
    },
    windSpeedKt: 140,
    windSpeedKmh: 260,
    pressureHpa: 920,
    movementDirection: "North-North-East",
    movementSpeedKmh: 22,
    pattern: "Mature Super Cyclone",
    patternConfidence: 97.8,
    detectionConfidence: 98.4,
    predictionConfidence: 95.2,
    formationDate: "2020-05-16",
    dissipationDate: "2020-05-21",
    isSynthetic: false,
    dataLabel: "HISTORICAL SATELLITE BENCHMARK DATA",
    track: [
      { timestamp: "2020-05-16T06:00:00Z", latitude: 10.4, longitude: 86.5, windSpeedKt: 30, pressureHpa: 1004, category: "Depression" },
      { timestamp: "2020-05-17T06:00:00Z", latitude: 11.5, longitude: 86.0, windSpeedKt: 55, pressureHpa: 990, category: "Cyclonic Storm" },
      { timestamp: "2020-05-18T06:00:00Z", latitude: 13.4, longitude: 86.2, windSpeedKt: 125, pressureHpa: 935, category: "Extremely Severe" },
      { timestamp: "2020-05-18T18:00:00Z", latitude: 14.2, longitude: 86.3, windSpeedKt: 140, pressureHpa: 920, category: "Super Cyclone Peak" },
      { timestamp: "2020-05-20T12:00:00Z", latitude: 21.7, longitude: 88.3, windSpeedKt: 85, pressureHpa: 956, category: "Landfall Sundarbans" }
    ],
    timeSeries: [
      { time: "Day 1", windSpeed: 30, pressure: 1004, eyeDiameterKm: 0, convectiveTempK: 242 },
      { time: "Day 2", windSpeed: 55, pressure: 990, eyeDiameterKm: 50, convectiveTempK: 218 },
      { time: "Day 3", windSpeed: 125, pressure: 935, eyeDiameterKm: 25, convectiveTempK: 188 },
      { time: "Day 3 Peak", windSpeed: 140, pressure: 920, eyeDiameterKm: 18, convectiveTempK: 180 },
      { time: "Day 4", windSpeed: 110, pressure: 945, eyeDiameterKm: 28, convectiveTempK: 195 },
      { time: "Day 5 Landfall", windSpeed: 85, pressure: 956, eyeDiameterKm: 35, convectiveTempK: 208 }
    ]
  },
  {
    id: "CYC-2023-BIPARJOY",
    name: "CYCLONE BIPARJOY",
    code: "ARB-01-2023",
    region: "Arabian Sea",
    basin: "North Indian Ocean",
    status: "HISTORICAL",
    category: "Very Severe Cyclonic Storm",
    intensityCode: "VSCS",
    currentLocation: {
      latitude: 23.20,
      longitude: 68.60,
      formatted: "23.20°N, 68.60°E (Landfall Jakhau Port, Gujarat)"
    },
    windSpeedKt: 90,
    windSpeedKmh: 165,
    pressureHpa: 966,
    movementDirection: "North-East",
    movementSpeedKmh: 12,
    pattern: "Long-Duration Recurving Cyclone",
    patternConfidence: 94.6,
    detectionConfidence: 96.1,
    predictionConfidence: 93.0,
    formationDate: "2023-06-06",
    dissipationDate: "2023-06-19",
    isSynthetic: false,
    dataLabel: "HISTORICAL SATELLITE BENCHMARK DATA",
    track: [
      { timestamp: "2023-06-06T06:00:00Z", latitude: 11.5, longitude: 66.2, windSpeedKt: 35, pressureHpa: 1000, category: "Deep Depression" },
      { timestamp: "2023-06-08T06:00:00Z", latitude: 13.9, longitude: 66.0, windSpeedKt: 75, pressureHpa: 974, category: "Very Severe" },
      { timestamp: "2023-06-11T06:00:00Z", latitude: 18.0, longitude: 64.8, windSpeedKt: 90, pressureHpa: 966, category: "Peak Intensity" },
      { timestamp: "2023-06-15T18:00:00Z", latitude: 23.2, longitude: 68.6, windSpeedKt: 65, pressureHpa: 980, category: "Landfall Gujarat" }
    ],
    timeSeries: [
      { time: "Jun 06", windSpeed: 35, pressure: 1000, eyeDiameterKm: 0, convectiveTempK: 232 },
      { time: "Jun 08", windSpeed: 75, pressure: 974, eyeDiameterKm: 32, convectiveTempK: 198 },
      { time: "Jun 11", windSpeed: 90, pressure: 966, eyeDiameterKm: 24, convectiveTempK: 190 },
      { time: "Jun 14", windSpeed: 80, pressure: 972, eyeDiameterKm: 30, convectiveTempK: 201 },
      { time: "Jun 15", windSpeed: 65, pressure: 980, eyeDiameterKm: 40, convectiveTempK: 215 }
    ]
  },
  {
    id: "CYC-2021-TAUKTAE",
    name: "EXTREMELY SEVERE CYCLONE TAUKTAE",
    code: "ARB-01-2021",
    region: "Arabian Sea",
    basin: "North Indian Ocean",
    status: "HISTORICAL",
    category: "Extremely Severe Cyclonic Storm",
    intensityCode: "ESCS",
    currentLocation: {
      latitude: 20.80,
      longitude: 71.10,
      formatted: "20.80°N, 71.10°E (Landfall Una, Gujarat)"
    },
    windSpeedKt: 115,
    windSpeedKmh: 215,
    pressureHpa: 950,
    movementDirection: "North-North-West",
    movementSpeedKmh: 16,
    pattern: "Rapid Intensification Coastal System",
    patternConfidence: 96.2,
    detectionConfidence: 97.5,
    predictionConfidence: 94.1,
    formationDate: "2021-05-14",
    dissipationDate: "2021-05-19",
    isSynthetic: false,
    dataLabel: "HISTORICAL SATELLITE BENCHMARK DATA",
    track: [
      { timestamp: "2021-05-14T06:00:00Z", latitude: 10.5, longitude: 74.0, windSpeedKt: 30, pressureHpa: 1004, category: "Depression" },
      { timestamp: "2021-05-15T12:00:00Z", latitude: 13.0, longitude: 72.8, windSpeedKt: 60, pressureHpa: 985, category: "Cyclonic Storm" },
      { timestamp: "2021-05-17T06:00:00Z", latitude: 18.5, longitude: 71.5, windSpeedKt: 115, pressureHpa: 950, category: "Extremely Severe Peak" },
      { timestamp: "2021-05-17T18:00:00Z", latitude: 20.8, longitude: 71.1, windSpeedKt: 95, pressureHpa: 965, category: "Landfall Gujarat Coast" }
    ],
    timeSeries: [
      { time: "May 14", windSpeed: 30, pressure: 1004, eyeDiameterKm: 0, convectiveTempK: 238 },
      { time: "May 15", windSpeed: 60, pressure: 985, eyeDiameterKm: 42, convectiveTempK: 210 },
      { time: "May 16", windSpeed: 95, pressure: 962, eyeDiameterKm: 26, convectiveTempK: 192 },
      { time: "May 17 Peak", windSpeed: 115, pressure: 950, eyeDiameterKm: 21, convectiveTempK: 186 },
      { time: "May 17 Landfall", windSpeed: 95, pressure: 965, eyeDiameterKm: 32, convectiveTempK: 204 }
    ]
  }
];

export const satelliteSources = [
  {
    id: "SAT-INSAT3D",
    name: "INSAT-3D / 3DR",
    shortName: "INSAT-3D/3DR",
    category: "GEOSTATIONARY",
    type: "Geostationary Meteorological Satellite",
    operator: "ISRO / IMD",
    orbitType: "Geostationary (36,000 km, 74°E / 82°E)",
    primaryObservation: "Multispectral Cloud & Thermal IR",
    resolution: "1 km (Visible) / 4 km (Thermal IR & Water Vapor)",
    updateFrequency: "Every 15 minutes",
    coverage: "Indian Ocean Basin (45°E – 105°E)",
    status: "ACTIVE",
    dataStatus: "DEMO STREAM",
    channels: ["Visible (0.65 µm)", "Shortwave IR (1.6 µm)", "Thermal IR-1 (10.8 µm)", "Thermal IR-2 (12.0 µm)", "Water Vapor (6.8 µm)"],
    layers: ["BASE IMAGE", "CLOUD TOP", "THERMAL IR", "WATER VAPOR"],
    capabilities: { cloud: true, ir: true, wv: true, rain: false, wind: false, sar: false },
    contribution: "Provides continuous meteorological observations useful for monitoring cloud organization and cyclone evolution in the Indian Ocean.",
    sampleImages: [
      {
        id: "IMG-INSAT-01",
        title: "INSAT-3D Enhanced Thermal Infrared Channel",
        band: "TIR-1 (10.8 µm)",
        timestamp: "2026-09-11T15:30:00Z",
        cloudTopTemp: "-78.4 °C",
        url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
        eyeCoordinates: "15.40°N, 88.20°E"
      },
      {
        id: "IMG-INSAT-02",
        title: "INSAT-3DR Water Vapor Outflow Layer",
        band: "WV (6.8 µm)",
        timestamp: "2026-09-11T15:15:00Z",
        cloudTopTemp: "-64.2 °C",
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        eyeCoordinates: "15.40°N, 88.20°E"
      }
    ]
  },
  {
    id: "SAT-INSAT3DS",
    name: "INSAT-3DS",
    shortName: "INSAT-3DS",
    category: "GEOSTATIONARY",
    type: "Geostationary Meteorological Satellite",
    operator: "ISRO / IMD",
    orbitType: "Geostationary (36,000 km, 74°E)",
    primaryObservation: "Advanced Atmospheric & Cloud Convective Imagery",
    resolution: "0.5 km (VIS) / 2 km (IR) / 4 km (WV)",
    updateFrequency: "Every 15 minutes",
    coverage: "South Asia & North Indian Ocean",
    status: "ACTIVE",
    dataStatus: "DEMO STREAM",
    channels: ["Visible (0.65 µm)", "SWIR (1.6 µm)", "MIR (3.9 µm)", "TIR-1 (10.8 µm)", "WV (6.8 µm)"],
    layers: ["BASE IMAGE", "CLOUD TOP", "THERMAL IR", "WATER VAPOR"],
    capabilities: { cloud: true, ir: true, wv: true, rain: false, wind: false, sar: false },
    contribution: "Provides next-generation continuous meteorological observations with enhanced radiometric precision for tracking rapid convective organization.",
    sampleImages: [
      {
        id: "IMG-INSAT3DS-01",
        title: "INSAT-3DS High-Resolution Multispectral Imager",
        band: "TIR-1 (10.8 µm) + VIS Composite",
        timestamp: "2026-09-11T15:30:00Z",
        cloudTopTemp: "-79.1 °C",
        url: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=80",
        eyeCoordinates: "15.40°N, 88.20°E"
      }
    ]
  },
  {
    id: "SAT-HIMAWARI9",
    name: "Himawari-9",
    shortName: "Himawari-9",
    category: "GEOSTATIONARY",
    type: "Geostationary Meteorological Satellite",
    operator: "JMA (Japan Meteorological Agency)",
    orbitType: "Geostationary (35,786 km, 140.7°E)",
    primaryObservation: "AHI Multispectral Atmospheric Imagery",
    resolution: "0.5 km (Red Band) / 2 km (Infrared)",
    updateFrequency: "Every 10 minutes",
    coverage: "East Indian Ocean & Bay of Bengal",
    status: "ACTIVE",
    dataStatus: "DEMO STREAM",
    channels: ["True Color RGB", "Clean IR (10.4 µm)", "Mid-Level WV (6.9 µm)", "Upper-Level Outflow (6.2 µm)"],
    layers: ["BASE IMAGE", "CLOUD TOP", "THERMAL IR", "WATER VAPOR"],
    capabilities: { cloud: true, ir: true, wv: true, rain: false, wind: false, sar: false },
    contribution: "Provides high-cadence multispectral atmospheric imagery useful for tracking cirrus outflow channels and upper-level wind shear.",
    sampleImages: [
      {
        id: "IMG-HIMAWARI-01",
        title: "Himawari-9 High-Res True Color Composite",
        band: "AHI Band 3/2/1 RGB",
        timestamp: "2026-09-11T15:20:00Z",
        cloudTopTemp: "-76.8 °C",
        url: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80",
        eyeCoordinates: "15.40°N, 88.20°E"
      }
    ]
  },
  {
    id: "SAT-GPM-MICROWAVE",
    name: "GPM / GMI",
    shortName: "GPM/GMI",
    category: "MICROWAVE",
    type: "Polar-Orbiting Core Observatory",
    operator: "NASA / JAXA",
    orbitType: "Non-Sun-Synchronous LEO (407 km, 65° inc)",
    primaryObservation: "Microwave Rain Rate & Deep Convection",
    resolution: "5 km – 15 km Spatial",
    updateFrequency: "2-3 passes per day per region",
    coverage: "Global Tropical Swath (65°N – 65°S)",
    status: "ACTIVE",
    dataStatus: "DEMO STREAM",
    channels: ["10.65 GHz Horizontal", "18.7 GHz", "36.5 GHz Inner Core", "89.0 GHz Convective Polarization"],
    layers: ["BASE IMAGE", "MICROWAVE", "PRECIPITATION"],
    capabilities: { cloud: false, ir: false, wv: false, rain: true, wind: false, sar: false },
    contribution: "Provides microwave observations and precipitation-related information useful for analyzing inner-core cyclone structure through cirrus shields.",
    sampleImages: [
      {
        id: "IMG-GPM-01",
        title: "GPM 89 GHz Microwave Deep Convection Penetration",
        band: "89 GHz V-Pol",
        timestamp: "2026-09-11T13:45:00Z",
        cloudTopTemp: "Rain Rate: 48.5 mm/hr",
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        eyeCoordinates: "15.40°N, 88.20°E"
      }
    ]
  },
  {
    id: "SAT-SCATTEROMETER",
    name: "Oceansat-3 / OSCAT-3",
    shortName: "OSCAT-3",
    category: "SCATTEROMETER",
    type: "Polar-Orbiting Ocean Satellite",
    operator: "ISRO",
    orbitType: "Sun-Synchronous Polar LEO (720 km)",
    primaryObservation: "Ocean Surface Wind Vector Field",
    resolution: "12.5 km Wind Vector Cell",
    updateFrequency: "Daily Swath Coverage",
    coverage: "Oceanic Surface Wind Field",
    status: "ACTIVE",
    dataStatus: "DEMO STREAM",
    channels: ["Ku-Band Pencil Beam (13.515 GHz)", "HH/VV Radar Backscatter"],
    layers: ["BASE IMAGE", "OCEAN WINDS"],
    capabilities: { cloud: false, ir: false, wv: false, rain: false, wind: true, sar: false },
    contribution: "Provides ocean surface wind observations useful for estimating cyclone circulation, wind radii, and low-level vorticity.",
    sampleImages: [
      {
        id: "IMG-OSCAT-01",
        title: "Oceansat-3 Ocean Surface Wind Vector Field",
        band: "Ku-Band 13.515 GHz",
        timestamp: "2026-09-11T11:10:00Z",
        cloudTopTemp: "Max Wind: 75 kt (140 km/h)",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        eyeCoordinates: "15.40°N, 88.20°E"
      }
    ]
  },
  {
    id: "SAT-ASCAT",
    name: "Metop / ASCAT",
    shortName: "ASCAT",
    category: "SCATTEROMETER",
    type: "Polar-Orbiting Meteorological Satellite",
    operator: "EUMETSAT / ESA",
    orbitType: "Sun-Synchronous Polar (817 km, 98.7° inc)",
    primaryObservation: "C-Band Scatterometry Wind Vectors",
    resolution: "12.5 km Grid",
    updateFrequency: "2 passes daily (Morning/Evening)",
    coverage: "Global Oceans Swath",
    status: "ACTIVE",
    dataStatus: "DEMO STREAM",
    channels: ["C-Band Real Aperture Radar (5.255 GHz)", "Tri-Fan Antenna Triplets"],
    layers: ["BASE IMAGE", "OCEAN WINDS"],
    capabilities: { cloud: false, ir: false, wv: false, rain: false, wind: true, sar: false },
    contribution: "Provides scatterometer observations and ocean surface wind vectors, critical for defining low-level circulation centers and radius of maximum winds.",
    sampleImages: [
      {
        id: "IMG-ASCAT-01",
        title: "Metop ASCAT Surface Wind Vector Circulation",
        band: "C-Band 5.255 GHz",
        timestamp: "2026-09-11T10:05:00Z",
        cloudTopTemp: "Max Wind: 72 kt",
        url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80",
        eyeCoordinates: "15.40°N, 88.20°E"
      }
    ]
  },
  {
    id: "SAT-VIIRS",
    name: "NOAA JPSS / VIIRS",
    shortName: "VIIRS",
    category: "POLAR-ORBITING",
    type: "Polar-Orbiting Environmental Satellite",
    operator: "NOAA / NASA",
    orbitType: "Sun-Synchronous Polar LEO (824 km)",
    primaryObservation: "High-Res Visible / Thermal IR / Night Band",
    resolution: "375 m (I-Bands) / 750 m (M-Bands)",
    updateFrequency: "2 passes per day",
    coverage: "Global Swath (3040 km width)",
    status: "ACTIVE",
    dataStatus: "DEMO STREAM",
    channels: ["I1 Visible (0.64 µm)", "I4 MWIR (3.74 µm)", "I5 TIR (11.45 µm)", "Day-Night Band (DNB 0.7 µm)"],
    layers: ["BASE IMAGE", "CLOUD TOP", "THERMAL IR"],
    capabilities: { cloud: true, ir: true, wv: false, rain: false, wind: false, sar: false },
    contribution: "Provides high-resolution visible and infrared observations for detailed cloud-structure analysis, eye temperature pinpointing, and night-time DNB imagery.",
    sampleImages: [
      {
        id: "IMG-VIIRS-01",
        title: "VIIRS High-Resolution I5 Thermal IR Band (375m)",
        band: "I5 TIR (11.45 µm)",
        timestamp: "2026-09-11T14:15:00Z",
        cloudTopTemp: "-81.2 °C",
        url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80",
        eyeCoordinates: "15.40°N, 88.20°E"
      }
    ]
  },
  {
    id: "SAT-CYGNSS",
    name: "CYGNSS",
    shortName: "CYGNSS",
    category: "MICROWAVE",
    type: "Micro-Satellite Constellation (8 LEO Nanosats)",
    operator: "NASA / Univ. of Michigan",
    orbitType: "LEO Constellation (520 km, 35° inc)",
    primaryObservation: "GNSS-Reflectometry Inner-Core Winds",
    resolution: "25 km Spatial",
    updateFrequency: "4-6 Hour Median Revisit",
    coverage: "Tropical Zone (38°N – 38°S)",
    status: "ACTIVE",
    dataStatus: "DEMO STREAM",
    channels: ["GPS L1 Radar Reflectometry (1.575 GHz)", "Delay-Doppler Maps (DDM)"],
    layers: ["BASE IMAGE", "OCEAN WINDS", "MICROWAVE"],
    capabilities: { cloud: false, ir: false, wv: false, rain: false, wind: true, sar: false },
    contribution: "Provides GNSS-reflectometry observations that penetrate heavy tropical rainfall to measure ocean surface wind speed inside cyclone eyewalls.",
    sampleImages: [
      {
        id: "IMG-CYGNSS-01",
        title: "CYGNSS GNSS-R Delay-Doppler Wind Retrievals",
        band: "L1 GPS Bistatic Radar",
        timestamp: "2026-09-11T12:30:00Z",
        cloudTopTemp: "Eyewall Wind: 78 kt",
        url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
        eyeCoordinates: "15.40°N, 88.20°E"
      }
    ]
  },
  {
    id: "SAT-SENTINEL1",
    name: "Sentinel-1 SAR",
    shortName: "Sentinel-1",
    category: "SAR",
    type: "Synthetic Aperture Radar Polar Satellite",
    operator: "ESA / Copernicus",
    orbitType: "Sun-Synchronous Polar LEO (693 km)",
    primaryObservation: "SAR C-Band High-Res Surface Backscatter",
    resolution: "10 m – 20 m Ultra-High Spatial",
    updateFrequency: "Targeted Swaths (High Latency Pass)",
    coverage: "Global Coastal & Storm Target Swaths",
    status: "ACTIVE",
    dataStatus: "DEMO STREAM",
    channels: ["C-Band SAR (5.405 GHz)", "VV + VH Dual-Polarization"],
    layers: ["BASE IMAGE", "SAR", "OCEAN WINDS"],
    capabilities: { cloud: false, ir: false, wv: false, rain: false, wind: true, sar: true },
    contribution: "Provides high-resolution Synthetic Aperture Radar imagery to penetrate extreme cloud cover and map sea surface roughness, eyewall geometry, and surface winds.",
    sampleImages: [
      {
        id: "IMG-SENTINEL1-01",
        title: "Sentinel-1 C-Band SAR Surface Roughness Map",
        band: "C-Band VV/VH (5.405 GHz)",
        timestamp: "2026-09-11T08:50:00Z",
        cloudTopTemp: "SAR Peak Wind: 79 kt",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        eyeCoordinates: "15.40°N, 88.20°E"
      }
    ]
  },
  {
    id: "SAT-SENTINEL3",
    name: "Sentinel-3",
    shortName: "Sentinel-3",
    category: "POLAR-ORBITING",
    type: "Ocean & Land Environmental Satellite",
    operator: "ESA / EUMETSAT",
    orbitType: "Sun-Synchronous Polar LEO (815 km)",
    primaryObservation: "Sea Surface Temperature & Ocean Color",
    resolution: "300 m (OLCI) / 500 m (SLSTR Thermal)",
    updateFrequency: "1–2 Days Revisit",
    coverage: "Global Oceans",
    status: "ACTIVE",
    dataStatus: "DEMO STREAM",
    channels: ["OLCI 21 Spectral Bands (400-1020 nm)", "SLSTR Dual-View TIR (10.8 µm, 12 µm)"],
    layers: ["BASE IMAGE", "CLOUD TOP", "THERMAL IR"],
    capabilities: { cloud: true, ir: true, wv: false, rain: false, wind: false, sar: false },
    contribution: "Provides accurate sea-surface temperature (SST) and ocean color observations, helping evaluate ocean thermal energy available for cyclone intensification.",
    sampleImages: [
      {
        id: "IMG-SENTINEL3-01",
        title: "Sentinel-3 SLSTR Sea Surface Temperature Anomaly",
        band: "SLSTR TIR (11.0 µm)",
        timestamp: "2026-09-11T09:40:00Z",
        cloudTopTemp: "SST Anomaly: +1.8 °C",
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        eyeCoordinates: "15.40°N, 88.20°E"
      }
    ]
  }
];

export const alerts = [
  {
    id: "ALT-2026-001",
    severity: "WARNING",
    title: "Rapid Intensification Pattern Detected",
    cycloneId: "CYC-2026-BOB-01",
    cycloneName: "CYCLONE DEMO-01",
    region: "Bay of Bengal",
    timestamp: new Date().toISOString(),
    message: "CNN/ViT pattern classifier detected 87.3% probability of Rapid Intensification within 24 hours. Central pressure dropping >1.5 hPa/hr.",
    status: "ACTIVE",
    acknowledged: false,
    recommendedAction: "Issue coastal watch for Odisha and West Bengal maritime zones. Alert disaster management authorities."
  },
  {
    id: "ALT-2026-002",
    severity: "WATCH",
    title: "New Convective Eye Structure Formed",
    cycloneId: "CYC-2026-BOB-01",
    cycloneName: "CYCLONE DEMO-01",
    region: "Bay of Bengal",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    message: "INSAT-3D Thermal IR band confirms closed pin-hole eye formation at 15.40°N, 88.20°E with minimum cloud top temperature of -78.4°C.",
    status: "ACTIVE",
    acknowledged: true,
    recommendedAction: "Increase satellite observation scan frequency to 15-minute interval."
  },
  {
    id: "ALT-2026-003",
    severity: "INFO",
    title: "Deep Depression Escalated to Cyclonic Storm",
    cycloneId: "CYC-2026-ARB-02",
    cycloneName: "SYSTEM ARB-02",
    region: "Arabian Sea",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    message: "Scatterometer surface wind vectors confirm sustained 35-40 kt winds in the eastern quadrant.",
    status: "CLOSED",
    acknowledged: true,
    recommendedAction: "Monitor Arabian Sea recurving vector models."
  }
];

export const analyticsSummary = {
  activeCount: 2,
  monitoredTotal: 12,
  detectedPatterns: 8,
  averageConfidence: "91.4%",
  alertStatus: "WARNING",
  dataSourcesActive: 6,
  regionalDistribution: [
    { region: "Bay of Bengal", count: 7, percentage: "58.3%" },
    { region: "Arabian Sea", count: 5, percentage: "41.7%" }
  ],
  intensityDistribution: [
    { category: "Depression / DD", count: 3 },
    { category: "Cyclonic Storm", count: 4 },
    { category: "Severe Cyclonic Storm", count: 3 },
    { category: "Very Severe / Super Cyclone", count: 2 }
  ],
  modelAccuracyMetrics: {
    detectionAccuracy: "94.2%",
    classificationF1Score: "0.91",
    trajectory24hMAE: "32.4 km",
    trajectory48hMAE: "68.1 km",
    trajectory72hMAE: "112.0 km"
  }
};
