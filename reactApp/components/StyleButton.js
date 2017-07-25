import React from 'react';
import styles from '../../assets/stylesheets/styleButton.scss';

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'styleButton';
    if (this.props.active) {
      className += ' activeButton';
    }

    return (
      <span id={this.props.label} className={className} onMouseDown={this.onToggle}>
        {this.props.label === 'Blockquote' ? <i className="material-icons">format_quote</i> :
        this.props.label === 'UL' ? <i className="material-icons">format_list_numbered</i> :
        this.props.label === 'OL' ? <i className="material-icons">format_list_bulleted</i> :
        this.props.label === 'Bold' ? <i className="material-icons">format_bold</i> :
        this.props.label === 'Italic' ? <i className="material-icons">format_italic</i> :
        this.props.label === 'Underline' ? <i className="material-icons">format_underlined</i> :
        this.props.label === 'Left Align' ? <i className="material-icons">format_align_left</i> :
        this.props.label === 'Center Align' ? <i className="material-icons">format_align_center</i> :
        this.props.label === 'Right Align' ? <i className="material-icons">format_align_right</i> :
        this.props.label === 'Right Align' ? <i className="material-icons">format_align_right</i> :
        this.props.label
      }
      </span>
    );
  }
}

export default StyleButton;
