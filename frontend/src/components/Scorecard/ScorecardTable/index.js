import React from "react";
import { useState } from "react";
import ScorecardInfo from './ScorecardInfo';
import RoundTable from "./RoundTable";
import './ScorecardTable.css';

const ScorecardTable = ({
  scorecard = {
    "username": "dan",
    "comp_id": 14905,
    "date": "2020-08-28",
    "is_public": true,
    "arrow_scores": [
      [9, 8, 7],
      [6, 6, 3],
      [4, 3, 2],
      [9, 6, 5],
      [10, 7, 4],
      [8, 7, 3],
      [8, 7, 6],
      [7, 5, 5],
      [9, 7, 2],
      [9, 8, 0],
    ],
    "note": "Test Scorecard",
  },
  event = undefined,
  editable = false,
  updateScorecard = () => { }
}) => {

  const updateNote = (e) => {
    updateScorecard({ ...scorecard, note: e.target.value });
  }

  const updateArrow = (row, col, val) => {
    let newArrowScores = scorecard.arrow_scores;
    newArrowScores[row][col] = val;
    updateScorecard({ ...scorecard, arrow_scores: newArrowScores })
  }

  const calculateRunningTotal = (rowIndex) => {
    let total = 0;
    for (let i = 0; i <= rowIndex; i++) {
      const row = scorecard.arrow_scores[i];
      let endTotal = 0;
      row.forEach(arrowScore => {
        if (arrowScore) {
          endTotal += Number(arrowScore);
        }
      });
      total += endTotal;
    }
    return total;
  }

  const countTens = () => {
    let total = 0;
    scorecard.arrow_scores.forEach(end => end.forEach(score => {
      if (score && Number(score) === 10) {
        total++;
      }
    }));
    return total;
  }

  const countNines = () => {
    let total = 0;
    scorecard.arrow_scores.forEach(end => end.forEach(score => {
      if (score && Number(score) === 9) {
        total++;
      }
    }));
    return total;
  }

  const round1 = scorecard.arrow_scores.slice(0, 10);
  const round2 = scorecard.arrow_scores.slice(10);

  return <div>

    <ScorecardInfo scorecard={scorecard} event={event} editable={editable} updateScorecard={updateScorecard} />

    <div className="row my-5">
      <div className="col-12 col-lg-6">
        {/* ask dan if he prefers just table or table-dark,
        ditto on bordered and striped */}
        {/* decide if you want table-responsive */}
        <h2>Round 1</h2>
        <RoundTable arrow_scores={round1} editable={editable} updateArrow={updateArrow} />
      </div>
      <div className="col-12 col-lg-6">
        {/* ask dan if he prefers just table or table-dark,
        ditto on bordered and striped */}
        {/* decide if you want table-responsive */}
        <h2>Round 2</h2>
        <RoundTable arrow_scores={round2} start={10} editable={editable} updateArrow={updateArrow} />
      </div>

    </div>


    <div className='row'>
      <div className='col-12 col-lg-6 mb-5'>
        <h2>Results</h2>
        <table className="table table-sm table-bordered table-striped wd-summary-table">
          <thead>
            <tr>
              <th scope='col'>10s</th>
              <th scope='col'>9s</th>
              <th scope='col'>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td key='10s'>{countTens()}</td>
              <td key='9s'>{countNines()}</td>
              <td key='total'>{calculateRunningTotal(scorecard.arrow_scores.length - 1)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='col-12 col-lg-6'>
        <div>
          <label htmlFor='note'>Note: </label>
        </div>
        <div>
          <textarea className='form-control' disabled={!editable} cols='64' rows='8' name='note' id='note' defaultValue={scorecard.note} onChange={updateNote} />
        </div>
      </div>
    </div>

  </div>

}
export default ScorecardTable;