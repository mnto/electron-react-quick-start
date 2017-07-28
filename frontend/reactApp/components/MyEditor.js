import React from 'react';
import { ContentState,
         CompositeDecorator,
         convertFromRaw,
         convertToRaw,
         Editor,
         EditorState,
         RichUtils,
         getDefaultKeyBinding,
         KeyBindingUtil,
         Modifier } from 'draft-js';
const {hasCommandModifier} = KeyBindingUtil;
import alignStyleMap from './customMaps/alignStyleMap';
import colorStyleMap from './customMaps/colorStyleMap';
import sizeStyleMap from './customMaps/sizeStyleMap';
import fontStyleMap from './customMaps/fontStyleMap';
import customStyleMap from './customMaps/customStyleMap';
import styles from '../../assets/stylesheets/textEditor.scss';
import axios from 'axios';
import COLORS from './colors';
import FONTS from './fonts';
import SIZES from './sizes';
import BLOCK_TYPES from './blockTypes';
import StyleButton from './StyleButton';
import toastr from 'toastr';
toastr.options.preventDuplicates = true;
toastr.options.timeOut = 1000;

const SearchHighlight = (props) => (
  <span className="search-highlight">{props.children}</span>
);

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: this.props.socket,
      editorState: EditorState.createEmpty(),
      searchStr: ''
    };

    //when something in the editor changes
    this.onChange = (editorState) => {
      //console.log('ON CHANGE');
      this.setState({editorState: editorState});
      const rawCS= convertToRaw(this.state.editorState.getCurrentContent());
      const strCS = JSON.stringify(rawCS);
      this.props.socket.emit("sendContentState", strCS);
    };

    //when the editor is selected/in focus - default by draft
    this.focus = () => this.refs.editor.focus();
  }

  componentDidMount() {
    //GET MOST RECENT FROM DOC DB
    //Axios call to get the document
    axios.get('http://localhost:3000/docs/' + this.props.id)
    .then(({ data }) => {
      if (data.success) {
        var newState;
        if (data.doc.text) {
          const rawCS =  JSON.parse(data.doc.text);
          const contentState = convertFromRaw(rawCS);
          newState = EditorState.createWithContent(contentState);
        }
        else {
          newState = EditorState.createEmpty();
        }
        this.setState({editorState: newState});
      }
      else {
        console.log("ERROR LOADING");
      }
    })
    .catch(err => {
      console.log(err);
    });

    this.state.socket.on('connect', () => {
      console.log('CONNECTED TO SOCKETS');
      this.state.socket.emit("documentId", this.props.id);
    });
    this.state.socket.on('errorMessage', message => {
      console.log("ERROR", message);
    });
    this.state.socket.on('sendBackContentState', socketStr => {
      const socketRaw =  JSON.parse(socketStr);
      const socketCS = convertFromRaw(socketRaw);
      const socketState = EditorState.createWithContent(socketCS);
      this.setState({editorState: socketState});
    });

  }

  componentWillUnMount() {
    this.state.socket.disconnect();
  }

  onSave(e) {
    e.preventDefault();
    const rawCS= convertToRaw(this.state.editorState.getCurrentContent());
    const strCS = JSON.stringify(rawCS);
    axios.post('http://localhost:3000/docs/save/' + this.props.id, {
      text: strCS
    })
    .then(resp => {
      toastr.success('Saved!');
    })
    .catch(err => {
      console.log(err);
    });
  }

  //recieves all keyDown events.
  //helps us define custom key bindings
  //return a command(string) that should be executed depending on keyDown
  keyBindingFn(e) {
    //command + s
    if (KeyBindingUtil.hasCommandModifier(e) && e.keyCode === 83) {
      return "SAVE";
    }
    return getDefaultKeyBinding(e);
  }

  //recieve all commands from key bindings and applies changes
  handleKeyCommand(command) {
    if (command === "SAVE") {
      const rawCS= convertToRaw(this.props.editorState.getCurrentContent());
      const strCS = JSON.stringify(rawCS);
      axios.post('http://localhost:3000/docs/save/' + this.props.id, {
        text: strCS
      })
      .then(resp => {
        console.log(resp);
        toastr.success('Saved!');
        return true;
      })
      .catch(err => {
        console.log(err);
      });
    }
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
    this.onChange(RichUtils.onTab(e, this.props.editorState, depth));
  }

  //
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

  // toggles alignment styling
  toggleAlign(toggledAlignment) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
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

  onClick(toggleType, style) {
    console.log('toggleType:', toggleType, 'style:', style);
    if (toggleType === 'inline') {
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
    } else {
      this.onChange(RichUtils.toggleBlockType(this.state.editorState, style));
    }

  }

  onFontClick() {
    this.onStyleClick("font", Object.keys(fontStyleMap));
  }

  onColorClick() {
    this.onStyleClick("color", Object.keys(colorStyleMap));
  }

  onSizeClick() {
    this.onStyleClick("size", Object.keys(sizeStyleMap));
  }

  onAlignClick() {
    this.onStyleClick("align", Object.keys(alignStyleMap));
  }

  onStyleClick(styleId, arr) {
    let e = document.getElementById(styleId);
    let toggledStyle = e.options[e.selectedIndex].value;
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    // remove current related styling (other colors || sizes || fonts)
    const nextContentState = arr.reduce((contentState, style) => {
      return Modifier.removeInlineStyle(contentState, selection, style);
    }, editorState.getCurrentContent());
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );
    const currentStyle = editorState.getCurrentInlineStyle();
    // Unset style override for current style.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, style) => {
        return RichUtils.toggleInlineStyle(state, style);
      }, nextEditorState);
    }
    // If the style is being toggled on, apply it.
    if (!currentStyle.has(toggledStyle)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledStyle
      );
    }

    this.onChange(nextEditorState);
  }

  findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText();
    let matchArr, start, end;
    while ((matchArr = regex.exec(text)) !== null) {
      // matchArr format: [searchStr, index: index where the result appears, input: input]
      start = matchArr.index;
      end = start + matchArr[0].length;
      callback(start, end);
    }
  }

  generateDecorator(highlightTerm) {
    const regex = new RegExp(highlightTerm, 'g');
    return new CompositeDecorator([{
      strategy: (contentBlock, callback) => {
        if (highlightTerm !== '') {
          this.findWithRegex(regex, contentBlock, callback);
        }
      },
      component: SearchHighlight,
    }]);
  }

  onChangeSearch(e) {
    this.setState({
      searchStr: e.target.value,
      editorState: EditorState.set(this.state.editorState,
        { decorator: this.generateDecorator(e.target.value) })});
  }

  onHistClick(e) {
    e.preventDefault();
    const rawCS= convertToRaw(this.state.editorState.getCurrentContent());
    const strCS = JSON.stringify(rawCS);
    axios.post('http://localhost:3000/docs/current/' + this.props.id, {
      text: strCS
    })
    .then(({data}) => {
      if (data.doc) {
        this.props.history.push('/history/' + this.props.id);
      } else {
        console.log("errr loading");
      }
    })
    .catch(err => {
      console.log(err);
    });
  }


  render() {
    var counter = 0;
    var currentStyle = this.state.editorState.getCurrentInlineStyle();
    const selection = this.state.editorState.getSelection();
    const blockType = this.state.editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
    return (
      <div className="container editorRoot">
        <div className="row">
          <div className="input-field">
            <input onChange={(e) => this.onChangeSearch(e)} id="search" type="search" required placeholder="Search for words in this document"/>
            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
          </div>
          <div className="editor col s12">
            <div className="toolbar">
              <select className="browser-default toolbar-selector" id="font" onChange={this.onFontClick.bind(this)}>
                 <option value="">Font</option>
                {FONTS.map(font =>
                  <option key={counter++} value={font.style}> {font.style} </option>)}
              </select>
              <select className="browser-default toolbar-selector" id="color" onChange={this.onColorClick.bind(this)}>
                <option value="" key={counter++}>Color</option>
                {COLORS.map(color => <
                  option key={counter++}> {color.style} </option>)}
              </select>
              <select className="browser-default toolbar-selector" id="size" onChange={this.onSizeClick.bind(this)}>
                <option value="" key={counter++}>Font Size</option>
                {SIZES.map(size =>
                  <option key={counter++} value={size.style}> {size.style} </option>)}
              </select>
              <div className="toolbar-buttons">
                <StyleButton
                  key='bold'
                  active={currentStyle.has('BOLD')}
                  label='Bold'
                  onToggle={this.toggleInlineStyle.bind(this)}
                  style='BOLD'>
                </StyleButton>
                <StyleButton
                  key='italic'
                  active={currentStyle.has('ITALIC')}
                  label='Italic'
                  onToggle={this.toggleInlineStyle.bind(this)}
                  style='ITALIC'>
                </StyleButton>
                <StyleButton
                  key='underline'
                  active={currentStyle.has('UNDERLINE')}
                  label='Underline'
                  onToggle={this.toggleInlineStyle.bind(this)}
                  style='UNDERLINE'>
                </StyleButton>
                <StyleButton
                  key='ordered-list'
                  active={'ordered-list-item' === blockType}
                  label={'OL'}
                  onToggle={this.toggleBlockType.bind(this)}
                  style={'ordered-list-item'}>
                </StyleButton>
                <StyleButton
                  key='unordered-list'
                  active={'unordered-list-item' === blockType}
                  label={'UL'}
                  onToggle={this.toggleBlockType.bind(this)}
                  style={'unordered-list-item'}>
                </StyleButton>
                <StyleButton
                  key='blockquote'
                  active={'blockquote' === blockType}
                  label={'Blockquote'}
                  onToggle={this.toggleBlockType.bind(this)}
                  style={'blockquote'}>
                </StyleButton>
                <StyleButton
                  key='code'
                  active={'code-block' === blockType}
                  label={'CodeBlock'}
                  onToggle={this.toggleBlockType.bind(this)}
                  style={'code-block'}>
                </StyleButton>
                <StyleButton
                  key={'left'}
                  active={currentStyle.has('left')}
                  label='Left Align'
                  onToggle={this.toggleAlign.bind(this)}
                  style='left'>
                </StyleButton>
                <StyleButton
                  key={'center'}
                  active={currentStyle.has('center')}
                  label='Center Align'
                  onToggle={this.toggleAlign.bind(this)}
                  style='center'>
                </StyleButton>
                <StyleButton
                  key={'right'}
                  active={currentStyle.has('right')}
                  label='Right Align'
                  onToggle={this.toggleAlign.bind(this)}
                  style='right'>
                </StyleButton>
              </div>
            </div>
            <div className="textarea" onClick={this.focus}>
              <Editor
                handleKeyCommand={this.handleKeyCommand.bind(this)}
                customStyleMap={customStyleMap}
                keyBindingFn={this.keyBindingFn.bind(this)}
                editorState={this.state.editorState}
                onChange={this.onChange.bind(this)}
                onTab={this.onTab.bind(this)}
                ref="editor"
              />
            </div>
          </div>
          <div className="col s12 history-buttons">
            <button
              onClick={(e) => this.onSave(e)}
              className="btn waves-effect waves-light save">
              <i className="material-icons left">save</i>
              Save Changes
            </button>
            <button
              onClick={(e) => this.onHistClick(e)}
              className="btn waves-effect waves-light history">
              <i className="material-icons left">history</i>
              See revision history
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MyEditor;
