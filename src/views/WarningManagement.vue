<template>
  <div class="warning-management-container">
    <!-- 搜索区域 -->
    <el-form :inline="true" :model="searchForm" class="search-form" label-width="90px">
      <el-form-item label="预警内容">
        <el-input v-model="searchForm.content" placeholder="请输入预警内容" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="预警状态">
        <el-select v-model="searchForm.status" placeholder="全部" style="width: 150px;">
          <el-option label="全部" value=""></el-option>
          <el-option label="未处理" value="pending"></el-option>
          <el-option label="处理中" value="processing"></el-option>
          <el-option label="已解决" value="resolved"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预警类型">
        <el-select v-model="searchForm.type" placeholder="全部" style="width: 150px;">
          <el-option label="全部" value=""></el-option>
          <el-option label="设备故障" value="equipment"></el-option>
          <el-option label="数据异常" value="data"></el-option>
          <el-option label="系统警告" value="system"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预警时间">
        <el-date-picker
          v-model="searchForm.timeRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 300px;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="flex-shrink: 0;" label-width="0">
        <el-button-group>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table
      :data="filteredWarnings"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="content" label="预警内容" min-width="200"></el-table-column>
      <el-table-column prop="time" label="预警时间" sortable min-width="180"></el-table-column>
      <el-table-column prop="type" label="预警类型" min-width="120">
        <template #default="scope">
          <el-tag :type="typeMap[scope.row.type]">{{ scope.row.typeLabel }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="120">
        <template #default="scope">
          <el-tag :type="statusMap[scope.row.status]">{{ scope.row.statusLabel }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="assignee" label="分配人" min-width="120"></el-table-column>
      <el-table-column prop="assignTime" label="分配时间" sortable min-width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 搜索表单数据
const searchForm = ref({
  content: '',
  status: '',
  type: '',
  timeRange: []
});

// 模拟预警数据
const warnings = ref([
  {
    id: 1,
    content: '服务器CPU使用率持续超过90%',
    time: '2023-10-15 08:30:00',
    type: 'equipment',
    typeLabel: '设备故障',
    status: 'pending',
    statusLabel: '未处理',
    assignee: '张三',
    assignTime: '2023-10-15 09:10:00'
  },
  {
    id: 2,
    content: '数据库连接数达到阈值上限',
    time: '2023-10-15 09:45:00',
    type: 'data',
    typeLabel: '数据异常',
    status: 'processing',
    statusLabel: '处理中',
    assignee: '李四',
    assignTime: '2023-10-15 10:00:00'
  },
  {
    id: 3,
    content: '系统内存泄漏风险',
    time: '2023-10-15 14:20:00',
    type: 'system',
    typeLabel: '系统警告',
    status: 'resolved',
    statusLabel: '已解决',
    assignee: '王五',
    assignTime: '2023-10-15 14:30:00'
  }
]);

// 选中的行数据
const selectedRows = ref([]);

// 状态样式映射
const statusMap = {
  pending: 'warning',
  processing: 'info',
  resolved: 'success'
};

// 类型样式映射
const typeMap = {
  equipment: 'danger',
  data: 'warning',
  system: 'info'
};

// 过滤后的数据
const filteredWarnings = computed(() => {
  return warnings.value.filter(warning => {
    // 预警内容过滤
    if (searchForm.value.content && !warning.content.includes(searchForm.value.content)) {
      return false;
    }
    // 状态过滤
    if (searchForm.value.status && warning.status !== searchForm.value.status) {
      return false;
    }
    // 类型过滤
    if (searchForm.value.type && warning.type !== searchForm.value.type) {
      return false;
    }
    // 时间范围过滤
    if (searchForm.value.timeRange.length) {
      const [start, end] = searchForm.value.timeRange;
      const warningDate = new Date(warning.time);
      if (warningDate < start || warningDate > end) {
        return false;
      }
    }
    return true;
  });
});

// 搜索处理
const handleSearch = () => {
  // 计算属性会自动响应式更新，此处可添加额外逻辑
};

// 重置表单
const handleReset = () => {
  searchForm.value = {
    content: '',
    status: '',
    type: '',
    timeRange: []
  };
};

// 选择变化处理
const handleSelectionChange = (val) => {
  selectedRows.value = val;
};
</script>

<style scoped>
.warning-management-container {
  padding: 20px;
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
  line-height: 32px; /* 与输入框高度一致 */
}

/* 为超窄屏幕添加滚动条但隐藏默认样式 */
.search-form::-webkit-scrollbar {
  height: 4px;
}

.search-form::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 2px;
}
</style>