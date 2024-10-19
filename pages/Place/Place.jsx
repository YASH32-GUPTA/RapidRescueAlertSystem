import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../component/header';
import './Place.css'; // Make sure to style the components if needed
import Level from '../../component/Slider';
import Button from '@mui/material/Button';

import {  useNavigate } from 'react-router-dom';


const Place = () => {
  const location = useLocation();
  const { place, clips } = location.state || {};

  console.log(clips) ;

  const navigate = useNavigate();

  function handleClick(placeName,detail,clip) {
    navigate('/sos', {
      state: {
        placeName: placeName,
        detail : detail , 
        clip: clip
      }
    });
  }

  const midIndex = Math.ceil(clips.length / 2);
  const clips4to5 = clips.slice(0, midIndex);  
  const clips5to6 = clips.slice(midIndex);     

  // Sample alerts
  let alerts = [95, 85, 60, 25];



  // State to manage visibility of levels
  const [showLevels4to5, setShowLevels4to5] = useState(false);
  const [showLevels5to6, setShowLevels5to6] = useState(false);

  // Effect to show levels after a 2-second delay
  useEffect(() => {
    const timer4to5 = setTimeout(() => setShowLevels4to5(true), 2000);
    const timer5to6 = setTimeout(() => setShowLevels5to6(true), 2000);

    // Clean up timers
    return () => {
      clearTimeout(timer4to5);
      clearTimeout(timer5to6);
    };
  }, []);

  return (
    <div className='main'>
      <header>
        <div className="headerBox">
          <Header/>
        </div>
        <div className="subHeader">
          <h1 className='font white size fontFive'>{place}</h1>
        </div>
      </header>

      <div className="clips-section ">
        <h1 className='font white fontFive'>5pm to 6pm</h1>
        <div className="clips-list">
          {clips4to5.map((clip, index) => (
            <div key={index} className="clip-item">
              <iframe
                src={clip.videoUrl}
                width="450"
                height="250"
                title={`Clip ${index}`}
                frameBorder="0"
              ></iframe>

              {showLevels4to5 && (
                <div className="level font white">
                  <div className="info">
                    <h1 className='font fontFive'>Violence Level</h1> 
                  </div>
                  <Level data={alerts[index]}/>
                   <Button 
                    variant="contained" color="error" className='btn font' 
                    onClick={(e)=>handleClick(place,clip.location,clip)}
                    >
                    <b>ALERT</b>
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="clips-section">
        <h1 className='font white fontFive'>4pm to 5pm</h1>
        <div className="clips-list">
          {clips5to6.map((clip, index) => (
            <div key={index} className="clip-item">
              <iframe
                src={clip.videoUrl}
                width="450"
                height="250"
                title={`Clip ${index + midIndex}`}
                frameBorder="0"
              ></iframe>

              {showLevels5to6 && (
                <div className="level font">
                  <div className="info">
                  <h1 className='font fontFive'>Violence Level</h1> 
                  </div>
                  <Level data={alerts[index + midIndex]}/>
                  <Button 
                    variant="contained" color="error" className='btn font' 
                    onClick={(e)=>handleClick(place,clip.location,clip)}
                    >
                    <b>ALERT</b>
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Place;
