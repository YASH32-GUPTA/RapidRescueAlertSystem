import { useState } from 'react';
import axios from 'axios';  // Import axios

function VideoUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a video file");
      return;
    }

    const formData = new FormData();
    formData.append('video', selectedFile);  // The key must match `upload.single('video')` on the server

    setUploading(true);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(response.data.message);
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("An error occurred while uploading the video.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Video:
        <input type="file" accept="video/*" onChange={handleFileChange} />
      </label>
      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Video'}
      </button>
    </form>
  );
}

export default VideoUploadForm;
