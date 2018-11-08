import React, {Component} from 'react';
import FeedPhoto from './presenter';

class Container extends Component {
  state = {
    seeingLikes: false,
  };
  render () {
    return (
      <FeedPhoto
        {...this.props}
        {...this.state}
        openLikes={this._openLikes}
        closeLikes={this._closeLikes}
        searchStation={this._searchStation}
        searchLocation={this._searchLocation}
      />
    );
  }
  _openLikes = () => {
    const {getPhotoLikes, likes} = this.props;
    this.setState ({
      seeingLikes: true,
    });
    if (!likes) {
      getPhotoLikes ();
    }
  };
  _closeLikes = () => {
    this.setState ({
      seeingLikes: false,
    });
  };
  _searchStation = () => {
    const {location: {station: {station_nm}}, searchStation} = this.props;
    searchStation (station_nm);
  };
  _searchLocation = () => {
    const {location: {id}, searchLocation} = this.props;
    searchLocation (id);
  };
}

export default Container;
