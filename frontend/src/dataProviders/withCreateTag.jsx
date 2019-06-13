import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { GET_CATEGORIES } from './withCategories';

const CREATE_TAG = gql`
  mutation CreateTag($tag: String!, $categoryName: String!) {
    createTag(tag: $tag, categoryName: $categoryName) {
      name,
      tags
    }
  }
`;

const withCreateTag = (WrappedComponent) => {
  return class A extends React.Component {
    constructor(props){
      super(props);
      this.createTag = this.createTag.bind(this);
    }

    createTag(updateFunc) {
      return (tag, categoryName) => updateFunc({ variables: { categoryName, tag }});
    }

    render() {
      return (
        <Mutation
          mutation={CREATE_TAG}
          /* Since this is just a test application, we're not handling
          the data locally but refetching on mutation. */
          refetchQueries={[{ query: GET_CATEGORIES }]}
        >
          {(createTag) => {
            return <WrappedComponent {...this.props} createTag={this.createTag(createTag)} />
          }}
        </Mutation>);
    }
  }
}


export default withCreateTag;
