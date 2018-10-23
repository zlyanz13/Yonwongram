import React, {Component} from 'react';
import Feed from './presenter';
import PropTypes from 'prop-types';

class Container extends Component {
  state = {
    loading: true,
  };

  static propTypes = {
    getFeed: PropTypes.func.isRequired,
  };

  componentDidMount () {
    const {getFeed} = this.props;
    if(!this.props.feed){
        getFeed();
    }
    else{
        this.setState({
            loading: false
        })
    }
  }
  
  componentWillReceiveProps = (nextProps) => {
      if(nextProps.feed){
          this.setState({
              loading : false
          })
      }
  }

  render () {
      const {feed} = this.props;
    return <Feed {...this.state} feed={feed}/>;
  }
}

export default Container;
