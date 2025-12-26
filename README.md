# Job Application Tracker (Lite)

A React Native mobile application for tracking job applications with advanced filtering, distance calculation, and persistent storage.

## Features

- **Jobs Dashboard**: Browse available jobs with company, title, type, salary, and distance information
- **Live Filtering**: Filter jobs by company name, job type, salary range, and distance
- **Distance Calculation**: Automatic calculation of straight-line distance from Jaipur center (26.9124, 75.7873)
- **Applied Jobs Tracking**: Move jobs to an Applied Jobs list with persistent storage
- **Undo/Withdraw**: Remove applications and return jobs to the dashboard
- **Multilingual Support**: Internationalization (i18n) with English and Hindi translations
- **Dark Mode Support**: Automatic theme switching based on system preferences

## Setup

### Prerequisites

- Node.js >= 20
- React Native development environment set up
- iOS: Xcode and CocoaPods
- Android: Android Studio and JDK

### Installation

1. Install dependencies:

```sh
npm install
```

2. For iOS, install CocoaPods dependencies:

```sh
cd ios && bundle exec pod install && cd ..
```

### Running the App

#### Start Metro Bundler

```sh
npm start
```

#### Run on iOS

```sh
npm run ios
```

#### Run on Android

```sh
npm run android
```

## Architecture

### Project Structure

```
JobApplicationTracker/
├── components/          # Reusable UI components
│   ├── JobCard.tsx     # Job card display component
│   ├── FilterBar.tsx   # Filter controls component
│   ├── FilterChips.tsx # Multi-select chip component
│   ├── Slider.tsx      # Slider input component
│   └── TabBar.tsx      # Navigation tab bar
├── screens/            # Screen components
│   ├── JobsDashboard.tsx  # Main jobs listing screen
│   └── AppliedJobs.tsx    # Applied jobs screen
├── context/            # React Context for state management
│   └── JobContext.tsx  # Jobs and filters state
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── distance.ts     # Distance calculation (Haversine formula)
│   ├── filters.ts      # Filtering logic
│   └── storage.ts      # AsyncStorage persistence
├── data/               # Static data
│   └── jobs.ts         # Job data and initialization
├── i18n/               # Internationalization
│   ├── index.ts        # i18n configuration
│   └── locales/        # Translation files
│       ├── en.json     # English translations
│       └── hi.json     # Hindi translations
└── App.tsx             # Root component
```

### Key Design Decisions

#### State Management
- **React Context API**: Used for global state management (jobs, applied jobs, filters)
- **useMemo/useCallback**: Extensive use for performance optimization
- **AsyncStorage**: Persistent storage for applied jobs across app restarts

#### Distance Calculation
- **Haversine Formula**: Used for accurate great-circle distance calculation between coordinates
- **Reference Point**: Hardcoded to Jaipur center (26.9124, 75.7873)
- **Pre-calculated**: Distances calculated during job initialization for performance

#### Filtering
- **Live Updates**: Filters apply immediately as user interacts
- **Combined Filters**: All filters work together (AND logic)
- **Memoized Results**: Filtered job list is memoized to prevent unnecessary recalculations

#### Performance Optimizations
- **FlatList**: Used for efficient rendering of long lists with virtualization
- **React.memo**: Applied to components to prevent unnecessary re-renders
- **Stable Keys**: Job IDs used as keys for stable list rendering
- **Windowed Rendering**: Configured FlatList with optimized render parameters

#### Component Architecture
- **Reusable Components**: JobCard, FilterChips, Slider are all reusable
- **Props Interface**: Well-defined TypeScript interfaces for type safety
- **Separation of Concerns**: Clear separation between presentation and logic

#### Internationalization
- **i18next**: Industry-standard i18n library
- **Auto-detection**: Language detection based on device settings
- **Fallback**: English as fallback language
- **Extensible**: Easy to add more languages by adding translation files

## Trade-offs

### Dependencies
- **@react-native-community/slider**: Added for better UX instead of custom button-based controls
- **@react-native-async-storage/async-storage**: Standard React Native storage solution
- **i18next/react-i18next**: Industry standard for internationalization
- **react-native-localize**: For automatic language detection

### Distance Calculation
- **Straight-line distance**: Uses Haversine formula for great-circle distance, not driving distance
- **Fixed reference point**: Hardcoded to Jaipur center - could be made configurable in future

### Filtering
- **In-memory filtering**: All jobs loaded into memory - could be paginated for larger datasets
- **Live filtering**: No debouncing - filters apply immediately (acceptable for small dataset)

### Storage
- **AsyncStorage**: Uses AsyncStorage which has size limits (10MB on iOS, varies on Android)
- **IDs only**: Stores only applied job IDs, not full job data (efficient but requires job data to persist)

## What I'd Do Next

### Immediate Improvements
1. **Debouncing**: Add debouncing to text input filters for better performance with larger datasets
2. **Pagination**: Implement pagination or virtual scrolling for very large job lists
3. **Error Handling**: Add error boundaries and better error handling for storage operations
4. **Loading States**: Add loading indicators during initial data load and storage operations
5. **Unit Tests**: Add comprehensive unit tests for utilities (distance calculation, filtering logic)

### Feature Enhancements
1. **Search**: Add full-text search across job titles and descriptions
2. **Sorting**: Add sorting options (by salary, distance, company name)
3. **Favorites**: Add ability to favorite jobs without applying
4. **Job Details**: Detailed job view with full description
5. **Location Picker**: Allow users to set custom reference location
6. **Export/Import**: Export applied jobs list, import job data
7. **Notifications**: Remind users about applied jobs or new matching jobs
8. **Analytics**: Track job application metrics and trends

### Technical Improvements
1. **State Management**: Consider Redux or Zustand for more complex state if app grows
2. **API Integration**: Replace static data with API calls
3. **Offline Support**: Implement offline-first architecture with sync
4. **Caching**: Add caching layer for job data and images
5. **Performance Monitoring**: Add performance monitoring and crash reporting
6. **Accessibility**: Enhance accessibility features (screen reader support, larger touch targets)
7. **Testing**: Add E2E tests using Detox or Maestro

### UX Improvements
1. **Animations**: Add smooth transitions and animations
2. **Pull to Refresh**: Add pull-to-refresh functionality
3. **Empty States**: Enhance empty state designs with illustrations
4. **Onboarding**: Add onboarding flow for first-time users
5. **Settings**: Add settings screen for language selection, theme preference

## Dependencies

- **react**: 19.2.0
- **react-native**: 0.83.1
- **@react-native-async-storage/async-storage**: Persistent storage
- **i18next**: 23.x - Internationalization framework
- **react-i18next**: 14.x - React bindings for i18next
- **react-native-localize**: 3.x - Device locale detection
- **@react-native-community/slider**: Native slider component
- **react-native-safe-area-context**: Safe area handling

## License

This project is private and proprietary.

## Author

Built with React Native and TypeScript, following best practices for maintainability and performance.
