/* eslint-disable max-len */

import React, { PropTypes } from 'react';

export default class Instruction extends React.Component {
  componentDidMount() {
    var trial = {
      type: 'instructions',
      pages: this.props.text,
      show_clickable_nav: false
    }

    jsPsych.init({
      display_element: this.refs.main,
      timeline: [trial],
      on_finish: function(){ jsPsych.data.displayData(); }
    });
  }

  render() {
    return (
      <div>
        <div ref="main">
        </div>
        <button
          style={{ marginTop: 40, width: 180 }}
          className="btn btn-success col-xs-offset-4"
          onClick={this.props.buidInitial}
        >
        Next
        </button>
      </div>
    );
  }
}
