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
      if (document.getElementById('password').value !== document.getElementById('passwordConfirm').value) {
        setErrorMsg('Passwords do not match');
        return;
      }
      if (!document.getElementById('privacyPolicyConsent').checked) {
        setErrorMsg('You must agree with the privacy policy to create an account');
        return;
      }
      if (document.getElementById('username').value === '' || document.getElementById('password').value === '') {
        setErrorMsg('Please ensure all required fields in the form are filled out.');
        return;
      }
      setErrorMsg('');
      setAwaitingResponse(true);
      createUser({
        username: document.getElementById('username').value, 
        password: document.getElementById('password').value,
        admin_requested: document.getElementById('admin_requested').checked
      }).then(response => {
          setCurrUser(response);
          navigate('/');
        })
        .catch(err => {
          if (err.response?.data.message) {
            setErrorMsg(err.response.data.message);
          } else {
            setErrorMsg('An unexpected error occurred. Please try again later.');
          }
        })
        .finally(setAwaitingResponse(false));
    }
  }

  const submitOnEnter = (e) => {
    if(e && e.keyCode == 13) {
      signup();
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
        readOnly
      />
      <label className='custom-control-label' htmlFor='admin_requested'>
        Apply to be an event admin
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