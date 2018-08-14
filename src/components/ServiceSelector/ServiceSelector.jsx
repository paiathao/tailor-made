import React from "react";
import { render } from "react-dom";
// import matchSorter from 'match-sorter'
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
              accessor: "category"
            },
            {
              Header: "Service",
              accessor: "service"
            },
            {
              Header: "Cost",
              accessor: "cost"
            },
          ]}
           data={data}
           />
      </div>
  );
}
}



const mapStateToProps = (state) => {
    return { serviceList: state.serviceList }
}


export default connect(mapStateToProps)(ServiceSelector);