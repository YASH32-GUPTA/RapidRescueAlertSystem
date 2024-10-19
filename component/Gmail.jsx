import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';

// Form components
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

let initialFormData = {
    to_email: '', 
};

function Gmail({ lat, lng }) {
    const ref = useRef(); // Reference to the form
    const [formData, setFormData] = useState(initialFormData);
    const [status, setStatus] = useState(""); // State for tracking the status of the email

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const sendEmail = (e) => {
        e.preventDefault();

        // Construct the Google Maps URL
        const googleMapUrl = `https://www.google.com/maps?q=${lat},${lng}`;

        // Create the email data
        const emailData = {
            to_email: formData.to_email, // User email
            message: `Location URL: ${googleMapUrl}` // Custom message with location
        };

        // Update the status to processing
        setStatus("Processing...");

        emailjs
          .send(
            'violence-alert-system', // Service ID
            'template_a4979tu',      // Template ID
            emailData,               // Email data
            'guiWBCE0WbMLjPCUH'      // User ID (API Key)
          )
          .then(
            () => {
              setStatus("SUCCESS!"); // Update status on success
              // Reset form data
              setFormData(initialFormData);
            },
            (error) => {
              setStatus("FAILED..."); // Update status on failure
              console.error('EmailJS send failed:', error);
            }
          );
    };

    return (
        <div>
            <form onSubmit={sendEmail} ref={ref} className="formBody">
                <Button 
                    type="submit" 
                    variant="outlined" 
                    color="error" 
                    style={{ marginTop: '20px' }}
                >
                    Send Alert
                </Button>
                <TextField
                    label="Email"
                    className="email"
                    name="to_email"
                    variant="outlined"
                    type="email"
                    value={formData.to_email}
                    onChange={handleChange}
                    required
                    InputProps={{ style: { fontSize: 18, padding: '12px' } }}
                />
            </form>
            {status && (
                <div>
                    <h2>{status}</h2>
                    {status === "SUCCESS!" && <Button onClick={() => setStatus("")}>Close</Button>}
                </div>
            )}
        </div>
    );
}

export default Gmail;
