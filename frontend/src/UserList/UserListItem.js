import { Link } from "react-router-dom";

const UserListItem = ({
  user = {
    username: 'Dan',
    bio: '',
    favorited_comps_by_id: [14905]
  }
}) => {

  return <li key={user.username}><Link to={`profile/${user.username}`}>{user.username}</Link></li>
}

export default UserListItem;