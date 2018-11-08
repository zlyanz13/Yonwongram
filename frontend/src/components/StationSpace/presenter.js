import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';
import StationCircle from 'components/StationCircle';
import LocationDisplay from 'components/LocationDisplay'

const StationSpace = props => {
  return (
    <div className={styles.container}>
      {props.loading
        ? <div className={styles.loading}>
            <Loading />
          </div>
        : <div className={styles.station}>
            <div className={styles.stationInfo}>
              <span className={styles.circle}>
                {props.lines.map (line => (
                  <StationCircle
                    line={line.line_num}
                    big={true}
                    key={line.id}
                  />
                ))}
              </span>
              <span className={styles.stationName}>{props.stationName}</span>
            </div>
            <div className={styles.locationContainer}>
              {props.locationList.map (location => (
                <LocationDisplay
                  key={location.id}
                  location={location}
                />
              ))}
            </div>
          </div>}
    </div>
  );
};



StationSpace.propTypes = {
  stationName: PropTypes.string.isRequired,
  lines: PropTypes.arrayOf (
    PropTypes.shape ({
      id: PropTypes.number.isRequired,
      line_num: PropTypes.string.isRequired,
    })
  ),
  locationList: PropTypes.arrayOf (
    PropTypes.shape ({
      id: PropTypes.number.isRequired,
      station: PropTypes.shape.isRequired,
      name: PropTypes.string.isRequired,
      starpoint_avg: PropTypes.number.isRequired,
      image: PropTypes.string,
    })
  ),
};

export default StationSpace;
