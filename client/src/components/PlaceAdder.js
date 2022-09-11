import React, { useEffect, useState, useContext } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { useDropzone } from 'react-dropzone';
import { postTrip } from '../fetcher.js';

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
  // const onFinish = (values) => {
  //     values.username = props.username;
  //     postTrip(values).then(() => {
  //         props.displayMarkers();
  //     });

  // }
  //const { location, setLocation } = useContext(LocationContext);
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
  }

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div key={file.name}>
      <div>
        <img
          src={file.preview}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);


  return (
    <form>
      Location [{location && location.lat.toFixed(3)}, {location && location.lng.toFixed(3)}]
      <br />
      <label>
        Name <br />
        <input type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required />
      </label>
      <br />
      <label>
        Description <br />
        <textarea
          value={description}
          placeholder={'Enter a description for this point of interest. '}
          rows="10"
          cols="50"
          onChange={e => setDescription(e.target.value)}
          required />
      </label>
      <br />
      <section className="container">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag and drop photos here, or click to select files</p>
        </div>
        <aside>
          {thumbs}
        </aside>
      </section>
      <input type="submit" value="Add Location" onClick={handleSubmit} />
    </form>
  );
}
