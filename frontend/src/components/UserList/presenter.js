import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';
import Ionicon from 'react-ionicons';
import UserRow from 'components/UserRow';

const UserList = props => (
  <div className={styles.container}>
    <div className={styles.box}>
      <header className={styles.header}>
        <h4 className={styles.title}>{props.title}</h4>
        <span onClick={props.closeLikes} className={styles.icon}>
          <Ionicon icon="md-close" fontSize="20px" color="black" />
        </span>
      </header>
      {props.loading
        ? <div className={styles.loading}>
            <Loading />
          </div>
        : <div className={styles.content}>
            {props.userList.map (user => (
                <UserRow user={user} key={user.id} />
            ))}
          </div>}
    </div>
  </div>
);

UserList.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  users: PropTypes.array,
  closeLikes: PropTypes.func.isRequired,
  userList: PropTypes.arrayOf (
    PropTypes.shape ({
      id: PropTypes.number.isRequired,
      profile_image: PropTypes.string,
      username: PropTypes.string.isRequired,
      name: PropTypes.string,
      following: PropTypes.bool.isRequired,
    }).isRequired
  ),
};

export default UserList;
