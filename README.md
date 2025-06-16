# Real Estate Floor Selector

An interactive React application that allows users to explore residential towers, select floors, and view apartment layouts with an interactive 3D building model.

![Real Estate Floor Selector Demo](/demo.png)

## Features

- **Tower Selection**: Browse through 3 residential towers (A, B, C)
- **Floor Navigation**: Interactive floor selection with a 3d building model and floor selection panel
- **Apartment Layouts**: View multiple unit options per floor with dummy metadata
- **Detailed Unit View**: Expanded information about selected apartments
- **Smooth Animations**: Enhanced user experience with Framer Motion animations
- **Responsive Design**: Optimized for both desktop and mobile devices

## Interactive Elements

- **Hover Effects**: Units scale up and backgrounds darken on hover
- **Smooth Transitions**: Animated transitions between different views
- **Dynamic Data Generation**: Realistic apartment data with varying layouts and prices
- **Custom Cursor**: Dynamic cursor component that follows mouse movement on tower links
- **3D Building Model**: Interactive Three.js powered building visualization

## Tech Stack

- **React**: Frontend UI library
- **Next.js**: React framework for production
- **Three.js**: Javascript 3D library for building model
- **Zustand**: State management
- **Framer Motion**: Animation library for smooth transitions and effects
- **Tailwind CSS**: Utility-first CSS framework for styling
- **TypeScript**: Type safety and improved developer experience

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/real-estate-floor-selector.git
   cd real-estate-floor-selector
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
real-estate-floor-selector/
├── app/
│   ├── towers/
│   │   └── [towerId]/
│   │       └── page.tsx          # Individual tower page
│   ├── globals.css               # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page with tower grid
├── components/
│   ├── 3DModel.tsx              # Interactive building model
│   ├── CustomCursor.tsx         # Custom cursor component
│   ├── FloorSelect.tsx          # Floor selection panel
│   └── LayoutGallery.tsx        # Apartment layout gallery
├── lib/
│   ├── data.ts                  # Tower and apartment data
│   └── helpers.ts               # Utility functions
└── public/
    └── images/                  # Static assets
```

## Usage

### Exploring Towers

1. **Home Page**: Browse the available towers with hover effects and custom cursor
2. **Tower Selection**: Click on any tower to view detailed information
3. **Floor Navigation**: Use the floor selector to navigate between different levels
4. **3D Interaction**: Interact with the 3D building model to visualize the structure
5. **Unit Selection**: Browse data of units on each floor with specifications

### Key Components

#### InteractiveBuilding Component
```jsx
import InteractiveBuilding from './components/3DModel';

// Usage
<InteractiveBuilding floors={floors} />
```

#### FloorSelect Component
```jsx
import FloorSelect from './components/FloorSelect';


## Performance Optimizations

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Dynamic imports for 3D components
- **State Management**: Efficient Zustand store for global state
- **Memoization**: React.memo and useMemo for expensive calculations
- **Responsive Images**: Multiple image sizes for different screen sizes


**Built with ❤️ using React, Next.js, and Three.js**