import { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import ResetViewControl from '@20tab/react-leaflet-resetview';
import PlaceAdder, { LocationMarkers } from '../components/PlaceAdder.js';

/**
 * @param center object with lat, lon array {[0, 0]}
 * @param zoom object with integer zoom level 0-13
 * @param markers array of postion, content objects [{position: [0, 0] content: text or jsx}]
 *
 * */

function Markers({ markers, clickFn }) {
  const leafletMap = useMap();
  return (
    markers.map((item, idx) =>
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
            clickFn(item.data);
            leafletMap.setView(item.position, 13);
          }
        }}>
        <Popup>
          {item.content}
        </Popup>
      </Marker>))
}

export default function Map({ markers, clickFn, location, setLocation }) {
  const [leafletMap, setLeafletMap] = useState(null);
  const center = [0, 0]
  const zoom = 1
  let activeUser = sessionStorage.getItem('active user')

  return (<MapContainer
    center={center}
    zoom={zoom}
    scrollWheelZoom={false}
    whenCreated={setLeafletMap}>
    <TileLayer
      attribution='&copy; <a href="https:www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https:{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <ResetViewControl
      title="Reset view"
      icon="&#x21ba"
    />

    <Markers markers={markers} clickFn={clickFn} />

    {activeUser || activeUser !== ''
      ? <></>
      : <LocationMarkers location={location} setLocation={setLocation} />}
  </MapContainer>)
}
