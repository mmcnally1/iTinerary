import React, { useEffect, useState, useContext } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { Previews, Dropzone } from './Dropzone.js'

export function LocationMarkers({ location, setLocation }) {
  //const { location, setLocation } = useContext(LocationContext);

  const map = useMapEvents({
    click(e) {
      setLocation(e.latlng)
      map.flyTo(e.latlng, 9)
      console.log(e.latlng)
    },
  })

  return location === null ? null : (
    <Marker position={location}>
      <Popup>{location}</Popup>
    </Marker>
  )
}

export default function PlaceAdder({ location, setLocation, places, setPlaces }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState([])
  const handleSubmit = (e) => {
    e.preventDefault()
    if (name === '' || description === '') {
      alert("Please fill all fields and select a location for this entry.")
      return
    }
    let trip = JSON.parse(sessionStorage.getItem("trip"))
    let place = new Object()
    place.id = crypto.randomUUID()
    place.location = location
    place.name = name
    place.description = description
    place.files = files

    let places = [...trip.data.places, place]
    trip.data.places = places
    sessionStorage.setItem("trip", JSON.stringify(trip))
    setPlaces([...places, place])
    setName('')
    setDescription('')
    setFiles([])
    console.log(JSON.parse(sessionStorage.getItem("trip")))
  }

  return (
    <div>
      Location [{location && location.lat.toFixed(3)}, {location && location.lng.toFixed(3)}]
      <br />
      <label>
        Name <br />
        <input type="text"
          value={name}
          onChange={e => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Description <br />
        <textarea
          value={description}
          placeholder={'Enter a description for this point of interest. '}
          rows="10"
          cols="50"
          onChange={e => setDescription(e.target.value)} />
      </label>
      <br />
      <Previews files={files} setFiles={setFiles} />
      <input type="submit" value="Add Location" onClick={handleSubmit} disabled={name.length === 0 || description.length === 0} />
    </div>
  );
}
