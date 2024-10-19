import axios from 'axios';

async function ReadData() {
  try {
    console.log('Fetching data from server...');
    
    const response = await axios.get('http://localhost:3000/getData');

    // Assuming the response is an array of objects with name and data
    const videoData = response.data.map(video => ({
      name: video.name,
      data: video.data // Extract the parsed JSON data
    }));

    console.log("Fetched video data:\n", videoData);
    return videoData; // Return the video data array
  } catch (err) {
    console.error("Error while reading video data:", err);
    return []; // Return an empty array on error
  }
}


export { ReadData };
