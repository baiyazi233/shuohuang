<template>
  <div class="device-registration">
    <div class="table-header">
      <el-button type="primary" @click="handleRegiste()">设备登记</el-button>
    </div>
    <el-table :data="deviceList" border stripe>
      <el-table-column prop="deviceName" label="设备名称" align="center"></el-table-column>
      <el-table-column prop="deviceId" label="设备ID" align="center"></el-table-column>
      <el-table-column prop="manufacturer" label="设备制造商" align="center"></el-table-column>
      <el-table-column prop="purchaseDate" label="购置日期" align="center"></el-table-column>
      <el-table-column prop="serviceLife" label="使用年限" align="center"></el-table-column>
      <el-table-column prop="maintenanceCount" label="维护次数" align="center"></el-table-column>
      <el-table-column prop="maintenanceTime" label="维护时间" align="center"></el-table-column>
      <el-table-column prop="scrapReason" label="报废原因" align="center"></el-table-column>
      <el-table-column prop="scrapOperation" label="报废操作" align="center"></el-table-column>
      <el-table-column prop="scrapTime" label="报废时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <div class="operation-buttons">
            <el-button type="primary" size="small" @click="handleMaintenance(row)">维护</el-button>
            <el-button type="danger" size="small" @click="handleScrap(row)">报废</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="设备登记" v-model="registeVisible" width="50%">
      <el-form v-model="form" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="设备名称" prop="deviceName">
          <el-input v-model="form.deviceName"></el-input>
        </el-form-item>
        <el-form-item label="设备制造商" prop="manufacturer">
          <el-input v-model="form.manufacturer"></el-input>
        </el-form-item>
        <el-form-item label="购置日期" prop="purchaseDate">
          <el-date-picker v-model="form.purchaseDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="使用年限" prop="serviceLife">
          <el-input type="number" v-model="form.serviceLife"></el-input>
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
      <el-form v-model="maintenanceForm" :rules="maintenanceRules" ref="maintenanceFormRef" label-width="120px">
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
      <el-form v-model="scrapForm" :rules="scrapRules" ref="scrapFormRef" label-width="120px">
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
</style>
    <script>
import { ref } from 'vue';
import { registerDevice } from '../api';

export default {
  name: 'DeviceRegistration',
  setup() {
    const deviceList = ref([
  {
    deviceName: '服务器A',
    deviceId: 'DEV001',
    manufacturer: '华为',
    purchaseDate: '2023-01-15',
    serviceLife: 5,
    maintenanceCount: 2,
    maintenanceTime: '2024-03-20 14:30',
    scrapReason: '',
    scrapOperation: '',
    scrapTime: null
  },
  {
    deviceName: '交换机B',
    deviceId: 'DEV002',
    manufacturer: '思科',
    purchaseDate: '2022-08-20',
    serviceLife: 3,
    maintenanceCount: 1,
    maintenanceTime: '2024-02-10 09:15',
    scrapReason: '老化',
    scrapOperation: '已报废',
    scrapTime: '2024-05-01 10:00'
  }
]); // mock设备列表数据
    const registeVisible = ref(false);
    const form = ref({
      deviceName: '',
      deviceId: '',
      manufacturer: '',
      purchaseDate: null,
      serviceLife: 0,
      maintenanceCount: 0,
      maintenanceTime: null,
      scrapReason: '',
      scrapOperation: '',
      scrapTime: null
    });
    const rules = ref({
      deviceName: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
      deviceId: [{ required: true, message: '请输入设备ID', trigger: 'blur' }],
      manufacturer: [{ required: true, message: '请输入设备制造商', trigger: 'blur' }]
    });

    const formRef = ref(null); // 创建表单引用

    const maintenanceDialogVisible = ref(false);
    const scrapDialogVisible = ref(false);
    const maintenanceForm = ref({ content: '', time: null });
    const scrapForm = ref({ reason: '', operation: '', time: null });
    const maintenanceRules = ref({ content: [{ required: true, message: '请输入维护内容', trigger: 'blur' }], time: [{ required: true, message: '请选择维护时间', trigger: 'change' }] });
    const scrapRules = ref({ reason: [{ required: true, message: '请输入报废原因', trigger: 'blur' }], operation: [{ required: true, message: '请输入报废操作', trigger: 'blur' }], time: [{ required: true, message: '请选择报废时间', trigger: 'change' }] });
    const maintenanceFormRef = ref(null);
    const scrapFormRef = ref(null);

    const handleRegiste = () => {
      registeVisible.value = true;
    };


    const handleMaintenance = (row) => {
      maintenanceDialogVisible.value = true;
    };

    const handleScrap = (row) => {
      scrapDialogVisible.value = true;
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

    const handleSubmit = async () => {
      formRef.value?.validate(async (valid) => {
        if (!valid) return;
        try {
          await registerDevice(form.value);
          registeVisible.value = false;
          // 清空表单
          form.value = {
            deviceName: '',
            deviceId: '',
            manufacturer: '',
            purchaseDate: null,
            serviceLife: 0,
            maintenanceCount: 0,
            maintenanceTime: null,
            scrapReason: '',
            scrapOperation: '',
            scrapTime: null
          };
          // 实际应调用获取设备列表接口刷新数据
        } catch (error) {
          console.error('设备登记失败:', error);
        }
      });
    };

    return {
      maintenanceDialogVisible,
      scrapDialogVisible,
      maintenanceForm,
      scrapForm,
      maintenanceRules,
      scrapRules,
      handleRegiste,
      handleMaintenance,
      handleScrap,
      deviceList,
      registeVisible,
      form,
      rules,
      handleSubmit
    };
  }
};
</script>