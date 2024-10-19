import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const Level = ({data}) => {

  console.log(data);
  // State to hold the slider value
  const [value, setValue] = useState(data); // Set default value if needed

  // Function to format value text
  const valuetext = (value) => `${value}`;

  return (
    <Box sx={{ width: 350 }}> {/* Increased width for a larger slider */}
      <Slider
        aria-label="Level"
        value={value}
        getAriaValueText={valuetext}
        color="error"
        sx={{
          '& .MuiSlider-thumb': {
            width: 20, // Increased size of the slider thumb
            height: 20, // Increased size of the slider thumb
            pointerEvents: 'none', // Prevent the thumb from being movable
            backgroundColor: '#FFF', // Ensure the thumb is visible
            opacity: 1, // Ensure the thumb is fully visible
          },
          '& .MuiSlider-track': {
            height: 8, // Increased height of the slider track
            border: 'none',
            backgroundColor: 'transparent', // Transparent track background
          },
          '& .MuiSlider-rail': {
            height: 8, // Increased height of the slider rail
            background: 'linear-gradient(to right, green 20%, yellow 30%, yellow 60%, red 70%)', // Gradient for the rail
            opacity: 1, // Ensure the rail is fully visible
          },
        }}
        disabled // Disable the slider to prevent movement
      />
    </Box>
  );
}

export default Level;
