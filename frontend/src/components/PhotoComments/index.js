import React, {Component} from 'react';
import styles from './styles.scss';
import PropTypes from 'prop-types';
import Ionicon from 'react-ionicons';
import {actionCreators as photoActions} from 'redux/modules/photos';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteComment: commentId => {
      dispatch (photoActions.deletePhotoComment (ownProps.photoId,commentId));
    },
  };
};

const PhotoComments = props => (
  <div className={styles.comments}>
    <ul>
      <CreatorComment username={props.creator} comment={props.caption} />
      {props.comments.map (comment => (
        <Comment
          deleteComment = {props.deleteComment}
          username={comment.creator.username}
          comment={comment.message}
          commentId={comment.id}
          key={comment.id}
        />
      ))}
    </ul>
  </div>
);

//onMouseEnter && <div>Hovering right meow!</div>}
const CreatorComment = props => (
  <li className={styles.comment}>
    <span className={styles.username}>{props.username}</span>
    <span className={styles.message}>{props.comment}</span>
  </li>
);

class Comment extends Component {
  /*
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.state = {
      isHovering: false,
    };
  }
*/
  state = {isHovering: false};
  handleMouseHover = () => {
    this.setState ({isHovering: true});
  };

  handleMouseLeave = () => {
    this.setState ({isHovering: false});
  };

  _deleteComment = dispatch => {
    console.log ('Delete Comment');
    const {commentId, deleteComment} = this.props;

    deleteComment (commentId);
  };

  render () {
    return (
      <li
        className={styles.comment}
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseLeave}
      >
        <span className={styles.username}>{this.props.username}</span>
        <span className={styles.message}>{this.props.comment}</span>
        {this.state.isHovering &&
          <span className={styles.xbox} onClick={this._deleteComment}>
            <Ionicon icon="md-close" fontSize="16px" color="black" />
          </span>}
      </li>
    );
  }
}

PhotoComments.propTypes = {
  caption: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
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
};

export default connect (null, mapDispatchToProps) (PhotoComments);
