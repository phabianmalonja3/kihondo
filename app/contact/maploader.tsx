import React, { Suspense } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export const MapLoader = () => (
  <div className="w-full h-full flex items-center justify-center bg-gray-100">
    <p className="text-gray-500">Loading map...</p>
  </div>
);
