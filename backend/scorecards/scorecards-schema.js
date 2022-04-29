import mongoose from 'mongoose';
const schema = mongoose.Schema({
  // User who created this scorecard
  username: {
    type: String,
    required: true,
  },

  // Competition this scorecard is mapped to
  comp_id: {
    type: Number,
    required: false,
  },

  // The date this scorecard was shot
  date: {
    type: Date,
    required: true,
  },

  // Whether this scorecard is publicly vieable
  is_public: {
    type: Boolean,
    required: true,
  },

  // Number[][] to represent a list of ends,
  // with each end containing a list of arrow scores
  arrow_scores: {
    type: [[Number]],
    required: true,
  },

  // A note from the user about the shoot
  note: {
    type: String,
    required: false,
  },

}, { collection: 'scorecards' });
export default schema;

schema.methods.fixDate = function () {
  return {
    _id: this._id,
    username: this.username,
    date: this.date.toISOString().substring(0, 10),
    is_public: this.is_public,
    arrow_scores: this.arrow_scores,
    note: this.note
  }
}