import { PubSub } from '@google-cloud/pubsub';  // Importing PubSub

(async () => {
  // Dynamically import fetchData from customVideo.js
  const { fetchData } = await import('../Database/customVideo.js');  
  
  async function listenForMessages(subscriptionName) {
    const pubsub = new PubSub();
    const subscription = pubsub.subscription(subscriptionName);

    // Listen for new messages
    subscription.on('message', async (message) => {
      console.log(`\nReceived message:\n`);
      console.log(`Data: ${message.data.toString()}`);
      console.log(`Attributes: ${JSON.stringify(message.attributes)}`);

      try {
        console.log("Calling fetchData...");
        
        // Call the fetchData function
        await fetchData();

        // Acknowledge the message
        message.ack();
        console.log('Message acknowledged.\n');
      } catch (error) {
        console.error('Error processing message:', error);
      }
    });

    subscription.on('error', (error) => {
      console.error('Received error:', error);
    });

    console.log(`Listening for messages on ${subscriptionName}...\n`);
  }

  // Replace with your actual subscription name
  const subscriptionName = 'projects/violence-detection-backend/subscriptions/storage-upload-topic-sub';
  listenForMessages(subscriptionName).catch(console.error);

})();
