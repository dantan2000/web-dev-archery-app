import mongoose from 'mongoose';
import crypto from 'crypto';

const schema = mongoose.Schema({

  // Screen name of a user
  username: {
    type: String,
    required: true,
  },

  // The bio of a user
  bio: {
    type: String,
    required: true,
  },

  // List of favorited competition ids
  favorited_comps_by_id: {
    type: [Number],
    required: true,
  },
  
  // Stretch goal: profile images

  hash: {
    type: String,
    required: true,
  },

  salt: {
    type: String,
    required: true,
  },

  current_cookie: {
    type: String,
    required: true,
  }

}, { collection: 'users' });

// Hashing methods from https://www.loginradius.com/blog/engineering/password-hashing-with-nodejs/

// Method to set salt and hash the password for a user 
schema.methods.setPassword = function(password) { 
     
  // Creating a unique salt for a particular user 
     this.salt = crypto.randomBytes(16).toString('hex'); 
   
     // Hashing user's salt and password with 1000 iterations, 
      
     this.hash = crypto.pbkdf2Sync(password, this.salt,  
     1000, 64, `sha512`).toString(`hex`); 
 }; 
   
 // Method to check the entered password is correct or not 
 schema.methods.validPassword = function(password) { 
     var hash = crypto.pbkdf2Sync(password,  
     this.salt, 1000, 64, `sha512`).toString(`hex`); 
     return this.hash === hash; 
 }; 


export default schema;