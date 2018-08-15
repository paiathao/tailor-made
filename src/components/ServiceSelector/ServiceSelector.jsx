import React from "react";
import { render } from "react-dom";
import matchSorter from 'match-sorter'
import { connect } from 'react-redux';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class ServiceSelector extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selected: [],
      rowIndex: [],
    }
  }

  render() {

    const data = this.props.serviceList

    return (
      <div>
        <ReactTable
          columns={[
            {
              Header: "Category",
              accessor: "category",
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["category"] }),
              filterAll: true
            },
            {
              Header: "Service",
              accessor: "service",
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["service"] }),
              filterAll: true
            },
            {
              Header: "Cost",
              accessor: "cost",
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["cost"] }),
              filterAll: true
            },
          ]}
          data={data}
          filterable
          defaultPageSize={15}
          className="-striped -highlight"
          getTrGroupProps={(state, rowInfo, column, instance) => {
            if (rowInfo !== undefined) {
              return {
                onClick: (e, handleOriginal) => {

                  let a = this.state.selected.indexOf(rowInfo.row);

                  if (a == -1) {
                    this.setState({
                      selected: [
                        ...this.state.selected, {
                        category: rowInfo.row.category,
                        service: rowInfo.row.service,
                        cost: rowInfo.row.cost,
                        id: rowInfo.original._id
                      }],
                      rowIndex: [...this.state.rowIndex, rowInfo.index],
                    
                    })
                  }

                  let array = this.state.selected;

                  if (a != -1) {
                    array.splice(a, 1);
                    this.setState({ selected: array });
                  }
                },
                style: {
                  cursor: 'pointer',
                  background: this.state.rowIndex.indexOf(rowInfo.index) != -1 ? '#00afec' : 'white',
                  color: this.state.rowIndex.indexOf(rowInfo.index) != -1 ? 'white' : 'black'
                }
              }
            }
          }
          }
        />
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return { serviceList: state.serviceList }
}


export default connect(mapStateToProps)(ServiceSelector);