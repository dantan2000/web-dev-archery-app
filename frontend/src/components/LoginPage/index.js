import { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CurrUserContext from '../../contexts/CurrUserContext';
import { findUserByCookie } from '../../services/user-services';
import NotFound from '../NotFound';
import SignIn from './SignIn';
import SignUp from './SignUp';

const LoginPage = () => {
  const navigate = useNavigate();
  const {currUser, setCurrUser} = useContext(CurrUserContext);
  // type will be 'in' for the signin page and 'up' for the sign up page
  const { type } = useParams();

  if (currUser) {
    navigate('/');
  }

  useEffect(() => {
    if (currUser === undefined) {
      findUserByCookie()
      .then(response => setCurrUser(response))
      .catch(() => {});
    }
  }, [currUser, setCurrUser]);


  if (type !== 'in' && type !== 'up') {
    return <NotFound/>;
  }

  let formComponent = <NotFound/>

  switch (type) {
    case 'in':
      formComponent = <SignIn/>;
      break;
    case 'up':
      formComponent = <SignUp/>;
      break;
    default:
      break;
  }

  return <>
    <div>Login page</div>
    {formComponent}
  </>;

}
export default LoginPage;