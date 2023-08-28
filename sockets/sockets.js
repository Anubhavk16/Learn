


const Notification = require('../models/notification');
const collection = require('../models/users');
const Products = require('../models/products'); 

module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('addToCartNotification', async ({ email, title }) => {
      console.log('addToCartNotification received', title);

      

        const notificationMessage = `${title} has been added to your cart.`;

        io.emit('notification', notificationMessage);

        try {
          const user = await collection.findOne({ email: email });
          if (!user) {
            console.log('User not found for userEmail:', email);
            return;
          }

          const notification = new Notification({
            user: user._id,
            message: notificationMessage
          });

          await notification.save();

          console.log('Notification saved to MongoDB');
        } catch (error) {
          console.error('Error saving notification to MongoDB:', error);
        }
    
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};
