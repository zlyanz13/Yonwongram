import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';
import StarRatings from 'react-star-ratings';
import StationCircle from 'components/StationCircle';
import ReviewDisplay from 'components/ReviewDisplay';

const LocationReview = props => {
  return (
    <div className={styles.container}>
      {props.loading
        ? <div className={styles.loading}><Loading /></div>
        : <div className={styles.reviewContainer}>
            <div className={styles.title}>
              <div className={styles.locationContainer}>
                <span className={styles.locationName}>
                  {props.locationInfo.name}
                </span>

                <div className={styles.ratings}>
                  <div className={styles.starrating}>
                    <StarRatings
                      rating={props.locationInfo.starpoint_avg}
                      starRatedColor="#FFB12F"
                      numberOfStars={5}
                      starDimension="25px"
                      starSpacing="0"
                      name="rating"
                    />
                  </div>
                  <span className={styles.eval}>
                    {'★'}{props.locationInfo.starpoint_avg}
                    {' evaluated by '}{props.locationInfo.starpoint_count}{' '}
                    {props.locationInfo.starpoint_count > 1
                      ? ' users'
                      : ' user'}
                  </span>
                </div>
              </div>
              <div className={styles.stationContainer}>
                <div className={styles.station} onClick={props.searchStation}>
                  {props.locationInfo.station.lines.map (line => (
                    <StationCircle
                      key={line.line_num}
                      line={line.line_num}
                      big={false}
                      middle={true}
                    />
                  ))}
                  <span className={styles.stationName}>
                    {props.locationInfo.station.station_nm}
                  </span>
                </div>
              </div>
            </div>

            <div>
              {props.reviewList.map (review => (
                <span key={review.id}><ReviewDisplay {...review} /></span>
              ))}
            </div>
          </div>}
    </div>
  );
};

LocationReview.propTypes = {
  locationInfo: PropTypes.shape ({
    id: PropTypes.number,
    name: PropTypes.string,
    starpoint_avg: PropTypes.number,
    image: PropTypes.string,
    station: PropTypes.shape ({
      station_nm: PropTypes.string.isRequired,
      lines: PropTypes.arrayOf (
        PropTypes.shape ({
          line_num: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }),
  reviewList: PropTypes.arrayOf (
    PropTypes.shape ({
      id: PropTypes.number,
      creator: PropTypes.shape ({
        username: PropTypes.string,
        profile_image: PropTypes.string,
      }),
      file: PropTypes.string,
      caption: PropTypes.string,
      stars: PropTypes.number,
    })
  ),
  searchStation: PropTypes.func.isRequired,
};

export default LocationReview;
