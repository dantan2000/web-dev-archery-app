import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';


import CurrUserContext from '../../contexts/CurrUserContext';
import { loginUser } from '../../services/user-services';

const SignIn = () => {
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const {currUser, setCurrUser} = useContext(CurrUserContext);
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
    if(e && e.keyCode == 13) {
      login();
    }
  }

  return <>
    <div>Sign In</div>
    
    <div onKeyDown={submitOnEnter}>
    <label for='username'>Username: </label>
    <input type='text' name='username' id='username'/>
    <label for='username'>Password: </label>
    <input type='password' name='password' id='password'/>
    {errorMsg !== '' && errorMsg}
    <button onClick={login} disabled={awaitingResponse}>Log In</button>
    </div>
    <Link to='/signup'>Sign Up</Link>
  </>;
}
export default SignIn;