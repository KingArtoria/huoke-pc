import { ref, nextTick } from "vue"
import html2canvs from 'html2canvas'
import request from '@/utils/request'

const useTemplate = (templateRef: any) => {
  const isPrint = ref(false)
  const img = ref('')
  const save = () => {
    return new Promise((resolve => {
      isPrint.value = true
      nextTick(() => {
        html2canvs(templateRef.value).then(canvas => {
          img.value = canvas.toDataURL('image/jpg')
          canvas.toBlob((blob: any) => {
            const file = new File([blob], '名片.jpg', { type: 'image/jpg' })
            const formData = new FormData()
            formData.append('pic', file)
            // uploadVisitingcardAPI(formData).then(res => {

            // })
            request({
              url: 'upload.php',
              method: 'post',
              headers: {
                "Content-Type": 'multipart/form-data'
              },
              data: formData
            }).then(res => {
              resolve(res)
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