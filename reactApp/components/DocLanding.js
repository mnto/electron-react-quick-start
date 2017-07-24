import React from 'react';
import TextEditor from './TextEditor';
import styles from '../assets/stylesheets/docLanding.scss';

class DocLanding extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="docLanding">
        <a class="waves-effect waves-light btn"><i class="material-icons left">chevron_left</i>Back to Document Portal</a>
        <div className="docInfo">
          <h2>Document title!</h2>
          <h4>Shareable ID: NUMBERS</h4>
          <h6>Created by AUTHOR NAME on DATE</h6>
        </div>
        <div className="collaborators">Collaborators go here</div>
        <button class="btn waves-effect waves-light" type="submit" name="action">
          Save Changes
          <i class="material-icons left">save</i>
        </button>
        <TextEditor />
      </div>
    );
  }
}

export default DocLanding;
