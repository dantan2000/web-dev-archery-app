import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { findEventByID } from '../../../services/world-archery-services';
import divisions from '../../../mapping/divisions';
import CurrUserContext from '../../../contexts/CurrUserContext';
import { findUsersByFavCompID, updateUser } from '../../../services/user-services';
import UserList from '../../../UserList';
import disciplines from '../../../mapping/disciplines';
import ScorecardList from '../../Scorecard/ScorecardList';
import { findScorecardsByEventId } from '../../../services/scorecard-services';
import './EventDetails.css'
import flags from '../../../mapping/flags';
import BackButton from '../../BackButton';

const EventDetails = () => {
  const [error, setError] = useState(false)
  const [event, setEvent] = useState(undefined);
  const { eid } = useParams();

  const [scError, setScError] = useState(false)
  const [scorecards, setScorecards] = useState([]);

  const [favoritedUsers, setFavoritedUsers] = useState([]);

  const { currUser, setCurrUser } = useContext(CurrUserContext);

  const navigate = useNavigate();

  useEffect(() => {
    findEventByID(eid)
      .then(response => setEvent(response))
      .catch(() => setError(true));
  }, [eid])

  useEffect(() => {
    findUsersByFavCompID(eid)
      .then(res => setFavoritedUsers(res))
      .catch(() => setFavoritedUsers([]));
  }, [currUser, eid])

  useEffect(() => {
    findScorecardsByEventId(eid)
      .then(res => setScorecards(res))
      .catch(() => setScError(true));
  }, [eid])

  const hasFavorited = () => {
    return currUser && currUser.favorited_comps_by_id.includes(Number(eid))
  };

  const favoriteEvent = () => {
    if (currUser) {
      if (hasFavorited()) {
        // Remove the id from the list
        currUser.favorited_comps_by_id.forEach((compId, index) => {
          if (compId === Number(eid)) {
            currUser.favorited_comps_by_id.splice(index, 1);
          }
        });
      } else {
        currUser.favorited_comps_by_id.push(eid);
      }
      updateUser(currUser).then(response => setCurrUser(response));
    }
  }

  const navigateToScorecardCreate = () => {
    navigate(`/create_scorecard/${eid}`);
  }

  if (error) {
    return <div>Error: Something went wrong :(</div>
  }
  if (event) {
    return (
      <>
        <div>
          <div className="row">
            <BackButton />
          </div>
          <div className="row mb-4">
            <div>
              <h2>Event Details</h2>
            </div>
          </div>
          <div className="row">
            <div className='col-9'>
              <div className="card col-12">
                <div>
                  <div className='row card-header mt-2'>
                    <div className='col-3' onClick={favoriteEvent}>
                      {
                        currUser && hasFavorited() &&
                        <i className="fas fa-heart fa-2x" style={{ color: 'red' }}></i>
                      }
                      {
                        currUser && !hasFavorited() &&
                        <i className="fas fa-heart fa-2x" ></i>
                      }
                    </div>
                    <div className='col-6 text-center'>
                      <h3>{event.Name}</h3>
                    </div>
                    <div className='col-3 text-right'>
                      {
                        event.IsLive &&
                        <i style={{ color: "green" }} className="fas fa-video fa-lg"></i>
                      }
                      {
                        !event.IsLive &&
                        <i style={{ color: "red" }} className="fas fa-video-slash fa-lg"></i>
                      }
                    </div>
                  </div>
                  <div className='card-body text-center'>
                    <div className='wd-card-element'>
                      {flags[event.Country]}
                    </div>
                    <div className='wd-card-element'>
                      {event.Place}, {event.CountryName}
                    </div>
                    <div className='wd-card-element'>
                      Dates: {event.DFrom} to {event.DTo}
                    </div>
                    <div className='wd-card-element'>
                      Divisions: {
                        event.ComDivisions
                          .map(comDiv => divisions[comDiv])
                          .join(', ')
                      }
                    </div>
                    <div className='wd-card-element'>
                      Discipline: {
                        disciplines[event.ComDis]
                      }
                    </div>

                  </div>
                </div>

              </div>


              <div className='mt-5'>
                <h3>Scorecards for this event</h3>
                {
                  // TODO: Make show scorecards for only this event
                  // <ScorecardList scorecards={scorecards} error={scError}/>
                }
                <div className='pt-2'>
                  <ScorecardList />
                </div>
              </div>
            </div>

            <div className="col-3">
              {
                currUser && currUser.is_admin &&
                <div className='my-3'>
                  <button type="button" className="btn btn-primary my-4" onClick={navigateToScorecardCreate}>Add Event Scorecard</button>
                </div>
              }

              <b>Archers interested in this event:</b><br />
              <UserList users={favoritedUsers} />
            </div>

          </div>

        </div>

      </>
    );
  }
  return <div>loading...</div>
}
export default EventDetails;
