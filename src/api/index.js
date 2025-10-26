import request from '../utils/request';

/**
 * 获取资产列表
 * @param {Object} params - 请求参数
 * @param {number} params.Code - 资产编码
 * @param {string} params.Name - 资产名称
 * @param {string} params.Mnemonic - 助记码
 * @param {string} params.Unit - 单位
 * @param {number} params.Offset - 分页偏移量
 * @returns {Promise<Object>} 包含资产列表和总数的响应
 */
export function describeAssetList(params) {
  return request({
    url: '',
    method: 'post',
    data: {
      Action: 'DescribeAssetList',
      ...params
    }
  }).then(response => {
    return response;
  });
}

/**
 * 获取设备基本信息列表
 * @param {Object} params - 请求参数
 * @param {number} params.AssetCode - 资产编码（必填）
 * @param {number} params.Offset - 分页偏移量
 * @returns {Promise<Object>} 包含设备基本信息列表和总数的响应
 */
export function describeDeviceBasicInfoList(params) {
  return request({
    url: '',
    method: 'post',
    data: {
      Action: 'DescribeDeviceBasicInfoList',
      ...params
    }
  }).then(response => {
    return response;
  });
}

/**
 * 创建设备信息
 * @param {Object} params - 请求参数
 * @param {number} params.AssetCode - 资产编码
 * @param {string} params.Name - 设备名称
 * @param {string} params.DeviceID - 设备ID
 * @param {string} params.Manufacturer - 制造商
 * @param {string} params.Model - 型号
 * @param {string} params.PurchaseDate - 购置日期
 * @param {number} params.LifeSpan - 使用年限
 * @returns {Promise<Object>} 响应结果
 */
export function createDeviceInfo(params) {
  return request({
    url: '',
    method: 'post',
    data: {
      Action: 'CreateDeviceInfo',
      ...params
    }
  }).then(response => {
    return response;
  });
}

/**
 * 获取设备维护信息列表
 * @param {Object} params - 请求参数
 * @param {number} params.AssetCode - 资产编码
 * @param {number} params.Offset - 分页偏移量
 * @param {string} params.SearchKey - 搜索关键字
 * @returns {Promise<Object>} 包含维护信息列表和总数的响应
 */
export function describeDeviceMaintainInfoList(params) {
  return request({
    url: '',
    method: 'post',
    data: {
      Action: 'DescribeDeviceMaintainInfoList',
      ...params
    }
  }).then(response => {
    return response;
  });
}

/**
 * 创建设备维护信息
 * @param {Object} params - 请求参数
 * @param {number} params.AssetCode - 资产编码
 * @param {string} params.DeviceID - 设备ID
 * @param {string} params.Name - 设备名称
 * @param {string} params.MaintainDetails - 维护详情
 * @param {string} params.MaintainTime - 维护时间
 * @returns {Promise<Object>} 响应结果
 */
export function createDeviceMaintainInfo(params) {
  return request({
    url: '',
    method: 'post',
    data: {
      Action: 'CreateDeviceMaintainInfo',
      ...params
    }
  }).then(response => {
    return response;
  });
}

/**
 * 创建设备报废信息
 * @param {Object} params - 请求参数
 * @param {number} params.AssetCode - 资产编码
 * @param {string} params.DeviceID - 设备ID
 * @param {string} params.Name - 设备名称
 * @param {string} params.Reason - 报废原因
 * @param {string} params.Action - 报废操作
 * @param {string} params.Time - 报废时间
 * @returns {Promise<Object>} 响应结果
 */
export function createDeviceScrapInfo(params) {
  return request({
    url: '',
    method: 'post',
    data: {
      Action: 'CreateDeviceScrapInfo',
      ...params
    }
  }).then(response => {
    return response;
  });
}

/**
 * 获取预警列表
 * @param {Object} params - 请求参数
 * @param {string} params.Content - 预警内容
 * @param {number[]} params.Status - 状态列表
 * @param {number[]} params.Type - 类型列表
 * @param {string} params.StartTime - 开始时间
 * @param {string} params.EndTime - 结束时间
 * @param {number} params.Offset - 分页偏移量
 * @returns {Promise<Object>} 包含预警列表和总数的响应
 */
export function describeAwarenessList(params) {
  return request({
    url: '',
    method: 'post',
    data: {
      Action: 'DescribeAwarenessList',
      ...params
    }
  }).then(response => {
    return response;
  });
}

/**
 * 创建预警信息
 * @param {Object} params - 请求参数
 * @param {string} params.Content - 预警内容
 * @param {string} params.Time - 预警时间
 * @param {number} params.Type - 预警类型（0-检测预警）
 * @param {number} params.Status - 预警状态（0-未分配，1-已分配）
 * @param {string} params.Assignee - 负责人
 * @returns {Promise<Object>} 响应结果
 */
export function createAwarenessInfo(params) {
  return request({
    url: '',
    method: 'post',
    data: {
      Action: 'CreateAwarenessInfo',
      ...params
    }
  }).then(response => {
    return response;
  });
}

/**
 * 本地Mock存储 - 预警设置
 */
let warningSettingsMockData = {
  // 数据检测预警设置
  dataScanWarning: 'yes',
  taskFailureWarning: 'yes',
  
  // 设备预警设置
  deviceFailureWarning: 'yes',
  cpuThreshold: 50,
  memoryThreshold: 50,
  storageThreshold: 50,
  
  // 介质预警设置
  cdCheckPeriod: 1,
  cdWarningAdvance: 1,
  hddCheckPeriod: 1,
  hddWarningAdvance: 1,
  otherMediaCheckPeriod: 1,
  otherMediaWarningAdvance: 1,
  
  // 预警升级设置
  warningUpgradeThreshold: 1,
  contactPhones: ['15212345678'],
  contactEmails: ['12346@qq.com']
};

/**
 * 获取预警设置 (本地Mock版)
 * @returns {Promise<Object>} 预警设置数据
 */
export const getWarningSettings = () => {
  // 模拟网络延迟
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 0,
        message: 'success',
        data: { ...warningSettingsMockData }
      });
    }, 500);
  });
};

/**
 * 保存预警设置 (本地Mock版)
 * @param {Object} settings - 预警设置数据
 * @returns {Promise<Object>} 保存结果
 */
export const saveWarningSettings = (settings) => {
  // 模拟网络延迟
  return new Promise((resolve) => {
    setTimeout(() => {
      // 更新本地Mock数据
      warningSettingsMockData = { ...warningSettingsMockData, ...settings };
      
      resolve({
        code: 0,
        message: '保存成功',
        data: null
      });
    }, 500);
  });
};

/**
 * 用户登录
 * @param {Object} params - 请求参数
 * @param {string} params.username - 用户名
 * @param {string} params.phone - 手机号
 * @returns {Promise<Object>} 登录响应
 */
export function userLogin(params) {
  return request({
    url: '',
    method: 'post',
    data: {
      Action: 'UserLogin',
      ...params
    }
  }).then(response => {
    return response;
  });
}

/**
 * 用户注册
 * @param {Object} params - 请求参数
 * @param {string} params.username - 用户名
 * @param {string} params.phone - 手机号
 * @param {string} params.password - 密码
 * @returns {Promise<Object>} 注册响应
 */
export function userRegister(params) {
  return request({
    url: '',
    method: 'post',
    data: {
      Action: 'UserRegister',
      ...params
    }
  }).then(response => {
    return response;
  });
}