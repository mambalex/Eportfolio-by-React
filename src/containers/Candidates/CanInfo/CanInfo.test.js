import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CanInfo } from './CanInfo';

configure({adapter: new Adapter()});

describe('<CanInfo />', () => {
        let wrapper  = shallow(<CanInfo />);
        let info ={
            role: 'emoloyer',
            openJobs: [],
            firstJob:[],
            canInfo: {
                about_me: '',
                course_list: [],
                education_exp:[],
                email: "",
                experiences: [],
                jobState: '',
                location: '',
                name: '',
                personal_info: {description: "I have lots of Python and Java experience.", dob: "01/01/1993", email: "candidate1@gmail.com", gender: "male", link: "http://github.com"},
                personal_skill: [],
                project_list: [],
                role: '',
                skill_set: {},
                top: 42,
                username: "candidate1"
            },
            searchCan: false,
            searchOrHome: 'search'
        }
        wrapper.setProps(info);
        it('renders Candidate Info', () => {
            expect(wrapper.find('.candidate-popup')).toHaveLength(1);
        });

    });