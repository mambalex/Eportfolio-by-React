import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Candidate from './Candidate';


configure({adapter: new Adapter()});

describe('<Candidate />', () => {
    var info={
        name:'',
        location:'',
        'about_me':'',
        'job_name':''
    }
    const wrapper = shallow(<Candidate
        key=''
        canInfo={info}
        image=''
        canType=''
        click=''
    />);
    it('renders an canType', () => {
        expect(wrapper.find('.canType')).toHaveLength(1);
    });

});