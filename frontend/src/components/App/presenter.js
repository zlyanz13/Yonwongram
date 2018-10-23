import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import './styles.scss';
import Footer from 'components/Footer';
import Auth from 'components/Auth';
import Navigation from 'components/Navigation';
import Feed from "components/Feed"
import Explore from 'components/Explore';
import Search from '../Search';


const App = props => [
  // Nav.
  props.isLoggedIn ? <Navigation key={1} /> : null,
  props.isLoggedIn ? <PrivateRoutes key={2} /> : <PublicRoutes key={2} />,
  <Footer key={3} />,
];

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired, // 필수
};

const PrivateRoutes = props => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route exact path="/explore" component={Explore} />
    <Route exact path="/search/:searchTerm" component={Search} />
    <Route exact path="/subway" render={() => 'subway'} />
    <Route exact path="/profile" render={() => 'profile'} />
  </Switch>
);

const PublicRoutes = props => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route exact path="/forgot" render={() => 'forgot'} />
  </Switch>
);

export default App;
