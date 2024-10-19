import React, { useState, useEffect, useRef } from 'react';
import './Footage.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Footage = ({ placeName, clips, criticalViolenceCount, isMax }) => {
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  function handleClick(place, clips) {
    navigate('/place', {
      state: {
        place: place,
        clips: clips,
      },
    });
  }

  useEffect(() => {
    const video = videoRef.current;

    if (clips.length > 0) {
      const currentClip = clips[currentClipIndex]; // Current video data object
      const webmUrl = currentClip.videoUrl; // Extract videoUrl from the data


      if (typeof webmUrl === 'string' && webmUrl.trim()) {
        video.src = webmUrl; // Set the video source to the current clip
        video.load(); // Load the video

        // Wait for the video to load and then play
        video.oncanplay = async () => {
          try {
            if (video.paused || video.ended) {
              await video.play(); // Play the video
            }
          } catch (error) {
            console.error("Error playing video:", error);
          }
        };

        // Listen for the 'ended' event to change the video
        video.onended = () => {
          setCurrentClipIndex((prevIndex) => (prevIndex + 1) % clips.length); // Move to the next clip
        };
      } else {
        console.error('Invalid WebM URL:', webmUrl);
      }
    }

    return () => {
      if (video && video.src) {
        video.pause(); // Pause the video on unmount
      }
    };
  }, [currentClipIndex, clips]);

  return (
    <div className={`footage font ${isMax ? '' : 'makeCenter'}`}>
      {!isMax && <h2>{placeName}</h2>}
      <video
        ref={videoRef}
        className="footage-video"
        autoPlay 
        muted
        title={placeName}
        style={{ backgroundColor: '#000' }} // Background color to prevent flash of unstyled content
      />
      {!isMax && (
        <div className="footage-attributes lowerBox">
          <b>
            <p className='font fontThree'>Total Clips: {clips.length}</p>
          </b>
          <b>
            <p className='font ' style={{ color: criticalViolenceCount !== 0 ? 'red' : 'green' }}>
              Critical Violence: {criticalViolenceCount}
            </p>
          </b>
          <Button variant="outlined" color="error" onClick={() => handleClick(placeName, clips)}>
            Inspect
          </Button>
        </div>
      )}
    </div>
  );
};

export default Footage;
