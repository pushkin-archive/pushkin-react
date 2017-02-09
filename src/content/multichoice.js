/* eslint-disable max-len */
/* eslint-disable camelcase */

import React, { PropTypes } from 'react';

export default class MultiChoice extends React.Component {
  componentDidMount() {
    const props = this.props;
    const page_1_questions = [this.props.question];
    const page_1_options = this.props.choices;
    const multi_choice_block = {
      type: 'survey-multi-choice',
      questions: page_1_questions,
      options: [page_1_options],
      required: false,
      on_finish: function(data) {
        const response = JSON.parse(data.responses);
        let choiceId;

        props.allChoices.forEach(currentChoice => {
          if (currentChoice.displayText === response.answer) {
            choiceId = currentChoice.id;
          }
        });
        const formatResponse = {
          choiceId: choiceId,
          questionId: props.questionId,
          user: {
            id: props.userId,
          },
        };
        const answerObj = {
          questionId: props.questionId,
          questionText: props.question,
          answer: response.answer,
          choiceId: choiceId,
        };
        props.nextQuestion(formatResponse, answerObj);
      },
    };
    jsPsych.init({
      display_element: this.refs.main,
      timeline: [multi_choice_block],
      on_finish: function() {
        if(props.showProgress){
          props.dispatchPrecent(35)
        }
        props.progress();
      },
    });
  }
  componentDidUpdate() {
    const props = this.props;
    const page_1_questions = [this.props.question];
    const page_1_options = this.props.choices;
    const multi_choice_block = {
      type: 'survey-multi-choice',
      questions: page_1_questions,
      options: [page_1_options],
      required: [true, false],
      on_finish: (data) => {
        const response = JSON.parse(data.responses);
        let choiceId;
        props.allChoices.forEach(currentChoice => {
          if (currentChoice.displayText === response.answer) {
            choiceId = currentChoice.id;
          }
        });
        const formatResponse = {
          choiceId: choiceId,
          questionId: props.questionId,
          user: {
            id: props.userId,
          },
        };
        const answerObj = {
          questionId: props.questionId,
          questionText: props.question,
          answer: response.answer,
          choiceId: choiceId,
        };
        props.nextQuestion(formatResponse, answerObj);
      },
    };
    jsPsych.init({
      display_element: this.refs.main,
      timeline: [multi_choice_block],
      on_finish: function() {
        if(props.showProgress){
          props.dispatchPrecent(35)
        }
        props.progress();
      },
    });
  }
  showProgress() {
    if(this.props.showProgress) {
      return (
        <Progress precent={this.props.precent} />
      )
    }
  }
  render() {
    return (
      <div>
        <div ref="main">
        </div>
        {this.showProgress()}
      </div>
    );
  }
}
