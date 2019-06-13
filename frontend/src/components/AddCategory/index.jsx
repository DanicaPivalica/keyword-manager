import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Fab,
  Typography,
  Tooltip,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { styled } from '@material-ui/styles';
import TagInput from '../BasicTagInput';
import { withCreateCategory } from '../../dataProviders';

const StyledFab = styled(Fab)({
  margin: '20px 20px 20px auto',
  display: 'flex',
  position: 'relative',
  top: '-10px'
})


class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      categoryName: '',
      currentTag: '',
      tags: [],
    }
    this.toggleOpen = this.toggleOpen.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeTag = this.onChangeTag.bind(this);
    this.submit = this.submit.bind(this);
    this.onDelimiter = this.onDelimiter.bind(this);
    this.onEsc = this.onEsc.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(tag) {
    this.setState(prev => ({
      tags: prev.tags.filter(t => t !== tag),
    }));
  }

  onChange(e) {
    this.setState({ categoryName: e.target.value, categoryNameError: false });
  }

  toggleOpen() {
    this.setState(previousState => ({
      open: !previousState.open,
      currentTag: '',
      categoryName: '',
      tags: [],
      categoryNameError: false,
    }));
  }

  onChangeTag(e) {
    this.setState({ currentTag: e.target.value });
  }

  onDelimiter(currentTag) {
    this.setState(prev => ({
      currentTag: '',
      tags: !prev.tags.includes(currentTag) ? prev.tags.concat([currentTag]) : prev.tags,
    }));
  }

  onEsc() {
    this.setState({ currentTag: '' });
  }

  submit() {
    const { createCategory } = this.props;
    const { categoryName, tags } = this.state;
    if (categoryName === "") {
      this.setState({
        categoryNameError: true,
      });
      return;
    }
    this.setState({
      open: false,
    }, () => {
      createCategory(categoryName, tags);
    })
  }

  render() {
    const { open, currentTag, tags, categoryNameError } = this.state;
    return (
      <div>
        <Tooltip title="Add a category">
          <StyledFab onClick={this.toggleOpen} size="medium" color="secondary" aria-label="Add">
            <Add />
          </StyledFab>
        </Tooltip>
        <Dialog onClose={this.toggleOpen} open={open}>
          <DialogTitle> Be efficient! Organize everything! </DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              onChange={this.onChange}
              placeholder="eg. vegetables"
              label="Category name"
              type="text"
              InputLabelProps={{
                shrink: true,
                error: categoryNameError,
              }}
              InputProps={{
                error: categoryNameError,
              }}
              fullWidth
            />
            <div>
              <Typography className="tags-label" component="div" variant="caption">Tags</Typography>
              <TagInput
                onChange={this.onChangeTag}
                onEsc={this.onEsc}
                currentTag={currentTag}
                onDelimiter={this.onDelimiter}
                tags={tags}
                onTagDelete={this.handleDelete}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleOpen} color="primary">
              Cancel
          </Button>
            <Button onClick={this.submit} color="primary">
              Add
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


export default withCreateCategory(AddCategory);
