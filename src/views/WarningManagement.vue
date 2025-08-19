<template>
  <div class="warning-management-container">
    <!-- 搜索区域 -->
    <el-form :inline="true" :model="searchForm" class="search-form" label-width="90px">
      <el-form-item label="预警内容">
        <el-input v-model="searchForm.content" placeholder="请输入预警内容" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="预警状态">
        <el-select v-model="searchForm.status" placeholder="全部" style="width: 150px;">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="未处理" value="0"></el-option>
          <el-option label="处理中" value="1"></el-option>
          <el-option label="已解决" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预警类型">
        <el-select v-model="searchForm.type" placeholder="全部" style="width: 150px;">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="设备故障" value="0"></el-option>
          <el-option label="数据异常" value="1"></el-option>
          <el-option label="系统警告" value="2"></el-option>
          <el-option label="安全警报" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预警时间">
        <el-date-picker v-model="searchForm.timeRange" type="daterange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期" style="width: 300px;"></el-date-picker>
      </el-form-item>
      <el-form-item style="flex-shrink: 0;" label-width="0">
        <el-button-group>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <el-loading-spinner></el-loading-spinner>
      <p>加载预警数据中...</p>
    </div>

    <!-- 错误提示 -->
    <div v-if="error && !loading" class="error-state">
      <el-alert type="error" :title="error" show-icon></el-alert>
    </div>

    <!-- 表格区域 -->
    <el-table v-if="!loading && !error" :data="awarenessList" style="width: 100%"
      @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="content" label="预警内容" min-width="200"></el-table-column>
      <el-table-column prop="time" label="预警时间" sortable min-width="180"></el-table-column>
      <el-table-column prop="typeLabel" label="预警类型" min-width="120">
        <template #default="scope">
          <el-tag :type="typeMap[scope.row.type]">{{ scope.row.typeLabel }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="statusLabel" label="状态" min-width="120">
        <template #default="scope">
          <el-tag :type="statusMap[scope.row.status]">{{ scope.row.statusLabel }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="assignee" label="分配人" min-width="120"></el-table-column>
      <el-table-column prop="assignTime" label="分配时间" sortable min-width="180"></el-table-column>
    </el-table>

    <!-- 分页控件 -->
    <div v-if="!loading && !error && totalCount > 0" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        :total="totalCount"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>

    <!-- 空状态 -->
    <div v-if="!loading && !error && awarenessList.length === 0" class="empty-state">
      <el-empty description="暂无预警数据"></el-empty>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { describeAwarenessList } from '../api';

// 搜索表单数据
const searchForm = ref({
  content: '',
  status: '-1', // -1表示全部
  type: '-1',   // -1表示全部
  timeRange: []
});

// 分页相关
const currentPage = ref(1);
const pageSize = ref(10);
const totalCount = ref(0);

// 预警数据
const awarenessList = ref([]);
const loading = ref(false);
const error = ref(null);
const selectedRows = ref([]);

// 状态样式映射
const statusMap = {
  0: 'warning',  // 未处理
  1: 'info',     // 处理中
  2: 'success'   // 已解决
};

// 类型样式映射
const typeMap = {
  0: 'danger',   // 设备故障
  1: 'warning',  // 数据异常
  2: 'info',     // 系统警告
  3: 'primary'   // 安全警报
};

// 添加类型标签转换函数
const getTypeLabel = (type) => {
  const labels = ['设备故障', '数据异常', '系统警告', '安全警报'];
  return labels[type] || '未知类型';
};

// 添加状态标签转换函数
const getStatusLabel = (status) => {
  const labels = ['未处理', '处理中', '已解决'];
  return labels[status] || '未知状态';
};

// 添加日期格式化函数
const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

// 获取预警列表数据
const fetchWarningList = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await describeAwarenessList({
      Content: searchForm.value.content,
      Status: searchForm.value.status !== '-1' ? [parseInt(searchForm.value.status)] : [-1],
      Type: searchForm.value.type !== '-1' ? [parseInt(searchForm.value.type)] : [-1],
      StartTime: searchForm.value.timeRange[0]?.toISOString(),
      EndTime: searchForm.value.timeRange[1]?.toISOString(),
      Offset: (currentPage.value - 1) * pageSize.value,
      PageSize: pageSize.value
    });
    // 转换API返回数据格式以匹配表格需求
    awarenessList.value = (response.AwarenessList || []).map(item => ({
      id: item.Id,
      content: item.Content,
      time: formatDate(item.AwareTime),
      type: item.Type,
      typeLabel: getTypeLabel(item.Type),
      status: item.Status,
      statusLabel: getStatusLabel(item.Status),
      assignee: item.Assignee || '未分配',
      assignTime: item.AssignTime ? formatDate(item.AssignTime) : '未分配'
    }));
    totalCount.value = response.TotalCount || 0;
    console.log('awarenessList', awarenessList.value);
  } catch (err) {
    error.value = `获取预警数据失败: ${err.message}`;
    console.error('Error fetching awareness list:', err);
  } finally {
    loading.value = false;
  }
};

// 页面加载时获取数据
onMounted(() => {
  fetchWarningList();
});

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1; // 重置为第一页
  fetchWarningList();
};

// 重置表单
const handleReset = () => {
  searchForm.value = {
    content: '',
    status: '-1',
    type: '-1',
    timeRange: []
  };
  currentPage.value = 1;
  fetchWarningList();
};

// 分页大小变化
const handleSizeChange = (val) => {
  pageSize.value = val;
  currentPage.value = 1; // 重置为第一页
  fetchWarningList();
};

// 当前页码变化
const handleCurrentChange = (val) => {
  currentPage.value = val;
  fetchWarningList();
};

// 选择变化处理
const handleSelectionChange = (val) => {
  selectedRows.value = val;
};
</script>

<style scoped>
.warning-management-container {
  width: 100%;
  min-width: 800px; /* 设置最小宽度确保布局正常 */
}

.search-form {
  margin-bottom: 20px;
  background-color: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  overflow-x: auto;
  align-items: center;
}

.search-form .el-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 0;
  min-width: 0;
}

.search-form .el-form-item__label {
  line-height: 32px;
  /* 与输入框高度一致 */
}

/* 为超窄屏幕添加滚动条但隐藏默认样式 */
.search-form::-webkit-scrollbar {
  height: 4px;
}

.search-form::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 2px;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
}

.error-state {
  margin-bottom: 15px;
}

.pagination-container {
  margin-top: 15px;
  text-align: right;
}

.empty-state {
  margin: 40px 0;
}
</style>