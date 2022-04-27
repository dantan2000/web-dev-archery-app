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
    required: false,
  },

  // List of favorited competition ids
  favorited_comps_by_id: {
    type: [Number],
    required: true,
  },

  admin_requested: {
    type: Boolean,
    required: false
  },

  is_admin: {
    type: Boolean,
    required: true
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
    required: false,
  }

}, { collection: 'users' });

// Hashing methods from https://www.loginradius.com/blog/engineering/password-hashing-with-nodejs/

// Method to set salt and hash the password for a user 
schema.methods.setPassword = function (password) {

  // Creating a unique salt for a particular user 
  this.salt = crypto.randomBytes(16).toString('hex');

  // Hashing user's salt and password with 1000 iterations, 

  this.hash = crypto.pbkdf2Sync(password, this.salt,
    1000, 64, `sha512`).toString(`hex`);
};

// Method to check the entered password is correct or not 
schema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password,
    this.salt, 1000, 64, `sha512`).toString(`hex`);
  return this.hash === hash;
};

// Method to sterilize user data and prevent exposure of sensitive info
schema.methods.sterilize = function () {
  return {
    username: this.username,
    bio: this.bio,
    favorited_comps_by_id: this.favorited_comps_by_id
  }
}

schema.methods.sterilizeForSelf = function () {
  return {
    _id: this._id,
    username: this.username,
    bio: this.bio,
    favorited_comps_by_id: this.favorited_comps_by_id,
    is_admin: this.is_admin
  }
}


export default schema;