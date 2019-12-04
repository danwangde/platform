/*
直接更新state的多个方法的对象
 */
import {
  RECEIVE_LOGIN,
  RECEIVE_BID,
  RECEIVE_GROUP,
  HANDLE_LEFT_MENU,
  SET_LEFT_COLLAPSE,
  SET_OPTION
} from './mutation-types'

export default {
  [RECEIVE_LOGIN] (state, {msg}) {
    state.msg = msg
    sessionStorage.setItem('msg', JSON.stringify(msg))
  },
  [RECEIVE_BID] (state, {bid}) {
    state.bid = bid
    sessionStorage.setItem('bid', JSON.stringify(bid))
  },
  [RECEIVE_GROUP] (state, {groupId}) {
    state.groupId = groupId
    sessionStorage.setItem('groupId', JSON.stringify(groupId))
  },
  [HANDLE_LEFT_MENU] (state) {
    if (state.sidebar.opened) { // true
      state.sidebar.width = state.minLeftMenuWidth
    } else {
      state.sidebar.width = state.maxLeftMenuWidth
    }
    state.sidebar.opened = !state.sidebar.opened
  },
  [SET_LEFT_COLLAPSE] (state) {
    state.isCollapse = !state.isCollapse
  },
  [SET_OPTION] (state, {option}) {
    state.option = option
  },
}
