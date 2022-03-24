import PropTypes from 'prop-types';
import { useEffect, useReducer } from 'react';
import { getUserPhotosByUsername } from '../../services/firebase';
import Header from './Header';
import Photos from './Photos';

const initialState = {
  profile: {},
  photosCollection: [],
  followerCount: 0,
};

const reducer = (state, newState) => ({ ...state, ...newState });

function UserProfile({ user }) {
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUsername(user.username);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    }

    getProfileInfoAndPhotos();
  }, [user.userName]);

  return (
    <>
      <Header
        photosCount={photosCollection.length}
        followerCount={followerCount}
        setFollowerCount={dispatch}
        profile={profile}
      />
      <Photos photos={photosCollection} />
    </>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfile;
