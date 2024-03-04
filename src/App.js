import './App.css';
import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  const [city, setCity] = useState(null);
  const [err, setErr] = useState(false);
  const [location, setLocation] = useState({
    lat: 27.0449,
    lon: 84.8672
  });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((location) => {
        setLocation(preValue => {
          return {
            lat: location.coords.latitude,
            lon: location.coords.longitude
          }
        })
      }, (err) => {
        console.log(err);
      })
    }
  }, []);


  function MyMapComponent() {
    const map = useMap();
    map.setView([location.lat, location.lon], map.getZoom());
    return null;
  }

  function handleChange(e) {
    setCity(e.target.value);
  };

  function handleOff(){
    setErr(false);
  }

  async function handleClick() {
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_API_KEY}`);
    if(response.data[0]!==undefined){
      const {lat,lon} = response.data[0];
      if(lat!==undefined||lon!==undefined){
        setLocation(preValue=>({
          lat:lat,
          lon: lon
        }));
      }
    }else{
      setErr(true);
    }

  }

  const customIcon = new Icon({
    iconUrl: require('./marker.png'),
    iconSize: [38, 38]
  });
  return (
    <div className="App">
      <div className="mockup-phone">
        <div className="camera"></div>
        <div className="display">
          <div className="artboard artboard-demo phone-1">

            <div className='form'>
              <input
                type='text'
                placeholder='City name'
                onChange={handleChange}
              />
              <button onClick={handleClick}>Search</button>
            </div>

            <div className='error-pop' style={{display:err ? 'flex' : 'none'}} >
              <h1>Error : Invalid City Name</h1>
              <button onClick={handleOff}>X</button>
            </div>

            <MapContainer center={[location.lat, location.lon]} zoom={13} >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

              />
              <MyMapComponent />
              <Marker position={[location.lat, location.lon]} icon={customIcon} ></Marker>

            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
