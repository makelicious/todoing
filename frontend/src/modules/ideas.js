import axios from 'axios';
import config from '../config';

console.log(config);

const SUBMIT_IDEA = 'SUBMIT_IDEA';

const initialState = {
  ideas: [{
    ready: false,
    type: [],
    text: 'perkele',
    tags: ''
  }],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SUBMIT_IDEA:
      return {
        ideas: [...state.ideas, action.idea]
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

// function saveIdea(idea) {
//   return {
//     type: SUBMIT_IDEA,
//     idea,
//   };
// }

// export function fetchIdeas() {
//   return {
//     type: FETCH_IDEAS,
//     ideas: 'foo',
//   };
// }