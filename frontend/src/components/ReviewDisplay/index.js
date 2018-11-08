import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import StarRatings from 'react-star-ratings';

const ReviewDisplay = props => (
  <div className={styles.container}>
    <div className={styles.contents}>
      <div className={styles.head}>
        <div className={styles.profile}>
          <img
            src={props.creator.profile_image|| require('images/noPhoto.png')}
            alt={props.creator.username}
            className={styles.profileImage}
          />
          <span className={styles.username}>
            {props.creator.username}
          </span>
        </div>

        <div className={styles.starRating}>
          <StarRatings
            rating={props.stars}
            starRatedColor="#FFB12F"
            numberOfStars={5}
            starDimension="18px"
            starSpacing="0"
            name="rating"
          />
        </div>
      </div>
      <div className={styles.caption}>{props.caption}</div>
    </div>

    <img src={props.file} alt={props.caption} className={styles.postImage} />
  </div>
);

ReviewDisplay.propTypes = {
  id: PropTypes.number.isRequired,
  file: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
  creator: PropTypes.shape ({
    username: PropTypes.string.isRequired,
    profile_image: PropTypes.string,
  }),
};

export default ReviewDisplay;
