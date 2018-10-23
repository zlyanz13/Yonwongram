import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const UserRow = props => (
  <div className={styles.userInfo}>
    <img
      src={props.user.profile_image || require ('images/noPhoto.png')}
      alt={props.caption}
      className={styles.profileImage}
    />
    <div className={styles.userName}>
      <span className={styles.userId}>{props.user.username}</span>
      <span className={styles.userNick}>{props.user.name}</span>
    </div>
    <button className={styles.button} onClick={props.handleClick}>
      {props.user.following ? 'Unfollow' : 'Follow'}
    </button>
  </div>
);

UserRow.propTypes = {
  user: PropTypes.shape ({
    id: PropTypes.number.isRequired,
    profile_image: PropTypes.string,
    username: PropTypes.string.isRequired,
    name: PropTypes.string,
    following: PropTypes.bool.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default UserRow;
