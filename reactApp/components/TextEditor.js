import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import styles from '../../assets/stylesheets/textEditor.scss';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onChange = (editorState) =>
        this.setState({editorState});
  }

  onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle (
        this.state.editorState, 'BOLD'
    ));
  }


  render() {
    return (
        <div>
            {/* <Toolbar
                onBold={this.onBoldClick.bind(this)}
            />
            <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
            /> */}
        </div>

    );
  }
}

export default TextEditor;
