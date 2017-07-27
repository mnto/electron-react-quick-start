import React from 'react';
import StyleButton from './StyleButton';

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'CodeBlock', style: 'code-block'},
];

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  // let e = document.getElementById('block');
  // let toggleStyle = e.options[e.selectedIndex].value;
  return (
    <div className="RichEditor-controls">
      {/* <select className="browser-default" onChange={this.props.onToggle}>
        <option value="" disabled selected>Block Style</option> */}
        {BLOCK_TYPES.map((type) =>
          // <option value={type.label}>{type.label}</option>
            <StyleButton
              key={type.label}
              active={type.style === blockType}
              label={type.label}
              onToggle={props.onToggle}
              style={type.style}
          />
        )}
      {/* </select> */}
    </div>
  );
};

export default BlockStyleControls;
