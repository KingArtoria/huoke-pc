<template>
  <el-dialog v-model="modelValue" width="820px" :close-on-click-modal="false" :before-close="close">
    <template #header>
      <p class="title">浏览用户</p>
    </template>
    <p class="mb-14">浏览人数：{{ users.length }}</p>
    <div class="grid grid-cols-2 gap-10">
      <div v-for="item in currentData" class="item flex items-center">
        <img :src="HEAD_DOMAIN + item.head" alt="" class="img">
        <div>
          <p class="flex items-end">
            <span class="mb-10 text">{{ item.nick_name }}</span>
          </p>
          <p class="desc flex items-center">
            <span>{{ companyShort(item.company || '暂未填写') }}</span>
            <span class="line"></span>
            <span>{{ item.position || '暂未填写' }}</span>
          </p>
        </div>
        <button v-if="member_id !== item.member_id" class="btn app-flex-center" @click="addFriend({ id: item.member_id })">加好友</button>
      </div>
    </div>
    <!-- 分页 -->
    <footer class="footer flex justify-center mt-30">
      <el-pagination :current-page="page" :total="total" background layout="total, prev, pager, next, jumper"
        @current-change="changePage" />
    </footer>
  </el-dialog>
</template>
<script setup lang="ts">
import { getUser, once } from '@/utils';
import { addFriendapplyAPI } from '@/utils/api';
import { HEAD_DOMAIN } from '@/utils/const'
import { ElMessage } from 'element-plus';
import { ref, watch } from 'vue';

const props = defineProps<{
  users: any[],
  modelValue: boolean
}>()
const call = defineEmits(['update:modelValue'])

const member_id = getUser().member_id

// 超过一定字数做截取
const companyShort = (val: string) => {
  if (val) {
    if (val.length > 8) {
      return val.substring(0, 8) + '...'
    }
  }
  return val
}
const close = () => {
  call('update:modelValue')
}

// 当前页数据
const currentData = ref<any>([])
// 页数
const page = ref(1)
// 总条数
const total = ref(0)
// 每页数据条数
const num = 10
// 翻页
const changePage = (index: number) => {
  page.value = index
  getData()
}
// 前端分页
const getData = () => {
  const start = (page.value - 1) * num
  currentData.value = props.users.slice(start, start + num)
}
watch(() => props.users, () => {
  if (props.users) {
    total.value = props.users.length
    getData()
  }
}, { immediate: true })

// 添加好友
const addFriend = once((done: Function, payload?: any) => {
  addFriendapplyAPI({ toid: payload.id }).then((res) => {
    done()
    ElMessage.success(res.data.msg)
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

.item {
  padding: 16px 25px 16px 17px;
  border: 1px solid #E6E6E6;
  transition: all 0.3s;

  &:hover {
    border-color: #8DBBFF;
    box-shadow: 0px 1px 7px 0px rgba(187, 187, 187, 0.32);

    .btn {
      border-color: #1F73F1;
      color: #1F73F1;
    }
  }

  .img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    margin-right: 9px;
  }

  .desc {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #8D8D8D;

    .line {
      width: 1px;
      height: 14px;
      background: #dfdfdf;
      margin: 0 10px;
    }
  }

  .text {
    color: #303030;
  }

  .btn {
    margin-left: auto;
    width: 69px;
    height: 25px;
    border: 1px solid #BDBDBD;
    color: #BDBDBD;
    border-radius: 13px;
    transition: all 0.3s;
  }
}

.center {
  width: 802px;
  margin: 0 auto;
}
</style>