import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { styled } from '@material-ui/styles';
import { withRemoveCategory } from '../../dataProviders';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginLeft: '5px',
  color: theme.palette.error.main
}))

class RemoveCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.toggleOpen = this.toggleOpen.bind(this);
    this.submit = this.submit.bind(this);
  }

  toggleOpen() {
    this.setState(previousState => ({ open: !previousState.open }));
  }

  submit() {
    const { removeCategory, categoryName } = this.props;
    this.setState({
      open: false,
    }, () => {
      removeCategory(categoryName);
    })
  }

  render() {
    const { open } = this.state;
    const { hasTags, categoryName } = this.props;
    return (
      <div style={{ display: 'inline' }}>
        <Tooltip title={`Delete category ${categoryName}`}>
          <StyledIconButton onClick={hasTags ? this.toggleOpen : this.submit} size="small" aria-label="Add">
            <Delete />
          </StyledIconButton>
        </Tooltip>
        <Dialog onClose={this.toggleOpen} open={open}>
          <DialogTitle> Are you sure? </DialogTitle>
          <DialogContent>
            <DialogContentText>
              You will not be able to reverse these changes. This action will delete this category and all it's tags.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleOpen} color="primary">
              Cancel
          </Button>
          <Button color="error" onClick={this.submit}>
              Delete
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


export default withRemoveCategory(RemoveCategory);
