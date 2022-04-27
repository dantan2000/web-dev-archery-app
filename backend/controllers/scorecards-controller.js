import * as usersDao from "../users/users-dao";
import * as scorecardsDao from "../scorecards/scorecards-dao";

const findAllScorecards = async(req, res) => {
  const scorecards = await scorecardsDao.findAllScorecards();
  // console.log("users: " + users)
  res.json(scorecards);
} 

const findScorecardsByUserName = async(req, res) => {
  let publicOnly = true;
  const user = await usersDao.findUserByUserName(res.params.username);
  const requestingUser = await usersDao.findUserByCookie(res.cookies.amongLinesSession);
  if (user._id === requestingUser._id) {
    publicOnly = false;
  }
  const scorecards = scorecardsDao.findScorecardsByUserID(user._id, publicOnly);
  res.json(scorecards);
}

const createScorecard = async(req, res) => {
  const newScorecard = req.body;
  const insertedScorecard = await scorecardsDao.createScorecard(newScorecard);
  res.status(201).send({
    message: "Account created!"
  });
}
const updateScorecard = async(req, res) => {
  const scorecardIdToUpdate = req.params.uid;
  const updatedScorecard = req.body;
  const status = await scorecardsDao.updateScorecard(scorecardIdToUpdate, updatedScorecard);
  res.sendStatus(200);
}

const deleteScorecard = async(req, res) => {
  const scorecardIdToDelete = req.params.uid;
  const status = await scorecardsDao.deleteScorecard(scorecardIdToDelete);
  res.sendStatus(200);
}


export default (app) => {
  app.post('/api/scorecards', createScorecard);
  app.get('/api/scorecards', findAllScorecards);
  app.get('/api/scorecards/:username', findScorecardsByUserName);
  app.put('/api/scorecards/:uid', updateScorecard);
  app.delete('/api/scorecards/:uid', deleteScorecard);
}