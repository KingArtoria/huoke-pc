<template>
  <div style="background: #f3f3f3">
  </div>
</template>

<script>
export default {
  data() {
    return {
      /* 首页参数 */ comprehensiveIndexParams: { page: 1, size: 6 },
      /* 首页数据 */ comprehensiveIndexData: { count: 0, data: [] },
      /* tbsData */ tbsData: [
        { name: '推荐项目', isSelect: true, id: 0 },
        { name: '广告甲方', isSelect: false, id: 1 },
        { name: '流量乙方', isSelect: false, id: 2 },
        { name: '优质货源', isSelect: false, id: 3 },
        { name: '销售渠道', isSelect: false, id: 4 },
        { name: '资源互换', isSelect: false, id: 5 },
        { name: '流量互换', isSelect: false, id: 6 },
        { name: '招商加盟', isSelect: false, id: 7 },
        { name: '线下广告', isSelect: false, id: 8 },
      ],
    };
  },
  methods: {
    /* tabs下拉回调 */ tabsCommand(command) {
      this.tbsData.forEach(item => {
        item.isSelect = false;
      });
      switch (command) {
        case '9':
          this.tbsData[8].name = '线下场地';
          this.tbsData[8].isSelect = true;
          this.tbsData[8].id = 9;
          break;
        case '10':
          this.tbsData[8].name = '免费福利';
          this.tbsData[8].isSelect = true;
          this.tbsData[8].id = 10;
          break;
      }
    },
    /* 切换tabs */ switchTabs(num) {
      this.tbsData.forEach(item => {
        item.isSelect = false;
      });
      this.tbsData[num].isSelect = true;
    },
    /* 更改每页展示的数量 */ handleSizeChange(size) {
      this.comprehensiveIndexParams = { page: 1, size };
      this.comprehensiveIndex();
    },
    /* 首页分页 */ handleCurrentChange(page) {
      this.comprehensiveIndexParams.page = page;
      this.comprehensiveIndex();
    },
    /* 首页推荐 */ comprehensiveIndex() {
      this.$refs['list'].openLoading();
      this.comprehensiveIndexData = { count: this.comprehensiveIndexData.count, data: [] };
      comprehensiveIndex(this.comprehensiveIndexParams).then(res => {
        this.comprehensiveIndexData.count = res.msg;
        res.data.is_rec1.forEach(item => {
          item.area = item.area.split(';');
          this.comprehensiveIndexData.data.push(item);
        });
        res.data.is_rec0.forEach(item => {
          item.area = item.area.split(';');
          this.comprehensiveIndexData.data.push(item);
        });
        this.$refs['list'].closeLoading();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
