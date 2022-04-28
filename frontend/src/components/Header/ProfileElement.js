import { Router, Link } from "react-router-dom";
import { useContext } from "react";

import CurrUserContext from './../../contexts/CurrUserContext';
import { findUserByCookie } from "../../services/user-services";
import { useEffect } from "react";
import { useState } from "react";

const ProfileElement = () => {
  const { currUser, setCurrUser } = useContext(CurrUserContext)


  useEffect(() => {
    findUserByCookie()
      .then(response => setCurrUser(response))
      .catch(() => setCurrUser(undefined));
  }, [document.cookie])

  if (currUser) {
    return (
      <Link className="nav-link" to="/profile">{currUser.username}</Link>
    )
  }
  return (
    <Link className="nav-link" to="/signin">Sign In/ Sign Up</Link>
  )
}
export default ProfileElement;