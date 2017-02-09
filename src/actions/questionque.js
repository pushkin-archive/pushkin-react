
import local from './axiosConfigInitial';
import { requestQuestionBegin } from './fetch';
import { error } from './error';

export const ANSWER_COLLECTION = 'ANSWER_COLLECTION';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const SET_RESULTS = 'SET_RESULTS';

export function nextQuestion(nextQuestion) {
  return {
    type: NEXT_QUESTION,
    nextQuestion,
  };
}
function setResults(results) {
  return {
    type: SET_RESULTS,
    results,
  };
}
function saveAnswers(answer) {
  return {
    type: ANSWER_COLLECTION,
    answer,
  };
}
export function postAnswerGetQuestion(response, answer) {
  return (dispatch, getState) => {
    const state = getState().pushkin;
    dispatch(requestQuestionBegin());
    if(Array.isArray(response.choiceId) && response.choiceId.length > 0){
      return Promise.all(response.choiceId.map(currentId => {
         return local.post('response', {
            choiceId: currentId,
            questionId: response.questionId,
            user: {
              id: response.user.id,
            }
          })
          .then(resp => resp.data)
      })).then(data => {
        if (!data[0]) {
          return local.get(`/results/${state.userInfo.id}`)
          .then(resp => resp.data.results)
          .then(results=> {
            dispatch(setResults(results));
            dispatch(nextQuestion(null))
          });
        } else {
        // if (state.options.saveAnswers) {
        //   dispatch(saveAnswers(answer))
        // }
        dispatch(nextQuestion(data[0]))
        }
      })
      .catch(err => {
        return dispatch(error(err));
      });
    }
    return local.post('response', response)
    .then((resp) => {
      if (resp.error) {
        return dispatch(error(resp.error));
      }
      if (!resp.data) {
        return local.get(`/results/${state.userInfo.id}`)
        .then(resp => resp.data.results)
        .then(results=> {
          dispatch(setResults(results));
          dispatch(nextQuestion(null))
        });
      } else {
        // if (state.options.saveAnswers) {
        //   dispatch(saveAnswers(answer))
        // }
         dispatch(nextQuestion(resp.data));
      }
    })
    // .catch(err => {
    //   return dispatch(error(err));
    // });
  };
}
