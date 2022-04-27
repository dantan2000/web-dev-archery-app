import * as usersDao from "../users/users-dao";
import User from "../users/users-model";

const findAllUsers = async(req, res) => {
  const users = await usersDao.findAllUsers();
  // console.log("users: " + users)
  res.json(users);
} 

const findUserByUserName = async(req, res) => {
  const user = await usersDao.findUserByUserName(res.params.username);
  res.json(user);
}

const findUserByCookie = async(req, res) => {
  const user = await usersDao.findUserByCookie(req.cookies.amongLinesSession);
  res.json(user);
}

const createUser = async(req, res) => {
  const user_with_username = await usersDao.findUserByUserName(req.body.username);
  if (user_with_username) {
    res.status(400).send({
      message: "Username is taken"
    })
  } else {
    const newUser = new User();
    newUser.username = req.body.username;
    newUser.bio = '';
    newUser.favorited_comps_by_id = [];
    newUser.setPassword(req.body.password);
    const sessionCookie = crypto.randomBytes(16).toString('hex');
    newUser.current_cookie = sessionCookie;
    const insertedUser = await usersDao.createUser(newUser);
    res.cookie('amongLinesSession', sessionCookie);
    res.status(201).send({
      message: "Account created!"
    });
  }
}
const updateUser = async(req, res) => {
  const userIdToUpdate = req.params.uid;
  const userToUpdate = usersDao.findUserByID(userIdToUpdate);
  if (req.body.username) {
    userToUpdate.username = req.body.username;
  }
  if (req.body.bio) {
    userToUpdate.bio = req.body.bio;
  }
  if (req.body.favorited_comps_by_id) {
    userToUpdate.favorited_comps_by_id = req.body.favorited_comps_by_id;
  }
  const status = await usersDao.updateTuit(userIdToUpdate, userToUpdate);
  res.sendStatus(200);
}

const deleteUser = async(req, res) => {
  const userIdToDelete = req.params.uid;
  const status = await usersDao.deleteTuit(userIdToDelete);
  res.sendStatus(200);
}


export default (app) => {
  app.post('/api/users', createUser);
  app.get('/api/users', findAllUsers);
  app.get('/api/user/:username', findUserByUserName);
  app.get('/api/user_by_cookie', findUserByCookie);
  app.put('/api/users/:uid', updateUser);
  app.delete('/api/users/:uid', deleteUser);
}