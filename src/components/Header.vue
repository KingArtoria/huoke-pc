<template>
  <div class="header">
    <!-- 导航 -->
    <nav class="nav">
      <div class="center">
        <span class="brand">用火客，必定获客</span>
        <ul class="grid auto-cols-max grid-flow-col nav-items">
          <li class="nav-item">
            <span>请<a href="javascript:;">登录</a><a href="javascript:;">注册</a></span>
          </li>
          <li class="nav-item">个人中心</li>
          <li class="nav-item drop">
            <span class="item-text">普通会员</span>
            <div class="vip-wrap super normal">
              <div class="top">
                <p class="title">限时抢购</p>
                <div class="flex justify-between content">
                  <p class="flex items-end">
                    <span class="time">一年普通会员</span>
                    <span class="price"><span class="money">998</span>元/年</span>
                  </p>
                  <div class="btn">立即开通</div>
                </div>
                <p class="present ml">每月赠送道具卡（置顶卡*1、变色卡*1）</p>
              </div>
              <div class="more">
                <p class="more-text ml">更多会员套餐</p>
                <div class="meal-list">
                  <div class="meal">
                    <div class="tag app-flex-center">体验会员</div>
                    <p class="meal-price">
                      <span>1个月</span>
                      <span class="price-money">￥<span class="num">298</span></span>
                    </p>
                  </div>
                  <div class="meal">
                    <div class="tag app-flex-center">体验会员</div>
                    <p class="meal-price">
                      <span>半年</span>
                      <span class="price-money">￥<span class="num">298</span></span>
                    </p>
                  </div>
                  <div class="meal">
                    <div class="tag app-flex-center">体验会员</div>
                    <p class="meal-price">
                      <span>一年</span>
                      <span class="price-money">￥<span class="num">298</span></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item drop">
            <span class="item-text">超级会员</span>
            <div class="vip-wrap super">
              <p class="title">本站力推</p>
              <div class="flex justify-between content">
                <p class="flex items-end">
                  <span class="time">一年超级会员</span>
                  <span class="price"><span class="money">1998</span>元/年</span>
                </p>
                <div class="btn">立即开通</div>
              </div>
              <p class="desc ml">专属客服，专属资源</p>
              <p class="present ml">每月赠送道具卡（置顶卡*1、变色卡*1、超级置顶卡*1）</p>
            </div>
          </li>
          <li class="nav-item drop">
            <span class="item-text">企业会员</span>
            <div class="vip-wrap super company">
              <p class="title">企业专享</p>
              <div class="flex justify-between content">
                <p class="flex items-end">
                  <span class="time">一年企业会员</span>
                  <span class="price"><span class="money">3998</span>元/年</span>
                </p>
                <div class="btn">立即开通</div>
              </div>
              <p class="desc ml">专属客服，专属资源，多设备登录</p>
              <p class="present ml">每月赠送道具卡（置顶卡*1、变色卡*1、超级置顶卡*1）</p>
            </div>
          </li>
          <li class="nav-item">黑卡</li>
          <li class="nav-item">帮助中心</li>
          <li class="nav-item">APP下载</li>
          <li class="nav-item">消息</li>
        </ul>
      </div>

    </nav>
    <!-- banner -->
    <div class="banner center">
      <img :src="bannerImg" alt="" class="banner-img">
    </div>
    <!-- 搜索 -->
    <div class="search center">
      <div class="logo">
        <img :src="logo" alt="" class="logo-img">
      </div>
      <div class="search-wrap">
        <div class="input-wrap">
          <div class="select">
            <div class="trigger">
              <span>{{ searchType }}</span>
              <el-icon class="icon">
                <ArrowDown />
              </el-icon>
            </div>
            <div class="select-area">
              <div v-for="item in typeOptions.filter(v => !v.isSelect)" class="option" @click="setSearchType(item)">{{
                  item.label
              }}</div>
            </div>
          </div>
          <input v-model="keyword" type="text" class="input" placeholder="输入关键词进行搜索">
          <div class="search-btn app-flex-center" @click="doSearch">搜索</div>
        </div>
        <div class="grid auto-cols-max grid-flow-col links">
          <a href="javascript:;">加粉</a>
          <a href="javascript:;">地推</a>
          <a href="javascript:;">拉新</a>
          <a href="javascript:;">淘口令</a>
          <a href="javascript:;">阅读激励量</a>
          <a href="javascript:;">PC-阅读量</a>
          <a href="javascript:;">快应用</a>
        </div>
      </div>
      <div class="text app-flex-center">或</div>
      <div class="btn app-flex-center">免费发布合作信息</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import bannerImg from '@/assets/dingbbanner@2x.png'
import logo from '@/assets/huoke@2x.png'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
const router = useRouter()
// 搜索类型
const searchType = ref('找项目')
const typeOptions = ref([
  { label: '找项目', value: 'project', isSelect: true },
  { label: '找人脉', value: 'people', isSelect: false },
  { label: '查企业', value: 'company', isSelect: false },
])
const setSearchType = (item: any) => {
  typeOptions.value.forEach(v => v.isSelect = false)
  item.isSelect = true
  searchType.value = item.label
}
// 关键词
const keyword = ref('')
// 搜索
const doSearch = () => {
  if (keyword.value.trim().length === 0) {
    ElMessage.info('请输入搜索关键词')
    return
  }
  router.push({
    path: '/search',
    query: {
      keyword: keyword.value
    }
  })
}
</script>

<style lang="scss" scoped>
.header {
  background-color: white;
  padding-bottom: 32px;
}

.nav {
  height: 56px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #5C5C5C;
  background: #F8F8F8;

  .center {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  .nav-item {
    position: relative;

    .item-text {
      cursor: pointer;
    }
  }

  .drop:hover {
    .vip-wrap {
      display: block;
    }
  }

  .vip-wrap {
    position: absolute;
    display: none;
    left: 50%;
    transform: translateX(-50%);

    .ml {
      margin-left: 18px;
    }

    &.super {
      width: 481px;
      height: 216px;
      background: url('@/assets/svip_stc@2x.png') no-repeat;
      background-size: contain;
      z-index: 10;
      padding: 20px;

      .title {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        margin: 3px 0 0 7px;
      }

      .content {
        margin: 23px 28px 0 18px;
      }

      .time {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #4E4E4E;
        margin-right: 26px;
      }

      .price {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FF7200;
      }

      .money {
        font-size: 36px;
      }

      .btn {
        width: 89px;
        height: 31px;
        background: linear-gradient(90deg, #FF934C 0%, #F05555 98%);
        border-radius: 5px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        text-align: center;
        line-height: 31px;
        cursor: pointer;
      }

      .desc {
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #AF7237;
        margin-top: 15px;
      }

      .present {
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FD4E25;
        margin-top: 36px;
      }
    }

    &.company {
      background: url('@/assets/qyhy_stc@2x.png') no-repeat;
      background-size: contain;

      .price {
        color: #0078FF;
      }

      .btn {
        background: linear-gradient(90deg, #015EEA 0%, #188AFF 100%);
      }

      .desc {
        color: #0E76F6;
      }
    }

    &.normal {
      min-height: 362px;
      background: url('@/assets/pthy-stcc@2x.png') no-repeat;
      background-size: contain;

      .meal-list {
        display: flex;
        flex-wrap: wrap;
        padding: 0 20px 20px;
        margin-top: 23px;
      }

      .meal {
        margin: 0 20px 20px 0;
        width: 180px;
        height: 79px;
        background: #FFFFFF;
        border: 1px solid #EBE8E9;
        border-radius: 5px;
        color: #767376;
        font-size: 16px;
        cursor: pointer;
        padding: 0 15px 0 12px;

        &:hover {
          color: #0078FF;
          border-color: #0078FF;
        }
      }

      .present {
        margin-top: 30px;
      }

      .more {
        background: white;
      }

      .more-text {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #242424;
        margin-top: 52px;
      }

      .tag {
        width: 58px;
        height: 19px;
        background: #F66161;
        border-radius: 5px 0px 5px 0px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        margin-left: -12px;
      }

      .meal-price {
        margin-top: 13px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }

      .price-money {
        font-size: 13px;
      }

      .num {
        font-size: 30px;
        margin-left: 6px;
      }
    }
  }
}

.nav-items {
  column-gap: 40px;
}

.center {
  width: 1382px;
  margin: 0 auto;
}

.banner {
  margin: 10px auto;

  .banner-img {
    width: 100%;
    height: 70px;
  }
}

.search {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;

  .logo {
    margin-top: -14px;
  }

  .logo-img {
    width: 155px;
    height: 72px;
  }

  .btn {
    width: 229px;
    height: 44px;
    background: #FF6F0F;
    border-radius: 0px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    cursor: pointer;

    &:hover {
      background: #ff8e42;
    }
  }
}

.search-wrap {
  flex: 1;
  margin-left: 140px;

  .input-wrap {
    display: flex;
    justify-content: space-between;
    height: 44px;
    border: 2px solid #0071FA;
  }

  .input {
    flex: 1;
    padding: 14px;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 400;
    border: 0;
    outline: 0;

    &::placeholder {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #9D9D9D;
    }
  }

  .search-btn {
    width: 98px;
    height: 100%;
    background: #0071FA;
    border-radius: 0px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    cursor: pointer;

    &:hover {
      background: #0e7aff;
    }
  }

  .links {
    column-gap: 32px;
    margin-top: 4px;
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #9D9D9D;
  }
}

.text {
  height: 44px;
  width: 86px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 300;
  color: #0071FA;
}

.select {
  position: relative;
  width: 90px;
  background-color: white;
  color: #0071FA;
  line-height: 40px;
  text-align: center;

  &:hover {
    .select-area {
      display: block;
    }
  }

  .trigger {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    border-right: 1px solid #CFCFCF;
  }

  .icon {
    margin-left: 7px;
    font-size: 13px;
    color: #0071FA;
  }

  .select-area {
    display: none;
    position: absolute;
    width: 94px;
    background: white;
    z-index: 2;
    left: -2px;
    border-bottom: 2px solid #0071FA;
  }

  .option {
    height: 40px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #959595;
    text-align: center;
    border-left: 2px solid #0071FA;
    border-right: 2px solid #0071FA;
    cursor: pointer;

    &:hover {
      color: #0071FA;
      background: #EDF0F2;
    }
  }
}
</style>
