import React from 'react';
import axios from 'axios';
import diff from 'diff';
import customStyleMap from './customMaps/customStyleMap';

import { convertFromRaw,
         Editor,
         EditorState,
         KeyBindingUtil } from 'draft-js';
const { hasCommandModifier } = KeyBindingUtil;

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: 'loading...',
      currCS: EditorState.createEmpty(),
      histArr: [],
      oldCS: EditorState.createEmpty(),
    };
  }

  componentWillMount() {
    const docId = this.props.match.params.docId;
    var self = this;
    axios.get('http://localhost:3000/docs/'+ docId)
    .then(({data}) => {
      if (data.success) {
        console.log(data);
        const currCS = convertFromRaw(JSON.parse(data.doc.current));
        const newState = EditorState.createWithContent(currCS);
        console.log(currCS);
        self.setState({
          doc: data.doc,
          currCS: newState,
          histArr: data.doc.history
        });
        console.log("state", this.state)
      }
      else {
        console.log("DOCUMENT NOT FOUND");
      }
    })
    .catch((err) => {
      console.log("ERROR FINDING DOCUMENT", err);
    });
  }

  onHistClick(hist) {
    const oldCS = convertFromRaw(JSON.parse(hist.text));
    const newState = EditorState.createWithContent(oldCS);
    this.setState({oldCS: newState});
  }

  //function to go back to document landing page
  onBack(e) {
    e.preventDefault();
    console.log('state in back', this.state);
    this.props.history.push('/docs/' + this.state.doc._id);
  }


  render() {
    var self = this;
    return(
      <div>
        <button
          className="waves-effect waves-light btn col s4"
          onClick={(e) => this.onBack(e)}>
          <i className="material-icons left">chevron_left</i>
          Back to Document
        </button>
        <div>
          <h2>Current Version</h2>
          <div className="textarea">
            <Editor
              customStyleMap={customStyleMap}
              editorState={this.state.currCS}
              readOnly={true}
              ref="editor"
            />
          </div>
        </div>
        <div>
          <h2>Past saved versions</h2>
          {this.state.histArr &&
            <ul>
              {self.state.histArr.map(function(hist, index){
                return (<li
                  onClick={self.onHistClick.bind(self, hist)}
                  key={index}>
                  <a>{hist.timestamp}</a>
                </li>);
              })}
            </ul>
          }
        </div>
        <div>
          <h2>Old Version</h2>
          <div className="textarea">
            <Editor
              customStyleMap={customStyleMap}
              editorState={this.state.oldCS}
              readOnly={true}
              ref="editor"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default History;
