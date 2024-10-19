import React, { useState, useEffect } from 'react';
import Header from '../../component/header';
import { videoLinksOne , videoLinksTwo , videoLinksThree , videoLinksFour } from '../../Database/customVideo';
import Footage from '../../component/Footage';
import './HomeScreen.css';



const HomeScreen = () => {
  const [isMaximized, setIsMaximized] = useState(false);

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
    <div className={`main font white ${isMaximized ? 'maximized' : ''}`}>
      <header>
        <div className="headerBox">
          {!isMaximized ?  <Header /> : null }
        </div>
        <div className="subHeader">
          <h1 style={{fontWeight : 400 }}className="font size">Surveillance Footage</h1>
        </div>
      </header>

      {!isMaximized && (
        <div className="subInfo font">
          <div className="infoBox">
            <p className='fontThree'>Total Camera : 4</p>
          </div>
          <div className="infoBox">
            <p className='fontThree'>Active Camera : 4</p>
          </div>
          <div className="infoBox">
            <p className='fontThree'>Active Member : 2</p>
          </div>
        </div>
      )}

      <div className={`videoGrid ${isMaximized ? 'maximized-grid' : ''}`}>
        <div className="videoBox">
          <Footage placeName={'PLACE A'} clips={videoLinksOne} criticalViolenceCount={0} isMax = {isMaximized} />
          <Footage placeName={'PLACE B'} clips={videoLinksTwo} criticalViolenceCount={1} isMax = {isMaximized} />
          <Footage placeName={'PLACE C'} clips={videoLinksThree} criticalViolenceCount={1} isMax = {isMaximized}/>
          <Footage placeName={'PLACE D'} clips={videoLinksFour} criticalViolenceCount={1} isMax = {isMaximized}/>
        </div>
      </div>


    </div>
    
  );
};

export default HomeScreen;
