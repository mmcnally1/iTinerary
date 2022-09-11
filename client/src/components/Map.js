import { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import ResetViewControl from '@20tab/react-leaflet-resetview';
import { LocationContext } from '../pages/UserPage.js';
import PlaceAdder, { LocationMarkers } from '../components/PlaceAdder.js';
// export function LocationMarkers() {
//   const { location, setLocation } = useContext(LocationContext);
//   const map = useMapEvents({
//     click(e) {
//       //setPosition(e.latlng)
//       setLocation(e.latlng)
//       map.flyTo(e.latlng, 10)
//       console.log(e.latlng)
//     },
//   })

//   return location === null ? null : (
//     <Marker position={location}>
//       <Popup>{location}</Popup>
//     </Marker>
//   )

// const map = useMapEvents({
//   click(e) {
//     map.locate()
//   },
//   locationfound(e) {
//     console.log(e.latlng)
//     setLocation(e.latlng)
//     map.flyTo(e.latlng, 10)
//     //markers.push(e.latlng);
//     setMarkers((prev) => [...prev, e.latlng])
//   }
// })

// return (
//   <>
//     {Object.values(markers).map(marker => <Markers markers={marker} clickFn={clickFn} />)}

//     {/* {Object.entries(markers).map(([k, marker], i) => { */}
//     {/*   <Marker key={i} position={marker} /> */}
//     {/* })} */}
//   </>)
//}


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
    <LocationMarkers location={location} setLocation={setLocation} />
  </MapContainer>)
}
