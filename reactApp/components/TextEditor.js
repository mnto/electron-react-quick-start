import React from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
const {hasCommandModifier} = KeyBindingUtil;
import styles from '../../assets/stylesheets/textEditor.js'
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

    this.handleKeyCommand = (command) =>
      this.handleKeyCommand(command);

    //when tab is pressed in editor
    this.onTab = (e) => this.onTab(e);

    //when a block type is selected
    this.toggleBlockType = (type) =>
      this.toggleBlockType(type);

    //when an inline style is selected
    this.toggleInlineStyle = (style) =>
      this.toggleInlineStyle(style);
  }

  //recieves all keyDown events.
  //helps us define custom key bindings
  //return a command(string) that should be executed depending on keyDown
  // keyBindingFn(e) {
  //   switch(e) {
  //   default:
  //     return getDefaultKeyBinding(e)
  //   }
  // }

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
      <div style={styles.editorRoot}>
        <BlockStyleControls
          editorState={this.state.editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={this.state.editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div style={styles.editor} onClick={this.focus}>
          <Editor
            handleKeyCommand={this.handleKeyCommand}
            editorState={this.state.editorState}
            onChange={this.onChange}
            onTab={this.onTab}
            ref="editor"
          />
        </div>
      </div>

    );
  }
}

export default TextEditor;
