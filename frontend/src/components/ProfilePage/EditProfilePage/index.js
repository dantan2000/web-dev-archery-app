import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import CurrUserContext from '../../../contexts/CurrUserContext';
import { updateUser } from "../../../services/user-services";

const EditProfilePage = () => {

  const { currUser, setCurrUser } = useContext(CurrUserContext);
  const [newBio, setNewBio] = useState(currUser ? currUser.bio : '');
  const [errMsg, setErrMsg] = useState(undefined);
  const navigate = useNavigate();

  const updateNewBio = (e) => {
    setNewBio(e.target.value);
  }

  const submitUpdate = () => {
    updateUser({...currUser, bio: newBio}).then(res => {
      setCurrUser(res);
    }).catch(err => setErrMsg(err.toString()))
  }

  return <div>
    <div>
      <h2>Edit Profile</h2>
    </div>

    <div>
      <label htmlFor='bio'>Bio: </label>
    </div>
    <div>
      <textarea className='form-control' rows='3' cols='50' name='bio' id='bio' onChange={updateNewBio} value={newBio}></textarea>
    </div>
    {
      errMsg && <p className='text-danger'>{errMsg}</p>
    }
    <button className="btn-primary m-4" onClick={submitUpdate}>Confirm Changes</button>

  </div>;
}
export default EditProfilePage;