import React, { useEffect, useState, useRef } from "react";
import { MdLocationOn, MdCalendarToday } from "react-icons/md";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationPicker({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function LocationDate() {
  const [position, setPosition] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [locationText, setLocationText] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const dateInputRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setPosition(coords);
        setLocationText(`${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}`);
      },
      (err) => {
        console.error("Geolocation error:", err);
      }
    );
  }, []);

  useEffect(() => {
    if (position) {
      setLocationText(`${position[0].toFixed(5)}, ${position[1].toFixed(5)}`);
    }
  }, [position]);

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[436px] bg-white shadow-lg rounded-full flex flex-col sm:flex-row items-center px-6 py-4 gap-4 sm:gap-6 w-[40%] max-w-2xl z-20">
      {/* Location */}
      <div className="flex items-center gap-2 w-full relative">
        <MdLocationOn
          className="text-blue-600 text-xl cursor-pointer"
          onClick={() => setShowMap((prev) => !prev)}
        />
        <div className="flex flex-col text-sm text-gray-500 w-full">
          <span className="font-semibold text-gray-700">Location</span>
          <input
            type="text"
            value={locationText}
            placeholder="Find your location"
            readOnly
            className="outline-none bg-transparent placeholder:text-sm"
          />
        </div>

        {/* Map popup */}
        {showMap && (
          <div className="absolute top-12 left-0 w-[300px] h-[200px] z-50 border rounded-md overflow-hidden">
            <MapContainer
              center={position || [51.505, -0.09]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {position && <Marker position={position} />}
              <LocationPicker setPosition={setPosition} />
            </MapContainer>
          </div>
        )}
      </div>

      {/* Date Picker */}
      <div className="flex items-center gap-2 w-full relative">
        <MdCalendarToday
          className="text-blue-600 text-xl cursor-pointer"
          onClick={() => dateInputRef.current?.showPicker()}
        />
        <div className="flex flex-col text-sm text-gray-500 w-full">
          <span className="font-semibold text-gray-700">Select Date</span>
          <span className="text-sm text-gray-800">
            {selectedDate ? selectedDate : "No date selected"}
          </span>
        </div>
        {/* Hidden native input to trigger date picker */}
        <input
          ref={dateInputRef}
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="absolute opacity-0 pointer-events-none"
        />
      </div>

      {/* Button */}
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-9 py-2 rounded-full text-sm font-medium">
        Search
      </button>
    </div>
  );
}
