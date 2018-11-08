import React from 'react';
import PropTypes from 'prop-types';
import Ionicon from 'react-ionicons';
import styles from './styles.scss';
import StarRatings from 'react-star-ratings';

const PhotoActions = (props, context) => (
  <div className={styles.actions}>
    <div className={styles.icons}>
      <span className={styles.stars}>
        <StarRatings
          rating={props.starPoint}
          starRatedColor="#FFB12F"
          starHoverColor="#FFB12F"
          numberOfStars={5}
          starDimension="28px"
          starSpacing="0"
          name="rating"
        />
      </span>
      <div className={styles.likeBox}>
      <span className={styles.likes} onClick={props.openLikes}>
        {props.number}{' '}
        {props.number <= 1 ? context.t('like') : context.t('likes')}
      </span>
      <span className={styles.icon} onClick={props.handleHeartClick}>
        {props.isLiked
          ? <Ionicon icon="md-heart" fontSize="28px" color="#EB4B59" />
          : <Ionicon icon="md-heart-outline" fontSize="28px" color="#EB4B59" />}
      </span>
      </div>
    </div>

  </div>
);

PhotoActions.contextTypes = {
  t: PropTypes.func.isRequired,
};

PhotoActions.propTypes = {
  number: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  photoId: PropTypes.number.isRequired,
  handleHeartClick: PropTypes.func.isRequired,
  openLikes: PropTypes.func.isRequired,
  starPoint : PropTypes.number.isRequired,
};

export default PhotoActions;
