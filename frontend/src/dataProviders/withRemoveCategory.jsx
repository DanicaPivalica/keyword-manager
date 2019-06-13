import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { GET_CATEGORIES } from './withCategories';

const REMOVE_CATEGORY = gql`
  mutation RemoveCategory($categoryName: String!) {
    removeCategory(name: $categoryName) 
  }
`;

const withRemoveCategory = (WrappedComponent) => {
  return class A extends React.Component {
    constructor(props){
      super(props);
      this.removeCategory = this.removeCategory.bind(this);
    }

    removeCategory(updateFunc) {
      return (categoryName) => updateFunc({ variables: { categoryName }});
    }

    render() {
      return (
        <Mutation
          mutation={REMOVE_CATEGORY}
          /* Since this is just a test application, we're not handling
          the data locally but refetching on mutation. */
          refetchQueries={[{ query: GET_CATEGORIES }]}
        >
          {(removeCategory) => {
            return <WrappedComponent {...this.props} removeCategory={this.removeCategory(removeCategory)} />
          }}
        </Mutation>);
    }
  }
}


export default withRemoveCategory;
