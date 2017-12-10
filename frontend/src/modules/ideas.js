import axios from 'axios';
import config from '../config';

console.log(config);

const SUBMIT_IDEA = 'SUBMIT_IDEA';
const GET_IDEAS_IN_PROGRESS = 'GET_IDEAS_IN_PROGRESS';
const GET_IDEAS_SUCCESS = 'GET_IDEAS_SUCCESS';
const GET_IDEAS_FAILURE = 'GET_IDEAS_FAILURE';

const initialState = {
  ideas: [{
    ready: false,
    type: {},
    text: 'perkele',
    tags: ''
  }],
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
    dispatch({
      type: SUBMIT_IDEA,
      idea,
    });

    return axios(axiosConfig).catch(err => { console.log(err); });
  };
}

export function getIdeas() {
  console.log(1);
  return (dispatch, getState) => {
    console.log(2);
    dispatch({ type: GET_IDEAS_IN_PROGRESS });
    return axios.get(`${config.BACKEND_URL}/ideas`)
      .then((res) => {
        console.log('mter');
        dispatch({
          type: GET_IDEAS_SUCCESS,
          ideas: res.data,
        });
      })
      .catch((err) => {
        console.log('mroo');
        dispatch({
          type: GET_IDEAS_FAILURE,
        });
      });
  };
}