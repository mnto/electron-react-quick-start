import React from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, KeyBindingUtil, Modifier } from 'draft-js';
const {hasCommandModifier} = KeyBindingUtil;
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';
import alignStyleMap from './customMaps/alignStyleMap';
import colorStyleMap from './customMaps/colorStyleMap';
import sizeStyleMap from './customMaps/sizeStyleMap';
import fontStyleMap from './customMaps/fontStyleMap';
import customStyleMap from './customMaps/customStyleMap';
import AlignmentControls from './AlignmentControls';
import ColorControls from './ColorControls';
import SizeControls from './SizeControls';
import FontControls from './FontControls';
import styles from '../../assets/stylesheets/textEditor.scss';

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

  toggleAlign(toggledAlignment) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(alignStyleMap)
      .reduce((contentState, alignment) => {
        return Modifier.removeInlineStyle(contentState, selection, alignment);
      }, editorState.getCurrentContent());
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );
    const currentStyle = editorState.getCurrentInlineStyle();
    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, alignment) => {
        return RichUtils.toggleInlineStyle(state, alignment);
      }, nextEditorState);
    }
    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledAlignment)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledAlignment
      );
    }
    this.onChange(nextEditorState);
  }

  toggleColor(toggledColor) {
    console.log('color', colorStyleMap);
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

  toggleFont(toggledFont) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(fontStyleMap)
      .reduce((contentState, font) => {
        return Modifier.removeInlineStyle(contentState, selection, font);
      }, editorState.getCurrentContent());
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );
    const currentStyle = editorState.getCurrentInlineStyle();
    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, font) => {
        return RichUtils.toggleInlineStyle(state, font);
      }, nextEditorState);
    }
    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledFont)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledFont
      );
    }
    this.onChange(nextEditorState);
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
        <AlignmentControls
          editorState={this.state.editorState}
          onToggle={this.toggleAlign.bind(this)}
        />
        <ColorControls
          editorState={this.state.editorState}
          onToggle={this.toggleColor.bind(this)}
        />
        <SizeControls
          editorState={this.state.editorState}
          onToggle={this.toggleSize.bind(this)}
        />
        <FontControls
          editorState={this.state.editorState}
          onToggle={this.toggleSize.bind(this)}
        />
        <div className="editor" onClick={this.focus}>
          <Editor
            handleKeyCommand={this.handleKeyCommand.bind(this)}
            customStyleMap={customStyleMap}
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
