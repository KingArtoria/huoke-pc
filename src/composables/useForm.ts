import { ref } from 'vue'
const useForm = (formData: any, formRef: any) => {
  // 控制窗口显示/隐藏
  const visible = ref(false)
  // 按钮loading态
  const loading = ref(false)
  // 备份表单初始结构
  const formDataBak = formData ? JSON.parse(JSON.stringify(formData.value)) : null
  const close = (done?: any) => {
    formRef.value.resetFields()
    formData.value = JSON.parse(JSON.stringify(formDataBak))
    if (done && typeof done === 'function') {
      done(true)
    } else {
      visible.value = false
    }
  }
  return {
    visible,
    loading,
    close
  }
}

export default useForm