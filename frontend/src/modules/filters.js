import _ from 'lodash';

const FILTER_IDEAS_BY_TAG = 'FILTER_IDEAS_BY_TAG';
const FILTER_IDEAS_BY_TYPE = 'FILTER_IDEAS_BY_TYPE';
const RESET_FILTERS = 'RESET_FILTERS';

const initialState = {
  type: {
    done: false,
    how: false,
    what: false,
    when: false,
    why: false,
  },
  tags: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FILTER_IDEAS_BY_TYPE:
      return {
        ...state,
        type: {
          ...state.type,
          [action.filterType]: !state.type[action.filterType],
        }
      };
    case FILTER_IDEAS_BY_TAG:
      return {
        ...state,
        tags: updateFilterTags(state.tags, action.tag),
      };
    case RESET_FILTERS:
      return state;
    default: return state;
  }
}

export function filterByType(type) {
  return {
    type: FILTER_IDEAS_BY_TYPE,
    filterType: type,
  };
}

export function filterByTag(tag) {
  return {
    type: FILTER_IDEAS_BY_TAG,
    tag,
  };
}

function updateFilterTags(oldTags, newTag) {
  return oldTags.length > 0
    ? _.reject(oldTags, (tag => tag === newTag)).length === oldTags.length
      ? oldTags.concat(newTag)
      : _.reject(oldTags, (tag => tag === newTag))
    : [newTag];
}