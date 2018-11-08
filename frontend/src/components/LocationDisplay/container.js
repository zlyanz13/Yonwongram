import React, {Component} from 'react';
import LocationDisplay from './presenter';

class Container extends Component {
  render () {
    return (
      <LocationDisplay
        {...this.state}
        {...this.props}
        {...this.props.location}
        goLocation={this._goLocation}
      />
    );
  }

  _goLocation = () => {
    const {location : {id}, searchLocation} = this.props;
    searchLocation(id);
  };
}

export default Container;
