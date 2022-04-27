import mongoose from 'mongoose';
import scorecardSchema from './scorecards-schema.js'
const scorecardModel = mongoose
  .model('ScorecardModel', scorecardSchema);
export default scorecardModel;