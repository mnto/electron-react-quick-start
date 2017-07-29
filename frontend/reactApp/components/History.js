import React from 'react';
import axios from 'axios';
import customStyleMap from './customMaps/customStyleMap';
import styles from '../../assets/stylesheets/history.scss';

import { convertFromRaw,
         Editor,
         EditorState } from 'draft-js';
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

  // makes a get request to get the get the current document that the user is editing
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
        console.log("state", this.state);
      }
      else {
        console.log("DOCUMENT NOT FOUND");
      }
    })
    .catch((err) => {
      console.log("ERROR FINDING DOCUMENT", err);
    });
  }

  // renders a certain old version of the text pulled from database
  onHistClick(hist) {
    const oldCS = convertFromRaw(JSON.parse(hist.text));
    const newState = EditorState.createWithContent(oldCS);
    this.setState({oldCS: newState});
  }

  // redirects back to document landing page
  onBack(e) {
    e.preventDefault();
    console.log('state in back', this.state);
    this.props.history.push('/docs/' + this.state.doc._id);
  }

  render() {
    var self = this;
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo center">Nodebook</a>
            <button
              className="left btn"
              onClick={(e) => this.onBack(e)}>
              <i className="material-icons left">chevron_left</i>
              Document
            </button>
          </div>
        </nav>
        <div className="revision-page">
          <div className="revision">
            <h2>Revision</h2>
            {this.state.histArr && <div className="collection">
                {self.state.histArr.map(function(hist, index){
                  return (
                    <button
                      className="timestamp btn"
                      onClick={self.onHistClick.bind(self, hist)}
                      key={index}>{new Date(hist.timestamp).toLocaleString()}
                    </button>
                  );
                })}
            </div>}
          </div>
          <div className="current">
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
          <div className="past">
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
      </div>
    );
  }
}

export default History;
