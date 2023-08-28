
const { ObjectId } = require('mongodb');

const collection = require("../models/users");
const jwt = require('jsonwebtoken');
const authenticateUser = require('../middleware/authentication');


JWT_SECRET="1234"

const bcrypt = require('bcrypt');

const collectionController = {

  async checkData(req, res) {
    const { email, password } = req.body;
    try {
      const check = await collection.findOne({ email: email });
      console.log(check,"sasasasa")
      if (check) {
        const isPasswordCorrect = await bcrypt.compare(password, check.password);
        if (isPasswordCorrect) {
          // Generate a JWT token with the user's ID included in the payload
          const token = jwt.sign({ userId: check._id, email: check.email }, JWT_SECRET, {
            expiresIn: '1h' // Token expires in 1 hour
          });
          
          // Send the token as a response
          res.json({ status: 'matched', token: token , role:check.role,email,password});
        } else {
          res.json({ status: 'not matched' });
        }
      } else {
        res.json({ status: 'notexist' });
      }
    } catch (e) {
      res.json({ status: 'fail' });
    }
  
  },
  async signup(req, res) {
    const { email, password, role} = req.body;
    try {
      const check = await collection.findOne({ email: email });

      if (check) {
        res.json("exist");
      } else {
        // Hash the password before storing it in the database
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
  
        const data = {
          email: email,
          password: hashedPassword,
          role:role
        };
        res.json("notexist");
        await collection.insertMany([data]);
      }
    } catch (e) {
      res.json("fail");
    }
  }, 
 

  
  
  
};

module.exports = collectionController;

  
  

  

  

  
  

  
