import React from 'react'
import './SelectedPlace.css'
import { useSelector } from 'react-redux'
import Gmail from '../../component/Gmail';

const SelectedPlace = ({lat , lng }) => {

  let newDuration = useSelector((state) => state.helper.duration ) ;
  let placeInfo = useSelector((state) => state.helper.data) ;
  return (
    <div className='deck'>
         <div className="leftSide">
              <h2 className='font white'>Total Number Of Station's Detected</h2>
              <p className='number font white '>{placeInfo ? placeInfo.policeStation : 0 }</p>
         </div>


         <div className="verticalLine"></div>

         <div className="rightSide white">
             <h2>Selected Police Station</h2> 

             <div className="completeInfo">

                {
                    ( newDuration != 0  ) ? 
                    <>
                      <div className="placeInfo">
                        <p className='modifyText font white fontFive'>{placeInfo.locationName}</p>
                      </div>

                      <div className="time">
                        <p className='modifyText font white fontFive'>{newDuration}</p>
                      </div>
                    </>
                    :
                    null
                }

             </div>
         </div>

         <div className="verticalLine"></div>

         <div className="rightEmail font white">
                <Gmail lat = {lat} lng = {lng} />
        </div>
    </div>
  )
}

export default SelectedPlace