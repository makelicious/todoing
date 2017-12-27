import axios from 'axios';
import config from '../config';
import _ from 'lodash';
import { SUBMIT_IDEA } from './ideas';

const initialState = {
  tags: [],
  loading: false,
  fetched: false,
};

const FETCH_TAGS_IN_PROGRESS = 'FETCH_TAGS_IN_PROGRESS';
const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
const FETCH_TAGS_FAILURE = 'FETCH_TAGS_FAILURE';


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_TAGS_IN_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TAGS_SUCCESS:
      return {
        tags: action.tags,
        loading: false,
        fetched: true,
      };
    case FETCH_TAGS_FAILURE:
      return {
        ...state,
        loading: false,
        fetched: false,
      };
    case SUBMIT_IDEA:
      const { tags } = action.idea;
      return {
        ...state,
        tags: filterDuplicates(state.tags, tags),
      };
    default: return state;
  }
}


export function fetchTags() {
  return dispatch => {
    dispatch({ type: FETCH_TAGS_IN_PROGRESS });

    return axios.get(`${config.BACKEND_URL}/tags`)
      .then((res) =>
        dispatch({
          type: FETCH_TAGS_SUCCESS,
          tags: res.data,
        }))
      .catch((err) => {
        console.log(err);
        dispatch({
          type: FETCH_TAGS_FAILURE,
        });
      });
  };
}

function filterDuplicates(oldTags, newTags) {
  const newDistinctTags = _.reject(newTags, (tag => _.includes(oldTags, tag)));

  return oldTags.concat(newDistinctTags);
}
