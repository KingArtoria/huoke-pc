<template>
  <div>
    <div class="content" :style="`margin-bottom:${marginBottom}`">
      <div class="content_1">
        <div class="content_1_1">
          <img :src="`https://admin.bdhuoke.com${item.head}`" class="content_1_1_1">
          <div class="content_1_1_2">
            <div class="content_1_1_2_1">
              <div class="content_1_1_2_1_1">{{ item.nick_name }}</div>
              <img src="../assets/puthy.webp" v-if="item.is_vip == 1">
            </div>
            <div class="content_1_1_2_2">{{ item.position }}</div>
            <div class="content_1_1_2_2">{{ item.company }}</div>
          </div>
        </div>
        <div class="content_1_2">加好友</div>
      </div>
      <div class="content_2">{{ item.count }}条合作信息</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
interface Props {
  marginBottom?: string,
  item?: any,
}
// @ts-ignore
const props = withDefaults(defineProps<Props>(), {
  marginBottom: '0px',
  item: ""
})
</script>

<style lang="scss" scoped>
.content {
  width: 450px;
  height: 198px;
  background: #FFFFFF;
  border: 1px solid #D5D5D5;
  padding: 0 16px;
  padding-top: 20px;
  position: relative;

  .content_1 {
    display: flex;
    justify-content: space-between;

    .content_1_1 {
      display: flex;
      justify-content: space-between;

      .content_1_1_1 {
        width: 59px;
        height: 59px;
        border-radius: 30px;
        margin-right: 25px;
      }

      .content_1_1_2 {
        .content_1_1_2_1 {
          display: flex;
          align-items: center;

          .content_1_1_2_1_1 {
            font-size: 17px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #303030;
            margin-right: 16px;
          }
        }

        .content_1_1_2_2 {
          font-size: 15px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #6A6A6A;
          line-height: 1;
          margin-top: 10px;
        }
      }
    }

    .content_1_2 {
      width: 80px;
      height: 30px;
      border: 1px solid #0078FF;
      border-radius: 15px;
      line-height: 30px;
      text-align: center;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #0078FF;
      cursor: pointer;
    }
  }

  .content_2 {
    width: 417px;
    height: 29px;
    background: #F7F7F7;
    position: absolute;
    padding: 0 12px;
    line-height: 29px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #56689B;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 20px;
  }
}
</style>