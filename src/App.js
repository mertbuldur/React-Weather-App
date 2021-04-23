import React , { useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';



function App(){
  const [loading,setLoading] = useState(true)
  const [coords,setCoords] = useState(null);
  const [current,setCurrent] = useState({ 
    icon:'',
    temp:''
  });
  const [location,setLocation] = useState({
    city:'',
    country:'',
    localtime:''
  });


  const getGeolocation = () => {
    setLoading(true);
    if(!navigator.geolocation){ 
      alert("geolocation aktif degil");
    }
    else {
      navigator.geolocation.getCurrentPosition((position) => { 
        setCoords(`${position.coords.latitude},${position.coords.longitude}`)
      })
    }
  };

  useEffect(() => { 
    setLoading(true);
    const apiURL = `http://api.weatherapi.com/v1/current.json?key=0d9ff353bc474ec9b5191551212304&q=36.845168799999996,28.7632145&aqi=no`;
    fetch(apiURL).then(res =>  res.json()).then((data) => { 
      setCurrent({
        icon:data.current.condition.icon,
        temp:data.current.temp_c
      });
      setLocation({ 
        country:data.location.country,
        city:data.location.region,
        localtime:data.location.localtime
      });
      setLoading(false)
    })
  },[coords])



  return (
    <div className="App">  
      <button className="button" onClick={getGeolocation}>Hava Durumunu Göster</button>
      {!loading  && 
      <div>
        <div className="weather">
          <img src={current.icon} />
          <span>{current.temp}</span>
        </div>
        <div className="location">
        <div>
          <span>{location.city}</span> / <span>{location.country}</span>
        </div>
        <div>
          <span className="time">{location.localtime}</span>
        </div>
      </div>
      </div>
      }
      {loading && <div className="loading"><span>Veriler Yükleniyor</span></div>}
    </div>
  );
}

export default App;
