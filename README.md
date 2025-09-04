# BrightTrack

A comprehensive teacher-facing mobile app for tracking student performance across four learning strands. Built with React Native and Expo for cross-platform compatibility.

##  Design Decisions

### **Color Scheme & Accessibility**
- **Primary Purple (#7C3AED)**: Represents trust, creativity, and education while maintaining excellent contrast ratios
- **Mastery Color Coding**: 
  - BE (Red #EF4444): Beginning - requires immediate attention
  - AE (Yellow #F59E0B): Approaching - needs support  
  - ME (Green #22C55E): Meeting - on track
  - EE (Blue #3B82F6): Exceeding - excelling
- **WCAG 2.1 AA Compliance**: All colors meet minimum 4.5:1 contrast ratios

### **UX Patterns**
- **Debounced Search**: 300ms delay prevents excessive API calls
- **Pull-to-Refresh**: Familiar pattern for data updates
- **Skeleton Loading**: Reduces perceived loading time
- **Progressive Disclosure**: Mastery legend available on-demand to reduce cognitive load

### **Data Architecture**
- **Zustand State Management**: Lightweight, TypeScript-friendly alternative to Redux
- **Real-time API Integration**: Direct connection to JSON Server endpoints
- **Optimistic Updates**: UI updates immediately while API calls happen in background

##  Assumptions Made

1. **API Structure**: Assumed the API returns data in a specific format and mapped accordingly
2. **Network Reliability**: Implemented error handling for network failures and offline scenarios
3. **Data Consistency**: Assumed student IDs are consistent across endpoints
4. **Performance**: Assumed mobile-first design with limited screen real estate
5. **User Expertise**: Designed for teachers familiar with educational technology

##  Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS) or Android Studio (for Android)

### Quick Start

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd BrightTrack
   npm install
   ```

2. **Start JSON Server** (in separate terminal)
   ```bash
   cd ../fullstack-dev-takehome
   json-server --watch db.json --port 3000
   ```

3. **Start the App**
   ```bash
   npm start
   ```

4. **Run on Device/Simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android  
   npm run android
   
   # Web (for testing)
   npm run web
   ```

### Testing

```bash
# Run unit tests
npm test

# Run with coverage
npm test -- --coverage
```

##  Technologies Used

### **Core Framework**
- **React Native 0.79**: Native mobile development with JavaScript
- **Expo SDK 53**: Cross-platform development with native performance
- **TypeScript**: Type safety and better developer experience

### **State Management**
- **Zustand**: Lightweight state management with excellent TypeScript support
- **Why Zustand**: Simpler than Redux, better TypeScript integration, smaller bundle size

### **Navigation & UI**
- **Expo Router**: File-based routing with deep linking support
- **MaterialCommunityIcons**: Consistent iconography throughout the app
- **Expo Linear Gradient**: Beautiful gradient effects for modern UI

### **Data & Export**
- **Fetch API**: Modern HTTP client for API communication
- **Expo File System**: Local file creation for exports
- **Expo Sharing**: Native share sheet integration

### **Testing**
- **Jest**: Unit testing framework
- **React Native Testing Library**: Component testing utilities

##  Features

### **Class Performance Overview**
- Real-time data from API endpoints
- Search and filter by student name, strand, and mastery level
- Color-coded mastery indicators
- Progress visualization with percentage bars

### **Student Details**
- Individual student performance dashboard
- All four learning strands with current competence levels
- CSV export functionality
- Avatar support with fallback initials

### **Learning Strands**
1. **Letter Identification**: Recognizing and identifying letters
2. **Letter Naming**: Correctly naming letters when shown
3. **Letter Formation**: Proper handwriting and letter construction
4. **Phonemic Awareness**: Understanding letter sounds and phonics

##  API Integration

### **Endpoints**
- `GET /class_profile`: Class-level data with strand progress
- `GET /students`: Detailed student data with per-strand performance

### **Data Mapping**
The app automatically maps between API and internal formats:
- API `competence` → App `mastery`
- API `progress` → App `progressPct`
- API `workCovered` → App `workCoveredPct`

##  Testing Strategy

### **Unit Tests**
- Store logic and selectors
- Component rendering and interactions
- API integration and error handling

### **Test Coverage**
- Filter logic: Search + mastery + strand combinations
- Data mapping: API response to app format
- Export functionality: CSV generation and sharing

