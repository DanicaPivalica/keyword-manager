import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Chip,
} from '@material-ui/core';
import { styled } from '@material-ui/styles';

const StyledChip = styled(Chip)({
  margin: '5px',
});

class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = () => props.onTagDelete(props.tag, props.categoryName);
  }
  render() {
    const { tag } = this.props;
    return (
      <StyledChip
        size="small"
        label={tag}
        color="primary"
        onDelete={this.handleDelete}
      />

    );
  }
}

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
  categoryName: PropTypes.string,
  onTagDelete: PropTypes.func,
}

export default Tag;
