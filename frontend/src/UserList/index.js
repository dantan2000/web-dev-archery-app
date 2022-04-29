import UserListItem from './UserListItem';

const UserList = ({users=[]}) => {

  return <ul className='list-group'>
    {users.map(user => <UserListItem key={user.username} user={user} />)}
  </ul>
}
export default UserList;