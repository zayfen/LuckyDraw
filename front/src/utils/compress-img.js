import * as EXIF from 'exif-js'
export function rotateAndCompressImg (file) {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.src = window.URL.createObjectURL(file)
    img.onload = () => {
      EXIF.getData(img, function () {
        let orientation = EXIF.getTag(this, 'Orientation')
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        switch (orientation) {
          case 3: // 旋转180°
            canvas.width = img.width
            canvas.height = img.height
            ctx.rotate((180 * Math.PI) / 180)
            ctx.drawImage(img, -img.width, -img.height, img.width, img.height)
            break
          case 6: // 旋转90°
            canvas.width = img.height
            canvas.height = img.width
            ctx.rotate((90 * Math.PI) / 180)
            ctx.drawImage(img, 0, -img.height, img.width, img.height)
            break
          case 8: // 旋转-90°
            canvas.width = img.height
            canvas.height = img.width
            ctx.rotate((-90 * Math.PI) / 180)
            ctx.drawImage(img, -img.width, 0, img.width, img.height)
            break
          default: // 没有源信息的图片和正常的图片是不需要旋转的
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0, img.width, img.height)
            break
        }
        canvas.toBlob(blob => {
          if (/\/(?:jpeg|png|jpg|gif)/i.test(blob.type) && blob.size > 1000000) {
            let canvas = document.createElement('canvas')
            let context = canvas.getContext('2d')
            let img = new Image()
            img.src = URL.createObjectURL(blob)
            img.onload = () => {
              let rate = img.height / img.width
              canvas.width = 800
              canvas.height = 800 * rate
              context.drawImage(img, 0, 0, canvas.width, canvas.height)
              canvas.toBlob(blob => {
                resolve({
                  content: canvas.toDataURL('image/jpeg', 0.92),
                  file: blob
                })
              })
            }
            return
          }
          resolve({
            content: canvas.toDataURL('image/jpeg', 0.92),
            file: blob
          })
        }, 'image/jpeg', 0.92)
      })
    }
  })
}
