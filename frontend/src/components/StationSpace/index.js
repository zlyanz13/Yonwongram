import Container from './container';
import { connect } from 'react-redux';
import { actionCreators as locationActions } from 'redux/modules/locations';


const mapStateToProps = (state, ownProps) => {
    const { locations : {locationList, lines}} = state;
    return {
        locationList, lines
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { match: { params: { stationName } } } = ownProps;

    return {
        stationName,
        searchStation: () => {
            dispatch(locationActions.searchStation(stationName));
        },
        
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
