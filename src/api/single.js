import ajax from './ajax'

const BASE_URL = '/api'
// const BASE_URL = 'http://47.92.137.78:3000'

// 1.单项目评分状态
export const selectSingleState = (bid) => ajax(BASE_URL + '/SingleProject/selectSingleState', {bid})

// 2.多天车流量信息统计
export const selectSingleHeavy = (bid) => ajax(BASE_URL + '/SingleProject/selectSingleHeavy', {bid})

// 3.单项目多天数据完整性统计
export const selectSingleSensor = (bid) => ajax(BASE_URL + '/SingleProject/selectSingleSensor', {bid})


// 4.最新报警及抓拍照片
export const selectSingleAlm = (bid) => ajax(BASE_URL + '/SingleProject/selectSingleAlm', {bid})


// 5.单项目多天数据完整性
export const selectSingleComplete = (bid) => ajax(BASE_URL + '/SingleProject/selectSingleComplete', {bid})


// 6.查单项目传感器数量、类型
export const selectSingleBIM = (bid) => ajax(BASE_URL + '/SingleProject/selectSingleBIM', {bid})

// 7.查单项目传感器历史数据
export const selectSingleData = (bid, sid, stype, start_time, end_time) => ajax(BASE_URL + '/SingleProject/selectSingleData', {bid, sid, stype, start_time, end_time})

// 8.查单项目传感器报警信息
export const selectSingleAlarm = (bid, sid, startTime, endTime) => ajax(BASE_URL + '/SingleProject/selectSingleAlarm', {bid, sid, startTime, endTime})


// 9.查报警详情
export const selectSingleAlarmHis = (bid, sid, time) => ajax(BASE_URL + '/SingleProject/selectSingleAlarmHis', {bid, sid, time})

// 9.查报警详情
export const selectPic = (bid, cameraid, filename) => ajax(BASE_URL + '/SingleProject/takepic', {bid, cameraid, filename})
