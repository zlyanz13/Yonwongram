import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LocationReview from './presenter';

class Container extends Component {
  state = {
    loading: true,
  };

  static propTypes = {
    //stationName: PropTypes.string.isRequired
    searchStation: PropTypes.func.isRequired,
    searchLocationReview: PropTypes.func.isRequired,
  };

  componentDidMount () {
    const {searchLocationReview} = this.props;
    searchLocationReview ();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.reviewList) {
      this.setState ({
        loading: false,
      });
    }
  }

  render () {
    return (
      <LocationReview
        {...this.state}
        {...this.props}
        searchStation={this._searchStation}
      />
    );
  }

  _searchStation = ()=> {
    const {locationInfo: {station: {station_nm}}, searchStation} = this.props;
    searchStation (station_nm);
  }
}

export default Container;
