import { ref, nextTick } from "vue"
import html2canvs from 'html2canvas'
import request from '@/utils/request'
import { API_DOMAIN } from "@/utils/const"

const downloadImg = (file: any) => {
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', '名片.jpg')
  link.setAttribute('target', '_blank')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const useTemplate = (templateRef: any) => {
  const isPrint = ref(false)
  const img = ref('')
  const save = () => {
    return new Promise((resolve => {
      isPrint.value = true
      nextTick(() => {
        html2canvs(templateRef.value).then(canvas => {
          img.value = canvas.toDataURL('image/jpg')
          return
          canvas.toBlob((blob: any) => {
            const file = new File([blob], '名片.jpg', { type: 'image/jpg' })
            // 将生成的图片下载到本地
            downloadImg(file)
            const formData = new FormData()
            formData.append('file', file)
            // 上传图片
            request({
              url: 'web_v1/member/upload',
              method: 'post',
              headers: {
                "Content-Type": 'multipart/form-data'
              },
              data: formData
            }).then(res => {
              resolve(API_DOMAIN + res.data.data)
            })
          })
        })
      })

    }))
  }

  return {
    isPrint,
    img,
    save
  }
}

export default useTemplate