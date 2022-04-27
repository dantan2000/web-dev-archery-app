import mongoose from 'mongoose';
import userSchema from './users-schema'
const userSchema = mongoose
  .model('UserModel', userSchema);
export default userSchema;