import { createSlice } from "@reduxjs/toolkit";

let initialState = {
   duration : 0 , 
   data : {
    policeStation : 0 , 
    locationName : '' , 
   }
    
}


const helper =  createSlice({
    name  : 'helper' ,
    initialState , 
    reducers : {
        updateInformation : (state , action)=>{
            console.log("This is the redux : " , action.payload ) ;
            state.data.policeStation = action.payload.policeStation ; 
            state.data.locationName = action.payload.locationName ;
        },
        updateDuration : (state , action )=>{
            state.duration = action.payload ; 

        }
    }  
})


export const{updateDuration,updateInformation} = helper.actions ; 
export default helper.reducer ; 