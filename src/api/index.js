import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // 假设后端API基地址
  timeout: 5000
});

// 其他现有接口...

export const registerDevice = async (deviceInfo) => {
  try {
    const response = await api.post('/api/devices', deviceInfo);
    return response.data;
  } catch (error) {
    throw new Error(`设备登记失败: ${error.response?.data?.message || error.message}`);
  }
};