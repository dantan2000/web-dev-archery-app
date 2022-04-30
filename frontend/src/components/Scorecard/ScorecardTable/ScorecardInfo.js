import { Link } from 'react-router-dom';

const ScorecardInfo = ({
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

  const updateUsername = (e) => {
    updateScorecard({ ...scorecard, username: e.target.value });
  }

  const updateDate = (e) => {
    updateScorecard({ ...scorecard, date: e.target.value });
  }

  const updateIsPublic = (e) => {
    updateScorecard({ ...scorecard, is_public: e.target.checked });
  }


  const editableHeaderClass = 'my-2'

  return <div>

    <div className='row my-4 form-group'>
      <div className='col-auto'>

        {
          editable &&
          <div className={editableHeaderClass}>
            <label htmlFor='username'><b>Archer:</b></label>
          </div>
        }

        {
          !editable &&
          <div>
            <b>Archer:</b>
          </div>
        }

        {
          scorecard.comp_id &&
          <div className={editableHeaderClass}>
            <b>Event:</b>
          </div>
        }

        <div className={editableHeaderClass}>
          <label htmlFor='date'><b>Date:</b></label>
        </div>
      </div>


      <div className='col-8 col-sm-6 col-lg-4'>

        {
          editable &&
          <div>
            <div>
              <input className='form-control' disabled={!editable || !scorecard.comp_id} type='text' name='username' id='username' defaultValue={scorecard.username} onChange={updateUsername} />
            </div>

            {
              scorecard.comp_id &&
              <div className={editableHeaderClass}>
                {event && event.Name}
                {!event && <br />}
              </div>
            }

            <div className={editableHeaderClass}>
              <input className='form-control' disabled={!editable} type='date' name='date' id='date' defaultValue={scorecard.date} onChange={updateDate} />
            </div>
          </div>
        }

        {
          !editable &&
          <div>

            <div>
              <Link to={`/profile/${scorecard.username}`}>{scorecard.username}</Link>
            </div>

            {
              scorecard.comp_id &&
              <div className={editableHeaderClass}>
                <Link to={`/events/${scorecard.comp_id}`}>{event && event.Name}</Link>
              </div>
            }

            <div className={editableHeaderClass}>
              {scorecard.date}
            </div>

          </div>
        }

      </div>
    </div>

    {
      editable &&
      <div>
        <div className='custom-control custom-switch my-3'>
          <input
            type='checkbox'
            className='custom-control-input'
            id='is_public'
            disabled={!editable || scorecard.comp_id}
            defaultChecked={scorecard.is_public}
            onChange={updateIsPublic}
          />
          <label className='custom-control-label' htmlFor='is_public'>
            Make this scorecard public?
          </label>
        </div>
        <div className='small text-info'>
          {scorecard.comp_id ? 'Event scorecards are always public.' : <br />}
        </div>
      </div>
    }

  </div>
}

export default ScorecardInfo