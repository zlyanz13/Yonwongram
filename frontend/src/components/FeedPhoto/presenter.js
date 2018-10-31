import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import PhotoActions from 'components/PhotoActions';
import PhotoComments from 'components/PhotoComments';
import TimeStamp from 'components/TimeStamp';
import CommentBox from 'components/CommentBox';
import UserList from 'components/UserList';
import StationCircle from '../StationCircle';

const FeedPhoto = (props, context) => {
  return (
    <div className={styles.feedPhoto}>
      <header className={styles.header}>
        <img
          src={props.creator.profile_image || require ('images/noPhoto.png')}
          alt={props.creator.username}
          className={styles.profilePhoto}
        />
        <div className={styles.headerColumn}>
          <span className={styles.creator}>{props.creator.username}</span>
          <span className={styles.location}>
            {props.location.station.lines.map(line => (<StationCircle key={line.line_num} line={line.line_num}/>))} {props.location.station.station_nm} 
          </span>
          <span className={styles.location}>
            {props.location.name} - {props.location.starpoint_avg}
          </span>
        </div>
      </header>

      <img src={props.file} alt={props.caption} className={styles.realPhoto} />

      <div className={styles.meta}>
        <PhotoActions
          number={props.like_count}
          isLiked={props.is_liked}
          photoId={props.id}
          openLikes={props.openLikes}
          starPoint={props.stars}
        />
        <PhotoComments
          caption={props.caption}
          creator={props.creator.username}
          comments={props.comments}
          photoId={props.id}
        />
        <TimeStamp time={props.natural_time} />
        <CommentBox photoId={props.id} />
      </div>
      {props.seeingLikes &&
        <UserList title={context.t ('Likes')} closeLikes={props.closeLikes} />}
    </div>
  );
};

FeedPhoto.propTypes = {
  id: PropTypes.number.isRequired,
  creator: PropTypes.shape ({
    profile_image: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,

  location: PropTypes.shape ({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    starpoint_avg: PropTypes.number.isRequired,
    station: PropTypes.shape ({
      id: PropTypes.number.isRequired,
      station_nm: PropTypes.string.isRequired,
      lines: PropTypes.arrayOf (
        PropTypes.shape ({line_num: PropTypes.string.isRequired})
      ),
    }),
  }).isRequired,
  file: PropTypes.string.isRequired,
  like_count: PropTypes.number.isRequired,
  caption: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,

  comments: PropTypes.arrayOf (
    PropTypes.shape ({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      creator: PropTypes.shape ({
        profile_image: PropTypes.string,
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,

  natural_time: PropTypes.string.isRequired,
  is_liked: PropTypes.bool.isRequired,
  seeingLikes: PropTypes.bool.isRequired,
  openLikes: PropTypes.func.isRequired,
  closeLikes: PropTypes.func.isRequired,
  userList: PropTypes.arrayOf (
    PropTypes.shape ({
      profile_image: PropTypes.string,
      username: PropTypes.string.isRequired,
      name: PropTypes.string,
    }).isRequired
  ),
};
FeedPhoto.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default FeedPhoto;
