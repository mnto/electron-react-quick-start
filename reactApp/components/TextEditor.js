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

    //when something in the editor changes
    this.onChange = (editorState) =>
      this.setState({editorState});

    //when the editor is selected/in focus - default by draft
    this.focus = () => this.refs.editor.focus();
  }

  //recieves all keyDown events.
  //helps us define custom key bindings
  //return a command(string) that should be executed depending on keyDown
  keyBindingFn(e) {
    // if (e.keyCode === 85 && hasCommandModifier(e)) {
    //   return 'Underline'
    // }
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

  //on tab event
  onTab(e) {
    const depth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, depth));
  }

  //toggles block type
  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  //toggles inline styles
  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }



  render() {
    return (
      <div className="editorRoot">
        <BlockStyleControls
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
          />
        </div>
      </div>

    );
  }
}

export default TextEditor;
