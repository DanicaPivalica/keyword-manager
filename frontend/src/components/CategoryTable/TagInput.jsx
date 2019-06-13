import React from 'react';
import { default as BasicTagInput } from '../BasicTagInput';
import { withCreateTag, withRemoveTag } from '../../dataProviders';


class TagInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      tag: '',
    }
    this.onChange = this.onChange.bind(this);
    this.onDelimiter = this.onDelimiter.bind(this);
    this.onEsc = this.onEsc.bind(this);
  }

  onChange(e) {
    this.setState({ tag: e.target.value });
  }

  onDelimiter(tag) {
    const { createTag, categoryName } = this.props;
    this.setState({ tag: '' }, () => {
      createTag(tag, categoryName);
    });
  }

  onEsc() {
    this.setState({ tag: '' });
  }

  render() {
    const { tag } = this.state;
    const { tags, categoryName, removeTag } = this.props;
    return (
      <BasicTagInput
        onChange={this.onChange}
        onDelimiter={this.onDelimiter}
        currentTag={tag}
        tags={tags}
        categoryName={categoryName}
        onTagDelete={removeTag}
        onEsc={this.onEsc}
      />
    );
  }
}


export default withRemoveTag(withCreateTag(TagInput));
