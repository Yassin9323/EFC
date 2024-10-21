const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Feedback = require('./models/feedbackModel');
const Event = require('./models/eventModel');

dotenv.config({ path: './config.env' });

async function assignFeedbackToEvents() {
  try {
    const DB = process.env.DATABASE.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD,
    );
    mongoose.connect(DB).then(() => console.log('DB connection successful!'));

    const feedbacks = await Feedback.find();

    feedbacks.forEach(({ eventId, _id }) => {
      console.log(`Updating Event: ${eventId} with Feedback: ${_id}`);
    });

    const updateFeedbackPromises = feedbacks.map(({ eventId, _id }) =>
      Event.findByIdAndUpdate(eventId, {
        $addToSet: { feedback: _id }, // Prevent duplicates
      }),
    );

    await Promise.all(updateFeedbackPromises);

    console.log('Feedback successfully assigned to events');
  } catch (err) {
    console.log('Error while assigning feedback:', err);
  } finally {
    // Close the connection after the operation
    await mongoose.connection.close();
  }
}
// Run the function
assignFeedbackToEvents();
