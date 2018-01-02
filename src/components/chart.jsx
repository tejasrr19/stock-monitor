import React, { Component } from 'react';
import HighStock from 'react-highcharts/ReactHighstock.src';
import _ from 'underscore';

var config = {
  rangeSelector: {
    selected: 1
  },
  title: {
    text: 'AAPL Stock Price'
  },
  series: [{
    name: 'AAPL',
    data: [],
    tooltip: {
      valueDecimals: 2
    }
  }]
};

class Chart extends Component {
    constructor() {
      super();
      this.state = {
        data: []
      };

    }

    componentWillMount() {
      this.fetchData();
    }

    processData(data) {
      _.each(data, (value, key) => {
        console.log(value, key);
      });

    }

    async fetchData() {
      var data = await fetch(`http://localhost:3001/stock-history/AAPL/1y`);
      data = await data.json();
      console.log('Data ---->', data);
      this.processData(data['Time Series (1min)']);
    }

    render() {
        return (
           <div>
               <HighStock config={config} ref="chart"></HighStock>
           </div>
        );
    }
}

export default Chart;
