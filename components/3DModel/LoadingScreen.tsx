import { Html } from '@react-three/drei'
import React from 'react'

const LoadingScreen = () => {
  return (
    <Html center>
        <div className="flex flex-col items-center justify-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-xl font-light">Loading 3D Model...</p>
          <div className="w-64 h-1 bg-gray-700 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </Html>
  )
}

export default LoadingScreen

