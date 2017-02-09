import { combineReducers } from 'redux';
import nextpage from './nextpage';
import questionque from './questionque';
import userInfo from './userInfo';

export default combineReducers({
  nextpage,
  questionque,
  userInfo,
});
