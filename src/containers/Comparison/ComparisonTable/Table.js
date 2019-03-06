import React from 'react';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { colors } from "../../../utils/colors";

const DifferenceTable = props => {
  const { tableHead, tableData, tableTitle } = props;
  return (
    <Table borderStyle={{borderColor: 'transparent'}} style={styles.container}>
      <Row
        data={tableHead}
        flexArr={[1, 2, 2, 2]}
        style={styles.head}
        textStyle={styles.text}
      />
      <TableWrapper style={styles.wrapper}>
        <Col
          data={tableTitle}
          style={styles.title}
          textStyle={styles.text}
        />
        <Rows
          style={styles.row}
          flexArr={[2, 2, 2]}
          data={tableData}
          textStyle={styles.text}
        />
      </TableWrapper>
    </Table>
  );
};

const styles = StyleSheet.create({
  head: {
    height: 35,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  container: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  wrapper: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  row: {
    height: 28,
    backgroundColor: colors.TRANSPARENT,
  },
  text: {
    textAlign: 'center',
  },
});

DifferenceTable.propTypes = {
  tableHead: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  tableTitle: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  tableData: PropTypes.array.isRequired,
};

export default DifferenceTable;
