import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import "./Login.css"


import CurrUserContext from '../../contexts/CurrUserContext';
import { loginUser } from '../../services/user-services';

const SignIn = () => {
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const { currUser, setCurrUser } = useContext(CurrUserContext);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();


  if (currUser) {
    navigate('/');
  }

  const handleResponse = (response) => {
    setCurrUser(response);
    navigate('/');
  }

  const login = () => {
    if (!awaitingResponse) {
      setErrorMsg('');
      setAwaitingResponse(true);
      loginUser(document.getElementById('username').value, document.getElementById('password').value)
        .then(response => handleResponse(response))
        .catch(err => {
          if (err.response?.data.message) {
            setErrorMsg(err.response.data.message);
          } else {
            setErrorMsg('An unexpected error occurred. Please try again later.');
          }
        })
        .finally(() => setAwaitingResponse(false));
    }
  }

  const submitOnEnter = (e) => {
    if (e && e.keyCode == 13) {
      login();
    }
  }

  return <>
    <div class="row">
      <div class="text-right col">
        <img
          className="wd-login-logo"
          src="/images/logo_noBG.png" />
      </div>
      <div class="col">
        <div onKeyDown={submitOnEnter}>
          <label for='username'>Username:</label><br/>
          <input type='text' name='username' id='username' /><br/>
          <label for='username'>Password: </label><br/>
          <input type='password' name='password' id='password' /><br/>
          {errorMsg !== '' && errorMsg}<br/>
          <button class="btn-primary" onClick={login} disabled={awaitingResponse}>Log In</button>
          <Link class="ml-2" to='/signup'>Sign Up</Link>
        </div>
      </div>
    </div>
  </>;
}
export default SignIn;