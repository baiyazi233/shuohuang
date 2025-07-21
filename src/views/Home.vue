<template>
    <div class="home">
      <aside class="sidebar">
        <nav>
          <router-link to="/console">控制台</router-link>
          <router-link to="/device-registration">设备登记</router-link>
          <router-link to="/warning-management">预警管理</router-link>
        </nav>
      </aside>
      <main class="main-content">
        <router-view></router-view>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home'
  };
  </script>
  
  <style scoped>
  .home {
    display: flex;
    min-height: 100vh; /* 确保侧边栏占满全屏高度 */
  }
  
  .sidebar {
    width: 220px;
    background-color: #2c3e50; /* 深背景色，更符合后台风格 */
    padding: 20px 0;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  }
  
  .sidebar nav a {
    display: block;
    padding: 12px 20px;
    color: #ffffff; /* 白色文字 */
    text-decoration: none;
    transition: all 0.3s;
    border-left: 3px solid transparent;
  }
  
  .sidebar nav a:hover {
    background-color: #34495e; /* 悬停背景色 */
    border-left-color: #42b983; /* 左侧高亮线 */
  }
  
  .sidebar nav a.router-link-exact-active {
    background-color: #34495e;
    border-left-color: #42b983; /* 激活状态左侧高亮 */
    font-weight: bold;
  }
  
  .main-content {
    flex: 1;
    padding: 30px;
    background-color: #f8f9fa; /* 主内容浅背景 */
  }
  </style>