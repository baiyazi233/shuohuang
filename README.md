
## 核心功能模块

### 1. 控制台 (Console)
- **路由**: `/console`
- **功能**: 系统主控制面板，资产清单展示

### 2. 设备登记 (DeviceRegistration)
- **路由**: `/device-registration`
- **功能**: 设备信息录入、设备维护记录、设备报废处理

### 3. 预警管理 (WarningManagement)
- **路由**: `/warning-management`
- **功能**: 预警信息查看、处理、状态管理

### 4. 预警设置 (WarningSettings)
- **路由**: `/warning-setting`
- **功能**: 预警规则配置、阈值设置、通知设置

## 主要API接口

### 资产管理
- `DescribeAssetList`: 获取资产列表
- `DescribeDeviceBasicInfoList`: 获取设备基本信息

### 设备管理
- `CreateDeviceInfo`: 创建设备信息
- `CreateDeviceMaintainInfo`: 创建设备维护记录
- `CreateDeviceScrapInfo`: 创建设备报废记录
- `DescribeDeviceMaintainInfoList`: 获取设备维护信息列表

### 预警管理
- `DescribeAwarenessList`: 获取预警列表
- `CreateAwarenessInfo`: 创建预警信息

## 开发环境配置

### 环境要求
- Node.js (支持ES6+)
- npm 或 yarn
- Go 环境 (后端)

### 本地开发启动

1. **安装依赖**
```bash
npm install
```

2. **启动前端开发服务器**
```bash
npm run dev
```
前端服务默认运行在开发端口，通过代理访问后端API

3. **启动后端服务**
后端服务需要在7001端口启动

### 项目构建与部署

1. **构建生产版本**
```bash
npm run build
```
构建结果输出到 `dist/` 目录

2. **预览生产版本**
```bash
npm run preview
```
启动本地HTTP服务器预览构建结果

## 重要配置说明

### 代理配置
- 前端开发时通过Vite代理将 `/api` 请求转发到后端 `http://localhost:7001`
- 生产环境需要配置相应的反向代理

### API通信方式
- 所有API请求使用POST方法
- 请求体包含 `Action` 字段区分不同接口
- 统一的请求/响应拦截器处理加载状态和错误

## 数据库
- 数据库初始化脚本: `pkg/Dump20250811.sql`
- 包含资产、设备、预警等相关表结构

## 注意事项

1. **开发调试**: 项目使用Element Plus组件库，确保全局样式一致性
2. **API调用**: 所有接口调用都经过统一的request工具封装
3. **路由结构**: 采用嵌套路由，主页面为容器，子页面为具体功能模块
4. **错误处理**: 统一的错误提示和加载状态管理
5. **代码规范**: 使用ES6+语法，组件采用Vue 3 Composition API

## 快速上手建议

1. 先熟悉项目整体结构和路由配置
2. 了解API接口文档和数据结构
3. 从简单的页面组件开始阅读代码
4. 重点关注 `src/api/index.js` 和 `src/utils/request.js` 了解数据交互
5. 查看各个view组件了解具体业务逻辑

## 联系方式
如有技术问题，请查阅代码注释或联系原开发团队。