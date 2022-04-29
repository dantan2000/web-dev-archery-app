import React from "react";
import { useState } from "react";

const ArrowScore = ({
  val = undefined,
  editable = false,
  row = 0,
  col = 0,
  updateArrow = () => { },
}) => {
  const [value, setValue] = useState(val);

  const onChange = (e) => {
    setValue(e.target.value);
    updateArrow(row, col, e.target.value);
  }

  return <input defaultValue={val} disabled={!editable} type='number' onChange={onChange} min={0} max={10} />

}

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
  editable = false,
  updateScorecard = () => { }
}) => {

  const updateUsername = (e) => {
    updateScorecard({ ...scorecard, username: e.target.value });
  }

  const updateCompId = (e) => {
    updateScorecard({ ...scorecard, comp_id: e.target.value });
  }

  const updateDate = (e) => {
    updateScorecard({ ...scorecard, date: e.target.value });
  }

  const updateIsPublic = (e) => {
    updateScorecard({ ...scorecard, is_public: e.target.checked });
  }

  const updateNote = (e) => {
    updateScorecard({ ...scorecard, note: e.target.value });
  }

  const updateArrow = (row, col, val) => {
    let newArrowScores = scorecard.arrow_scores;
    newArrowScores[row][col] = val;
    updateScorecard({ ...scorecard, arrow_scores: newArrowScores })
  }

  const calculateEndTotal = (rowIndex) => {
    const row = scorecard.arrow_scores[rowIndex];
    let endTotal = 0;
    row.forEach(arrowScore => {
      if (arrowScore) {
        endTotal += Number(arrowScore);
      }
    });
    return endTotal;
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

  const rowIsDefined = (rowIndex) => {
    const row = scorecard.arrow_scores[rowIndex];
    for (let i = 0; i < row.length; i++) {
      if (row[i] !== undefined && row[i] !== '') {
        return true;
      }
    }
    return false;
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

  return <div>
    <div>
      <label htmlFor='username'>Archer: </label>
      <input disabled={!editable} type='text' name='username' id='username' defaultValue={scorecard.username} onChange={updateUsername} />
    </div>

    <div>
      <label htmlFor='comp_id'>Event ID: </label>
      <input disabled={!editable} type='number' name='comp_id' id='comp_id' defaultValue={scorecard.comp_id} onChange={updateCompId} />
    </div>

    <div>
      <label htmlFor='date'>Date: </label>
      <input disabled={!editable} type='date' name='date' id='date' defaultValue={scorecard.date} onChange={updateDate} />
    </div>

    <div className='custom-control custom-switch'>
      <input
        type='checkbox'
        className='custom-control-input'
        id='is_public'
        readOnly
        defaultChecked={scorecard.is_public}
        onChange={updateIsPublic}
      />
      <label className='custom-control-label' htmlFor='is_public'>
        Make this scorecard public?
      </label>
    </div>

    <div>
      <table>
        <thead>
          <tr>
            <th scope='col'>End</th>
            <th scope='col'>Arrow 1</th>
            <th scope='col'>Arrow 2</th>
            <th scope='col'>Arrow 3</th>
            <th scope='col'>End Total</th>
            <th scope='col'>Running Total</th>
          </tr>
        </thead>
        <tbody>
          {
            scorecard.arrow_scores.map((row, rowIndex) => {
              return <tr key={'end_' + (rowIndex + 1)}>
                <th scope='row'>{rowIndex + 1}</th>
                {
                  row.map((val, colIndex) => {
                    return <td key={['score', rowIndex, colIndex].join('_')}><ArrowScore val={val} editable={editable} row={rowIndex} col={colIndex} updateArrow={updateArrow} /></td>
                  })
                }
                <td key={['end_total', row].join('_')}>{rowIsDefined(rowIndex) && calculateEndTotal(rowIndex)}</td>
                <td key={['running_total', row].join('_')}>{rowIsDefined(rowIndex) && calculateRunningTotal(rowIndex)}</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>

    <div>
      <table>
        <thead>
          <tr>
            <th scope='col'>10s</th>
            <th scope='col'>9s</th>
            <th scope='col'>Total</th>
          </tr>
        </thead>
        <tbody>
          <td key='10s'>{countTens()}</td>
          <td key='10s'>{countNines()}</td>
          <td key='total'>{calculateRunningTotal(scorecard.arrow_scores.length - 1)}</td>
        </tbody>
      </table>
    </div>

    <div>
      <label htmlFor='note'>Note: </label>
    </div>
    <div>
      <textarea disabled={!editable} cols='64' rows='8' name='note' id='note' defaultValue={scorecard.note} onChange={updateNote} />
    </div>

  </div>

}
export default ScorecardTable;