import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Header } from '../components';
import UserProfile from '../components/profile/UserProfile';
import { NOT_FOUND } from '../constants/routes';
import { getUserByUsername } from '../services/firebase';

function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username);

      if (user.length > 0) {
        setUser(...user);
        console.log(user);
      } else {
        history.push(NOT_FOUND);
      }
    }

    checkUserExists();
  }, []);

  return user ? (
    <div className="bg-gray-backgroud">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}

export default Profile;
