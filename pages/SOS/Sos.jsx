import React from 'react';
import Header from '../../component/header';
import { useLocation } from 'react-router-dom';
import './Sos.css';
import { Map } from './Map';
import './Map.css';
import SelectedPlace from './SelectedPlace';

// icons 
import ExploreIcon from '@mui/icons-material/Explore';

const Sos = () => {
  const location = useLocation();
  const { placeName, detail, clip } = location.state || {};

  return (
    <div className="main font">
       <div className="headerBox">
          <Header/>
        </div>

      <div className="subHeader detailAlert">
        <h1 className="font size fontFive" style={{ color: '#f43334' }}>
          ALERT
        </h1>
      </div>

      <div className="placeInfo font white fontFive">
        <h2 className='fontFive'>Place Name  : &nbsp;{placeName}</h2>
        <h2 className='fontFive'>Latitude :&nbsp;{detail.lat}</h2>
        <h2 className='fontFive'>Longitude :&nbsp;{detail.lng}</h2>
        <h2 className='fontFive'>TimeStamp :&nbsp;{clip.timestamp}</h2>
      </div>

      <hr />

      {/* Map */}
      <div className="customSpace"> 
        <div className="icon"><ExploreIcon className='white iconExplore'/></div>
        <h2 className='font white fontFive'>Location</h2>
      </div>

      <div className="mapBox">
        <Map latitude={detail.lat} longitude={detail.lng} />
      </div>
        {/* Information About Selected Palces  */}
      <div className="mapSubInfo">  <SelectedPlace lat = {detail.lat} lng = {detail.lng} /> </div>

      <hr className="space spaceThree" />

      <div className="customSpace">
         <h2 className='font white fontFive'>Video</h2>
      </div>

      {/* Video */}
      <div className="detailBox placeInfo space">
        <iframe
          src={clip.videoUrl}
          width="750"
          height="480"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Sos;
