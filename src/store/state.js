import Cookies from 'js-cookie'

export default {
  msg: Cookies.get('Token') ? JSON.parse(Cookies.get('Token')) : {},
  bid: 13,
  groupId: 1,
  isCollapse: false,
  minLeftMenuWidth: 35,
  maxLeftMenuWidth: 180,
  option: {},
  sidebar: {
    opened: true,
    width: 180
  }
}
