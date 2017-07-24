import React from 'react';
import TextEditor from './TextEditor';

const landingStyles

class DocLanding extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="docLanding">
        <a className="waves-effect waves-light btn"><i className="material-icons left">chevron_left</i>Back to Document Portal</a>
        <div className="docInfo">
          <h2>Document title!</h2>
          <h6>Shareable ID: NUMBERS</h6>
          <p>Created by AUTHOR NAME on DATE</p>
        </div>
        <div className="collaborators">Collaborators go here</div>
        <button className="btn waves-effect waves-light" type="submit" name="action">
          Save Changes
          <i className="material-icons left">save</i>
        </button>
        <TextEditor />
      </div>
    );
  }
}

export default DocLanding;
