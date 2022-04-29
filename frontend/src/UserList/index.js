import UserListItem from './UserListItem';

const UserList = ({users=[]}) => {

  return <ul>
    {users.map(user => <UserListItem user={user} />)}
  </ul>
}
export default UserList;