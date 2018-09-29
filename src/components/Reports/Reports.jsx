import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Chart} from 'primereact/chart';

const mapStateToProps = state => ({
  customerList: state.customerList
});

class Reports extends Component {

    filterByCost = (customer) => {
        console.log(JSON.stringify(customer.totalCost))
        return customer.totalCost >=0
    }  

  render() {

    let array = this.props.customerList;

    let totalAmounts = array.filter(this.filterByCost);
    // console.log('array', array)
    // console.log('tota', totalAmounts)

    const options = {
        title: {
            display: true,
            text: 'Business Revenues',
            fontSize: 16
        },
    };

    const data = {
      labels: ['January', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      datasets: [
          {
              label: '2018',
              data: [765, 759, 950, 761, 686, 855, 840, 789, 889 ],
              fill: false,
              borderColor: '#4bc0c0',
              backgroundColor: '#818298'
              
          },
      ]   
  };

    return (
      <div >
       <Chart type="bar" data={data} options={options}/>
      </div>
    );
  }
}


export default connect(mapStateToProps)(Reports);

