import { useNavigate } from 'react-router-dom';
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

  const login = () => {
    if (!awaitingResponse) {
      setErrorMsg('');
      setAwaitingResponse(true);
      loginUser(document.getElementById('username'), document.getElementById('password'))
        .then(response => {
          setCurrUser(response);
          navigate('/');
        })
        .catch(() => setErrorMsg('Invalid username/password'))
        .finally(setAwaitingResponse(false));
    }
  }

  return <>
    <div>Sign In</div>
    <label for='username'>Username: </label>
    <input type='text' name='username' id='username'/>
    <label for='username'>Password: </label>
    <input type='password' name='password' id='password'/>
    {errorMsg !== '' && errorMsg}
    <button onClick={login} disabled={awaitingResponse}>Log In</button>
  </>;
}
export default SignIn;