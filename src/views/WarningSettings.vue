<template>
    <div>
        <el-card class="settings-card">
            <el-form ref="settingsFormRef" :model="settingsForm" :rules="validationRules" label-width="180px"
                class="settings-form" style="max-width: 1000px;">

                <!-- 数据检测预警设置 -->
                <div class="horizontal-section">
                    <el-form-item class="section-title-horizontal">
                        <h3>数据检测预警设置</h3>
                    </el-form-item>
                    <div class="section-content-horizontal">
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <el-form-item label="定期数据扫描检测发生错误时是否发出预警：" prop="dataScanWarning">
                                    <el-select v-model="settingsForm.dataScanWarning" placeholder="请选择"
                                        style="width: 180px">
                                        <el-option label="是" value="yes"></el-option>
                                        <el-option label="否" value="no"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="计划任务无法运行时是否发出预警：" prop="taskFailureWarning">
                                    <el-select v-model="settingsForm.taskFailureWarning" placeholder="请选择" style="width: 180px">
                                        <el-option label="是" value="yes"></el-option>
                                        <el-option label="否" value="no"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <!-- 设备预警设置 -->
                <div class="horizontal-section">
                    <el-form-item class="section-title-horizontal">
                        <h3>设备预警设置</h3>
                    </el-form-item>
                    <div class="section-content-horizontal">
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <el-form-item label="设备离线时是否发出预警：" prop="deviceOfflineWarning">
                                    <el-select v-model="settingsForm.deviceOfflineWarning" placeholder="请选择"
                                        style="width: 180px">
                                        <el-option label="是" value="yes"></el-option>
                                        <el-option label="否" value="no"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="设备故障时是否发出预警：" prop="deviceFailureWarning">
                                    <el-select v-model="settingsForm.deviceFailureWarning" placeholder="请选择"
                                        style="width: 180px">
                                        <el-option label="是" value="yes"></el-option>
                                        <el-option label="否" value="no"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="设备CPU使用率发出预警的阈值：" prop="cpuThreshold">
                                    <el-input v-model.number="settingsForm.cpuThreshold" suffix="%"
                                        style="width: 180px"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="设备内存使用率发出预警的阈值：" prop="memoryThreshold">
                                    <el-input v-model.number="settingsForm.memoryThreshold" suffix="%"
                                        style="width: 180px"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="设备存储容量不足发出预警的阈值：" prop="storageThreshold">
                                    <el-input v-model.number="settingsForm.storageThreshold" suffix="%"
                                        style="width: 180px"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <!-- 介质预警设置 -->
                <div class="horizontal-section">
                    <el-form-item class="section-title-horizontal">
                        <h3>介质预警设置</h3>
                    </el-form-item>
                    <div class="section-content-horizontal">
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <el-form-item label="介质访问异常时是否发出预警：" prop="mediaAccessWarning">
                                    <el-select v-model="settingsForm.mediaAccessWarning" placeholder="请选择"
                                        style="width: 180px">
                                        <el-option label="是" value="yes"></el-option>
                                        <el-option label="否" value="no"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="介质数据校验失败时是否发出预警：" prop="mediaChecksumWarning">
                                    <el-select v-model="settingsForm.mediaChecksumWarning" placeholder="请选择"
                                        style="width: 180px">
                                        <el-option label="是" value="yes"></el-option>
                                        <el-option label="否" value="no"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="介质空间不足预警阈值：" prop="mediaSpaceThreshold">
                                    <el-input v-model.number="settingsForm.mediaSpaceThreshold" suffix="%"
                                        style="width: 180px"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <!-- 预警升级设置 -->
                <div class="horizontal-section">
                    <el-form-item class="section-title-horizontal">
                        <h3>预警升级设置</h3>
                    </el-form-item>
                    <div class="section-content-horizontal">
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <el-form-item label="预警未处理自动升级时间（小时）：" prop="upgradeHours">
                                    <el-input v-model.number="settingsForm.upgradeHours" style="width: 180px"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="预警升级通知方式：" prop="upgradeNotification">
                                    <el-select v-model="settingsForm.upgradeNotification" placeholder="请选择"
                                        style="width: 180px">
                                        <el-option label="邮件" value="email"></el-option>
                                        <el-option label="短信" value="sms"></el-option>
                                        <el-option label="邮件+短信" value="both"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="最高升级级别：" prop="maxUpgradeLevel">
                                    <el-input v-model.number="settingsForm.maxUpgradeLevel" style="width: 180px"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <!-- 操作按钮 -->
                <div class="form-actions">
                    <el-button type="primary" @click="saveSettings">保存设置</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </div>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getWarningSettings, saveWarningSettings } from '../api';

// 表单引用
const settingsFormRef = ref(null);

// 表单数据
const settingsForm = reactive({
    // 数据检测预警
    dataScanWarning: 'yes',
    taskFailureWarning: 'yes',
    // 设备预警
    deviceOfflineWarning: 'yes',
    deviceFailureWarning: 'yes',
    cpuThreshold: 85,
    memoryThreshold: 80,
    storageThreshold: 90,
    // 介质预警
    mediaAccessWarning: 'yes',
    mediaChecksumWarning: 'yes',
    mediaSpaceThreshold: 85,
    // 预警升级
    upgradeHours: 24,
    upgradeNotification: 'both',
    maxUpgradeLevel: 3
});

// 验证规则
const validationRules = reactive({
    dataScanWarning: [{ required: true, message: '请选择是否发出预警', trigger: 'change' }],
    taskFailureWarning: [{ required: true, message: '请选择是否发出预警', trigger: 'change' }],
    deviceOfflineWarning: [{ required: true, message: '请选择是否发出预警', trigger: 'change' }],
    deviceFailureWarning: [{ required: true, message: '请选择是否发出预警', trigger: 'change' }],
    cpuThreshold: [
        { required: true, message: '请输入CPU预警阈值', trigger: 'blur' },
        { type: 'number', min: 1, max: 100, message: '阈值必须在1-100之间', trigger: 'blur' }
    ],
    memoryThreshold: [
        { required: true, message: '请输入内存预警阈值', trigger: 'blur' },
        { type: 'number', min: 1, max: 100, message: '阈值必须在1-100之间', trigger: 'blur' }
    ],
    storageThreshold: [
        { required: true, message: '请输入存储预警阈值', trigger: 'blur' },
        { type: 'number', min: 1, max: 100, message: '阈值必须在1-100之间', trigger: 'blur' }
    ],
    mediaAccessWarning: [{ required: true, message: '请选择是否发出预警', trigger: 'change' }],
    mediaChecksumWarning: [{ required: true, message: '请选择是否发出预警', trigger: 'change' }],
    mediaSpaceThreshold: [
        { required: true, message: '请输入介质空间预警阈值', trigger: 'blur' },
        { type: 'number', min: 1, max: 100, message: '阈值必须在1-100之间', trigger: 'blur' }
    ],
    upgradeHours: [
        { required: true, message: '请输入自动升级时间', trigger: 'blur' },
        { type: 'number', min: 1, max: 72, message: '时间必须在1-72小时之间', trigger: 'blur' }
    ],
    upgradeNotification: [{ required: true, message: '请选择通知方式', trigger: 'change' }],
    maxUpgradeLevel: [
        { required: true, message: '请输入最高升级级别', trigger: 'blur' },
        { type: 'number', min: 1, max: 5, message: '级别必须在1-5之间', trigger: 'blur' }
    ]
});

// 加载设置数据
const loadSettings = async () => {
    try {
        const response = await getWarningSettings();
        if (response.code === 200 && response.data) {
            // 将接口返回的数据合并到表单中
            Object.assign(settingsForm, response.data);
        }
    } catch (error) {
        console.error('加载预警设置失败:', error);
        ElMessage.error('加载设置失败，请刷新页面重试');
    }
};

// 保存设置
const saveSettings = async () => {
    try {
        // 表单验证
        await settingsFormRef.value.validate();
        // 调用保存接口
        const response = await saveWarningSettings(settingsForm);
        if (response.code === 200) {
            ElMessage.success('设置保存成功');
        } else {
            ElMessage.error('保存失败: ' + (response.msg || '未知错误'));
        }
    } catch (error) {
        console.error('保存预警设置失败:', error);
        if (error.name !== 'ValidationError') {
            ElMessage.error('保存设置失败，请稍后重试');
        }
    }
};

// 重置表单
const resetForm = () => {
    settingsFormRef.value.resetFields();
};

// 页面加载时获取设置数据
onMounted(() => {
    loadSettings();
});
</script>

<style scoped>
.settings-card {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

/* 水平布局样式 */
/* 固定左侧设置区域宽度并保持一致 */
.horizontal-section {
    display: flex;
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid #f0f0f0;
}

/* 统一所有左侧标题区域宽度为220px */
.section-title-horizontal {
    flex: 0 0 320px;
    /* 固定宽度 */
    padding-top: 4px;
    white-space: nowrap;
    margin-right: 20px;
    align-items: top;
}

/* 确保右侧内容区域自适应 */
.section-content-horizontal {
    flex: 1;
    min-width: 0;
}

/* 防止右侧输入框提示文字换行 */
:deep(.el-form-item__label) {
    width: auto !important;
    /* 移除固定宽度限制 */
    text-align: right !important;
    padding-right: 15px !important;
    white-space: nowrap !important;
    /* 强制不换行 */
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    /* 超长文本显示省略号 */
    position: relative;
    padding-left: 12px !important;
}

/* 移除手动星号后，确保Element Plus自动生成的星号样式统一 */
:deep(.el-form-item__label::after) {
    content: "*";
    color: #ff4d4f;
    margin-left: 4px;
    vertical-align: middle;
}

/* 确保必填项和非必填项标签对齐 */
:deep(.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label::after) {
    content: "*";
}

.section-content-horizontal {
    flex: 1;
}

/* 标题样式 */
h3 {
    margin: 0;
    font-size: 16px;
    color: #1f2937;
    font-weight: 500;
}

/* 按钮区域 */
.form-actions {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding-right: 20px;
}

/* 调整表单项间距 */
:deep(.el-form-item) {
    margin-bottom: 18px;
}

.section-select {
    flex: 1;
    width: 100%;
}
</style>


Dear Visa Officer,​
This is to certify that HOU BEI is an 职位 in our company, and has been working for our company from 日期 to the present date, with a Monthly income before tax of RMB 税前月收入-小写. Below are the specific details of the employee:​
 ​
Name: HOU BEI
Gender: Female​
Date of Birth: 1997-11-20
Passport Number: EM6575737
 ​
The employee will be traveling to Norway from 2025-11-09 to 2025-11-23.All expenses related to this trip, including but not limited to airfare, transportation, accommodation, and medical insurance, will be entirely covered by the employee. The company requires the employee to comply with local laws during the trip and return promptly to resume work in our company.​
Hereby certified.​
​
Company Name: 公司名字
Company Address: 公司地址
Company Telephone: 公司电话
Name of Contact: 法人
Position of Contact: Human Resources