import { updateObject } from '../../utility/utility';

const initialState = {
  allData: null,
  canData: null,
  navData: {
    'Saved Jobs': 0,
    Candidates: 0,
    Interviews: 0,
  },
  hasErrored: false,
  isLoading: false,
  newJob: false,
  jobInfo: {},
  canInfo: {},
};

const fetchStart = state => updateObject(state, { isLoading: true });

const fetchSuccess = (state, action) => {
  const data = {
    'Saved candidate': action.data.saved_user_list,
    Recommeded: [],
    'First interview': [],
    Test: [],
    '2nd interview': [],
    'Got offer': [],
    Engaged: [],
  };

  action.data.open_job_list.forEach((job) => {
    if (job.recommendation_list.length > 0) {
      data.Recommeded = data.Recommeded.concat(job.recommendation_list);
    }
    if (job.first_interview_list.length > 0) { data['First interview'] = data['First interview'].concat(job.first_interview_list); }
    if (job.test_list.length > 0) { data.Test = data.Test.concat(job.test_list); }
    if (job.second_interview_list.length > 0) { data['2nd interview'] = data['2nd interview'].concat(job.second_interview_list); }
    if (job.offer_list.length > 0) { data['Got offer'] = data['Got offer'].concat(job.offer_list); }
    if (job.engaged_list.length > 0) { data.Engaged = data.Engaged.concat(job.engaged_list); }
  });
  const allCans = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key in data) {
    if (data[key].length > 0) {
      data[key].forEach((can) => {
        allCans[can.username] = can;
      });
    }
  }

  data.allCans = allCans;
  const numOfJobs = action.data.open_job_list.length;
  const numOfInterviews = data['First interview'].length + data['2nd interview'].length;
  const numOfCans = data.Recommeded.length + data['Saved candidate'].length + data.Test.length + data['Got offer'].length + data.Engaged.length;

  return updateObject(state, {
    allData: action.data,
    canData: data,
    navData: {
      'Saved Jobs': numOfJobs,
      Candidates: numOfCans,
      Interviews: numOfInterviews,
    },
    hasErrored: null,
    isLoading: false,
  });
};

const fetchFail = state => updateObject(state, {
  hasErrored: true,
  isLoading: false,
});

const addJob = state => updateObject(state, {
  newJob: true,
});

const cancelNewJob = state => updateObject(state, {
  newJob: false,
});

const showJobInfo = (state, action) => {
  const jobInfo = { ...action.jobInfo };
  jobInfo.top = action.top;
  return updateObject(state, {
    jobInfo,
  });
};

const cancelJobInfo = state => updateObject(state, {
  jobInfo: false,
});

const deleteJobSuccess = state => updateObject(state, {
  jobInfo: false,
});

const showCanInfo = (state, action) => {
  const canInfo = { ...action.canInfo };
  canInfo.top = action.top;
  canInfo.jobState = action.jobState;
  return updateObject(state, {
    canInfo,
  });
};

const cancelCanInfo = state => updateObject(state, {
  canInfo: false,
});


const employer = (state = initialState, action) => {
  switch (action.type) {
    case 'EMPLOYER_FETCH_DATA_SUCCESS EMPLOYER': return fetchSuccess(state, action);
    case 'DATA_HAS_ERRORED EMPLOYER': return fetchFail(state, action);
    case 'DATA_IS_LOADING EMPLOYER': return fetchStart(state, action);
    case 'ADD JOB EMPLOYER': return addJob(state, action);
    case 'CANCEL NEW JOB EMPLOYER': return cancelNewJob(state, action);
    case 'SHOW JOB INFO EMPLOYER': return showJobInfo(state, action);
    case 'CANCEL JOB INFO EMPLOYER': return cancelJobInfo(state, action);
    case 'CANCEL CAN INFO EMPLOYER': return cancelCanInfo(state, action);
    case 'DELETE JOB SUCCESS EMPLOYER': return deleteJobSuccess(state, action);
    case 'SHOW CAN INFO EMPLOYER': return showCanInfo(state, action);
    default: return state;
  }
};

export default employer;
