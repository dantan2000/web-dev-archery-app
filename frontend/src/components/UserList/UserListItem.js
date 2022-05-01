import { Link } from "react-router-dom";

const UserListItem = ({
  user = {
    username: 'Dan',
    bio: '',
    favorited_comps_by_id: [14905]
  }
}) => {

  return <Link to={`/profile/${user.username}`}><li className='border border-light list-group-item list-group-item-action' key={user.username}>{user.username}</li></Link>
}

export default UserListItem;