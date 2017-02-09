import local from './axiosConfigInitial';
import { error } from './error';
import  { requestQuestionBegin } from './fetch';

export const FETCHING_LIST = 'FETCHING_LIST';
export const BUILD_INITIAL = 'BUILD_INITIAL';
export const USER_ID = 'USER_ID';

function buildInitial(list) {
      console.log('buildInitial action', list);
  return {
    type: BUILD_INITIAL,
    list,
  }
}
function sendUserId(id) {
  return {
    type: USER_ID,
    id,
  };
}
export function questionList() {
  return (dispatch, getState) => {
    console.log('questionlist');
    const action = requestQuestionBegin();
    console.log('requestionBegin', action);
    dispatch(action);
    // console.log('getting initial questions', dispatch, getState());
    console.log('fetching');
    return local.get('initialQuestions')
    .then((resp) => {
      console.log('resp', resp.data);
      if (resp.error) {
        console.log('err')
        return dispatch(error(resp.error));
      }
      console.log('ldInitial', resp.data.questions);
      dispatch(buildInitial(resp.data.questions));
      return Promise.resolve(resp.data);
    })
    .then(data => {
      console.log('setting user id');
      return dispatch(sendUserId(data.user.id))
    })
    .catch((err) => {
      console.error('ERROR', err);
      return dispatch(error(err));
    });
  };
}
