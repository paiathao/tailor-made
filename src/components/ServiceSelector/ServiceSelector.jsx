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
      service: []
    }
  }

  render() {

    const data = this.props.serviceList

    console.log('state of selected', this.state.selected)
    console.log('state of service', this.state.service)

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
                      console.log('It was in this row:', rowInfo.row)
                      this.setState({
                        service : {
                          category: rowInfo.row.category,
                          service: rowInfo.row.service,
                          cost: rowInfo.row.cost,
                          id: rowInfo.original._id
                        },
                        selected : {
                          ...this.state.selected,
                          selectedIndex: rowInfo.original._id
                        }  
                      })
                    },
                    style: {
                        cursor: 'pointer',
                        background: rowInfo.original._id === this.state.selected.selectedIndex ? '#00afec' : 'white',
                        color: rowInfo.original._id === this.state.selected.selectedIndex  ? 'white' : 'black'                      
                    }
                }
            }}
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