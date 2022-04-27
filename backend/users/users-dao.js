import userModel from './users-model.js';


export const findAllUsers = () => userModel.find();

export const findUserByUserName = (userName) => userModel.findOne({username: userName});

export const findUserByCookie = (cookie) => userModel.findOne({current_cookie: cookie});

export const findUserByID = (id) => userModel.findOne({_id: id});

export const createUser = (user) => userModel.create(user);

export const updateUser = (uid, user) => userModel.updateOne({ _id: uid }, { $set: user })

export const deleteUser = (uid) => userModel.deleteOne({ _id: uid });

export const findUsersByFavCompID = (eid) => userModel.find({favorited_comps_by_id: eid});