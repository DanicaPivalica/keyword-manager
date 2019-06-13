import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { GET_CATEGORIES } from './withCategories';

const REMOVE_TAG = gql`
  mutation RemoveTag($tag: String!, $categoryName: String!) {
    removeTag(tag: $tag, categoryName: $categoryName) {
      name,
      tags
    }
  }
`;

const withRemoveTag = (WrappedComponent) => {
  return class A extends React.Component {
    constructor(props){
      super(props);
      this.removeTag = this.removeTag.bind(this);
    }

    removeTag(updateFunc) {
      return (tag, categoryName) => updateFunc({ variables: { categoryName, tag }});
    }

    render() {
      return (
        <Mutation
          mutation={REMOVE_TAG}
          /* Since this is just a test application, we're not handling
          the data locally but refetching on mutation. */
          refetchQueries={[{ query: GET_CATEGORIES }]}
        >
          {(removeTag) => {
            return <WrappedComponent {...this.props} removeTag={this.removeTag(removeTag)} />
          }}
        </Mutation>);
    }
  }
}


export default withRemoveTag;
