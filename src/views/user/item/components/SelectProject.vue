<template>
  <el-dialog v-model="modelValue" width="900px" :close-on-click-modal="false" :before-close="close">
    <template #header>
      <p class="title">选择合作信息</p>
    </template>
    <div>
      <el-skeleton animated :loading="loading">
        <template #template>
          <div class="flex items-center">
            <el-skeleton-item variant="circle" style="height: 20px; width: 20px;" class=" flex-shrink-0" />
            <el-skeleton-item variant="text" style="height: 30px" class="mx-20" />
            <el-skeleton-item variant="text" style="height: 30px; width: 100px;" />
          </div>
          <div class="flex items-center my-30">
            <el-skeleton-item variant="circle" style="height: 20px; width: 20px;" class=" flex-shrink-0" />
            <el-skeleton-item variant="text" style="height: 30px" class="mx-20" />
            <el-skeleton-item variant="text" style="height: 30px; width: 100px;" />
          </div>
          <div class="flex items-center">
            <el-skeleton-item variant="circle" style="height: 20px; width: 20px;" class=" flex-shrink-0" />
            <el-skeleton-item variant="text" style="height: 30px" class="mx-20" />
            <el-skeleton-item variant="text" style="height: 30px; width: 100px;" />
          </div>
        </template>
        <template #default>
          <div v-for="item in projectList" :key="item.id" class="flex select_project_item">
            <div>
              <el-radio v-model="selected" :label="item.id">
                <span></span>
              </el-radio>
            </div>
            <div class="__title">{{ item.title }}</div>
            <div class="__time">
              <span>{{ addtimeFmt(item.addtime) }}</span>
            </div>
          </div>
          <Empty v-if="projectList.length === 0" />
        </template>
      </el-skeleton>
    </div>
    <div v-if="projectList.length !== 0" class="flex justify-center mt-60">
      <button class="select_project_btn" @click="submit">确定</button>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useCouponsListAPI, useCouponsAPI } from '@/utils/api'
import dayjs from 'dayjs';
import Empty from '@/components/Empty.vue';
import { once } from '@/utils';
import { ElMessage } from 'element-plus';

const props = defineProps<{
  modelValue: boolean,
  coupons: number, // 道具卡id
}>()
const call = defineEmits(['update:modelValue', 'update'])
// 关闭窗口
const close = () => {
  call('update:modelValue', false)
}

// 用户发布的项目
const projectList = ref<any[]>([])
// 选择的项目
const selected = ref()
const loading = ref(true)
// 获取发布的项目
useCouponsListAPI({ coupons: props.coupons }).then(res => {
  projectList.value = res.data.data
  // 默认选择第一个
  if (projectList.value.length) {
    selected.value = projectList.value[0].id
  }
  loading.value = false
})
// 格式化项目发布时间
const addtimeFmt = (val: string) => {
  return dayjs(val).format('YYYY-MM-DD-HH:mm')
}
// 使用道具卡
const submit = once((done: Function) => {
  if (selected.value === undefined) {
    done()
    return
  }
  useCouponsAPI({ coupons: props.coupons, project_id: selected.value }).then(() => {
    call('update')
    close()
    done()
  }).catch(() => {
    done()
  })
})
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #696969;
  text-align: center;
}

::v-deep(.el-radio) {
  margin-right: 0;
}

.select_project_item {
  border-bottom: 1px solid #f3f3f3;
  padding: 20px 0;

  .__title {
    font-size: 16px;
    color: #1B1B1B;
    line-height: 29px;
    flex: 1;
    padding-right: 20px;
  }

  .__time {
    color: #777777;
    flex-shrink: 0;
    padding-top: 8px;
  }
}

.select_project_btn {
  width: 123px;
  height: 37px;
  background: #1F73F1;
  border: 1px solid #1F73F1;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
}
</style>