const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');

// Initialize the Slack API client
const slackToken = 'YOUR_SLACK_TOKEN'; // Replace with your bot token
const webClient = new WebClient(slackToken);

// Initialize the Slack Events Adapter
const slackEvents = createEventAdapter('YOUR_SIGNING_SECRET'); // Replace with your signing secret

// Listen for the 'message' event
slackEvents.on('message', async (event) => {
  try {
    // Check if the event is a user message
    if (event.type === 'message' && !event.subtype && event.user) {
      // Get the user's message text
      const userMessage = event.text;

      // Call your AI service or API to generate a response based on the user's message
      const aiResponse = await generateAIResponse(userMessage);

      // Post the AI-generated response to the same channel
      await webClient.chat.postMessage({
        channel: event.channel,
        text: aiResponse,
      });
    }
  } catch (error) {
    console.error('Error handling message:', error);
  }
});

// Start the server and listen for incoming events
const port = 3000; // Replace with your desired port
slackEvents.start(port).then(() => {
  console.log(`Bot is listening on port ${port}`);
});

// Function to generate AI response (using a placeholder example)
async function generateAIResponse(userMessage) {
  // Make API calls or use an AI library to generate a response based on the user's message
  // Here's a placeholder response for demonstration purposes
  return `You said: "${userMessage}". I am an AI bot!`;
}
