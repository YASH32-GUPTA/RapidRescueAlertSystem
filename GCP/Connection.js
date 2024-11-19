import express from 'express'; // Import express
import multer from 'multer';   // Import multer
import { Storage } from '@google-cloud/storage'; // Import Storage from Google Cloud Storage


const app = express();
const storage = new Storage({ keyFilename: 'key.json' });
const bucketName = 'violence-data';
const bucket = storage.bucket(bucketName);

const upload = multer();  // Multer handles multipart form data

import cors from 'cors'; // Correct way to import cors
app.use(cors());


app.post('/upload', upload.single('video'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const blob = bucket.file(Date.now() + '-' + req.file.originalname);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobStream.on('error', (err) => {
    res.status(500).send({ message: err.message });
  });

  blobStream.on('finish', () => {
    res.status(200).send({ message: 'File uploaded successfully!' });
  });

  blobStream.end(req.file.buffer);
});


app.get('/getData', async (req, res) => {
  try {
      console.log("Fetching data from violence-data-information bucket...");
      
      const infoBucketName = 'violence-data-information'; // New bucket name
      const infoBucket = storage.bucket(infoBucketName);
      
      // Get all files from the bucket
      const [files] = await infoBucket.getFiles();
      
      // Create an array to hold the file details
      const fileDetails = await Promise.all(
          files.map(async (file) => {
              // Only process JSON files
              if (file.name.endsWith('.json')) {
                  const [contents] = await file.download(); // Download the JSON file
                  const jsonData = JSON.parse(contents.toString()); // Parse the JSON data

                  return {
                      name: file.name, // File name
                      data: jsonData,   // Parsed JSON data
                  };
              }
          })
      );

      // Filter out any undefined values (non-JSON files)
      const validFileDetails = fileDetails.filter(file => file !== undefined);
      
      // Send the file details as a JSON response
      res.json(validFileDetails);
  } catch (error) {
      console.error("Error fetching JSON data from bucket:\n", error);
      res.status(500).send('Error fetching JSON data from bucket');
  }
});


app.listen(3000, () => console.log('Server started on port 3000'));
