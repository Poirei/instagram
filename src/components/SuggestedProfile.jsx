import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function SuggestedProfile({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId,
}) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(true);

    // firebase: create two services (functions)
    // update the following array of the logged in user
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);

    // update the followers array of the user who has been followed
    await updateFollowedUserFollowers(profileDocId, userId, false);
  }

  return !followed ? (
    <div className="flex flex-row items-center justify-between">
      <div className="flex items-center justify-between">
        <img
          src={`/public/images/avatars/${username}.jpg`}
          alt=""
          className="rounded-full w-8 flex mr-3"
        />
        <Link to={`/p/${username}`}>
          <p className="font-medium text-sm">{username}</p>
        </Link>
      </div>
      <div>
        <button
          className="text-sm font-bold text-blue-medium rounded hover:bg-blue-light hover:shadow-sm hover:shadow-blue-light px-2 py-1 transition-all"
          type="button"
          onClick={handleFollowUser}
        >
          Follow
        </button>
      </div>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
};

export default SuggestedProfile;
