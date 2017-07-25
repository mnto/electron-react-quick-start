import React from 'react';
import StyleButton from './StyleButton';

var SIZES = [
  {label: 'tiny', style: 'extra-small'},
  {label: 'small', style: 'small'},
  {label: 'normal', style: 'normal'},
  {label: 'medium', style: 'medium'},
  {label: 'large', style: 'large'},
];

const SizeControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="controls">
      {SIZES.map(type =>
        <StyleButton
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default SizeControls;
