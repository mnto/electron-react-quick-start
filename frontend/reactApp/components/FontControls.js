import React from 'react';
import StyleButton from './StyleButton';

const fontMap = [
  {label: 'Arial', style: 'Arial'},
  {label: 'Georgia', style: 'Georgia'},
  {label: 'CourierNew', style: 'CourierNew'},
  {label: 'TimesNewRoman', style: 'TimesNewRoman'}
];

const FontControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {fontMap.map(type =>
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

export default FontControls;
