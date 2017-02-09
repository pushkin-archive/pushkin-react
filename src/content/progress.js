/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import { Line, Circle } from 'rc-progress';

export default class Progress extends React.Component {
  formatPrecent() {
    if(this.props.precent > 100) {
      return 100;
    }
    return this.props.precent.toFixed(2);
  }
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <label style={{ 'text-align':'center', 'margin-top':20}}> Progress: {this.formatPrecent()} % </label>
        <Line
          percent={this.props.precent}
          strokeWidth="4"
          strokeColor="#68C8F5"
        />
      </div>
    );
  }
}
