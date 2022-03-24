import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import UserContext from '../../context/user';
import FirebaseContext from '../../context/firebase';
import { ChatIcon, HeartIcon } from '../../icons';

function Actions({ docId, totalLikes, likedPhoto, handleFocus }) {
  const {
    user: { uid: userId = '' },
  } = useContext(UserContext);
  const [toggleLiked, setToggleLiked] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);
  const { firebase, FieldValue } = useContext(FirebaseContext);

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);

    await firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        likes: toggleLiked
          ? FieldValue.arrayRemove(userId)
          : FieldValue.arrayUnion(userId),
      });

    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex">
          <HeartIcon
            toggleLiked={toggleLiked}
            handleToggleLiked={handleToggleLiked}
          />
          <ChatIcon handleFocus={handleFocus} />
        </div>
      </div>
      <div className="p-4 py-0">
        <p className="font-medium">
          {likes}
          {likes === 1 ? ' like' : ' likes'}
        </p>
      </div>
    </>
  );
}

Actions.propTypes = {
  docId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  likedPhoto: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func.isRequired,
};

export default Actions;
