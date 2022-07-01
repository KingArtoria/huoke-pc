import { once, headPrefix } from '@/utils';
import { getFriendListAPI, putDelFriendAPI } from '@/utils/api';
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { HEAD_DOMAIN } from '@/utils/const';

const useFriends = () => {
  const friends = ref<any>([])
  const searchText = ref('')
  const getData = () => {
    getFriendListAPI({ nick_name: searchText.value }).then(res => {
      const { list } = res.data.data
      let data: any = []
      list.forEach((v: any) => {
        data = data.concat(v.data)
      })
      data.forEach((val: any) => {
        val.head = headPrefix(val.head)
      })
      friends.value = data
    })
  }
  const search = (val: string = '') => {
    searchText.value = val
    getData()
  }
  // 删除好友
  const delFriend = once((done: Function, friend: any) => {
    ElMessageBox.confirm(`将好友“${friend.nick_name}”删除，将同时删除与该好友的聊天记录`, '删除好友', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      putDelFriendAPI({ toid: friend.id }).then(() => {
        done()
        ElMessage.success('删除成功')
        getData()
      }).catch(() => {
        done()
      })
    }).catch(() => {
      done()
    })
  })

  return {
    friends,
    searchText,
    search,
    delFriend,
    getData
  }
}

export default useFriends