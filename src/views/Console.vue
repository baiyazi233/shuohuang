<template>
    <div class="console-container">
        <!-- 左侧资产清单树（全量展示+父子结构） -->
        <div class="asset-tree">
            <h3>资产清单（全量）</h3>
            <div class="tree-list">
                <div v-for="item in mockData" :key="item.deviceNumber" class="tree-item"
                    :style="{ marginLeft: item.parentId ? '20px' : '0' }">
                    <!-- 父子结构标识：父节点显示展开图标，子节点缩进 -->
                    <span v-if="!item.parentId">▸</span>
                    <span v-else>├─</span>
                    {{ item.deviceName }} (编号: {{ item.deviceNumber }})
                </div>
            </div>
        </div>

        <!-- 右侧搜索筛选+结果表格 -->
        <div class="search-section">
            <h3>资产筛选</h3>
            <div class="search-form">
                <div class="form-group">
                    <label>代码：</label>
                    <input type="text" v-model="searchForm.code" placeholder="输入代码筛选">
                </div>
                <div class="form-group">
                    <label>名称：</label>
                    <input type="text" v-model="searchForm.name" placeholder="输入设备名称筛选">
                </div>
                <div class="form-group">
                    <label>助记码：</label>
                    <input type="text" v-model="searchForm.mnemonic" placeholder="输入助记码筛选">
                </div>
                <div class="form-group">
                    <label>标签类别：</label>
                    <input type="text" v-model="searchForm.tagCategory" placeholder="输入标签类别筛选">
                </div>
            </div>

            <!-- 新增筛选结果表格 -->
            <div class="search-results">
                <h4>筛选结果（共{{ filteredData.length }}条）</h4>
                <el-table :data="displayedData" border stripe class="result-table">
                    <el-table-column prop="deviceName" label="设备名称" align="center"></el-table-column>
                    <el-table-column prop="deviceNumber" label="设备编号" align="center"></el-table-column>
                    <el-table-column prop="mnemonic" label="助记码" align="center"></el-table-column>
                    <el-table-column prop="unit" label="计量单位" align="center"></el-table-column>
                    <el-table-column prop="code" label="代码" align="center"></el-table-column>
                    <el-table-column prop="tagCategory" label="标签类别" align="center"></el-table-column>
                </el-table>

                <!-- 新增分页控件 -->
                <div class="pagination">
                    <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1">
                        上一页
                    </button>
                    <span>当前页：{{ currentPage }}</span>
                    <button @click="currentPage = Math.min(totalPages, currentPage + 1)"
                        :disabled="currentPage === totalPages">
                        下一页
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Console',
    data() {
        return {
            // 调整mockData为父子结构（前5个为父节点，后续为子节点）
            mockData: [
                ...Array.from({ length: 5 }, (_, index) => ({
                    deviceName: `父设备-${index + 1}`,
                    deviceNumber: `DEV-${String(index + 1).padStart(3, '0')}`,
                    mnemonic: `FZ${index + 1}`,
                    unit: '台',
                    code: `PARENT-${index + 1}`,
                    tagCategory: '主设备',
                    parentId: null // 父节点无父ID
                })),
                ...Array.from({ length: 25 }, (_, index) => ({
                    deviceName: `子设备-${Math.floor(index / 5) + 1}-${index % 5 + 1}`,
                    deviceNumber: `DEV-${String(index + 6).padStart(3, '0')}`,
                    mnemonic: `CZ${index + 1}`,
                    unit: index % 2 === 0 ? '台' : '套',
                    code: `CHILD-${Math.floor(index / 5) + 1}-${index % 5 + 1}`,
                    tagCategory: index % 3 === 0 ? '生产设备' : index % 3 === 1 ? '办公设备' : '测试设备',
                    parentId: `DEV-${String(Math.floor(index / 5) + 1).padStart(3, '0')}` // 关联父节点编号
                }))
            ],
            searchForm: {
                code: '',
                name: '',
                mnemonic: '',
                tagCategory: ''
            },
            currentPage: 1, // 新增：当前页码
            pageSize: 10 // 新增：每页显示数量
        };
    },
    computed: {
        filteredData() {
            return this.mockData.filter(item => {
                const codeMatch = item.code.includes(this.searchForm.code);
                const nameMatch = item.deviceName.includes(this.searchForm.name);
                const mnemonicMatch = item.mnemonic.includes(this.searchForm.mnemonic);
                const tagMatch = item.tagCategory.includes(this.searchForm.tagCategory);
                return codeMatch && nameMatch && mnemonicMatch && tagMatch;
            });
        },
        // 新增：总页数
        totalPages() {
            return Math.ceil(this.filteredData.length / this.pageSize) || 1;
        },
        // 新增：当前页显示的数据（最多10条）
        displayedData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.filteredData.slice(start, end);
        }
    }
};
</script>

<style scoped>
.console-container {
    display: flex;
    gap: 20px;
    height: calc(100vh - 60px);
    /* 适配父容器高度 */
}

.asset-tree {
    flex: 4;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    overflow-y: auto;
}

.search-section {
    flex: 6;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.tree-list {
    margin-top: 15px;
}

.tree-item {
    padding: 8px 12px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: background 0.3s;
}

.tree-item:hover {
    background: #f8f9fa;
}

.search-form {
    margin-top: 15px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

.form-group {
    display: flex;
    align-items: center;
    gap: 10px;
}

.form-group label {
    min-width: 60px;
    color: #666;
}

.form-group input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

/* 新增父子结构样式 */
.tree-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

/* 新增表格样式 */
.search-results {
    margin-top: 20px;
}

.result-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.result-table th,
.result-table td {
    padding: 12px 8px;
    border: 1px solid #e5e7eb;
    min-width: 100px;
}

.result-table th {
    background-color: #f3f4f6;
    font-weight: 600;
}

.result-table tr:nth-child(even) {
    background-color: #f9fafb;
}

/* 新增分页样式 */
.pagination {
    margin-top: 20px;
    display: flex;
    gap: 20px;
    align-items: center;
}

.pagination button {
    padding: 8px 16px;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    transition: all 0.3s;
}

.pagination button:hover {
    background: #f3f4f6;
}

.pagination button:disabled {
    background: #f9fafb;
    color: #9ca3af;
    cursor: not-allowed;
}
</style>