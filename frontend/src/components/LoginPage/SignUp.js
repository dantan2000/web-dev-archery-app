import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';


import CurrUserContext from '../../contexts/CurrUserContext';
import { createUser } from '../../services/user-services';
import PrivacyPolicy from '../PrivacyPolicy';

const SignUp = () => {
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const {currUser, setCurrUser} = useContext(CurrUserContext);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  if (currUser) {
    navigate('/'); 
  }

  const signup = () => {
    if (!awaitingResponse) {
      if (document.getElementById('password') !== document.getElementById('passwordConfirm')) {
        setErrorMsg('Passwords do not match');
        return;
      }
      if (!document.getElementById('privacyPolicyConsent').checked) {
        setErrorMsg('You must agree with the privacy policy to create an account');
        return;
      }
      setErrorMsg('');
      setAwaitingResponse(true);
      createUser({
        username: document.getElementById('username'), 
        password: document.getElementById('password'),
        admin_requested: document.getElementById('admin_requested')
      }).then(response => {
          setCurrUser(response);
          navigate('/');
        })
        .catch(err => console.log(err))
        .finally(setAwaitingResponse(false));
    }
  }

  return <>
    <div>Sign Up</div>
      <label for='username'>Username: </label>
      <input type='text' name='username' id='username'/>
      <label for='username'>Password: </label>
      <input type='password' name='password' id='password'/>
      <label for='username'>Confirm Password: </label>
      <input type='password' name='password' id='passwordConfirm'/>
      
      <div className='custom-control custom-switch'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='admin_requested'
          checked={false}
          readOnly
        />
        <label className='custom-control-label' htmlFor='admin_requested'>
          Toggle this switch element
        </label>
      </div>

      {<PrivacyPolicy/>}
      
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="privacyPolicyConsent"/>
        <label class="form-check-label" for="privacyPolicyConsent">I have read and agree with the privacy policy above</label>
      </div>

      {errorMsg !== '' && errorMsg}
      <button onClick={signup} disabled={awaitingResponse}>Sign Up</button>
  </>;
}
export default SignUp;