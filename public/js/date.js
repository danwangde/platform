export const getDate = (Date) => {
  let Y = Date.getFullYear()
  let M = Date.getMonth() + 1
  M = M < 10 ? '0' + M : M
  let D = Date.getDate()
  D = D < 10 ? '0' + D : D
  let H = Date.getHours()
  H = H < 10 ? '0' + H : H
  let Mi = Date.getMinutes()
  Mi = Mi < 10 ? '0' + Mi : Mi
  let S = Date.getSeconds()
  S = S < 10 ? '0' + S : S
  return Y + '-' + M + '-' + D + ' ' + H + ':' + Mi + ':' + S
}

export const getDateSpecial = (Date) => {
  let Y = Date.getFullYear()
  let M = Date.getMonth() + 1
  M = M < 10 ? '0' + M : M
  let D = Date.getDate()
  D = D < 10 ? '0' + D : D
  let H = Date.getHours()
  H = H < 10 ? '0' + H : H
  let Mi = Date.getMinutes()
  Mi = Mi < 10 ? '0' + Mi : Mi
  let S = Date.getSeconds()
  S = S < 10 ? '0' + S : S
  let ss = Date.getMilliseconds()
  return Y + '-' + M + '-' + D + '-' + H + '-' + Mi + '-' + S + '-' + ss
}

export const getDay = (Date) => {
  let Y = Date.getFullYear()
  let M = Date.getMonth() + 1
  M = M < 10 ? '0' + M : M
  let D = Date.getDate()
  D = D < 10 ? '0' + D : D
  let H = Date.getHours()
  H = H < 10 ? '0' + H : H
  let Mi = Date.getMinutes()
  Mi = Mi < 10 ? '0' + Mi : Mi
  let S = Date.getSeconds()
  S = S < 10 ? '0' + S : S
  return Y + '-' + M + '-' + D
}

export const getDates = (Date) => {
  let Y = Date.getFullYear()
  let M = Date.getMonth() + 1
  M = M < 10 ? '0' + M : M
  let D = Date.getDate()
  D = D < 10 ? '0' + D : D
  let H = Date.getHours()
  H = H < 10 ? '0' + H : H
  let Mi = Date.getMinutes()
  Mi = Mi < 10 ? '0' + Mi : Mi
  let S = Date.getSeconds()
  S = S < 10 ? '0' + S : S
  return M + '/' + D
}

export const getCurrentTime = (date) => {
  let month = date.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }
  let day = date.getDate()
  if (day < 10) {
    day = '0' + day
  }

  let hours = date.getHours()
  if (hours < 10) {
    hours = '0' + hours
  }
  let minutes = date.getMinutes()
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  let seconds = date.getSeconds()
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  let msec = date.getMilliseconds()
  if (msec < 10) {
    msec = '00' + msec
  } else if (msec < 100) {
    msec = '0' + msec
  }
  let timeStr = date.getFullYear() + '-' +
    month + '-' +
    day + ' ' +
    hours + ':' +
    minutes + ':' +
    seconds + '.' + msec
  return timeStr
}
