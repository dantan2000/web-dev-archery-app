import UserListItem from './UserListItem';

const UserList = ({users=[]}) => {

  return <ul>
    {users.map(user => <UserListItem key={user.username} user={user} />)}
  </ul>
}
export default UserList;