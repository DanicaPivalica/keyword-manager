import React from 'react';
import { PropTypes } from 'prop-types';
import {
  TextField,
} from '@material-ui/core';
import Tag from './Tag';

const keys = {
  Enter: 'Enter',
  Tab: 'Tab',
  Esc: 'Escape',
}

class BasicTagInput extends React.Component {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(e) {
    const { currentTag, onDelimiter, onEsc } = this.props;
    if (currentTag === "") return;
    if (e.key === keys.Enter || e.key === keys.Tab) {
      e.preventDefault();
      onDelimiter(currentTag);
    } else if (e.key === keys.Esc) {
      onEsc(currentTag);
    }
  }

  render() {
    const {
      currentTag,
      onChange,
      className,
      onTagDelete,
      categoryName,
      tags,
    } = this.props;
    return (
      [
        tags.map(tag => (
          <Tag
            key={tag}
            tag={tag}
            onTagDelete={onTagDelete}
            categoryName={categoryName}
          />
        )),
        <TextField
          key="input-tag"
          className={`no-border ${className}`}
          onChange={onChange}
          onKeyDown={this.onKeyDown}
          placeholder="Eg. eggplant"
          margin="dense"
          value={currentTag}
          type="text"
        />
      ]

    );
  }
}

BasicTagInput.propTypes = {
  categoryName: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentTag: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelimiter: PropTypes.func.isRequired,
  onEsc: PropTypes.func.isRequired,
  onTagDelete: PropTypes.func.isRequired,
}


export default BasicTagInput;
