
import { useState } from "react";

const ArrowScore = ({
  val = undefined,
  editable = false,
  row = 0,
  col = 0,
  updateArrow = () => { },
}) => {

  const onChange = (e) => {
    updateArrow(row, col, e.target.value);
  }

  return <input className='form-control' id={['score', row, col].join('_')}  disabled={!editable} type='number' onChange={onChange} min={0} max={10} value={val} />

}

const RoundTable = ({
  arrow_scores = [],
  start = 0,
  editable = false,
  updateArrow = () => { },
}) => {

  const rowIsDefined = (rowIndex) => {
    const row = arrow_scores[rowIndex];
    for (let i = 0; i < row.length; i++) {
      if (row[i] !== undefined && row[i] !== '') {
        return true;
      }
    }
    return false;
  }

  const calculateEndTotal = (rowIndex) => {
    const row = arrow_scores[rowIndex];
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
      const row = arrow_scores[i];
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
    arrow_scores.forEach(end => end.forEach(score => {
      if (score && Number(score) === 10) {
        total++;
      }
    }));
    return total;
  }

  const countNines = () => {
    let total = 0;
    arrow_scores.forEach(end => end.forEach(score => {
      if (score && Number(score) === 9) {
        total++;
      }
    }));
    return total;
  }

  return <div>
    <table className="table table-sm table-bordered table-striped">
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
          arrow_scores.map((row, i) => {
            const rowIndex = i + start;
            return <tr key={'end_' + (rowIndex + 1)}>
              <th scope='row'>{rowIndex + 1}</th>
              {
                row.map((val, colIndex) => {
                  return <td key={['score', rowIndex, colIndex].join('_')}><ArrowScore val={val} editable={editable} row={rowIndex} col={colIndex} updateArrow={updateArrow} /></td>
                })
              }
              <td key={['end_total', rowIndex].join('_')}>{rowIsDefined(i) && calculateEndTotal(i)}</td>
              <td key={['running_total', rowIndex].join('_')}>{rowIsDefined(i) && calculateRunningTotal(i)}</td>
            </tr>
          })
        }
      </tbody>
    </table>
    

    <div>
      <table className="table table-sm table-bordered table-striped wd-summary-table">
        <thead>
          <tr>
            <th scope='col'>10s</th>
            <th scope='col'>9s</th>
            <th scope='col'>Round Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td key='10s'>{countTens()}</td>
            <td key='9s'>{countNines()}</td>
            <td key='total'>{calculateRunningTotal(arrow_scores.length - 1)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
}

export default RoundTable;