# CYCLONE INTELLIGENCE — Multi-Source Satellite Tropical Cyclone System

**Smart India Hackathon (SIH 2026) Project Demonstration**

A scientific, multi-source satellite-based tropical cyclone monitoring, identification, pattern classification, temporal analysis, and trajectory prediction platform for the North Indian Ocean (Arabian Sea, Bay of Bengal, Indian Ocean).

---

## 📌 Problem Statement & Objective
AI/ML-based identification, classification, and prediction of different tropical cyclone patterns using multi-source satellite data (geostationary thermal infrared, water vapor outflow, polar microwave rain rates, and scatterometer ocean surface wind vectors).

---

## 🔄 End-to-End Scientific Pipeline

```
MULTI-SOURCE SATELLITE DATA
        ↓
DATA INGESTION & PREPROCESSING
        ↓
IMAGE & FEATURE PROCESSING
        ↓
AI CYCLONE DETECTION (CNN / ViT)
        ↓
PATTERN CLASSIFICATION (Rapid Intensification / Mature)
        ↓
TEMPORAL ANALYSIS (LSTM / Transformer Time-Series)
        ↓
CYCLONE PREDICTION (72-Hour Forecast & Uncertainty Cone)
        ↓
CONFIDENCE ESTIMATION
        ↓
LEAFLET & D3 VISUALIZATION
        ↓
ALERT / DECISION SUPPORT
```

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 (Vite SPA)
- **Styling**: Vanilla CSS3 + Scientific Dark Navy Design System (`#060c1c`, `#0b1736`, glassmorphism panels, micro-animations)
- **Map Engine**: Leaflet + OpenStreetMap dark radar layers
- **Visualizations**: D3.js / SVG Time-Series Graphs & Radial Confidence Gauges
- **Icons**: Lucide React

### Backend API Gateway
- **Environment**: Node.js + Express.js
- **Architecture**: REST API architecture (`/api/cyclones`, `/api/satellite`, `/api/prediction`, `/api/alerts`, `/api/auth`)
- **Database Support**: MongoDB via Mongoose (with automated in-memory dataset fallback)
- **Auth**: JWT Authentication with Demo User Support

### AI/ML Service Gateway
- **Service**: Python 3 Flask/FastAPI REST Service (`ml_service/app.py`)
- **Detection**: Vision Transformer (ViT-B/16) Eye Extraction
- **Pattern Classification**: ConvNeXt Spatial Embeddings + XGBoost Classifier
- **Temporal & Trajectory**: Bidirectional LSTM + Ensemble Forecast Transformer

---

## 🚀 Quick Start Guide (Local Execution)

The project is pre-configured with **DEMO DATA MODE** so it runs out-of-the-box without external API keys or local MongoDB setups.

### 1. Running the Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Running the Node.js Express Backend
```bash
cd backend
npm install
npm start
```
The REST API server will run on [http://localhost:5000/api](http://localhost:5000/api).

### 3. Running the Python ML Inference Service (Optional)
```bash
cd ml_service
pip install -r requirements.txt
python app.py
```
The ML inference gateway runs on [http://localhost:8000](http://localhost:8000).

---

## 🌟 Key Application Features & Pages

1. **Landing Page** (`/`): Scientific hero header, animated cyclone vortex, capabilities grid, 5-step pipeline, multi-source rationale.
2. **Demo Login** (`/login`): 1-click Demo Access for SIH Judges and Meteorologists.
3. **Main Dashboard** (`/dashboard`): Command-center layout with 6 metric cards, North Indian Ocean Leaflet cyclone map, active storm list, temporal trend preview, and alert ticker.
4. **Live Cyclone Tracking** (`/tracking`): Fullscreen interactive Leaflet map rendering historical tracks, current position markers, 72-hour forecast path (dashed line), and translucent uncertainty cone circles.
5. **Satellite Imagery Viewer** (`/satellite`): Multi-channel satellite inspector (INSAT-3D TIR, WV, Himawari-9, GPM 89 GHz Microwave, Oceansat-3 Scatterometer) with opacity slider, zoom/pan, and eye coordinate overlay.
6. **AI Cyclone Identification** (`/identification`): Image processing simulation with animated pipeline loading steps (Receiving → Preprocessing → ViT Feature Extraction → Eye Detection) and 92.8% confidence readout.
7. **Pattern Classification** (`/classification`): Spatial pattern probabilities (Rapid Intensification 87.3%, Mature Cyclone 9.2%) and feature explainability breakdown.
8. **Temporal Analysis** (`/temporal`): D3/SVG time-series charts for wind speed, pressure, eye diameter, and cloud top temperatures across 6h to 72h windows.
9. **Cyclone Prediction Engine** (`/prediction`): 24h, 48h, 72h forecast trajectory cards and landfall risk scoring.
10. **Historical Cyclone Database** (`/history`): Searchable catalog of Super Cyclone Amphan, Biparjoy, Tauktae, and Fani.
11. **Analytics Dashboard** (`/analytics`): Regional distribution and model Mean Absolute Error (MAE) accuracy benchmarks.
12. **Alert Center** (`/alerts`): Actionable decision support alerts with severity levels (INFO, WATCH, WARNING, CRITICAL) and simulated SMS/Email dispatch.
13. **Data Sources & Pipeline** (`/data-sources`): Step-by-step ingestion and preprocessing workflow.
14. **Model Architecture** (`/models`): Technical specification cards for all AI/ML models.
15. **SIH Presentation Mode**: Automated 3-minute guided walkthrough for SIH judging evaluation.

---

## 📜 Scientific Disclaimer
This application is a decision-support demonstration prototype developed for Smart India Hackathon. Model confidence metrics are provided to communicate uncertainty transparently.
