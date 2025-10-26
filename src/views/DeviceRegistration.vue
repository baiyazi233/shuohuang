<template>
  <div class="device-registration">
    <div class="table-header">
      <el-button type="primary" @click="handleRegiste()">设备登记</el-button>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <el-loading-spinner></el-loading-spinner>
      <p>加载设备数据中...</p>
    </div>

    <!-- 错误提示 -->
    <div v-if="error && !loading" class="error-state">
      <el-alert type="error" :title="error" show-icon></el-alert>
    </div>

    <!-- 设备表格 -->
    <el-table v-if="!loading && !error" :data="deviceList" border stripe>
      <!-- 表格列定义保持不变 -->
      <el-table-column prop="Name" label="设备名称" align="center"></el-table-column>
      <el-table-column prop="DeviceID" label="设备ID" align="center"></el-table-column>
      <el-table-column prop="Manufacturer" label="设备制造商" align="center"></el-table-column>
      <el-table-column prop="Model" label="设备型号" align="center"></el-table-column>
      <el-table-column prop="PurchaseDate" label="购置日期" align="center"></el-table-column>
      <el-table-column prop="LifeSpan" label="使用年限" align="center"></el-table-column>
      <el-table-column prop="MaintainTimes" label="维护次数" align="center"></el-table-column>
      <el-table-column prop="LastMaintainTime" label="维护时间" align="center"></el-table-column>
      <el-table-column prop="ScrapReason" label="报废原因" align="center"></el-table-column>
      <el-table-column prop="ScrapAction" label="报废操作" align="center"></el-table-column>
      <el-table-column prop="ScrapTime" label="报废时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <div class="operation-buttons">
            <el-button type="primary" size="small" @click="handleMaintenanceSubmit(row)">维护</el-button>
            <el-button type="danger" size="small" @click="handleScrapSubmit(row)">报废</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="设备登记" v-model="registeVisible" width="50%">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="设备名称" prop="Name">
          <el-input v-model="form.Name"></el-input>
        </el-form-item>
        <el-form-item label="设备制造商" prop="Manufacturer">
          <el-input v-model="form.Manufacturer"></el-input>
        </el-form-item>
        <el-form-item label="设备型号" prop="Model">
          <el-input v-model="form.Model"></el-input>
        </el-form-item>
        <el-form-item label="购置日期" prop="PurchaseDate">
          <el-date-picker v-model="form.PurchaseDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="使用年限" prop="LifeSpan">
          <el-input type="number" v-model="form.LifeSpan"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="registeVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">保存</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 维护信息弹窗 -->
    <el-dialog title="维护登记" v-model="maintenanceDialogVisible" width="50%">
      <el-form :model="maintenanceForm" :rules="maintenanceRules" ref="maintenanceFormRef" label-width="120px">
        <el-form-item label="维护内容" prop="content">
          <el-input v-model="maintenanceForm.content"></el-input>
        </el-form-item>
        <el-form-item label="维护时间" prop="time">
          <el-date-picker v-model="maintenanceForm.time" type="datetime" placeholder="选择时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="maintenanceDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleMaintenanceSubmit">完成</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 报废信息弹窗 -->
    <el-dialog title="报废登记" v-model="scrapDialogVisible" width="50%">
      <el-form :model="scrapForm" :rules="scrapRules" ref="scrapFormRef" label-width="120px">
        <el-form-item label="报废原因" prop="reason">
          <el-input v-model="scrapForm.reason"></el-input>
        </el-form-item>
        <el-form-item label="报废操作" prop="operation">
          <el-input v-model="scrapForm.operation"></el-input>
        </el-form-item>
        <el-form-item label="报废时间" prop="time">
          <el-date-picker v-model="scrapForm.time" type="datetime" placeholder="选择时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="scrapDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleScrapSubmit">完成</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.device-registration {
  padding: 20px;
}

.table-header {
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-end;
}

.el-table {
  margin-top: 15px;
}

.operation-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
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
</style>
<script>
import { ref, onMounted } from 'vue';
import { createDeviceInfo, describeDeviceBasicInfoList } from '../api';
import { useRoute, useRouter } from 'vue-router'; // 导入路由相关函数
import { ElMessageBox } from 'element-plus';

export default {
  name: 'DeviceRegistration',
  setup() {
    const route = useRoute(); // 获取当前路由
    const router = useRouter(); // 获取路由实例
    const deviceList = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const registeVisible = ref(false);
    const formRef = ref(null); // 创建表单引用
    const form = ref({
      Name: '',
      Model: '',
      DeviceID: '',
      Manufacturer: '',
      PurchaseDate: null,
      LifeSpan: 0,
      MaintainTimes: 0,
      LastMaintainTime: null,
      ScrapReason: '',
      ScrapAction: '',
      ScrapTime: null,
      AssetCode: ''
    });
    const rules = ref({
      Name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
      DeviceID: [{ required: true, message: '请输入设备ID', trigger: 'blur' }],
      Manufacturer: [{ required: true, message: '请输入设备制造商', trigger: 'blur' }],
      Model: [{ required: true, message: '请输入设备型号', trigger: 'blur' }]
    });

    const maintenanceDialogVisible = ref(false);
    const scrapDialogVisible = ref(false);
    const maintenanceForm = ref({ content: '', time: null });
    const scrapForm = ref({ reason: '', operation: '', time: null });
    const maintenanceRules = ref({ content: [{ required: true, message: '请输入维护内容', trigger: 'blur' }], time: [{ required: true, message: '请选择维护时间', trigger: 'change' }] });
    const scrapRules = ref({ reason: [{ required: true, message: '请输入报废原因', trigger: 'blur' }], operation: [{ required: true, message: '请输入报废操作', trigger: 'blur' }], time: [{ required: true, message: '请选择报废时间', trigger: 'change' }] });
    const maintenanceFormRef = ref(null);
    const scrapFormRef = ref(null);

    // 页面加载时获取设备列表
    onMounted(() => {
      // 检查是否有AssetCode参数
      if (!route.query.assetCode) {
        // 显示提示信息，引导用户返回控制台
        ElMessageBox.confirm(
          '请先从控制台选择资产后再进行设备登记',
          '提示',
          {
            confirmButtonText: '返回控制台',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          // 用户点击确认，跳转到控制台
          router.push({ name: 'Console' });
        }).catch(() => {
          // 用户点击取消，也跳转到控制台
          router.push({ name: 'Console' });
        });
        return;
      }

      // 从路由参数中获取AssetCode并转换为整数
      form.value.AssetCode = parseInt(route.query.assetCode, 10);
      fetchDeviceList();
    });

    // 获取设备列表数据
    const fetchDeviceList = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await describeDeviceBasicInfoList({
          AssetCode: form.value.AssetCode,
          PageNum: 1
        });
        deviceList.value = response?.DeviceBasicInfoList || [];
      } catch (err) {
        error.value = `获取设备列表失败: ${err.message}`;
      } finally {
        loading.value = false;
      }
    };

    const handleRegiste = () => {
      registeVisible.value = true;
    };

    const handleMaintenanceSubmit = async () => {
      maintenanceFormRef.value?.validate(async (valid) => {
        if (!valid) return;
        try {
          // 调用维护更新接口
          console.log('维护提交数据:', maintenanceForm.value);
          maintenanceDialogVisible.value = false;
          maintenanceForm.value = { content: '', time: null };
        } catch (error) {
          console.error('维护提交失败:', error);
        }
      });
    };

    const handleScrapSubmit = async () => {
      scrapFormRef.value?.validate(async (valid) => {
        if (!valid) return;
        try {
          // 调用报废更新接口
          console.log('报废提交数据:', scrapForm.value);
          scrapDialogVisible.value = false;
          scrapForm.value = { reason: '', operation: '', time: null };
        } catch (error) {
          console.error('报废提交失败:', error);
        }
      });
    };

    // 设备登记提交处理
    const handleSubmit = async () => {
      formRef.value?.validate(async (valid) => {
        if (!valid) return;
        try {
          // 确保 AssetCode 和 LifeSpan 是整数类型并格式化日期
          const formData = {...form.value};
          formData.AssetCode = parseInt(formData.AssetCode, 10);
          formData.LifeSpan = parseInt(formData.LifeSpan, 10) || 0;
          formData.DeviceID = Date.now().toString();
          
          // 格式化日期为 "YYYY-MM-DD 00:00:00" 格式
          if (formData.PurchaseDate) {
            const date = new Date(formData.PurchaseDate);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            formData.PurchaseDate = `${year}-${month}-${day} 00:00:00`;
          } else {
            // 如果日期为空，设置为当前日期
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            formData.PurchaseDate = `${year}-${month}-${day} 00:00:00`;
          }
          
          await createDeviceInfo(formData);
          registeVisible.value = false;
          // 重置表单
          form.value = {
            AssetCode: form.value.AssetCode,
            Name: '',
            DeviceID: '',
            Manufacturer: '',
            PurchaseDate: null,
            LifeSpan: 0,
            MaintainTimes: 0,
            LastMaintainTime: null,
            ScrapReason: '',
            ScrapAction: '',
            ScrapTime: null
          };
          // 提交成功后刷新列表
          fetchDeviceList();
        } catch (error) {
          console.error('设备登记失败:', error);
          // 显示错误提示
          error.value = error.message;
        }
      });
    };

    return {
      deviceList,
      loading,
      error,
      registeVisible,
      maintenanceDialogVisible,
      scrapDialogVisible,
      maintenanceForm,
      scrapForm,
      maintenanceRules,
      scrapRules,
      maintenanceFormRef,
      scrapFormRef,
      formRef,
      handleRegiste,
      form,
      rules,
      handleSubmit,
      handleMaintenanceSubmit,
      handleScrapSubmit,
      fetchDeviceList
    };
  }
};
</script>