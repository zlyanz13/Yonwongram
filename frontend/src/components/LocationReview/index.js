import Container from './container';
import { connect } from 'react-redux';
import { actionCreators as locationActions } from 'redux/modules/locations';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { locations: { reviewList, locationInfo } } = state;
    return {
        locationInfo, reviewList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { match: { params: { locationId } } } = ownProps;
    return {
        locationId,
        searchLocationReview: () => {
            dispatch(locationActions.searchLocationReview(locationId));
        },
        searchStation: (stationName) => {
            dispatch(push(`/station/${stationName}`))
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
