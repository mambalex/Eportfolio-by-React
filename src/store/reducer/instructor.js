import { updateObject } from '../../utility/utility';

const initialState = {
    allData:null,
    connectionList:null,
    navData:{
        'Saved Jobs': 0,
        'Candidates': 0,
        'Connections': 0
    },
    hasErrored: false,
    isLoading: false,
    jobInfo:false,
    canInfo:false,
    newCon:false
}

const fetchStart = ( state, action ) => {
    return updateObject( state, {  isLoading: true } );
};

const fetchSuccess = (state, action) => {
    var conList=[];
    var temp={};
    action.data['connection_list'].forEach((con)=>{
        if( con['student_id'] in temp && temp[con['student_id']]=== con['job_info_id'] ){return}
        else{
            temp[con['student_id']] = con['job_info_id'];
            conList.push(con)
        }
    });
    let numOfJobs =  action.data['saved_job_list'].length;
    let numOfConnections = conList.length;
    let numOfCans = action.data['saved_user_list'].length;
    return updateObject( state, {
        allData:action.data,
        connectionList:conList,
        navData:{
            'Saved Jobs': numOfJobs,
            'Candidates': numOfCans,
            'Connections': numOfConnections
        },
        hasErrored: null,
        isLoading: false
    } );
};

const fetchFail = (state, action) => {
    return updateObject( state, {
        hasErrored: true,
        isLoading: false
    });
};


const showJobInfo = (state, action) => {
    const jobInfo = {...action.jobInfo};
    jobInfo['top'] = action.top
    return updateObject(state, {
        jobInfo: jobInfo
    });
}

const cancelJobInfo = (state, action) => {
    return updateObject(state, {
        jobInfo: false
    });
}



const showCanInfo = (state, action) => {
    const canInfo = {...action.canInfo};
    canInfo['top'] = action.top;
    canInfo['jobState'] = action.jobState;
    return updateObject(state, {
        canInfo: canInfo
    });
}

const cancelCanInfo = (state, action) => {
    return updateObject(state, {
        canInfo: false
    });
}

const cancelNewCon = (state, action) => {
    return updateObject(state, {
        newCon: false
    });
}

const  showNewCon = (state, action) => {
    return updateObject(state, {
        newCon: true
    });
}


const instructor = (state=initialState, action) => {
    switch ( action.type ) {
        case "INSTRUCTOR_FETCH_DATA_SUCCESS INSTRUCTOR": return fetchSuccess(state,action);
        case "INSTRUCTOR_DATA_HAS_ERRORED INSTRUCTOR":return fetchFail(state,action);
        case "INSTRUCTOR_DATA_IS_LOADING INSTRUCTOR":return fetchStart(state,action);
        case "SHOW JOB INFO INSTRUCTOR":return showJobInfo(state,action);
        case "CANCEL JOB INFO INSTRUCTOR":return cancelJobInfo(state,action);
        case "CANCEL CAN INFO INSTRUCTOR":return cancelCanInfo(state,action);
        case "SHOW CAN INFO INSTRUCTOR":return showCanInfo(state,action);
        case "CANCEL NEW CON INSTRUCTOR":return cancelNewCon(state,action);
        case "SHOW NEW CON INSTRUCTOR":return showNewCon(state,action);
        default: return state;
    }
}

export default instructor;