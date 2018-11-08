// imports

import {actionCreators as userActions} from 'redux/modules/user';

// actions

const SET_STATION = 'SET_STATION';
const SET_LOCATION_REVIEW = 'SET_LOCATION_REVIEW';

// action creators

function setStation (lines, locationList) {
  return {
    type: SET_STATION,
    lines,
    locationList,
  };
}

function setLocationReview (locationInfo, reviewList) {
  return {
    type: SET_LOCATION_REVIEW,
    locationInfo,
    reviewList,
  };
}

// API Actions

function searchStation (stationName) {
  return async (dispatch, getState) => {
    const {user: {token}} = getState ();
    const stationLines = await getLine (token, stationName);
    const locationList = await getStationLocation (token, stationName);

    if (stationLines === 401 || locationList === 401) {
      dispatch (userActions.logout ());
    }
    dispatch (setStation (stationLines, locationList));
  };
}

function getLine (token, stationName) {
  return fetch(`/locations/station/${stationName}/lines/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  }).then(response => {
    if (response.status === 401) {
      return 401;
    }
    return response.json();
  });
}

function getStationLocation (token, stationName) {
  return fetch (`/locations/station/${stationName}/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  }).then (response => {
    if (response.status === 401) {
      return 401;
    }
    return response.json ();
  });
}

function searchLocationReview (locationId) {
  return async (dispatch, getState) => {
    const {user: {token}} = getState ();

    const locationInfo = await getLocationInfo (token, locationId);
    const reviewList = await getLocationReview (token, locationId);
    if (locationInfo === 401 || reviewList === 401) {
      dispatch (userActions.logout ());
    }
    dispatch (setLocationReview (locationInfo, reviewList));
  };
}

function getLocationInfo (token, locationId) {
  return fetch (`/locations/${locationId}/info/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })
    .then (response => {
      if (response.status === 401) {
        return 401;
      }
      return response.json ();
    })
    .then (json => json);
}

function getLocationReview (token, locationId) {
  return fetch (`/locations/${locationId}/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })
    .then (response => {
      if (response.status === 401) {
        return 401;
      }
      return response.json ();
    })
    .then (json => json);
}

// initial state

const initialState = {};

// reducer

function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_STATION:
      return applySetStation (state, action);
    case SET_LOCATION_REVIEW:
      return applySetLocationReview (state, action);

    default:
      return state;
  }
}

// reducer functions
function applySetStation (state, action) {
  const {lines, locationList} = action;
  return {
    ...state,
    lines,
    locationList,
  };
}

function applySetLocationReview (state, action) {
  const {locationInfo, reviewList} = action;
  return {
    ...state,
    locationInfo,
    reviewList,
  };
}

// exports

const actionCreators = {
  searchStation,
  searchLocationReview,
};

export {actionCreators};

// default reducer export

export default reducer;
