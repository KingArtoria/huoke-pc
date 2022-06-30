<template>
  <el-dialog v-model="modelValue" width="790px" :close-on-click-modal="false" :before-close="close">
    <template #header>
      <p class="title">选择合作对象</p>
    </template>
    <div class="center">
      <div class="flex items-center mb-30">
        <div class="input-wrap">
          <img :src="loadImg('sousu_xzhzdx@2x.webp')" alt="" class="icon">
          <input v-model="text" type="text" class="input" placeholder="查找好友">
        </div>
        <div class="mx-20">
          <el-button type="text" @click="doSearch">搜索</el-button>
        </div>
      </div>
      <div v-if="friends.length !== 0" class="mh-300">
        <div class="grid grid-cols-2 gap-10">
          <div v-for="item in friends" class="item flex">
            <img :src="item.head" alt="" class="img">
            <div class="flex-1">
              <p class="flex items-end">
                <span>{{ item.nick_name }}</span>
              </p>
              <p class="fs-13 color-8D8D8D mt-10 flex items-center">
                <span>{{ item.position }}</span>
                <span v-if="item.position" class="line"></span>
                <span>{{ item.company }}</span>
              </p>
            </div>
            <button class="select-btn" @click="select(item)">选择</button>
          </div>
        </div>
      </div>
      <Empty v-else />
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { loadImg } from '@/utils';
import useFriends from '@/views/user/friend/composables/useFriends';
import Empty from '@/components/Empty.vue';

defineProps<{
  modelValue: boolean
}>()
const call = defineEmits(['update:modelValue', 'change'])
// 关闭窗口
const close = () => {
  call('update:modelValue', false)
}

const select = (item: any) => {
  call('change', item)
  close()
}

const { friends, getData, search } = useFriends()
const text = ref('')
const doSearch = () => {
  search(text.value)
}
getData()
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
  padding: 16px;
  border: 1px solid #E7E7E7;
  border-radius: 3px;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;

  .select-btn {
    width: 69px;
    height: 25px;
    border: 1px solid #BDBDBD;
    border-radius: 13px;
    color: #BDBDBD;
    position: absolute;
    top: 26px;
    right: 26px;
    transition: all 0.3s;
  }

  &:hover {
    box-shadow: 0px 1px 7px 0px rgba(187, 187, 187, 0.32);
    border-color: #8DBBFF;

    .select-btn {
      border-color: #0C6CFD;
      color: #0C6CFD;
    }
  }

  .img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .line {
    width: 1px;
    height: 10px;
    background: #c7c7c7;
    margin: 0 8px;
  }
}

.color-8D8D8D {
  color: #8D8D8D;
}

.input-wrap {
  flex: 1;
  height: 41px;
  background: #F8F8F8;
  border: 1px solid #EEEEEE;
  display: flex;
  align-items: center;
  padding: 14px;

  .icon {
    width: 15px;
    height: 15px;
    margin-right: 14px;
  }

  .input {
    flex: 1;
    background-color: #F8F8F8;
    outline: none;
  }
}

::v-deep(.el-button--text) {
  font-size: 16px;
}

.mh-300 {
  min-height: 300px;
}
</style>