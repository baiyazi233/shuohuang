<template>
    <div class="console-container">
        <!-- 左侧资产清单树（全量展示+父子结构） -->
        <!-- 修改左侧资产清单树部分 -->
        <div class="asset-tree">
            <h3>资产清单（全量）</h3>
            <div class="tree-list">
                <div v-for="item in assetList" :key="item.Id" 
                     class="tree-item asset-item"
                     :style="{ marginLeft: item.parentId ? '20px' : '0' }"
                     @mouseenter="hoveredAsset = item.Id"
                     @mouseleave="hoveredAsset = null">
                    <span class="asset-info">
                        {{ item.Name }} (编号: {{ item.Code }})
                    </span>
                    <!-- hover时显示的添加设备按钮 -->
                    <el-button 
                        v-show="hoveredAsset === item.Id"
                        type="primary" 
                        size="small" 
                        class="hover-add-btn"
                        @click="goToAddDevice(item)">
                        添加设备
                    </el-button>
                </div>
            </div>
        </div>

        <!-- 右侧搜索筛选+结果表格 -->
        <div class="search-section">
            <h3>资产筛选</h3>
            <div class="search-form">
                <div class="form-group">
                    <label>代码：</label>
                    <input type="text" v-model="searchForm.Code" placeholder="输入代码筛选">
                </div>
                <div class="form-group">
                    <label>名称：</label>
                    <input type="text" v-model="searchForm.Name" placeholder="输入设备名称筛选">
                </div>
                <div class="form-group">
                    <label>助记码：</label>
                    <input type="text" v-model="searchForm.Mnemonic" placeholder="输入助记码筛选">
                </div>
                <div class="form-group">
                    <label>标签类别：</label>
                    <input type="text" v-model="searchForm.Offset" placeholder="输入标签类别筛选">
                </div>
            </div>

            <!-- 新增筛选结果表格 -->
            <div class="search-results">
                <h4>筛选结果（共{{ filteredData.length }}条）</h4>
                <el-table :data="filteredData" border stripe class="result-table">
                    <el-table-column prop="Name" label="设备名称" align="center"></el-table-column>
                    <el-table-column prop="Code" label="设备编号" align="center"></el-table-column>
                    <el-table-column prop="Mnemonic" label="助记码" align="center"></el-table-column>
                    <el-table-column prop="Unit" label="计量单位" align="center"></el-table-column>
                    <el-table-column prop="Offset" label="标签类别" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" width="120">
                        <template #default="{ row }">
                            <el-button type="primary" size="small" @click="goToAddDevice(row)">
                                去添加设备
                            </el-button>
                        </template>
                    </el-table-column>
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
import { describeAssetList } from '../api';

export default {
    name: 'Console',
    data() {
        return {
            searchForm: {
                Code: '',
                Name: '',
                Mnemonic: '',
                Offset: ''
            },
            assetList: [],
            totalCount: 0,
            loading: false,
            error: null,
            currentOffset: 0,
            pageSize: 10,
            hoveredAsset: null  // 添加这个状态
        };
    },
    methods: {
        async fetchAssetData() {
            this.loading = true;
            this.error = null;
            try {
                const response = await describeAssetList({
                    Offset: this.currentOffset,
                    // 添加其他筛选参数
                    Name: this.searchForm.Name,
                    Mnemonic: this.searchForm.Mnemonic
                });
                this.assetList = response.AssetList;
                this.totalCount = response.TotalCount;
            } catch (err) {
                this.error = err.message;
                console.error('获取资产数据失败:', err);
            } finally {
                this.loading = false;
            }
        },
        // 新增方法：跳转到设备添加页面并传递资产ID
        goToAddDevice(asset) {
            // 使用路由跳转，并通过query参数传递资产Code作为AssetCode
            this.$router.push({
                name: 'DeviceRegistration',
                query: {
                    assetCode: asset.Code // 将资产Code作为AssetCode传递
                }
            });
        },
    },
    mounted() {
        this.fetchAssetData();
    },
    computed: {
        filteredData() {
            return this.assetList.filter(item => {
                const codeMatch = this.searchForm.Code ? item.Code.toString().includes(this.searchForm.Code.toString()) : true;
                const nameMatch = item.Name.includes(this.searchForm.Name);
                const mnemonicMatch = item.Mnemonic.includes(this.searchForm.Mnemonic);
                const tagMatch = this.searchForm.Offset ? item.Offset.toString().includes(this.searchForm.Offset.toString()) : true;
                return codeMatch && nameMatch && mnemonicMatch && tagMatch;
            });
        },
        // 新增：总页数
        totalPages() {
            return Math.ceil(this.filteredData.length / this.pageSize) || 1;
        },
    },
    watch: {
        currentOffset() {
            this.fetchAssetData();
        },
        searchForm: {
            handler() {
                this.currentOffset = 0; // 重置分页
                this.fetchAssetData();
            },
            deep: true
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

.asset-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: background 0.3s;
    position: relative;
}

.asset-item:hover {
    background: #f8f9fa;
}

.asset-info {
    flex: 1;
}

.hover-add-btn {
    margin-left: 10px;
    opacity: 0;
    transform: translateX(10px);
    transition: all 0.3s ease;
}

.asset-item:hover .hover-add-btn {
    opacity: 1;
    transform: translateX(0);
}
</style>
