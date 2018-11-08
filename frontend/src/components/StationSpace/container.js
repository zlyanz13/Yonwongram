import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LocationReview from './presenter';

class Container extends Component {
  state = {
    loading: true,
  };

  static propTypes = {
    stationName: PropTypes.string.isRequired
  };
 
  componentDidMount () {
    const {searchStation} = this.props;
    searchStation ();
  }
/*
  componentDidUpdate = (prevProps, prevState) => {
    console.log("did update")
    const {searchStation, stationName} = this.props;
    if (prevProps.match.params !== this.props.match.params) {
      searchStation (stationName);
    }
  };
*/
  componentWillReceiveProps (nextProps) {
    if (nextProps.locationList) {
      this.setState ({
        loading: false,
      });
    }
  }
  render() {
    return <LocationReview {...this.state} {...this.props} />;
  }
}

export default Container;
