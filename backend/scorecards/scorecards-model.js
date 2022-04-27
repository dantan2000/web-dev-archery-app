import mongoose from 'mongoose';
import scorecardSchema from './scorecards-schema'
const scorecardModel = mongoose
  .model('ScorecardModel', scorecardSchema);
export default scorecardModel;