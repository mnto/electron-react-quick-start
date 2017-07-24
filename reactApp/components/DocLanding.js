import React from 'react';
import TextEditor from './TextEditor';

const docLandingStyles = {
  box: {
    "margin": "20px",
    "borderRadius": "3px",
    "borderWidth": "1px",
    "borderColor": "grey",
    "display": "flex",
    "flexDirection": "row",
    "flex": "1"
  },
  back: {
    "marginLeft": "30px"
  },
  marginTemp: {
    "margin": "10px"
  }
};

class DocLanding extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <div style={docLandingStyles.box}>
          <div>
            <h2>Document title!</h2>
            <h6>Shareable ID: NUMBERS</h6>
            <p>Created by AUTHOR NAME on DATE</p>
          </div>
          <div style={docLandingStyles.back}>
            <a className="waves-effect waves-light btn"><i className="material-icons left">chevron_left</i>Back to Document Portal</a>
          </div>
        </div>
        <div style={docLandingStyles.marginTemp}>Collaborators go here</div>
        <button  className="btn waves-effect waves-light" type="submit" name="action" style={docLandingStyles.marginTemp}>
          Save Changes
          <i className="material-icons left">save</i>
        </button>
        <TextEditor />
      </div>
    );
  }
}

export default DocLanding;
