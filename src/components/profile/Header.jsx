import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { useUser } from '../../hooks/use-user';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';

function Header({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    username: profileUsername,
    fullName,
    followers = [],
    following = [],
  },
}) {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user.username && user.username !== profileUsername;

  useEffect(() => {
    async function isLoggedInUserFollowingProfile() {
      const isFollowing = await isUserFollowingProfile(
        user?.username,
        profileUserId
      );
      setIsFollowingProfile(isFollowing);
    }

    if (user?.username && profileUserId) isLoggedInUserFollowingProfile();
  }, [user?.username, profileUserId]);

  async function handleToggleFollowBtn() {
    setIsFollowingProfile(!isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        {profileUsername ? (
          <img
            src={`/public/images/avatars/${profileUsername}.jpg`}
            alt={`${profileUsername} profile pic`}
            className="rounded-full h-40 w-40 flex"
          />
        ) : (
          <Skeleton width={160} height={160} circle={true} />
        )}
      </div>
      <div className="flex items-center flex-col col-span-2">
        <div className="container flex items-center">
          {profileUsername ? (
            <>
              <p className="text-2xl mr-4">{profileUsername}</p>
              {activeBtnFollow && (
                <button
                  type="button"
                  className={`${
                    isFollowingProfile ? 'bg-red-primary' : 'bg-blue-medium'
                  } font-bold text-sm rounded text-white w-20 h-8 shadow-md transition-colors`}
                  onClick={handleToggleFollowBtn}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') handleToggleFollowBtn();
                  }}
                >
                  {isFollowingProfile ? 'Unfollow' : 'Follow'}
                </button>
              )}
            </>
          ) : (
            <Skeleton width={140} height={32} />
          )}
        </div>
        <div className="container flex mt-4">
          {!followers || !following ? (
            <Skeleton count={1} height={24} width={677} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span>
                {` `}
                Photos
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? 'Follower' : 'Followers'}
              </p>
              <p className="mr-10">
                <span className="font-bold">{following?.length}</span>
                {` `}
                Following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!fullName ? (
              <Skeleton count={1} width={50} height={24} />
            ) : (
              fullName
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
    fullName: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
  }).isRequired,
};

export default Header;
