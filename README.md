# BrightTrack

A comprehensive teacher-facing mobile app for tracking student performance across four learning strands. Built with Expo, React Native, and Zustand for seamless state management.

## 🎯 Project Overview

BrightTrack empowers teachers to:
- **View class performance** organized by four learning strands
- **Track individual students** with color-coded competence levels (BE, AE, ME, EE)
- **Filter and search** students by name, strand, and mastery level
- **Export student data** as CSV files for reporting and analysis
- **Access detailed views** of each student's performance across all strands

## 🎨 Design Decisions & Rationale

### Color Scheme
- **Primary Purple (#7C3AED)**: Represents trust, creativity, and education
- **White Background**: Ensures excellent readability and reduces cognitive load
- **Mastery Colors**: 
  - BE (Red #EF4444): Beginning - requires immediate attention
  - AE (Yellow #F59E0B): Approaching - needs support
  - ME (Green #22C55E): Meeting - on track
  - EE (Blue #3B82F6): Exceeding - excelling

### Typography
- **Inter Font**: Modern, highly readable, and accessible
- **Hierarchical Scale**: Clear visual hierarchy for easy scanning
- **White Text on Mastery Pills**: Ensures WCAG AA compliance for color contrast

### UX Patterns
- **Debounced Search**: 300ms delay prevents excessive API calls
- **Pull-to-Refresh**: Familiar pattern for data updates
- **Skeleton Loading**: Reduces perceived loading time
- **Empty States**: Helpful illustrations guide users when no data is available

## 🏗️ Technology Stack

### Core Technologies
- **Expo SDK 53**: Cross-platform development with native performance
- **React Native 0.79**: Native mobile app development
- **TypeScript**: Type safety and better developer experience
- **Zustand**: Lightweight state management with excellent TypeScript support

### Navigation & UI
- **Expo Router**: File-based routing with deep linking support
- **MaterialCommunityIcons**: Consistent iconography throughout the app
- **Expo Image**: Optimized image loading with placeholders
- **React Native Super Grid**: Responsive grid layouts

### Data & Export
- **Expo File System**: Local file creation for exports
- **Expo Sharing**: Native share sheet integration
- **Fetch API**: Modern HTTP client for API communication

## 📱 Features

### Class Performance Overview
- **Mastery Key Legend**: Always visible reference for competence levels
- **Search & Filters**: Multi-criteria filtering with debounced search
- **Strand Cards**: Each learning strand displayed with progress and student list
- **Student Rows**: Avatar, name, and mastery chip for quick identification

### Student Details
- **Performance Dashboard**: All four strands with current competence levels
- **Progress Visualization**: Color-coded progress bars matching mastery levels
- **Export Functionality**: CSV export with comprehensive student data
- **Avatar Support**: Real photos with fallback to initials

### Learning Strands
1. **Letter Identification**: Recognizing and identifying letters
2. **Letter Naming**: Correctly naming letters when shown
3. **Letter Formation**: Proper handwriting and letter construction
4. **Phonemic Awareness**: Understanding letter sounds and phonics

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BrightTrack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web (for testing)
   npm run web
   ```

### Development Commands

```bash
# Start development server
npm start

# Run on specific platform
npm run ios
npm run android
npm run web

# Lint code
npm run lint

# Reset project (if needed)
npm run reset-project
```

## 🧪 Testing

### Unit Tests
Run the test suite to validate core functionality:

```bash
npm test
```

### Test Coverage
- **Filter Logic**: Search + mastery + strand combinations
- **Selectors**: `getStudentById`, `getStudentsForStrand`
- **ProgressBar**: Value clamping and rendering
- **Navigation**: ClassOverview → StudentDetails integration

### E2E Testing Path
1. Load app and verify data appears
2. Filter by mastery level (e.g., "EE")
3. Search for specific student
4. Open student details
5. Export CSV and verify file generation

## 🔧 API Integration

### Endpoints
- `GET /class_profile`: Returns class-level data with strand progress and student summaries
- `GET /students`: Returns detailed student data with per-strand performance

### Mock Data
For development and testing, the app uses mock data that simulates real API responses. To switch to real API:

1. Update `API_BASE_URL` in `app/constants.ts`
2. Remove mock data imports from `app/store.ts`
3. Uncomment real API calls

### Error Handling
- **Network Errors**: User-friendly messages with retry options
- **Partial Data**: Graceful handling of missing avatar URLs or progress percentages
- **Offline Support**: Cached data with last updated timestamps

## 📊 Export Functionality

### CSV Export Format
```csv
Student Name,Strand,Mastery,Work Progress %,Exported At
Emma Johnson,Letter Identification,EE,95,2024-01-15T10:30:00Z
Emma Johnson,Letter Naming,ME,82,2024-01-15T10:30:00Z
...
```

### Export Features
- **Native Share Sheet**: Uses device's built-in sharing capabilities
- **File Naming**: Includes student name and timestamp
- **Data Integrity**: All displayed data accurately exported
- **Error Handling**: Graceful failure with user feedback

## ♿ Accessibility

### WCAG 2.1 AA Compliance
- **Color Contrast**: Minimum 4.5:1 ratio for body text
- **Touch Targets**: Minimum 44x44 points for interactive elements
- **Screen Reader**: Comprehensive accessibility labels and hints
- **Focus Management**: Logical tab order and visible focus indicators

### Accessibility Features
- **VoiceOver/TalkBack**: Full screen reader support
- **Dynamic Type**: Respects system font size preferences
- **High Contrast**: Maintains readability in high contrast mode
- **Reduced Motion**: Respects system motion preferences

## 📱 Performance Optimization

### Best Practices
- **Virtualized Lists**: Efficient rendering of large student lists
- **Memoized Selectors**: Prevents unnecessary re-renders
- **Debounced Search**: Reduces API calls and improves responsiveness
- **Image Optimization**: Lazy loading with placeholder images

### Memory Management
- **Selective Store Subscriptions**: Components only subscribe to needed state
- **Cleanup**: Proper effect cleanup and memory leak prevention
- **Caching**: Intelligent data caching with staleness detection

## 🐛 Troubleshooting

### Common Issues

**App won't start**
```bash
# Clear cache and reinstall
npm run reset-project
npm install
```

**Fonts not loading**
- Ensure `@expo-google-fonts/inter` is installed
- Check network connection for font downloads

**Export not working**
- Verify Expo Sharing permissions
- Check device storage space
- Ensure file system access is granted

**Navigation issues**
- Clear Expo cache: `expo start -c`
- Restart development server

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review Expo documentation for platform-specific issues

---

**BrightTrack** - Empowering teachers to track student progress with confidence and clarity.
