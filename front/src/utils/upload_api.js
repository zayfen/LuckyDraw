import axios from 'axios'

export function upload (name, file) {
  return new Promise(resolve => {
    let url = '/api/minio/presignedUrl'
    // 避免文件名重复
    let name = (new Date()).getTime() + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
    axios.get(url, {params: {name}}).then((res) => {
      console.log('upload.get res: ', res)

      axios.put(res.data.data.url, file).then(re => {
        console.log('put.put res: ', re)
        if (re.status === 200) {
          // get visit_url
          resolve({code: 0, data: {visit_url: res.data.data.visit_url}})
        } else {
          resolve({code: -1, message: 'error'})
        }
      })
    })
  })
}
