import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Projects.css';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import * as actions from '../../../store/actions';


class Projects extends Component {
    changeNewProject =(e, type) => {
      this.props.changeNewProject(e.target.value, type);
    };

    render() {
      let newpro = null;
      if (this.props.newProject) {
        newpro = (
          <div className="project">
            <input
              className="title"
              placeholder="title"
              value={this.props.newProject.title}
              onChange={event => this.changeNewProject(event, 'title')}
            />
            <textarea
              placeholder="description"
              className="des"
              rows="7"
              cols="33"
              value={this.props.newProject.des}
              onChange={event => this.changeNewProject(event, 'des')}
            />
            <div className="tech">
              <div className="tech-title">Technologies:</div>
              <div className="text">
                <input
                  className="tech-input"
                  placeholder="Separate by white space"
                  value={this.props.newProject.techs.join(' ')}
                  onChange={event => this.changeNewProject(event, 'tech')}
                />
              </div>
            </div>
            <div className="link">
              <div className="link-title"> Link to the project:</div>
              <input
                className="url-input"
                placeholder="url"
                value={this.props.newProject.link}
                onChange={event => this.changeNewProject(event, 'link')}
              />
            </div>
            <div className="new-pro-btn">
              <button type="button" className="add" onClick={this.props.storeNewProject}>Add</button>
              <button type="button" className="cancel" onClick={event => this.changeNewProject(event, 'cancel')}>Cancel</button>
            </div>

          </div>
        );
      }
      const projects = this.props.projectList.map((proj) => {
        const li = proj.techs.map(tech => (
          <li key={uuid.v4()}>
            <div className="tech-name" data-placeholder="technology">{tech}</div>
          </li>
        ));
        return (
          <div className="project" key={uuid.v4()}>
            <div className="title" data-placeholder="title">
              {proj.name}
            </div>
            <div className="description" data-placeholder="description">{proj.description}</div>
            <div className="tech">
              <div className="tech-title">Technologies:</div>
              <div className="text">
                <ul>
                  {li}
                </ul>
              </div>
            </div>
            <div className="link">
              <div className="link-title"> Link to the project:</div>
              <div className="url" data-placeholder="url">{proj.link}</div>
            </div>
            <i role="presentation" className="fas fa-trash-alt fa-lg" onClick={() => this.props.deleteProject(proj.working_exp_uuid)} />
          </div>
        );
      });
      return (
        <div className="projects">
          <div className="prj-add">
            <i role="presentation" className="fas fa-plus-circle fa-2x prj-add-btn" onClick={this.props.addNewProject} />
          </div>
          <div className="title"><h2>Projects</h2></div>
          {projects}
          {newpro}
        </div>

      );
    }
}

const mapStateToProps = state => ({
  projectList: state.candidate.projectList,
  newProject: state.candidate.newProject,
});

const mapDispatchToProps = dispatch => ({
  deleteProject: id => dispatch(actions.deleteProject(id)),
  changeNewProject: (value, type) => dispatch(actions.changeNewProject(value, type)),
  addNewProject: () => dispatch(actions.addNewProject()),
  storeNewProject: () => dispatch(actions.storeNewProject()),
});

Projects.propTypes = {
  projectList: PropTypes.instanceOf(Array),
  newProject: PropTypes.objectOf(PropTypes.Object),
  deleteProject: PropTypes.func,
  changeNewProject: PropTypes.func,
  addNewProject: PropTypes.func,
  storeNewProject: PropTypes.func,
};

Projects.defaultProps = {
  projectList: [],
  newProject: {},
  deleteProject: () => {},
  changeNewProject: () => {},
  addNewProject: () => {},
  storeNewProject: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
