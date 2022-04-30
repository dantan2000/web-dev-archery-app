import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CurrUserContext from "../../../contexts/CurrUserContext";
import { createScorecard } from "../../../services/scorecard-services";
import ScorecardTable from '../ScorecardTable';
import { findUserByCookie } from "../../../services/user-services";
import { findEventByID } from "../../../services/world-archery-services";


const ScorecardCreate = () => {

  const { currUser, setCurrUser } = useContext(CurrUserContext);
  const [ isLoading, setIsLoading ] = useState(true);
  const { eid } = useParams();
  const navigate = useNavigate();

  const [scorecard, setScorecard] = useState(undefined);
  const [event, setEvent] = useState(undefined);
  const [errMsg, setErrMsg] = useState('');

  const makeEmptyScorecard = (currUser) => {
    const arrowScores = [];
    for (let i = 0; i < 20; i++) {
      let endScores = []
      for (let j = 0; j < 3; j++) {
        endScores.push(undefined);
      }
      arrowScores.push(endScores);
    }
    const today = new Date(Date.now());
    const dateString = today.toISOString().substring(0, 10);
    let scorecard = {
      "username": undefined,
      "comp_id": undefined,
      "date": dateString,
      "is_public": true,
      "arrow_scores": arrowScores,
      "note": '',
    }
    if (currUser) {
      if (eid) {
        if (currUser.is_admin) {
          scorecard.comp_id = eid;
        }
      } else {
        scorecard.username = currUser.username;
      }
    }
    return scorecard;
  }

  useEffect(() => {
    if (scorecard === undefined) {
      findUserByCookie().then(response => {
        if (eid === undefined || response.is_admin) {
          setScorecard(makeEmptyScorecard(response));
          setIsLoading(false);
        } else {
          navigate('/create_scorecard');
        }
      })
      .catch(() => navigate('/signin'));
    } 
    if (eid !== undefined) {
      findEventByID(eid)
        .then(response => setEvent(response))
        .catch(() => navigate('/create_scorecard'))
    }
  }, [eid]);


  const updateScorecard = (scorecard) => {
    setScorecard(scorecard);
  }

  const notEmpty = (value) => {
    return value !== undefined && value !== '';
  }

  const noneEmpty = (valArr) => {
    for (let i = 0; i < valArr.length; i++) {
      if (!notEmpty(valArr)) {
        return false;
      }
    }
    return true;
  }

  const validateArrowScores = () => {
    for (let i = 0; i < scorecard.arrow_scores.length; i++) {
      for (let j = 0; j < scorecard.arrow_scores[i].length; j++) {
        if (!notEmpty(scorecard.arrow_scores[i][j])) {
          return false;
        }
      }
    }
    return true;
  }

  const validateScorecard = () => {
    return noneEmpty([scorecard.username, scorecard.date, scorecard.is_public])
      && validateArrowScores()
      && (scorecard.username === currUser.username || (currUser.is_admin && notEmpty(scorecard.comp_id)))
  }

  const submitScorecard = () => {
    setErrMsg('');
    if (validateScorecard()) {
      createScorecard(scorecard).then(response => {
        if (scorecard.comp_id) {
          navigate(`/events/${eid}`)
        } else {
          navigate('/profile');
        }
      })
    } else {
      setErrMsg('Please ensure the scorecard is filled in completely.')
    }
  }

  const generateScore = () => {
    return Math.floor(Math.random() * 3) + 8;
  }

  const fillArrowScores = () => {
    const newScores = [];
    for (let i = 0; i < 20; i++) {
      const newEnd = [];
      for (let j = 0; j < 3; j++) {
        newEnd.push(generateScore());
      }
      newScores.push(newEnd);
    }
    setScorecard({...scorecard, arrow_scores: newScores});
  }


  return <div>
    <h1>Create Scorecard</h1>
    {isLoading && <div>Loading...</div>}
    {scorecard && <ScorecardTable scorecard={scorecard} event={event} editable={true} updateScorecard={updateScorecard} />}
    <div>{errMsg !== '' && errMsg}</div>
    <button onClick={submitScorecard}>Submit Scorecard</button>
    <button onClick={fillArrowScores}>Fill in Arrow Scores</button>
  </div>;
}
export default ScorecardCreate;