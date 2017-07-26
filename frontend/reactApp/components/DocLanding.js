import React from 'react';
import TextEditor from './TextEditor';
import { Link } from 'react-router-dom';
import styles from '../../assets/stylesheets/docLanding.scss';

class DocLanding extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="container page">
        <div className="row">
          <div>
            <Link to="/documents" className="waves-effect waves-light btn col s5">
              <i className="material-icons left">chevron_left</i>
              Back to Document Portal
            </Link>
          </div>
          <div className="description col s12">
            <h2>Document title!</h2>
            <h6>Shareable ID: NUMBERS</h6>
            <p>Created by AUTHOR NAME on DATE</p>
            <p>Collaborators: </p>
          </div>
          <div className="btn waves-effect waves-light col s4 offset-s4" type="submit" name="action">
            Save Changes
            <i className="material-icons left">save</i>
          </div>
        </div>
        <TextEditor />
        <footer className="page-footer">
          <div className="container">
            <div className="row">
              <p>Taking desktop note taking app to another aesthetic</p>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2017 Copyright Demi, Minh, Julia, Audrey
            </div>
          </div>
        </footer>

      </div>
    );
  }
}

export default DocLanding;
