import React from 'react';
import StyleButton from './StyleButton';

const alignMap = [
  {label: 'Left Align', style: 'left'},
  {label: 'Center Align', style: 'center'},
  {label: 'Right Align', style: 'right'}
];

const AlignmentControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {alignMap.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );



};

export default AlignmentControls;
