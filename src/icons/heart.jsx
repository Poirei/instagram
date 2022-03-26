import PropTypes from 'prop-types';

export const HeartIcon = ({
  toggleLiked,
  handleToggleLiked,
  marginRight = 4,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={0.6}
      tabIndex={0}
      className={`w-8 mr-${marginRight} select-none outline-none cursor-pointer transition-colors ${
        toggleLiked ? 'fill-red text-red-primary' : 'text-black-light'
      }`}
      onClick={handleToggleLiked}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleToggleLiked();
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
};

HeartIcon.propTypes = {
  toggleLiked: PropTypes.bool,
  handleToggleLiked: PropTypes.func,
  marginRight: PropTypes.number,
};
