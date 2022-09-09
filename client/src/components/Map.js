import React, { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet'
/**
 * @param center object with lat, lon array {[0, 0]}
 * @param zoom object with integer zoom level 0-13
 * @param markers array of postion, content objects [{position: [0, 0] content: text or jsx}]
 *
 * */
export default function Map({ center, zoom, markers }) {
  const content = markers.map((item, idx) =>
    <Marker position={item.position}
            key={idx}
            eventHandlers={{
                mouseover: (e) => {
                    e.target.openPopup();
                },
                mouseout: (e) => {
                    e.target.closePopup();
                },
                click: (e) => {
                    console.log("marker clicked");
                }
        }}>
      <Popup>
        {item.content}
      </Popup>
    </Marker>)

  return (<MapContainer
    center={center}
    zoom={zoom}
    scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https:www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https:{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {content}
  </MapContainer>)
}
