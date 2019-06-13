import React from 'react';
import {
  Icon,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_CATEGORIES = gql`
  query {
    categories {
      name,
      tags
    }
  }
`;

const withCategories = (WrappedComponent) => {
  return class A extends React.Component {
    render() {
      return (
      <Query query={GET_CATEGORIES}>
        {({ loading, error, data }) => {
          if (loading) return <LinearProgress variant="query" />;
          if (error) return (
            <div style={{ textAlign: 'center' }}>
              <Icon color="error"> error </Icon>
              <Typography color="error" variant="body1">
                An error has occured while retrieving categories, please try again.
              </Typography>
            </div>);
          return <WrappedComponent {...this.props} categories={data.categories} />
        }}
      </Query>);
    }
  }
}


export default withCategories;
export { GET_CATEGORIES };
