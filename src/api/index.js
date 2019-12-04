import ajax from './ajax'

const BASE_URL = '/api'
// const BASE_URL = 'http://47.92.137.78:3000'

// 1.登录接口
export const LoginIn = (username, password) => ajax(BASE_URL + '/login/login', {username, password}, 'POST')

// 2.查询当前账号下的桥梁
export const getBridgeInfo = (uid) => ajax(BASE_URL + '/projects/selectGis', {uid})

// 3. 健康评分
export const selectScore = (uid) => ajax(BASE_URL + '/projects/selectScore', {uid})

// 4. 各项目未确认报警数量
export const selectAlarm = (uid) => ajax(BASE_URL + '/projects/selectAlm', {uid})

// 5. 项目在离线数量
export const selectState = (uid) => ajax(BASE_URL + '/projects/selectState', {uid})

// 6. 数据完整性展示
export const selectComplete = (uid) => ajax(BASE_URL + '/projects/selectComplete', {uid})

// 7. 最新警报详情
export const selectAlmDetails = (uid) => ajax(BASE_URL + '/projects/selectAlmDetails', {uid})

// 3.查询当前账号下账号
export const getTree = (uid) => ajax(BASE_URL + '/login/select_user', {uid})

// 4.新增用户
export const addUsers = (username, password, parentId) => ajax(BASE_URL + '/login/insert_user', {username, password, parentId}, 'POST')

// 5.修改权限及分配设施
export const updatePower = (userID, key1, key2) => ajax(BASE_URL + '/login/update_power', {userID, key1, key2}, 'POST')

// 6.修改密码
export const updateAdmin = (password, uid) => ajax(BASE_URL + '/login/update_password', {password, uid}, 'POST')

// 7.删除用户
export const deleteAdmin = (uid) => ajax(BASE_URL + '/login/delete_user', {uid}, 'POST')

// 8.新增监测物
export const addFacility = (StructureName, StructureTypeID, groupid, lng, lat, versionnum, base_sid, offset, mc_whether, uid) => ajax(BASE_URL + '/struct/insert_struct', {StructureName, StructureTypeID, groupid, lng, lat, versionnum, base_sid, offset, mc_whether, uid}, 'POST')

// 9.查询项目类型
export const getStructureType = () => ajax(BASE_URL + '/struct/select_structType')

// 10.查询分组
export const reqGroup = () => ajax(BASE_URL + '/struct/select_group')

// 11.查询监测物id
export const reqBid = (id) => ajax(BASE_URL + '/struct/select_bid', {id})

// 12.查询监测站id
export const reqMid = (id) => ajax(BASE_URL + '/struct/select_mid', {id}) // insert_msc

// 13.新增监测站
export const addCollect = (mscName, mscIp, mscTypeIp, bid, updateTime) => ajax(BASE_URL + '/struct/insert_msc', {mscName, mscIp, mscTypeIp, bid, updateTime}) // insert_msc

// 14.新增监测点
export const addSensor = (channel_id, mid, sensorid, sensorname, arg, frequency, updatetime, msc_ip, stype_id, base, filter, alm, profile_id, volume, base_flag, linksensor, sensorcode) => ajax(BASE_URL + '/struct/insert_sensor', {channel_id, mid, sensorid, sensorname, arg, frequency, updatetime, msc_ip, stype_id, base, filter, alm, profile_id, volume, base_flag, linksensor, sensorcode}) // insert_msc

// 15.查监测物基础信息
export const getFacility = (id) => ajax(BASE_URL + '/struct/select_facility', {id}) // insert_msc

// 16.更新监测物
export const updateFacility = (StructureName, StructureTypeID, groupid, lat, lng, StructureID) => ajax(BASE_URL + '/struct/update_struct', {StructureName, StructureTypeID, groupid, lat, lng, StructureID}, 'POST') // insert_msc

// 17.删除监测物
export const deleteFacility = (StructureID) => ajax(BASE_URL + '/struct/delete_struct', {StructureID}) // insert_msc

// 18.查监测站基础信息
export const getCollect = (id) => ajax(BASE_URL + '/struct/select_msc', {id}) // insert_msc

// 19.修改监测站基础信息
export const updateCollect = (mscName, mscIp, mscTypeIp, id, updateTime) => ajax(BASE_URL + '/struct/update_msc', {mscName, mscIp, mscTypeIp, id, updateTime}) // insert_msc

// 20.删除监测站
export const deleteCollect = (id) => ajax(BASE_URL + '/struct/delete_msc', {id}) // insert_msc

// 21.查询账号管理树状结构
export const getTrees = (userID) => ajax(BASE_URL + '/struct/getTree', {userID}) // insert_msc

// 22.查询监测点
export const getSensor = (id) => ajax(BASE_URL + '/struct/select_sensor', {id})

// 23.查询所有监测站类型
export const getMscType = () => ajax(BASE_URL + '/struct/select_msc_type')

// 24.查通道号
export const getChannel = (msc_type_id) => ajax(BASE_URL + '/struct/select_type', {msc_type_id})

// 25. 查监测站类型
export const getCollectType = (id, level) => ajax(BASE_URL + '/struct/select_collect_type', {id, level})

// 26. 监测点删除
export const deleteSensor = (id) => ajax(BASE_URL + '/struct/delete_sensor', {id})

// 27. 监测点修改
export const updateSensor = (channel_id, mid, sensorid, sensorname, arg, frequency, updatetime, msc_ip, stype_id, base, filter, alm, profile_id, volume, base_flag, linksensor, sensorcode, id) => ajax(BASE_URL + '/struct/update_sensor', {channel_id, mid, sensorid, sensorname, arg, frequency, updatetime, msc_ip, stype_id, base, filter, alm, profile_id, volume, base_flag, linksensor, sensorcode, id})

// 28. 查分组
export const selectGroup = (uid) => ajax(BASE_URL + '/struct/selectGroup', {uid})

// 29. 根据所选分组查监测物
export const selectGroupFacility = (groupid) => ajax(BASE_URL + '/struct/selectStructure', {groupid})

// 30.查传感器类型
export const selectSensorType = (bid) => ajax(BASE_URL + '/sysconfig/select_sensorType', {bid})

// 31.根据所选监测点类型查报警阈值
// export const selDetail = (typeId) => ajax('/selType', {typeId})

// 32.根据所选监测点类型查报警阈值
export const selDetail = (bid, sTypeId) => ajax(BASE_URL + '/sysconfig/select_sensorID', {bid, sTypeId})

// 33. 修改报警阈值
export const updateDetail = (arr) => ajax(BASE_URL + '/sysconfig/update_sensorAlm', {arr}, 'POST')

// 34. 查流量阈值
export const selectFlow = (bid) => ajax(BASE_URL + '/sysconfig/select_volume', {bid})

// 35. 修改量阈值
export const updateFlow = (id, volume) => ajax(BASE_URL + '/sysconfig/update_volume', {id, volume})

// 36. 存储卡号和到期时间
export const storageCard = (bid, cardnum, duetime) => ajax(BASE_URL + '/sysconfig/update_cardnum', {bid, cardnum, duetime}, 'POST')

// 37. 查卡号和到期时间
export const getCard = (bid) => ajax(BASE_URL + '/sysconfig/select_cardnum', {bid})

// 38. 查卡号基础信息
export const getCardData = (groupid) => ajax(BASE_URL + '/sysconfig/select_duetime', {groupid})

// 39.查电话号
export const getTelPhone = (bid) => ajax(BASE_URL + '/sysconfig/select_alarmPhone', {bid})

// 40.修改电话号
export const updateTelPhone = (bid, telephone, mailbox) => ajax(BASE_URL + '/sysconfig/update_alarmPhone ', {bid, telephone, mailbox}, 'POST')

// 41.查当前账号下的监测点
export const selectUserSensor = (uid) => ajax(BASE_URL + '/struct/select_user_sensor', {uid})

// 42.查历史数据
export const select = (ip, db, epoch, q) => ajax(`${ip}`, {db, epoch, q})

// 42.查健康趋势
export const selectHealthy = (count, structureId) => ajax(BASE_URL + '/statusAssess/select_health', {count, structureId})
