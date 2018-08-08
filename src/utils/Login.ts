/**
 * 主要用来处理用户登录控制，存储, 获取和删除session
 */
const KEY = 'USER'
export default {
  setLoginState: (userInfo) => {
    window.sessionStorage.setItem(KEY, JSON.stringify(userInfo))
  },
  getLoginState: () => {
    return window.sessionStorage.getItem(KEY)
  },
  deleteLoginState: () => {
    return new Promise((resolve, reject) => {
      window.sessionStorage.removeItem(KEY) ? resolve({ 'isDeleted': true }) : reject({ 'isDeleted': false })
    })
  }
}