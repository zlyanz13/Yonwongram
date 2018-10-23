import React from 'react';
import PropTypes from 'prop-types';
import Ionicon from 'react-ionicons';
import styles from './styles.scss';
import {Link} from 'react-router-dom';

const Navigation = (props, context) => (
  <div className={styles.navigation}>
    <div className={styles.inner}>
      <div className={styles.column}>
        <Link to="/">
          <img
            src={require('images/logo_EB.png')}
            className={styles.logo}
            alt={context.t('Logo')}
          />
        </Link>
      </div>
      <div className={styles.column}>
        <div className={styles.navIcon}>
          <Link to="/subway">
            <Ionicon icon="md-subway" fontSize="28px" color="black" />
          </Link>
        </div>
        <div className={styles.navIcon}>
          <Link to="/explore">
            <Ionicon icon="md-at" fontSize="28px" color="black" />
          </Link>
        </div>
        <div className={styles.navIcon}>
          <Ionicon icon="md-hand" fontSize="28px" color="black" />
        </div>
        <div className={styles.navIcon}>
          <Link to="/profile">
            <Ionicon icon="md-happy" fontSize="28px" color="black" />
          </Link>
        </div>
      </div>
      <div className={styles.column}>
        <form onSubmit={props.onSubmit}>
          <input
            type="text"
            placeholder={'Search'}
            className={styles.searchInput}
            value = {props.value}
            onChange = {props.onInputChange}
          />
        </form>
      </div>
    </div>
  </div>
);

Navigation.contextTypes = {
  t: PropTypes.func.isRequired,
};

Navigation.propTypes = {
  onSubmit : PropTypes.func.isRequired,
  onInputChange : PropTypes.func.isRequired,
  value : PropTypes.string.isRequired,
}

export default Navigation;
