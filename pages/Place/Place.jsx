import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../component/header';
import './Place.css'; // Make sure to style the components if needed

// component 
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Level from '../../component/Slider';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Place = () => {
  const location = useLocation();
  const { place, clips } = location.state || {};

  const [loading, setLoading] = useState(true);  // State to handle loading
  const navigate = useNavigate();

  // Ensure that clips are defined and loaded
  useEffect(() => {
    if (clips && clips.length > 0) {
      setLoading(false);  // Set loading to false once clips are available
    }
  }, [clips]);

  function handleClick(placeName, detail, clip) {
    navigate('/sos', {
      state: {
        placeName: placeName,
        detail: detail,
        clip: clip
      }
    });
  }

  const midIndex = Math.ceil(clips.length / 2);
  const clips4to5 = clips.slice(0, midIndex);  
  const clips5to6 = clips.slice(midIndex);     

  // Sample alerts
  let alerts = [95, 85, 96, 95,98];

  // No need for timeouts, show the levels immediately if clips are loaded
  const [showLevels, setShowLevels] = useState(false);

  // Effect to show levels immediately after data is loaded
  useEffect(() => {
    if (!loading) {
      setShowLevels(true);  // Show levels immediately when data is loaded
    }
  }, [loading]);

  // Display loading spinner or content based on loading state
  if (loading) {
    return <div className='loading'>Loading content, please wait...</div>;
  }

  return (
    <div className='main'>
      <header>
        <div className="headerBox">
          <Header />
        </div>
        <div className="subHeader">
          <h1 className='font white size fontFive'>{place}</h1>
        </div>
      </header>

      <div className="clips-section">
        <h1 className='font white fontFive'><AccessTimeIcon /> 5pm to 6pm</h1>
        <div className="clips-list">
          {clips4to5.map((clip, index) => (
            <div key={index} className="clip-item">
              <iframe
                src={clip.videoUrl}
                width="450"
                height="250"
                title={`Clip ${index}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>

              {showLevels && (
                <div className="level font white">
                  <div className="info">
                    <h1 className='font fontFive'>Violence Level</h1>
                  </div>
                  <Level data={alerts[index]} />
                  <Button
                    variant="contained" color="error" className='btn font'
                    onClick={(e) => handleClick(place, clip.location, clip)}
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
        <h1 className='font white fontFive'><AccessTimeIcon /> 4pm to 5pm</h1>
        <div className="clips-list">
          {clips5to6.map((clip, index) => (
            <div key={index} className="clip-item">
              <iframe
                src={clip.videoUrl}
                width="450"
                height="250"
                title={`Clip ${index + midIndex}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>

              {showLevels && (
                <div className="level font white">
                  <div className="info">
                    <h1 className='font fontFive'>Violence Level</h1>
                  </div>
                  <Level data={alerts[index + midIndex]} />
                  <Button
                    variant="contained" color="error" className='btn font'
                    onClick={(e) => handleClick(place, clip.location, clip)}
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
