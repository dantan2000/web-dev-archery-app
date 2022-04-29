import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findScorecardById } from "../../../services/scorecard-services";
import ScorecardTable from '../ScorecardTable';


const ScorecardDetails = () => {
  
  const [error, setError] = useState(false)
  const [scorecard, setScorecard] = useState(undefined);
  const { sid } = useParams();

  useEffect(() => {
    findScorecardById(sid)
    .then(response => setScorecard(response))
    .catch(() => setError(true));
  }, [sid]);

  return <div>
    <h1>Create Scorecard</h1>
    {error && <p>An unexpected error occurred.</p>}
    {!scorecard && <p>Loading scorecard...</p>}
    {scorecard && <ScorecardTable scorecard={scorecard} editable={false}/>}
  </div>;
}
export default ScorecardDetails;