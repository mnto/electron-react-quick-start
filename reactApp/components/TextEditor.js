import React from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, KeyBindingUtil, Modifier } from 'draft-js';
const {hasCommandModifier} = KeyBindingUtil;
import styles from '../../assets/stylesheets/textEditor.scss'
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';
import AlignmentControls from './AlignmentControls';

import customStyleMap from './customMaps/customStyleMap';
import sizeStyleMap from './customMaps/sizeStyleMap';
import alignStyleMap from './customMaps/alignStyleMap';
import colorStyleMap from './customMaps/colorStyleMap';


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


  toggleAlign(toggledAlign) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    // Let’s just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(alignStyleMap)
    .reduce((contentState, a) => {
      return Modifier.removeInlineStyle(contentState, selection, a);
    }, editorState.getCurrentContent());
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );
    const currentStyle = editorState.getCurrentInlineStyle();
    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, a) => {
        return RichUtils.toggleInlineStyle(state, a);
      }, nextEditorState);
    }
    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledAlign)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledAlign
      );
    }
    console.log(currentStyle);
    this.onChange(nextEditorState);
  }

  toggleColor(toggledColor) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap)
    .reduce((contentState, color) => {
      return Modifier.removeInlineStyle(contentState, selection, color);
    }, editorState.getCurrentContent());
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );
    const currentStyle = editorState.getCurrentInlineStyle();
    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }
    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }
    this.onChange(nextEditorState);
  }

  toggleSize(toggledSize) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(sizeStyleMap)
    .reduce((contentState, size) => {
      return Modifier.removeInlineStyle(contentState, selection, size);
    }, editorState.getCurrentContent());
    console.log('nextContentState', nextContentState);
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );
    const currentStyle = editorState.getCurrentInlineStyle();
    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, size) => {
        return RichUtils.toggleInlineStyle(state, size);
      }, nextEditorState);
    }
    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledSize)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledSize
      );
    }
    this.onChange(nextEditorState);
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
        <AlignmentControls
          editorState={this.state.editorState}
          onToggle={this.toggleAlign.bind(this)}
        />
        <div className="editor" onClick={this.focus}>
          <Editor
            handleKeyCommand={this.handleKeyCommand.bind(this)}
            keyBindingFn={this.keyBindingFn.bind(this)}
            editorState={this.state.editorState}
            onChange={this.onChange}
            onTab={this.onTab.bind(this)}
            ref="editor"
            customStyleMap={customStyleMap}
          />
        </div>
      </div>

    );
  }
}

export default TextEditor;
