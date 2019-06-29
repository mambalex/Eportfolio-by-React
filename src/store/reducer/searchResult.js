import { updateObject } from '../../utility/utility';

const initialState = {
  hasErrored: false,
  isLoading: false,
  allJobs: false,
  allCans: false,
  jobInfo: false,
  canInfo: false,
  searchOrHome: 'Search',
};

const fetchStart = state => updateObject(state, { isLoading: true });


const fetchFail = state => updateObject(state, {
  hasErrored: true,
  isLoading: false,
});

const searchJobsSuccess = (state, action) => updateObject(state, {
  isLoading: false,
  allCans: false,
  allJobs: action.data,
});


const searchCansSuccess = (state, action) => updateObject(state, {
  isLoading: false,
  allJobs: false,
  allCans: action.data,
});


const showCan = (state, action) => updateObject(state, {
  canInfo: action.canInfo,
});

const showJob = (state, action) => updateObject(state, {
  jobInfo: action.jobInfo,
});


const toggleHomeSearch = (state) => {
  if (state.searchOrHome === 'Search') {
    return updateObject(state, {
      searchOrHome: 'Home',
      allJobs: false,
      allCans: false,
    });
  }
  return updateObject(state, { searchOrHome: 'Search' });
};


const searchResult = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH JOB SUCCESS': return searchJobsSuccess(state, action);
    case 'SEARCH CAN SUCCESS': return searchCansSuccess(state, action);
    case 'SEARCH_DATA_HAS_ERRORED': return fetchFail(state, action);
    case 'SEARCH_DATA_IS_LOADING': return fetchStart(state, action);
    case 'SHOW SEARCH CAN': return showCan(state, action);
    case 'SHOW SEARCH JOB': return showJob(state, action);
    case 'TOGGLE HOME SEARCH': return toggleHomeSearch(state, action);
    default: return state;
  }
};

export default searchResult;
