/*
通过mutation间接更新state的多个方法的对象
 */
import {RECEIVE_LOGIN, RECEIVE_BID, RECEIVE_GROUP, HANDLE_LEFT_MENU, SET_LEFT_COLLAPSE, SET_OPTION} from './mutation-types'
export default {
  getMsg ({commit}, msg) {
    commit(RECEIVE_LOGIN, {msg})
  },
  getBid ({commit}, bid) {
    commit(RECEIVE_BID, {bid})
  },
  getGroup ({commit}, groupId) {
    commit(RECEIVE_GROUP, {groupId})
  },
  handleLeftMenu ({commit}) {
    commit(HANDLE_LEFT_MENU)
  },
  setLeftCollapse ({commit}) {
    commit(SET_LEFT_COLLAPSE)
  },
  setOption ({commit}, option) {
    commit(SET_OPTION, {option})
  }
}
