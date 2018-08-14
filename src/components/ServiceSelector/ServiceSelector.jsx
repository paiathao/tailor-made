import React from "react";
import { render } from "react-dom";
import matchSorter from 'match-sorter'
import { connect } from 'react-redux';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class ServiceSelector extends React.Component {

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
           defaultPageSize={20}
           className="-striped -highlight"
           />
      </div>
  );
}
}



const mapStateToProps = (state) => {
    return { serviceList: state.serviceList }
}


export default connect(mapStateToProps)(ServiceSelector);