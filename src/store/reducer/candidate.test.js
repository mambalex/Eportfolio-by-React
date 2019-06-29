import reducer from './candidate';


describe('candidate reducer', () => {
  it('should return candidate initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      allData: null,
      hasErrored: false,
      isLoading: false,
      jobInfo: false,
      canInfo: false,
      newProject: false,
    });
  });

  it('should store candidate data', () => {
    expect(reducer({
      allData: null,
      hasErrored: false,
      isLoading: false,
      jobInfo: false,
      canInfo: false,
      newProject: false,
    }, {
      type: 'CANDIDATE_FETCH_DATA_SUCCESS CANDIDATE',
      data: {
        about_me: '',
        personal_info: '',
        skill_set: [],
        course_list: [],
        education_exp: [],
        project_list: [],
        experiences: [],
        personal_skill: [],
        saved_job_list: [],
        recommendation_list: [],
      },
    })).toEqual({
      allData: {
        about_me: '',
        personal_info: '',
        skill_set: [],
        course_list: [],
        education_exp: [],
        project_list: [],
        experiences: [],
        personal_skill: [],
        saved_job_list: [],
        recommendation_list: [],
      },
      aboutMe: '',
      personalInfo: '',
      skillList: [],
      courseList: [],
      educationList: [],
      projectList: [],
      experienceList: [],
      personalSkilList: [],
      savedJobList: [],
      rcmdJobList: [],
      hasErrored: null,
      isLoading: false,
      canInfo: false,
      jobInfo: false,
      newProject: false,
    });
  });
});
