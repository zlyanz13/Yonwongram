import Container from './container';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        searchLocation: (locationId) => {
            dispatch(push(`/location/${locationId}`))
        }
    }
};

export default connect(null, mapDispatchToProps)(Container);
