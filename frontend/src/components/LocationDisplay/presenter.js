import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import StarRatings from 'react-star-ratings';

const LocationDisplay = props => {
  return (
    <div className={styles.locationCard} onClick={props.goLocation}>
      <div className={styles.profileBackground}>
        <img
          src={props.image || require ('images/noLocation.png')}
          alt={props.name}
          className={styles.profileImage}
        />

      </div>
      <div className={styles.locationName}>
        {props.name}
      </div>
      <span className={styles.evaluated}>
        evaluated By
        {' '}
        {props.starpoint_count}
        {props.starpoint_count > 1 ? <span>{' users'}</span> : <span>{' user'}</span>}
      </span>
      <div className={styles.starrating}>
        <StarRatings
          rating={props.starpoint_avg}
          starRatedColor="#FFB12F"
          starHoverColor="#FFB12F"
          numberOfStars={5}
          starDimension="30px"
          starSpacing="0"
          name="rating"
        />
      </div>
    </div>
  );
};

LocationDisplay.propTypes = {
  id: PropTypes.number.isRequired,
  station: PropTypes.shape ({}).isRequired,
  name: PropTypes.string.isRequired,
  starpoint_avg: PropTypes.number.isRequired,
  image: PropTypes.string,
  starpoint_count: PropTypes.number.isRequired,
};
export default LocationDisplay;
