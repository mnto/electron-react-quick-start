import React from 'react';
import Toolbar from './Toolbar';
import TextEditor from './TextEditor';

class DocLanding extends React.Component{
  render(){
    return(
      <div>
        <Toolbar />
        <TextEditor />
      </div>
    );
  }
};
