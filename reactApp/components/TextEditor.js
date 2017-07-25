import React from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
const {hasCommandModifier} = KeyBindingUtil;
import styles from '../../assets/stylesheets/textEditor.scss'
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onChange = (editorState) =>
      this.setState({editorState});

    //when the editor is selected/in focus - default by draft
    this.focus = () => this.refs.editor.focus();
  }

  //recieves all keyDown events.
  //helps us define custom key bindings
  //return a command(string) that should be executed depending on keyDown
  keyBindingFn(e) {
    return getDefaultKeyBinding(e);
  }

  //recieve all commands from key bindings and applies changes
  handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }


  render() {
    return (
      <div className="editorRoot">
        {/* <BlockStyleControls
          editorState={this.state.editorState}
          onToggle={this.toggleBlockType.bind(this)}
        />
        <InlineStyleControls
          editorState={this.state.editorState}
          onToggle={this.toggleInlineStyle.bind(this)}
        />
        <div className="editor" onClick={this.focus}>
          <Editor
            handleKeyCommand={this.handleKeyCommand.bind(this)}
            keyBindingFn={this.keyBindingFn.bind(this)}
            editorState={this.state.editorState}
            onChange={this.onChange}
            onTab={this.onTab.bind(this)}
            ref="editor"
          /> */}
        </div>
    );
  }
}

export default TextEditor;
