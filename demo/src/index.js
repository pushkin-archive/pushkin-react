require('script-loader!../jsPsych/jspsych.js');
require('script-loader!../jsPsych/plugins/jspsych-text.js');
require('script-loader!../jsPsych/plugins/jspsych-instructions.js');
require('script-loader!../jsPsych/plugins/jspsych-survey-multi-choice.js');
require('script-loader!../jsPsych/plugins/jspsych-survey-multi-picture.js');
require('script-loader!../jsPsych/plugins/jspsych-survey-multi-select.js');

import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { pushkinReducer, SurveyProvider } from '../../src';
import thunkMiddleware from 'redux-thunk';



const rootReducer = combineReducers({
  pushkin: pushkinReducer
})
const middleWares = [thunkMiddleware];

const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware.apply(this, middleWares))
);


class Demo extends React.Component {
  dispatchProgress(progress) {

  }
  render() {
    return (
      <Provider store={store} >
          <SurveyProvider 
            progress={this.dispatchProgress}
            instructions={"instructions"}
            onFinish={() => {
              console.log('Finished');
            }}
            resultsContainer={(results) => (
              <div>{JSON.stringify(results)}</div>
            )}
          />      
    </Provider>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'))
