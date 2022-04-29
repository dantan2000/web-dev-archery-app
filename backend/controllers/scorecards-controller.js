import * as usersDao from "../users/users-dao.js";
import * as scorecardsDao from "../scorecards/scorecards-dao.js";
import { verifyAdmin, requestingForSelf } from "./users-controller.js";


const findAllScorecards = async(req, res) => {
  let scorecards = await scorecardsDao.findAllScorecards();
  scorecards = scorecards.map((scorecard) => scorecard.fixDate());
  console.log(scorecards);
  res.json(scorecards);
} 

const findScorecardsByUserName = async(req, res) => {
  let publicOnly = true;
  const user = await usersDao.findUserByUserName(req.params.username);
  if (user) {
    const requestingUser = await usersDao.findUserByCookie(req.cookies.amongLinesSession);
    if (requestingForSelf(req, requestingUser)) {
      publicOnly = false;
    }
    const scorecards = await scorecardsDao.findScorecardsByUserID(user._id, publicOnly);
    res.json(scorecards.map(scorecard => scorecard.fixDate()));
  } else {
    res.status(400).send({
      message: 'invalid username'
    })
  }
}

const createScorecard = async(req, res) => {
  const newScorecard = req.body;
  const scorecardUser = await usersDao.findUserByUserName(newScorecard.username)
  if (scorecardUser) {
    if (verifyAdmin(req) || (requestingForSelf(req, scorecardUser && newScorecard.compId === undefined))) {
      const insertedScorecard = await scorecardsDao.createScorecard(newScorecard);
      res.status(201).send({
        message: "Scorecard created!"
      });
    } else {
      res.status(401).send({
        message: "Unauthorized"
      });
    }
  } else {
    res.status(400).send({
      message: "User not found"
    })
  }
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

const findScorecardById = async(req, res) => {
  const scorecard = await scorecardsDao.findCorecardById(req.params.uid);
  const scorecardUser = await usersDao.findUserByUserName(scorecard.username);
  if (scorecard) {
    if (scorecard.is_public || requestingForSelf(req, scorecardUser)){
      res.json(scorecard.fixDate());
    } else {
      res.status(401).send({
        message: 'Scorecard is private'
      })
    }
  } else {
    res.status(400).send({
      message: 'Scorecard not found'
    })
  }
}


export default (app) => {
  app.post('/api/scorecards', createScorecard);
  app.get('/api/scorecards', findAllScorecards);
  app.get('/api/scorecards/:username', findScorecardsByUserName);
  app.get('/api/scorecard/:uid', findScorecardById)
  app.put('/api/scorecards/:uid', updateScorecard);
  app.delete('/api/scorecards/:uid', deleteScorecard);
}