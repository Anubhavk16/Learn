
const { ObjectId } = require('mongodb');

const collection = require("../models/users");
const jwt = require('jsonwebtoken');
const authenticateUser = require('../middleware/authentication');

JWT_SECRET="1234"

const bcrypt = require('bcrypt');

const collectionController = {
  async getData(req, res) {
    try {
      const data = await collection.find();
      res.json(data);
    } catch (error) {
      console.log(`Could not fetch data: ${error}`);
      res.json({ error: "Failed to fetch data" });
    }
  },
  async checkData(req, res) {
    const { email, password } = req.body;
    try {
      const check = await collection.findOne({ email: email });

      if (check) {
        const isPasswordCorrect = await bcrypt.compare(password, check.password);
        if (isPasswordCorrect) {
          // Generate a JWT token with the user's ID included in the payload
          const token = jwt.sign({ userId: check._id, email: check.email }, JWT_SECRET, {
            expiresIn: '1h' // Token expires in 1 hour
          });

          // Send the token as a response
          res.json({ status: 'matched', token: token });
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
    const { email, password } = req.body;
    const data = {
      email: email,
      password: password,
    };
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
        };
        res.json("notexist");
        await collection.insertMany([data]);
      }
    } catch (e) {
      res.json("fail");
    }
  }, 
  async deleteUser(req, res) {
    const { userId } = req.params;
    try {
      await collection.findByIdAndDelete(userId);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.log(`Could not delete user: ${error}`);
      res.status(500).json({ error: "Failed to delete user" });
    }
  },
  async updateUser(req, res) {
    const userId = req.params.id;
    const { email, password } = req.body;
    console.log(userId, email, password);

    try {
      // Check if the request is from an authenticated user
      const authorizedUser = req.user;
      if (!authorizedUser || authorizedUser.email !== email) {
        return res.status(403).json({ error: 'Access denied. You are not authorized to update this user.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const updatedUser = await User.findByIdAndUpdate(userId, {
        email: email,
        password: hashedPassword,
      }, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      console.log(`Could not update user: ${error}`);
      res.status(500).json({ error: "Failed to update user" });
    }
  },

  async getDatabyId(req,res){
    try {
      const data = await collection.find({'_id':req.query.id});
      res.json(data);
    } catch (error) {
      console.log(`Could not fetch data: ${error}`);
      res.json({ error: "Failed to fetch data" });
    }
  },
  
  async paginatedUsers(req, res) {
    try {
      const query = req.query.search || '';
      const userId = req.user.userId;
      console.log(req.user," userId");
      const allUser = await collection.find({
        $and: [
          { _id: new ObjectId(userId) }, 
          {
            $or: [
              { email: { $regex: query, $options: 'i' } },
              { password: { $regex: query, $options: 'i' } }
            ]
          }
        ]
      });
  
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const startIndex = (page - 1) * limit;
      const lastIndex = page * limit;
  
      const results = {};
      results.totalUser = allUser.length;
      results.pageCount = Math.ceil(allUser.length / limit);
  
      if (lastIndex < allUser.length) {
        results.next = {
          page: page + 1,
        };
      }
      if (startIndex > 0) {
        results.prev = {
          page: page - 1,
        };
      }
      results.result = allUser.slice(startIndex, lastIndex);
      console.log(results,'resssssssssssssssssssssssssssssssss');
      res.json(results);
    } catch (error) {
      console.log(`Could not fetch paginated users: ${error}`);
      res.json({ error: "Failed to fetch paginated users" });
    }
  }
  
};

module.exports = collectionController;

  
  

  

  
