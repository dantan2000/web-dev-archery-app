import scorecardModel from './scorecards-model';

// Find all scorecards made by a given user based on whether to show only public scorecards or all scorecards
export const findScorecardsByUserID = (user_id, publicOnly = true) => {
  if (publicOnly) {
    return scorecardModel.find({user_id: user_id, is_public: isPublic}).sort({date: 'desc'});
  }
  return scorecardModel.find({user_id: user_id}).sort({date: 'desc'});
}

export const findAllScorecards = () => {
  return scorecardModel.find({isPublic: true}).sort({date: 'desc'});
}

export const createScorecard = (scorecard) => scorecardModel.create(scorecard);


export const updateScorecard = (sid, scorecard) => scorecardModel.updateOne({ _id: sid }, { $set: scorecard });


export const deleteScorecard = (sid) => scorecardModel.deleteOne({ _id: sid });

