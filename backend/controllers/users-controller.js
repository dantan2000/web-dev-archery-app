import * as usersDao from "../users/users-dao.js";
import User from "../users/users-model.js";
import crypto from 'crypto';

const cookieKey = 'amongLinesSession'
const cookieOptions = {
  sameSite: 'none',
  secure: true
}

// Returns whether the requesting user is an admin
export const verifyAdmin = async(req) => {
  const user = await usersDao.findUserByCookie(req.cookies.amongLinesSession);
  if (user && user.is_admin) {
    return true;
  }
  return false;
}

// Returns whether the requesting user is the same as the given user
export const requestingForSelf = async(req, user) => {
  const reqUser = await usersDao.findUserByCookie(req.cookies.amongLinesSession);
  return reqUser === user;
}

const findAllUsers = async(req, res) => {
  const users = await usersDao.findAllUsers();
  // console.log("users: " + users)
  // res.json(users.map(user => user.sterilize()));
  // do not sterilize for testing purposes
  res.json(users);
} 

const findUserByUserName = async(req, res) => {
  const user = await usersDao.findUserByUserName(req.params.username);
  if (user) {
    if (requestingForSelf(req, user)) {
      res.json(user.sterilizeForSelf());
    } else {
      res.json(user.sterilize());
    }
  } else {
    res.status(400).send({
      message: 'User not found'
    });
  }
}

const findUserByCookie = async(req, res) => {
  console.log('cookie: ');
  console.log(req.cookies.amongLinesSession);
  console.log(req.cookies);
  const user = await usersDao.findUserByCookie(req.cookies.amongLinesSession);
  if (user) {
    res.json(user.sterilize());
  } else {
    res.status(401).send({
      message: 'invalid cookie'
    });
  }
}

const createUser = async(req, res) => {
  const user_with_username = await usersDao.findUserByUserName(req.body.username);
  if (user_with_username) {
    res.status(400).send({
      message: "Username is taken"
    });
  } else {
    const newUser = new User();
    newUser.username = req.body.username;
    newUser.bio = '';
    newUser.favorited_comps_by_id = [];
    newUser.is_admin = false;
    newUser.setPassword(req.body.password);
    const sessionCookie = crypto.randomBytes(16).toString('hex');
    newUser.current_cookie = sessionCookie;
    const insertedUser = await usersDao.createUser(newUser);
    res.cookie(cookieKey, sessionCookie);
    res.status(201).send({
      message: "Account created!"
    });
  }
}

const updateUser = async(req, res) => {
  const userIdToUpdate = req.body._id;
  const userToUpdate = await usersDao.findUserByID(userIdToUpdate);
  if (requestingForSelf(req, userToUpdate)) {
    if (userIdToUpdate) {
      if (req.body.username) {
        userToUpdate.username = req.body.username;
      }
      if (req.body.bio) {
        userToUpdate.bio = req.body.bio;
      }
      if (req.body.favorited_comps_by_id) {
        userToUpdate.favorited_comps_by_id = req.body.favorited_comps_by_id;
      }
      await usersDao.updateUser(userIdToUpdate, userToUpdate);
      res.status(201).json(userToUpdate.sterilizeForSelf());
    } else {
      res.status(400).send({
        message: 'Invalid user',
      });
    }
  } else {
    res.status(401).send({
      message: 'Unauthorized',
    });
  }
}

const deleteUser = async(req, res) => {
  const userToDelete = await usersDao.findUserByID(req.params.uid);
  if (requestingForSelf(self, userToDelete)) {
    const userIdToDelete = req.params.uid;
    const status = await usersDao.deleteUser(userIdToDelete);
    res.sendStatus(200);
  } else {
    res.status(401).send({
      message: 'Unauthorized',
    });
  }
}

const loginUser = async(req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await usersDao.findUserByUserName(username);
  if (user && user.validPassword(password)) {
    const sessionCookie = crypto.randomBytes(16).toString('hex');
    user.current_cookie = sessionCookie;
    await usersDao.updateUser(user._id, user);
    res.cookie(cookieKey, sessionCookie, cookieOptions);
    res.status(201).json(user.sterilizeForSelf());
  } else {
    res.status(400).send({
      message: "Incorrect username/password."
    });
  }
}

const logoutUser = async(req, res) => {
  const user = await usersDao.findUserByCookie(req.cookies.amongLinesSession);
  if (user) {
    user.current_cookie = undefined;
    await usersDao.updateUser(user._id, user);
    res.clearCookie(cookieKey).status(200).send({
      message: 'Logged out!'
    });
  } else {
    res.clearCookie(cookieKey).sendStatus(200);
  }
}

const findUsersByFavCompID = async(req, res) => {
  const cid = req.params.cid;
  const users = await usersDao.findUsersByFavCompID(cid);
  res.json(users.map(user => user.sterilize()));
}

export default (app) => {
  app.post('/api/users', createUser);
  app.get('/api/users', findAllUsers);
  app.get('/api/users_by_fav_comp_id/:cid', findUsersByFavCompID);
  app.get('/api/user/:username', findUserByUserName);
  app.get('/api/user_by_cookie', findUserByCookie);
  app.put('/api/users/', updateUser);
  app.delete('/api/users/:uid', deleteUser);
  app.put('/api/user_login', loginUser);
  app.put('/api/user_logout', logoutUser);
}