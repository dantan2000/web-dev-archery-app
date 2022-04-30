import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findScorecardById } from "../../../services/scorecard-services";
import { findEventByID } from "../../../services/world-archery-services";
import ScorecardTable from '../ScorecardTable';


const ScorecardDetails = () => {
  
  const [error, setError] = useState(false)
  const [scorecard, setScorecard] = useState(undefined);
  const { sid } = useParams();

  const [event, setEvent] = useState();

  useEffect(() => {
    if (scorecard && scorecard.comp_id) {
      findEventByID(scorecard.comp_id)
        .then(res => setEvent(res))
        .catch(() => setEvent(undefined));
    }
  }, [scorecard])

  useEffect(() => {
    findScorecardById(sid)
    .then(response => setScorecard(response))
    .catch(() => setError(true));
  }, [sid]);

  return <div>
    <h1>Scorecard</h1>
    {error && <p>An unexpected error occurred.</p>}
    {!scorecard && <p>Loading scorecard...</p>}
    {scorecard && <ScorecardTable scorecard={scorecard} editable={false} event={event}/>}
  </div>;
}
export default ScorecardDetails;