import React from 'react';
import {
  Table,
  Container,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
} from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { withCategories } from '../../dataProviders';
import AddCategory from '../AddCategory';
import RemoveCategory from '../RemoveCategory';
import TagInput from './TagInput';
import NoCategoriesDisplay from './NoCategoriesDisplay';

const StyledContainer = styled(Container)({
  position: 'relative',
  top: '-100px',
  padding: 0,
});

const StyledTableCell = styled(TableCell)(({
  fontWeight: '500',
  fontSize: '1em',
}));

class CategoryTable extends React.Component {
  render() {
    const { categories } = this.props;
    return (
      <StyledContainer maxWidth={false}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Category</StyledTableCell>
                <StyledTableCell>Tags</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                categories.map(category => (
                <TableRow key={category.name}>
                  <TableCell component="th" scope="row">
                    <span>{category.name}</span>
                    <RemoveCategory hasTags={category.tags.length !== 0} categoryName={category.name} />
                  </TableCell>
                  <TableCell>
                    <TagInput tags={category.tags} categoryName={category.name} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <NoCategoriesDisplay show={categories.length === 0} />
          <AddCategory />
        </Paper>
      </StyledContainer>
    );
  }
}


export default withCategories(CategoryTable);
