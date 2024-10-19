const fs = require('fs');
const path = require('path');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({ keyFilename: 'key.json' });

const videoBucketName = 'violence-data'; // Bucket for videos
const infoBucketName = 'violence-data-information'; // Bucket for info
const videoDirectory = 'C:/Users/YashGupta/OneDrive/Desktop/U-HACK/sih/Database/Videos'; // Path to your video folder

// Predefined custom data array
const customDataArray = [
  { place: 'Place A', location: { lat: 12.9716, lng: 77.5946 }, timestamp: '13:00 - 14:00', videoUrl: '' },
  { place: 'Place B', location: { lat: 13.0827, lng: 80.2707 }, timestamp: '13:00 - 14:00', videoUrl: '' },
  { place: 'Place C', location: { lat: 17.3850, lng: 78.4867 }, timestamp: '15:00 - 16:00', videoUrl: '' },
  { place: 'Place D', location: { lat: 19.0760, lng: 72.8777 }, timestamp: '16:00 - 17:00', videoUrl: '' }
];

async function uploadVideosAndCreateObjects() {
  try {
    // Fetch all video files from the specified folder
    const videoFiles = fs.readdirSync(videoDirectory).filter(file => file.endsWith('.webm'));
    
    // Loop through each video file
    for (const videoFile of videoFiles) {
      const videoPath = path.join(videoDirectory, videoFile);
      
      // Upload video to the video bucket
      const videoBucket = storage.bucket(videoBucketName);
      const videoBlob = videoBucket.file(videoFile); // Store directly in the root of the bucket

      // Upload the video
      await new Promise((resolve, reject) => {
        const blobStream = videoBlob.createWriteStream({
          metadata: {
            contentType: 'video/webm',
          },
        });

        blobStream.on('error', err => reject(err));
        blobStream.on('finish', () => {
          console.log(`${videoFile} uploaded successfully!`);
          resolve();
        });

        fs.createReadStream(videoPath).pipe(blobStream);
      });

      // Fetch URL of the uploaded video
      const videoUrl = `https://storage.googleapis.com/${videoBucketName}/${videoFile}`; // Corrected URL without /videos/
      
      // Randomly assign a custom data object to the video
      const randomIndex = Math.floor(Math.random() * customDataArray.length);
      const customData = { ...customDataArray[randomIndex], videoUrl }; // Include the video URL
      
      // Upload the custom object as a JSON file to the info bucket
      const infoBucket = storage.bucket(infoBucketName);
      const infoBlob = infoBucket.file(`${videoFile}.json`); // Store JSON directly under the root

      await infoBlob.save(JSON.stringify(customData), {
        contentType: 'application/json',
      });

      console.log(`Custom data for ${videoFile} uploaded successfully!`);
    }

    console.log('All videos and custom objects have been processed.');
  } catch (error) {
    console.error('Error uploading videos and creating objects:', error);
  }
}

// Call the function to execute
uploadVideosAndCreateObjects();
