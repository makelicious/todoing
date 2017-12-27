const FILTER_IDEAS_BY_TAG = 'FILTER_IDEAS_BY_TAG';
const FILTER_IDEAS_BY_TYPE = 'FILTER_IDEAS_BY_TYPE';
const RESET_FILTERS = 'RESET_FILTERS';


const initialState = {
  type: {
    todo: false,
    done: false,
    when: false,
    what: false,
    why: false,
    how: false
  },
  tags: [],
};

export default function reducer(state = initialState, action = {}) {
  console.log(action.type);
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
      return state;
    case RESET_FILTERS:
      return state;
    default: return state;
  }
}


export function filterBy(type) {
  return {
    type: FILTER_IDEAS_BY_TYPE,
    filterType: type,
  };
}
