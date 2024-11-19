import React, { useState, useEffect } from 'react';
import Header from '../../component/header';
import { videoLinksOne , videoLinksTwo , videoLinksThree , videoLinksFour } from '../../Database/customVideo';
import Footage from '../../component/Footage';
import './HomeScreen.css';

// component 
import Button from '@mui/material/Button';




const HomeScreen = () => {
  const [isMaximized, setIsMaximized] = useState(true);

  console.log("re-render")

  // Keyboard event listener for Ctrl+M and Ctrl+B
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'm') {
        setIsMaximized(true); // Maximize view
      }
      if (e.ctrlKey && e.key === 'b') {
        setIsMaximized(false); // Return to normal view
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress); // Cleanup listener
  }, []);

  return (
    <div  className={`main font white ${isMaximized ? 'maximized' : ''}`}>
      <header>
        <div className="headerBox">
          {!isMaximized ?  <Header /> : null }
        </div>
        <div className="subHeader">
          <h1 style={{fontWeight : 400 , fontSize : '2.7rem' }}className="font size">Surveillance Footage</h1>
        </div>
      </header>

      {!isMaximized && (
        <div className="subInfo font">
          <div className="infoBox">
            <p className='fontThree'><Button variant="outlined">Total Camera  &nbsp;<b>:</b>&nbsp;&nbsp;4</Button></p>
          </div>
          <div className="infoBox">
            <p className='fontThree'><Button variant="outlined">Active Camera  &nbsp;<b>:</b>&nbsp;&nbsp;4</Button></p>
          </div>
          <div className="infoBox">
            <p className='fontThree'><Button variant="outlined">Active Member  &nbsp;<b>:</b>&nbsp;&nbsp;2</Button></p>
          </div>
        </div>
      )}

      <div className={`videoGrid ${isMaximized ? 'maximized-grid' : ''}`}>
        <div className="videoBox">
          <Footage placeName={'CAMERA  1'} clips={videoLinksOne} criticalViolenceCount={4} isMax = {isMaximized} />
          <Footage placeName={'CAMERA  2'} clips={videoLinksTwo} criticalViolenceCount={4} isMax = {isMaximized} />
          <Footage placeName={'CAMERA  3'} clips={videoLinksThree} criticalViolenceCount={2} isMax = {isMaximized}/>
          <Footage placeName={'CAMERA  4'} clips={videoLinksFour} criticalViolenceCount={3} isMax = {isMaximized}/>
        </div>
      </div>


    </div>
    
  );
};

export default HomeScreen;
