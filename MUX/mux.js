import axios from 'axios' ;

// Mux API credentials (replace with your own)
const MUX_ACCESS_TOKEN = '7a38dd52-b6e5-4fb4-ae81-de0718449d1d';
const MUX_SECRET_KEY = 'P8tFZO8svSl5YCXdFV5XNFhQiIjFO0d+cOlPbLG5yqlnbAWLvFx17fmgUdowfdEA/sY6SlSmBd0';

// Create axios instance with authentication
const muxApi = axios.create({
  baseURL: 'https://api.mux.com',
  auth: {
    username: MUX_ACCESS_TOKEN,
    password: MUX_SECRET_KEY,
  },
});

// Function to fetch all Mux assets and filter for HLS support
async function fetchMuxAssets() {
  try {
    // Fetch the assets from Mux
    const response = await muxApi.get('/video/v1/assets');
    const assets = response.data.data;

    // Filter assets that support HLS
    const hlsAssets = assets.filter(asset => asset.playback_ids && asset.playback_ids.length > 0);

    // Create an array of HLS URLs
    const hlsUrls = hlsAssets.map(asset => ({
      id: asset.id,
      status: asset.status,
      hlsUrl: `https://stream.mux.com/${asset.playback_ids[0].id}.m3u8`,
    }));

    // Export the array of HLS URLs
    return hlsUrls;
  } catch (error) {
    console.error('Error fetching Mux assets:', error);
    return [];
  }
}



export {fetchMuxAssets} ;