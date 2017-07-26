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

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        // <div>
          /* <div className="fixed-action-btn horizontal click-to-toggle">
            <a className="btn-floating btn-large red">
              <i className="large material-icons">mode_edit</i>
            </a>
            <ul>
              <li><a className="btn-floating red"><i className="material-icons">insert_chart</i></a></li>
              <li><a className="btn-floating yellow darken-1"><i className="material-icons">format_quote</i></a></li>
              <li><a className="btn-floating green"><i className="material-icons">publish</i></a></li>
              <li><a className="btn-floating blue"><i className="material-icons">attach_file</i></a></li>
            </ul>
          </div> */
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
        />
      // </div>
      )}
    </div>
  );
};

export default BlockStyleControls;
