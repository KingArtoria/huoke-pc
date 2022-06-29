<template>
  <div class="p-30 bg-white">
    <!-- 会员特权 -->
    <div class="tip">
      <p class="title fs-16 color-4C4C4C mb-10">专属会员特权</p>
      <div class="fs-14">
        <slot name="tip"></slot>
      </div>
    </div>
    <p class="mt-36 mb-30 fs-18">选择套餐</p>
    <div class="flex">
      <div v-for="item in service" class="service" :class="{ active: item.id === activeService }"
        @click="activeService = item.id">
        <p class="flex justify-between items-end mt-26 mb-22">
          <span class="fs-16">{{ item.duration }}</span>
          <span class="fs-13">￥<span class="fs-30">{{ item.price }}</span></span>
        </p>
        <p class="prop-text">{{ item.prop }}</p>
        <div class="tag app-flex-center">{{ item.tag }}</div>
        <div class="check app-flex-center">
          <el-icon class="icon">
            <Check />
          </el-icon>
        </div>
      </div>
    </div>
    <PayMode :goodsId="activeService" />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import PayMode from './PayMode.vue'
// 套餐
interface IService {
  duration: string // 时长
  price: number // 价格
  prop: string // 道具
  tag: string // 标签
  id: number // 套餐编号
}
const props = defineProps<{
  service: IService[]
}>()

const activeService = ref(0)
watch(() => props.service, () => {
  if (props.service) {
    activeService.value = props.service[0].id
  }
}, { immediate: true })

</script>
<style lang="scss" scoped>
.tip {
  background: #FFF8ED;
  padding: 20px;
  color: #4C4C4C;
  line-height: 29px;

  .light {
    color: #046FF9;
  }
}

.service {
  height: 105px;
  border-radius: 5px;
  border: 2px solid #DADADA;
  color: #616161;
  position: relative;
  margin-right: 36px;
  padding: 0 20px;
  cursor: pointer;
  transition: all 0.3s;

  &.active {
    border-color: #0078FF;
    color: #0078FF;

    .check {
      display: flex;
    }
  }

  &:hover {
    border-color: #0078FF;
    color: #0078FF;
  }

  .prop-text {
    color: #F54343;
    font-size: 13px;
  }

  .tag {
    width: 58px;
    height: 19px;
    background: #F66161;
    border-radius: 5px 0px 5px 0px;
    font-size: 12px;
    color: #fff;
    position: absolute;
    top: -4px;
    left: -2px;
  }

  .check {
    display: none;
    width: 30px;
    height: 19px;
    background: #0078FF;
    border-radius: 3px 3px 3px 10px;
    position: absolute;
    top: -2px;
    right: -2px;

    .icon {
      color: #fff;
      font-size: 16px;
    }
  }
}
</style>