import React from "react";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({ city }) {
  const [coordinates, setCoordinates] = useState(null);
  const apiKey = "pk.e933e072179fc9272e92df219e17a4d0";

  useEffect(() => {
    if (city) {
      fetch(
        `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${city}&format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            const { lat, lon } = data[0];
            setCoordinates({ lat, lon });
          }
        })
        .catch((error) => {
          console.error("Error fetching coordinates:", error);
        });
    }
  }, [city]);

  return (
    <>
      {coordinates && (
        <MapContainer
          center={[coordinates.lat, coordinates.lon]}
          zoom={13}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[coordinates.lat, coordinates.lon]}>
            <Popup>{city}</Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
}
