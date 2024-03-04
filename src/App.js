import './App.css';
import { MapContainer, TileLayer, useMap,Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useEffect, useState } from 'react';
function App() {

  const [location, setLocation] = useState({
    lat:27.0449,
    lon:84.8672
  });

  useEffect(()=>{
    if('geolocation' in navigator){
      navigator.geolocation.watchPosition((location)=>{
        setLocation(preValue=>{
          return {
            lat: location.coords.latitude,
            lon: location.coords.longitude
          }
        })
      },(err)=>{
        console.log(err);
      })
    }
  },[]);

  const stations = [
    {
      name: 'Birgunj',
      lat:27.024131364592986,
      lon:84.88172840787506
    },
    {
      name: 'Simra',
      lat:27.156149550010298, 
      lon:84.97527096441785,
    }
  ];

  function MyMapComponent() {
    const map = useMap();
    map.setView([location.lat, location.lon], map.getZoom());
    return null;
  }

  function handleChange(e){
    stations.forEach((station)=>{
      if(station.name===e.target.value){
        setLocation(preValue=>{
          return {
            lat: station.lat,
            lon: station.lon
          }
        });
      }
    });
  };



  // const markers = [
  //   {
  //     geocode: [location.lat,location.lon],
  //     popUp: 'Brigunj'
  //   }
  // ];

  const customIcon = new Icon({
     iconUrl : require('./marker.png'),
     iconSize:[38,38]
  });
  return (
    <div className="App">
      <div className="mockup-phone">
        <div className="camera"></div>
        <div className="display">
          <div className="artboard artboard-demo phone-1">
          <select className='dropdown-content' onChange={handleChange}>
            <option>Birgunj</option>
            <option>Simra</option>
          </select>
            <MapContainer center={[location.lat, location.lon]} zoom={13} >
              <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 
                 />
                <MyMapComponent />
                <Marker position={[location.lat,location.lon]} icon={customIcon} ></Marker>

            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
