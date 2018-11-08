import {connect} from 'react-redux';
import Container from './container';
import {actionCreators as userActions} from 'redux/modules/user';
import {push} from 'react-router-redux';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPhotoLikes: () => {
      dispatch (userActions.getPhotoLikes(ownProps.id));
    },
    searchStation: (stationName) => {
      dispatch(push(`/station/${stationName}`))
    },
    searchLocation: (locationId) =>{
      dispatch(push(`/location/${locationId}`))
    }
  };
};
export default connect (null, mapDispatchToProps) (Container);
