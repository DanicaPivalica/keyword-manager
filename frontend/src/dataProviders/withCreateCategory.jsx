import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { GET_CATEGORIES } from './withCategories';

const CREATE_CATEGORY = gql`
  mutation CreateCategory($categoryName: String!, $tags: [String]) {
    createCategory(name: $categoryName, tags: $tags) {
      name,
      tags
    }
  }
`;

const withAddCategory = (WrappedComponent) => {
  return class A extends React.Component {
    constructor(props){
      super(props);
      this.createCategory = this.createCategory.bind(this);
    }

    createCategory(updateFunc) {
      return (name, tags) => updateFunc({ variables: { categoryName: name, tags }});
    }

    render() {
      return (
        <Mutation
          mutation={CREATE_CATEGORY}
          /* Since this is just a test application, we're not handling
          the data locally but refetching on mutation. */
          refetchQueries={[{ query: GET_CATEGORIES }]}
        >
          {(createCategory) => {
            return <WrappedComponent {...this.props} createCategory={this.createCategory(createCategory)} />
          }}
        </Mutation>);
    }
  }
}


export default withAddCategory;
