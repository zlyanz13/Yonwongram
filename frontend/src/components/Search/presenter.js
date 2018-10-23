import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';
import UserRow from 'components/UserRow';

const Search = props => {
  return (
    <div className={styles.search}>
      {props.loading && <Loading />}
      <div className={styles.section}>
        {!props.loading && <h4 className={styles.title}>Users</h4>}
        {!props.loading &&
          props.userList.length < 1 &&
          <NotFound text={'Nothing Found :('} />}
        <div className={styles.content}>
          {!props.loading &&
            props.userList.length > 0 &&
            <RenderUserSearch userList={props.userList} />}
        </div>
      </div>
      <div className={styles.section}>
        {!props.loading && <h4 className={styles.title}>Photos</h4>}
        {!props.loading &&
          props.imageList.length < 1 &&
          <NotFound text={'Nothing Found :('} />}
        <div className={styles.content}>
          {!props.loading &&
            props.imageList.length > 0 &&
            <RenderImageSearch imageList={props.imageList} />}
        </div>
      </div>
    </div>
  );
};

const RenderUserSearch = props =>
  props.userList.map (user => <UserRow vertical={true} user={user} key={user.id} />);

const RenderImageSearch = props => props.imageList.map(photo => photo.caption)

const NotFound = props => <span className={styles.NotFound}>{props.text}</span>;

Search.propTypes = {
  loading: PropTypes.bool.isRequired,
  userList: PropTypes.array,
  imageList: PropTypes.array,
};

export default Search;
