<template>
  <div class="p-34 bg-white">
    <p class="fs-18">我的好友</p>
    <div class="grid grid-cols-4 gap-x-12 gap-y-24 mt-40">
      <div v-for="item in cards" :key="item.id" class="item">
        <div class="cursor-pointer content">
          <img :src="item.url" alt="">
          <div class="mask app-flex-center">
            <button class="btn" @click="del(item.id)">删除</button>
          </div>
        </div>
        <p class="time">{{ item.createtime }}</p>
      </div>
    </div>
    <Empty v-if="cards.length === 0" />
  </div>
</template>
<script setup lang="ts">
import { myVisitingcardAPI, pushVisitingcardAPI, delVistingcardAPI, delpushVistingcardAPI } from '@/utils/api';
import { ElMessage } from 'element-plus';
import { ref, watch } from 'vue';
import { once } from '@/utils';
import { useRoute } from 'vue-router';
import Empty from '@/components/Empty.vue';

const route = useRoute()
const cards = ref<any>([])
const title = ref(
  
)
let fetchMethod: Function, delMethod: Function
const getData = () => {
  fetchMethod().then((res: any) => {
    cards.value = res.data.data
  })
}
watch(() => route.path, () => {
  // type: user=我的名片，receive=我收到的
  let type = route.path.substring(route.path.lastIndexOf('/') + 1)
  if (type === 'card-user') {
    fetchMethod = myVisitingcardAPI
    delMethod = delVistingcardAPI
  } else {
    fetchMethod = pushVisitingcardAPI
    delMethod = delpushVistingcardAPI
  }
  getData()
}, { immediate: true })

// 删除名片
const del = once((done: Function, payload: any) => {
  delMethod({ id: payload.id }).then(() => {
    done()
    ElMessage.success('投递成功')
    getData()
  })
    .catch(() => {
      done()
    })
})
</script>

<style lang="scss" scoped>
.item {
  padding: 8px;
  background: #F5F5F5;
  border: 1px solid #D9D9D9;
  border-radius: 3px;
}

.content {
  position: relative;

  &:hover {
    .mask {
      display: flex;
    }
  }
}

.mask {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);

  .btn {
    width: 80px;
    height: 30px;
    background: #0171FB;
    border-radius: 3px;
    color: white;
  }
}

.time {
  color: #818181;
  margin-top: 26px;
}
</style> 