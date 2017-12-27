import axios from 'axios';
import config from '../config';

export const SUBMIT_IDEA = 'SUBMIT_IDEA';
const FETCH_IDEAS_IN_PROGRESS = 'FETCH_IDEAS_IN_PROGRESS';
const FETCH_IDEAS_SUCCESS = 'FETCH_IDEAS_SUCCESS';
const FETCH_IDEAS_FAILURE = 'FETCH_IDEAS_FAILURE';

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
    tags: [],
  }],
  loading: false,
  fetched: false,
};

export default function reducer(state = initialState, action = {}) {
  console.log(action.type);
  switch (action.type) {
    case SUBMIT_IDEA:
      return {
        ...state,
        ideas: state.ideas.concat(action.idea),
      };
    case FETCH_IDEAS_IN_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_IDEAS_SUCCESS:
      console.log(action.ideas);
      return {
        ...state,
        loading: false,
        fetched: true,
        ideas: state.ideas.concat(action.ideas),
      };
    case FETCH_IDEAS_FAILURE:
      return {
        ...state,
        loading: false,
        fetched: false,
      };
    default: return state;
  }
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

export function fetchIdeas() {
  return dispatch => {
    dispatch({ type: FETCH_IDEAS_IN_PROGRESS });

    return axios.get(`${config.BACKEND_URL}/ideas`)
      .then((res) =>
        dispatch({
          type: FETCH_IDEAS_SUCCESS,
          ideas: res.data,
        }))
      .catch((err) => {
        console.log(err);
        dispatch({
          type: FETCH_IDEAS_FAILURE,
        });
      });
  };
}