import React, { Component } from 'react';
import Chart from '../../widgets/Chart';
import styles from './Dashboard.css';

import io from 'socket.io-client';
let socket;
if (
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'integration'
) {
  socket = io({
    path: '/socket'
  });
} else {
  socket = io('http://localhost:5000', {
    path: '/socket'
  });
}

const X_AXIS_NUM = 61;

class Dashboard extends Component {
  state = {
    bitflyer: {
      bidPrices: [],
      askPrices: [],
      lastPrices: []
    },
    coincheck: {
      bidPrices: [],
      askPrices: [],
      lastPrices: []
    },
    zaif: {
      bidPrices: [],
      askPrices: [],
      lastPrices: []
    }
  };

  mapDataToCompanyObj = (data, companyName) => {
    let bidPrices = [
      ...this.state[companyName].bidPrices,
      data[companyName].bid
    ];
    let askPrices = [
      ...this.state[companyName].askPrices,
      data[companyName].ask
    ];
    let lastPrices = [
      ...this.state[companyName].lastPrices,
      data[companyName].last
    ];

    if (this.state[companyName].bidPrices.length > X_AXIS_NUM) {
      bidPrices.shift();
      askPrices.shift();
      lastPrices.shift();
    }

    return {
      bidPrices,
      askPrices,
      lastPrices
    };
  };

  componentDidMount() {
    socket.on('connect', () => {
      console.log('CLIENT: connected to server');
    });

    socket.on('update:dashboard', data => {
      this.setState({
        bitflyer: this.mapDataToCompanyObj(data, 'bitflyer'),
        coincheck: this.mapDataToCompanyObj(data, 'coincheck'),
        zaif: this.mapDataToCompanyObj(data, 'zaif')
      });
    });

    socket.on('disconnect', () => {
      console.log('CLIENT: disconnected from server');
    });
  }

  render() {
    return (
      <div className={styles.dashboard}>
        <h2>Dashboard</h2>
        <div className={styles.content}>
          <div className={styles.chart}>
            <h4>Bid and Ask of Bitcoin</h4>
            <Chart
              xAxisNum={X_AXIS_NUM}
              bitflyerBids={this.state.bitflyer.bidPrices}
              bitflyerAsks={this.state.bitflyer.askPrices}
              coincheckBids={this.state.coincheck.bidPrices}
              coincheckAsks={this.state.coincheck.askPrices}
              zaifBids={this.state.zaif.bidPrices}
              zaifAsks={this.state.zaif.askPrices}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
