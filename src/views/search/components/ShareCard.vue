<template>
  <el-dialog v-model="modelValue" width="790px" :close-on-click-modal="false" :before-close="close">
    <template #header>
      <p class="title">选择名片投递</p>
    </template>
    <div v-if="cards.length" class="content">
      <div class="grid grid-cols-3 gap-x-16 gap-y-14">
        <div v-for="item in cards" :key="item.id" class="relative cursor-pointer" @click="activeCard = item">
          <img :src="item.url" alt="">
          <img :src="loadImg(item.id === activeCard.id ? 'xuanzhong.png' : 'weixuan.png')" alt="" class="icon">
        </div>
      </div>
    </div>
    <Empty v-else />
    <div v-if="cards.length" class="flex justify-center">
      <button class="btn" @click="submit">确认投递</button>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { myVisitingcardAPI, shareVisitingcardAPI } from '@/utils/api';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { loadImg, once } from '@/utils';
import Empty from '@/components/Empty.vue';

const props = defineProps<{
  modelValue: boolean,
  toId: number, // 对方id
}>()
const call = defineEmits(['update:modelValue'])
const close = () => {
  call('update:modelValue', false)
}

// 我的名片
const cards = ref<any>([])
const activeCard = ref<any>({})
myVisitingcardAPI().then(res => {
  cards.value = res.data.data
  if (cards.value) {
    activeCard.value = cards.value[0]
  }
})
// 保存
const submit = once((done: Function) => {
  shareVisitingcardAPI({
    to_id: props.toId,
    visitingcard_id: activeCard.value.id,
    url: activeCard.value.url
  }).then(() => {
    done()
    ElMessage.success('投递成功')
    close()
  })
    .catch(() => {
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

.content {
  background: #EEEEEE;
  border-radius: 2px;
  padding: 20px;
}

.icon {
  width: 13px;
  height: 13px;
  position: absolute;
  top: 14px;
  left: 14px;
}

.btn {
  width: 186px;
  height: 40px;
  background: #0372F7;
  border-radius: 20px;
  color: white;
  margin-top: 32px;
}
</style>