import axios from 'axios';
import config from '../config';

const SUBMIT_IDEA = 'SUBMIT_IDEA';
const FILTER_IDEAS = 'FILTER_IDEAS';
const GET_IDEAS_IN_PROGRESS = 'GET_IDEAS_IN_PROGRESS';
const GET_IDEAS_SUCCESS = 'GET_IDEAS_SUCCESS';
const GET_IDEAS_FAILURE = 'GET_IDEAS_FAILURE';

const initialState = {
  ideas: [{
    type: {
      todo: false,
      done: false,
      when: false,
      what: false,
      why: false,
      how: false
    },
    text: 'perkele',
    tags: ''
  }],
  filters: {
    todo: false,
    done: false,
    when: false,
    what: false,
    why: false,
    how: false
  },
  loading: false,
  gotIdeas: false,
};

export default function reducer(state = initialState, action = {}) {
  console.log(action.type);
  switch (action.type) {
    case SUBMIT_IDEA:
      return {
        ...state,
        ideas: state.ideas.concat(action.idea),
      };
    case GET_IDEAS_IN_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case GET_IDEAS_SUCCESS:
      console.log(action.ideas);
      return {
        ...state,
        loading: false,
        gotIdeas: true,
        ideas: state.ideas.concat(action.ideas),
      };
    case GET_IDEAS_FAILURE:
      return {
        ...state,
        loading: false,
        gotIdeas: false,
      };
    case FILTER_IDEAS:
      console.log(action);
      console.log(state.filters);
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.filterType]: !state.filters[action.filterType],
        }
      };
    default: return state;
  }
}

export function filterBy(type) {
  return {
    type: FILTER_IDEAS,
    filterType: type,
  };
}

export function submitIdea(idea) {
  const axiosConfig = {
    method: 'post',
    url: `${config.BACKEND_URL}/ideas`,
    data: idea,
  };

  return dispatch => {
    return axios(axiosConfig)
      .then((res) =>
        dispatch({
          type: SUBMIT_IDEA,
          idea: res.data,
        })).catch(err => { console.log(err); });
  };
}

export function getIdeas() {
  return (dispatch, getState) => {
    dispatch({ type: GET_IDEAS_IN_PROGRESS });
    return axios.get(`${config.BACKEND_URL}/ideas`)
      .then((res) =>
        dispatch({
          type: GET_IDEAS_SUCCESS,
          ideas: res.data,
        }))
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_IDEAS_FAILURE,
        });
      });
  };
}