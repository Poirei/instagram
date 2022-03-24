import PropTypes from 'prop-types';

function Photos({ photos }) {
  return <div>Photos</div>;
}

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
};

export default Photos;
